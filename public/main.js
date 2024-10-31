const socket = io("http://89.176.65.87:4000", {});

const clientsTotal = document.getElementById('clients-total');
const msgCont = document.getElementById('message-container');
const nameInput = document.getElementById('name-input');
const msgForm = document.getElementById('message-form');
const msgInput = document.getElementById('message-input');

const messageSound = new Audio('/message.mp3');

// Handle form submission to send messages
msgForm.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

// Display total connected clients
socket.on('clients-total', (data) => { 
    clientsTotal.innerText = "Total Clients: " + data;
});

// Function to send message
function sendMessage() {
    if (msgInput.value === '') return;
    
    const data = {
        name: nameInput.value,
        message: msgInput.value,
        dateTime: new Date()

    };

    socket.emit('message', data);
    addMessageToUI(true, data);  // Add the sender's message to the UI
    msgInput.value = '';
    
    clearFeed();  // Clear feedback messages on send
}

// Receive and display messages from other clients
socket.on('chat-msg', (data) => {
    messageSound.play();
    addMessageToUI(false, data);
});

// Function to add a message to the UI
function addMessageToUI(isOwnMessage, data) {
    console.log("Client received message:", data);
    clearFeed();
    const element = `
        <li class="${isOwnMessage ? "message-right" : "message-left"}">
            <p class="message">
                ${data.message}
                <span>${data.name} ☢️ Přibližně v ten čas, kdy se to poslalo</span>
            </p>
        </li>
    `;
    msgCont.insertAdjacentHTML("beforeend", element);  // Use insertAdjacentHTML for efficiency
    scrollToBottom();
}

// Scroll to the bottom of the chat container
function scrollToBottom() {
    msgCont.scrollTo(0, msgCont.scrollHeight);
}

// Emit typing feedback events
msgInput.addEventListener('focus', () => {
    socket.emit('feedback', { feedback: `${nameInput.value} is typing ✍🏻` });
});

msgInput.addEventListener('keypress', () => {
    socket.emit('feedback', { feedback: `${nameInput.value} is typing ✍🏻` });
});

msgInput.addEventListener('blur', () => {
    socket.emit('feedback', { feedback: '' });
});

// Display typing feedback from other users
socket.on('feedback', (data) => {
    const element = `
        <li class="message-feedback">
            <p class="feedback" id="feedback">${data.feedback}</p>
        </li>
    `;
    clearFeed();
    msgCont.insertAdjacentHTML("beforeend", element);
});

// Function to clear feedback messages
function clearFeed() {
    document.querySelectorAll('li.message-feedback').forEach(element => {
        element.parentNode.removeChild(element);
    });
}
