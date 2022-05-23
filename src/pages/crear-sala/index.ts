import { Router } from "@vaadin/router";
import { state } from "../../state";
export class createRoom extends HTMLElement {
	connectedCallback() {
		state.subscribe(() => {
			this.render();
		});
		this.render();
	}
	addListeners() {
		const form = this.querySelector(".form");
		const buttonCrear = this.querySelector(".button-crear");
		const style = this.querySelector(".style");
		buttonCrear.addEventListener("click", (e) => {
			e.preventDefault();
			const currentState = state.getState();
			state.createRoom((err) => {
				if (err) {
					console.error("ERROR");
				} else {
					currentState.mensajeDelSistema = "SALA CREADA CON EXITO! 🥳 ID:";
					state.setState(currentState);
				}
			});
		});
		const buttonEntrar = this.querySelector(".button-entrar");
		buttonEntrar.addEventListener("click", (e) => {
			e.preventDefault();
			Router.go("/chat-page");
		});
		const submitJoin = this.querySelector(".entrar-sala");
		submitJoin.addEventListener("submit", (e) => {
			const target = e.target as any;
			e.preventDefault();
			console.log(target["room-code"].value);
			if (target["room-code"] == "") {
				alert("Ingresa un codigo de sala!");
			} else {
				state.joinRoom(target["room-code"].value, (err) => {
					if (err) {
						console.error("ERROR");
					} else {
						if (state.data.rtdbRoomId != "") {
							Router.go("/chat-page");
						} else {
							alert("CODIGO NO VALIDO");
						}
					}
				});
			}
		});
	}
	render() {
		const style = document.createElement("style");
		style.setAttribute("class", "style");
		style.innerHTML = `
      .gral-container{
         display: flex;
         flex-direction: column;
         padding: 0px 50px 0px 50px;
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
      .contenedor-botones{
         display:flex;
         justify-content:space-around;
         
      }
      .button-crear{
         margin-top:50px;
         height: 50px;
         width: 150px;
         cursor: pointer;
         border-radius: 4px;
         background-color: #c3dfde;         
      }
      .button-entrar{
         margin-top:50px;
         height: 50px;
         width: 150px;
         cursor: pointer;
         background-color:#d8e7af;
         border-radius:4px;
      }
      .input{
         height: 30px;
      }
      .button-entrar_existente{
         background-color: #c3dfde;
         border:solid  1px;
         height:30px;
      }
      `;
		if (state.data.rtdbRoomId === "") {
			style.innerHTML = `
         .gral-container{
            display: flex;
            flex-direction: column;
            padding: 0px 40px 0px 40px;
         }
         @media(min-width:960px){
            .gral-container{
               padding: 0px 300px 0px 300px;
            }
         }
         .header{
            height: 80px;
            background-color:#b8e3cf;
         }
         .contenedor-botones{
            display:flex;
            justify-content:space-around;
            
         }
         .button-crear{
            margin-top:50px;
            height: 50px;
            width: 150px;
            cursor: pointer;
            border-radius: 4px;
            background-color: #c3dfde;
         }
         .button-entrar{
            margin-top:50px;
            height: 50px;
            width: 150px;
            cursor: pointer;
            display:none;
         }
         .input{
            height: 30px;
         }
         .button-entrar_existente{
            background-color: #c3dfde;
            border:solid  1px;
            height:30px;
         }
         .cont-sala-creada{
            display:flex;
            align-items:center;
         }
         .sala-creada{
            display:block;
         }
         `;
		} else if (state.data.rtdbRoomId != "") {
			`
      .button-crear{
         margin-top:50px;
         height: 50px;
         width: 150px;
         cursor: pointer;
         border-radius: 4px;
         background-color: #c3dfde;
         display: none;
      }
      
      `;
		}
		this.innerHTML = `
      <div class="gral-container">   
      <header class="header"></header>
      <div class="contenedor-botones">
      <button class="button-crear">CREAR SALA</button>
      <button class="button-entrar">ENTRAR A LA SALA</button>
      </div>
      <div class = cont-sala-creada>
      <h3 class="sala-creada">${state.data.mensajeDelSistema} ${state.data.roomShortId}</h3>      
      </div>
      <p>Entrar a sala existente</p>
      <form class="entrar-sala">
      <label>Ingresar codigo</label>
      <input class="input" type="text" name="room-code">
      <button class="button-entrar_existente">Entrar</button>
      </form>
      </div>
      `;

		this.appendChild(style);
		this.addListeners();
		// window.onpopstate = function (event) {
		// 	event.preventDefault();
		// 	Router.go("/");
		// };
	}
}
customElements.define("x-create-room", createRoom);
