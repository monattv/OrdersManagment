// Aspetta che la pagina sia completamente caricata
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleziona il bottone e i campi di testo usando le classi e gli ID che hai scelto
    const bottoneAccedi = document.querySelector(".button-confirm");
    const campoUtente = document.getElementById("username");
    const campoPassword = document.getElementById("password");
    const messaggioErrore = document.getElementById("errore");

    // Decidi le credenziali corrette
    const utenteValido = "admin"; "admin2";
    const passwordValida = "1234"; "martino";

    // Ascolta il click sul bottone di conferma
    bottoneAccedi.addEventListener("click", () => {
        // Prende i valori scritti dall'utente
        const utenteInserito = campoUtente.value;
        const passwordInserita = campoPassword.value;

        // Controlla se corrispondono a quelli corretti
        if (utenteInserito === utenteValido && passwordInserita === passwordValida) {
            // Se sono giusti, vai alla pagina home.html
            window.location.href = "home.html";
        } else {
            // Se sono sbagliati, mostra la scritta di errore rossa
            messaggioErrore.style.display = "block";
        }
    });
});
