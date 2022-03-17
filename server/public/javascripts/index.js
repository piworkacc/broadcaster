const WS = new WebSocket('ws://localhost:3002');

const button = document.getElementById('button-addon');

WS.onopen = () => {
  console.log('Connected');
};

button.addEventListener('click', (event) => {
  event.preventDefault();
  WS.send(JSON.stringify('simple-message-msfcr'));
});
