const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container')

var audio = new Audio('ding.mp3');

const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    if(position == 'left'){
        console.log('sound is playing');
        audio.play();
    }
}


form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name1 = prompt("Enter your name to join iChat")
socket.emit('new-user-joined', name1)

socket.on('user-joined', name1=>{
    append(`${name1} joined the chat`, 'left');
})

socket.on('receive', data=>{
    append(`${data.name1 }: ${data.message}`, 'left')
})

socket.on('left', name1=>{
    append(`${name1 } left the chat`, 'left');
})