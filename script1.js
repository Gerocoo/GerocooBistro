// const PG = require('pg');
// require('dotenv').config();
// const express = require('express');
// const path = require('path');
// const app = express();
// const port = 3000;

// const client = new PG.Client({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT
// });

// app.use(express.urlencoded({extended: true}))
// //Gestisce il json non come una semplice stringa
// app.use(express.json());
// //Passa al path della chiamata la cartella che contiene tutto
// app.use(express.static(path.join(__dirname)));
 
// app.get('/', (req, res) => {
//   res.sendFile(__dirname, "index.html");
// })

// app.post('/submit', async (req, res) => {

//   let {nome, data, orario, numero, contatti, celiachia,note} = req.body;
//   console.log("Dati ricevuti: ", req.body);
// });

// client
//      .connect()
//      .then(() => {
//         console.log("Connessione al DB avvenuta con successo");

//         console.log("Il dato è: ", typeof nome);
//         //client.query("INSERT INTO datiform (nome_prenotazione, data, ora, numero_persone, n_telefono, celiachia, note) VALUES (`"req.body[$name]"`, `'2025-06-01', '19:30', 4, '3331234567', true, 'Tavolo vicino alla finestra') RETURNING *",
//       client.query(`INSERT INTO dati_form (nome_prenotazione, data, ora, numero_persone, n_telefono, celiachia, note) VALUES ('${nome}', ${data}, ${orario}, ${numero}, ${contatti}, ${celiachia}, '${note}') RETURNING *`, (err, result) => {
//       (err, result) => {                                                                                                                             
//         console.log("sono qui");
//       if (err) {
//         console.log("Errore: ", err);
//       } else {
//         console.log("Risultato: ", result.rows);
//       }
//       client
//         .end()
//         .then(() => {
//           console.log("Connessione al DB interrotta");
//         })
//         .catch((err) => {
//           console.log("Errore alla chiusura della connessione ", err)
//         });
//     }});
 
//   })
//   .catch((err) => {
//     console.log("C'è un errore: " + err);
//   });


//   app.listen(port,() => {
//   console.log("Port: " + port);
// })

  
// function SELECT(table, quantity) {
//   return `SELECT ${quantity} FROM ${table}`;
// }
// function INSERT(table, values, column_names) {
//   return `INSERT INTO ${table} (${column_names}) VALUES (${values}) RETURNING *`;
// }
// function DELETE(table) {
//   return `DROP TABLE ${table}`;
// }
// function EDIT(table, toChange, changed, comparison, c_value ) {
//   return `UPDATE ${table}
//           SET ${toChange} = '${changed}'
//           WHERE ${comparison} = ${c_value}`
// }
const PG = require('pg');
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

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

// Route per la homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Route per gestire le prenotazioni
app.post('/submit', async (req, res) => {
    let {nome, data, orario, numero, contatti, celiachia, note} = req.body;
    console.log("Dati ricevuti: ", req.body);
    
    try {
        // Query con parametri preparati per evitare SQL injection
        const query = `
            INSERT INTO datiform (nome_prenotazione, data, ora, numero_persone, n_telefono, celiachia, note) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *
        `;
        
        const values = [nome, data, orario, numero, contatti, celiachia || false, note];
        const result = await client.query(query, values);
        console.log("Prenotazione salvata: ", result.rows[0]);
        
        // Risposta di successo al client
        res.json({ 
            success: true, 
            message: "Prenotazione salvata con successo!",
            data: result.rows[0]
        });
        client
      .end()
       .then(() => {
       console.log("Connessione al DB interrotta");
     })
             .catch((err) => {
         console.log("Errore alla chiusura della connessione ", err)
      });
        
    } catch (err) {
        console.log("Errore durante l'inserimento: ", err);
        
        // Risposta di errore al client
        res.status(500).json({ 
            success: false, 
            message: "Errore durante il salvataggio della prenotazione",
            error: err.message
        });
         
//     }});
 
//   })
    }
});

// Avvio del server
app.listen(port, () => {
    console.log("Server avviato sulla porta: " + port);
});

// Gestione della chiusura dell'applicazione
