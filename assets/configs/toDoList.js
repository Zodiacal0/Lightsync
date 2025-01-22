document.addEventListener("DOMContentLoaded", () => {
    const addContact = document.getElementById("addContact");
    const favorites = document.getElementById("favorites");
    const contacts = document.getElementById("contacts");
    const toDo = document.getElementById("toDo");


    addContact.addEventListener("click", async () => {
        const userData = await getQueryUrlParams();
        console.log(userData);
        window.location.href = `agregarContacto.html?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}`;
    });

    favorites.addEventListener("click", async () => {
        const userData = await getQueryUrlParams();
        console.log(userData);
        window.location.href = `favoritos.html?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}`;
    });

    contacts.addEventListener("click", async () => {
        const userData = await getQueryUrlParams();
        console.log(userData);
        window.location.href = `contactos.html?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}`;
    });

    toDo.addEventListener("click", async () => {
        const userData = await getQueryUrlParams();
        console.log(userData);
        window.location.href = `toDoList.html?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}`;
    });

    const getQueryUrlParams = async() =>{ //Metodo para recuperar datos sin persistencia
        const params = new URLSearchParams(window.location.search);
        const email = params.get("email");
        const password = params.get("password");
        return {email, password};
    };

    const RecoveryData = async() =>{
        const userData = await getQueryUrlParams();
        const dateLogin = new Date().toLocaleString();
        console.log(userData);
        document.getElementById("nameUser").textContent = `Correo: ${userData.email}`;
        document.getElementById("date").textContent = `Fecha y hora de inicio de sesión: ${dateLogin}`;

    };

    const avatarButton = document.getElementById("profile");
    const profile = document.getElementById("userProfile");
    const closeProfile = document.querySelector(".close");

    avatarButton.addEventListener("click", () => {
        profile.classList.add("open");
        RecoveryData();
        document.body.classList.add("menu-open");
    });

    closeProfile.addEventListener("click", () => {
        profile.classList.remove("open");
        document.body.classList.remove("menu-open");
    });

    window.addEventListener("click", (event) => {
        if (event.target === profile) {
            profile.classList.remove("open");
            document.body.classList.remove("menu-open");
        }
    });
});