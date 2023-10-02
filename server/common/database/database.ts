const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);
const url = 'mongodb+srv://khaipi011:S0Kbec2zTTeNOQ8V@cluster0.e9dhjvb.mongodb.net/?retryWrites=true&w=majority'
const port = 4000

// mongoose.connect('mongodb+srv://khaipi011:S0Kbec2zTTeNOQ8V@cluster0.e9dhjvb.mongodb.net/?retryWrites=true&w=majority')

export const connectToDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine
        });
        console.log("Connected to database.");
    }
    catch (ex) {
        console.error("Error connecting to database: ", ex);
    }
}

export const db = mongoose;