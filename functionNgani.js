function playSelectionSound() {
    let sound = document.getElementById("selectingSound");
    sound.currentTime = 0;
    sound.play();
}

document.addEventListener("DOMContentLoaded", function () {
    // Login
    const authContainer = document.querySelector(".login-container");
    const mainContainer = document.querySelector(".main-container");

    const loginBox = document.querySelector(".login-box");
    const registerBox = document.querySelector(".register-box");

    const loginUsername = document.querySelector("#login-username");
    const loginPassword = document.querySelector("#login-password");
    const loginButton = document.querySelector("#login-button");

    const registerUsername = document.querySelector("#register-username");
    const registerPassword = document.querySelector("#register-password");
    const registerID = document.querySelector("#register-id");
    const registerTitle = document.querySelector("#register-title");
    const registerSection = document.querySelector("#register-section");
    const registerButton = document.querySelector("#register-button");

    const showRegister = document.querySelector("#show-register");
    const showLogin = document.querySelector("#show-login");

    const logoutButton = document.querySelector("#logout-button");
    const profileName = document.querySelector(".profile-name");
    const profileID = document.querySelector(".profile-id");
    const profileTitle = document.querySelector(".profile-title");
    const profileSection = document.querySelector(".profile-section");

    const profilePicture = document.querySelector("#profile-picture");
    const profileInput = document.querySelector("#input-file");

    // Menu 
    const playButton = document.querySelector(".menu .play");
    const profileButton = document.querySelector(".menu .profile");
    const settingsButton = document.querySelector(".menu .settings");
    const leaderboardButton = document.querySelector(".menu .leaderboard");
    const creditsButton = document.querySelector(".menu .credits");

    const playMenu = document.querySelector(".playMenu");
    const profileMenu = document.querySelector(".profileMenu");
    const settingsMenu = document.querySelector(".settingsMenu");
    const leaderboardMenu = document.querySelector(".leaderboardMenu");
    const creditsMenu = document.querySelector(".creditsMenu");

    const normalButton = document.getElementById('normal-button');
    const difficultiesMenu = document.querySelector('.difficultiesMenu');
    const languageMenu = document.querySelector('.languageMenu');

    const buttons = [playButton, profileButton, settingsButton, leaderboardButton, creditsButton];
    const menus = [playMenu, profileMenu, settingsMenu, leaderboardMenu, creditsMenu];

    difficultiesMenu.style.display = 'none';
    languageMenu.style.display = 'none';

    normalButton.addEventListener('click', () => {
        languageMenu.style.display = 'block';
    });

    languageMenu.addEventListener('click', () => {
        difficultiesMenu.style.display = 'block';
    });

    //---------------------

    document.querySelectorAll('.languageMenu div').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelector('.languageMenu').style.display = 'none';
        });
    });

    document.querySelector('.play').addEventListener('click', () => {
        document.querySelector('.languageMenu').style.display = 'none';
    });

    const languageOption = document.querySelectorAll('.languageMenu div');
    languageOption.forEach(option => {
        option.addEventListener('click', () => {
            languageMenu.style.display = 'none';
            console.log(`Selected difficulty: ${option.className}`);
        });
    });
    //-----------------
    document.querySelectorAll('.difficultiesMenu div').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelector('.difficultiesMenu').style.display = 'none';
        });
    });

    document.querySelector('.play').addEventListener('click', () => {
        document.querySelector('.difficultiesMenu').style.display = 'none';
    });

    const difficultyOptions = document.querySelectorAll('.difficultiesMenu div');
    difficultyOptions.forEach(option => {
        option.addEventListener('click', () => {
            difficultiesMenu.style.display = 'none';
            console.log(`Selected difficulty: ${option.className}`);
        });
    });

    function toggleMenu(menu, button) {
        const isOpen = menu.classList.toggle("show");
        button.classList.toggle("active", isOpen);
        menus.forEach((m, i) => {
            if (m !== menu) {
                m.classList.remove("show");
                buttons[i].classList.remove("active");
            }
        });
    }

    function closeMenu(menu, button) {
        menu.classList.remove("show");
        button.classList.remove("active");
    }

    buttons.forEach((button, index) => {
        if (button) {
            button.addEventListener("click", function (event) {
                event.stopPropagation();
                toggleMenu(menus[index], button);
            });
        }
    });

    document.addEventListener("click", function (event) {
        menus.forEach((menu, i) => {
            if (!menu.contains(event.target) && !buttons[i].contains(event.target)) {
                closeMenu(menu, buttons[i]);
            }
        });
    });

    // login and register SWITCH NIGGERRRRRRRRRRRRRRR
    showRegister.addEventListener("click", function () {
        loginBox.style.display = "none";
        registerBox.style.display = "block";
    });

    showLogin.addEventListener("click", function () {
        registerBox.style.display = "none";
        loginBox.style.display = "block";
    });

    // new NIGGERRR
    registerButton.addEventListener("click", function () {
        const username = registerUsername.value.trim();
        const password = registerPassword.value.trim();
        const id = registerID.value.trim();
        const title = registerTitle.value;
        const section = registerSection.value;

        if (username === "" || password === "" || id === "") {
            alert("Please fill in all fields.");
            return;
        }

        if (id.length !== 10 || isNaN(id)) {
            alert("ID must be exactly 10 digits.");
            return;
        }

        if (title !== "Student" && title !== "Professor") {
            alert("Invalid title selection.");
            return;
        }

        if (localStorage.getItem(username)) {
            alert("Username already taken!");
            return;
        }

        localStorage.setItem(username, JSON.stringify({ password, id, title, section }));
        alert("Registration successful! You can now log in.");
        registerBox.style.display = "none";
        loginBox.style.display = "block";
    });

    // existing NIGGER
    loginButton.addEventListener("click", function () {
        const username = loginUsername.value.trim();
        const password = loginPassword.value.trim();

        const storedUser = localStorage.getItem(username);
        if (!storedUser) {
            alert("User not found! Please register.");
            return;
        }

        const userData = JSON.parse(storedUser);
        if (userData.password !== password) {
            alert("Incorrect password!");
            return;
        }

        // success login for my NIGGERRRRRRRRRRRR
        localStorage.setItem("loggedInUser", username);
        profileName.textContent = username;
        profileID.textContent = `ID: ${userData.id}`;
        profileTitle.textContent = `Status: ${userData.title}`;
        profileSection.textContent = `${userData.section}`;

        const userProfilePicture = userData.profilePicture || "noprofile.png";
        profilePicture.src = userProfilePicture;

        authContainer.style.display = "none";
        mainContainer.style.display = "block";
    });

    profileInput.addEventListener("change", function () {
        const file = profileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicture.src = e.target.result;

                const loggedInUser = localStorage.getItem("loggedInUser");
                const userData = JSON.parse(localStorage.getItem(loggedInUser));
                userData.profilePicture = e.target.result;
                localStorage.setItem(loggedInUser, JSON.stringify(userData));
            };
            reader.readAsDataURL(file);
        }
    });

    // logout for my NIGGERRRRRRRRRRRRr
    logoutButton.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        authContainer.style.display = "block";
        mainContainer.style.display = "none";
    });

    // auto login if already login for my HOMIES B)
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser));
        profileName.textContent = loggedInUser;
        profileID.textContent = `ID: ${userData.id}`;
        profileTitle.textContent = `Title: ${userData.title}`;
        profileSection.textContent = section;
        
        authContainer.style.display = "none";
        mainContainer.style.display = "block";
    }
});

