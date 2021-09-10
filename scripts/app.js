//dom queries
const chatForm = document.querySelector('.new-chat')
const userForm = document.querySelector('.new-name')
const chatList = document.querySelector('.chat-list')
const updateMessage = document.querySelector('.update-msg')
const rooms = document.querySelector('.chat-rooms')
console.log(rooms)
const chatUI = new ChatUI(chatList)

chatForm.addEventListener('submit', e =>{
    e.preventDefault()
   const message = chatForm.message.value.trim()   
   chatroom.addChat(message)
   .then(()=> chatForm.reset())
   .catch(error => console.log(error))
})

userForm.addEventListener('submit', e =>{
    e.preventDefault()
   const newName = userForm.name.value.trim()   
   chatroom.updateName(newName)
   userForm.reset()
   updateMessage.innerHTML = `Your name was update to ${newName}`
   setTimeout(()=> updateMessage.innerHTML = '',3000)
})

rooms.addEventListener('click', e => {
    console.log(e.target.tagName)
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear()
        chatroom.updateRomm(e.target.getAttribute('id'))
        chatroom.getChats(chat => chatUI.render(chat))

    }
})

//get local storage name
const username = localStorage.username ? localStorage.username : 'ashokjaiswal'

//class instances
const chatroom = new ChatRoom(username, 'NFT')

//get the chat and render
chatroom.getChats(data => chatUI.render(data))