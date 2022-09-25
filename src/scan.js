import QrScanner from "./scanner/qr-scanner.min.js";
QrScanner.WORKER_PATH = "./scanner/qr-scanner-worker.min.js";

// Scans a given picture for a QR code.
const scan = (current_tab_picture) => {
  QrScanner.scanImage(current_tab_picture)
    .then((result) => update_link(result))
    .catch((error) => console.log(error || "No QR code found."));
};

// Take picture of the current tab, and scan for a QR code.
chrome.tabs.captureVisibleTab(undefined, { format: "jpeg" }, scan);
const update_link = (result) => {
  var click = document.getElementById("link");
  click.innerHTML = result;
  click.setAttribute("href", result);
};
