---
title: "Deploying TypeScript services on AWS Lambda"
description: "Learn how to run Restate TypeScript services on AWS Lambda."
pagination_next: null
pagination_prev: null
---

import {Step} from "../../src/components/Stepper";
import Admonition from '@theme/Admonition';
import {CodeWithTabs} from "../../src/components/code/code";

# Deploying Restate TypeScript services on AWS Lambda

This tutorial shows how to deploy a greeter service written with the Restate TypeScript SDK on AWS Lambda via AWS console.

<Admonition type="note" title="Prerequisites">
    - [The prerequisites for running Restate TS services](/get_started/quickstart)
    - An AWS account with permissions for Lambda.
</Admonition>

<Step stepLabel="1" title={<span><a href={"/get_started/quickstart"}>Get the Greeter service template</a></span>}/>

    <Step stepLabel="2" title={<span><a href={"/develop/ts/serving#creating-a-lambda-handler"}>Convert the endpoint to a Lambda handler</a></span>}/>
<Step stepLabel="3" title="Create a zip file from the code base">
    Now, we need to create a zip file that includes the service code and the required dependencies to run it.
    To build the code and make the zip file, do

    ```shell
    npm run bundle
    ```
</Step>
<Step stepLabel="4" title="Deploying the Lambda function via the AWS console">
    Go to the Lambda UI in the AWS console. Click on `Create function`.
    Fill in the name of your function. You can leave the settings to the default.

    <details>
        <summary>View</summary>

        ![Create function](/img/create-function.png)

    </details>

    Click `Create function`.

    You should now see a function overview with your new function in it.

    <details>
        <summary>View</summary>

        ![Function overview](/img/function-overview.png)
    </details>

    The next step is uploading the zip file with our function code.
    Open the `Code` tab in the section below the function overview.
    Click on `Upload from` and select your zip file.
    You should now see the uploaded code in the browser editor.

    By default, Lambda assumes that your handler can be found under `index.handler`.
    So this means that you should have the Restate Lambda handler assigned to `export const handler` in the file `src/app.ts`, as shown in the code.
    This handler will then be included in `index.js` after creating the zip, and be used by AWS Lambda as the entry point of the Lambda function.
    To change that you can scroll down to `Runtime settings` and change the handler reference.

    Finally, let's publish a new version of our Lambda function.
    Go to the tab `Versions` and click `Publish new version` and then `Publish`.

    Our Lambda function should now be working!
</Step>
<Step stepLabel="5" title="Running Restate Server">
    Run the Restate Server via one of the options listed in [the docs](/develop/local_dev#running-restate-server--cli-locally).

    <details>

        <summary>Running Restate in a Docker container</summary>

        If you run Restate in a Docker container, then make sure it can using your local AWS creds (defined in ~/.aws):

        ```shell
        docker run -e AWS_PROFILE -v ~/.aws/:/root/.aws --name restate_dev --rm -p 8080:8080 -p 9070:9070 -p 9071:9071 --add-host=host.docker.internal:host-gateway docker.restate.dev/restatedev/restate:VAR::RESTATE_VERSION
        ```
    </details>


</Step>
<Step stepLabel="6" title="Registering the service">

    Connect to the Restate Server (e.g. via an SSH session if it is running on EC2) and execute [the registration command](/operate/registration):

    <CodeWithTabs groupId="interface">
        ```shell !!tabs CLI
        restate deployments register arn:aws:lambda:eu-central-1:000000000000:function:my-greeter:1
        ```
        ```shell !!tabs curl
        curl localhost:9070/deployments --json '{"arn": "arn:aws:lambda:eu-central-1:000000000000:function:my-greeter:1"  }'
        ```
    </CodeWithTabs>

    Make sure you replace the Lambda function ARN with the one you deployed, including it's version tag (here `1`).

    When executing this command, you should see the discovered services printed out!

</Step>
<Step stepLabel="7" title="Invoke the handler">

    ```shell
    curl localhost:8080/Greeter/greet --json '"Hi"'
    ```

    The Greeter service should say hi back.
</Step>
<Step end={true} stepLabel="🎉" title="Congratulations, you managed to run your first Restate Lambda handler!"/>


Here are some next steps for you to try:

- Add a new method to the greeter function and redeploy the Lambda function with the new methods enabled.
- Create and deploy a new Lambda function that calls the greeter function.
