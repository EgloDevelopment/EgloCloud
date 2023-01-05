const mongoose = require("mongoose");

var url =  process.env.MONGODB_URL;

mongoose.set("strictQuery", false);

mongoose.connect(url,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
)

const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error: "))

db.once("open", function() {
	console.log("V1 connected successfully!")
})

mongoose.connection.on("connected", () => console.log("Database connection confirmed"));
mongoose.connection.on("disconnected", () => console.log("DATABASE DISCONNECT"));

db.collection('Users').insertOne({ test: true, akshjd: "sdlhfi" })