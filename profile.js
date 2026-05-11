const defaultProfile = {
  name: "Sarah Alsharafa",
  memberType: "Premium Member",
  email: "sarah.m@email.com",
  countryCode: "+966",
  phone: "501649014",
  favorites: 3,
  points: 335,
  delivered: 9,
  transit: 1
};

let profileData = JSON.parse(localStorage.getItem("profileData")) || defaultProfile;

const profileName = document.getElementById("profileName");
const memberType = document.getElementById("memberType");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");

const favoritesCount = document.getElementById("favoritesCount");
const loyaltyPoints = document.getElementById("loyaltyPoints");
const deliveredOrders = document.getElementById("deliveredOrders");
const transitOrders = document.getElementById("transitOrders");

const editBtn = document.querySelector(".edit-btn");
const editModal = document.getElementById("editModal");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const phoneInput = document.getElementById("phoneInput");
const memberInput = document.getElementById("memberInput");
const countryCode = document.getElementById("countryCode");
const phonePrefix = document.getElementById("phonePrefix");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const phoneGroup = document.getElementById("phoneGroup");

const addFavoriteBtn = document.getElementById("addFavoriteBtn");
const removeFavoriteBtn = document.getElementById("removeFavoriteBtn");

const addPointsBtn = document.getElementById("addPointsBtn");
const removePointsBtn = document.getElementById("removePointsBtn");

const addDeliveredBtn = document.getElementById("addDeliveredBtn");
const removeDeliveredBtn = document.getElementById("removeDeliveredBtn");

let lastFocusedElement = null;

function formatPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) {
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  return digits;
}

function renderProfile() {
  profileName.textContent = profileData.name;
  memberType.textContent = profileData.memberType;
  profileEmail.textContent = profileData.email;
  profileEmail.href = `mailto:${profileData.email}`;
  profilePhone.textContent = `${profileData.countryCode} ${formatPhone(profileData.phone)}`;

  favoritesCount.textContent = `My Favorites: ${profileData.favorites}`;
  loyaltyPoints.textContent = `${profileData.points} Loyalty Points`;
  deliveredOrders.textContent = `Delivered Orders: ${profileData.delivered}`;
  transitOrders.textContent = `In Transit: ${profileData.transit}`;
}

function saveProfileData() {
  localStorage.setItem("profileData", JSON.stringify(profileData));
}

function openModal() {
  lastFocusedElement = document.activeElement;

  nameInput.value = profileData.name;
  emailInput.value = profileData.email;
  phoneInput.value = profileData.phone;
  memberInput.value = profileData.memberType;
  countryCode.value = profileData.countryCode;
  phonePrefix.textContent = profileData.countryCode;

  clearErrors();

  editModal.classList.remove("hidden");
  editModal.setAttribute("aria-hidden", "false");
  nameInput.focus();
}

function closeModal() {
  editModal.classList.add("hidden");
  editModal.setAttribute("aria-hidden", "true");
  clearErrors();

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function setError(inputElement, errorElement, message) {
  inputElement.classList.add("input-error");
  inputElement.setAttribute("aria-invalid", "true");
  errorElement.textContent = message;
}
function clearError(inputElement, errorElement) {
  inputElement.classList.remove("input-error");
  inputElement.setAttribute("aria-invalid", "false");
  errorElement.textContent = "";
}

function clearPhoneError() {
  phoneGroup.classList.remove("error");
  phoneInput.setAttribute("aria-invalid", "false");
  phoneError.textContent = "";
}

function clearErrors() {
  clearError(nameInput, nameError);
  clearError(emailInput, emailError);
  clearPhoneError();
}

function normalizeName(name) {
  return name.replace(/\s+/g, " ").trim();
}

function validEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validatePhoneByCountry(code, phone) {
  const clean = phone.replace(/\s+/g, "");

  if (clean === "") {
    return "Phone number is required.";
  }

  if (!/^\d+$/.test(clean)) {
    return "Phone number must contain digits only.";
  }

  if (code === "+966") {
    if (!clean.startsWith("5")) {
      return "Saudi phone numbers should start with 5.";
    }
    if (clean.length !== 9) {
      return "Saudi phone number must be 9 digits.";
    }
    return "";
  }

  if (clean.length < 8) {
    return "The phone number is incomplete or incorrect.";
  }

  if (clean.length > 12) {
    return "The phone number is too long.";
  }

  return "";
}

function validateForm() {
  clearErrors();
  let isValid = true;

  const newName = normalizeName(nameInput.value);
  const newEmail = emailInput.value.trim();
  const newPhone = phoneInput.value.trim();
  const newCountry = countryCode.value;

  if (newName === "") {
    setError(nameInput, nameError, "Full name is required.");
    if (isValid) nameInput.focus();
    isValid = false;
  } else if (newName.length < 3) {
    setError(nameInput, nameError, "Please enter your full name correctly.");
    if (isValid) nameInput.focus();
    isValid = false;
  } else if (/\d/.test(newName)) {
    setError(nameInput, nameError, "Name should contain letters only.");
    if (isValid) nameInput.focus();
    isValid = false;
  }

  if (newEmail === "") {
    setError(emailInput, emailError, "Email is required.");
    if (isValid) emailInput.focus();
    isValid = false;
  } else if (!validEmail(newEmail)) {
    setError(emailInput, emailError, "Please enter a valid email address.");
    if (isValid) emailInput.focus();
    isValid = false;
  }

  const phoneMessage = validatePhoneByCountry(newCountry, newPhone);

if (phoneMessage !== "") {
  phoneGroup.classList.add("error");
  phoneInput.setAttribute("aria-invalid", "true");
  phoneError.textContent = phoneMessage;

  if (isValid) phoneInput.focus();
  isValid = false;
} else {
  clearPhoneError();
}

  return isValid;
}

editBtn.addEventListener("click", openModal);
cancelBtn.addEventListener("click", closeModal);

saveBtn.addEventListener("click", function () {
  if (!validateForm()) {
    return;
  }

  profileData.name = normalizeName(nameInput.value);
  profileData.email = emailInput.value.trim();
  profileData.phone = phoneInput.value.trim().replace(/\s+/g, "");
  profileData.memberType = memberInput.value;
  profileData.countryCode = countryCode.value;

  saveProfileData();
  renderProfile();
  closeModal();
});

nameInput.addEventListener("input", function () {
  clearError(nameInput, nameError);
});

emailInput.addEventListener("input", function () {
  clearError(emailInput, emailError);
});

phoneInput.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
  clearPhoneError();
});

countryCode.addEventListener("change", function () {
  phonePrefix.textContent = this.value;
  clearPhoneError();
  phoneInput.focus();
});

addFavoriteBtn.addEventListener("click", function () {
  profileData.favorites += 1;
  saveProfileData();
  renderProfile();
});

removeFavoriteBtn.addEventListener("click", function () {
  if (profileData.favorites > 0) {
    profileData.favorites -= 1;
    saveProfileData();
    renderProfile();
  }
});

addPointsBtn.addEventListener("click", function () {
  profileData.points += 10;
  saveProfileData();
  renderProfile();
});

removePointsBtn.addEventListener("click", function () {
  if (profileData.points >= 10) {
    profileData.points -= 10;
    saveProfileData();
    renderProfile();
  }
});

addDeliveredBtn.addEventListener("click", function () {
  if (profileData.delivered < 999) {
    profileData.delivered += 1;
    saveProfileData();
    renderProfile();
  }
});

removeDeliveredBtn.addEventListener("click", function () {
  if (profileData.delivered > 0) {
    profileData.delivered -= 1;
    saveProfileData();
    renderProfile();
  }
});

window.addEventListener("click", function (event) {
  if (event.target === editModal) {
    closeModal();
  }
});
document.addEventListener("keydown", function (event) {
  if (editModal.classList.contains("hidden")) {
    return;
  }

  if (event.key === "Enter") {
    event.preventDefault();
    saveBtn.click();
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeModal();
  }
});

renderProfile();