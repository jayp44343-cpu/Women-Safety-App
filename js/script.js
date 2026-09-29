/* =========================================
   WOMEN SAFETY APP - MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   COMMON FUNCTIONS
   ========================================= */

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

    const contacts =
        JSON.parse(
            localStorage.getItem("Women Safety App Contacts")
        ) || [];

    if (contacts.length === 0) {
        alert("Please add at least one trusted contact first.");
        return;
    }

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    const confirmation = confirm(
        "Are you sure you want to activate the SOS alert?"
    );

    if (!confirmation) return;

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

                setTimeout(function () {
                    window.open(whatsappLink, "_blank");
                }, index * 1500);
            });

            alert(
                "🚨 SOS location is ready.\n\n" +
                "Trusted contacts: " +
                contacts.length +
                "\n\n" +
                "WhatsApp will open the contact chats."
            );
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
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 0
        }
    );
}


/* =========================================
   LOGIN
   ========================================= */

function loginUser(event) {

    if (event) {
        event.preventDefault();
    }

    const emailElement =
        document.getElementById("email");

    const passwordElement =
        document.getElementById("password");

    if (!emailElement || !passwordElement) {
        return;
    }

    const email =
        emailElement.value.trim();

    const password =
        passwordElement.value.trim();

    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    const savedUser =
        JSON.parse(
            localStorage.getItem("Women Safety App User")
        );

    if (savedUser && savedUser.email === email) {

        localStorage.setItem(
            "Women Safety App LoggedIn",
            "true"
        );

        alert(
            "Login successful! Welcome to Women Safety App."
        );

        window.location.href = "profile.html";

    } else {

        alert(
            "User not found.\n\n" +
            "Please signup first or use Demo Login."
        );
    }
}


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

    if (event) {
        event.preventDefault();
    }

    const nameElement =
        document.getElementById("name");

    const emailElement =
        document.getElementById("email");

    const phoneElement =
        document.getElementById("phone");

    const passwordElement =
        document.getElementById("password");

    const confirmPasswordElement =
        document.getElementById("confirmPassword");

    const termsElement =
        document.getElementById("terms");

    if (
        !nameElement ||
        !emailElement ||
        !phoneElement ||
        !passwordElement ||
        !confirmPasswordElement
    ) {
        return;
    }

    const name =
        nameElement.value.trim();

    const email =
        emailElement.value.trim();

    const phone =
        phoneElement.value.trim();

    const password =
        passwordElement.value;

    const confirmPassword =
        confirmPasswordElement.value;

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address.");
        return;
    }

    if (phone.length < 10) {
        alert("Please enter a valid phone number.");
        return;
    }

    if (password.length < 6) {
        alert("Password must contain at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (termsElement && !termsElement.checked) {
        alert("Please accept the Terms & Conditions.");
        return;
    }

    const user = {
        name: name,
        email: email,
        phone: phone,
        city: ""
    };

    localStorage.setItem(
        "Women Safety App User",
        JSON.stringify(user)
    );

    alert(
        "Account created successfully!\n\n" +
        "You can now login."
    );

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

    if (event) {
        event.preventDefault();
    }

    const nameElement =
        document.getElementById("contactName");

    const phoneElement =
        document.getElementById("contactPhone");

    const relationshipElement =
        document.getElementById("relationship");

    if (!nameElement || !phoneElement) {
        return;
    }

    const name =
        nameElement.value.trim();

    const phone =
        phoneElement.value.trim();

    const relationship =
        relationshipElement
            ? relationshipElement.value
            : "Other";

    if (name === "" || phone === "") {
        alert(
            "Please enter contact name and phone number."
        );
        return;
    }

    if (phone.length < 10) {
        alert("Please enter a valid phone number.");
        return;
    }

    const contacts =
        JSON.parse(
            localStorage.getItem("Women Safety App Contacts")
        ) || [];

    // Maximum 5 trusted contacts
    if (contacts.length >= 5) {
        alert(
            "You can save maximum 5 trusted contacts."
        );
        return;
    }

    const newContact = {
        id: Date.now(),
        name: name,
        phone: phone,
        relationship: relationship
    };

    contacts.push(newContact);

    localStorage.setItem(
        "Women Safety App Contacts",
        JSON.stringify(contacts)
    );

    alert(
        "Trusted contact added successfully."
    );

    nameElement.value = "";
    phoneElement.value = "";

    loadContacts();
}


/* =========================================
   LOAD CONTACTS
   ========================================= */

function loadContacts() {

    const contactList =
        document.getElementById("contactList");

    if (!contactList) return;

    const contacts =
        JSON.parse(
            localStorage.getItem("Women Safety App Contacts")
        ) || [];

    if (contacts.length === 0) {

        contactList.innerHTML =
            "<p>No trusted contacts added yet.</p>";

        return;
    }

    contactList.innerHTML = "";

    contacts.forEach(function (contact) {

        const div =
            document.createElement("div");

        div.className = "contact-card";

        div.innerHTML = `
            <div>
                <h3>${escapeHTML(contact.name)}</h3>
                <p>${escapeHTML(contact.relationship)}</p>
                <p>📞 ${escapeHTML(contact.phone)}</p>
            </div>

            <div class="contact-actions">

                <a
                    href="tel:${escapeHTML(contact.phone)}"
                    class="btn"
                >
                    Call
                </a>

                <button
                    class="btn"
                    onclick="deleteContact(${contact.id})"
                >
                    Delete
                </button>

            </div>
        `;

        contactList.appendChild(div);
    });
}


/* =========================================
   DELETE CONTACT
   ========================================= */

function deleteContact(id) {

    const confirmation =
        confirm("Delete this trusted contact?");

    if (!confirmation) return;

    let contacts =
        JSON.parse(
            localStorage.getItem("Women Safety App Contacts")
        ) || [];

    contacts =
        contacts.filter(function (contact) {
            return contact.id !== id;
        });

    localStorage.setItem(
        "Women Safety App Contacts",
        JSON.stringify(contacts)
    );

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

    const savedLocation =
        JSON.parse(
            localStorage.getItem(
                "Women Safety App Location"
            )
        );

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

    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "Women Safety App User"
            )
        );

    if (!savedUser) return;


    const nameElement =
        document.getElementById(
            "profileName"
        );

    const emailElement =
        document.getElementById(
            "profileEmail"
        );

    const phoneElement =
        document.getElementById(
            "profilePhone"
        );

    const cityElement =
        document.getElementById(
            "profileCity"
        );


    if (nameElement) {

        nameElement.value =
            savedUser.name || "";
    }

    if (emailElement) {

        emailElement.value =
            savedUser.email || "";
    }

    if (phoneElement) {

        phoneElement.value =
            savedUser.phone || "";
    }

    if (cityElement) {

        cityElement.value =
            savedUser.city || "";
    }

    updateProfileHeader(savedUser);
}


/* =========================================
   SAVE PROFILE
   ========================================= */

function saveProfile(event) {

    if (event) {
        event.preventDefault();
    }

    const nameElement =
        document.getElementById(
            "profileName"
        );

    const emailElement =
        document.getElementById(
            "profileEmail"
        );

    const phoneElement =
        document.getElementById(
            "profilePhone"
        );

    const cityElement =
        document.getElementById(
            "profileCity"
        );


    if (!nameElement || !emailElement) {
        return;
    }


    const user = {

        name:
            nameElement.value.trim(),

        email:
            emailElement.value.trim(),

        phone:
            phoneElement
                ? phoneElement.value.trim()
                : "",

        city:
            cityElement
                ? cityElement.value.trim()
                : ""
    };


    localStorage.setItem(
        "Women Safety App User",
        JSON.stringify(user)
    );

    updateProfileHeader(user);

    alert(
        "Profile updated successfully."
    );
}


/* =========================================
   UPDATE PROFILE HEADER
   ========================================= */

function updateProfileHeader(user) {

    const profileHeaderName =
        document.getElementById(
            "profileHeaderName"
        );

    if (
        profileHeaderName &&
        user
    ) {

        profileHeaderName.textContent =
            user.name ||
            "Women Safety App User";
    }
}


/* =========================================
   LOCATION ACCESS SETTING
   ========================================= */

function initializeLocationAccess() {

    const locationAccess =
        document.getElementById(
            "locationAccess"
        );

    if (!locationAccess) {
        return;
    }

    const savedSetting =
        localStorage.getItem(
            "locationAccess"
        );


    // Default = ON
    if (savedSetting === null) {

        locationAccess.checked = true;

        localStorage.setItem(
            "locationAccess",
            "true"
        );

    }

    else {

        locationAccess.checked =
            savedSetting === "true";
    }


    // Save changes
    locationAccess.addEventListener(
        "change",
        function () {

            localStorage.setItem(
                "locationAccess",
                locationAccess.checked
                    ? "true"
                    : "false"
            );
        }
    );
}


/* =========================================
   LOGOUT
   ========================================= */

function logoutUser() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );

    if (!confirmation) return;

    localStorage.removeItem(
        "Women Safety App LoggedIn"
    );

    window.location.href =
        "login.html";
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