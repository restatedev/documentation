import "./animation-stylesheet.css"
import React, {useEffect, useRef, useState} from "react"
import clsx from "clsx";

class Ingress extends React.Component {
    render() {
        return <div className="col col--1 padding-horiz--sm">
            <div id="ingress" className="h-100">
                <div id="placeholder">
                    <h6>
                        <a className="rpc_arrow text--center color-1 set-color smallest_font"/>
                    </h6>
                </div>
                <div
                    id="ingress_call"
                    className="color-1 set-color display-none padding--sm"
                >
                    <div className="horizontal_rpc_arrow display-inline-block text--center">
                        <img
                            src="/img/durable_execution_animation/click.png"
                            className="text--center display-inline-block padding--sm"
                        />
                        <div
                            className="smallest_font display-inline-block text--center color-1 set-bg set-color align-middle margin-bottom--md">
                            HTTP request <br/> addTicket <br/>
                            (Mary, seat2B)
                        </div>
                        →
                    </div>
                </div>
                <div
                    id="response_ingress_call"
                    className="color-7 set-color display-none padding--sm"
                >
                    <div className="horizontal_rpc_arrow display-inline-block text--center">
                        <img
                            src="/img/durable_execution_animation/add-cart.png"
                            className="text--center display-inline-block padding--sm"
                        />
                        <div
                            className="smaller_font display-inline-block text--center color-7 set-bg set-color align-middle">
                            HTTP response <br/> addTicket <br/> {"{"} success {"}"}
                        </div>
                        ←
                    </div>
                </div>
            </div>
        </div>;
    }
}

class Runtime extends React.Component {
    render() {
        return <div className="col col--4 padding-horiz--md">
            <div
                id="restate-runtime"
                className="section_animation color-primary set-border justify-content-center margin-vert--sm padding--md"
            >
                <div className="text--center">
                    <img
                        className="logo-animation img-fluid"
                        src="/img/restate-logo.svg"
                    />
                </div>
                <h6>Journals</h6>
                <div
                    id="restate_journal_cart"
                    className="bg-primary-line padding--sm display-none"
                >
                    <p className="color-1 set-color set-bg text--center smaller_font">
                        addTicket ( Mary, seat2B )
                    </p>
                    <div
                        id="restate_journal_cart_0"
                        className="box color-1 set-bg-dark"
                    >
                        {" "}
                        |||||{" "}
                    </div>
                    <div
                        id="restate_journal_cart_1"
                        className="box color-2 set-bg-dark display-none"
                    >
                        |||||
                    </div>
                    <div
                        id="restate_journal_cart_2"
                        className="box color-3 set-bg-dark display-none"
                    >
                        |||||
                    </div>
                    <div
                        id="restate_journal_cart_3"
                        className="box color-7 set-bg-dark display-none"
                    >
                        |||||
                    </div>
                </div>
                <div id="rpc_arrow_request" className="margin--sm display-none">
                    <div className="smaller_font color-2 set-color set-bg text--center smaller_font">
                        RPC: reserve {"{"} seat2B {"}"}
                    </div>
                    <div className="vertical_rpc_arrow color-2 set-color text--center">
                        ↓
                    </div>
                </div>
                <div id="rpc_arrow_response" className="margin--sm display-none">
                    <div className="vertical_rpc_arrow color-3 set-color text--center">
                        ↑
                    </div>
                    <div className="smaller_font color-3 set-color set-bg text--center smaller_font">
                        RPC: response {"{"} success {"}"}
                    </div>
                </div>
                <div
                    id="restate_journal_ticket"
                    className="bg-primary-line padding--sm display-none"
                >
                    <p className="color-2 set-color set-bg text--center smaller_font">
                        reserve ( seat2B )
                    </p>
                    <div
                        id="restate_journal_ticket_0"
                        className="box color-2 set-bg-dark"
                    >
                        {" "}
                        |||||{" "}
                    </div>
                    <div
                        id="restate_journal_ticket_1"
                        className="box color-3 set-bg-dark display-none"
                    >
                        {" "}
                        |||||{" "}
                    </div>
                </div>
            </div>
        </div>;
    }
}

class Services extends React.Component {
    render() {
        return <div className="col col--7 padding-horiz--md">
            <p id="animation_explanation" className="padding--sm padding-left--md text--center">
                This animation shows you what happened under the hood when we did the reserve call from the `CartObject` to the `TicketObject`.
                The animation uses the TypeScript SDK.
            </p>
            <div id="cart_service_div" className="row margin-vert--none margin-horiz--none">
                <div className="col col--1 padding-horiz--none margin-bottom--md">
                    <div
                        id="cart_request_arrow"
                        className="horizontal_rpc_arrow text--center color-1 set-color display-none padding-horiz--none"
                    >
                        →
                    </div>
                    <div
                        id="cart_suspend_arrow"
                        className="horizontal_rpc_arrow text--center color-2 set-color display-none padding-horiz--none"
                    >
                        ←
                    </div>
                    <div
                        id="cart_response_arrow"
                        className="horizontal_rpc_arrow text--center color-7 set-color display-none padding-horiz--none"
                    >
                        ←
                    </div>
                </div>
                <div className="col col--11 padding-horiz--none bg-light section_animation smaller_font">
                    <div id="cart_service_box">
                        <div className="flex-none border-b">
                            <div className="flex items-center h-8 padding-horiz--md">
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="service-name padding-horiz--sm">CartObject[Mary]</div>
                                <div
                                    id="cart_title_suspended"
                                    className="service-name color-red padding-horiz--sm"
                                >
                                    {" "}
                                    suspended...
                                </div>
                                <div
                                    id="cart_title_invoked"
                                    className="service-name color-green padding-horiz--sm display-none"
                                >
                                    {" "}
                                    invoked...
                                </div>
                            </div>
                        </div>
                        <pre className="margin--none padding--sm suspended" id="cart_service">
                    <span className="hljs-keyword">async function</span> addTicket{"(ctx, ticketId){"}
                            {"\n"}
                            {"  "}
                            <span className="hljs-keyword">const</span> success ={" "}
                            <span className="hljs-keyword">await</span> ctx
                            {"\n"}
                            {"    "}
                            .<span className="hljs-title function_">objectClient</span>
                    (ticketObject)
                            {"\n"}
                            {"    "}
                            .<span className="hljs-title function_">reserve</span>
                    (ticketId);
                            {"\n"}
                            {"\n"}
                            {"  "}
                            <span className="hljs-keyword">return</span> success;{"\n"}
                            {"}"}
      </pre>
                    </div>
                    <div
                        id="journal_cart"
                        className="smallest_font display-none padding--sm bg-light"
                    >
                        <p className="smaller_font margin-bottom--none">
                            Journal: <br/>
                        </p>
                        <div
                            id="journal_cart_0"
                            className="text--center display-inline-block color-1 set-bg set-color padding-horiz--xs"
                        >
                            (Mary, seat2B)
                        </div>
                        <div
                            id="journal_cart_1"
                            className="text--center display-inline-block display-none color-2 set-bg set-color padding-horiz--xs"
                        >
                            RPC reserve <br/>
                            {"{"} seat2B {"}"}
                        </div>
                        <div
                            id="journal_cart_2"
                            className="text--center display-inline-block display-none color-3 set-bg set-color padding-horiz--xs"
                        >
                            RPC resp <br/>
                            {"{"} success {"}"}
                        </div>
                        <div
                            id="journal_cart_3"
                            className="text--center display-inline-block display-none color-7 set-bg set-color padding-horiz--xs"
                        >
                            response <br/>
                            {"{"} success {"}"}
                        </div>
                    </div>
                </div>
            </div>
            <div id="ticket_service_div" className="row margin-top--md margin-horiz--none">
                <div className="col col--1 padding-horiz--none margin-bottom--md">
                    <div
                        id="ticket_request_arrow"
                        className="horizontal_rpc_arrow text--center color-2 set-color display-none"
                    >
                        →
                    </div>
                    <div
                        id="ticket_response_arrow"
                        className="horizontal_rpc_arrow text--center color-3 set-color display-none"
                    >
                        ←
                    </div>
                </div>
                <div className="col col--11 padding-horiz--none bg-light section_animation smaller_font">
                    <div id="ticket_service_box">
                        <div className="flex-none border-b">
                            <div className="flex items-center h-8 padding-horiz--md">
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="service-name padding-horiz--sm">TicketObject[seat2B]</div>
                                <div
                                    id="ticket_title_suspended"
                                    className="service-name color-red padding-horiz--sm"
                                >
                                    {" "}
                                    suspended...
                                </div>
                                <div
                                    id="ticket_title_invoked"
                                    className="service-name color-green padding-horiz--sm display-none"
                                >
                                    {" "}
                                    invoked...
                                </div>
                            </div>
                        </div>
                        <pre className="margin--none padding--sm suspended" id="ticket_service">
                    <span className="hljs-keyword">async function</span> reserve{"(ctx, ticketId){"}
                            {"\n"}
                            {"  "}...{"\n"}
                            {"  "}
                            <span className="hljs-keyword">return</span> success;{"\n"}
                            {"}"}
                  </pre>
                    </div>
                    <div
                        id="journal_ticket"
                        className="smallest_font display-none padding--sm bg-light"
                    >
                        <p className="smaller_font margin-bottom--none">
                            Journal: <br/>
                        </p>
                        <div
                            id="journal_ticket_0"
                            className="text--center display-inline-block color-2 set-bg set-color padding-horiz--xs"
                        >
                            (seat2B)
                        </div>
                        <div
                            id="journal_ticket_1"
                            className="text--center display-inline-block display-none color-3 set-bg set-color padding-horiz--xs"
                        >
                            response: <br/> {"{"} success {"}"}
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

const defaultAnimation = "<div class=\"col col--1 padding-horiz--sm\"><div id=\"ingress\" class=\"h-100\"><div id=\"placeholder\"><h6><a class=\"rpc_arrow text--center color-1 set-color smallest_font\"></a></h6></div><div id=\"ingress_call\" class=\"color-1 set-color display-none padding--sm\"><div class=\"horizontal_rpc_arrow display-inline-block text--center\"><img src=\"/img/durable_execution_animation/click.png\" class=\"text--center display-inline-block padding--sm\"><div class=\"smallest_font display-inline-block text--center color-1 set-bg set-color align-middle margin-bottom--md\">HTTP request <br> addTicket <br>(Mary, seat2B)</div>→</div></div><div id=\"response_ingress_call\" class=\"color-7 set-color display-none padding--sm\"><div class=\"horizontal_rpc_arrow display-inline-block text--center\"><img src=\"/img/durable_execution_animation/add-cart.png\" class=\"text--center display-inline-block padding--sm\"><div class=\"smaller_font display-inline-block text--center color-7 set-bg set-color align-middle\">HTTP response <br> addTicket <br> { success }</div>←</div></div></div></div><div class=\"col col--4 padding-horiz--md\"><div id=\"restate-runtime\" class=\"section_animation color-primary set-border justify-content-center margin-vert--sm padding--md\"><div class=\"text--center\"><img class=\"logo-animation img-fluid\" src=\"/img/restate-logo.svg\"></div><h6>Journals</h6><div id=\"restate_journal_cart\" class=\"bg-primary-line padding--sm display-none\"><p class=\"color-1 set-color set-bg text--center smaller_font\">addTicket ( Mary, seat2B )</p><div id=\"restate_journal_cart_0\" class=\"box color-1 set-bg-dark\"> ||||| </div><div id=\"restate_journal_cart_1\" class=\"box color-2 set-bg-dark display-none\">|||||</div><div id=\"restate_journal_cart_2\" class=\"box color-3 set-bg-dark display-none\">|||||</div><div id=\"restate_journal_cart_3\" class=\"box color-7 set-bg-dark display-none\">|||||</div></div><div id=\"rpc_arrow_request\" class=\"margin--sm display-none\"><div class=\"smaller_font color-2 set-color set-bg text--center smaller_font\">RPC: reserve { seat2B }</div><div class=\"vertical_rpc_arrow color-2 set-color text--center\">↓</div></div><div id=\"rpc_arrow_response\" class=\"margin--sm display-none\"><div class=\"vertical_rpc_arrow color-3 set-color text--center\">↑</div><div class=\"smaller_font color-3 set-color set-bg text--center smaller_font\">RPC: response { success }</div></div><div id=\"restate_journal_ticket\" class=\"bg-primary-line padding--sm display-none\"><p class=\"color-2 set-color set-bg text--center smaller_font\">reserve ( seat2B )</p><div id=\"restate_journal_ticket_0\" class=\"box color-2 set-bg-dark\"> ||||| </div><div id=\"restate_journal_ticket_1\" class=\"box color-3 set-bg-dark display-none\"> ||||| </div></div></div></div><div class=\"col col--7 padding-horiz--md\"><p id=\"animation_explanation\" class=\"padding--sm padding-left--md text--center\">This animation shows you what happened under the hood when we did the reserve call from the `CartObject` to the `TicketObject`. The animation uses the TypeScript SDK.</p><div id=\"cart_service_div\" class=\"row margin-vert--none margin-horiz--none\"><div class=\"col col--1 padding-horiz--none margin-bottom--md\"><div id=\"cart_request_arrow\" class=\"horizontal_rpc_arrow text--center color-1 set-color display-none padding-horiz--none\">→</div><div id=\"cart_suspend_arrow\" class=\"horizontal_rpc_arrow text--center color-2 set-color display-none padding-horiz--none\">←</div><div id=\"cart_response_arrow\" class=\"horizontal_rpc_arrow text--center color-7 set-color display-none padding-horiz--none\">←</div></div><div class=\"col col--11 padding-horiz--none bg-light section_animation smaller_font\"><div id=\"cart_service_box\"><div class=\"flex-none border-b\"><div class=\"flex items-center h-8 padding-horiz--md\"><div class=\"ide_button\"></div><div class=\"ide_button\"></div><div class=\"ide_button\"></div><div class=\"service-name padding-horiz--sm\">CartObject[Mary]</div><div id=\"cart_title_suspended\" class=\"service-name color-red padding-horiz--sm\"> suspended...</div><div id=\"cart_title_invoked\" class=\"service-name color-green padding-horiz--sm display-none\"> invoked...</div></div></div><pre class=\"margin--none padding--sm suspended\" id=\"cart_service\"><span class=\"hljs-keyword\">async function</span> addTicket(ctx, ticketId){\n" +
    "  <span class=\"hljs-keyword\">const</span> success = <span class=\"hljs-keyword\">await</span> ctx\n" +
    "    .<span class=\"hljs-title function_\">objectClient</span>(ticketObject)\n" +
    "    .<span class=\"hljs-title function_\">reserve</span>(ticketId);\n" +
    "\n" +
    "  <span class=\"hljs-keyword\">return</span> success;\n" +
    "}</pre></div><div id=\"journal_cart\" class=\"smallest_font display-none padding--sm bg-light\"><p class=\"smaller_font margin-bottom--none\">Journal: <br></p><div id=\"journal_cart_0\" class=\"text--center display-inline-block color-1 set-bg set-color padding-horiz--xs\">(Mary, seat2B)</div><div id=\"journal_cart_1\" class=\"text--center display-inline-block display-none color-2 set-bg set-color padding-horiz--xs\">RPC reserve <br>{ seat2B }</div><div id=\"journal_cart_2\" class=\"text--center display-inline-block display-none color-3 set-bg set-color padding-horiz--xs\">RPC resp <br>{ success }</div><div id=\"journal_cart_3\" class=\"text--center display-inline-block display-none color-7 set-bg set-color padding-horiz--xs\">response <br>{ success }</div></div></div></div><div id=\"ticket_service_div\" class=\"row margin-top--md margin-horiz--none\"><div class=\"col col--1 padding-horiz--none margin-bottom--md\"><div id=\"ticket_request_arrow\" class=\"horizontal_rpc_arrow text--center color-2 set-color display-none\">→</div><div id=\"ticket_response_arrow\" class=\"horizontal_rpc_arrow text--center color-3 set-color display-none\">←</div></div><div class=\"col col--11 padding-horiz--none bg-light section_animation smaller_font\"><div id=\"ticket_service_box\"><div class=\"flex-none border-b\"><div class=\"flex items-center h-8 padding-horiz--md\"><div class=\"ide_button\"></div><div class=\"ide_button\"></div><div class=\"ide_button\"></div><div class=\"service-name padding-horiz--sm\">TicketObject[seat2B]</div><div id=\"ticket_title_suspended\" class=\"service-name color-red padding-horiz--sm\"> suspended...</div><div id=\"ticket_title_invoked\" class=\"service-name color-green padding-horiz--sm display-none\"> invoked...</div></div></div><pre class=\"margin--none padding--sm suspended\" id=\"ticket_service\"><span class=\"hljs-keyword\">async function</span> reserve(ctx, ticketId){\n" +
    "  ...\n" +
    "  <span class=\"hljs-keyword\">return</span> success;\n" +
    "}</pre></div><div id=\"journal_ticket\" class=\"smallest_font display-none padding--sm bg-light\"><p class=\"smaller_font margin-bottom--none\">Journal: <br></p><div id=\"journal_ticket_0\" class=\"text--center display-inline-block color-2 set-bg set-color padding-horiz--xs\">(seat2B)</div><div id=\"journal_ticket_1\" class=\"text--center display-inline-block display-none color-3 set-bg set-color padding-horiz--xs\">response: <br> { success }</div></div></div></div></div>";


export default function TourAnimation() {
    console.info("Called DurableExecutionAnimation");

    const [animationState, setAnimationState] = useState({ animationIndex: -1, cartSvcCodeLine: 0, ticketSvcCodeLine: 0 });
    const progressBarRef = useRef(null);

    useEffect(() => {
        progressBarRef.current.value = animationState.animationIndex;
    }, [animationState]);

    function highlightNextCartSvcCodeLine(cartSvcCodeLine) {
        console.info("Called highlightNextCartSvcCodeLine");
        // Update cart service code highlighting
        // Update state for journal element visibility
        const linesToHighlightPerJournalIndex = {
            0: [0],
            1: [1,2,3],
            2: [5],
            3: [6],
            4: [7],
            5: [9],
            6: [],
        }
        document.getElementById("cart_service").innerHTML = document.getElementById("cart_service")
            .innerHTML.split("\n")
            .map((line, index) =>
                linesToHighlightPerJournalIndex[cartSvcCodeLine].includes(index)
                    ? `<mark class="code-highlight color-${cartSvcCodeLine + 1} set-bg">${line}</mark>`
                    : line,
            )
            .join("\n");
        const journalCartElement = document.getElementById("journal_cart_" + cartSvcCodeLine);
        if (journalCartElement) journalCartElement.classList.remove("display-none");
        const restateJournalElement = document.getElementById("restate_journal_cart_" + cartSvcCodeLine);
        if (restateJournalElement) restateJournalElement.classList.remove("display-none");
    }

    function highlightNextTicketSvcCodeLine(cartSvcCodeLine, ticketSvcCodeLine) {
        console.info("Called highlightNextTicketSvcCodeLine");
        // Update ticket service code highlighting
        // Update state for journal element visibility
        const linesToHighlightPerJournalIndex = {
            0: [0],
            1: [2],
            2: [],
        }
        document.getElementById("ticket_service").innerHTML = document.getElementById("ticket_service")
            .innerHTML.split("\n")
            .map((line, index) =>
                linesToHighlightPerJournalIndex[ticketSvcCodeLine].includes(index)
                    ? `<mark class="code-highlight color-${cartSvcCodeLine + ticketSvcCodeLine} set-bg">${line}</mark>`
                    : line,
            )
            .join("\n");
        const journalTicketElement = document.getElementById("journal_ticket_" + ticketSvcCodeLine);
        if (journalTicketElement) journalTicketElement.classList.remove("display-none");
        const restateJournalTicketElement = document.getElementById("restate_journal_ticket_" + ticketSvcCodeLine);
        if (restateJournalTicketElement) restateJournalTicketElement.classList.remove("display-none");
    }

    function animate(rewind=false) {
        setAnimationState(prevState => {
            console.info("Called animate, will animate to " + prevState.animationIndex);

            let requestedIndex;
            if(rewind){
                console.info("Rewinding animation")
                requestedIndex = prevState.animationIndex - 1;
                prevState = { animationIndex: -1, cartSvcCodeLine: 0, ticketSvcCodeLine: 0 };
                const animationElement = document.getElementById("animation");
                animationElement.innerHTML = defaultAnimation;
            } else {14
                requestedIndex = (prevState.animationIndex < 12) ? prevState.animationIndex + 1 : -1;
            }14

            if(requestedIndex === -1){
                prevState = { animationIndex: -1, cartSvcCodeLine: 0, ticketSvcCodeLine: 0 };
                const animationElement = document.getElementById("animation");
                animationElement.innerHTML = defaultAnimation;
            } else {
                while (prevState.animationIndex < requestedIndex) {
                    prevState = switchToNewState(prevState);
                }
            }

            progressBarRef.current.value = requestedIndex;

            console.info("Returning new state", prevState)
            return prevState;
        })
    }


    function switchToNewState(prevState) {
        prevState.animationIndex = prevState.animationIndex + 1
            switch (prevState.animationIndex) {
                case 0: {
                    // Show the ingress call
                    console.info("Animation step 0 Show the ingress call")
                    document.getElementById("animation_explanation").innerHTML = "An HTTP request arrives at Restate. The request specifies that Mary wants to add a ticket with seat2B to her cart.";
                    document
                        .getElementById("ingress_call")
                        .classList.remove("display-none");
                    break;
                }
                case 1: {
                    // Create journal in Restate
                    console.info("Animation step 1 Create journal in Restate")
                    document.getElementById("animation_explanation").innerHTML = "Restate persists the incoming request by creating a new journal for it.</br>" +
                        "Restate will now make sure that the execution of this request will run to completion, even in the face of failures.";
                    document
                        .getElementById("restate_journal_cart")
                        .classList.remove("display-none");
                    break;
                }
                case 2: {
                    // Invoke the service
                    console.info("Animation step 2 Invoke the service")
                    document.getElementById("animation_explanation").innerHTML = "After persisting the request, Restate invokes the addTicket handler, as specified by the request. " +
                        "Restate sends over the journal which contains the request data."
                    document.getElementById("cart_service").classList.remove("suspended");
                    document
                        .getElementById("cart_title_suspended")
                        .classList.add("display-none");
                    document
                        .getElementById("cart_title_invoked")
                        .classList.remove("display-none");
                    highlightNextCartSvcCodeLine(prevState.cartSvcCodeLine)
                    prevState.cartSvcCodeLine += 1;
                    document
                        .getElementById("journal_cart")
                        .classList.remove("display-none");
                    document
                        .getElementById("cart_request_arrow")
                        .classList.remove("display-none");
                    break;
                }
                case 3: {
                    // Execute first line
                    console.info("Animation step 3 Execute first line")
                    document.getElementById("animation_explanation").innerHTML = "The handler now starts executing. " +
                        "Every time the code uses the Restate context `ctx`, the SDK notifies Restate of the outcome of this action. " +
                        "The Restate server then adds this action as a new entry to the journal. " +
                        "Once persisted in the journal, this action will be skipped during retries, and the journaled result will be returned."
                    highlightNextCartSvcCodeLine(prevState.cartSvcCodeLine)
                    prevState.cartSvcCodeLine += 1;
                    document
                        .getElementById("cart_request_arrow")
                        .classList.add("display-none");
                    break;
                }
                case 4: {
                    console.info("Animation step 4")
                    document.getElementById("animation_explanation").innerHTML = "Then, the addTicket handler does a call to the reserve handler of the TicketObject. " +
                        "The RPC call gets proxied via Restate.";
                    document
                        .getElementById("cart_suspend_arrow")
                        .classList.remove("display-none");
                    break;
                }
                case 5: {
                    // suspension
                    console.info("Animation step 5 suspension")
                    document.getElementById("animation_explanation").innerHTML = "Restate creates a new journal for the reserve call and adds the request data to it. " +
                        "In the meantime, the CartObject has suspended. Restate lets handlers suspend whenever they are waiting for something that gets managed by Restate (e.g. RPC, timers, awakeables). " +
                        "This is especially useful when running handlers on FaaS platforms (e.g. AWS Lambda), because you don't pay for the wait time. "
                    document.getElementById("journal_cart").classList.add("display-none");
                    document.getElementById("cart_service").classList.add("suspended");
                    document
                        .getElementById("cart_title_suspended")
                        .classList.remove("display-none");
                    document
                        .getElementById("cart_title_invoked")
                        .classList.add("display-none");
                    document
                        .getElementById("cart_suspend_arrow")
                        .classList.add("display-none");

                    // start of call to ticket service
                    document
                        .getElementById("rpc_arrow_request")
                        .classList.remove("display-none");
                    document
                        .getElementById("restate_journal_ticket")
                        .classList.remove("display-none");
                    break;
                }
                case 6: {
                    // start executing ticket service
                    console.log("Animation step 6 start executing ticket service")
                    document.getElementById("animation_explanation").innerHTML = "Restate invokes the reserve handler of the TicketObject and supplies the journal.";
                    document.getElementById("ticket_service").classList.remove("suspended");
                    document
                        .getElementById("ticket_title_suspended")
                        .classList.add("display-none");
                    document
                        .getElementById("ticket_title_invoked")
                        .classList.remove("display-none");
                    highlightNextTicketSvcCodeLine(prevState.cartSvcCodeLine, prevState.ticketSvcCodeLine);
                    prevState.ticketSvcCodeLine +=1;
                    document
                        .getElementById("journal_ticket")
                        .classList.remove("display-none");
                    document
                        .getElementById("ticket_request_arrow")
                        .classList.remove("display-none");
                    break;
                }
                case 7: {
                    // get response ticket service
                    console.log("Animation step 7 get response ticket service")
                    document.getElementById("animation_explanation").innerHTML = "The function executes and eventually the ticket gets reserved successfully. " +
                        "The success result is logged in the journal of the TicketObject, and this invocation is now considered completed. " +
                        "Restate will then proxy the response to the CartObject.";
                    highlightNextTicketSvcCodeLine(prevState.cartSvcCodeLine, prevState.ticketSvcCodeLine);
                    prevState.ticketSvcCodeLine +=1;
                    document
                        .getElementById("ticket_request_arrow")
                        .classList.add("display-none");
                    document
                        .getElementById("ticket_response_arrow")
                        .classList.remove("display-none");
                    break;
                }
                case 8: {
                    console.log("Animation step 8")
                    document.getElementById("animation_explanation").innerHTML = "Restate adds the success response to the journal of the addTicket invocation. " +
                        "This way, the reserve call will not be re-executed during retries of the addTicket handler. " +
                        "Restate now re-invokes the addTicket handler with its new journal, including the RPC response.";
                    highlightNextCartSvcCodeLine(prevState.cartSvcCodeLine)
                    prevState.cartSvcCodeLine += 1;
                    document
                        .getElementById("rpc_arrow_request")
                        .classList.add("display-none");
                    document
                        .getElementById("rpc_arrow_response")
                        .classList.remove("display-none");
                    document.getElementById("ticket_service").classList.add("suspended");
                    document
                        .getElementById("ticket_title_suspended")
                        .classList.remove("display-none");
                    document
                        .getElementById("ticket_title_invoked")
                        .classList.add("display-none");
                    document.getElementById("journal_ticket").classList.add("display-none");
                    document
                        .getElementById("journal_ticket_1")
                        .classList.add("display-none");
                    document
                        .getElementById("ticket_response_arrow")
                        .classList.add("display-none");
                    break;
                }
                case 9: {
                    console.log("Animation step 9")
                    document.getElementById("animation_explanation").innerHTML = "The addTicket handler now continues executing.";
                    document
                        .getElementById("restate_journal_ticket")
                        .classList.add("display-none");
                    document
                        .getElementById("restate_journal_ticket_1")
                        .classList.add("display-none");
                    document
                        .getElementById("rpc_arrow_response")
                        .classList.add("display-none");
                    document
                        .getElementById("cart_request_arrow")
                        .classList.remove("display-none");
                    document
                        .getElementById("journal_cart")
                        .classList.remove("display-none");
                    document.getElementById("cart_service").classList.remove("suspended");
                    document
                        .getElementById("cart_title_suspended")
                        .classList.add("display-none");
                    document
                        .getElementById("cart_title_invoked")
                        .classList.remove("display-none");
                    break;
                }
                case 10: {
                    console.log("Animation step 10")
                    document.getElementById("animation_explanation").innerHTML = "The handler finishes the execution by returning the success boolean. The journal with the response is transferred to Restate.";
                    highlightNextCartSvcCodeLine(prevState.cartSvcCodeLine);
                    prevState.cartSvcCodeLine += 1;
                    highlightNextCartSvcCodeLine(prevState.cartSvcCodeLine);
                    prevState.cartSvcCodeLine += 1;
                    document
                        .getElementById("cart_request_arrow")
                        .classList.add("display-none");
                    document
                        .getElementById("cart_response_arrow")
                        .classList.remove("display-none");
                    break;
                }
                case 11: {
                    console.log("Animation step 11")
                    document.getElementById("animation_explanation").innerHTML = "The handler finishes the execution by returning the success boolean. The journal with the response is transferred to Restate.";
                    document.getElementById("journal_cart").classList.add("display-none");
                    document
                        .getElementById("cart_response_arrow")
                        .classList.add("display-none");
                    document.getElementById("cart_service").classList.add("suspended");
                    document
                        .getElementById("cart_title_suspended")
                        .classList.remove("display-none");
                    document
                        .getElementById("cart_title_invoked")
                        .classList.add("display-none");
                    break;
                }
                case 12: {
                    console.log("Animation step 12")
                    document.getElementById("animation_explanation").innerHTML = "Once Restate has persisted the response in the journal, it responds to the caller, and the invocation has completed successfully!";
                    document.getElementById("ingress_call").classList.add("display-none");
                    document
                        .getElementById("response_ingress_call")
                        .classList.remove("display-none");
                    break;
                }
                case 13: {
                    console.log("Animation step 13 RESET")
                    document.getElementById("animation_explanation").innerHTML = "Restate.";
                    prevState = { animationIndex: 0, cartSvcCodeLine: 0, ticketSvcCodeLine: 0 };
                    const animationElement = document.getElementById("animation");
                    animationElement.innerHTML = defaultAnimation;
                    break;
                }
            }
            return prevState;
        }

    const handlePrev = () => {
        animate(true);
    };
    const handleNext = () => {
        animate()
    };

    const handleProgressBarChange = (event) => {
        const currentValue = parseInt(event.target.value);
        if (currentValue > animationState.animationIndex) {
            // Moved to the right, call handleNext
            for (let i = animationState.animationIndex; i < currentValue; i++) {
                handleNext();
            }
        } else if (currentValue < animationState.animationIndex) {
            // Moved to the left, call handlePrev
            for (let i = animationState.animationIndex; i > currentValue; i--) {
                handlePrev();
            }
        }
    };

    return (
        <div>
            <div id="animation_container" className="container justify-content-center">
                <div id="animation"
                     className="row justify-content-center color-primary padding--md"
                >
                    <Ingress/>
                    <Runtime/>
                    <Services/>
                </div>
                <div id="progressBarContainer">
                    <button className={clsx("btn-animation")} onClick={handlePrev}>Prev</button>
                    <input
                        type="range"
                        id="progressBar"
                        min={0}
                        max={12}
                        step={1}
                        ref={progressBarRef}
                        onChange={handleProgressBarChange}
                    />
                    <button className={clsx("btn-animation")} onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    )
}