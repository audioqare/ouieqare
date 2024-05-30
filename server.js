// "use strict";

// require('dotenv').config();

// console.log("Refresh Token:", process.env.ZOHO_REFRESH_TOKEN);
// console.log("Client ID:", process.env.CLIENT_ID);
// console.log("Client Secret:", process.env.CLIENT_SECRET);
// console.log("Redirect URI:", process.env.REDIRECT_URL);


// const express = require('express');
// const axios = require('axios');
// const app = express();
// const PORT = process.env.PORT || 3000;
// const cors = require('cors');

// // Configuration des options CORS
// const allowedOrigins = ['https://www.ouieqare.com', 'http://localhost:3000', 'http://localhost'];
// const corsOptions = {
//     origin: allowedOrigins,
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     preflightContinue: false,
//     optionsSuccessStatus: 204
// };
// app.use(cors(corsOptions));

// app.use(express.static('theme'));

// let accessTokenCache = {
//   value: null,
//   expiry: null,
// };

// const isTokenExpired = () => {
//   // Vérifie si la date actuelle est supérieure à la date d'expiration du token
//   return !accessTokenCache.expiry || new Date() >= accessTokenCache.expiry;
// };

// const getAccessToken = async () => {
//   if (accessTokenCache.value && !isTokenExpired()) {
//       return accessTokenCache.value;
//   }
//   const refreshTokenUrl = `https://accounts.zoho.com/oauth/v2/token`;
//   const params = new URLSearchParams({
//     refresh_token: process.env.ZOHO_REFRESH_TOKEN,
//     client_id: process.env.CLIENT_ID,
//     client_secret: process.env.CLIENT_SECRET,
//     redirect_uri: process.env.REDIRECT_URL,
//     grant_type: 'refresh_token',
//   });

//   try {
//     const response = await fetch(refreshTokenUrl, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: params,
//     });

//     if (!response.ok) {
//       const errorText = await response.text(); // Ou `response.json()` si l'API renvoie du JSON
//       console.error("Error response body:", errorText);
//       throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
//   }
  

//     const data = await response.json();
//     console.log("Access Token:", data.access_token);
//     console.log("API Response:", data); 
//     if (!data.access_token) {
//       console.error("API Response missing access token:", data);
//       throw new Error("Access token is undefined in the API response");
//     }

//     accessTokenCache.value = data.access_token;
//         // Supposons que le token expire dans 1 heure (3600 secondes)
//         // Ajustez selon la durée de vie réelle du token fournie par votre API
//         accessTokenCache.expiry = new Date(new Date().getTime() + (data.expires_in || 3600) * 1000);

//     return data.access_token;
//   } catch (error) {
//     console.error("Error obtaining access token:", error);
//     // Si le fetch échoue, essayez d'imprimer la réponse de l'API pour obtenir plus de détails
//     if (error.response) {
//         console.error(await error.response.text());
//     }
//     throw error;
// }
// };

// // Fonction pour récupérer tous les comptes de Zoho CRM
// async function fetchZohoAccounts() {
//   const accessToken = await getAccessToken();
//   const url = 'https://www.zohoapis.com/crm/v2/Accounts';

//   try {
//     const response = await axios.get(url, {
//       headers: {
//         'Authorization': `Zoho-oauthtoken ${accessToken}`,
//         'Content-Type': 'application/json'
//       }
//     });

//     if (!response.data) {
//       console.error("Error fetching accounts:", response.statusText);
//       throw new Error('Unable to fetch accounts');
//     }

//     return response.data.data; // Cette partie renvoie les comptes récupérés
//   } catch (error) {
//     console.error(`Error fetching accounts:`, error);
//     throw error;
//   }
// }


// app.get('/api/centres', async (req, res) => {
//   const { query } = req.query; // 'query' peut être un code postal ou un département

//   // Déterminez si la requête est pour un département ou un code postal
//   let criteria;
//   if (/^\d{2}$/.test(query)) { // Si c'est un département (ex: '75')
//     criteria = `(D_partement:equals:${query})`;
//   } else if (/^\d{5}$/.test(query)) { // Si c'est un code postal (ex: '75015')
//     criteria = `(Code_postal:equals:${query})`;
//   } else { // Sinon, traiter comme une recherche de ville
//     criteria = `(Ville:equals:${query})`;
//   }

//   // Ajoutons également un filtre pour sélectionner uniquement les comptes avec le layout 'Centre'
//   criteria += ` and (Layout.id:equals:6266060000000091029)`;
//   try {
//     const accessToken = await getAccessToken();
//     const response = await axios.get('https://www.zohoapis.com/crm/v2/Accounts/search', {
//       headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` },
//       params: { criteria }
//     });

//     if (response.data.data) {
//       res.json(response.data.data);
//     } else {
//       res.status(404).send('Aucun centre trouvé.');
//     }
//   } catch (error) {
//     console.error('Erreur lors de la récupération des données', error);
//     res.status(500).send('Erreur serveur interne');
//   }
// });



// //Nouvelle route pour récupérer tous les comptes de Zoho CRM
// //Route API pour récupérer tous les comptes

// // app.get('/api/comptes', async (req, res) => {
// //   try {
// //     const accounts = await fetchZohoAccounts();
// //     res.json(accounts);
// //   } catch (error) {
// //     console.error('Erreur lors de la récupération des comptes', error);
// //     res.status(500).json({ message: 'Erreur lors de la récupération des comptes', error: error.message });
// //   }
// // });

// // app.get('/api/autocomplete', async (req, res) => {
// //   const { term } = req.query;
// //   if (!term) {
// //     return res.status(400).json({ error: 'Recherche requise' });
// //   }

// //   // Simulez une recherche dans votre base de données ou dans un tableau en mémoire
// //   // Ici, on suppose que vous avez une liste des départements et leurs codes
// //   const departements = [
// //     { name: "Paris (75)", code: "75" },
// //     { name: "Hauts-de-Seine (92)", code: "92" },
// //     // Ajoutez d'autres départements
// //   ];

// //   const filtered = departements.filter(dep => dep.code.startsWith(term) || dep.name.toLowerCase().includes(term.toLowerCase()));
// //   res.json(filtered);
// // });


// app.get('/api/departements', async (req, res) => {
//   const { term } = req.query;
//   // Filtrer les départements basés sur 'term'. Pour cet exemple, les départements sont hardcodés.
//   const departements = [
//     { name: "75 Paris", code: "75" },
//     { name: "77 Seine-et-Marne", code: "77" },
//     { name: "78 Yvelines", code: "78" },
//     { name: "13 Marseille", code: "13" },
//     // autres départements
//   ];

//   const filtered = departements.filter(dep => dep.name.toLowerCase().includes(term.toLowerCase()));
//   res.json(filtered);
// });


// app.listen(PORT, () => {
//   console.log(`Serveur fonctionnant sur le port ${PORT}`);
// });
