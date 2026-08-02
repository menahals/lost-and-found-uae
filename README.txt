LOST & FOUND UAE - CSE 490 WEB PROGRAMMING PROJECT
===================================================

PROJECT DESCRIPTION
-------------------
Lost & Found UAE is a full-stack web application designed to help users
report, search, view, update, and delete lost and found item records.

The system uses a web interface connected to a Node.js/Express.js backend
and MongoDB database. Users can report lost or found items, search for
items using keywords, categories, and status, and manage existing item
records.

TECHNOLOGIES USED
-----------------
- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- AJAX with XMLHttpRequest
- JSON

MAIN FEATURES
-------------
- Home page
- Report Item page
- View Items page
- Search items by keyword
- Filter items by category
- Filter items by Lost/Found status
- Edit existing item records
- Delete item records
- Mark items as claimed
- Contact Us page
- Form validation
- MongoDB database storage
- Responsive website design

PROJECT STRUCTURE
-----------------
project-folder/
│
├── models/
│   ├── Item.js
│   └── Message.js
│
├── public/
│   ├── index.html
│   ├── report.html
│   ├── view.html
│   ├── contact.html
│   ├── about.html
│   │
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── report.js
│   │   ├── view.js
│   │   └── contact.js
│   │
│   └── images/
│       ├── logo.png
│       ├── menahal.png
│       ├── namrah.png
│       └──uae-skyline.png
│
├── server.js
├── package.json
├── package-lock.json
└── readme.txt

INSTALLATION AND SETUP
----------------------
1. Install Node.js and MongoDB.

2. Open the project folder in VS Code.

3. Open the terminal in the project folder.

4. Install the required dependencies:
   npm install

5. Start MongoDB on the computer.

6. Start the Node.js server:
   npm start

7. For local testing, open:
   http://localhost:8000

MONGODB
--------
The default local MongoDB connection is:

mongodb://127.0.0.1:27017/lostAndFoundDB

For cloud deployment, the MONGO_URL environment variable should contain
the MongoDB Atlas/cloud database connection string.

CLOUD SERVER LINK:

https://lost-and-found-uae.onrender.com
______________________________________________

USAGE
-----
1. Open the website using the local or cloud server link.

2. Use the Home page to access the main features of the application.

3. Use the Report Item page to submit information about a lost or found
   item.

4. Use the View Items page to:
   - View reported items.
   - Search by keyword.
   - Filter by category.
   - Filter by Lost or Found status.
   - Edit an existing item.
   - Delete an item.
   - Mark an item as claimed.

5. Use the Contact Us page to send a message to the project team.

6. Use the About Developers page to view information about the developers.






