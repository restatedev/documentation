// import React from "react";
//
// class Animation extends React.Component {
//
//     animate(endValue) {
//         if(animationIndex === endValue){
//             return;
//         }
//
//         setAnimationIndex(prevState => {
//             console.info("Called animate for animation index ", prevState);
//             switch (prevState) {
//                 case 0: {
//                     // Store default animation
//
//                     // Show the ingress call
//                     console.info("Animation step 0 Show the ingress call")
//                     document
//                         .getElementById("ingress_call")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 1: {
//                     // Create journal in Restate
//                     console.info("Animation step 1 Create journal in Restate")
//                     document
//                         .getElementById("restate_journal_cart")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 2: {
//                     // Invoke the service
//                     console.info("Animation step 2 Invoke the service")
//                     document
//                         .getElementById("cart_service_div")
//                         .classList.remove("display-none");
//                     document.getElementById("cart_service").classList.remove("suspended");
//                     document
//                         .getElementById("cart_title_suspended")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("cart_title_invoked")
//                         .classList.remove("display-none");
//                     highlightNextCartSvcCodeLine()
//                     document
//                         .getElementById("journal_cart")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("cart_request_arrow")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 3: {
//                     // Execute first line
//                     console.info("Animation step 3 Execute first line")
//                     highlightNextCartSvcCodeLine()
//                     document
//                         .getElementById("cart_request_arrow")
//                         .classList.add("display-none");
//                     break;
//                 }
//                 case 4: {
//                     console.info("Animation step 4")
//                     document
//                         .getElementById("cart_suspend_arrow")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 5: {
//                     // suspension
//                     console.info("Animation step 5 suspension")
//                     document.getElementById("journal_cart").classList.add("display-none");
//                     document.getElementById("cart_service").classList.add("suspended");
//                     document
//                         .getElementById("cart_title_suspended")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("cart_title_invoked")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("cart_suspend_arrow")
//                         .classList.add("display-none");
//
//                     // start of call to ticket service
//                     document
//                         .getElementById("rpc_arrow_request")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("restate_journal_ticket")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 6: {
//                     // start executing ticket service
//                     console.log("Animation step 6 start executing ticket service")
//                     document
//                         .getElementById("ticket_service_div")
//                         .classList.remove("display-none");
//                     document.getElementById("ticket_service").classList.remove("suspended");
//                     document
//                         .getElementById("ticket_title_suspended")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("ticket_title_invoked")
//                         .classList.remove("display-none");
//                     highlightNextTicketSvcCodeLine();
//                     document
//                         .getElementById("journal_ticket")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("ticket_request_arrow")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 7: {
//                     // get response ticket service
//                     console.log("Animation step 7 get response ticket service")
//                     highlightNextTicketSvcCodeLine();
//                     document
//                         .getElementById("ticket_request_arrow")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("ticket_response_arrow")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 8: {
//                     console.log("Animation step 8")
//                     highlightNextCartSvcCodeLine()
//                     document
//                         .getElementById("rpc_arrow_request")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("rpc_arrow_response")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("ticket_service_div")
//                         .classList.add("display-none");
//                     document.getElementById("ticket_service").classList.add("suspended");
//                     document
//                         .getElementById("ticket_title_suspended")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("ticket_title_invoked")
//                         .classList.add("display-none");
//                     document.getElementById("journal_ticket").classList.add("display-none");
//                     document
//                         .getElementById("journal_ticket_1")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("ticket_response_arrow")
//                         .classList.add("display-none");
//                     break;
//                 }
//                 case 9: {
//                     console.log("Animation step 9")
//                     document
//                         .getElementById("restate_journal_ticket")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("restate_journal_ticket_1")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("rpc_arrow_response")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("cart_request_arrow")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("journal_cart")
//                         .classList.remove("display-none");
//                     document.getElementById("cart_service").classList.remove("suspended");
//                     document
//                         .getElementById("cart_title_suspended")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("cart_title_invoked")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 10: {
//                     console.log("Animation step 10")
//                     highlightNextCartSvcCodeLine()
//                     break;
//                 }
//                 case 11: {
//                     console.log("Animation step 11")
//                     highlightNextCartSvcCodeLine()
//                     // Set the state
//                     document.getElementById("restate_user_state").innerHTML =
//                         "cartService: Joe - cart=<mark className='code-highlight color-5 set-bg set-color'>[seat2B]</mark>";
//                     break;
//                 }
//                 case 12: {
//                     console.log("Animation step 12")
//                     highlightNextCartSvcCodeLine();
//                     highlightNextCartSvcCodeLine();
//                     document
//                         .getElementById("cart_request_arrow")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("cart_response_arrow")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 13: {
//                     console.log("Animation step 13")
//                     document.getElementById("journal_cart").classList.add("display-none");
//                     document
//                         .getElementById("cart_response_arrow")
//                         .classList.add("display-none");
//                     document
//                         .getElementById("cart_service_div")
//                         .classList.add("display-none");
//                     document.getElementById("cart_service").classList.add("suspended");
//                     document
//                         .getElementById("cart_title_suspended")
//                         .classList.remove("display-none");
//                     document
//                         .getElementById("cart_title_invoked")
//                         .classList.add("display-none");
//                     break;
//                 }
//                 case 14: {
//                     console.log("Animation step 14")
//                     document.getElementById("ingress_call").classList.add("display-none");
//                     document
//                         .getElementById("response_ingress_call")
//                         .classList.remove("display-none");
//                     break;
//                 }
//                 case 15: {
//                     console.log("Animation step 15 RESET")
//                     resetAnimation();
//                     break;
//                 }
//             }
//
//
//             const newVal = prevState + 1;
//             console.info("Called setAnimationIndex to " + newVal);
//             return newVal;
//         });
//         animate(endValue);
//     }
//
//     resetAnimation() {
//         console.info("Called resetAnimation");
//         setAnimationIndex(0)
//         setCartSvcCodeLine(0)
//         setTicketSvcCodeLine(0)
//         const animationElement = document.getElementById("animation");
//         animationElement.innerHTML = defaultAnimation;
//     }
//
//     render() {
//         return <div className="container">
//             <div id="animation"
//                  className="row justify-content-center color-primary padding--md"
//             >
//                 <Ingress/>
//                 <Runtime/>
//                 <Services/>
//             </div>
//         </div>;
//     }
// }