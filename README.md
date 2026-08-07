# 🏷️ Lost & Found UAE

Lost & Found UAE is a full-stack web application designed to help users report, search, update, and manage lost and found items across the UAE. The system provides an easy-to-use interface connected to a Node.js/Express.js backend with a MongoDB database, allowing users to keep track of reported items efficiently.

## 🌟 Features

* 🏠 Home page
* 📝 Report Lost or Found Item page
* 📋 View all reported items
* 🔍 Search items by keyword
* 🗂️ Filter items by category
* 📌 Filter items by Lost or Found status
* ✏️ Edit existing item records
* 🗑️ Delete item records
* ✅ Mark items as claimed
* 📞 Contact Us page
* ✔️ Form validation
* 💾 MongoDB database integration
* 📱 Responsive website design

## 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Node.js
* Express.js
* MongoDB
* Mongoose
* AJAX (XMLHttpRequest)
* JSON

## 📂 Project Structure

```text
Lost-Found-UAE/
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
│       └── uae-skyline.png
│
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## 🎯 Purpose

The purpose of this project is to provide a simple and efficient platform for reporting and managing lost and found items. It helps users:

* Report lost or found items
* Search and filter reported items
* Update or delete existing reports
* Mark recovered items as claimed
* Manage item records through a MongoDB database

## 🚀 How to Run

### Using Terminal

1. Clone the repository:

```bash
git clone https://github.com/menahals/lost-and-found-uae.git
```

2. Navigate to the project folder:

```bash
cd lost-and-found-uae
```

3. Install the required dependencies:

```bash
npm install
```

4. Make sure MongoDB is running on your computer.

5. Start the application:

```bash
npm start
```

6. Open your browser and visit:

```text
http://localhost:8000
```

Alternatively, you can access the deployed version of the application using the cloud link below.

## ☁️ Database

The default local MongoDB connection is:

```text
mongodb://127.0.0.1:27017/lostAndFoundDB
```

For cloud deployment, the `MONGO_URL` environment variable should contain the MongoDB Atlas connection string.

## 🌐 Live Demo

https://lost-and-found-uae.onrender.com

---

‼️ **Note:** This project is shared for career and portfolio purposes only. Reuse, copying, or submitting this work as your own, especially for academic credit, is not permitted and may violate academic integrity policies.
