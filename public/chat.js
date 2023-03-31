const socket = io();
const { createApp } = Vue;
  const app = Vue.createApp({
    data() {
      return {
        step: 'nombre',
        nombre: null,
        message: '',
        messages: [],
        searchQuery: '',
      }
    },
    methods: {
      search() {
          
        socket.emit('search', this.searchQuery);
        
      },
        send() {
            
            socket.emit('chat-message', {
                nombre: this.nombre,
                message: this.message,
                date: new Date().getTime()
            });

            this.message = null;
        },
        
        signIn() {
            if (!this.nombre) {
                return;
            }

            this.step = 'chat';
        }
    },
    mounted() {
     
      socket.on('chat-message-db', (msg) => {
        this.messages = msg;
        //console.log(msg);
      });

      socket.on('searchResults', (msg) => {
        this.messages = msg;
        //console.log(msg);
        
      });
        
      socket.on('chat-message', (msg) => {
        this.messages.push(msg);  
        setTimeout(() => {
        // scroll to bottom
        const chatContainer = document.querySelector(".chat-container");
        chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 5);
      });
    }
  });
  app.mount('#app');


