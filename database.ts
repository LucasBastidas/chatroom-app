import * as admin from "firebase-admin";
// import * as serviceAccount from "./key.json";
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://apx-dwf-m6-72162-default-rtdb.firebaseio.com",
});
const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
