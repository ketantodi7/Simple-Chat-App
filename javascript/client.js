const socket = io("http://localhost:8000", { transports: ["websocket"] });
const form = document.getElementById('send-container');
const messageinput = document.getElementById('messageInp');
const message_container = document.querySelector('.container');
const audio = new Audio('../chat_app_media/ting_sound.mp3')


form.addEventListener('submit' , (e)=>{
    e.preventDefault();
    const message = messageinput.value;
    append(`You: ${message}` , 'right')
    socket.emit('send', message);
    messageinput.value = " ";
})

var names = prompt("enter your name to join");
socket.emit('new-user-joined',names);

const append = (message , position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    message_container.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}


socket.on('user-joined' , name =>{
    append(`${name} joined the chat` , 'right')
});

socket.on('receive' , data =>{
    append(`${data.name} : ${data.message}` , 'left')
});

socket.on('left' , name =>{
    append(`${name} left the chat` , 'right')
});


