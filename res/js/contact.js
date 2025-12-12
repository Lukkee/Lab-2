/* document ID constants */
const FORM_FIRSTNAME    =   document.getElementById("ffirstname");
const FORM_LASTNAME     =   document.getElementById("flastname");
const FORM_EMAIL        =   document.getElementById("femail");
const FORM_SUBJECT      =   document.getElementById("fsubject");
const FORM_MESSAGE      =   document.getElementById("fmessage");
const FORM_SUBMIT       =   document.getElementById("fsubmit");
const FORM_RESET        =   document.getElementById("freset");

validateName() // - Check if name contains only letters (no numbers or special characters)
validateEmail() // - Check if email format is valid (contains @ and domain)
validateMessage() // - Check if message is at least 20 characters long
showError() // - Display error message below the field
clearError() // - Remove error message when field is valid
clearForm() // - Clear all form fields after successful submission