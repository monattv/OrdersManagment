document.addEventListener("DOMContentLoaded", () => {
    const bottoneAccedi = document.querySelector(".button-confirm");
    const campoUtente = document.getElementById("username");
    const campoPassword = document.getElementById("password");
    const messaggioErrore = document.getElementById("errore");

    // Crea un "oggetto" con gli utenti e le rispettive password
    const credenzialiValide = {
        "s": "444",
        "admin": "ste"
    };

    bottoneAccedi.addEventListener("click", () => {
        const utenteInserito = campoUtente.value;
        const passwordInserita = campoPassword.value;

        // Controlla se l'utente esiste nell'oggetto e se la password corrisponde
        if (credenzialiValide[utenteInserito] && credenzialiValide[utenteInserito] === passwordInserita) {
            window.location.href = "home.html";
        } else {
            messaggioErrore.style.display = "block";
        }
    });
});