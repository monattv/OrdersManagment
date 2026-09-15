document.addEventListener("DOMContentLoaded", () => {

    // =========================================================================
    // 🟢 ZONA MODIFICABILE: ASSOCIAZIONE MODELLI E PREZZI
    // Modifica qui i prezzi associati a ciascun modello della lista HTML
    // =========================================================================
    const CATALOGO_PREZZI = {
        "Oxford Royal Calfskin (Nero)": "650.00",
        "Derby Suede Heritage (Marrone)": "580.00",
        "Monk Strap Doppia Fibbia (Cognac)": "720.00",
        "Mocassino Velvet Gold Buckle (Nero)": "490.00",
        "Sneaker Leather Minimal (Bianco)": "420.00",
        "Stivaletto Chelsea Python Edition": "1100.00",
        "Pumps Stiletto Silk 105 (Nero)": "790.00",
        "Sandalo Jewel Crystal 90 (Argento)": "950.00"
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