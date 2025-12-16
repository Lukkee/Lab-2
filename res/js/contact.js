class element {
    constructor(handle, errormask, e_msg1, e_msg2){
        this.handle = handle;
        this.errormask = errormask;
        this.e_msg1 = e_msg1;
        this.e_msg2 = e_msg2;
    }
}

const F_FIRSTNAME   =   new element(document.getElementById('ffirstname'),  0, "First name can not be empty.",  "First name must contain only letters.");
const F_LASTNAME    =   new element(document.getElementById("flastname"),   0, "Last name can not be empty.",   "Last name must contain only letters.");
const F_EMAIL       =   new element(document.getElementById("femail"),      0, "Email can not be empty.",       "Email is not valid.");
const F_SUBJECT     =   new element(document.getElementById("fsubject"),    0, "NONE",                          "NONE");
const F_MESSAGE     =   new element(document.getElementById("fmessage"),    0, "Message can not be empty",      "Message must be at least 20 characters.");

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
    validateFirstName();
    validateLastName();
}

function validateFirstName() {
    clearError(F_FIRSTNAME.e_msg1);
    clearError(F_FIRSTNAME.e_msg2);

    if (F_FIRSTNAME.handle.value.trim() === "") {
        showError(F_FIRSTNAME.e_msg1);
        F_FIRSTNAME.errormask |= 1 << 0;
    } else if (!/^[A-Za-z]+$/.test(firstname)) {
        showError(F_FIRSTNAME.e_msg2);
        F_FIRSTNAME.errormask |= 1 << 1;
    }
}

function validateLastName() {
    clearError(F_LASTNAME.e_msg1);
    clearError(F_LASTNAME.e_msg2);

    if (F_LASTNAME.handle.value.trim() === "") {
        showError(F_LASTNAME.e_msg1);
        F_LASTNAME.errormask |= 1 << 0;
    } else if (!/^[A-Za-z]+$/.test(firstname)) {
        showError(F_LASTNAME.e_msg2);
        F_LASTNAME.errormask |= 1 << 1;
    }
}
  

function validateEmail() {      // - Check if email format is valid (contains @ and domain)
    let email = F_EMAIL.handle.value.trim();

    clearError(F_EMAIL.e_msg1);
    clearError(F_EMAIL.e_msg2);

    if ( email == 0) {
        showError(F_EMAIL.e_msg1);
        F_EMAIL.errormask |= 1 << 0;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(F_EMAIL.e_msg2);
        F_EMAIL.errormask |= 1 << 1;
    }
    /* 
    ^[^\s@]+    - start with at least one character that isn't whitespace or @
    @           - must contain exactly one @
    [^\s@]+     - domain name part
    \.          - dot
    [^\s@]+$    - top-level domain
    */
}       

function validateMessage() {    // - Check if message is at least 20 characters long
    len = F_MESSAGE.handle.value.length;

    clearError(F_MESSAGE.e_msg1);
    clearError(F_MESSAGE.e_msg2);

    if (len > 20) return 0;
        else if (len == 0) {
            showError(F_MESSAGE.e_msg1);
            F_MESSAGE.errormask |= 1 << 0;
        }
        else {
            showError(F_MESSAGE.e_msg2);
            F_MESSAGE.errormask |= 1 << 2;
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
    const currentlen = F_MESSAGE.handle.value.length;
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
    validateName();
    validateEmail();
    validateMessage();

    /* name */
    if (F_FIRSTNAME.errormask & (1 << 0) || F_FIRSTNAME.errormask & (1 << 1)) {
        F_FIRSTNAME.handle.classList.add('input-error');
        shakeElement(F_FIRSTNAME.handle);
    } else {
        F_FIRSTNAME.handle.classList.remove('input-error');
    }

    if (F_LASTNAME.errormask & (1 << 0) || F_LASTNAME.errormask & (1 << 1)) {
        F_LASTNAME.handle.classList.add('input-error');
        shakeElement(F_LASTNAME.handle);
    } else {
        F_LASTNAME.handle.classList.remove('input-error');
    }

    /* Email */
    if (F_EMAIL.errormask != 0) {
        F_EMAIL.handle.classList.add('input-error');
        shakeElement(F_EMAIL.handle);
    } else {
        F_EMAIL.handle.classList.remove('input-error');
    }

    /* message */
    if (F_MESSAGE.errormask != 0) {
        F_MESSAGE.handle.classList.add('input-error');
        shakeElement(F_MESSAGE.handle);
    }
        else F_MESSAGE.handle.classList.remove('input-error');
}

/* Buttons */

function clearForm() {          // - Clear all form fields after successful submission
    document.getElementById("ffirstname").value = "";
    F_FIRSTNAME.handle.classList.remove('input-error');
    F_FIRSTNAME.handle.classList.remove('input-valid');
    
    document.getElementById("flastname").value = "";
    F_LASTNAME.handle.classList.remove('input-error');
    F_LASTNAME.handle.classList.remove('input-valid');

    document.getElementById("femail").value = "";
    F_EMAIL.handle.classList.remove('input-error');
    F_EMAIL.handle.classList.remove('input-valid');
    
    document.getElementById("fselect").selectedIndex = 0;

    document.getElementById("fmessage").value = "";
    F_MESSAGE.handle.classList.remove('input-error');
    F_MESSAGE.handle.classList.remove('input-valid');

    clearAllErrors();
    updateCounter();
}       

/* Event Listeners */
F_MESSAGE.handle.addEventListener('input', updateCounter);

F_FIRSTNAME.handle.addEventListener('blur', function (e) {
    let errorcheck = validateFirstName();
    F_FIRSTNAME.handle.classList.remove('input-error');
    F_FIRSTNAME.handle.classList.remove('input-valid');
    
    if (errorcheck & (1 << 0) || errorcheck & (1 << 1)) {
            F_FIRSTNAME.handle.classList.add('input-error');
            shakeElement(F_FIRSTNAME.handle);
        } else if (errorcheck == 0) {
            F_FIRSTNAME.handle.classList.add('input-valid');
    }
})

F_LASTNAME.handle.addEventListener('blur', function (e) {
    let errorcheck = validateLastName();
    F_LASTNAME.handle.classList.remove('input-error');
    F_LASTNAME.handle.classList.remove('input-valid');
    
    if (errorcheck & (1 << 2) || errorcheck & (1 << 3)) {
            F_LASTNAME.handle.classList.add('input-error');
            shakeElement(F_LASTNAME.handle);
        } else if (errorcheck == 0) {
            F_LASTNAME.handle.classList.add('input-valid');
    }
})

F_EMAIL.handle.addEventListener('blur', function (e) {
    let errorcheck = validateEmail();    
    
    F_EMAIL.handle.classList.remove('input-error');
    F_EMAIL.handle.classList.remove('input-valid');

    if (errorcheck != 0) {
        F_EMAIL.handle.classList.add('input-error');
        shakeElement(F_EMAIL.handle);
    } else {
        F_EMAIL.handle.classList.add('input-valid');
    }
});

F_MESSAGE.handle.addEventListener('blur', function (e) {
    let errorcheck = validateMessage();

    F_MESSAGE.handle.classList.remove('input-error');
    F_MESSAGE.handle.classList.remove('input-valid');

    if (errorcheck != 0) {
        F_MESSAGE.handle.classList.add('input-error');
        shakeElement(F_MESSAGE.handle);
    } else {
        F_MESSAGE.handle.classList.add('input-valid');
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

