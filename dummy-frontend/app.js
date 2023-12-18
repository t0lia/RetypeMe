console.log(' app.js: dummy-frontend/app.js')

let urlParams = new URLSearchParams(window.location.search);
let sessionId = urlParams.get("sessionId");
let userId = "";

console.log('before join');
axios.post("http://localhost:8080/api/sessions/" + sessionId + "/join")
    .then(function (response) {
        console.log(response);
        userId = response.data.userId;

    })
    .catch(function (error) {
        console.error("Error creating session:", error);
    });

console.log('after join');
// Display sessionId
let sessionIdElement = document.getElementById("sessionId");
sessionIdElement.textContent = sessionId;

// Show URL as a link
let gameUrlElement = document.getElementById("gameUrl");

let link = document.createElement('a');
link.href = window.location.href;
link.textContent = window.location.href;
link.className = "text-primary"; // Bootstrap text color class

// Append link to the DOM
gameUrlElement.appendChild(link);

let copyBtnElement = document.getElementById("copyBtn");

// Add button to copy link to the clipboard
let copyButton = document.createElement('button');
copyButton.textContent = "Copy to Clipboard";
copyButton.className = "btn btn-primary mt-3"; // Bootstrap button styles
copyButton.onclick = function () {
    navigator.clipboard.writeText(window.location.href);
}
copyBtnElement.appendChild(copyButton);

console.log('after print');

const stompClient = new StompJs.Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});
console.log('after create stomp client');

stompClient.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/topic/' + sessionId + '/progress', (progress) => {
        console.log("on progress")
        printLine(JSON.parse(progress.body).content);
    });
    stompClient.subscribe('/topic/' + sessionId + '/countdown', (countdown) => {
        console.log("on countdown")
        let count = JSON.parse(countdown.body).count;
        if (count < 1) {
            printLine('START');
            sendStatistic();
        } else {
            printLine(count);
        }
    });
};

stompClient.activate();
stompClient.publish({
    destination: "/app/stat",
    body: JSON.stringify({'name': 'test'})
});

console.log('after subscribe');

// function sendStatistic() {
//     stompClient.publish({
//         destination: "/app/stat",
//         body: JSON.stringify({'name': $("#name").val()})
//     });
// }

function printLine(message) {
    $("#greetings").append("<tr><td>" + message + "</td></tr>");
}


