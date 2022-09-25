import QrScanner from "./scanner/qr-scanner.min.js";
QrScanner.WORKER_PATH = "./scanner/qr-scanner-worker.min.js";

// Scans a given picture for a QR code.
const scan = (current_tab_picture) => {
  QrScanner.scanImage(current_tab_picture)
    .then((result) => update_link(result))
    .catch(() => update_no_qr_code());
};

// Take picture of the current tab, and scan for a QR code.
chrome.tabs.captureVisibleTab(undefined, { format: "jpeg" }, scan);

// Update the link for the QR code.
const update_link = (result) => {
  var prefix = document.getElementById("prefix");
  var qr_code_output = document.getElementById("qr-code-link");
  prefix.innerText = "Link:";
  qr_code_output.innerText = result.length > 25 ? result.substring(0, 25) + "..." : result;
  qr_code_output.setAttribute("href", result);
  qr_code_output.setAttribute("target", "_blank");
};

// Handler for when there is no QR code.
const update_no_qr_code = () => {
  var main_text = document.getElementById("main-text");
  main_text.innerText = "No QR Code Found";
};
