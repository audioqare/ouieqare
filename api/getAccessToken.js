import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import dotenv from 'dotenv';

dotenv.config();

export async function getAccessToken() {
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
      const errorBody = await response.text();
      console.error("API Error Response Body:", errorBody);
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log("Received Access Token:", data.access_token);
    return data.access_token;
  } catch (error) {
    console.error("Error obtaining access token:", error);
    throw error;
  }
}