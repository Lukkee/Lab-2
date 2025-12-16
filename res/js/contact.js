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

let errorlist = [];

/* functions */

function shakeElement(elementHandle) {
        elementHandle.classList.remove('shake');
        elementHandle.offsetWidth;
        elementHandle.classList.add('shake');
}

/* Validation functions */
function validateName() {       // - Check if name contains only letters (no numbers or special characters)
    let firstname = validateFirstName();
    let lastname = validateLastName();
    
    return firstname | lastname;
}

function validateFirstName() {
    const firstname = FORM_FIRSTNAME.value.trim();
    let errorflags = 0;

    clearError("First name can not be empty.");
    clearError("First name must contain only letters.");

    if (firstname === "") {
        showError("First name can not be empty.");
        errorflags |= 1 << 0;
    } else if (!/^[A-Za-z]+$/.test(firstname)) {
        showError("First name must contain only letters.");
        errorflags |= 1 << 1;
    }
    return errorflags;
}

function validateLastName() {
    const lastname = FORM_LASTNAME.value.trim();
    let errorflags = 0;

    clearError("Last name can not be empty.");
    clearError("Last name must contain only letters.");

    if (lastname === "") {
        showError("Last name can not be empty.");
        errorflags |= 1 << 2;
    } else if (!/^[A-Za-z]+$/.test(lastname)) {
        showError("Last name must contain only letters.");
        errorflags |= 1 << 3;
    }

    return errorflags;
}
  

function validateEmail() {      // - Check if email format is valid (contains @ and domain)
    const email = FORM_EMAIL.value.trim();
    let errorflags = 0;

    /* Clear errors */
    clearError("Email can not be empty.");
    clearError("Email is not valid.");

    /* Validation */
    if (email == 0) {
        showError("Email can not be empty.");
        errorflags |= 1 << 0;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("Email is not valid.");
        errorflags |= 1 << 1;
    }

    return errorflags;
    
    /* 
    ^[^\s@]+    - start with at least one character that isn't whitespace or @
    @           - must contain exactly one @
    [^\s@]+     - domain name part
    \.          - dot
    [^\s@]+$    - top-level domain
    */
}       

function validateMessage() {    // - Check if message is at least 20 characters long
    len = FORM_MESSAGE.value.length;

    clearError("Message can not be empty.");
    clearError("Message need to be at least 20 characters.")

    if (len > 20) return 0;
        else if (len == 0) {
            showError("Message can not be empty.");
            return (1 << 0);
        }
        else {
            showError("Message need to be at least 20 characters.");
            return (1 << 2);
        }
}       

/* Error Handling */
function showError(errormessage) {          // - Display error message below the field
    if (!errorlist.includes(errormessage)) {
        errorlist.push(errormessage);
        updateErrors();
    }
}       

function clearError(errormessage) {         // - Remove error message when field is valid
    const index = errorlist.indexOf(errormessage);
    if (index !== -1) {
        errorlist.splice(index, 1);
        updateErrors();
    }
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
    let namecheck = validateName();
    let emailcheck = validateEmail();
    let messagecheck = validateMessage();

    /* name */
    if (namecheck & (1 << 0) || namecheck & (1 << 1)) {
        FORM_FIRSTNAME.classList.add('input-error');
        shakeElement(FORM_FIRSTNAME);
    } else {
        FORM_FIRSTNAME.classList.remove('input-error');
    }

    if (namecheck & (1 << 2) || namecheck & (1 << 3)) {
        FORM_LASTNAME.classList.add('input-error');
        shakeElement(FORM_LASTNAME);
    } else {
        FORM_LASTNAME.classList.remove('input-error');
    }

    /* Email */
    if (emailcheck != 0) {
        FORM_EMAIL.classList.add('input-error');
        shakeElement(FORM_EMAIL);
    } else {
        FORM_EMAIL.classList.remove('input-error');
    }

    /* message */
    if (messagecheck != 0) {
        FORM_MESSAGE.classList.add('input-error');
        shakeElement(FORM_MESSAGE);
    }
        else FORM_MESSAGE.classList.remove('input-error');
}

/* Buttons */

function clearForm() {          // - Clear all form fields after successful submission
    document.getElementById("ffirstname").value = "";
    FORM_FIRSTNAME.classList.remove('input-error');
    FORM_FIRSTNAME.classList.remove('input-valid');
    
    document.getElementById("flastname").value = "";
    FORM_LASTNAME.classList.remove('input-error');
    FORM_LASTNAME.classList.remove('input-valid');

    document.getElementById("femail").value = "";
    FORM_EMAIL.classList.remove('input-error');
    FORM_EMAIL.classList.remove('input-valid');
    
    document.getElementById("fselect").selectedIndex = 0;

    document.getElementById("fmessage").value = "";
    FORM_MESSAGE.classList.remove('input-error');
    FORM_MESSAGE.classList.remove('input-valid');

    clearAllErrors();
    updateCounter();
}       

/* Event Listeners */
FORM_MESSAGE.addEventListener('input', updateCounter);

FORM_FIRSTNAME.addEventListener('blur', function (e) {
    let errorcheck = validateFirstName();
    FORM_FIRSTNAME.classList.remove('input-error');
    FORM_FIRSTNAME.classList.remove('input-valid');
    
    if (errorcheck & (1 << 0) || errorcheck & (1 << 1)) {
            FORM_FIRSTNAME.classList.add('input-error');
            shakeElement(FORM_FIRSTNAME);
        } else if (errorcheck == 0) {
            FORM_FIRSTNAME.classList.add('input-valid');
    }
})

FORM_LASTNAME.addEventListener('blur', function (e) {
    let errorcheck = validateLastName();
    FORM_LASTNAME.classList.remove('input-error');
    FORM_LASTNAME.classList.remove('input-valid');
    
    if (errorcheck & (1 << 2) || errorcheck & (1 << 3)) {
            FORM_LASTNAME.classList.add('input-error');
            shakeElement(FORM_LASTNAME);
        } else if (errorcheck == 0) {
            FORM_LASTNAME.classList.add('input-valid');
    }
})

FORM_EMAIL.addEventListener('blur', function (e) {
    let errorcheck = validateEmail();    
    
    FORM_EMAIL.classList.remove('input-error');
    FORM_EMAIL.classList.remove('input-valid');

    if (errorcheck != 0) {
        FORM_EMAIL.classList.add('input-error');
        shakeElement(FORM_EMAIL);
    } else {
        FORM_EMAIL.classList.add('input-valid');
    }
});

FORM_MESSAGE.addEventListener('blur', function (e) {
    let errorcheck = validateMessage();

    FORM_MESSAGE.classList.remove('input-error');
    FORM_MESSAGE.classList.remove('input-valid');

    if (errorcheck != 0) {
        FORM_MESSAGE.classList.add('input-error');
        shakeElement(FORM_MESSAGE);
    } else {
        FORM_MESSAGE.classList.add('input-valid');
    }
})

/* Buttons */
FORM_RESET.addEventListener("click", function (e) {
    e.preventDefault();
    clearForm();
});

FORM_SUBMIT.addEventListener("click", function (e) {
    e.preventDefault();
    validateForm();
});

