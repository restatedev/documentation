import type { Context } from "https://edge.netlify.com";
import {
  create,
  getNumericDate,
  verify,
} from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import {
  getCookies,
  setCookie,
} from "https://deno.land/std@0.170.0/http/cookie.ts";

const client_id = Deno.env.get("GITHUB_CLIENT_ID");
const client_secret = Deno.env.get("GITHUB_CLIENT_SECRET");
const pat = Deno.env.get("GITHUB_PAT");
const jwt_secret = Deno.env.get("JWT_SECRET");

const login = async (
  code: string,
  previous: string,
  key: CryptoKey,
) => {
  const token_response = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({ client_id, client_secret, code }),
    },
  );
  const token_result = await token_response.json();

  if (token_result.error) {
    const body = JSON.stringify(token_result);
    console.log(
      `Bad response from oauth api: status ${token_response.status}, body: ${body}`,
    );
    return new Response(body, { status: 401 });
  }

  const user_response = await fetch(
    "https://api.github.com/user",
    {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${token_result.access_token}`,
      },
    },
  );

  const user_result = await user_response.json();

  if (!user_result.login) {
    const body = JSON.stringify(user_result);
    console.log(
      `Bad response from user api: status ${user_response.status}, body: ${body}`,
    );
    return new Response(body, { status: 500 });
  }

  const collaborator_response = await fetch(
    `https://api.github.com/repos/restatedev/documentation/collaborators/${user_result.login}`,
    {
      method: "GET",
      headers: {
        accept: "application/vnd.github+json",
        authorization: `Bearer ${pat}`,
      },
    },
  );

  if (collaborator_response.status === 404) {
    return new Response(
      `To access the docs, your GitHub account must have access to https://github.com/restatedev/documentation`,
      { status: 401 },
    );
  }

  if (
    collaborator_response.status != 204
  ) {
    const body = await collaborator_response.text();
    console.log(
      `Bad response from collaborators api: status ${collaborator_response.status}, body: ${body}`,
    );
    return new Response(
      body,
      { status: 500 },
    );
  }

  // expire in a week
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  // issue a jwt to avoid having to do a github api call on every request
  const jwt = await create({ alg: "HS512", typ: "JWT" }, {
    aud: user_result.login,
    exp: getNumericDate(expiry),
  }, key);

  // redirect and set cookie
  console.log(`Redirecting to docs page ${previous}`);
  const headers = new Headers({ location: previous });
  setCookie(headers, { name: "RESTATE_DOCS", value: jwt, expires: expiry });
  return new Response(null, { status: 302, headers });
};

const redirect = (url: URL) => {
  const redirect_uri = new URL(url.origin);
  redirect_uri.pathname = "/oauth";
  redirect_uri.searchParams.set("previous", url.pathname);
  const authorize_uri = new URL("https://github.com/login/oauth/authorize");
  authorize_uri.searchParams.set("client_id", client_id || "");
  authorize_uri.searchParams.set("redirect_uri", redirect_uri.toString());

  console.log(`Redirecting to ${authorize_uri.toString()}`);
  return Response.redirect(authorize_uri, 302);
};

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  console.log(`Handling request for ${url.origin}${url.pathname}`);
  const key = await crypto.subtle.importKey(
    "jwk",
    {
      alg: "HS512",
      ext: true,
      k: jwt_secret,
      key_ops: [
        "sign",
        "verify",
      ],
      kty: "oct",
    },
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

  if (url.pathname === "/oauth") {
    const code = url.searchParams.get("code");
    const previous = url.searchParams.get("previous") || url.origin;
    if (code) {
      console.log(`Starting login flow`);
      // we are a callback
      return login(code, previous, key);
    }
  }

  const cookies = getCookies(request.headers);

  if (!cookies.RESTATE_DOCS) {
    console.log(`No cookie; redirecting to github`);
    return redirect(url);
  }

  try {
    await verify(cookies.RESTATE_DOCS, key);
  } catch (_) {
    // expired or invalid
    console.log(`Invalid cookie; redirecting to github`);
    return redirect(url);
  }

  // load page
  console.log(`Valid cookie; passing to docs`);
  return context.next();
};
