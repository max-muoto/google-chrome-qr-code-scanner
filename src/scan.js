import QrScanner from "./scanner/qr-scanner.min.js";
QrScanner.WORKER_PATH = "./scanner/qr-scanner-worker.min.js";

const scan = (image) => {
  QrScanner.scanImage(image)
    .then((result) => console.log(result) & update_link(result))
    .catch((error) => console.log(error || "No QR code found."));
};

chrome.tabs.captureVisibleTab(undefined, { format: "jpeg" }, scan);
const update_link = (result) => {
  var click = document.getElementById("link");
  click.innerHTML = result;
  click.setAttribute("href", result);
};
