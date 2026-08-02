const mongoose = require("mongoose");
// Stores messages submitted through the Contact form and records when each message was sent
const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    sentAt: {
        type: Date,
        default: Date.now
    }
});
// Creates the Message model used to save contact form submissions in MongoDB
module.exports = mongoose.model("Message", messageSchema);
