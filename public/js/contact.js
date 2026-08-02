function showContactError(fieldId, message) {
    document.getElementById(fieldId + "Error").textContent = message;
}

//Utility validation function used by multiple contact form fields
function validateContactText(fieldId, minimumLength) {
    let value = document.getElementById(fieldId).value.trim();
    if (value.length < minimumLength) {
        showContactError(fieldId, "Please enter at least " + minimumLength + " characters.");
        return false;
    }
    showContactError(fieldId, "");
    return true;
}

function validateContactEmail() {
    let email = document.getElementById("email").value.trim();
    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        showContactError("email", "Please enter a valid email address.");
        return false;
    }
    showContactError("email", "");
    return true;
}

//Validates all fields before sending the message to the server through AJAX.
function submitMessage(event) {
    event.preventDefault();

    const validName = validateContactText("name", 2);
    const validEmail = validateContactEmail();
    const validSubject = validateContactText("subject", 3);
    const validMessage = validateContactText("message", 5);
    const result = document.getElementById("contactResult");

    if (!(validName && validEmail && validSubject && validMessage)) {
        result.className = "result-message error-text";
        result.textContent = "Please correct the form errors.";
        return;
    }

    const contactData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        subject: document.getElementById("subject").value.trim(),
        message: document.getElementById("message").value.trim()
    };
    //AJAX POST sends the validated contact message to the server 
    let request = new XMLHttpRequest();
    request.open("POST", "/api/messages", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            let response = JSON.parse(request.responseText);
            if (request.status === 201) {
                result.className = "result-message success-text";
                result.textContent = response.message;
                document.getElementById("contactForm").reset();
            } else {
                result.className = "result-message error-text";
                result.textContent = response.message;
            }
        }
    };

    request.send(JSON.stringify(contactData));
}

//Blur handlers provide immediate validation when the user leaves each form field.
document.getElementById("name").addEventListener("blur", function () {
    validateContactText("name", 2);
});
document.getElementById("email").addEventListener("blur", validateContactEmail);
document.getElementById("subject").addEventListener("blur", function () {
    validateContactText("subject", 3);
});
document.getElementById("message").addEventListener("blur", function () {
    validateContactText("message", 5);
});
document.getElementById("contactForm").addEventListener("submit", submitMessage);
