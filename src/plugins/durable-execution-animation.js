function highlightCode() {
    const defaultAnimation = document.getElementById("animation").innerHTML;
    let animationIndex = 0;
    const cartSvcCode = document
        .getElementById("cart_service")
        .innerHTML.split("\n");
    let cartSvcCodeLine = 0;
    const ticketSvcCode = document
        .getElementById("ticket_service")
        .innerHTML.split("\n");
    let ticketSvcCodeLine = 0;
    const maxAnimationIndex = 15;

    let isPlaying = true;
    const progressBar = document.getElementById("progressBar");
    const playPauseButton = document.getElementById("playPauseButton");

    function highlightNextCartSvcCodeLine() {
        document.getElementById("cart_service").innerHTML = cartSvcCode
            .map((line, index) =>
                index === cartSvcCodeLine
                    ? `<mark class="code-highlight color-${
                        cartSvcCodeLine + 1
                    } set-bg">${line}</mark>`
                    : line,
            )
            .join("\n");
        const journalElement = document.getElementById(
            "journal_cart_" + cartSvcCodeLine,
        );
        journalElement ? journalElement.classList.remove("display-none") : {};
        const restateJournalElement = document.getElementById(
            "restate_journal_cart_" + cartSvcCodeLine,
        );
        restateJournalElement
            ? restateJournalElement.classList.remove("display-none")
            : {};

        cartSvcCodeLine++;
    }

    function highlightNextTicketSvcCodeLine() {
        document.getElementById("ticket_service").innerHTML = ticketSvcCode
            .map((line, index) =>
                index === ticketSvcCodeLine
                    ? `<mark class="code-highlight color-${
                        ticketSvcCodeLine + 2
                    } set-bg">${line}</mark>`
                    : line,
            )
            .join("\n");
        const journalElement = document.getElementById(
            "journal_ticket_" + ticketSvcCodeLine,
        );
        journalElement ? journalElement.classList.remove("display-none") : {};
        const restateJournalElement = document.getElementById(
            "restate_journal_ticket_" + ticketSvcCodeLine,
        );
        restateJournalElement
            ? restateJournalElement.classList.remove("display-none")
            : {};

        ticketSvcCodeLine++;
    }

    function resetAnimation() {
        animationIndex = -1; // Because it will get incremented after the cleaning
        ticketSvcCodeLine = 0;
        cartSvcCodeLine = 0;
        document.getElementById("animation").innerHTML = defaultAnimation;
    }

    function animate(fastForwarding = false) {
        switch (animationIndex) {
            case 0: {
                // Show the ingress call
                document
                    .getElementById("ingress_call")
                    .classList.remove("display-none");
                break;
            }
            case 1: {
                // Create journal in Restate
                document
                    .getElementById("restate_journal_cart")
                    .classList.remove("display-none");
                break;
            }
            case 2: {
                // Invoke the service
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
                highlightNextCartSvcCodeLine();
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
                highlightNextCartSvcCodeLine();
                document
                    .getElementById("cart_request_arrow")
                    .classList.add("display-none");
                break;
            }
            case 4: {
                document
                    .getElementById("cart_suspend_arrow")
                    .classList.remove("display-none");
                break;
            }
            case 5: {
                // suspension
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
                highlightNextCartSvcCodeLine();
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
                highlightNextCartSvcCodeLine();
                break;
            }
            case 11: {
                highlightNextCartSvcCodeLine();
                // Set the state
                document.getElementById("restate_user_state").innerHTML =
                    "cartService: Joe - cart=<mark class='code-highlight color-5 set-bg set-color'>[seat2B]</mark>";
                break;
            }
            case 12: {
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
                document.getElementById("ingress_call").classList.add("display-none");
                document
                    .getElementById("response_ingress_call")
                    .classList.remove("display-none");
                break;
            }
            case 15: {
                resetAnimation();
                break;
            }
        }

        animationIndex++;
        if (!fastForwarding)
            progressBar.dispatchEvent(new Event("updateProgressBar"));
    }

    // Repeatedly call to update the animation
    let animationInterval = setInterval(animate, 1200);

    playPauseButton.addEventListener("click", togglePlayPause);
    progressBar.addEventListener("input", updateProgressInAnimation);
    progressBar.addEventListener("updateProgressBar", updateProgressBar);

    function togglePlayPause() {
        if (isPlaying) {
            // Pause the animation
            clearInterval(animationInterval);
            playPauseButton.innerHTML = "&#9658;";
        } else {
            // Start or resume the animation
            animationInterval = setInterval(animate, 1200);
            playPauseButton.innerHTML = "||";
        }
        isPlaying = !isPlaying;
    }

    function updateProgressBar() {
        // Update the progress bar based on the animation index
        progressBar.value = animationIndex;
    }

    let progressUpdater = undefined;
    async function updateProgressInAnimation() {
        // Prevent the animation from flipping if a user is dragging the progress bar
        if (progressUpdater) {
            progressUpdater = undefined;
            progressUpdater = setTimeout(forwardAnimation, 0);
            return;
        }

        // Stop the animation from progressing on its own
        if (isPlaying) clearInterval(animationInterval);

        progressUpdater = setTimeout(forwardAnimation, 0);

        // let the animation progress on its own again
        if (isPlaying) animationInterval = setInterval(animate, 1200);
    }

    async function forwardAnimation() {
        // forward the animation to the selected frame
        if (animationIndex > progressBar.value || progressBar.value === 0) {
            resetAnimation();
        }
        while (animationIndex < progressBar.value) {
            animate(true);
            await new Promise((r) => setTimeout(r, 1));
        }
    }
}

window.onload = highlightCode;