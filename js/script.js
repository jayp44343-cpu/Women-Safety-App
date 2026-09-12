/* =========================================
   WOMEN SAFETY APP - MAIN JAVASCRIPT
   ========================================= */


/* =========================================
   COMMON FUNCTIONS
   ========================================= */

// Password show / hide
function togglePassword(inputId, iconId) {

    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (!input) return;

    if (input.type === "password") {

        input.type = "text";

        if (icon) {
            icon.textContent = "🙈";
        }

    } else {

        input.type = "password";

        if (icon) {
            icon.textContent = "👁️";
        }
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


    // No trusted contact
    if (contacts.length === 0) {

        alert(
            "Please add at least one trusted contact first."
        );

        return;
    }


    // First trusted contact
    const contact = contacts[0];

    let phone =
        String(contact.phone).replace(/\D/g, "");

    if (phone.length === 10) {
        phone = "91" + phone;
    }


    // Get already saved GPS location
    let latitude = null;
    let longitude = null;

    const savedLocation =
        localStorage.getItem(
            "Women Safety App Location"
        );


    if (savedLocation) {

        try {

            const location =
                JSON.parse(savedLocation);

            latitude =
                location.latitude;

            longitude =
                location.longitude;

        } catch (error) {

            console.log(
                "Saved location error:",
                error
            );
        }
    }


    // SOS message
    let message =
        "🚨 SOS ALERT 🚨\n\n" +
        "I need help. Please contact me immediately.";


    // Add saved location if available
    if (
        latitude !== null &&
        longitude !== null
    ) {

        const mapLink =
            "https://www.google.com/maps?q=" +
            latitude +
            "," +
            longitude;

        message +=
            "\n\n📍 My current location:\n" +
            mapLink;
    }


    // Open WhatsApp immediately
    const whatsappURL =
        "https://wa.me/" +
        phone +
        "?text=" +
        encodeURIComponent(message);

    window.location.href =
        whatsappURL;
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

        alert(
            "Please enter email and password."
        );

        return;
    }


    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "Women Safety App User"
            )
        );


    if (
        savedUser &&
        savedUser.email === email
    ) {

        localStorage.setItem(
            "Women Safety App LoggedIn",
            "true"
        );

        alert(
            "Login successful! Welcome to Women Safety App."
        );

        window.location.href =
            "profile.html";

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

    alert(
        "Demo login successful!"
    );

    window.location.href =
        "profile.html";
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

        alert(
            "Please enter your email address first."
        );

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

        alert(
            "Please fill all required fields."
        );

        return;
    }


    if (!email.includes("@")) {

        alert(
            "Please enter a valid email address."
        );

        return;
    }


    const cleanPhone =
        phone.replace(/\D/g, "");


    if (cleanPhone.length < 10) {

        alert(
            "Please enter a valid phone number."
        );

        return;
    }


    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    if (password !== confirmPassword) {

        alert(
            "Passwords do not match."
        );

        return;
    }


    if (
        termsElement &&
        !termsElement.checked
    ) {

        alert(
            "Please accept the Terms & Conditions."
        );

        return;
    }


    const user = {

        name: name,

        email: email,

        phone: cleanPhone,

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


    window.location.href =
        "login.html";
}


/* =========================================
   TERMS AND CONDITIONS
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


    if (
        name === "" ||
        phone === ""
    ) {

        alert(
            "Please enter contact name and phone number."
        );

        return;
    }


    const cleanPhone =
        phone.replace(/\D/g, "");


    if (cleanPhone.length < 10) {

        alert(
            "Please enter a valid phone number."
        );

        return;
    }


    const contacts =
        JSON.parse(
            localStorage.getItem(
                "Women Safety App Contacts"
            )
        ) || [];


    const newContact = {

        id: Date.now(),

        name: name,

        phone: cleanPhone,

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

    if (relationshipElement) {
        relationshipElement.value = "";
    }


    loadContacts();
}


/* =========================================
   LOAD CONTACTS
   ========================================= */

function loadContacts() {

    const contacts =
        JSON.parse(
            localStorage.getItem(
                "Women Safety App Contacts"
            )
        ) || [];


    const contactList =
        document.getElementById("contactList");

    const contactCount =
        document.getElementById("contactCount");

    const emptyContacts =
        document.getElementById("emptyContacts");


    if (!contactList) {
        return;
    }


    if (contactCount) {

        contactCount.textContent =
            `${contacts.length} Contact${contacts.length !== 1 ? "s" : ""}`;
    }


    if (contacts.length === 0) {

        contactList.innerHTML = "";

        if (emptyContacts) {
            emptyContacts.style.display =
                "block";
        }

        return;
    }


    if (emptyContacts) {
        emptyContacts.style.display =
            "none";
    }


    contactList.innerHTML =
        contacts.map(function (contact) {

            return `
                <div class="contact-item">

                    <div class="contact-info">

                        <h3>
                            ${escapeHTML(contact.name)}
                        </h3>

                        <p>
                            ${escapeHTML(
                                contact.relationship || "Other"
                            )}
                        </p>

                        <p>
                            <i class="fas fa-phone"></i>
                            ${escapeHTML(contact.phone)}
                        </p>

                    </div>

                    <div class="contact-actions">

                        <a
                            href="tel:${encodeURIComponent(contact.phone)}"
                            class="call-btn"
                        >
                            <i class="fas fa-phone"></i>
                            Call
                        </a>

                        <button
                            class="delete-btn"
                            onclick="deleteContact(${contact.id})"
                        >
                            Delete
                        </button>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================================
   DELETE CONTACT
   ========================================= */

function deleteContact(id) {

    const confirmation =
        confirm(
            "Delete this trusted contact?"
        );

    if (!confirmation) {
        return;
    }


    let contacts =
        JSON.parse(
            localStorage.getItem(
                "Women Safety App Contacts"
            )
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
   PREVENT HTML INJECTION
   ========================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =========================================
   LOCATION
   ========================================= */

let currentLatitude = null;

let currentLongitude = null;


/* =========================================
   GET CURRENT LOCATION
   ========================================= */

function getLocation() {

    const status =
        document.getElementById(
            "locationStatus"
        );

    const latitudeElement =
        document.getElementById(
            "latitude"
        );

    const longitudeElement =
        document.getElementById(
            "longitude"
        );

    const accuracyElement =
        document.getElementById(
            "accuracy"
        );

    const updatedElement =
        document.getElementById(
            "updatedTime"
        );

    const locationFound =
        document.getElementById(
            "locationFound"
        );

    const mapButton =
        document.getElementById(
            "mapButton"
        );

    const shareButton =
        document.getElementById(
            "shareButton"
        );


    /* -----------------------------------------
       Keep buttons disabled while loading
       ----------------------------------------- */

    if (mapButton) {
        mapButton.disabled = true;
    }

    if (shareButton) {
        shareButton.disabled = true;
    }


    /* -----------------------------------------
       Check browser support
       ----------------------------------------- */

    if (!navigator.geolocation) {

        showLocationStatus(
            "❌ Geolocation is not supported by your browser.",
            "error"
        );

        return;
    }


    /* -----------------------------------------
       Loading message
       ----------------------------------------- */

    showLocationStatus(
        "📍 Getting your current location...",
        "loading"
    );


    /* -----------------------------------------
       Get GPS location
       ----------------------------------------- */

    navigator.geolocation.getCurrentPosition(

        function (position) {

            /* -----------------------------------------
               Save coordinates
               ----------------------------------------- */

            currentLatitude =
                position.coords.latitude;

            currentLongitude =
                position.coords.longitude;

            const accuracy =
                position.coords.accuracy;

            const now =
                new Date();


            /* -----------------------------------------
               Latitude
               ----------------------------------------- */

            if (latitudeElement) {

                latitudeElement.textContent =
                    currentLatitude.toFixed(6);
            }


            /* -----------------------------------------
               Longitude
               ----------------------------------------- */

            if (longitudeElement) {

                longitudeElement.textContent =
                    currentLongitude.toFixed(6);
            }


            /* -----------------------------------------
               Accuracy
               ----------------------------------------- */

            if (accuracyElement) {

                accuracyElement.textContent =
                    Math.round(accuracy) +
                    " meters";
            }


            /* -----------------------------------------
               Last Updated
               ----------------------------------------- */

            if (updatedElement) {

                updatedElement.textContent =
                    now.toLocaleString(
                        "en-IN",
                        {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: true
                        }
                    );
            }


            /* -----------------------------------------
               Location Found
               ----------------------------------------- */

            if (locationFound) {

                locationFound.style.display =
                    "block";
            }


            /* -----------------------------------------
               ENABLE GOOGLE MAPS
               Only after successful GPS
               ----------------------------------------- */

            if (mapButton) {

                mapButton.disabled =
                    false;
            }


            /* -----------------------------------------
               ENABLE SHARE LOCATION
               Only after successful GPS
               ----------------------------------------- */

            if (shareButton) {

                shareButton.disabled =
                    false;
            }


            /* -----------------------------------------
               Save Location
               ----------------------------------------- */

            localStorage.setItem(

                "Women Safety App Location",

                JSON.stringify({

                    latitude:
                        currentLatitude,

                    longitude:
                        currentLongitude,

                    accuracy:
                        accuracy,

                    updated:
                        now.toISOString()
                })
            );


            /* -----------------------------------------
               Success Message
               ----------------------------------------- */

            showLocationStatus(
                "✅ Location found successfully!",
                "success"
            );

        },


        /* -----------------------------------------
           GPS ERROR
           ----------------------------------------- */

        function (error) {

            let message =
                "❌ Unable to get your location.";


            if (error.code === 1) {

                message =
                    "❌ Location permission was denied. Please allow location access.";

            } else if (error.code === 2) {

                message =
                    "❌ Location information is unavailable.";

            } else if (error.code === 3) {

                message =
                    "❌ Location request timed out. Please try again.";
            }


            /* Keep buttons disabled */

            if (mapButton) {
                mapButton.disabled = true;
            }

            if (shareButton) {
                shareButton.disabled = true;
            }


            showLocationStatus(
                message,
                "error"
            );
        },


        /* -----------------------------------------
           GPS OPTIONS
           ----------------------------------------- */

        {
            enableHighAccuracy: true,
            timeout: 2000,
            maximumAge: 7000
        }
    );
}


/* =========================================
   LOCATION STATUS
   ========================================= */

function showLocationStatus(
    message,
    type
) {

    const status =
        document.getElementById(
            "locationStatus"
        );

    if (!status) {
        return;
    }

    status.innerHTML =
        message;

    status.className =
        "location-status " +
        type;
}


/* =========================================
   ERROR FUNCTION
   ========================================= */

function showError(message) {

    showLocationStatus(
        "❌ " + message,
        "error"
    );
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


    window.open(
        mapURL,
        "_blank"
    );
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


    /* -----------------------------------------
       Native Share
       ----------------------------------------- */

    if (navigator.share) {

        try {

            await navigator.share({

                title:
                    "My Women Safety App Location",

                text:
                    shareText
            });

        } catch (error) {

            console.log(
                "Share cancelled."
            );
        }

        return;
    }


    /* -----------------------------------------
       Clipboard
       ----------------------------------------- */

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        try {

            await navigator.clipboard.writeText(
                mapURL
            );

            alert(
                "📍 Location link copied to clipboard."
            );

        } catch (error) {

            prompt(
                "Copy this location link:",
                mapURL
            );
        }

        return;
    }


    /* -----------------------------------------
       Final fallback
       ----------------------------------------- */

    prompt(
        "Copy this location link:",
        mapURL
    );
}


/* =========================================
   LOAD SAVED LOCATION
   ========================================= */

function loadSavedLocation() {

    const savedLocation =
        localStorage.getItem(
            "Women Safety App Location"
        );


    if (!savedLocation) {
        return;
    }


    try {

        const data =
            JSON.parse(
                savedLocation
            );


        if (
            data.latitude === undefined ||
            data.longitude === undefined
        ) {
            return;
        }


        currentLatitude =
            Number(data.latitude);

        currentLongitude =
            Number(data.longitude);


        /* -----------------------------------------
           Latitude
           ----------------------------------------- */

        const latitudeElement =
            document.getElementById(
                "latitude"
            );


        if (latitudeElement) {

            latitudeElement.textContent =
                currentLatitude.toFixed(6);
        }


        /* -----------------------------------------
           Longitude
           ----------------------------------------- */

        const longitudeElement =
            document.getElementById(
                "longitude"
            );


        if (longitudeElement) {

            longitudeElement.textContent =
                currentLongitude.toFixed(6);
        }


        /* -----------------------------------------
           Accuracy
           ----------------------------------------- */

        const accuracyElement =
            document.getElementById(
                "accuracy"
            );


        if (
            accuracyElement &&
            data.accuracy !== undefined
        ) {

            accuracyElement.textContent =
                Math.round(
                    Number(data.accuracy)
                ) +
                " meters";
        }


        /* -----------------------------------------
           Last Updated
           ----------------------------------------- */

        const updatedElement =
            document.getElementById(
                "updatedTime"
            );


        if (
            updatedElement &&
            data.updated
        ) {

            const savedTime =
                new Date(
                    data.updated
                );


            updatedElement.textContent =
                savedTime.toLocaleString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                    }
                );
        }


        /* -----------------------------------------
           Show saved location information
           ----------------------------------------- */

        const locationFound =
            document.getElementById(
                "locationFound"
            );


        if (locationFound) {

            locationFound.style.display =
                "block";
        }


        /*
         IMPORTANT:
         Do NOT enable Map/Share here.

         They will become enabled only when
         Get Current Location is clicked and
         GPS successfully returns a location.
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


    } catch (error) {

        console.error(
            "Error loading saved location:",
            error
        );
    }
}


/* =========================================
   PROFILE
   ========================================= */


/* Load Profile */

function loadProfile() {

    const savedUser =
        JSON.parse(
            localStorage.getItem(
                "Women Safety App User"
            )
        );


    if (!savedUser) {
        return;
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


    updateProfileHeader(
        savedUser
    );
}


/* Save Profile */

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


    if (
        !nameElement ||
        !emailElement
    ) {
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


    updateProfileHeader(
        user
    );


    alert(
        "Profile updated successfully."
    );
}


/* Update Profile Header */

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


/* Logout */

function logoutUser() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmation) {
        return;
    }


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


        /* -----------------------------------------
           Contacts Page
           ----------------------------------------- */

        if (
            document.getElementById(
                "contactList"
            )
        ) {

            loadContacts();
        }


        /* -----------------------------------------
           Profile Page
           ----------------------------------------- */

        if (
            document.getElementById(
                "profileName"
            )
        ) {

            loadProfile();
        }


        /* -----------------------------------------
           Location Page
           ----------------------------------------- */

        if (
            document.getElementById(
                "latitude"
            ) &&
            document.getElementById(
                "longitude"
            )
        ) {

            loadSavedLocation();
        }

    }
);