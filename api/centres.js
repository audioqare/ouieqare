import axios from 'axios';
import getAccessToken from './getAccessToken.js';

const fetchCentres = async (req, res) => {
    const { query } = req.query;
    let criteria = '(Layout.id:equals:6266060000000091029)'; // Pré-filtrage pour les centres

    if (/^\d{2}$/.test(query)) { // Département
        criteria += ` and (D_partement:equals:${query})`;
    } else if (/^\d{5}$/.test(query)) { // Code postal
        criteria += ` and (Code_postal:equals:${query})`;
    } else { // Ville
        criteria += ` and (Ville:equals:${query})`;
    }

    try {
        const accessToken = await getAccessToken();
        const response = await axios.get(`https://www.zohoapis.com/crm/v2/Accounts/search?criteria=${criteria}`, {
            headers: { 'Authorization': `Zoho-oauthtoken ${accessToken}` }
        });
        res.status(200).json(response.data.data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
        res.status(500).send('Erreur serveur interne');
    }
};

export default fetchCentres;
