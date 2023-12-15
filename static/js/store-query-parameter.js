// This script stores the 'sdk' parameter value in the local storage
// so that the preferred SDK tab stays selected, as the user clicks through the UI.
// The default docusaurus behavior only stores the sdk preference in local storage if the user clicked on a specific tab,
// it didn't store the query parameters in local storage. So the query parameters would get lost on subsequent clicks.
const storeSelectedSDK = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sdkParam = urlParams.get('sdk');

    if (sdkParam !== null) {
        // Store the 'sdk' parameter value in the local storage
        localStorage.setItem('docusaurus.tab.sdk', sdkParam);
    }
}

// On window load
window.onload = storeSelectedSDK;
// On any subsequent click which doesn't reload the page
document.addEventListener('click', storeSelectedSDK);