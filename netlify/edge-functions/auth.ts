import type {Context} from "https://edge.netlify.com";
import {create, verify} from "https://deno.land/x/djwt@v2.9.1/mod.ts";
import {getCookies, setCookie} from "https://deno.land/std@0.170.0/http/cookie.ts";

const deploy_context = Deno.env.get("DEPLOY_CONTEXT");
const client_id = Deno.env.get("GITHUB_CLIENT_ID");
const client_secret = Deno.env.get("GITHUB_CLIENT_SECRET");
const allowlist = new Set((Deno.env.get("GITHUB_ALLOWLIST") || "").split(","));
const jwt_secret = Deno.env.get("JWT_SECRET")

const login = async (context: Context, code: string, key: CryptoKey) => {
  const token_response = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "cloudflare-worker-github-oauth-login-demo",
        accept: "application/json",
      },
      body: JSON.stringify({client_id, client_secret, code}),
    }
  );
  const token_result = await token_response.json();
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  if (token_result.error) {
    return new Response(JSON.stringify(token_result), {status: 401, headers});
  }

  const user_response = await fetch(
    "https://api.github.com/user",
    {
      method: "GET",
      headers: {
        "user-agent": "cloudflare-worker-github-oauth-login-demo",
        accept: "application/vnd.github+json",
      },
    }
  );

  const user_result = await user_response.json();

  if (!user_result.login) {
    return new Response("No login found in user response from GitHub", {status: 500, headers});
  }

  // issue a jwt to avoid having to do a github api call on every request
  const jwt = await create({alg: "HS512", typ: "JWT"}, {aud: user_result.login}, key)

  const next = await context.next();
  setCookie(next.headers, {name: "RESTATE_DOCS", value: jwt})

  return next
}

const redirect = Response.redirect(`https://github.com/login/oauth/authorize?client_id=${client_id}`, 302)

export default async (request: Request, context: Context) => {
  if (!(deploy_context === "PRODUCTION" || deploy_context === "LOCAL")) {
    // there's no way to do oauth on branch or preview builds as url is unpredictable; we use passwords there instead
    // for local we use a different github oauth app that redirects to localhost:8888
    return context.next()
  }

  const key = await crypto.subtle.importKey("jwk", {
      alg: "HS512", ext: true,
      k: jwt_secret,
      key_ops: [
        "sign",
        "verify"
      ],
      kty: "oct"
    },
    {name: "HMAC", hash: "SHA-512"},
    true,
    ["sign", "verify"],
  )

  const code = new URL(request.url).searchParams.get("code");

  if (code) {
    // this is a redirect from github auth; process the code
    return login(context, code, key);
  }

  // no code, check for jwt

  const cookies = getCookies(request.headers);
  if (!cookies.RESTATE_DOCS) {
    // no code or cookie, login flow
    return redirect
  }

  const payload = await verify(cookies.RESTATE_DOCS, key)
  if (!payload.login) {
    // weird payload, get them to oauth
    return redirect
  }
  if (!payload.aud || !(typeof payload.aud == "string") || !allowlist.has(payload.aud)) {
    return new Response("GitHub user not allowlisted.", {status: 403})
  }

  // load page
  return context.next()
}
