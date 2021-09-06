const mongoose = require("mongoose")
const app = require("./app")

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const uri = process.env.URI + process.env.DB

const connectDB = async () => {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true})
        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
};

connectDB()

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const PORT = process.env.PORT

try {
	const server = app.listen(PORT || 4000)
	console.log("Server listening on port %d", server.address().port)
} catch (err) {
	console.log(err.message)
}