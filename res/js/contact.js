/* document ID constants */
const FORM_FIRSTNAME    =   document.getElementById("ffirstname");
const FORM_LASTNAME     =   document.getElementById("flastname");
const FORM_EMAIL        =   document.getElementById("femail");
const FORM_SUBJECT      =   document.getElementById("fsubject");
const FORM_MESSAGE      =   document.getElementById("fmessage");
const FORM_SUBMIT       =   document.getElementById("fsubmit");
const FORM_RESET        =   document.getElementById("freset");
const FORM_COUNTER      =   document.getElementById("fchar-counter");
const FORM_ERRORLIST    =   document.getElementById("ferrorlist");

/* Variables */
const cdefault = '#798777';
const cvalid = '#2ecc71'
const cerror = '#dc3545';

const errorlist = [];

/* functions */

function shakeElement(elementHandle) {
        elementHandle.classList.remove('shake');
        elementHandle.offsetWidth;
        elementHandle.classList.add('shake');
}

/* Validation functions */
function validateName() {       // - Check if name contains only letters (no numbers or special characters)

}       

function validateEmail() {      // - Check if email format is valid (contains @ and domain)

}       

function validateMessage() {    // - Check if message is at least 20 characters long
    len = FORM_MESSAGE.value.length;
    if (len > 20) return 0;
        else if (len == 0) return 1;
        else return 2;
}       

/* Error Handling */
function showError(errormessage) {          // - Display error message below the field
    if (!errorlist.includes(errormessage)) {
        errorlist.push(errormessage);
        updateErrors();
    }
}       

function clearError(errormessage) {         // - Remove error message when field is valid
    index = errorlist.indexOf(errormessage);
    errorlist.splice(1, index);
    updateErrors();
}

function clearAllErrors() {
    errorlist.length = 0;
    updateErrors();
}

/* Update */

function updateCounter() {
    const currentlen = FORM_MESSAGE.value.length;
    FORM_COUNTER.textContent = `${currentlen} / 20`;
    
    if (currentlen == 0) FORM_COUNTER.style.color = cdefault;
        else if (currentlen < 20) FORM_COUNTER.style.color = cerror;
        else FORM_COUNTER.style.color = cvalid;
}

function updateErrors() {
    while (FORM_ERRORLIST.firstChild) {
        FORM_ERRORLIST.removeChild(FORM_ERRORLIST.firstChild);
    }

    for (let i = 0; i < errorlist.length; i++) {
        li = document.createElement("li");
        li.textContent = errorlist[i];
        FORM_ERRORLIST.appendChild(li);
    }
}

function validateForm() {
    if (validateMessage() != 0) {
        FORM_MESSAGE.classList.add('input-error');
        shakeElement(FORM_MESSAGE);
        showError("Message need to be at least 20 characters.");
    }
        else FORM_MESSAGE.classList.remove('input-error');
}

/* Buttons */

function clearForm() {          // - Clear all form fields after successful submission
    document.getElementById("ffirstname").value = "";
    
    document.getElementById("flastname").value = "";
    
    document.getElementById("femail").value = "";
    
    document.getElementById("fselect").selectedIndex = 0;

    document.getElementById("fmessage").value = "";
    FORM_MESSAGE.classList.remove('input-error');

    clearAllErrors();
    updateCounter();
}       

/* Event Listeners */
FORM_FIRSTNAME.addEventListener("focus", () => {
    console.log("First name field is highlighted!");
});

FORM_MESSAGE.addEventListener('input', updateCounter);

/* Buttons */
FORM_RESET.addEventListener("click", function (e) {
    e.preventDefault();
    clearForm();
});

FORM_SUBMIT.addEventListener("click", function (e) {
    e.preventDefault();
    validateForm();
});

