const socket = io("http://89.176.65.87:4000", {})

const clientsTotal = document.getElementById('clients-total')
const msgCont = document.getElementById('message-container')
const nameInput = document.getElementById('name-input')
const msgForm = document.getElementById('message-form')
const msgInput = document.getElementById('message-input')

const messageSound = new Audio('/message.mp3')

msgForm.addEventListener('submit', (e) => {
    e.preventDefault()
    sendMessage()
})

socket.on('clients-total', (data) => { 
    clientsTotal.innerText = "Total Clients: " + data;
})

function sendMessage(){
    if(msgInput.value == '') return
    console.log(msgInput.value)
    const data = {
        name: nameInput.value,
        message: msgInput.value,
        dateTime: new Date()
    }

    socket.emit('message', data)
    addMessageToUI(true, data)
    msgInput.value = ''
}

socket.on('chat-msg', (data) => {
    //console.log(data)
    messageSound.play()
    addMessageToUI(false, data)
})

function addMessageToUI(isOwnMessage, data){
    clearFeed()
    const element = `
            <li class="${isOwnMessage ? "message-right" : "message-left"}">
                <p class="message">
                    ${data.message}
                    <span>${data.name} ☢️ ${moment(data.dateTime).fromNow()}</span>
                </p>
            </li>
            `

        msgCont.innerHTML += element
        scrollToBottom();
        }

        function scrollToBottom() {
            msgCont.scrollTo(0, msgCont.scrollHeight)
        }

        msgInput.addEventListener('focus', (e) => {
            socket.emit('feedback', {
                feedback: `${nameInput.value} vaří ✍🏻`
            })
        })
        msgInput.addEventListener('keypress', (e) => {
            socket.emit('feedback', {
                feedback: `${nameInput.value} vaří ✍🏻`
            })
        })
        msgInput.addEventListener('blur', (e) => {
            socket.emit('feedback', {
                feedback: ``
            })
        })

        socket.on('feedback', (data) => {
            const element = `
                <li class="message-feedback">
                    <p class="feedback" id="feedback">${data.feedback}</p>
                </li>
            `
            clearFeed()
            msgCont.innerHTML += element
        })

        function clearFeed() {
            document.querySelectorAll('li.message-feedback').forEach(element => {
                element.parentNode.removeChild(element)
            })
        }