const socket = io('http://localhost:3000');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const senderFirstName = document.getElementById('sender-first-name');
const senderLastName = document.getElementById('sender-last-name');
const receiverFirstName = document.getElementById('receiver-first-name');
const receiverLastName = document.getElementById('receiver-last-name');

//get old messages from the server
const messages = [];

function getMessages() {
  fetch('http://localhost:3000/chat/api')
    .then((response) => response.json())
    .then((data) => {
      loadDate(data);
      data.forEach((el) => {
        messages.push(el);
      });
    })
    .catch((err) => console.error(err));
}
getMessages();

//When a user press the enter key, send message.
msgBox.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    sendMessage({
      senderFirstName: senderFirstName.value,
      senderLastName: senderLastName.value,
      receiverFirstName: receiverFirstName.value,
      receiverLastName: receiverLastName.value,
      text: e.target.value,
    });
    e.target.value = '';
  }
});

//Display messages to the users
function loadDate(data) {
  let messages = '';
  data.map((message) => {
    messages += ` <li class="bg-primary p-2 rounded mb-2 text-light">
         <span class="fw-bolder">${message.senderFirstName}</span>
         <span class="fw-bolder">${message.senderLastName}</span>
         <span class="fw-bolder">${message.receiverFirstName}</span>
         <span class="fw-bolder">${message.receiverLastName}</span>
         ${message.text}
       </li>`;
  });
  msgCont.innerHTML = messages;
}

//socket.io
//emit sendMessage event to send message
function sendMessage(message) {
  socket.emit('sendMessage', message);
}
//Listen to recMessage event to get the messages sent by users
socket.on('recMessage', (message) => {
  messages.push(message);
  loadDate(messages);
});
