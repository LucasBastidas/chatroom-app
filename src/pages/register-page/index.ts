import { Router } from "@vaadin/router";
import { state } from "../../state";
import { API_BASE_URL } from "../../state";
export class Register extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			this.render();
		});
		this.render();
	}
	addListeners() {
		const form = this.querySelector(".form");
		const button = this.querySelector(".button");
		form.addEventListener("submit", (e) => {
			const target = e.target as any;
			e.preventDefault();
			if (target.email.value == "" || target.name.value == "") {
				alert("Completa todos los campos!");
			} else {
				console.log();
				state.signUp(target.email.value, target.name.value, (err) => {
					if (err) {
						console.error("ERROR");
					} else {
						if (state.data.error != "1") {
							console.log("este es mi id: " + state.data.myId);
							Router.go("/create-room");
						} else {
							alert("Email ya registrado!");
						}
					}
				});
			}
		});
	}
	render() {
		const style = document.createElement("style");
		style.innerHTML = `
      .gral-container{
         display: flex;
         flex-direction: column;
         padding: 0px 40px 0px 40px;
      }
      .header{
         height: 80px;
         background-color:#b8e3cf;
      }
      .title{
         font-size:52px;
      }
      .form-container{
         
      }
      .form{
         display: flex;
         flex-direction: column;
      }
      .label{
         font-size: 20px;
         padding-top:20px;
      }
      .input{
         height:40px;
      }
      .button{
         margin-top:50px;
         height:40px;
      }
      `;
		this.innerHTML = `
      <div class="gral-container">   
      <header class="header"></header>
      <h2 class="title">Registrate!</h2>
      <div class="form-container">
         <form class="form">
            <label class = "label">Tu email</label>
            <input class="input" type="email" name="email" >
            <label class = "label">Tu Nombre</label>
            <input class="input" type="text" name="name" >
            <button class="button">Comenzar</button>
         </form>
      </div>
      </div>
      `;
		this.appendChild(style);
		this.addListeners();
	}
}
customElements.define("x-register-page", Register);
