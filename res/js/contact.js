/* document ID constants */
const FORM_FIRSTNAME    =   document.getElementById("ffirstname");
const FORM_LASTNAME     =   document.getElementById("flastname");
const FORM_EMAIL        =   document.getElementById("femail");
const FORM_SUBJECT      =   document.getElementById("fsubject");
const FORM_MESSAGE      =   document.getElementById("fmessage");
const FORM_SUBMIT       =   document.getElementById("fsubmit");
const FORM_RESET        =   document.getElementById("freset");

/* functions */
function validateName() {       // - Check if name contains only letters (no numbers or special characters)

}       

function validateEmail() {      // - Check if email format is valid (contains @ and domain)

}       

function validateMessage() {    // - Check if message is at least 20 characters long

}       

function showError() {          // - Display error message below the field

}       

function clearError() {         // - Remove error message when field is valid

}

function clearForm() {          // - Clear all form fields after successful submission
    document.getElementById("ffirstname").value = "";
    document.getElementById("flastname").value = "";
    document.getElementById("femail").value = "";
    document.getElementById("fselect").selectedIndex = 0;
    document.getElementById("fmessage").value = "";
}       

/* Event Listeners */
FORM_FIRSTNAME.addEventListener("focus", () => {
    console.log("First name field is highlighted!");
});

/* Buttons */
FORM_RESET.addEventListener("click", function (e) {
    e.preventDefault();
    clearForm();
});

FORM_SUBMIT.addEventListener("click", function (e) {
    e.preventDefault();
    clearForm();
});

