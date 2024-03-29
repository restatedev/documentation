import "./animation-stylesheet.css"
import React, {useEffect, useState} from "react"

class Ingress extends React.Component {
    render() {
        return <div className="col col--2 padding-horiz--sm">
            <div id="ingress" className="h-100">
                <div id="placeholder">
                    <h6>
                        <a className="rpc_arrow text--center color-1 set-color"/>
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
                            className="smaller_font display-inline-block text--center color-1 set-bg set-color align-middle">
                            HTTP request <br/> addTicket <br/>
                            (Joe, seat2B)
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
                className="section_animation color-primary set-border bg-light justify-content-center margin-vert--sm padding--md"
            >
                <div className="text--center">
                    <img
                        className="logo-animation img-fluid"
                        src="/img/durable_execution_animation/restate.png"
                    />
                </div>
                <h5>State</h5>
                <div id="restate-state">
                    <p id="restate_user_state" className="text--center">
                        cartService: Joe - cart=[]
                    </p>
                </div>
                <h5>Journals</h5>
                <div
                    id="restate_journal_cart"
                    className="bg-primary-line padding--sm display-none"
                >
                    <p className="color-1 set-color set-bg text--center">
                        addTicket ( Joe, seat2B )
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
                        className="box color-4 set-bg-dark display-none"
                    >
                        |||||
                    </div>
                    <div
                        id="restate_journal_cart_4"
                        className="box color-5 set-bg-dark display-none"
                    >
                        |||||
                    </div>
                    <div
                        id="restate_journal_cart_6"
                        className="box color-7 set-bg-dark display-none"
                    >
                        |||||
                    </div>
                </div>
                <div id="rpc_arrow_request" className="margin--sm display-none">
                    <div className="smaller_font color-2 set-color set-bg text--center">
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
                    <div className="smaller_font color-3 set-color set-bg text--center">
                        RPC: response {"{"} success {"}"}
                    </div>
                </div>
                <div
                    id="restate_journal_ticket"
                    className="bg-primary-line padding--sm display-none"
                >
                    <p className="color-2 set-color set-bg text--center">
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
        return <div className="col col--6 padding-horiz--md">
            <div id="cart_service_div" className="row margin-vert--none margin-horiz--none display-none">
                <div className="col col--2 padding-horiz--none margin-bottom--md">
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
                <div className="col col--10 padding-horiz--none bg-light section_animation">
                    <div id="cart_service_box">
                        <div className="flex-none border-b">
                            <div className="flex items-center h-8 padding-horiz--md">
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="service-name padding-horiz--sm">CartService</div>
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
                    <span className="hljs-keyword">async</span> addTicket ={" "}
                            <span className="hljs-keyword">async</span> (ctx, userId,
                    ticketId) =&gt; {"{"}
                            {"\n"}
                            {"  "}
                            <span className="hljs-keyword">const</span> success ={" "}
                            <span className="hljs-keyword">await</span> ctx.
                    <span className="hljs-title function_">rpc</span>
                    (ticketApi).
                    <span className="hljs-title function_">reserve</span>
                    (ticketId);
                            {"\n"}
                            {"  "}
                            <span className="hljs-keyword">if</span> (success) {"{"}
                            {"\n"}
                            {"    "}
                            <span className="hljs-keyword">const</span> cart ={" "}
                            <span className="hljs-keyword">await</span> ctx.
                    <span className="hljs-title function_">get</span>(
                    <span className="hljs-string">"cart"</span>);{"\n"}
                            {"    "}ctx.
                    <span className="hljs-title function_">set</span>(
                    <span className="hljs-string">"cart"</span>, cart.
                    <span className="hljs-title function_">push</span>
                    (ticketId));
                            {"\n"}
                            {"  "}
                            {"}"}
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
                        <a className="smaller_font text--center">
                            Journal: <br/>
                        </a>
                        <div
                            id="journal_cart_0"
                            className="text--center display-inline-block color-1 set-bg set-color padding-horiz--xs"
                        >
                            (Joe, seat2B) <br/> state(cart=[])
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
                            className="text--center display-inline-block display-none color-4 set-bg set-color padding-horiz--xs"
                        >
                            getState <br/>
                            cart=[]
                        </div>
                        <div
                            id="journal_cart_4"
                            className="text--center display-inline-block display-none color-5 set-bg set-color padding-horiz--xs"
                        >
                            setState <br/>
                            cart=[seat2B]
                        </div>
                        <div
                            id="journal_cart_6"
                            className="text--center display-inline-block display-none color-7 set-bg set-color padding-horiz--xs"
                        >
                            response <br/>
                            {"{"} success {"}"}
                        </div>
                    </div>
                </div>
            </div>
            <div id="ticket_service_div" className="row margin-vert--none margin-horiz--none display-none">
                <div className="col col--2 padding-horiz--none margin-bottom--md">
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
                <div className="col col--10 padding-horiz--none bg-light section_animation">
                    <div id="ticket_service_box">
                        <div className="flex-none border-b">
                            <div className="flex items-center h-8 padding-horiz--md">
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="ide_button"/>
                                <div className="service-name padding-horiz--sm">TicketService:</div>
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
                    <span className="hljs-keyword">async</span> reserve ={" "}
                            <span className="hljs-keyword">async</span> (ctx, ticketId)
                    =&gt; {"{"}
                            {"\n"}
                            {"  "}...{"\n"}
                            {"}"}
                  </pre>
                    </div>
                    <div
                        id="journal_ticket"
                        className="smallest_font display-none padding--sm bg-light"
                    >
                        <a className="text--center smaller_font">
                            Journal: <br/>
                        </a>
                        <div
                            id="journal_ticket_0"
                            className="text--center display-inline-block color-2 set-bg set-color padding-horiz--xs"
                        >
                            (seat2B) <br/> state()
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

class Animation extends React.Component {
    render() {
        return <div class="container">
            <div id="animation"
                className="row justify-content-center color-primary padding--md"
            >
                <Ingress/>
                <Runtime/>
                <Services/>
            </div>
        </div>;
    }
}

let animationInterval = null;
let defaultAnimation = null;

export default function DurableExecutionAnimation() {
    console.info("Called DurableExecutionAnimation");

    const [animationIndex, setAnimationIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [cartSvcCode, setCartSvcCode] = useState(document.getElementById("cart_service"));
    const [cartSvcCodeLine, setCartSvcCodeLine] = useState(0);
    const [ticketSvcCode, setTicketSvcCode] = useState(document.getElementById("ticket_service"));
    const [ticketSvcCodeLine, setTicketSvcCodeLine] = useState(0);
    // const [progressBar, setProgressBar] = useState(null);
    // const [playPauseButton, setPlayPauseButton] = useState(null);
    const maxAnimationIndex = 15;


    useEffect(() => {
        // save what the animation looks like on the first step so we can reset it later
        defaultAnimation = document.getElementById("animation").innerHTML;
    }, []);

    function highlightNextCartSvcCodeLine() {
        console.info("Called highlightNextCartSvcCodeLine");
        // Update cart service code highlighting
        // Update state for journal element visibility
        setCartSvcCodeLine(prevLine => {
            const newLine = prevLine + 1;
            const cartSvcCode = document.getElementById("cart_service");
            cartSvcCode.innerHTML = cartSvcCode.innerHTML.split(",")
                .map((line, index) =>
                    index === newLine
                        ? `<mark className="code-highlight color-${newLine + 1} set-bg">${line}</mark>`
                        : line,
                )
                .join("\n");
            const journalCartElement = document.getElementById("journal_cart_" + newLine);
            if (journalCartElement) journalCartElement.classList.remove("display-none");
            const restateJournalElement = document.getElementById("restate_journal_cart_" + newLine);
            if (restateJournalElement) restateJournalElement.classList.remove("display-none");
            return newLine;
        });
    }

    function highlightNextTicketSvcCodeLine() {
        console.info("Called highlightNextTicketSvcCodeLine");
        // Update ticket service code highlighting
        // Update state for journal element visibility
        setTicketSvcCodeLine(prevLine => {
            const newLine = prevLine + 1;
            const ticketSvcCode = document.getElementById("ticket_service");
            ticketSvcCode.innerHTML = ticketSvcCode.innerHTML.split(",")
                .map((line, index) =>
                    index === newLine
                        ? `<mark className="code-highlight color-${newLine + 2} set-bg">${line}</mark>`
                        : line,
                )
                .join("\n");
            const journalTicketElement = document.getElementById("journal_ticket_" + newLine);
            if (journalTicketElement) journalTicketElement.classList.remove("display-none");
            const restateJournalTicketElement = document.getElementById("restate_journal_ticket_" + newLine);
            if (restateJournalTicketElement) restateJournalTicketElement.classList.remove("display-none");
            return newLine;
        });
    }

    function resetAnimation() {
        console.info("Called resetAnimation");
        setAnimationIndex(-1)
        setCartSvcCodeLine(0)
        setTicketSvcCodeLine(0)
        document.getElementById("animation").innerHTML = defaultAnimation;
    }

    function animate(fastForwarding = false) {

        console.info("Called animate");
        switch (animationIndex) {
            case 0: {
                // Show the ingress call
                console.info("Animation step 0 Show the ingress call")
                document
                    .getElementById("ingress_call")
                    .classList.remove("display-none");
                break;
            }
            case 1: {
                // Create journal in Restate
                console.info("Animation step 1 Create journal in Restate")
                document
                    .getElementById("restate_journal_cart")
                    .classList.remove("display-none");
                break;
            }
            case 2: {
                // Invoke the service
                console.info("Animation step 2 Invoke the service")
                document
                    .getElementById("cart_service_div")
                    .classList.remove("display-none");
                document.getElementById("cart_service").classList.remove("suspended");
                document
                    .getElementById("cart_title_suspended")
                    .classList.add("display-none");
                document
                    .getElementById("cart_title_invoked")
                    .classList.remove("display-none");
                highlightNextCartSvcCodeLine()
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
                highlightNextCartSvcCodeLine()
                document
                    .getElementById("cart_request_arrow")
                    .classList.add("display-none");
                break;
            }
            case 4: {
                console.info("Animation step 4")
                document
                    .getElementById("cart_suspend_arrow")
                    .classList.remove("display-none");
                break;
            }
            case 5: {
                // suspension
                console.info("Animation step 5 suspension")
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
                document
                    .getElementById("ticket_service_div")
                    .classList.remove("display-none");
                document.getElementById("ticket_service").classList.remove("suspended");
                document
                    .getElementById("ticket_title_suspended")
                    .classList.add("display-none");
                document
                    .getElementById("ticket_title_invoked")
                    .classList.remove("display-none");
                highlightNextTicketSvcCodeLine();
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
                highlightNextTicketSvcCodeLine();
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
                highlightNextCartSvcCodeLine()
                document
                    .getElementById("rpc_arrow_request")
                    .classList.add("display-none");
                document
                    .getElementById("rpc_arrow_response")
                    .classList.remove("display-none");
                document
                    .getElementById("ticket_service_div")
                    .classList.add("display-none");
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
                highlightNextCartSvcCodeLine()
                break;
            }
            case 11: {
                console.log("Animation step 11")
                highlightNextCartSvcCodeLine()
                // Set the state
                document.getElementById("restate_user_state").innerHTML =
                    "cartService: Joe - cart=<mark class='code-highlight color-5 set-bg set-color'>[seat2B]</mark>";
                break;
            }
            case 12: {
                console.log("Animation step 12")
                highlightNextCartSvcCodeLine();
                highlightNextCartSvcCodeLine();
                document
                    .getElementById("cart_request_arrow")
                    .classList.add("display-none");
                document
                    .getElementById("cart_response_arrow")
                    .classList.remove("display-none");
                break;
            }
            case 13: {
                console.log("Animation step 13")
                document.getElementById("journal_cart").classList.add("display-none");
                document
                    .getElementById("cart_response_arrow")
                    .classList.add("display-none");
                document
                    .getElementById("cart_service_div")
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
            case 14: {
                console.log("Animation step 14")
                document.getElementById("ingress_call").classList.add("display-none");
                document
                    .getElementById("response_ingress_call")
                    .classList.remove("display-none");
                break;
            }
            case 15: {
                console.log("Animation step 15 RESET")
                resetAnimation();
                break;
            }
        }

        setAnimationIndex(prevState => {
            console.info("Called setAnimationIndex");
            return prevState + 1
        });
    }

// Repeatedly call to update the animation
    if(animationInterval) clearInterval(animationInterval);
    animationInterval = setInterval(animate, 1200);


    function togglePlayPause() {
        if (isPlaying) {
            // Pause the animation
            clearInterval(animationInterval);
            // playPauseButton.innerHTML = "&#9658;
        } else {
            // Start or resume the animation
            if(animationInterval) clearInterval(animationInterval);
            animationInterval = setInterval(animate, 1200);
            // playPauseButton.innerHTML = "||";
        }
        setIsPlaying(prevState => !prevState);
    }

    return (
        <div>
            <Animation/>
            <div className="row justify-content-center">
                <div className="col col--8 text--center">
                    <input
                        type="range"
                        id="progressBar"
                        className="padding--none display-inline-block margin--sm align-middle"
                        min={0}
                        max={14}
                        step={1}
                        value={animationIndex}
                    />
                </div>
            </div>
        </div>
    )
}