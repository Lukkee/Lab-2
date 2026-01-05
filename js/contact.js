class element {     // Class to handle elements
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

const F_SUBMIT              =   document.getElementById("fsubmit");
const F_RESET               =   document.getElementById("freset");
const F_COUNTER             =   document.getElementById("fchar-counter");
const F_ERRORLIST           =   document.getElementById("ferrorlist");
const F_SUCCESSCONTAINER    =   document.getElementById("success-container");

/* Variables */
const cdefault = '#798777';
const cvalid = '#2ecc71'
const cerror = '#dc3545';

let errorlist = [];

/* functions */

/* Validation functions */
function validateName() {       // - Check if name contains only letters (no numbers or special characters)
    validateFirstName();
    validateLastName();
}

function validateFirstName() {  // Checks if first name contains only letters
    F_FIRSTNAME.errormask = 0;
    let firstname = F_FIRSTNAME.handle.value.trim();
    clearError(F_FIRSTNAME.e_msg1);
    clearError(F_FIRSTNAME.e_msg2);

    if (firstname === "") {
        showError(F_FIRSTNAME.e_msg1);
        F_FIRSTNAME.errormask |= 1 << 0;    // Adds MSB to errormask
    } else if (!/^[A-Za-z]+$/.test(firstname)) {
        showError(F_FIRSTNAME.e_msg2);
        F_FIRSTNAME.errormask |= 1 << 1;    // Adds LSB to errormask
    }
}

function validateLastName() {   // Checks if last name contains only letters
    F_LASTNAME.errormask = 0;
    let lastname = F_LASTNAME.handle.value.trim();
    clearError(F_LASTNAME.e_msg1);
    clearError(F_LASTNAME.e_msg2);

    if (lastname === "") {
        showError(F_LASTNAME.e_msg1);
        F_LASTNAME.errormask |= 1 << 0;
    } else if (!/^[A-Za-z]+$/.test(lastname)) {
        showError(F_LASTNAME.e_msg2);
        F_LASTNAME.errormask |= 1 << 1;
    }
}
  

function validateEmail() {      // - Check if email format is valid (contains @ and domain)
    F_EMAIL.errormask = 0;
    let email = F_EMAIL.handle.value.trim();

    clearError(F_EMAIL.e_msg1);
    clearError(F_EMAIL.e_msg2);

    if (email === "") {
        showError(F_EMAIL.e_msg1);
        F_EMAIL.errormask |= 1 << 0;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError(F_EMAIL.e_msg2);
        F_EMAIL.errormask |= 1 << 1;
    }
    /* REGEX explaination 
    ^[^\s@]+    - start with at least one character that isn't whitespace or @
    @           - must contain exactly one @
    [^\s@]+     - domain name part
    \.          - dot
    [^\s@]+$    - top-level domain
    */
}       

function validateMessage() {    // - Check if message is at least 20 characters long
    F_MESSAGE.errormask = 0;
    let len = F_MESSAGE.handle.value.length;

    clearError(F_MESSAGE.e_msg1);
    clearError(F_MESSAGE.e_msg2);

    if (len >= 20) return 0;
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

function clearAllErrors() {             // Clears all errors
    errorlist.length = 0;
    updateErrors();
}

function clearExpression(elementname) { // Removes previous expressions
    elementname.handle.classList.remove('input-valid');
    elementname.handle.classList.remove('input-error');
}

function expressFault(elementname) {    // Expresses faulty input
    elementname.handle.classList.remove('input-valid');
    elementname.handle.classList.remove('shake');
    elementname.handle.offsetWidth;
    elementname.handle.classList.add('shake');
    elementname.handle.classList.add('input-error');
}

function expressValid(elementname) {    // Expresses valid input
    elementname.handle.classList.remove('input-error');
    elementname.handle.classList.add('input-valid');
}

function successMessage() {         // Sends success message
    let name = F_FIRSTNAME.handle.value.trim();
    let message = document.createElement("h4");
    message.textContent = `Thank you ${name}! I will contact you soon!`;
    message.classList.add("successmessage");
    F_SUCCESSCONTAINER.appendChild(message);
    clearForm();
    setTimeout( () => {
        F_SUCCESSCONTAINER.removeChild(F_SUCCESSCONTAINER.firstChild);
    }, 3000);
}


/* Update */

function updateCounter() {              // Updates character counter in message textarea
    const currentlen = F_MESSAGE.handle.value.length;
    F_COUNTER.textContent = `${currentlen} / 20`;
    
    if (currentlen == 0) F_COUNTER.style.color = cdefault;
        else if (currentlen < 20) F_COUNTER.style.color = cerror;
        else F_COUNTER.style.color = cvalid;
}

function updateErrors() {               // Updates list of error messages
    while (F_ERRORLIST.firstChild) {
        F_ERRORLIST.removeChild(F_ERRORLIST.firstChild);
    }

    for (let i = 0; i < errorlist.length; i++) {
        let li = document.createElement("li");
        li.textContent = errorlist[i];
        F_ERRORLIST.appendChild(li);
    }
}

function updateElement(elementname) {   // Updates status on element
    if (elementname.errormask != 0) {
        expressFault(elementname);
    } else if (elementname.errormask == 0) {
        expressValid(elementname);
    }
}

function updateForm() {         // Updates status on all elements
    updateElement(F_FIRSTNAME);
    updateElement(F_LASTNAME);
    updateElement(F_EMAIL);
    updateElement(F_MESSAGE);
}

function clearForm() {          // - Clear all form fields after successful submission
    F_FIRSTNAME.handle.value = "";
    clearExpression(F_FIRSTNAME);

    F_LASTNAME.handle.value = "";
    clearExpression(F_LASTNAME);

    F_EMAIL.handle.value = "";
    clearExpression(F_EMAIL);

    F_MESSAGE.handle.value = "";
    clearExpression(F_MESSAGE);

    F_SUBJECT.handle.selectedIndex = 0;

    clearAllErrors();
    updateCounter();
}       

function submitForm() {
    validateName();
    validateEmail();
    validateMessage();
    updateForm();
    
    let errorcheck = F_FIRSTNAME.errormask | F_LASTNAME.errormask | F_EMAIL.errormask | F_MESSAGE.errormask;

    if (errorcheck == 0) successMessage();
}

/* Event Listeners */

/* Input blurs */
F_FIRSTNAME.handle.addEventListener('blur', function (e) {
    validateFirstName();
    updateElement(F_FIRSTNAME);
})

F_LASTNAME.handle.addEventListener('blur', function (e) {
    validateLastName();
    updateElement(F_LASTNAME);
})

F_EMAIL.handle.addEventListener('blur', function (e) {
    validateEmail();
    updateElement(F_EMAIL);
});

F_MESSAGE.handle.addEventListener('blur', function (e) {
    validateMessage();
    updateElement(F_MESSAGE);
})

/* Message input */
F_MESSAGE.handle.addEventListener('input', updateCounter);

/* Buttons */
F_RESET.addEventListener("click", function (e) {
    e.preventDefault();
    clearForm();
});

F_SUBMIT.addEventListener("click", function (e) {
    e.preventDefault();
    submitForm();
});

