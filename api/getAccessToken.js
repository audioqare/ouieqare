require('dotenv').config();
console.log("Refresh Token:", process.env.ZOHO_REFRESH_TOKEN);
console.log("Client ID:", process.env.CLIENT_ID);
console.log("Client Secret:", process.env.CLIENT_SECRET);
console.log("Redirect URI:", process.env.REDIRECT_URL);
// Utilisez des modules natifs ou installez des paquets via npm si nécessaire
const fetch = require('node-fetch');
const URLSearchParams = require('url').URLSearchParams;


module.exports = async () => {
  const params = new URLSearchParams({
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URL,
    grant_type: 'refresh_token',
  });

  try {
    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  }
};
