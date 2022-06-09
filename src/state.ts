import { rtdb } from "./rtdb";
import map from "lodash/map";
export type Message = {
	name: string;
	message: string;
};
// export const API_BASE_URL = "https://nueva-prueba-back-end.herokuapp.com";

const state = {
	data: {
		myId: "",
		nombre: "",
		email: "",
		roomShortId: "",
		rtdbRoomId: "",
		error: "",
		mensajeDelSistema: "",
		messages: [],
	},
	listeners: [],
	getState() {
		return this.data;
	},
	init() {
		console.log("esta funcionando", this.data);
		const chatRoomRef = rtdb.ref("/rooms/" + this.data.rtdbRoomId);
		chatRoomRef.on("value", (snapshot) => {
			const currentState = this.getState();
			// console.log("probando");
			const messagesFromServer = snapshot.val();
			const listMessages = map(messagesFromServer.mensajes);
			// console.log( listMessages);
			currentState.messages = listMessages;
			this.setState(currentState);
		});
	},
	setEmailAndFullName(email: string, fullName: string) {
		const currentState = this.getState();
		currentState.email = email;
		currentState.nombre = fullName;
		this.setState(currentState);
	},
	signUp(nuevoEmail, nuevoNombre, callback) {
		fetch("/signup", {
			method: "post",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				email: nuevoEmail,
				nombre: nuevoNombre,
			}),
		}).then((res) => {
			res.json().then((data) => {
				if (data.message) {
					const currentState = this.getState();
					currentState.error = 1;
					callback();
				} else {
					console.log(data);
					const currentState = state.getState();
					currentState.error = "";
					currentState.myId = data.id;
					currentState.nombre = nuevoNombre;
					currentState.email = nuevoEmail;
					currentState.roomShortId = "";
					currentState.rtdbRoomId = "";
					this.setState(currentState);
					callback();
				}
			});
		});
	},
	signIn(callback) {
		const currentState = this.getState();
		if (currentState.email) {
			fetch("/auth", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					email: currentState.email,
					nombre: currentState.nombre,
				}),
			}).then((res) =>
				res.json().then((data) => {
					if (data.error) {
						alert("EL EMAIL NO ESTA REGISTRADO");
						currentState.error = "EL MAIL NO ESTA REGISTRADO";
					} else {
						currentState.myId = data.id;
						this.setState(currentState);
						callback();
					}
				})
			);
		} else {
			console.error("NO HAY EMAIL EN STATE");
			this.setState(currentState);
		}
	},
	createRoom(callback) {
		fetch("/rooms", {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				userId: this.data.myId,
			}),
		}).then((res) => {
			res.json().then((data) => {
				const currentState = state.getState();
				currentState.roomShortId = data.shortId;
				currentState.rtdbRoomId = data.longId;
				this.setState(currentState);
				console.log(data);
				callback();
			});
		});
	},
	joinRoom(id, callback) {
		fetch("/rooms" + "/" + id + "?userId=" + this.data.myId, {
			method: "get",
		}).then((res) => {
			res.json().then((data) => {
				if (data.rtdbRoomId) {
					console.log(data);
					const currentState = this.getState();
					currentState.rtdbRoomId = data.rtdbRoomId;
					currentState.roomShortId = id;
					this.setState(currentState);
					callback();
				} else {
					const currentState = this.getState();
					currentState.rtdbRoomId = "";
					callback();
					this.setState(currentState);
				}
			});
		});
	},
	setState(newState) {
		this.data = newState;
		localStorage.setItem("name", newState.nombre);
		localStorage.setItem("email", newState.email);
		localStorage.setItem("id", newState.myId);

		localStorage.setItem("rtdbRoomId", newState.rtdbRoomId);
		for (const cb of this.listeners) {
			cb();
		}
		console.log("soy el state he cambiado", this.data);
	},
	pushMessage(message: string) {
		if (message !== "") {
			fetch("/messages", {
				method: "post",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					name: this.data.nombre,
					message: message,
					chatroomid: this.data.rtdbRoomId,
				}),
			});
			const currentState = this.getState();
			currentState.messages.push({ message: message, name: this.data.nombre });
			this.setState(currentState);
		}
	},
	subscribe(callback: (any) => any) {
		this.listeners.push(callback);
	},
};

export { state };
