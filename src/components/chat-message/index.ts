export class ChatMessajeComp extends HTMLElement {
	constructor() {
		super();
		this.render();
	}
	render() {
		const shadow = this.attachShadow({ mode: "open" });
		const div = document.createElement("div");
		const name = this.getAttribute("name");
		const message = this.getAttribute("message");
		const color = this.getAttribute("color");
		const style = document.createElement("style");
		style.innerHTML = `
            .contenedor-message{
               display:flex;
               flex-direction:column;
               align-items: end;

            }
            .label{
               font-size:12px;
               margin:0px;
            }
            .message{
               font-size:22px;
               background-color: #2e9f85a1;
               width:max-content;
               padding:10px;
               max-width: 250px;
               margin-top:2px;
               border-radius: 4px;
            }
      `;
		if (color) {
			style.innerHTML = `
            .contenedor-message{
               display:flex;
               flex-direction:column;
            }
            .label{
               font-size:12px;
               margin:0px;
            }
            .message{
               font-size:22px;
               background-color: ${color};
               width:max-content;
               padding:10px;
               max-width: 250px;
               
               border-radius: 4px;
            }
      `;
		}
		div.innerHTML = `
      <div class="contenedor-message">
      <label class="label">${name}</label>
      <p class="message">${message}</p>
      </div>
      `;
		div.appendChild(style);
		shadow.appendChild(div);
	}
}
customElements.define("x-chat-message-el", ChatMessajeComp);
