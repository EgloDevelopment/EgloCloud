import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
	useUnifiedTopology: true,
	useNewUrlParser: true,
}

let client
let clientPromise

if (!process.env.MONGODB_URI) {
	throw new Error('Add MONGODB_URI to .env')
}

try {
	client = new MongoClient(uri, options)
	clientPromise = client.connect()
	console.log("Connected to MongoDB")
} catch (e) {
	console.log("ERROR: Could not connect to MongoDB")
	console.log(e)
}

export default clientPromise