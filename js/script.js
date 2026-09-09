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

    const confirmation = confirm(
        "Are you sure you want to activate the SOS alert?"
    );

    if (!confirmation) return;

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const mapLink =
                "https://www.google.com/maps?q=" +
                latitude +
                "," +
                longitude;

            const contacts =
                JSON.parse(localStorage.getItem("Women Safety App Contacts")) || [];

            // Save last SOS information
            localStorage.setItem(
                "lastSOS",
                JSON.stringify({
                    latitude: latitude,
                    longitude: longitude,
                    time: new Date().toLocaleString()
                })
            );

            alert(
                "🚨 SOS ACTIVATED!\n\n" +
                "Your current location:\n" +
                mapLink +
                "\n\n" +
                "Trusted contacts saved: " +
                contacts.length +
                "\n\n" +
                "This is a frontend demonstration."
            );
        },

        function () {
            alert(
                "Unable to get your location.\n" +
                "Please allow location permission and try again."
            );
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

    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if (!emailElement || !passwordElement) return;

    const email = emailElement.value.trim();
    const password = passwordElement.value.trim();

    if (email === "" || password === "") {
        alert("Please enter email and password.");
        return;
    }

    const savedUser =
        JSON.parse(localStorage.getItem("Women Safety App User"));

    if (savedUser && savedUser.email === email) {

        localStorage.setItem("Women Safety App LoggedIn", "true");

        alert("Login successful! Welcome to Women Safety App.");

        window.location.href = "profile.html";

    } else {

        alert(
            "User not found.\n\n" +
            "Please signup first or use Demo Login."
        );
    }
}


// Demo login
function demoLogin() {

    localStorage.setItem("Women Safety App LoggedIn", "true");

    alert("Demo login successful!");

    window.location.href = "profile.html";
}


// Forgot password
function forgotPassword(event) {

    if (event) {
        event.preventDefault();
    }

    const emailElement = document.getElementById("email");

    if (!emailElement) return;

    const email = emailElement.value.trim();

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

    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const phoneElement = document.getElementById("phone");
    const passwordElement = document.getElementById("password");
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

    const name = nameElement.value.trim();
    const email = emailElement.value.trim();
    const phone = phoneElement.value.trim();
    const password = passwordElement.value;
    const confirmPassword = confirmPasswordElement.value;

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


// Terms and conditions
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

    const nameElement = document.getElementById("contactName");
    const phoneElement = document.getElementById("contactPhone");
    const relationshipElement =
        document.getElementById("relationship");

    if (!nameElement || !phoneElement) return;

    const name = nameElement.value.trim();
    const phone = phoneElement.value.trim();

    const relationship =
        relationshipElement
            ? relationshipElement.value
            : "Other";

    if (name === "" || phone === "") {
        alert("Please enter contact name and phone number.");
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

    alert("Trusted contact added successfully.");

    nameElement.value = "";
    phoneElement.value = "";

    loadContacts();
}


// Load contacts
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

        const div = document.createElement("div");

        div.className = "contact-card";

        div.innerHTML = `
            <div>
                <h3>${escapeHTML(contact.name)}</h3>
                <p>${escapeHTML(contact.relationship)}</p>
                <p>📞 ${escapeHTML(contact.phone)}</p>
            </div>

            <div class="contact-actions">
                <a href="tel:${escapeHTML(contact.phone)}"
                   class="btn">
                   Call
                </a>

                <button
                    class="btn"
                    onclick="deleteContact(${contact.id})">
                    Delete
                </button>
            </div>
        `;

        contactList.appendChild(div);
    });
}


// Delete contact
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


// Prevent HTML injection
function escapeHTML(value) {

    if (value === null || value === undefined) {
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


// Get current location
function getLocation() {

    const loading =
        document.getElementById("loading");

    const locationDetails =
        document.getElementById("locationDetails");

    if (!navigator.geolocation) {

        showError(
            "Geolocation is not supported by your browser."
        );

        return;
    }

    if (loading) {
        loading.style.display = "block";
    }

    if (locationDetails) {
        locationDetails.style.display = "none";
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            currentLatitude =
                position.coords.latitude;

            currentLongitude =
                position.coords.longitude;

            const accuracy =
                position.coords.accuracy;

            const latitudeElement =
                document.getElementById("latitude");

            const longitudeElement =
                document.getElementById("longitude");

            const accuracyElement =
                document.getElementById("accuracy");

            const updatedElement =
                document.getElementById("updated");

            if (latitudeElement) {
                latitudeElement.textContent =
                    currentLatitude.toFixed(6);
            }

            if (longitudeElement) {
                longitudeElement.textContent =
                    currentLongitude.toFixed(6);
            }

            if (accuracyElement) {
                accuracyElement.textContent =
                    Math.round(accuracy) + " meters";
            }

            if (updatedElement) {
                updatedElement.textContent =
                    new Date().toLocaleString();
            }

            if (loading) {
                loading.style.display = "none";
            }

            if (locationDetails) {
                locationDetails.style.display = "block";
            }

            // Save location
            localStorage.setItem(
                "Women Safety App Location",
                JSON.stringify({
                    latitude: currentLatitude,
                    longitude: currentLongitude,
                    accuracy: accuracy,
                    updated: new Date().toLocaleString()
                })
            );
        },

        function (error) {

            if (loading) {
                loading.style.display = "none";
            }

            let message =
                "Unable to get your location.";

            if (error.code === 1) {
                message =
                    "Location permission was denied.";
            }

            if (error.code === 2) {
                message =
                    "Location information is unavailable.";
            }

            if (error.code === 3) {
                message =
                    "Location request timed out.";
            }

            showError(message);
        }
    );
}


// Location error
function showError(message) {

    const errorElement =
        document.getElementById("errorMessage");

    if (errorElement) {

        errorElement.textContent = message;

        errorElement.style.display = "block";

    } else {

        alert(message);
    }
}


// Open Google Maps
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


// Share location
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

    if (navigator.share) {

        try {

            await navigator.share({
                title: "My Women Safety App Location",
                text: shareText
            });

        } catch (error) {

            console.log("Share cancelled.");
        }

    } else {

        try {

            await navigator.clipboard.writeText(
                mapURL
            );

            alert(
                "Location link copied to clipboard."
            );

        } catch (error) {

            prompt(
                "Copy this location link:",
                mapURL
            );
        }
    }
}


/* =========================================
   PROFILE
   ========================================= */

// Load profile
function loadProfile() {

    const savedUser =
        JSON.parse(
            localStorage.getItem("Women Safety App User")
        );

    if (!savedUser) return;

    const nameElement =
        document.getElementById("profileName");

    const emailElement =
        document.getElementById("profileEmail");

    const phoneElement =
        document.getElementById("profilePhone");

    const cityElement =
        document.getElementById("profileCity");

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


// Update profile
function saveProfile(event) {

    if (event) {
        event.preventDefault();
    }

    const nameElement =
        document.getElementById("profileName");

    const emailElement =
        document.getElementById("profileEmail");

    const phoneElement =
        document.getElementById("profilePhone");

    const cityElement =
        document.getElementById("profileCity");

    if (!nameElement || !emailElement) return;

    const user = {
        name: nameElement.value.trim(),
        email: emailElement.value.trim(),
        phone: phoneElement
            ? phoneElement.value.trim()
            : "",
        city: cityElement
            ? cityElement.value.trim()
            : ""
    };

    localStorage.setItem(
        "Women Safety App User",
        JSON.stringify(user)
    );

    updateProfileHeader(user);

    alert("Profile updated successfully.");
}


// Update profile header
function updateProfileHeader(user) {

    const profileHeaderName =
        document.getElementById(
            "profileHeaderName"
        );

    if (profileHeaderName && user) {

        profileHeaderName.textContent =
            user.name || "Women Safety App User";
    }
}


// Logout
function logoutUser() {

    const confirmation =
        confirm("Are you sure you want to logout?");

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

        // Contacts page
        if (
            document.getElementById("contactList")
        ) {
            loadContacts();
        }

        // Profile page
        if (
            document.getElementById("profileName")
        ) {
            loadProfile();
        }

    }
);
function activateSOS() {

    const contacts =
        JSON.parse(localStorage.getItem("Women Safety App Contacts")) || [];

    if (contacts.length === 0) {
        alert("Pehle trusted contacts add karo.");
        return;
    }

    if (!navigator.geolocation) {
        alert("GPS location supported nahi hai.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const locationLink =
                "https://www.google.com/maps?q=" +
                latitude + "," + longitude;

            const message =
                "🚨 SOS ALERT 🚨\n\n" +
                "Mujhe help chahiye.\n" +
                "Meri current location:\n" +
                locationLink;

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
                "SOS location " +
                contacts.length +
                " contacts ke liye ready hai."
            );

        },

        function (error) {

            if (error.code === 1) {
                alert("Location permission denied.");
            } else if (error.code === 2) {
                alert("Location unavailable.");
            } else if (error.code === 3) {
                alert("Location request timed out.");
            } else {
                alert("Location nahi mil rahi.");
            }

        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}