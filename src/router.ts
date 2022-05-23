import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
	{ path: "/", component: "x-new-home-page" },
	{ path: "/register-page", component: "x-register-page" },
	{ path: "/chat-page", component: "x-chat-page" },
	{ path: "/create-room", component: "x-create-room" },
]);

window.onpopstate = function (event) {
	console.log(history);
};
