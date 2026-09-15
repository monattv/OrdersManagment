document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 🟢 ZONA MODIFICABILE: LISTINO PREZZI AUTOMATICI
    // =========================================================================
    const LISTINO_PREZZI = {
        "Pizza Margherita": "6.00",
        "Pizza Diavola": "7.50",
        "Pizza Quattro Formaggi": "8.00",
        "Hamburger e Patatine": "10.00",
        "Coca Cola": "2.50",
        "Acqua Naturale": "1.50",
        "Birra 0.5L": "4.00",
        "Caffè": "1.20"
    };
    // =========================================================================

    const btnAggiungi = document.getElementById("btn-aggiungi");
    const btnSvuota = document.getElementById("btn-svuota");
    const inputNome = document.getElementById("nome-cliente");
    const inputOrdine = document.getElementById("dettagli-ordine");
    const inputQuantita = document.getElementById("quantita-ordine");
    const inputImporto = document.getElementById("importo-ordine");
    const elencoClienti = document.getElementById("elenco-clienti");

    // Elementi statistiche
    const statTotaleGenerale = document.getElementById("stat-totale-generale");
    const statTotaleClienti = document.getElementById("stat-totale-clienti");
    const statTotaleArticoli = document.getElementById("stat-totale-articoli");

    // Struttura dati: Array di oggetti cliente { nome: "Mario", articoli: [{ prodotto, quantita, prezzoUnitario }] }
    let dbOrdini = JSON.parse(localStorage.getItem("db_ordini_dashboard")) || [];

    // Compilazione automatica prezzo unitario
    inputOrdine.addEventListener("input", () => {
        const prod = inputOrdine.value.trim();
        if (LISTINO_PREZZI[prod]) {
            inputImporto.value = LISTINO_PREZZI[prod];
        }
    });

    // Calcola metriche generali dashboard
    function aggiornaStatistiche() {
        let totaleEuro = 0;
        let totaleArticoli = 0;

        dbOrdini.forEach(cliente => {
            cliente.articoli.forEach(art => {
                totaleEuro += art.quantita * art.prezzoUnitario;
                totaleArticoli += art.quantita;
            });
        });

        statTotaleGenerale.textContent = `${totaleEuro.toFixed(2)} €`;
        statTotaleClienti.textContent = dbOrdini.length;
        statTotaleArticoli.textContent = totaleArticoli;
    }

    // Renderizza la dashboard clienti
    function renderDashboard() {
        elencoClienti.innerHTML = "";

        if (dbOrdini.length === 0) {
            elencoClienti.innerHTML = `<p class="empty-msg">Nessun ordine presente in dashboard.</p>`;
            aggiornaStatistiche();
            return;
        }

        dbOrdini.forEach((cliente, cIndex) => {
            const clienteCard = document.createElement("div");
            clienteCard.className = "cliente-card";

            let totaleCliente = 0;
            let listaProdottiHTML = "";

            cliente.articoli.forEach((art, pIndex) => {
                const parziale = art.quantita * art.prezzoUnitario;
                totaleCliente += parziale;

                listaProdottiHTML += `
                    <li class="item-prodotto">
                        <div class="item-info">
                            <strong>${art.quantita}x</strong> ${art.prodotto}
                            <small>(${art.prezzoUnitario.toFixed(2)}€ cad.)</small>
                        </div>
                        <div class="item-actions">
                            <span class="price">${parziale.toFixed(2)}€</span>
                            <button class="btn-del-prod" data-cindex="${cIndex}" data-pindex="${pIndex}">✕</button>
                        </div>
                    </li>
                `;
            });

            clienteCard.innerHTML = `
                <div class="cliente-card-header">
                    <h3>👤 ${cliente.nome}</h3>
                    <button class="btn-del-cliente" data-cindex="${cIndex}">Chiudi Conto</button>
                </div>
                <ul class="articoli-list">
                    ${listaProdottiHTML}
                </ul>
                <div class="cliente-card-footer">
                    <span>Totale Cliente:</span>
                    <strong>${totaleCliente.toFixed(2)} €</strong>
                </div>
            `;

            elencoClienti.appendChild(clienteCard);
        });

        aggiornaStatistiche();
    }

    function salvaEAggiorna() {
        localStorage.setItem("db_ordini_dashboard", JSON.stringify(dbOrdini));
        renderDashboard();
    }

    // Aggiungi un articolo ad un cliente (nuovo o esistente)
    btnAggiungi.addEventListener("click", () => {
        const nome = inputNome.value.trim();
        const prodotto = inputOrdine.value.trim();
        const quantita = parseInt(inputQuantita.value, 10);
        const prezzoUnitario = parseFloat(inputImporto.value);

        if (!nome || !prodotto || isNaN(quantita) || quantita <= 0 || isNaN(prezzoUnitario)) {
            alert("Compila tutti i campi correttamente!");
            return;
        }

        // Cerca se il cliente esiste già (case-insensitive)
        let cliente = dbOrdini.find(c => c.nome.toLowerCase() === nome.toLowerCase());

        if (cliente) {
            // Se il prodotto esiste già per il cliente, somma la quantità
            let prodEsistente = cliente.articoli.find(a => a.prodotto.toLowerCase() === prodotto.toLowerCase());
            if (prodEsistente) {
                prodEsistente.quantita += quantita;
                prodEsistente.prezzoUnitario = prezzoUnitario; // aggiorna il prezzo unitario
            } else {
                cliente.articoli.push({ prodotto, quantita, prezzoUnitario });
            }
        } else {
            // Crea nuovo cliente
            dbOrdini.push({
                nome: nome,
                articoli: [{ prodotto, quantita, prezzoUnitario }]
            });
        }

        salvaEAggiorna();

        // Resetta solo i campi prodotto
        inputOrdine.value = "";
        inputQuantita.value = "1";
        inputImporto.value = "";
        inputOrdine.focus();
    });

    // Delegazione eventi per eliminazioni
    elencoClienti.addEventListener("click", (e) => {
        // Elimina singolo prodotto
        if (e.target.classList.contains("btn-del-prod")) {
            const cIndex = e.target.getAttribute("data-cindex");
            const pIndex = e.target.getAttribute("data-pindex");

            dbOrdini[cIndex].articoli.splice(pIndex, 1);

            // Se il cliente non ha più articoli, rimuovilo
            if (dbOrdini[cIndex].articoli.length === 0) {
                dbOrdini.splice(cIndex, 1);
            }

            salvaEAggiorna();
        }

        // Elimina intero cliente
        if (e.target.classList.contains("btn-del-cliente")) {
            const cIndex = e.target.getAttribute("data-cindex");
            if (confirm(`Vuoi chiudere e cancellare il conto di ${dbOrdini[cIndex].nome}?`)) {
                dbOrdini.splice(cIndex, 1);
                salvaEAggiorna();
            }
        }
    });

    // Svuota intera dashboard
    btnSvuota.addEventListener("click", () => {
        if (dbOrdini.length === 0) return;
        if (confirm("Sei sicuro di voler resettare tutta la dashboard?")) {
            dbOrdini = [];
            salvaEAggiorna();
        }
    });

    // Render iniziale
    renderDashboard();
});