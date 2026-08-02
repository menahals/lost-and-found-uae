const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Item = require("./models/Item");
const Message = require("./models/Message");
const app = express();
const PORT = process.env.PORT || 8000;
// Middleware parses form data, JSON requests, and serves the frontend files from public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const mongoDBURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/lostAndFoundDB";;

mongoose.connect(mongoDBURL)
    .then(function () {
        console.log("Connected to MongoDB successfully.");
    })
    .catch(function (error) {
        console.log("MongoDB connection error: " + error.message);
    });

// Retrieves items from MongoDB and applies optional search, category, and status filters
app.get("/api/items", function (req, res) {
    const searchText = req.query.search;
    const category = req.query.category;
    const status = req.query.status;
    const filter = {};
    if (searchText) {
        filter.$or = [
            { itemName: { $regex: searchText, $options: "i" } },
            { description: { $regex: searchText, $options: "i" } },
            { location: { $regex: searchText, $options: "i" } }
        ];
    }

    if (category) {
        filter.category = category;
    }

    if (status) {
        filter.status = status;
    }

    Item.find(filter)
        .sort({ date: -1 })
        .then(function (items) {
            res.status(200).json(items);
        })
        .catch(function (error) {
            res.status(500).json({ message: "Unable to retrieve items.", error: error.message });
        });
});

//Creates a new lost/found item and saves it to the MongoDB collection.
app.post("/api/items", function (req, res) {
    const newItem = new Item({
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        status: req.body.status,
        date: req.body.date,
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        claimed: false
    });
    newItem.save()
        .then(function (savedItem) {
            res.status(201).json({ message: "Item reported successfully.", item: savedItem });
        })
        .catch(function (error) {
            res.status(400).json({ message: "Unable to save the item. Check all fields.", error: error.message });
        });
});

//Stores messages submitted through the Contact Us form in a separate MongoDB collection
app.post("/api/messages", function (req, res) {
    const newMessage = new Message({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
    newMessage.save()
        .then(function (savedMessage) {
            res.status(201).json({ message: "Your message was sent successfully.", data: savedMessage });
        })
        .catch(function (error) {
            res.status(400).json({ message: "Unable to save your message.", error: error.message });
        });
});

//Updates an existing item using its MongoDB ID while running the schema validators
app.put("/api/items/:id", function (req, res) {
    const itemUpdates = {
        itemName: req.body.itemName,
        description: req.body.description,
        category: req.body.category,
        location: req.body.location,
        status: req.body.status,
        date: req.body.date,
        contactName: req.body.contactName,
        contactEmail: req.body.contactEmail,
        claimed: req.body.claimed
    };

    Item.findByIdAndUpdate(req.params.id, itemUpdates, { new: true, runValidators: true })
        .then(function (updatedItem) {
            if (!updatedItem) {
                res.status(404).json({ message: "Item not found." });
                return;
            }

            res.status(200).json({ message: "Item updated successfully.", item: updatedItem });
        })
        .catch(function (error) {
            res.status(400).json({ message: "Unable to update the item.", error: error.message });
        });
});

//Deletes an item by ID after confirming that the requested document exists
app.delete("/api/items/:id", function (req, res) {
    Item.findByIdAndDelete(req.params.id)
        .then(function (deletedItem) {
            if (!deletedItem) {
                res.status(404).json({ message: "Item not found." });
                return;
            }

            res.status(200).json({ message: "Item deleted successfully." });
        })
        .catch(function (error) {
            res.status(500).json({ message: "Unable to delete the item.", error: error.message });
        });
});

// Handles unknown API requests so clients receive a JSON error instead of an HTML page
app.use("/api", function (req, res) {
    res.status(404).json({ message: "API route not found." });
});

app.listen(PORT, function () {
    console.log("Server is running at http://localhost:" + PORT);
});
