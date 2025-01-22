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
    
    const inputName = document.getElementById("nombre");
    const inputPhone = document.getElementById("telefono");
    const inputEmail = document.getElementById("email");
    const button = document.getElementById("button1");
    const container = document.getElementById("container2");


    button.addEventListener("click", async() => {
        event.preventDefault();
        const name = inputName.value.trim() ?? "";
        const phone = inputPhone.value.trim() ?? "";
        const email = inputEmail.value.trim() ?? "";

        (name === "" || phone === "" || email === "") 
        ? alert("Todos los campos son obligatorios") :
            await collectData(name,phone,email),
            inputName.value = "",
            inputPhone.value = "",
            inputEmail.value = "";
    });

    const collectData = async(name,phone,email) => {
        (name === "" || phone === "" || email === "") ?  alert("No se pudo agregar el contacto") : console.log(`Datos recolectados: \n Nombre: ${name} \n Telefono: ${phone} \n Email: ${email}`);
        await succesAnimation();
    };

    const succesAnimation = async() => {

        container.style.display = 'flex';
        setTimeout(() => {
            container.style.opacity = '1';
        }, 10);

        setTimeout(() => {
            container.style.opacity = '0';
            setTimeout(() => {
                container.style.display = 'none';
            }, 500);
        }, 5000);
    };
    
});