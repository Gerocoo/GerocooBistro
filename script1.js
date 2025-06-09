const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const PG = require('pg');
const { encrypt } = require('./cripto'); // <-- il tuo modulo crittografia

dotenv.config();
const app = express();
const port = 3000;

const client = new PG.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

client.connect()
  .then(() => console.log("Connessione al DB avvenuta"))
  .catch((err) => console.error("Errore connessione DB:", err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.post('/submit', async (req, res) => {
    const { nome, data, orario, numero, contatti, celiachia, note } = req.body;

    try {
        const query = `
            INSERT INTO datiform (nome_prenotazione, data, ora, numero_persone, n_telefono, celiachia, note) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
        `;

        const values = [
            encrypt(nome),
            data,
            orario,
            numero,
            contatti,
            celiachia || false,
            encrypt(note)
        ];

        const result = await client.query(query, values);

        res.json({
            success: true,
            message: "Prenotazione salvata con successo!",
            data: result.rows[0]
        });

    } catch (err) {
        console.error("Errore durante il salvataggio:", err);
        res.status(500).json({
            success: false,
            message: "Errore durante il salvataggio della prenotazione",
            error: err.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});
