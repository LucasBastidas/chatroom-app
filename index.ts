import { firestore, rtdb } from "./database";
import * as express from "express";
import * as cors from "cors";
import { json } from "body-parser";
import { nanoid } from "nanoid";
import lodash from "lodash";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static("dist"));

app.use(cors());
app.use(express.json());

const usersCollection = firestore.collection("users");
const roomsCollection = firestore.collection("rooms");

// const chatRoomRef = rtdb.ref("/rooms/-WLD_QvmPMGaGSzHeiyV9/mensajes");

app.listen(port, () => {
	console.log("funcionando en el puerto " + port);
});

app.post("/signup", (req, res) => {
	const email = req.body.email;
	const nombre = req.body.nombre;
	usersCollection
		.where("email", "==", email)
		.get()
		.then((searchResponse) => {
			if (searchResponse.empty) {
				usersCollection
					.add({ email: email, nombre: nombre })
					.then((newUserReference) => {
						res.json({
							id: newUserReference.id,
							new: true,
						});
					});
			} else {
				res.status(400).json({ message: "user already exist" });
			}
		});
});

app.post("/auth", (req, res) => {
	//  const email = req.body.email ---ESTO ES IGUAL A LO QUE ESTA ABAJO---
	const { email } = req.body;
	usersCollection
		.where("email", "==", email)
		.get()
		.then((searchUserResponse) => {
			if (searchUserResponse.empty) {
				res.status(400).json({ error: "user dont exist" });
			} else {
				res.status(200).json({
					message: "this is your user",
					id: searchUserResponse.docs[0].id,
				});
			}
		});
});

app.post("/rooms", (req, res) => {
	const { userId } = req.body;
	usersCollection
		.doc(userId.toString())
		.get()
		.then((docReference) => {
			if (docReference.exists) {
				const roomRef = rtdb.ref("rooms/" + nanoid());

				roomRef
					.set({
						messages: [],
						owner: userId,
					})
					.then(() => {
						const roomLongId = roomRef.key;
						const roomShortId = 1000 + Math.floor(Math.random() * 999);
						roomsCollection
							.doc(roomShortId.toString())
							.set({ rtdbRoomId: roomLongId });
						console.log("roomRef.key = ", roomRef.key);
						res.json({ shortId: roomShortId.toString(), longId: roomLongId });
					});
			} else {
				res.status(401).json({ message: "no existis" });
			}
		});
});

app.get("/rooms/:roomId", (req, res) => {
	const { userId } = req.query;
	const { roomId } = req.params;
	usersCollection
		.doc(userId.toString())
		.get()
		.then((docReference) => {
			if (docReference.exists) {
				roomsCollection
					.doc(roomId.toString())
					.get()
					.then((snap) => {
						if (snap.data() == undefined) {
							res.json("no hay data");
						} else {
							console.log(snap.data());
							res.json(snap.data());
						}
					});
			} else {
				res.status(401).json({ message: "no existis" });
			}
		});
});

app.post("/messages", (req, res) => {
	const { name } = req.body;
	const { message } = req.body;
	const { chatroomid } = req.body;
	const chatRoomRef = rtdb.ref("/rooms/" + chatroomid + "/mensajes");
	chatRoomRef.push({ message: message, name: name }, () => {
		res.json("todo OK");
	});
});
