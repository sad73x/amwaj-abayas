document.addEventListener("DOMContentLoaded", function () {

const form=document.querySelector(".contact-form");
const firstName=document.getElementById("firstName");
const lastName=document.getElementById("lastName");
const email=document.getElementById("email");
const message=document.getElementById("message");
const firstNameError=document.getElementById("firstNameError");
const lastNameError=document.getElementById("lastNameError");
const emailError=document.getElementById("emailError");
const messageError=document.getElementById("messageError");
const successMessage=document.getElementById("formSuccess");
const clearBtn=document.getElementById("clearStorage");

const savedData = localStorage.getItem("contactFormData");
if (savedData){
const data=JSON.parse(savedData);
firstName.value=data.firstName || "";
lastName.value=data.lastName || "";
email.value=data.email || "";
message.value=data.message || "";
}

function showError(input, errorElement, msg){
errorElement.textContent=msg;
input.style.borderColor="red";
input.setAttribute("aria-invalid", "true");
}

function clearError(input, errorElement){
errorElement.textContent="";
input.style.borderColor="#3a5a8f";
input.removeAttribute("aria-invalid");
}

function validateEmail(emailValue){
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
}

function clearSuccess(){
successMessage.textContent = "";
}

[firstName, lastName, email, message].forEach(input =>{
input.addEventListener("input", () =>{
clearSuccess();
if (input.value.trim() !== ""){
clearError(input, document.getElementById(input.id + "Error"));
}
});
});

form.addEventListener("submit", function (e){
e.preventDefault();
let isValid=true;
clearSuccess();
if (firstName.value.trim() === "") {
showError(firstName, firstNameError, "First name is required");
isValid=false;
} else{
clearError(firstName, firstNameError);
}
if (lastName.value.trim() === ""){
showError(lastName, lastNameError, "Last name is required");
isValid=false;
} else {
clearError(lastName, lastNameError);
}
if (email.value.trim() === ""){
showError(email, emailError, "Email is required");
isValid=false;
} else if (!validateEmail(email.value)){
showError(email, emailError, "Invalid email format. Example: example@email.com");
isValid=false;
} else {
clearError(email, emailError);
}
if (message.value.trim() === "") {
showError(message, messageError, "Message cannot be empty");
isValid=false;
} else {
clearError(message, messageError);
}
if (isValid){
const formData={
firstName: firstName.value.trim(),
lastName: lastName.value.trim(),
email: email.value.trim(),
message: message.value.trim()
};
console.log(`
First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Email: ${formData.email}
Message: ${formData.message}
`);
localStorage.setItem("contactFormData", JSON.stringify(formData));
console.log("Data saved to localStorage");
successMessage.textContent="Your message has been submitted successfully.";
alert("Your message has been sent to our email successfully.");
form.reset();
}
});
clearBtn.addEventListener("click", () => {
const confirmClear = confirm("Are you sure you want to clear the form?");
if (confirmClear){
localStorage.removeItem("contactFormData");
form.reset();
successMessage.textContent="Form cleared successfully.";
alert("The form has been cleared successfully.");
}
});
});