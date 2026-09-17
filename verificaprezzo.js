document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 🟢 ZONA MODIFICABILE: ASSOCIAZIONE MODELLI E PREZZI
    // Modifica qui i prezzi associati a ciascun modello della lista HTML
    // =========================================================================
    const CATALOGO_PREZZI = {
        "New Balance 9060": "54",
        "Golden Goose": "72",
        "Versache Chain": "55",
        "Dolce & Gabbana": "70",
        "Zanotti": "80",
        "LV Skate": "90",
        "LV Trainer": "90",
        "McQueen": "60",
        "Yeezy 350": "55",
        "Jordan 4": "55",
        "Dior B23": "65",
    };
    // =========================================================================

    const inputModello = document.getElementById("seleziona-modello");
    const btnVerifica = document.getElementById("btn-verifica");
    const risultatoBox = document.getElementById("risultato-prezzo");

    function mostraPrezzo() {
        const modelloSelezionato = inputModello.value.trim();

        if (CATALOGO_PREZZI[modelloSelezionato]) {
            const prezzo = parseFloat(CATALOGO_PREZZI[modelloSelezionato]).toFixed(2);
            risultatoBox.textContent = `${prezzo} €`;
        } else if (modelloSelezionato === "") {
            risultatoBox.textContent = "SELEZIONA UN MODELLO";
        } else {
            risultatoBox.textContent = "MODELLO NON TROVATO";
        }
    }

    btnVerifica.addEventListener("click", mostraPrezzo);

    // Esegue la verifica anche premendo Invio nella tastiera
    inputModello.addEventListener("keypress", (e) => {
        if (e.key === "Enter") mostraPrezzo();
    });
});