/* =========================================
   WOMEN SAFETY APP - MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   COMMON FUNCTIONS
   ========================================= */
// Safe JSON/localStorage helpers.
function readJSON(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value === null ? fallback : JSON.parse(value);
    } catch (error) {
        return fallback;
    }
}

function readContactsSafely() {
    const value = readJSON("Women Safety App Contacts", []);
    return Array.isArray(value) ? value.filter(Boolean) : [];
}


// Password show/hide
function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        if (icon) icon.textContent = "🙈";
    } else {
        input.type = "password";
        if (icon) icon.textContent = "👁️";
    }
}


/* =========================================
   SOS FUNCTION
   ========================================= */

function activateSOS() {

    const contacts = readContactsSafely();

    if (contacts.length === 0) {
        alert("Please add at least one trusted contact first.");
        return;
    }

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const accuracy = position.coords.accuracy;

            const locationLink =
                "https://www.google.com/maps?q=" +
                latitude + "," + longitude;

            const message =
                "🚨 SOS ALERT 🚨\n\n" +
                "I need help. Please contact me immediately.\n\n" +
                "📍 My current location:\n" +
                locationLink;

            // Save latest SOS information
            localStorage.setItem(
                "lastSOS",
                JSON.stringify({
                    latitude: latitude,
                    longitude: longitude,
                    accuracy: accuracy,
                    time: new Date().toLocaleString()
                })
            );

            /*
             * Open WhatsApp links.
             * IMPORTANT:
             * Normal WhatsApp/browser does not allow
             * automatic multi-contact selection.
             */
            contacts.forEach(function (contact, index) {

                let phone =
                    String(contact.phone).replace(/\D/g, "");

                if (phone.length === 10) {
                    phone = "91" + phone;
                }

                const whatsappLink =
                    "https://wa.me/" +
                    phone +
                    "?text=" +
                    encodeURIComponent(message);

                
                    window.open(whatsappLink, "_blank");
                
            });
        },

        function (error) {

            if (error.code === 1) {
                alert(
                    "Location permission denied.\n\n" +
                    "Please allow location access and try again."
                );
            }

            else if (error.code === 2) {
                alert(
                    "Location unavailable.\n\n" +
                    "Please turn ON your phone's Location/GPS."
                );
            }

            else if (error.code === 3) {
                alert(
                    "Location request timed out.\n\n" +
                    "Please try again in an open area."
                );
            }

            else {
                alert(
                    "Unable to get your current location.\n" +
                    "Please try again."
                );
            }
        },

        {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 60000
        }
    );
}


/* =========================================
   LOGIN
   ========================================= */

function loginUser(event) {
    event.preventDefault();

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let user = null;

    try {
        user = JSON.parse(
            localStorage.getItem("Women Safety App User")
        );
    } catch (error) {
        user = null;
    }

    if (
        !user ||
        !user.email ||
        user.email.toLowerCase() !== email.toLowerCase() ||
        user.password !== password
    ) {
        alert("Incorrect email or password.");
        return;
    }

    // Email ko yaad rakho
    localStorage.setItem("savedLoginEmail", email);

    // Login successful
    localStorage.setItem("Women Safety App LoggedIn", "true");
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Login ke baad Home Page
    window.location.href = "index.html";
}

// Login page par saved email automatically fill karo
document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");

    if (emailInput) {
        emailInput.value =
            localStorage.getItem("savedLoginEmail") || "";
    }
});


/* =========================================
   DEMO LOGIN
   ========================================= */

function demoLogin() {

    localStorage.setItem(
        "Women Safety App LoggedIn",
        "true"
    );

    alert("Demo login successful!");

    window.location.href = "profile.html";
}


/* =========================================
   FORGOT PASSWORD
   ========================================= */

function forgotPassword(event) {

    if (event) {
        event.preventDefault();
    }

    const emailElement =
        document.getElementById("email");

    if (!emailElement) return;

    const email =
        emailElement.value.trim();

    if (email === "") {
        alert("Please enter your email address first.");
        emailElement.focus();
        return;
    }

    alert(
        "Password reset link would be sent to:\n" +
        email +
        "\n\nThis is a frontend demo."
    );
}


/* =========================================
   SIGNUP
   ========================================= */

function registerUser(event) {
    if (event) event.preventDefault();
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");
    const passwordElement = document.getElementById("password");
    const confirmPasswordElement = document.getElementById("confirmPassword");
    const termsElement = document.getElementById("terms");
    if (!nameElement || !emailElement || !phoneElement || !passwordElement || !confirmPasswordElement) return;

    const name = nameElement.value.trim();
    const email = emailElement.value.trim().toLowerCase();
    const phone = phoneElement.value.trim().replace(/\D/g, "");
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

    if (!name || !email || !phone || !password || !confirmPassword) {
        alert("Please fill all required fields."); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address."); return;
    }
    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number."); return;
    }
    if (password.length < 6) {
        alert("Password must contain at least 6 characters."); return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match."); return;
    }
    if (termsElement && !termsElement.checked) {
        alert("Please accept the Terms & Conditions."); return;
    }

    const user = { name, email, phone, city: "", password };
    localStorage.setItem("Women Safety App User", JSON.stringify(user));
    alert("Account created successfully!\n\nYou can now login.");
    window.location.href = "login.html";
}


/* =========================================
   TERMS & CONDITIONS
   ========================================= */

function showTerms(event) {

    if (event) {
        event.preventDefault();
    }

    alert(
        "Women Safety App Terms & Conditions\n\n" +
        "This college project is a frontend demonstration. " +
        "It does not provide real emergency services."
    );
}


/* =========================================
   TRUSTED CONTACTS
   ========================================= */

function addContact(event) {
    if (event) event.preventDefault();
    const nameElement = document.getElementById("contactName");
    const phoneElement = document.getElementById("contactPhone");
    const relationshipElement = document.getElementById("relationship");
    if (!nameElement || !phoneElement) return;

    const name = nameElement.value.trim();
    const phone = phoneElement.value.trim().replace(/\D/g, "");
    const relationship = relationshipElement ? relationshipElement.value.trim() : "Other";
    if (!name || !phone) {
        alert("Please enter contact name and phone number."); return;
    }
    if (!/^\d{10,15}$/.test(phone)) {
        alert("Please enter a valid phone number (10 to 15 digits)."); return;
    }

    const contacts = readContactsSafely();
    if (contacts.length >= 1) {
        alert("You can save only 1 emergency contact. Delete the existing contact first.");
        return;
    }

    const newContact = { id: Date.now(), name, phone, relationship: relationship || "Other" };
    localStorage.setItem("Women Safety App Contacts", JSON.stringify([newContact]));
    nameElement.value = "";
    phoneElement.value = "";
    if (relationshipElement) relationshipElement.value = "";
    loadContacts();
    alert("Emergency contact saved successfully.");
}


/* =========================================
   LOAD CONTACTS
   ========================================= */

function loadContacts() {
    const contactList = document.getElementById("contactList");
    if (!contactList) return;

    // Keep one saved contact maximum; use the same key for saving and reading.
    const contacts = readContactsSafely().slice(0, 1);
    localStorage.setItem("Women Safety App Contacts", JSON.stringify(contacts));

    const countText = `${contacts.length} Contact${contacts.length === 1 ? "" : "s"}`;
    ["contactCount", "contactsCount", "contact-count"].forEach(function(id) {
        const el = document.getElementById(id);
        if (el) el.textContent = countText;
    });
    // Also update a count badge even if its HTML does not yet have an ID.
    document.querySelectorAll("*").forEach(function(el) {
        if (el.children.length === 0 && /^\d+ Contacts?$/.test((el.textContent || "").trim())) {
            el.textContent = countText;
        }
    });

    const emptyById = document.getElementById("emptyContacts");
    if (emptyById) emptyById.style.display = contacts.length ? "none" : "block";
    // Support the existing page markup if its empty-state block has no ID.
    document.querySelectorAll("h1,h2,h3,h4,p,div,section").forEach(function(el) {
        if (el.children.length === 0 && /no emergency contacts/i.test((el.textContent || "").trim())) {
            const emptyBlock = el.closest(".empty-state, .empty-contacts, .empty-contacts-state") || el.parentElement;
            if (emptyBlock) emptyBlock.style.display = contacts.length ? "none" : "";
        }
    });

    if (!contacts.length) {
        contactList.innerHTML = "";
        return;
    }

    contactList.innerHTML = "";
    contacts.forEach(function(contact) {
        const card = document.createElement("div");
        card.className = "contact-card";
        const name = escapeHTML(contact.name || "");
        const relationship = escapeHTML(contact.relationship || "Other");
        const phone = escapeHTML(contact.phone || "");
        card.innerHTML = `
            <div>
                <h3>${name}</h3>
                <p>${relationship}</p>
                <p>📞 ${phone}</p>
            </div>
            <div class="contact-actions">
                <a href="tel:${phone}" class="btn">Call</a>
                <button type="button" class="btn" onclick="deleteContact(${Number(contact.id)})">Delete</button>
            </div>`;
        contactList.appendChild(card);
    });
}


/* =========================================
   DELETE CONTACT
   ========================================= */

function deleteContact(id) {
    if (!confirm("Delete this emergency contact?")) return;
    const contacts = readContactsSafely().filter(function(contact) {
        return String(contact.id) !== String(id);
    });
    localStorage.setItem("Women Safety App Contacts", JSON.stringify(contacts));
    loadContacts();
}


/* =========================================
   ESCAPE HTML
   ========================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================
   LOCATION
   ========================================= */

let currentLatitude = null;
let currentLongitude = null;
let currentAccuracy = null;


/* =========================================
   GET CURRENT LOCATION
   ========================================= */

function getLocation() {

    const status =
        document.getElementById("locationStatus");

    const mapButton =
        document.getElementById("mapButton");

    const shareButton =
        document.getElementById("shareButton");

    const locationFound =
        document.getElementById("locationFound");

    if (!navigator.geolocation) {

        if (status) {
            status.innerHTML =
                "❌ Geolocation is not supported by this browser.";
        }

        return;
    }

    // Disable buttons until fresh location is received
    if (mapButton) {
        mapButton.disabled = true;
    }

    if (shareButton) {
        shareButton.disabled = true;
    }

    if (locationFound) {
        locationFound.style.display = "none";
    }

    if (status) {
        status.innerHTML =
            "📍 Getting your current location...";
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            currentLatitude =
                position.coords.latitude;

            currentLongitude =
                position.coords.longitude;

            currentAccuracy =
                position.coords.accuracy;

            const latitude =
                currentLatitude;

            const longitude =
                currentLongitude;

            const accuracy =
                currentAccuracy;


            /* -------------------------
               UPDATE SCREEN
               ------------------------- */

            const latitudeElement =
                document.getElementById("latitude");

            const longitudeElement =
                document.getElementById("longitude");

            const accuracyElement =
                document.getElementById("accuracy");

            const updatedTimeElement =
                document.getElementById("updatedTime");


            if (latitudeElement) {
                latitudeElement.textContent =
                    latitude.toFixed(6);
            }

            if (longitudeElement) {
                longitudeElement.textContent =
                    longitude.toFixed(6);
            }

            if (accuracyElement) {
                accuracyElement.textContent =
                    Math.round(accuracy) +
                    " meters";
            }

            if (updatedTimeElement) {
                updatedTimeElement.textContent =
                    new Date().toLocaleString();
            }

            if (locationFound) {
                locationFound.style.display =
                    "block";
            }

            if (status) {
                status.innerHTML =
                    "✅ Current location found successfully.";
            }


            /* -------------------------
               SAVE LOCATION
               ------------------------- */

            localStorage.setItem(
                "Women Safety App Location",
                JSON.stringify({
                    latitude: latitude,
                    longitude: longitude,
                    accuracy: accuracy,
                    updatedAt:
                        new Date().toISOString()
                })
            );


            /* -------------------------
               ENABLE BUTTONS
               ONLY AFTER FRESH GPS
               ------------------------- */

            if (mapButton) {
                mapButton.disabled = false;
            }

            if (shareButton) {
                shareButton.disabled = false;
            }
        },


        function (error) {

            // Clear current location
            currentLatitude = null;
            currentLongitude = null;
            currentAccuracy = null;

            const locationFound =
                document.getElementById("locationFound");

            const mapButton =
                document.getElementById("mapButton");

            const shareButton =
                document.getElementById("shareButton");

            if (locationFound) {
                locationFound.style.display =
                    "none";
            }

            if (mapButton) {
                mapButton.disabled = true;
            }

            if (shareButton) {
                shareButton.disabled = true;
            }


            let message =
                "❌ Unable to get your current location.";

            if (error.code === 1) {

                message =
                    "❌ Location permission denied. " +
                    "Please allow location access.";
            }

            else if (error.code === 2) {

                message =
                    "❌ Location unavailable. " +
                    "Please turn ON GPS/location.";
            }

            else if (error.code === 3) {

                message =
                    "❌ Location request timed out. " +
                    "Please try again.";
            }


            if (status) {
                status.innerHTML = message;
            }
        },


        {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        }
    );
}


/* =========================================
   LOAD SAVED LOCATION
   ========================================= */

function loadSavedLocation() {

    const savedLocation = readJSON("Women Safety App Location", null);

    if (!savedLocation) {
        return;
    }

    const latitudeElement =
        document.getElementById("latitude");

    const longitudeElement =
        document.getElementById("longitude");

    const accuracyElement =
        document.getElementById("accuracy");

    const updatedTimeElement =
        document.getElementById("updatedTime");

    if (latitudeElement) {

        latitudeElement.textContent =
            Number(savedLocation.latitude)
                .toFixed(6);
    }

    if (longitudeElement) {

        longitudeElement.textContent =
            Number(savedLocation.longitude)
                .toFixed(6);
    }

    if (
        accuracyElement &&
        savedLocation.accuracy !== undefined
    ) {

        accuracyElement.textContent =
            Math.round(savedLocation.accuracy) +
            " meters";
    }

    if (
        updatedTimeElement &&
        savedLocation.updatedAt
    ) {

        updatedTimeElement.textContent =
            new Date(
                savedLocation.updatedAt
            ).toLocaleString();
    }

    /*
     * IMPORTANT:
     * Saved location is displayed only.
     *
     * Map and Share buttons remain disabled
     * until the user gets a FRESH location.
     */
}


/* =========================================
   OPEN GOOGLE MAPS
   ========================================= */

function openMap() {

    if (
        currentLatitude === null ||
        currentLongitude === null
    ) {

        alert(
            "Please get your current location first."
        );

        return;
    }

    const mapURL =
        "https://www.google.com/maps?q=" +
        currentLatitude +
        "," +
        currentLongitude;

    window.open(mapURL, "_blank");
}


/* =========================================
   SHARE LOCATION
   ========================================= */

async function shareLocation() {

    if (
        currentLatitude === null ||
        currentLongitude === null
    ) {

        alert(
            "Please get your current location first."
        );

        return;
    }

    const mapURL =
        "https://www.google.com/maps?q=" +
        currentLatitude +
        "," +
        currentLongitude;

    const shareText =
        "My current location:\n" +
        mapURL;


    /* -------------------------
       MOBILE SHARE
       ------------------------- */

    if (navigator.share) {

        try {

            await navigator.share({

                title:
                    "My Women Safety App Location",

                text:
                    shareText
            });

        }

        catch (error) {

            console.log(
                "Share cancelled."
            );
        }

        return;
    }


    /* -------------------------
       DESKTOP FALLBACK
       ------------------------- */

    try {

        await navigator.clipboard.writeText(
            mapURL
        );

        alert(
            "Location link copied to clipboard."
        );

    }

    catch (error) {

        prompt(
            "Copy this location link:",
            mapURL
        );
    }
}


/* =========================================
   PROFILE
   ========================================= */

// Load profile
function loadProfile() {
    const user = readJSON("Women Safety App User", null) || readJSON("loggedInUser", null);
    if (!user) return;
    // Form inputs use name/email/phone/city; profileName/profileEmail are display labels.
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const cityInput = document.getElementById("city");
    if (nameInput) nameInput.value = user.name || "";
    if (emailInput) emailInput.value = user.email || "";
    if (phoneInput) phoneInput.value = user.phone || "";
    if (cityInput) cityInput.value = user.city || "";
    updateProfileHeader(user);
}


/* =========================================
   SAVE PROFILE
   ========================================= */

function saveProfile(event) {
    if (event) event.preventDefault();
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const cityInput = document.getElementById("city");
    if (!nameInput || !emailInput) {
        alert("Profile form fields were not found. Check IDs: name, email, phone, city.");
        return;
    }
    const previousUser = readJSON("Women Safety App User", {}) || {};
    const name = nameInput.value.trim();
    const email = emailInput.value.trim().toLowerCase();
    const phone = phoneInput ? phoneInput.value.trim().replace(/\D/g, "") : "";
    const city = cityInput ? cityInput.value.trim() : "";
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a name and valid email address."); return;
    }
    if (phone && !/^\d{10,15}$/.test(phone)) {
        alert("Please enter a valid phone number."); return;
    }
    const user = { ...previousUser, name, email, phone, city };
    localStorage.setItem("Women Safety App User", JSON.stringify(user));
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    updateProfileHeader(user);
    alert("Profile updated successfully.");
}


/* =========================================
   UPDATE PROFILE HEADER
   ========================================= */

function updateProfileHeader(user) {
    user = user || readJSON("Women Safety App User", {}) || {};
    const name = String(user.name || "User").trim();
    const email = String(user.email || "");
    const nameElement = document.getElementById("profileName");
    const emailElement = document.getElementById("profileEmail");
    const avatarElement = document.getElementById("profileAvatar");
    if (nameElement) nameElement.textContent = name;
    if (emailElement) emailElement.textContent = email;
    if (avatarElement) avatarElement.textContent = name.charAt(0).toUpperCase() || "U";
}


/* =========================================
   LOCATION ACCESS SETTING
   ========================================= */

function initializeLocationAccess() {
    const setting = document.getElementById("locationSetting") || document.getElementById("locationAccess");
    if (!setting) return;
    const key = "locationAccess";
    const saved = localStorage.getItem(key);
    if (saved === null) {
        setting.checked = true;
        localStorage.setItem(key, "true");
    } else {
        setting.checked = saved === "true";
    }
    setting.addEventListener("change", function() {
        localStorage.setItem(key, setting.checked ? "true" : "false");
    });
}


/* =========================================
   LOGOUT
   ========================================= */

function logoutUser() {
    if (!confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("Women Safety App LoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}


/* =========================================
   PAGE INITIALIZATION
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* -------------------------
           CONTACTS PAGE
           ------------------------- */

        if (
            document.getElementById(
                "contactList"
            )
        ) {

            loadContacts();
        }


        /* -------------------------
           PROFILE PAGE
           ------------------------- */

        if (
            document.getElementById(
                "profileName"
            )
        ) {

            loadProfile();
        }


        /* -------------------------
           LOCATION PAGE
           ------------------------- */

        if (
            document.getElementById(
                "latitude"
            )
        ) {

            loadSavedLocation();

            /*
             * Buttons MUST remain disabled
             * until fresh location is obtained.
             */

            const mapButton =
                document.getElementById(
                    "mapButton"
                );

            const shareButton =
                document.getElementById(
                    "shareButton"
                );

            if (mapButton) {
                mapButton.disabled = true;
            }

            if (shareButton) {
                shareButton.disabled = true;
            }
        }


        /* -------------------------
           LOCATION ACCESS
           ------------------------- */

        initializeLocationAccess();
    }
);

function forgotPassword(event) {
    if (event) event.preventDefault();

    const emailInput = document.getElementById("email");
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

    if (!email) {
        alert("Please enter your registered email first.");
        if (emailInput) emailInput.focus();
        return;
    }

    let user = null;

    try {
        user = JSON.parse(
            localStorage.getItem("Women Safety App User") || "null"
        );
    } catch (error) {
        user = null;
    }

    if (!user || !user.email ||
        user.email.toLowerCase() !== email) {
        alert("This email is not registered on this browser.");
        return;
    }

    const newPassword = prompt(
        "Enter your new password (minimum 6 characters):"
    );

    if (newPassword === null) return;

    if (newPassword.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    const confirmPassword = prompt("Confirm your new password:");

    if (confirmPassword !== newPassword) {
        alert("Passwords do not match.");
        return;
    }

    user.password = newPassword;

    localStorage.setItem(
        "Women Safety App User",
        JSON.stringify(user)
    );

    alert("Password updated successfully! You can now log in.");
}

