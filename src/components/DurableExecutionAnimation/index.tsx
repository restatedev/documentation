// import styles from "./styles.module.css";
// import React, {useEffect, useState} from "react";
//
// export default function DurableExecutionAnimation(): JSX.Element {
//     const [animationIndex, setAnimationIndex] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(true);
//
//     useEffect(() => {
//         const animationInterval = setInterval(() => {
//             animate();
//         }, 1200);
//
//         return () => clearInterval(animationInterval);
//     }, []);
//
//     function animate(fastForwarding = false) {
//         switch (animationIndex) {
//             case 0: {
//                 // Show the ingress call
//                 // document.getElementById("ingress_call").classList.remove("display-none");
//                 break;
//             }
//             // Fill in the rest of your animation cases here...
//             default:
//                 resetAnimation();
//         }
//
//         setAnimationIndex(prevIndex => prevIndex + 1);
//     }
//
//     function togglePlayPause() {
//         setIsPlaying(prevState => !prevState);
//     }
//
//     function resetAnimation() {
//         setAnimationIndex(0);
//     }
//
//     return (
//         <section id="animation-section" className="section bg-light-restate py-4 my-5">
//             <div className="container">
//                 <div id="animation" className="row justify-content-center color-lowlatency p-3">
//                     <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 px-3 mx-sm-3">
//                         {/* Fill in your HTML content here */}
//                     </div>
//                     <div className="col-xl-4 col-lg-4 col-md-4 col-sm-14 px-3">
//                         <div id="restate-runtime"
//                              className="section_animation color-lowlatency set-border bg-light justify-content-center my-1 p-3">
//                             <div className="text-center"><img className="logo-animation only-on-light img-fluid"
//                                                               src="restate.png"><img
//                                 className="logo-animation only-on-dark img-fluid" src="restate-white.png"></div>
//                             <h5>State</h5>
//                             <div id="restate-state">
//                                 <p id="restate_user_state" className="text-center">cartService: Joe - cart=[]</p>
//                             </div>
//                             <h5>Journals</h5>
//                             <div id="restate_journal_cart" className="bg-primary-line p-2 display-none">
//                                 <p className="color-1 set-color set-bg text-center">addTicket ( Joe, seat2B )</p>
//                                 <div id="restate_journal_cart_0" className="box color-1 set-bg-dark"> |||||</div>
//                                 <div id="restate_journal_cart_1"
//                                      className="box color-2 set-bg-dark display-none">|||||
//                                 </div>
//                                 <div id="restate_journal_cart_2"
//                                      className="box color-3 set-bg-dark display-none">|||||
//                                 </div>
//                                 <div id="restate_journal_cart_3"
//                                      className="box color-4 set-bg-dark display-none">|||||
//                                 </div>
//                                 <div id="restate_journal_cart_4"
//                                      className="box color-5 set-bg-dark display-none">|||||
//                                 </div>
//                                 <div id="restate_journal_cart_6"
//                                      className="box color-7 set-bg-dark display-none">|||||
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-xl-8 col-lg-8 col-md-8 col-sm-14 px-3">
//                         {/* Fill in your HTML content here */}
//                     </div>
//                 </div>
//
//                 <div className="row justify-content-center m-2">
//                     <div className="col-xl-10 col-lg-10 px-0 mb-3 text-center">
//                         <button id="playPauseButton" className="display-inline-block btn-restate color-lowlatency text-white set-bg px-2" onClick={togglePlayPause}>{isPlaying ? '||' : '&#9658;'}</button>
//                         <input type="range" id="progressBar" className="p-0 display-inline-block w-75 m-2 align-middle" min="0" max="15" step="1" value={animationIndex} onChange={(e) => setAnimationIndex(parseInt(e.target.value))} />
//                     </div>
//                 </div>
//
//                 <div className="justify-content-center text-center">
//                     <a role="button" className="btn-restate color-lowlatency set-bg-dark text-white effect effect-1-white my-0" href="https://restate.dev/blog/why-we-built-restate/#how-does-it-work-dissecting-an-example" target="_blank"> Learn more</a>
//                 </div>
//             </div>
//         </section>
//     );
// }