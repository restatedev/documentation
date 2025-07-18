---
id: quickstart
[//]: # (sidebar_position: 2 --> this is now set by sidebars.js)
description: ""
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Admonition from '@theme/Admonition';
import {Step} from "../../src/components/Stepper";
import {CodeWithTabs} from "../../src/components/code/code";
import {
    Terminal,
    TerminalWithTabs
} from "../../src/components/code/terminal";
import {TextAndCode} from "../../src/components/code/code/text-and-code";

# Quickstart

This guide takes you through your first steps with Restate.

We will run a simple Restate Greeter service that listens on port `9080` and responds with `You said hi to <name>!` to a `greet` request.

<img src="/img/quickstart/overview.svg" alt="Quickstart" className="quickstart-image" width="400rem"/>

SDK:

<Tabs groupId="sdk" queryString className={"selection-button"}>
    <TabItem value="ts" label={<><img
        className="buttonIcon mb-0.5 icon"
        src="/img/typescript.svg"
        width="20"
    /> TypeScript</>}/>
    <TabItem value="java" label={<><img
        className="buttonIcon mb-0.5 icon"
        src="/img/java.svg"
        width="20"
    /> Java</>}/>
    <TabItem value="kotlin" label={<><img
        className="buttonIcon mb-0.5 icon"
        src="/img/kotlin.svg"
        width="20"
    /> Kotlin</>}/>
    <TabItem value="go" label={<><img
        className="buttonIcon mb-0.5 icon"
        src="/img/go.svg"
        width="20"
    /> Go </>}/>
    <TabItem value="python" label={<><img
        className="buttonIcon mb-0.5 icon"
        src="/img/python.svg"
        width="20"
    /> Python </>}/>
    <TabItem value="rust" label={<><img
        className="buttonIcon mb-0.5 icon"
        src="/img/rust.svg"
        width="20"
    /> Rust</>}/>
</Tabs>

<Tabs groupId="sdk" className={"display-none"}>
    <TabItem value="ts" label="TypeScript">
        Select your favorite runtime:
        <Tabs groupId={"ts-runtime"} className={"selection-button"}>
            <TabItem value={"Node.js"} label={<><img src='/img/quickstart/nodejs.svg' alt="Node.js" className="icon" />Node.js</>}>
                <Admonition type="note" title="Prerequisites">
                    - [NodeJS](https://nodejs.org/en/) >= v18.17.1
                </Admonition>
            </TabItem>
            <TabItem value={"Bun"} label={<><img src='/img/quickstart/bun.svg' alt="bun" className="icon" />bun</>}>
                <Admonition type="note" title="Prerequisites">
                    - [Bun](https://bun.sh/docs/installation)
                    - [npm CLI](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) >= 9.6.7
                </Admonition>
            </TabItem>
            <TabItem value={"Deno"} label={<><img src='/img/quickstart/deno.svg' alt="deno" className="icon" />Deno</>}>
                <Admonition type="note" title="Prerequisites">
                    - [Deno](https://deno.land/#installation)
                    - [npm CLI](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) >= 9.6.7
                </Admonition>
            </TabItem>
            <TabItem value={"CloudflareWorkers"} label={<><img src='/img/quickstart/cloudflare_workers.svg' alt="Cloudflare Workers" className="icon" />Cloudflare Workers</>}>
                <Admonition type="note" title="Prerequisites">
                    - [NodeJS](https://nodejs.org/en/) >= v18.17.1
                </Admonition>
            </TabItem>
            <TabItem value={"Nextjs"} label={<><img src='/img/quickstart/nextjs.svg' alt="Next.js" className="icon" />Next.js</>}>
                <Admonition type="note" title="Prerequisites">
                    - [NodeJS](https://nodejs.org/en/) >= v18.18
                </Admonition>
            </TabItem>
        </Tabs>
        <Step stepLabel="1" title="Install Restate Server & CLI">
            Restate is a single self-contained binary. No external dependencies needed.

            <Tabs groupId={"running-restate"}>
                <TabItem value={"Homebrew"} label={"Homebrew"}>
                    <TextAndCode>
                        Install Restate Server and CLI.

                        ```shell !result
                        brew install restatedev/tap/restate-server restatedev/tap/restate
                        ```
                    </TextAndCode>
                    <TextAndCode>
                        Then run the Restate Server with:
                        ```shell !result
                        restate-server
                        ```
                    </TextAndCode>
                </TabItem>
                <TabItem value={"bin"} label={"Download binaries"}>
                    Install the Restate Server and CLI by downloading the binaries with `curl` from the [releases page](https://github.com/restatedev/restate/releases/latest), and make them executable:

                    <CodeWithTabs>
                        ```shell !!tabs Linux-x64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=x86_64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs Linux-arm64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=aarch64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-x64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=x86_64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-arm64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=aarch64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                    </CodeWithTabs>

                    Then run the Restate Server with:
                    ```shell
                    restate-server
                    ```

                </TabItem>
                <TabItem value={"npm"} label={"npm"}>
                    <TextAndCode>
                        Install Restate Server and CLI via:

                        ```shell !result
                        npm install --global @restatedev/restate-server@latest @restatedev/restate@latest
                        ```
                    </TextAndCode>
                    <TextAndCode>
                        Then run the Restate Server with:
                        ```shell !result
                        restate-server
                        ```
                    </TextAndCode>
                </TabItem>
                <TabItem value={"Docker"} label={"Docker"}>

                    To run the Restate Server:

                    ```shell
                    docker run --name restate_dev --rm -p 8080:8080 -p 9070:9070 -p 9071:9071 \
                    --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
                    ```

                    To run commands with the Restate CLI, use the following command:

                    ```shell
                    docker run -it --network=host docker.restate.dev/restatedev/restate-cli:VAR::RESTATE_VERSION invocations ls
                    ```

                    Replace `invocations ls` by the CLI command you want to run.

                </TabItem>
            </Tabs>

            You can find the Restate UI running on port 9070 (`http://localhost:9070`) after starting the Restate Server.
        </Step>
        <Step stepLabel="2" title="Get the Greeter service template">

            <Tabs groupId={"ts-runtime"} className={"display-none"}>
                <TabItem value={"Node.js"}>
                    <CodeWithTabs>
                        ```shell !!tabs CLI
                        restate example typescript-hello-world &&
                        cd typescript-hello-world &&
                        npm install
                        ```

                        ```shell !!tabs npx
                        npx -y @restatedev/create-app@latest && cd restate-node-template &&
                        npm install
                        ```
                    </CodeWithTabs>
                </TabItem>
                <TabItem value={"Bun"}>
                    ```shell
                    restate example typescript-bun-hello-world &&
                    cd typescript-bun-hello-world &&
                    npm install
                    ```
                </TabItem>
                <TabItem value={"Deno"} >
                    ```shell
                    restate example typescript-deno-hello-world &&
                    cd typescript-deno-hello-world
                    ```
                </TabItem>
                <TabItem value={"CloudflareWorkers"}>
                    ```shell
                    restate example typescript-cloudflare-worker-hello-world &&
                    cd typescript-cloudflare-worker-hello-world &&
                    npm install
                    ```
                </TabItem>
                <TabItem value={"Nextjs"}>
                    ```shell
                    restate example typescript-nextjs-hello-world &&
                    cd typescript-nextjs-hello-world &&
                    npm install
                    ```
                </TabItem>
            </Tabs>

        </Step>
        <Step stepLabel="3" title="Run the Greeter service">

            Run it and let it listen on port `9080` for requests:

            <Tabs groupId={"ts-runtime"} className={"display-none"}>
                <TabItem value={"Node.js"}>

                    <Terminal>
                    ```shell !command
                    npm run dev
                    ```

                    ```log !output
                    > restate-ts-template@0.0.1 dev
                    > ts-node-dev --watch ./src --respawn --transpile-only ./src/app.ts

                    [INFO] 00:44:54 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.2, typescript ver. 5.6.3)
                    [restate] [2024-11-12T23:44:54.955Z] INFO:  Listening on 9080...
                    ```

                    </Terminal>
                </TabItem>
                <TabItem value={"Bun"}>
                    <Terminal>
                        ```shell !command
                        npm run dev
                        ```

                        ```log !output
                        > restate-bun-template@0.0.1 dev
                        > bun run --watch src/index.ts

                        Listening on http://localhost:9080/
                        ```
                    </Terminal>
                </TabItem>
                <TabItem value={"Deno"}>
                    <Terminal>
                        ```shell !command
                        deno task dev
                        ```

                        ```log !output
                        Task dev deno run --allow-net --allow-env --watch main.ts
                        Watcher Process started.
                        Listening on http://0.0.0.0:9080/
                        ```
                    </Terminal>
                </TabItem>
                <TabItem value={"CloudflareWorkers"} >
                    <Terminal>
                        ```shell !command
                        npm run dev
                        ```

                        ```log !output
                        restate-cloudflare-worker-template@0.0.1 dev
                        > wrangler dev --port 9080


                        ⛅️ wrangler 3.88.0
                        -------------------

                        ╭────────────────────────────────────────────────────────────────────────────────────────⎔ Starting local server...
                        [wrangler:inf] Ready on http://localhost:9080
                        ```
                    </Terminal>

                </TabItem>
                <TabItem value={"Nextjs"} >
                    <Terminal>
                        ```shell !command
                        npm run dev
                        ```

                        ```log !output
                        > next-restate@0.1.0 dev
                        > next dev

                        ▲ Next.js 15.2.4
                        - Local:        http://localhost:3000
                        - Network:      http://192.168.1.68:3000

                        ✓ Starting...
                        ✓ Ready in 1406ms
                        ```
                    </Terminal>

                </TabItem>
            </Tabs>

        </Step>
        <Step stepLabel="4" title="Register the service">

            Tell Restate where the service is running, so Restate can discover and register the services and handlers behind this endpoint.
            You can do this via the UI (`http://localhost:9070`) or via:

            <Tabs groupId={"ts-runtime"} className={"display-none"}>
                <TabItem value={"Node.js"}>
                    <TerminalWithTabs>

                        # !!terminals

                        ```shell !command CLI
                        restate deployments register http://localhost:9080
                        ```

                        ```shell !output
                        ❯ SERVICES THAT WILL BE ADDED:
                        - Greeter
                        Type: Service
                        HANDLER  INPUT                                     OUTPUT
                        greet    value of content-type 'application/json'  value of content-type 'application/json'


                        ✔ Are you sure you want to apply those changes? · yes
                        ✅ DEPLOYMENT:
                        SERVICE  REV
                        Greeter  1
                        ```

                        # !!terminals

                        ```shell !command curl
                        curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                        ```

                        ```shell !output
                        {
                            "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "services": [
                                {
                                    "name": "Greeter",
                                    "handlers": [
                                        {
                                            "name": "greet",
                                            "ty": "Shared",
                                            "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                            "output_description": "value of content-type 'application/json'"
                                        }
                                    ],
                                    "ty": "Service",
                                    "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                                    "revision": 1,
                                    "public": true,
                                    "idempotency_retention": "1day"
                                }
                            ]
                        }
                        ```

                    </TerminalWithTabs>

                    If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.

                </TabItem>
                <TabItem value={"Bun"}>
                    <TerminalWithTabs>

                        # !!terminals

                        ```shell !command CLI
                        restate deployments register http://localhost:9080
                        ```

                        ```shell !output
                        ❯ SERVICES THAT WILL BE ADDED:
                        - Greeter
                        Type: Service
                        HANDLER  INPUT                                     OUTPUT
                        greet    value of content-type 'application/json'  value of content-type 'application/json'


                        ✔ Are you sure you want to apply those changes? · yes
                        ✅ DEPLOYMENT:
                        SERVICE  REV
                        Greeter  1
                        ```

                        # !!terminals

                        ```shell !command curl
                        curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                        ```

                        ```shell !output
                        {
                            "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "services": [
                                {
                                    "name": "Greeter",
                                    "handlers": [
                                        {
                                            "name": "greet",
                                            "ty": "Shared",
                                            "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                            "output_description": "value of content-type 'application/json'"
                                        }
                                    ],
                                    "ty": "Service",
                                    "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                                    "revision": 1,
                                    "public": true,
                                    "idempotency_retention": "1day"
                                }
                            ]
                        }
                        ```

                    </TerminalWithTabs>

                    If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.
                </TabItem>
                <TabItem value={"Deno"}>
                    <TerminalWithTabs>

                        # !!terminals

                        ```shell !command CLI
                        restate deployments register http://localhost:9080
                        ```

                        ```shell !output
                        ❯ SERVICES THAT WILL BE ADDED:
                        - Greeter
                        Type: Service
                        HANDLER  INPUT                                     OUTPUT
                        greet    value of content-type 'application/json'  value of content-type 'application/json'


                        ✔ Are you sure you want to apply those changes? · yes
                        ✅ DEPLOYMENT:
                        SERVICE  REV
                        Greeter  1
                        ```

                        # !!terminals

                        ```shell !command curl
                        curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                        ```

                        ```shell !output
                        {
                            "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "services": [
                                {
                                    "name": "Greeter",
                                    "handlers": [
                                        {
                                            "name": "greet",
                                            "ty": "Shared",
                                            "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                            "output_description": "value of content-type 'application/json'"
                                        }
                                    ],
                                    "ty": "Service",
                                    "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                                    "revision": 1,
                                    "public": true,
                                    "idempotency_retention": "1day"
                                }
                            ]
                        }
                        ```

                    </TerminalWithTabs>

                    If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.
                </TabItem>
                <TabItem value={"CloudflareWorkers"}>
                    <TerminalWithTabs>

                        # !!terminals

                        ```shell !command CLI
                        restate deployments register http://localhost:9080 --use-http1.1
                        ```

                        ```shell !output
                        ❯ SERVICES THAT WILL BE ADDED:
                        - Greeter
                        Type: Service
                        HANDLER  INPUT                                     OUTPUT
                        greet    value of content-type 'application/json'  value of content-type 'application/json'


                        ✔ Are you sure you want to apply those changes? · yes
                        ✅ DEPLOYMENT:
                        SERVICE  REV
                        Greeter  1
                        ```

                        # !!terminals

                        ```shell !command curl
                        curl localhost:9070/deployments --json '{"uri": "http://localhost:9080", "use_http_11": true}'
                        ```

                        ```shell !output
                        {
                            "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "services": [
                                {
                                    "name": "Greeter",
                                    "handlers": [
                                        {
                                            "name": "greet",
                                            "ty": "Shared",
                                            "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                            "output_description": "value of content-type 'application/json'"
                                        }
                                    ],
                                    "ty": "Service",
                                    "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                                    "revision": 1,
                                    "public": true,
                                    "idempotency_retention": "1day"
                                }
                            ]
                        }
                        ```

                    </TerminalWithTabs>
                    The local Workers dev server does not support HTTP2, so we need to tell Restate to use HTTP1.1.

                    If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.
                </TabItem>
                <TabItem value={"Nextjs"}>
                    <TerminalWithTabs>

                        # !!terminals

                        ```shell !command CLI
                        restate deployments register http://localhost:3000/restate/v1 --use-http1.1
                        ```

                        ```shell !output
                        ❯ SERVICES THAT WILL BE ADDED:
                        - Greeter
                        Type: Service
                        HANDLER  INPUT                                     OUTPUT
                        greet    value of content-type 'application/json'  value of content-type 'application/json'


                        ✔ Are you sure you want to apply those changes? · yes
                        ✅ DEPLOYMENT:
                        SERVICE  REV
                        Greeter  1
                        ```

                        # !!terminals

                        ```shell !command curl
                        curl localhost:9070/deployments --json '{"uri": "http://localhost:3000/restate/v1", "use_http_11": true}'
                        ```

                        ```shell !output
                        {
                            "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "services": [
                        {
                            "name": "Greeter",
                            "handlers": [
                        {
                            "name": "greet",
                            "ty": "Shared",
                            "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                            "output_description": "value of content-type 'application/json'"
                        }
                            ],
                            "ty": "Service",
                            "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "revision": 1,
                            "public": true,
                            "idempotency_retention": "1day"
                        }
                            ]
                        }
                        ```

                    </TerminalWithTabs>
                    If you run Restate with Docker, use `http://host.docker.internal:3000/restate/v1` instead of `http://localhost:3000/restate/v1`.
                </TabItem>
            </Tabs>

            <Admonition type="note" title="Restate Cloud">
                When using [Restate Cloud](https://restate.dev/cloud), your service must be accessible over the public internet so Restate can invoke it.
                If you want to develop with a local service, you can expose it using our [tunnel](/deploy/server/cloud/#registering-restate-services-with-your-environment) feature.
            </Admonition>
        </Step>
        <Step stepLabel="5" title="Send a request to the Greeter service">

            <Tabs groupId={"ts-runtime"} className={"display-none"}>
                <TabItem value={"Node.js"}>
                    Invoke the service via the Restate UI playground: go to `http://localhost:9070`, click on your service and then on playground.
                    <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>
                </TabItem>
                <TabItem value={"Bun"}>
                    Invoke the service via the Restate UI playground: go to `http://localhost:9070`,  click on your service and then on playground.
                    <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>
                </TabItem>
                <TabItem value={"Deno"}>
                    Invoke the service via the Restate UI playground: go to `http://localhost:9070`,  click on your service and then on playground.
                    <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>
                </TabItem>
                <TabItem value={"CloudflareWorkers"}>
                    Invoke the service via the Restate UI playground: go to `http://localhost:9070`,  click on your service and then on playground.
                    <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>
                </TabItem>
                <TabItem value={"Nextjs"}>
                    Invoke the greet handler via the Next.js UI at `http://localhost:3000`

                    <img src={"/img/quickstart/nextjs_ui.png"} alt="Next.js UI" width="300rem"/>
                </TabItem>
            </Tabs>
            
            Or invoke via `curl`:
            <Terminal>
                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name": "Sarah"}'
                ```
                ```shell !output
                You said hi to Sarah!
                ```
            </Terminal>
        </Step>
        <Step stepLabel="🎉" title="Congratulations, you just ran Durable Execution!">

            The invocation you just sent used Durable Execution to make sure the request ran till completion.
            For each request, it sent a notification, slept for a second, and then sent a reminder.

            <Tabs groupId={"ts-runtime"} className={"display-none"}>
                <TabItem value={"Node.js"}>
                    ```ts https://github.com/restatedev/examples/blob/main/typescript/templates/node/src/app.ts
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/templates/node/src/app.ts
                    ```
                </TabItem>
                <TabItem value={"Bun"}>
                    ```ts https://github.com/restatedev/examples/blob/main/typescript/templates/bun/src/index.ts
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/templates/bun/src/index.ts
                    ```
                </TabItem>
                <TabItem value={"Deno"}>
                    ```ts https://github.com/restatedev/examples/blob/main/typescript/templates/deno/main.ts
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/templates/deno/main.ts
                    ```
                </TabItem>
                <TabItem value={"CloudflareWorkers"} >
                    ```ts https://github.com/restatedev/examples/blob/main/typescript/templates/cloudflare-worker/src/index.ts
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/templates/cloudflare-worker/src/index.ts
                    ```
                </TabItem>
                <TabItem value={"Nextjs"} >
                    ```ts https://github.com/restatedev/examples/blob/main/typescript/templates/nextjs/restate/services/greeter.ts
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/typescript/templates/nextjs/restate/services/greeter.ts
                    ```
                </TabItem>
            </Tabs>

            Send a request for `Alice` to see how the service behaves when it occasionally fails to send the reminder and notification:
            <Terminal>
                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name": "Alice"}'
                ```
                ```shell !output
                You said hi to Alice!
                ```
            </Terminal>

            You can see in the service logs and in the Restate UI how the request gets retried.
            On a retry, it skipped the steps that already succeeded.

            <img src={"/img/quickstart/quickstart_retries.png"} alt="Restate UI Durable Execution" width="1000rem"/>

            Even the sleep is durable and tracked by Restate.
            If you kill/restart the service halfway through, the sleep will only last for what remained.

            <Admonition type={"tip"} title={"Durable Execution"}>
                Restate persists the progress of the handler.
                Letting you write code that is resilient to failures out of the box.
                Have a look at the [Durable Execution page](/concepts/durable_execution) to learn more.
            </Admonition>

        </Step>
        <Tabs groupId={"ts-runtime"} className={"display-none"}>
            <TabItem value={"Node.js"}>
                <details className="grey-details">

                    <summary>Next: Build and run the app</summary>

                    Once you have implemented your service, build the app and run it with:
                    ```shell
                    npm run build
                    npm run start
                    ```
                </details>
            </TabItem>
            <TabItem value={"Bun"}>
                <details className="grey-details">

                    <summary>Next: Build and run the app</summary>
                    ```shell
                    npm run build
                    npm run start
                    ```
                </details>
            </TabItem>
            <TabItem value={"Deno"}>
            </TabItem>
            <TabItem value={"CloudflareWorkers"} >
                <details className="grey-details">
                    <summary>Next: Build and run the app</summary>
                        ```shell
                        npm run build
                        npm run start
                        ```
                </details>
            </TabItem>
            <TabItem value={"Nextjs"} >
                <details className="grey-details">
                    <summary>Next: Build and run the app</summary>
                        ```shell
                        npm run build
                        npm run start
                        ```
                </details>
            </TabItem>
        </Tabs>
    </TabItem>
    <TabItem value="java" label="Java">
        Build tool:
        <Tabs groupId={"build-tool"} className={"selection-button"}>
            <TabItem value={"maven"} label={<><img src='/img/quickstart/maven.svg' alt="Maven" className="icon" />Maven</>}>
                Framework:
                <Tabs groupId={"architecture"} className={"selection-button"}>
                    <TabItem value={"spring"} label={<><img src='/img/quickstart/spring.svg' alt="Spring Boot" className="icon" />Spring Boot</>}>
                        <Admonition type="note" title="Prerequisites">
                            - [JDK](https://whichjdk.com/) >= 17
                        </Admonition>
                    </TabItem>
                    <TabItem value={"quarkus"} label={<><img src='/img/quickstart/quarkus.svg' alt="Quarkus" className="icon" />Quarkus</>}>
                        <Admonition type="note" title="Prerequisites">
                            - [JDK](https://whichjdk.com/) >= 17
                            - [Quarkus](https://quarkus.io/get-started/)
                        </Admonition>
                    </TabItem>
                    <TabItem value={"vanilla"} label={<><img src='/img/quickstart/java.svg' alt="Vanilla" className="icon" />Vanilla</>}>
                        <Admonition type="note" title="Prerequisites">
                            - [JDK](https://whichjdk.com/) >= 17
                        </Admonition>
                    </TabItem>
                </Tabs>
            </TabItem>
            <TabItem value={"gradle"} label={<><img src='/img/quickstart/gradle.svg' alt="Gradle" className="icon" />Gradle</>}>
                Framework:
                <Tabs groupId={"architecture"} className={"selection-button"}>
                    <TabItem value={"vanilla"} label={<><img src='/img/quickstart/java.svg' alt="Vanilla" className="icon" />Vanilla</>}>
                        <Admonition type="note" title="Prerequisites">
                            - [JDK](https://whichjdk.com/) >= 17
                        </Admonition>
                    </TabItem>
                </Tabs>
            </TabItem>
        </Tabs>

        <Step stepLabel="1" title="Install Restate Server & CLI">
            Restate is a single self-contained binary. No external dependencies needed.
            <Tabs groupId={"running-restate"}>
                <TabItem value={"Homebrew"} label={"Homebrew"}>
                    <TextAndCode>
                        Install Restate Server and CLI via:

                        ```shell !result
                        brew install restatedev/tap/restate-server restatedev/tap/restate
                        ```
                    </TextAndCode>
                    <TextAndCode>
                        Then run the Restate Server with:
                        ```shell !result
                        restate-server
                        ```
                    </TextAndCode>
                </TabItem>
                <TabItem value={"bin"} label={"Download binaries"}>
                    Install the Restate Server and CLI by downloading the binaries with `curl` from the [releases page](https://github.com/restatedev/restate/releases/latest), and make them executable:

                    <CodeWithTabs>

                        ```shell !!tabs Linux-x64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=x86_64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs Linux-arm64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=aarch64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-x64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=x86_64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-arm64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=aarch64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                    </CodeWithTabs>

                    Then run the Restate Server with:
                    ```shell
                    restate-server
                    ```

                </TabItem>
                <TabItem value={"Docker"} label={"Docker"}>

                    To run the Restate Server:

                    ```shell
                    docker run --name restate_dev --rm -p 8080:8080 -p 9070:9070 -p 9071:9071 \
                    --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
                    ```

                    To run commands with the Restate CLI, use the following command:

                    ```shell
                    docker run -it --network=host docker.restate.dev/restatedev/restate-cli:VAR::RESTATE_VERSION invocations ls
                    ```

                    Replace `invocations ls` by the CLI command you want to run.

                </TabItem>
            </Tabs>
            You can find the Restate UI running on port 9070 (`http://localhost:9070`) after starting the Restate Server.
        </Step>
        <Step stepLabel="2" title="Get the Greeter service template">
            <Tabs groupId={"build-tool"} className={"display-none"}>
                <TabItem value={"maven"}>
                    <Tabs groupId={"architecture"} className={"display-none"}>
                        <TabItem value={"spring"}>
                            <CodeWithTabs>
                                ```shell !!tabs CLI
                                restate example java-hello-world-maven-spring-boot &&
                                cd java-hello-world-maven-spring-boot
                                ```

                                ```shell !!tabs wget
                                wget https://github.com/restatedev/examples/releases/latest/download/java-hello-world-maven-spring-boot.zip &&
                                unzip java-hello-world-maven-spring-boot.zip -d java-hello-world-maven-spring-boot &&
                                rm java-hello-world-maven-spring-boot.zip && cd java-hello-world-maven-spring-boot
                                ```
                            </CodeWithTabs>
                        </TabItem>
                        <TabItem value={"quarkus"}>
                            <CodeWithTabs>
                                ```shell !!tabs CLI
                                restate example java-hello-world-maven-quarkus &&
                                cd java-hello-world-maven-quarkus
                                ```

                                ```shell !!tabs wget
                                wget https://github.com/restatedev/examples/releases/latest/download/java-hello-world-maven-quarkus.zip &&
                                unzip java-hello-world-maven-quarkus.zip -d java-hello-world-maven-quarkus &&
                                rm java-hello-world-maven-quarkus.zip && cd java-hello-world-maven-quarkus
                                ```
                            </CodeWithTabs>
                        </TabItem>
                        <TabItem value={"vanilla"}>
                            <CodeWithTabs>
                                ```shell !!tabs CLI
                                restate example java-hello-world-maven &&
                                cd java-hello-world-maven
                                ```

                                ```shell !!tabs wget
                                wget https://github.com/restatedev/examples/releases/latest/download/java-hello-world-maven.zip &&
                                unzip java-hello-world-maven.zip -d java-hello-world-maven &&
                                rm java-hello-world-maven.zip && cd java-hello-world-maven
                                ```
                            </CodeWithTabs>
                        </TabItem>
                    </Tabs>
                </TabItem>
                <TabItem value={"gradle"}>
                    <Tabs groupId={"architecture"} className={"display-none"}>
                        <TabItem value={"vanilla"} label={<><img src='/img/quickstart/java.svg' alt="Vanilla" className="icon" />Vanilla</>}>
                            <CodeWithTabs>
                                ```shell !!tabs CLI
                                restate example java-hello-world-gradle &&
                                cd java-hello-world-gradle
                                ```

                                ```shell !!tabs wget
                                wget https://github.com/restatedev/examples/releases/latest/download/java-hello-world-gradle.zip &&
                                unzip java-hello-world-gradle.zip -d java-hello-world-gradle &&
                                rm java-hello-world-gradle.zip && cd java-hello-world-gradle
                                ```
                            </CodeWithTabs>
                        </TabItem>
                    </Tabs>
                </TabItem>
            </Tabs>
        </Step>
        <Step stepLabel="3" title="Run the Greeter service">
            <Tabs groupId={"build-tool"} className={"display-none"}>
                <TabItem value={"maven"}>
                    <Tabs groupId={"architecture"} className={"display-none"}>
                        <TabItem value={"spring"}>
                            You are all set to start developing your service.
                            Open the project in an IDE, run your service and let it listen on port `9080` for requests:

                            ```shell
                            mvn compile spring-boot:run
                            ```
                        </TabItem>
                        <TabItem value={"quarkus"}>
                            You are all set to start developing your service.
                            Open the project in an IDE, run your service and let it listen on port `9080` for requests:

                            ```shell
                            quarkus dev
                            ```
                        </TabItem>
                        <TabItem value={"vanilla"}>
                            You are all set to start developing your service.
                            Open the project in an IDE, run your service and let it listen on port `9080` for requests:

                            ```shell
                            mvn compile exec:java
                            ```
                        </TabItem>
                    </Tabs>
                </TabItem>
                <TabItem value={"gradle"}>
                    <Tabs groupId={"architecture"} className={"display-none"}>
                        <TabItem value={"vanilla"} label={<><img src='/img/quickstart/java.svg' alt="Vanilla" className="icon" />Vanilla</>}>
                            You are all set to start developing your service.
                            Open the project in an IDE, run your service and let it listen on port `9080` for requests:

                            ```shell
                            ./gradlew run
                            ```
                        </TabItem>
                    </Tabs>
                </TabItem>
            </Tabs>

        </Step>

        <Step stepLabel="4" title="Register the service">

            Tell Restate where the service is running, so Restate can discover and register the services and handlers behind this endpoint.
            You can do this via the UI (`http://localhost:9070`) or via:

            <TerminalWithTabs>

                # !!terminals

                ```shell !command CLI
                restate deployments register http://localhost:9080
                ```

                ```shell !output
                ❯ SERVICES THAT WILL BE ADDED:
                - Greeter
                Type: Service
                HANDLER  INPUT                                     OUTPUT
                greet    value of content-type 'application/json'  value of content-type 'application/json'


                ✔ Are you sure you want to apply those changes? · yes
                ✅ DEPLOYMENT:
                SERVICE  REV
                Greeter  1
                ```

                # !!terminals

                ```shell !command curl
                curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                ```

                ```shell !output
                {
                    "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                    "services": [
                        {
                            "name": "Greeter",
                            "handlers": [
                                {
                                    "name": "greet",
                                    "ty": "Shared",
                                    "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                    "output_description": "value of content-type 'application/json'"
                                }
                            ],
                            "ty": "Service",
                            "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "revision": 1,
                            "public": true,
                            "idempotency_retention": "1day"
                        }
                    ]
                }
                ```

            </TerminalWithTabs>

            If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.
        </Step>

        <Step stepLabel="5" title="Send a request to the Greeter service">

            Invoke the service via the Restate UI playground: go to `http://localhost:9070`, click on your service and then on playground.
            <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>

            Or invoke via `curl`:
            <Terminal>

                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name": "Sarah"}'
                ```

                ```log !output
                You said hi to Sarah!
                ```

            </Terminal>

        </Step>

        <Step stepLabel="🎉" title="Congratulations, you just ran Durable Execution!">

            The invocation you just sent used Durable Execution to make sure the request ran till completion.
            For each request, it sent a notification, slept for a second, and then sent a reminder.

            <Tabs groupId={"build-tool"} className={"display-none"}>
                <TabItem value={"maven"}>
                    <Tabs groupId={"architecture"} className={"display-none"}>
                        <TabItem value={"spring"}>
                            ```java https://github.com/restatedev/examples/blob/main/java/templates/java-maven-spring-boot/src/main/java/com/example/restatestarter/Greeter.java
                            // collapse_prequel
                            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/java/templates/java-maven-spring-boot/src/main/java/com/example/restatestarter/Greeter.java
                            ```
                        </TabItem>
                        <TabItem value={"quarkus"}>
                            ```java https://github.com/restatedev/examples/blob/main/java/templates/java-maven-quarkus/src/main/java/org/acme/Greeter.java
                            // collapse_prequel
                            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/java/templates/java-maven-quarkus/src/main/java/org/acme/Greeter.java
                            ```
                        </TabItem>
                        <TabItem value={"vanilla"}>
                            ```java https://github.com/restatedev/examples/blob/main/java/templates/java-maven/src/main/java/my/example/Greeter.java
                            // collapse_prequel
                            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/java/templates/java-maven/src/main/java/my/example/Greeter.java
                            ```
                        </TabItem>
                    </Tabs>
                </TabItem>
                <TabItem value={"gradle"}>
                    <Tabs groupId={"architecture"} className={"display-none"}>
                        <TabItem value={"vanilla"}>
                            ```java https://github.com/restatedev/examples/blob/main/java/templates/java-gradle/src/main/java/my/example/Greeter.java
                            // collapse_prequel
                            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/java/templates/java-gradle/src/main/java/my/example/Greeter.java
                            ```
                        </TabItem>
                    </Tabs>
                </TabItem>
            </Tabs>

            Send a request for `Alice` to see how the service behaves when it occasionally fails to send the reminder and notification:
            <Terminal>
                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name":"Alice"}'
                ```
                ```shell !output
                You said hi to Alice!
                ```
            </Terminal>

            You can see in the service logs and in the Restate UI how the request gets retried.
            On a retry, it skipped the steps that already succeeded.

            <img src={"/img/quickstart/quickstart_retries.png"} alt="Restate UI Durable Execution" width="1000rem"/>

            Even the sleep is durable and tracked by Restate.
            If you kill/restart the service halfway through, the sleep will only last for what remained.

            <Admonition type={"tip"} title={"Durable Execution"}>
                Restate persists the progress of the handler.
                Letting you write code that is resilient to failures out of the box.
                Have a look at the [Durable Execution page](/concepts/durable_execution) to learn more.
            </Admonition>
        </Step>

    </TabItem>
    <TabItem value="kotlin" label="Kotlin">

        Framework:
        <Tabs groupId={"architecture"} className={"selection-button"}>
            <TabItem value={"spring"} label={<><img src='/img/quickstart/spring.svg' alt="Spring Boot" className="icon" />Spring Boot</>}/>
            <TabItem value={"vanilla"} label={<><img src='/img/quickstart/java.svg' alt="Vanilla" className="icon" />Vanilla</>}/>
        </Tabs>

        <Admonition type="note" title="Prerequisites">
            - [JDK](https://whichjdk.com/) >= 17
        </Admonition>

        <Step stepLabel="1" title="Install Restate Server & CLI">
            Restate is a single self-contained binary. No external dependencies needed.
            <Tabs groupId={"running-restate"}>
                <TabItem value={"Homebrew"} label={"Homebrew"}>
                    <TextAndCode>
                        Install Restate Server and CLI via:

                        ```shell !result
                        brew install restatedev/tap/restate-server restatedev/tap/restate
                        ```
                    </TextAndCode>
                    <TextAndCode>
                        Then run the Restate Server with:
                        ```shell !result
                        restate-server
                        ```
                    </TextAndCode>
                </TabItem>
                <TabItem value={"bin"} label={"Download binaries"}>
                    Install the Restate Server and CLI by downloading the binaries with `curl` from the [releases page](https://github.com/restatedev/restate/releases/latest), and make them executable:

                    <CodeWithTabs>

                        ```shell !!tabs Linux-x64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=x86_64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs Linux-arm64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=aarch64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-x64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=x86_64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-arm64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=aarch64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                    </CodeWithTabs>

                    Then run the Restate Server with:
                    ```shell
                    restate-server
                    ```

                </TabItem>
                <TabItem value={"Docker"} label={"Docker"}>

                    To run the Restate Server:

                    ```shell
                    docker run --name restate_dev --rm -p 8080:8080 -p 9070:9070 -p 9071:9071 \
                    --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
                    ```

                    To run commands with the Restate CLI, use the following command:

                    ```shell
                    docker run -it --network=host docker.restate.dev/restatedev/restate-cli:VAR::RESTATE_VERSION invocations ls
                    ```

                    Replace `invocations ls` by the CLI command you want to run.

                </TabItem>
            </Tabs>
            You can find the Restate UI running on port 9070 (`http://localhost:9070`) after starting the Restate Server.
        </Step>
        <Step stepLabel="2" title="Get the Greeter service template">
            <Tabs groupId={"architecture"} className={"display-none"}>
                <TabItem value={"spring"}>
                    <CodeWithTabs>

                        ```shell !!tabs CLI
                        restate example kotlin-hello-world-gradle-spring-boot &&
                        cd kotlin-hello-world-gradle-spring-boot
                        ```

                        ```shell !!tabs wget
                        wget https://github.com/restatedev/examples/releases/latest/download/kotlin-hello-world-gradle-spring-boot.zip &&
                        unzip kotlin-hello-world-gradle-spring-boot.zip -d kotlin-hello-world-gradle-spring-boot &&
                        rm kotlin-hello-world-gradle-spring-boot.zip && cd kotlin-hello-world-gradle-spring-boot
                        ```

                    </CodeWithTabs>
                </TabItem>
                <TabItem value={"vanilla"}>
                    <CodeWithTabs>

                        ```shell !!tabs CLI
                        restate example kotlin-hello-world-gradle &&
                        cd kotlin-hello-world-gradle
                        ```

                        ```shell !!tabs wget
                        wget https://github.com/restatedev/examples/releases/latest/download/kotlin-hello-world-gradle.zip &&
                        unzip kotlin-hello-world-gradle.zip -d kotlin-hello-world-gradle &&
                        rm kotlin-hello-world-gradle.zip && cd kotlin-hello-world-gradle
                        ```

                    </CodeWithTabs>
                </TabItem>
            </Tabs>

        </Step>
        <Step stepLabel="3" title="Run the Greeter service">

            You are all set to start developing your service.
            Open the project in an IDE and configure it to build with Gradle.
            Run your service and let it listen on port `9080` for requests:
            <Tabs groupId={"architecture"} className={"display-none"}>
                <TabItem value={"spring"}>

                        ```shell
                        ./gradlew bootRun
                        ```

                </TabItem>
                <TabItem value={"vanilla"}>

                    ```shell
                    ./gradlew run
                    ```

                </TabItem>
            </Tabs>
        </Step>
        <Step stepLabel="4" title="Register the service">

            Tell Restate where the service is running, so Restate can discover and register the services and handlers behind this endpoint.
            You can do this via the UI (`http://localhost:9070`) or via:
            <TerminalWithTabs>

                # !!terminals

                ```shell !command CLI
                restate deployments register http://localhost:9080
                ```

                ```shell !output
                ❯ SERVICES THAT WILL BE ADDED:
                - Greeter
                Type: Service
                HANDLER  INPUT                                     OUTPUT
                greet    value of content-type 'application/json'  value of content-type 'application/json'


                ✔ Are you sure you want to apply those changes? · yes
                ✅ DEPLOYMENT:
                SERVICE  REV
                Greeter  1
                ```

                # !!terminals

                ```shell !command curl
                curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                ```

                ```shell !output
                {
                    "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                    "services": [
                        {
                            "name": "Greeter",
                            "handlers": [
                                {
                                    "name": "greet",
                                    "ty": "Shared",
                                    "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                    "output_description": "value of content-type 'application/json'"
                                }
                            ],
                            "ty": "Service",
                            "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "revision": 1,
                            "public": true,
                            "idempotency_retention": "1day"
                        }
                    ]
                }
                ```

            </TerminalWithTabs>

            If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.
        </Step>

        <Step stepLabel="5" title="Send a request to the Greeter service">

            Invoke the service via the Restate UI playground: go to `http://localhost:9070`, click on your service and then on playground.
            <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>

            Or invoke via `curl`:
            <Terminal>

                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name": "Sarah"}'
                ```

                ```log !output
                You said hi to Sarah!
                ```

            </Terminal>

        </Step>

        <Step stepLabel="🎉" title="Congratulations, you just ran Durable Execution!">

            The invocation you just sent used Durable Execution to make sure the request ran till completion.
            For each request, it sent a notification, slept for a second, and then sent a reminder.

            <Tabs groupId={"architecture"} className={"display-none"}>
                <TabItem value={"spring"}>
                    ```kotlin https://github.com/restatedev/examples/blob/main/kotlin/templates/kotlin-gradle-spring-boot/src/main/kotlin/com/example/restatestarter/Greeter.kt
                    // collapse_prequel
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/kotlin/templates/kotlin-gradle-spring-boot/src/main/kotlin/com/example/restatestarter/Greeter.kt
                    ```
                </TabItem>
                <TabItem value={"vanilla"}>

                    ```kotlin https://github.com/restatedev/examples/blob/main/kotlin/templates/kotlin-gradle/src/main/kotlin/my/example/Greeter.kt
                    // collapse_prequel
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/kotlin/templates/kotlin-gradle/src/main/kotlin/my/example/Greeter.kt
                    ```

                </TabItem>
            </Tabs>

            Send a request for `Alice` to see how the service behaves when it occasionally fails to send the reminder and notification:
            <Terminal>
                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name": "Alice"}'
                ```
                ```shell !output
                You said hi to Alice!
                ```
            </Terminal>

            You can see in the service logs and in the Restate UI how the request gets retried.
            On a retry, it skipped the steps that already succeeded.

            <img src={"/img/quickstart/quickstart_retries.png"} alt="Restate UI Durable Execution" width="1000rem"/>

            Even the sleep is durable and tracked by Restate.
            If you kill/restart the service halfway through, the sleep will only last for what remained.

            <Admonition type={"tip"} title={"Durable Execution"}>
                Restate persists the progress of the handler.
                Letting you write code that is resilient to failures out of the box.
                Have a look at the [Durable Execution page](/concepts/durable_execution) to learn more.
            </Admonition>

        </Step>

    </TabItem>
    <TabItem value="go" label="Go">

        <Admonition type="note" title="Prerequisites">
            - Go: >= 1.21.0
        </Admonition>

        <Step stepLabel="1" title="Install Restate Server & CLI">
            Restate is a single self-contained binary. No external dependencies needed.
            <Tabs groupId={"running-restate"}>
                <TabItem value={"Homebrew"} label={"Homebrew"}>
                    <TextAndCode>
                        Install Restate Server and CLI via:

                        ```shell !result
                        brew install restatedev/tap/restate-server restatedev/tap/restate
                        ```
                    </TextAndCode>
                    <TextAndCode>
                        Then run the Restate Server with:
                        ```shell !result
                        restate-server
                        ```
                    </TextAndCode>
                </TabItem>
                <TabItem value={"bin"} label={"Download binaries"}>
                    Install the Restate Server and CLI by downloading the binaries with `curl` from the [releases page](https://github.com/restatedev/restate/releases/latest), and make them executable:

                    <CodeWithTabs>

                        ```shell !!tabs Linux-x64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=x86_64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs Linux-arm64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=aarch64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-x64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=x86_64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-arm64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=aarch64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                    </CodeWithTabs>

                    Then run the Restate Server with:
                    ```shell
                    restate-server
                    ```

                </TabItem>
                <TabItem value={"Docker"} label={"Docker"}>

                    To run the Restate Server:

                    ```shell
                    docker run --name restate_dev --rm -p 8080:8080 -p 9070:9070 -p 9071:9071 \
                    --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
                    ```

                    To run commands with the Restate CLI, use the following command:

                    ```shell
                    docker run -it --network=host docker.restate.dev/restatedev/restate-cli:VAR::RESTATE_VERSION invocations ls
                    ```

                    Replace `invocations ls` by the CLI command you want to run.

                </TabItem>
            </Tabs>
            You can find the Restate UI running on port 9070 (`http://localhost:9070`) after starting the Restate Server.
        </Step>

        <Step stepLabel="2" title="Get the Greeter service template">

            <CodeWithTabs>

                ```shell !!tabs CLI
                restate example go-hello-world &&
                cd go-hello-world
                ```

                ```shell !!tabs wget
                wget https://github.com/restatedev/examples/releases/latest/download/go-hello-world.zip &&
                unzip go-hello-world.zip -d go-hello-world &&
                rm go-hello-world.zip && cd go-hello-world
                ```

            </CodeWithTabs>

        </Step>
        <Step stepLabel="3" title="Run the Greeter service">

            Now, start developing your service in `greeter.go`. Run it with:
            ```shell
            go run .
            ```
            it will listen on port 9080 for requests.

        </Step>

        <Step stepLabel="4" title="Register the service">

            Tell Restate where the service is running, so Restate can discover and register the services and handlers behind this endpoint.
            You can do this via the UI (`http://localhost:9070`) or via:
            <TerminalWithTabs>

                # !!terminals

                ```shell !command CLI
                restate deployments register http://localhost:9080
                ```

                ```shell !output
                ❯ SERVICES THAT WILL BE ADDED:
                - Greeter
                Type: Service
                HANDLER  INPUT                                     OUTPUT
                Greet    value of content-type 'application/json'  value of content-type 'application/json'


                ✔ Are you sure you want to apply those changes? · yes
                ✅ DEPLOYMENT:
                SERVICE  REV
                Greeter  1
                ```

                # !!terminals

                ```shell !command curl
                curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                ```

                ```shell !output
                {
                    "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                    "services": [
                        {
                            "name": "Greeter",
                            "handlers": [
                                {
                                    "name": "Greet",
                                    "ty": "Shared",
                                    "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                    "output_description": "value of content-type 'application/json'"
                                }
                            ],
                            "ty": "Service",
                            "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "revision": 1,
                            "public": true,
                            "idempotency_retention": "1day"
                        }
                    ]
                }
                ```

            </TerminalWithTabs>

            If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.
        </Step>

        <Step stepLabel="5" title="Send a request to the Greeter service">

            Invoke the service via the Restate UI playground: go to `http://localhost:9070`, click on your service and then on playground.
            <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>

            Or invoke via `curl`:
            <Terminal>

                ```shell !command
                curl localhost:8080/Greeter/Greet --json '"Sarah"'
                ```

                ```shell !output
                You said hi to Sarah!
                ```

            </Terminal>

        </Step>
        <Step stepLabel="🎉" title="Congratulations, you just ran Durable Execution!">

            The invocation you just sent used Durable Execution to make sure the request ran till completion.
            For each request, it sent a notification, slept for a second, and then sent a reminder.

            ```go https://github.com/restatedev/examples/blob/main/go/templates/go/greeter.go
            // collapse_prequel
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/go/templates/go/greeter.go
            ```

            Send a request for `Alice` to see how the service behaves when it occasionally fails to send the reminder and notification:
            <Terminal>
                ```shell !command
                curl localhost:8080/Greeter/Greet --json '"Alice"'
                ```
                ```shell !output
                You said hi to Alice!
                ```
            </Terminal>

            You can see in the service logs and in the Restate UI how the request gets retried.
            On a retry, it skipped the steps that already succeeded.

            <img src={"/img/quickstart/quickstart_retries.png"} alt="Restate UI Durable Execution" width="1000rem"/>

            Even the sleep is durable and tracked by Restate.
            If you kill/restart the service halfway through, the sleep will only last for what remained.

            <Admonition type={"tip"} title={"Durable Execution"}>
                Restate persists the progress of the handler.
                Letting you write code that is resilient to failures out of the box.
                Have a look at the [Durable Execution page](/concepts/durable_execution) to learn more.
            </Admonition>

        </Step>


        <details className="grey-details">

            <summary>Next: Build and run the app</summary>

            Once you have implemented your service, build the app with:

            ```shell
            go build .
            ```

        </details>

    </TabItem>
    <TabItem value="python" label="Python">

        <Admonition type="note" title="Prerequisites">
            - Python >= v3.11
            - [uv](https://docs.astral.sh/uv/getting-started/installation/)
        </Admonition>
        <Step stepLabel="1" title="Install Restate Server & CLI">
            Restate is a single self-contained binary. No external dependencies needed.
            <Tabs groupId={"running-restate"}>
                <TabItem value={"Homebrew"} label={"Homebrew"}>
                    <TextAndCode>
                        Install Restate Server and CLI via:

                        ```shell !result
                        brew install restatedev/tap/restate-server restatedev/tap/restate
                        ```
                    </TextAndCode>
                    <TextAndCode>
                        Then run the Restate Server with:
                        ```shell !result
                        restate-server
                        ```
                    </TextAndCode>
                </TabItem>
                <TabItem value={"bin"} label={"Download binaries"}>
                    Install the Restate Server and CLI by downloading the binaries with `curl` from the [releases page](https://github.com/restatedev/restate/releases/latest), and make them executable:

                    <CodeWithTabs>

                        ```shell !!tabs Linux-x64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=x86_64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs Linux-arm64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=aarch64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-x64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=x86_64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-arm64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=aarch64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                    </CodeWithTabs>

                    Then run the Restate Server with:
                    ```shell
                    restate-server
                    ```

                </TabItem>
                <TabItem value={"Docker"} label={"Docker"}>

                    To run the Restate Server:

                    ```shell
                    docker run --name restate_dev --rm -p 8080:8080 -p 9070:9070 -p 9071:9071 \
                    --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
                    ```

                    To run commands with the Restate CLI, use the following command:

                    ```shell
                    docker run -it --network=host docker.restate.dev/restatedev/restate-cli:VAR::RESTATE_VERSION invocations ls
                    ```

                    Replace `invocations ls` by the CLI command you want to run.

                </TabItem>
            </Tabs>
            You can find the Restate UI running on port 9070 (`http://localhost:9070`) after starting the Restate Server.
        </Step>
        <Step stepLabel="2" title="Get the Greeter service template">

            <CodeWithTabs>
                ```shell !!tabs CLI
                restate example python-hello-world &&
                cd python-hello-world
                ```

                ```shell !!tabs wget
                wget https://github.com/restatedev/examples/releases/latest/download/python-hello-world.zip &&
                unzip python-hello-world.zip -d python-hello-world &&
                rm python-hello-world.zip && cd python-hello-world
                ```

            </CodeWithTabs>

        </Step>
        <Step stepLabel="3" title="Run the Greeter service">

            Run it and let it listen on port 9080 for requests:

            ```shell
            uv run .
            ```

        </Step>

        <Step stepLabel="4" title="Register the service">

            Tell Restate where the service is running, so Restate can discover and register the services and handlers behind this endpoint.
            You can do this via the UI (`http://localhost:9070`) or via:
            <TerminalWithTabs>

                # !!terminals

                ```shell !command CLI
                restate deployments register http://localhost:9080
                ```

                ```shell !output
                ❯ SERVICES THAT WILL BE ADDED:
                - Greeter
                Type: Service
                HANDLER  INPUT                                     OUTPUT
                greet    value of content-type 'application/json'  value of content-type 'application/json'


                ✔ Are you sure you want to apply those changes? · yes
                ✅ DEPLOYMENT:
                SERVICE  REV
                Greeter  1
                ```

                # !!terminals

                ```shell !command curl
                curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                ```

                ```shell !output
                {
                    "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                    "services": [
                        {
                            "name": "Greeter",
                            "handlers": [
                                {
                                    "name": "greet",
                                    "ty": "Shared",
                                    "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                    "output_description": "value of content-type 'application/json'"
                                }
                            ],
                            "ty": "Service",
                            "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "revision": 1,
                            "public": true,
                            "idempotency_retention": "1day"
                        }
                    ]
                }
                ```

            </TerminalWithTabs>

            If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.
        </Step>

        <Step stepLabel="5" title="Send a request to the Greeter service">

            Invoke the service via the Restate UI playground: go to `http://localhost:9070`, click on your service and then on playground.
            <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>

            Or invoke via `curl`:
            <Terminal>

                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name": "Sarah"}'
                ```

                ```shell !output
                You said hi to Sarah!
                ```

            </Terminal>

        </Step>
        <Step stepLabel="🎉" title="Congratulations, you just ran Durable Execution!">

            The invocation you just sent used Durable Execution to make sure the request ran till completion.
            For each request, it sent a notification, slept for a second, and then sent a reminder.

            ```python https://github.com/restatedev/examples/blob/main/python/templates/python/app/greeter.py
            # collapse_prequel
            CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/python/templates/python/app/greeter.py
            ```

            Send a request for `Alice` to see how the service behaves when it occasionally fails to send the reminder and notification:
            <Terminal>
                ```shell !command
                curl localhost:8080/Greeter/greet --json '{"name": "Alice"}'
                ```
                ```shell !output
                You said hi to Alice!
                ```
            </Terminal>

            You can see in the service logs and in the Restate UI how the request gets retried.
            On a retry, it skipped the steps that already succeeded.

            <img src={"/img/quickstart/quickstart_retries.png"} alt="Restate UI Durable Execution" width="1000rem"/>

            Even the sleep is durable and tracked by Restate.
            If you kill/restart the service halfway through, the sleep will only last for what remained.

            <Admonition type={"tip"} title={"Durable Execution"}>
                Restate persists the progress of the handler.
                Letting you write code that is resilient to failures out of the box.
                Have a look at the [Durable Execution page](/concepts/durable_execution) to learn more.
            </Admonition>

        </Step>


    </TabItem>
    <TabItem value="rust" label="Rust">

        Select your favorite runtime:
        <Tabs groupId={"rust-runtime"} className={"selection-button"}>
            <TabItem value={"Tokio"} label={<><img src='/img/quickstart/tokio.svg' alt="Tokio" className="icon" />Tokio</>}>
                <Admonition type="note" title="Prerequisites">
                    - [Rust](https://rustup.rs/)
                </Admonition>
            </TabItem>
            <TabItem value={"Shuttle"} label={<><img src='/img/quickstart/shuttle-rust.png' alt="Shuttle" className="icon" />Shuttle</>}>
                <Admonition type="note" title="Prerequisites">
                    - [Rust](https://rustup.rs/)
                    - [Shuttle](https://docs.shuttle.dev/getting-started/installation)
                </Admonition>
            </TabItem>
        </Tabs>

        <Step stepLabel="1" title="Install Restate Server & CLI">
            Restate is a single self-contained binary. No external dependencies needed.
            <Tabs groupId={"running-restate"}>
                <TabItem value={"Homebrew"} label={"Homebrew"}>
                    <TextAndCode>
                        Install Restate Server and CLI via:

                        ```shell !result
                        brew install restatedev/tap/restate-server restatedev/tap/restate
                        ```
                    </TextAndCode>
                    <TextAndCode>
                        Then run the Restate Server with:
                        ```shell !result
                        restate-server
                        ```
                    </TextAndCode>
                </TabItem>
                <TabItem value={"bin"} label={"Download binaries"}>
                    Install the Restate Server and CLI by downloading the binaries with `curl` from the [releases page](https://github.com/restatedev/restate/releases/latest), and make them executable:

                    <CodeWithTabs>

                        ```shell !!tabs Linux-x64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=x86_64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs Linux-arm64
                        BIN=$HOME/.local/bin && RESTATE_PLATFORM=aarch64-unknown-linux-musl && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example ~/.local/bin:
                        mv restate $BIN && \
                        mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-x64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=x86_64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                        ```shell !!tabs MacOS-arm64
                        BIN=/usr/local/bin && RESTATE_PLATFORM=aarch64-apple-darwin && \
                        curl -L --remote-name-all https://restate.gateway.scarf.sh/latest/restate-{server,cli}-$RESTATE_PLATFORM.tar.xz && \
                        tar -xvf restate-server-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-server-$RESTATE_PLATFORM/restate-server && \
                        tar -xvf restate-cli-$RESTATE_PLATFORM.tar.xz --strip-components=1 restate-cli-$RESTATE_PLATFORM/restate && \
                        chmod +x restate restate-server && \

                        # Move the binaries to a directory in your PATH, for example /usr/local/bin (needs sudo):
                        sudo mv restate $BIN && \
                        sudo mv restate-server $BIN
                        ```

                    </CodeWithTabs>

                    Then run the Restate Server with:
                    ```shell
                    restate-server
                    ```

                </TabItem>
                <TabItem value={"Docker"} label={"Docker"}>

                    To run the Restate Server:

                    ```shell
                    docker run --name restate_dev --rm -p 8080:8080 -p 9070:9070 -p 9071:9071 \
                    --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
                    ```

                    To run commands with the Restate CLI, use the following command:

                    ```shell
                    docker run -it --network=host docker.restate.dev/restatedev/restate-cli:VAR::RESTATE_VERSION invocations ls
                    ```

                    Replace `invocations ls` by the CLI command you want to run.

                </TabItem>
            </Tabs>
            You can find the Restate UI running on port 9070 (`http://localhost:9070`) after starting the Restate Server.
        </Step>
        <Step stepLabel="2" title="Get the Greeter service template">
            <Tabs groupId={"rust-runtime"} className={"display-none"}>
                <TabItem value={"Tokio"}>
                    <CodeWithTabs>
                        ```shell !!tabs CLI
                        restate example rust-hello-world &&
                        cd rust-hello-world
                        ```

                        ```shell !!tabs wget
                        wget https://github.com/restatedev/examples/releases/latest/download/rust-hello-world.zip &&
                        unzip rust-hello-world.zip -d rust-hello-world &&
                        rm rust-hello-world.zip && cd rust-hello-world
                        ```

                    </CodeWithTabs>
                </TabItem>
                <TabItem value={"Shuttle"}>
                    <CodeWithTabs>
                        ```shell !!tabs CLI
                        restate example rust-shuttle-hello-world &&
                        cd rust-shuttle-hello-world
                        ```

                        ```shell !!tabs wget
                        wget https://github.com/restatedev/examples/releases/latest/download/rust-shuttle-hello-world.zip &&
                        unzip rust-shuttle-hello-world.zip -d rust-shuttle-hello-world &&
                        rm rust-shuttle-hello-world.zip && cd rust-shuttle-hello-world
                        ```

                    </CodeWithTabs>
                </TabItem>
            </Tabs>

        </Step>
        <Step stepLabel="3" title="Run the Greeter service">
            <Tabs groupId={"rust-runtime"} className={"display-none"}>
                <TabItem value={"Tokio"}>
                    ```shell
                    cargo run
                    ```
                </TabItem>
                <TabItem value={"Shuttle"}>
                    ```shell
                    cargo shuttle run --port 9080
                    ```
                </TabItem>
            </Tabs>
        </Step>

        <Step stepLabel="4" title="Register the service">

            Tell Restate where the service is running, so Restate can discover and register the services and handlers behind this endpoint.
            You can do this via the UI (`http://localhost:9070`) or via:
            <Tabs groupId={"rust-runtime"} className={"display-none"}>
                <TabItem value={"Tokio"}>

            <TerminalWithTabs>

                        # !!terminals

                        ```shell !command CLI
                        restate deployments register http://localhost:9080
                        ```

                        ```shell !output
                        ❯ SERVICES THAT WILL BE ADDED:
                        - Greeter
                        Type: Service
                        HANDLER  INPUT                                     OUTPUT
                        greet    value of content-type 'application/json'  value of content-type 'application/json'


                        ✔ Are you sure you want to apply those changes? · yes
                        ✅ DEPLOYMENT:
                        SERVICE  REV
                        Greeter  1
                        ```

                        # !!terminals

                        ```shell !command curl
                        curl localhost:9070/deployments --json '{"uri": "http://localhost:9080"}'
                        ```

                        ```shell !output
                        {
                            "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "services": [
                                {
                                    "name": "Greeter",
                                    "handlers": [
                                        {
                                            "name": "greet",
                                            "ty": "Shared",
                                            "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                            "output_description": "value of content-type 'application/json'"
                                        }
                                    ],
                                    "ty": "Service",
                                    "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                                    "revision": 1,
                                    "public": true,
                                    "idempotency_retention": "1day"
                                }
                            ]
                        }
                        ```

                    </TerminalWithTabs>
                </TabItem>
                <TabItem value={"Shuttle"}>

                    <TerminalWithTabs>

                        # !!terminals

                        ```shell !command CLI
                        restate deployments register http://localhost:9080 --use-http1.1
                        ```

                        ```shell !output
                        ❯ SERVICES THAT WILL BE ADDED:
                        - Greeter
                        Type: Service
                        HANDLER  INPUT                                     OUTPUT
                        greet    value of content-type 'application/json'  value of content-type 'application/json'


                        ✔ Are you sure you want to apply those changes? · yes
                        ✅ DEPLOYMENT:
                        SERVICE  REV
                        Greeter  1
                        ```

                        # !!terminals

                        ```shell !command curl
                        curl localhost:9070/deployments --json '{"uri": "http://localhost:9080", "use_http_11": true}'
                        ```

                        ```shell !output
                        {
                            "id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                            "services": [
                                {
                                    "name": "Greeter",
                                    "handlers": [
                                        {
                                            "name": "greet",
                                            "ty": "Shared",
                                            "input_description": "one of [\"none\", \"value of content-type 'application/json'\"]",
                                            "output_description": "value of content-type 'application/json'"
                                        }
                                    ],
                                    "ty": "Service",
                                    "deployment_id": "dp_17sztQp4gnEC1L0OCFM9aEh",
                                    "revision": 1,
                                    "public": true,
                                    "idempotency_retention": "1day"
                                }
                            ]
                        }
                        ```

                    </TerminalWithTabs>
                </TabItem>
            </Tabs>


            If you run Restate with Docker, use `http://host.docker.internal:9080` instead of `http://localhost:9080`.

        </Step>

        <Step stepLabel="5" title="Send a request to the Greeter service">

            Invoke the service via the Restate UI playground: go to `http://localhost:9070`, click on your service and then on playground.
            <img src={"/img/quickstart/playground.png"} alt="Restate UI Playground" width="800rem"/>

            Or invoke via `curl`:
            <Terminal>

                ```shell !command
                curl localhost:8080/Greeter/greet --json '"Sarah"'
                ```

                ```log !output
                You said hi to Sarah!
                ```

            </Terminal>

        </Step>
        <Step stepLabel="🎉" title="Congratulations, you just ran Durable Execution!">

            The invocation you just sent used Durable Execution to make sure the request ran till completion.
            For each request, it sent a notification, slept for a second, and then sent a reminder.
            <Tabs groupId={"rust-runtime"} className={"display-none"}>
                <TabItem value={"Tokio"}>
                    ```rust https://github.com/restatedev/examples/blob/main/rust/templates/rust/src/main.rs
                    // collapse_prequel
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/rust/templates/rust/src/main.rs
                    ```
                </TabItem>
                <TabItem value={"Shuttle"}>
                    ```rust https://github.com/restatedev/examples/blob/main/rust/templates/rust-shuttle/src/main.rs
                    // collapse_prequel
                    CODE_LOAD::https://raw.githubusercontent.com/restatedev/examples/refs/heads/main/rust/templates/rust-shuttle/src/main.rs
                    ```
                </TabItem>
            </Tabs>

            Send a request for `Alice` to see how the service behaves when it occasionally fails to send the reminder and notification:
            <Terminal>
                ```shell !command
                curl localhost:8080/Greeter/greet --json '"Alice"'
                ```
                ```shell !output
                You said hi to Alice!
                ```
            </Terminal>

            You can see in the service logs and in the Restate UI how the request gets retried.
            On a retry, it skipped the steps that already succeeded.

            <img src={"/img/quickstart/quickstart_retries.png"} alt="Restate UI Durable Execution" width="1000rem"/>

            Even the sleep is durable and tracked by Restate.
            If you kill/restart the service halfway through, the sleep will only last for what remained.

            <Admonition type={"tip"} title={"Durable Execution"}>
                Restate persists the progress of the handler.
                Letting you write code that is resilient to failures out of the box.
                Have a look at the [Durable Execution page](/concepts/durable_execution) to learn more.
            </Admonition>

        </Step>
    </TabItem>
</Tabs>

## Next steps
- Read the [Concepts](/concepts/durable_building_blocks)
- Discover the key features of Restate in the [Tour of Restate](/get_started/tour)
- [Run the examples](https://github.com/restatedev/examples)
