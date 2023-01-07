// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import clientPromise from "../../functions/mongo";

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db("Main");
	const database_interaction = await db.collection("Users").find({}).toArray();
	res.json({ status: 200, data: database_interaction });
}
