const mongoose = require("mongoose");
//Defines the MongoDB structure and validation rules for each lost/found item.
const itemSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Lost", "Found"]
    },
    date: {
        type: Date,
        required: true
    },
    contactName: {
        type: String,
        required: true,
        trim: true
    },
    contactEmail: {
        type: String,
        required: true,
        trim: true
    },
    claimed: {
        type: Boolean,
        default: false // New reports start unclaimed
    }
});
//Creates the Item model used by the server to create, read, update, and delete database records.
module.exports = mongoose.model("Item", itemSchema);
