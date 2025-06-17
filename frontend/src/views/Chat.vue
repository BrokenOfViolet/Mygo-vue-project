<template>
    <div class="chat-container">
      <h1>Chat Page</h1>
      <h2 class="chat-title">Chat with {{ to }}</h2>
  
      <div class="chat-box">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          :class="['message-wrapper', msg.from === currentUser ? 'sent' : 'received']"
        >
          <img class="avatar" :src="getAvatar(msg.from)" alt="avatar" />
          <div class="message-bubble">
            <span class="msg-content">{{ msg.content }}</span>
            <span class="msg-time">{{ new Date(msg.createdAt).toLocaleTimeString() }}</span>
          </div>
        </div>
        <div ref="end"></div>
      </div>
  
      <div class="chat-input">
        <textarea v-model="newMessage" placeholder="Type a message..." maxlength="200"></textarea>
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  

<script>
import axios from 'axios';

export default {
    data() {
        return {
            messages: [],
            newMessage: '',
            currentUser: localStorage.getItem('username') || 'User1',
            to: this.$route.query.to || 'User2',
            avatars: {},
            ws: null,
        };
    },
    created() {
        this.fetchMessages();
    },
    methods: {
        async fetchMessages() {
            const res = await axios.get('http://localhost:3000/api/message', {
                params: {
                    user1: this.currentUser,
                    user2: this.to
                }
            });
            this.messages = res.data;
            const users = new Set(this.messages.map(m => m.from));
            for (const u of users) {
                if (!this.avatars[u]) {
                    const r = await axios.get(`http://localhost:3000/api/user/${u}`)
                    this.avatars[u] = r.data.avatar;
                }
            }
            this.$nextTick(() => this.scrollToBottom());
        },
        async sendMessage() {
            if (!this.newMessage.trim()) return;
            const msg = {
                from: this.currentUser,
                to: this.to,
                content: this.newMessage.trim()
            }
            await axios.post('http://localhost:3000/api/message', msg);

            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                this.ws.send(JSON.stringify(msg));
            }
            this.messages.push({...msg, createdAt: Date.now()});
            this.newMessage = '';
            this.scrollToBottom();
        },
        getAvatar(user) {
            return this.avatars[user] || 'https://i.pravatar.cc/150?u=';
        },
        scrollToBottom() {
            this.$nextTick(() => {
            const el = this.$refs.end;
            if (el && typeof el.scrollIntoView === 'function') {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.warn('scrollIntoView failed: ref is not a DOM element', el);
            }
        });
}

    },
    mounted() {
        this.fetchMessages().catch(err => {
            console.log('Message loaded failed', err)
        });

        this.ws = new WebSocket('ws://localhost:3000');
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({type: 'init', username: this.currentUser}));
        };
        this.ws.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            this.messages.push(msg);
            this.scrollToBottom();
        }
    },
}
</script>

<style scoped>
.chat-container {
    max-width: 700px;
    margin: auto;
    display: flex;
    flex-direction: column;
    height: 90vh;
}

.chat-title {
    text-align: center;
    margin: 10px 0;
}

.chat-box {
    height: 80vh;
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
}

.message-wrapper {
    display: flex;
    margin-bottom: 10px;
    align-items: flex-end;
}

.message-wrapper.sent {
    flex-direction: row-reverse;
    text-align: right;
}

.message-wrapper.received {
    justify-content: flex-start;
}

.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin: 0 10px;
}

.message-bubble {
    background-color: #e1ffc7;
    padding: 10px;
    border-radius: 10px;
    max-width: 60%;
    word-break: break-word;     /* what does it mean? */
}

.message-wrapper.sent .message-bubble {
    background-color: #daf1ff;
}

.msg-time {
    font-size: 0.75em;
    color: grey;
    text-align: right;
    margin-top: 4px;
}

.chat-input {
    display: flex;
    border-top: 1px solid #ccc;
}

.chat-input textarea {
    flex: 1;    /* ??? */
    resize: none;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ddd;
}

.cha-input button {
    margin-left: 10px;
    padding: 0 20px;
    border: none;
    background: #4caf50;
    color: white;
    border-radius: 8px;
}
</style>