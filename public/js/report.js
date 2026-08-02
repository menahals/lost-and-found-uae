let categories = ["Electronics", "Wallets and Bags", "Keys", "Documents", "Clothing", "Other"];

class ReportedItem {
    constructor(itemName, description, category, location, status, date, contactName, contactEmail) {
        this.itemName = itemName;
        this.description = description;
        this.category = category;
        this.location = location;
        this.status = status;
        this.date = date;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
    }
}
//Populates the category dropdown using the available item categories
function fillCategoryList() {
    let categorySelect = document.getElementById("category");

    categories.forEach(function (categoryName) {
        let option = document.createElement("option");
        option.value = categoryName;
        option.textContent = categoryName;
        categorySelect.appendChild(option);
    });
}

function showFieldError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
}

//Reusable validation for text fields so the same minimum-length rule can be applied across the form
function validateTextField(fieldId, minimumLength) {
    let value = document.getElementById(fieldId).value.trim();
    if (value.length < minimumLength) {
        showFieldError(fieldId, "Please enter at least " + minimumLength + " characters.");
        return false;
    }
    showFieldError(fieldId, "");
    return true;
}

function validateSelection(fieldId) {
    let value = document.getElementById(fieldId).value;

    if (value === "") {
        showFieldError(fieldId, "Please select an option.");
        return false;
    }

    showFieldError(fieldId, "");
    return true;
}

function validateEmail() {
    let email = document.getElementById("contactEmail").value.trim();

    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        showFieldError("contactEmail", "Please enter a valid email address.");
        return false;
    }

    showFieldError("contactEmail", "");
    return true;
}

function validateDate() {
    let date = document.getElementById("date").value;

    if (date === "") {
        showFieldError("date", "Please select a date.");
        return false;
    }

    showFieldError("date", "");
    return true;
}
// Runs all field validations before allowing the item to be submitted to the server
function validateEntireForm() {
    return validateTextField("itemName", 2) &&
        validateTextField("description", 5) &&
        validateSelection("category") &&
        validateTextField("location", 2) &&
        validateSelection("status") &&
        validateDate() &&
        validateTextField("contactName", 2) &&
        validateEmail();
}
// Validates the form, creates the item object, and sends it to the server using an async POST request
function submitItem(event) {
    event.preventDefault();
    let result = document.getElementById("reportResult");
    if (!validateEntireForm()) {
        result.className = "result-message error-text";
        result.textContent = "Please correct the form errors before submitting.";
        return;
    }
    let item = new ReportedItem(
        document.getElementById("itemName").value.trim(),
        document.getElementById("description").value.trim(),
        document.getElementById("category").value,
        document.getElementById("location").value.trim(),
        document.getElementById("status").value,
        document.getElementById("date").value,
        document.getElementById("contactName").value.trim(),
        document.getElementById("contactEmail").value.trim()
    );

    let request = new XMLHttpRequest();
    request.open("POST", "/api/items", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let response = JSON.parse(request.responseText);

            if (request.status === 201) {
                result.className = "result-message success-text";
                result.textContent = response.message;
                document.getElementById("reportForm").reset();
            } else {
                result.className = "result-message error-text";
                result.textContent = response.message;
            }
        }
    };

    request.send(JSON.stringify(item));
}

document.getElementById("itemName").addEventListener("blur", function () {
    validateTextField("itemName", 2);
});
document.getElementById("description").addEventListener("blur", function () {
    validateTextField("description", 5);
});
document.getElementById("category").addEventListener("blur", function () {
    validateSelection("category");
});
document.getElementById("location").addEventListener("blur", function () {
    validateTextField("location", 2);
});
document.getElementById("status").addEventListener("blur", function () {
    validateSelection("status");
});
document.getElementById("date").addEventListener("blur", validateDate);
document.getElementById("contactName").addEventListener("blur", function () {
    validateTextField("contactName", 2);
});
document.getElementById("contactEmail").addEventListener("blur", validateEmail);

document.getElementById("reportForm").addEventListener("submit", submitItem);
fillCategoryList();
