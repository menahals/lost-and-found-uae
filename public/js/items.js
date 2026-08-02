let itemCategories = ["Electronics", "Wallets and Bags", "Keys", "Documents", "Clothing", "Other"];
let loadedItems = [];

class ItemCard {
    constructor(item) {
        this.item = item;
    }

    createHTML() {
        let claimedText = this.item.claimed ? "Yes" : "No";
        let itemDate = this.item.date ? this.item.date.substring(0, 10) : "Not provided";

        return "<article class='item-card'>" +
            "<h3>" + this.item.itemName + "</h3>" +
            "<p><strong>Status:</strong> " + this.item.status + "</p>" +
            "<p><strong>Category:</strong> " + this.item.category + "</p>" +
            "<p><strong>Description:</strong> " + this.item.description + "</p>" +
            "<p><strong>Location:</strong> " + this.item.location + "</p>" +
            "<p><strong>Date:</strong> " + itemDate + "</p>" +
            "<p><strong>Contact:</strong> " + this.item.contactName + " - " + this.item.contactEmail + "</p>" +
            "<p><strong>Claimed:</strong> " + claimedText + "</p>" +
            "<button type='button' onclick=\"editItem('" + this.item._id + "')\">Edit</button>" +
            "<button type='button' class='plain-button' onclick=\"deleteItem('" + this.item._id + "')\">Delete</button>" +
            "</article>";
    }
}
//Populates both category filters from the same array so the search and edit forms stay consistent
function fillItemCategories() {
    const searchCategory = document.getElementById("searchCategory");
    const editCategory = document.getElementById("editCategory");

    itemCategories.forEach(function (categoryName) {
        let searchOption = document.createElement("option");
        searchOption.value = categoryName;
        searchOption.textContent = categoryName;
        searchCategory.appendChild(searchOption);

        let editOption = document.createElement("option");
        editOption.value = categoryName;
        editOption.textContent = categoryName;
        editCategory.appendChild(editOption);
    });
}
// Builds the API query from the selected search controls and retrieves matching items asynchronously
function getItems(searchText, category, status) {
    let path = "/api/items";
    let queryParts = [];

    if (searchText) {
        queryParts.push("search=" + encodeURIComponent(searchText));
    }
    if (category) {
        queryParts.push("category=" + encodeURIComponent(category));
    }
    if (status) {
        queryParts.push("status=" + encodeURIComponent(status));
    }
    if (queryParts.length > 0) {
        path = path + "?" + queryParts.join("&");
    }

    let request = new XMLHttpRequest();
    request.open("GET", path, true);

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let message = document.getElementById("itemsMessage");

            if (request.status === 200) {
                loadedItems = JSON.parse(request.responseText);
                displayItems(loadedItems);
            } else {
                message.className = "result-message error-text";
                message.textContent = "Unable to load items. Check the server and MongoDB connection.";
            }
        }
    };

    request.send();
}

function displayItems(items) {
    const container = document.getElementById("itemsContainer");
    const message = document.getElementById("itemsMessage");
    container.innerHTML = "";

    if (items.length === 0) {
        message.className = "result-message";
        message.textContent = "No matching items were found.";
        return;
    }

    message.className = "result-message success-text";
    message.textContent = items.length + " item(s) found.";

    items.forEach(function (item) {
        container.innerHTML += new ItemCard(item).createHTML();
    });
}
//Applies the current search, category, and status selections to the server request
function searchItems() {
    let searchText = document.getElementById("searchText").value.trim();
    let category = document.getElementById("searchCategory").value;
    let status = document.getElementById("searchStatus").value;
    getItems(searchText, category, status);
}
//Loads the selected items data into the edit form 
function editItem(itemId) {
    const selectedItem = loadedItems.find(function (item) {
        return item._id === itemId;
    });

    if (!selectedItem) {
        return;
    }

    document.getElementById("itemId").value = selectedItem._id;
    document.getElementById("editItemName").value = selectedItem.itemName;
    document.getElementById("editDescription").value = selectedItem.description;
    document.getElementById("editCategory").value = selectedItem.category;
    document.getElementById("editLocation").value = selectedItem.location;
    document.getElementById("editStatus").value = selectedItem.status;
    document.getElementById("editDate").value = selectedItem.date.substring(0, 10);
    document.getElementById("editContactName").value = selectedItem.contactName;
    document.getElementById("editContactEmail").value = selectedItem.contactEmail;
    document.getElementById("editClaimed").checked = selectedItem.claimed;

    document.getElementById("editSection").style.display = "block";
    document.getElementById("editResult").textContent = "";
    window.scrollTo(0, document.body.scrollHeight);
}
//Validates required edit fields before sending the updated item to the server
function updateItem(event) {
    event.preventDefault();
    const itemId = document.getElementById("itemId").value;
    const updatedItem = {
        itemName: document.getElementById("editItemName").value.trim(),
        description: document.getElementById("editDescription").value.trim(),
        category: document.getElementById("editCategory").value,
        location: document.getElementById("editLocation").value.trim(),
        status: document.getElementById("editStatus").value,
        date: document.getElementById("editDate").value,
        contactName: document.getElementById("editContactName").value.trim(),
        contactEmail: document.getElementById("editContactEmail").value.trim(),
        claimed: document.getElementById("editClaimed").checked
    };

    if (updatedItem.itemName === "" || updatedItem.description === "" ||
        updatedItem.location === "" || updatedItem.contactName === "" ||
        updatedItem.contactEmail === "" || updatedItem.date === "") {
        document.getElementById("editResult").className = "result-message error-text";
        document.getElementById("editResult").textContent = "Please complete every edit field.";
        return;
    }

    let request = new XMLHttpRequest();
    request.open("PUT", "/api/items/" + itemId, true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let response = JSON.parse(request.responseText);
            let result = document.getElementById("editResult");

            if (request.status === 200) {
                result.className = "result-message success-text";
                result.textContent = response.message;
                getItems("", "", "");
            } else {
                result.className = "result-message error-text";
                result.textContent = response.message;
            }
        }
    };

    request.send(JSON.stringify(updatedItem));
}
//Confirms the deletion with the user before sending the DELETE request to prevent accidental removal.
function deleteItem(itemId) {
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) {
        return;
    }
    let request = new XMLHttpRequest();
    request.open("DELETE", "/api/items/" + itemId, true);
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let response = JSON.parse(request.responseText);
            let message = document.getElementById("itemsMessage");
            if (request.status === 200) {
                message.className = "result-message success-text";
                message.textContent = response.message;
                getItems("", "", "");
            } else {
                message.className = "result-message error-text";
                message.textContent = response.message;
            }
        }
    };
    request.send();
}

function closeEditForm() {
    document.getElementById("editSection").style.display = "none";
}
document.getElementById("searchButton").addEventListener("click", searchItems);
document.getElementById("showAllButton").addEventListener("click", function () {
    document.getElementById("searchText").value = "";
    document.getElementById("searchCategory").value = "";
    document.getElementById("searchStatus").value = "";
    getItems("", "", "");
});
document.getElementById("editForm").addEventListener("submit", updateItem);
document.getElementById("cancelEditButton").addEventListener("click", closeEditForm);
fillItemCategories();
getItems("", "", "");
