import { Router } from "@vaadin/router";
import { state } from "./state";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
	{ path: "/", component: "x-new-home-page" },
	{ path: "/register-page", component: "x-register-page" },
	{ path: "/chat-page", component: "x-chat-page" },
	{ path: "/create-room", component: "x-create-room" },
]);

window.onpopstate = function (event) {
	if (location.pathname == "/chat-page" && state.getState().myId === "") {
		Router.go("/");
	} else if (
		location.pathname == "/create-room" &&
		state.getState().myId === ""
	) {
		Router.go("/");
	}
};
