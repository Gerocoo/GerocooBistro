const form = document.getElementById('form');
const submit = document.getElementById('invia');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    
    const data = {
        nome: formData.get('name'),
        data: formData.get('dataPrenotazione'), // Ora corrisponde al name nell'HTML
        orario: formData.get('time'),
        numero: parseInt(formData.get('guests')), // Converti in numero
        contatti: formData.get('contact'),
        celiachia: formData.get('celiachia') === 'on', // Checkbox restituisce 'on' quando selezionato
        note: formData.get('notes') || '' // Valore di default se vuoto
    };
    
    // Debug: verifica i dati prima dell'invio
    console.log("FormData debug:");
    for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
    
    console.log("Dati inviati: ", data);
    
    // Disabilita il pulsante durante l'invio
    submit.disabled = true;
    submit.textContent = 'Invio in corso...';
    
    try {
        const response = await fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showSuccessPopup();
            form.reset(); // Resetta il form dopo l'invio
        } else {
            showErrorPopup(result.message);
        }
        
    } catch (error) {
        console.log("Errore di rete: ", error);
        showErrorPopup("Errore di connessione. Riprova più tardi.");
    } finally {
        // Riabilita il pulsante
        submit.disabled = false;
        submit.textContent = 'Invia Prenotazione';
    }
});

// Funzione per creare il popup di successo
function showSuccessPopup() {
    // Rimuovi eventuali popup esistenti
    removeExistingPopup();
    
    const popup = document.createElement('div');
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">✓</div>
            <h3>Prenotazione Confermata!</h3>
            <p>Grazie per aver scelto <strong>Gerocoo Bistrot</strong></p>
            
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Animazione di entrata
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
}

// Funzione per creare il popup di errore
function showErrorPopup(message) {
    removeExistingPopup();
    
    const popup = document.createElement('div');
  
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon error">✗</div>
            <h3>Oops! Qualcosa è andato storto</h3>
            <p>${message}</p>
            <button class="popup-btn" onclick="closePopup()">Riprova</button>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
}

// Funzione per chiudere il popup
function closePopup() {
    const popup = document.querySelector('.custom-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => {
            popup.remove();
        }, 300);
    }
}

// Funzione per rimuovere popup esistenti
function removeExistingPopup() {
    const existingPopup = document.querySelector('.custom-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
}