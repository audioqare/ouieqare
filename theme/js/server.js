/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

"use strict";
/*jshint esversion: 8 */

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;


// app.use(express.json());
app.use(express.static('theme'));

app.get('/api/centres', async (req, res) => {
    
  const { Account_Name, Ville, Code_postal } = req.query;
  try {
    const response = await axios.get(`https://www.zohoapis.com/crm/v2/Accounts`, {
      headers: {
        Authorization: `Zoho-oauthtoken ${process.env.ZOHO_TOKEN}`
      },
      params: {
        criteria: `(Ville:equals:${Ville}) and (Code_postal:equals:${Code_postal}) and (Account_Name:equals:${Account_Name})`
      }
    });
    res.json(response.data.data);
  } catch (error) {
    res.status(500).send('Erreur lors de la récupération des données');
  }
});

app.listen(PORT, () => {
  console.log(`Serveur fonctionnant sur le port ${PORT}`);
});


















// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/annuaire', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

// // Rechercher des centres
// app.get('/api/audios', async (req, res) => {
//     const { name, city, postalCode } = req.query;
//     try {
//         const query = {};
//         if (name) query.name = new RegExp(name, 'i');
//         if (city) query.city = new RegExp(city, 'i');
//         if (postalCode) query.postalCode = new RegExp(postalCode, 'i');

//         const audios = await Audio.find(query);
//         res.json(audios);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// app.get('/search', async (req, res) => {
//     const { name, location } = req.query;
//     try {
//         const query = {};
//         if (name) query.name = new RegExp(name, 'i');
//         if (location) query.location = new RegExp(location, 'i');

//         const results = await Audioprothésiste.find(query);
//         res.json(results);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// });


