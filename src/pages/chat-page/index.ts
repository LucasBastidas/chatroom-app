import { Router } from "@vaadin/router";
import { state } from "../../state";
import { Message } from "../../state";
export class ChatPage extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			const currentState = state.getState();
			this.messages = currentState.messages;

			this.render();

			console.log("soy los messages", this.messages);
		});
		state.init();
		this.render();
	}
	addListeners() {
		const submitMessage = this.querySelector(".submit-message");

		submitMessage.addEventListener("submit", (e) => {
			const target = e.target as any;
			e.preventDefault();
			state.pushMessage(target.message.value);
			console.log(target.message.value);
		});
	}
	messages: Message[] = [];
	render() {
		const style = document.createElement("style");
		style.innerHTML = `
      .gral-container{
         display: flex;
         flex-direction: column;
         padding: 0px 50px 0px 50px;
      }
      @media(min-width:960px){
         .gral-container{
            justify-content:center;
            padding: 0px 300px 0px 300px;
            height:100%;
         }
      }
      .header{
         height: 100px;
         background-color:#b8e3cf;
      }
      .title{
         text-aling:center;
         font-size:52px;
      }
      .form{
         display: flex;
         flex-direction: column;
      }
      .label{
         font-size: 20px;
         padding-top:20px;
      }
      .submit-message{
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         grid-template-rows: 1fr;
         grid-column-gap: 0px;
         justify-items: center;
         grid-row-gap: 0px;
         margin-top: 20px;

      }
      .input{
         height:40px;
         border-color:#7bc2b2;
         border-radius:6px;
         width:100%;
      }
      .button{
         border-radius:6px;
         border-color:#7bc2b2;
         height:40px;
         width:50%
      }
      @media(min-width:960px){
         .input{
            height:50px;
            width:100%;
         }
         .button{
            height:50px;
            width:30%
         }
      }
      .chat-container{
         overflow:auto;
         height:400px;
      }
      @media(min-width:960px){
         .chat-container{
            height:60vh;
         }
      }
      `;
		this.innerHTML = `
      <header class="header"></header>
      <div class="gral-container">   
      <h2 class="title">CHAT    ${state.data.roomShortId}</h2>
      <div class="chat-container">
         ${this.messages
						.map((m) => {
							if (m.name === state.data.nombre) {
								return `<x-chat-message-el name="${m.name}" message="${m.message}"></x-chat-message-el>`;
							} else {
								return `<x-chat-message-el color="#df6e03a1" name="${m.name}" message="${m.message}"></x-chat-message-el>`;
							}
						})
						.join("")}
      </div>
      
      <form class="submit-message">  
         <input class="input" type="text" name="message" >
         <button class="button">Enviar</button>
      </div>
      `;
		this.appendChild(style);
		// SE ASIGNA UN SCROLL AUTOMATICO PARA LLEGAR AL ULTIMO MENSAJE
		const chat = this.querySelector(".chat-container").scrollTo({
			top: 100000,
			left: 0,
			behavior: "auto",
		});
		this.addListeners();
	}
}
customElements.define("x-chat-page", ChatPage);
