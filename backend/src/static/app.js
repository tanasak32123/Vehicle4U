const socket = io('http://localhost:3000');
const msgBox = document.getElementById('exampleFormControlTextarea1');
const msgCont = document.getElementById('data-container');
const senderId = document.getElementById('sender-id');
const receiverId = document.getElementById('sender-id');

//get old messages from the server
const messages = [];

function getMessages() {
  fetch('http://localhost:3000/chat/api', {
    method: 'POST',
  })
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
      senderId: senderId.value,
      receiverId: receiverId.value,
      message: e.target.value,
    });
    e.target.value = '';
  }
});

//Display messages to the users
function loadDate(data) {
  let messages = '';
  data.map((message) => {
    messages += ` <li class="bg-primary p-2 rounded mb-2 text-light">
         <span class="fw-bolder">${message.senderId}</span>
         <span class="fw-bolder">${message.receiverId}</span>
         ${message.message}
       </li>`;
  });
  msgCont.innerHTML = messages;
}

//socket.io
//emit sendMessage event to send message
function sendMessage(message) {
  console.log(message);
  socket.emit('sendMessage', message);
}
//Listen to recMessage event to get the messages sent by users
socket.on('recMessage', (message) => {
  messages.push(message);
  loadDate(messages);
});
