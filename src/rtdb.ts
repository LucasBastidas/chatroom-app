import "./pages/register-page";
import "./pages/chat-page";
import "./router";
import firebase from "firebase";
const API_BASE_URL = "http://localhost:3000";
const firebaseConfig = {
	apiKey: "dSRlqF79Pbt9GRdtPraCcdiZlknIq2T00tz45ulK",
	authDomain: "apx-dwf-m6-72162.firebaseapp.com",
	// The value of `databaseURL` depends on the location of the database
	databaseURL: "https://apx-dwf-m6-72162-default-rtdb.firebaseio.com",
	projectId: "apx-dwf-m6-72162",
};
firebase.initializeApp(firebaseConfig);

const rtdb = firebase.database();

export { rtdb };
