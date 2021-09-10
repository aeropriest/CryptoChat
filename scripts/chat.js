class ChatRoom{
    constructor(username, room){
        this.room = room
        this.username = username
        this.chats = db.collection('chats')
        this.unsub
    }

    async addChat(message){
        const now = new Date()
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        }

        const response = await this.chats.add(chat)
        return response
    }
    getChats(callback){
        console.log(`query for room ${this.room} and user ${this.username}`)
        this.unsub = this.chats
        .where('room','==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change=>{
                if(change.type === 'added'){
                    //update the UI
                    console.log('added')
                    callback(change.doc.data())
                }
            })
        })
    }
    updateName(username){
        this.username = username
        localStorage.setItem("username", username)
    }
    updateRomm(room){
        this.room = room
        console.log('room update')
        if(this.unsub){
           this.unsub()
        }
    }
}


// setTimeout(()=>{
//    chatroom.updateRomm('NFT')
//    chatroom.updateName('ashokjaiswal')
//    chatroom.getChats(data=>{
//        console.log("getchat data", data)

//    })
//    chatroom.addChat('which NFT should i buy')
// }, 3000)
