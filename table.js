
const PG = require('pg');
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3010;

const client = new PG.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

// Middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Connessione al database all'avvio del server
client.connect()
    .then(() => {
        console.log("Connessione al DB avvenuta con successo");
    })
    .catch((err) => {
        console.log("Errore connessione DB: " + err);
    });

    app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index_admin.html"));
});
// Route per RECUPERARE i dati delle prenotazioni (per DataTables)
app.get('/dati-prenotazioni', async (req, res) => {
    try {
        const query = 'SELECT * FROM datiform ORDER BY data DESC, ora DESC';
        const result = await client.query(query);
        
        // Trasforma i dati nel formato atteso dal frontend
        const datiFormattati = result.rows.map(row => ({
            nome: row.nome_prenotazione,
            data: row.data,
            orario: row.ora,
            numero: row.numero_persone,
            contatti: row.n_telefono,
            celiachia: row.celiachia ? 'Sì' : 'No',
            note: row.note || ''
        }));
        
        res.json(datiFormattati);
        
    } catch (err) {
        console.log("Errore durante il recupero dati: ", err);
        res.status(500).json({
            error: "Errore durante il recupero delle prenotazioni"
        });
    }
});

// Avvio del server
app.listen(port, () => {
    console.log("Server avviato sulla porta: " + port);
});



// Gestione della chiusura dell'applicazione
process.on('SIGINT', () => {
    client.end()
        .then(() => {
            console.log("Connessione al DB chiusa");
            process.exit(0);
        })
        .catch((err) => {
            console.log("Errore alla chiusura della connessione: ", err);
            process.exit(1);
        });
});


