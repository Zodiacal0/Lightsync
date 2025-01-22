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

    const RecoveryData = async () => {
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

    const estrellas = document.querySelectorAll("#estrella, #estrella2, #estrella3, #estrella4, #estrella5");

    estrellas.forEach((estrella) => {
        estrella.addEventListener("click", () => {
            estrella.style.color = estrella.style.color === 'rgb(212, 183, 13)' ? 'gray' : 'rgb(212, 183, 13)';
        });
    });

    const avatars = document.querySelectorAll("#avatar1, #avatar2, #avatar3, #avatar4, #avatar5");

    avatars.forEach((avatar) => {
        avatar.addEventListener("click", async () => {
            const userData = await getQueryUrlParams();
            const avatarUrl = await recolectUrlAvatar(avatar);
            const userDetails = recollectUserData(avatar.id);
            
            if (!avatarUrl) {
                console.log("Ruta de Avatar no Especificada");
                return;
            }

            console.log(`Ruta de Avatar: ${avatarUrl}`);
            console.log(`Detalles del usuario:`, userDetails);

            try {
                window.location.href = `detalleContacto.html?email=${encodeURIComponent(userData.email)}&password=${encodeURIComponent(userData.password)}&avatar=${encodeURIComponent(avatarUrl)}&name=${encodeURIComponent(userDetails.name)}&emailContact=${encodeURIComponent(userDetails.email)}&phone=${encodeURIComponent(userDetails.phone)}`;
            } catch (error) {
                console.error("Error al redirigir:", error);
            }
        });
    });

    const recolectUrlAvatar = async (avatar) => {
        return avatar.src; 
    };

    const recollectUserData = (avatarId) => {
        const idNumber = avatarId.replace("avatar", "");
        const name = document.getElementById(`name${idNumber}`).textContent.replace("Nombre: ", "") ?? "";
        const email = document.getElementById(`contactMail${idNumber}`).textContent.replace("Correo: ", "") ?? "";
        const phone = document.getElementById(`phone${idNumber}`).textContent.replace("Telefono: ", "") ?? "";

        return { name, email, phone };
    };

    const getQueryUrlParams = async () => {
        const params = new URLSearchParams(window.location.search);
        const email = params.get("email");
        const password = params.get("password");
        return { email, password };
    };




});
