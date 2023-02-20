import QrScanner from "./scanner/qr-scanner.min.js";
QrScanner.WORKER_PATH = "./scanner/qr-scanner-worker.min.js";

// Scans a given picture for a QR code.
const scan = (currentTabPicture) => {
  QrScanner.scanImage(currentTabPicture)
    .then((result) => updateLink(result))
    .catch(() => handleNoQRCode());
};

// Take picture of the current tab, and scan for a QR code.
chrome.tabs.captureVisibleTab(undefined, { format: "jpeg" }, scan);

// Update the link for the QR code.
const updateLink = (result) => {
  var prefix = document.getElementById("prefix");
  var qrCodeOutput = document.getElementById("qr-code-link");
  prefix.innerText = "Link:";
  qrCodeOutput.innerText = result.length > 25 ? result.substring(0, 25) + "..." : result;
  qrCodeOutput.setAttribute("href", result);
  qrCodeOutput.setAttribute("target", "_blank");
};

// Handler for when there is no QR code.
const handleNoQRCode = () => {
  var main_text = document.getElementById("main-text");
  main_text.innerText = "No QR Code Found";
};
