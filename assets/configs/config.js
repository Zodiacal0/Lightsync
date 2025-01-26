document.addEventListener("DOMContentLoaded", () => {
    const emailInput1 = document.getElementById("inputEmail1");
    const button1 = document.getElementById("button1");

    button1.addEventListener("click", async() =>{
        const emailValue1 = emailInput1.value.trim() ?? " ";
        if(emailValue1){
            try{
                await collectData(emailValue1);
                emailInput1.value = "";
            }catch(error){
                console.log(error);
            }
        };
    });

    const collectData = async (email) =>{
        console.log(`Correo registrado ${email}`);
    };

    const nameInputContact = document.getElementById("name");
    const emailInputContact = document.getElementById("email-contact");
    const messageInputContact = document.getElementById("message");
    const buttonContact = document.getElementById("submit-contact");

    buttonContact.addEventListener("click", async() =>{
        const nameContactValue = nameInputContact.value.trim() ?? " ";
        const emailContactValue = emailInputContact.value.trim() ?? " ";
        const messageContactValue = messageInputContact.value.trim() ?? " ";

        if(!nameContactValue || !emailContactValue || !messageContactValue){
            console.log("Por favor rellene todos los campos")
            return
        }
        
        try{
            await collectDataContact(nameContactValue,emailContactValue,messageContactValue);
            nameInputContact.value = "";
            emailInputContact.value = "";
            messageInputContact.value = "";
        }catch(error){
            console.log("Error al recolectar los Datos del contacto");
        };
        
    });

    const collectDataContact = async(nameContact,email,message) =>{
        console.log(`Datos del Contacto Registrado: \n Nombre: ${nameContact} \n Correo Electronico: ${email} \n Mensaje: ${message}`);
    };

    const loginButton = document.getElementById("loginButton");
    const loginMenu = document.getElementById("loginMenu");
    const closeButton = document.querySelector(".close");

    
    loginButton.addEventListener("click", () => {
        loginMenu.style.display = "block"; 
        document.body.classList.add("menu-open"); 
    });

    closeButton.addEventListener("click", () => {
        loginMenu.style.display = "none";
        document.body.classList.remove("menu-open"); 
    });

    window.addEventListener("click", (event) => {
        if (event.target === loginMenu) {
            loginMenu.style.display = "none";
            document.body.classList.remove("menu-open");
        }
    });

    const emailInputLogin = document.getElementById("emailLogin");
    const passwordInputLogin = document.getElementById("passwordLogin");
    const buttonLogin = document.getElementById("buttonMenuLogin");

    buttonLogin.addEventListener("click", async() =>{
        const emailValueLogin = emailInputLogin.value.trim() ?? " ";
        const passwordValueLogin = passwordInputLogin.value.trim() ?? " ";
        
        if(emailValueLogin,passwordValueLogin){
            try{
                await loginSucces(emailValueLogin,passwordValueLogin);
                emailInputLogin.value = "";
                passwordInputLogin.value = "";
                //Metodo para mantener los datos ingresados sin persistencia
                window.location.href = `pages/contactos.html?email=${encodeURIComponent(emailValueLogin)}&password=${encodeURIComponent(passwordValueLogin)}`;
            }catch(error){
                console.log("No se pudo recolectar los datos correctamente")
            }
        }
    });



    const loginSucces = async(emailLogin,password) =>{
        await RecolectServerStatus();
        console.log(`Ha iniciado Sesión el usuario exitosamente, datos: \n Correo: ${emailLogin} \n Contraseña: ${password}`);
    };

    const RecolectServerStatus = async() =>{
        try{
            const result = await simulateServerRequest();
            console.log(result)
        }catch(error){
            console.log("Los datos no pudieron ser enviados")
            throw error;
        }
    }

    const simulateServerRequest = async () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isSuccess = Math.random() > 0.05;
                if (isSuccess) {
                    resolve("Solicitud del servidor aceptada");
                } else {
                    reject("Solicitud del servidor denegada");
                }
            }, 1000); 
        });
    };

});

