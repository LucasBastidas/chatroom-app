import * as admin from "firebase-admin";
// import * as serviceAccount from "./key.json";

admin.initializeApp({
	credential: admin.credential.cert(process.env.GOOGLE_CONFIG_BASE64),
	databaseURL: "https://apx-dwf-m6-72162-default-rtdb.firebaseio.com",
});
const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
