import { Router } from "@vaadin/router";
import { state } from "../../state";
class Newhome extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			this.render();
		});
		this.render();
	}
	addListeners() {
		const signUp = this.querySelector(".form");
		const buttonRegistrar = this.querySelector(".button-registrar");
		signUp.addEventListener("submit", (e) => {
			const target = e.target as any;
			e.preventDefault();
			if (target.email.value == "" || target.name.value == "") {
				alert("Completa todos los campos!");
			} else {
				state.setEmailAndFullName(target.email.value, target.name.value);
				state.signIn((err) => {
					if (err) {
						console.error("ERROR");
					} else {
						Router.go("/create-room");
					}
				});
			}
		});
		buttonRegistrar.addEventListener("click", (e) => {
			e.preventDefault();
			Router.go("/register-page");
		});
	}
	render() {
		const style = document.createElement("style");
		style.innerHTML = `
      .gral-container{
         display: flex;
         flex-direction: column;
         padding: 0px 40px 0px 40px;
         height:100vh;
      }
      @media(min-width:960px){
         .gral-container{
            padding: 0px 300px 0px 300px;
         }
      }
      .header{
         height: 100px;
         background-color:#b8e3cf;
      }
      .sign-in{
         font-size: 25px;
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
         box-shadow: #094c66 4px 4px 0xp;
         border-radius:8px;
         transition: transform 200ms, box-shadow 200ms;
      }
      .button:active{
         transform: translateY(4px) translateX(4px);
         box-shadow:#094c66 0px 0px 0px;
      }
      .button-registrar{
         height:40px;
      }
      `;
		this.innerHTML = `
      <div class="gral-container">   
      <header class="header"></header>
      <h2 class="title">Bienvenidxs</h2>
      <p class="sign-in">Iniciar sesion..</p>
      <div class="form-container">
         <form class="form">
            <label class = "label">Tu email</label>
            <input class="input" type="email" name="email" >
            <label class = "label">Tu Nombre</label>
            <input class="input" type="text" name="name" >
            <button class="button">Comenzar</button>
         </form>  
      </div>
      <p>No estas registrado ?</p>
      <button class="button-registrar">Registrarse</button>
      </div>
      `;
		this.appendChild(style);
		this.addListeners();
	}
}
customElements.define("x-new-home-page", Newhome);
