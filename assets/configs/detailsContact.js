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
    
    const avatarButton = document.getElementById("profile");
    const profile = document.getElementById("userProfile");
    const closeProfile = document.querySelector(".close");

    if (avatarButton && profile && closeProfile) {
        avatarButton.addEventListener("click", () => {
            profile.classList.add("open");
            RecoveryData();
            document.body.classList.add("menu-open");
        });

        closeProfile.addEventListener("click", () => {
            profile.classList.remove("open");
            document.body.classList.remove("menu-open");
        });
    } else {
        console.error("Uno o más elementos no se han encontrado en el DOM.");
    }

    const RecoveryData = async () => {
        const userData = await getQueryUrlParams();
        const dateLogin = new Date().toLocaleString();
        console.log(userData);
        document.getElementById("nameUser").textContent = `Correo: ${userData.email}`;
        document.getElementById("date").textContent = `Fecha y hora de inicio de sesión: ${dateLogin}`;
    };

    const getQueryUrlParams = async () => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get("email");
        const password = params.get("password");
        return { email, password };
    };


    const RecoveryDataUContact = async () => {
        const contactData = await getQueryUrlParamsUContact();
        console.log(contactData);
        document.getElementById("name").textContent = `Nombre: ${contactData.name}`;
        document.getElementById("emailContact").textContent = `Correo: ${contactData.email}`;
        document.getElementById("phone").textContent = `Teléfono: ${contactData.phone}`;
        document.getElementById("detail-avatar").src = contactData.avatar;
    };

    const getQueryUrlParamsUContact = async () => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get("name");
        const email = params.get("emailContact");
        const phone = params.get("phone");
        const avatar = params.get("avatar");
        return { name,email, phone , avatar};
    };

    RecoveryDataUContact();
});
