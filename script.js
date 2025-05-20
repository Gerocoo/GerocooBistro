window.addEventListener('DOMContentLoaded', () => {
  const oggi = new Date();
  const anno = oggi.getFullYear();
  const mese = String(oggi.getMonth() + 1).padStart(2, '0');
  const giorno = String(oggi.getDate()).padStart(2, '0');
  const domenica = giorno.domenica;
  const dataOggi = `${anno}-${mese}-${giorno}`;
  const input = document.getElementById('dataPrenotazione');
  input.min = dataOggi;


});

function myFunction() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

document.addEventListener('DOMContentLoaded', function () {
  new Flickity('.carousel', {
    cellAlign: 'left',
    contain: true,
    wrapAround: true,
    autoPlay: 3000,
    pauseAutoPlayOnHover: true,
    prevNextButtons: false,
    pageDots: false,
  });
});

let prova = document.querySelector(".form").addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(prova);
  const datiPrenotazione = {
    nome: document.getElementById("name").value,
    data: document.getElementById("dataPrenotazione").value,
    ora: document.getElementById("time").value,
    numeroPersone: document.getElementById("guests").value,
    recapito: document.getElementById("contact").value,
    celiaco: document.getElementById("celiachia").checked,
    note: document.getElementById("notes").value
  };

  alert("Dati prenotazione:\n" + JSON.stringify(datiPrenotazione, null, 2));
});

const toggleButton = document.getElementById('toggle-theme');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark-mode');
  toggleButton.textContent = '☀️';
}

toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

  toggleButton.textContent = isDark ? '☀️' : '🌙';
});


const patterns = {
  name: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,50}$/,  // Nomi con lettere, inclusi caratteri accentati, min 3 max 50
  contact: /^(\+?[0-9\s]{8,15})$/  // Solo telefono, come richiesto nel placeholder
};

// Campo in giallo durante la digitazione, verde se valido, rosso se non valido
function setupValidation() {
  // Aggiungi stili CSS al documento
  const styleEl = document.createElement('style');
  styleEl.textContent = validationStyles;
  document.head.appendChild(styleEl);

  // Lista dei campi da validare
  const fields = ['name', 'contact'];

  fields.forEach(field => {
    const input = document.getElementById(field);
    if (!input) return; // Salta se l'elemento non esiste

    // Evento focus - bordo giallo quando si inizia a digitare
    input.addEventListener('focus', function () {
      this.classList.remove('valid', 'invalid');
    });

    // Evento input - validazione durante la digitazione e aggiornamento stato pulsante
    input.addEventListener('input', function () {
      // Aggiorna stato pulsante dopo breve ritardo
      setTimeout(validateForm, 100);
    });

    // Evento blur - validazione quando si esce dal campo
    input.addEventListener('blur', function () {
      validateField(this, field);
      validateForm(); // Aggiorna stato pulsante
    });
  });

  // Applica la validazione iniziale a tutti i campi
  fields.forEach(field => {
    const input = document.getElementById(field);
    if (input) validateField(input, field);
  });

  // Verifica iniziale del form
  validateForm();
}

// CSS per personalizzare gli stili di validazione
const validationStyles = `
  input:focus, textarea:focus {
    border-color: #ffcc00 !important; /* Giallo durante digitazione */
    border-width: 2px !important;
    outline: none;
  }
  
  input.valid, textarea.valid {
    border-color: #4CAF50 !important; /* Verde per valido */
    border-width: 2px !important;
  }
  
  input.invalid, textarea.invalid {
    border-color: #F44336 !important; /* Rosso per invalido */
    border-width: 2px !important;
  }
`;

// Funzione per validare un singolo campo
function validateField(input, fieldName) {
  // Se il campo è vuoto, reimposta lo stile
  if (!input.value) {
    input.classList.remove('valid', 'invalid');
    return;
  }

  // Verifica la validità usando la regex corrispondente
  const isValid = patterns[fieldName].test(input.value);

  // Imposta le classi in base alla validità
  if (isValid) {
    input.classList.add('valid');
    input.classList.remove('invalid');
  } else {
    input.classList.add('invalid');
    input.classList.remove('valid');
  }
}

// Funzione per validare l'intero form prima dell'invio
function validateForm() {
  let isValid = true;
  const submitButton = document.querySelector('button[type="submit"]');

  // Valida tutti i campi
  Object.keys(patterns).forEach(field => {
    const input = document.getElementById(field);
    if (!input) return;

    validateField(input, field);

    // Se un campo richiesto non è valido, il form non è valido
    if (input.hasAttribute('required') &&
      (!input.value || !patterns[field].test(input.value))) {
      isValid = false;
    }
  });

  // Abilita/disabilita il pulsante di submit in base alla validità
  if (submitButton) {
    submitButton.disabled = !isValid;
    submitButton.style.opacity = isValid ? '1' : '0.5';
    submitButton.style.cursor = isValid ? 'pointer' : 'not-allowed';
  }

  return isValid;
}

// Aggiungi la funzione di validazione quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function () {
  setupValidation();

  // Aggiungi validazione al form
  const form = document.querySelector('form.form');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Impedisci l'invio se la validazione fallisce
      if (!validateForm()) {
        e.preventDefault();
        alert('Per favore, correggi i campi evidenziati in rosso prima di inviare.');
      }
    });
  }
});

document.querySelectorAll('#offcanvasMenu .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const offcanvasEl = document.querySelector('#offcanvasMenu');
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl) || new bootstrap.Offcanvas(offcanvasEl);
      offcanvas.hide();
    });
  });

document.addEventListener('DOMContentLoaded', function () {
  const menuModal = document.getElementById('menuModal');
  const menuLinks = menuModal.querySelectorAll('.nav-link');

  menuLinks.forEach(link => {
    
    link.addEventListener('click', () => {

      const modal = bootstrap.Modal.getInstance(menuModal) || new bootstrap.Modal(menuModal);
      modal.hide();


      document.body.classList.remove('modal-open');
      const backdrops = document.querySelectorAll('.modal-backdrop');
      backdrops.forEach(b => b.remove());
      document.body.style.removeProperty('padding-right');
      bsOffcanvas.hide();
    });
  });
});

let lastScrollTop = 0;
const navbar = document.querySelector('.topnav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > lastScrollTop) {
    // Scroll in giù → nascondi
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.3s ease-out';
  } else {
    // Scroll in su → mostra
    navbar.style.transform = 'translateY(0)';
    navbar.style.transition = 'transform 0.3s ease-out';
  }

  lastScrollTop = currentScroll;
});