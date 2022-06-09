import * as admin from "firebase-admin";
// import * as serviceAccount from "./key.json";

admin.initializeApp({
	credential: admin.credential.cert(process.env.KEYJSON),
	databaseURL: "https://apx-dwf-m6-72162-default-rtdb.firebaseio.com",
});
const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
