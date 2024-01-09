"use server";
import { google } from "googleapis";

let auth = null;
let client = null;
let googleSheets = null;
let spreadsheetId = null;

async function initializeGoogleSheetsApi() {
  const credentials = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
    universe_domain: process.env.universe_domain,
  };
  auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  client = await auth.getClient();
  googleSheets = google.sheets({ version: "v4", auth: client });
  spreadsheetId = process.env.SHEET_ID;
}

export async function updater(rowNumber, updateWhat) {
  const decryptedRowNumber = atob(rowNumber);
  const columnMapping = {
    email: "H",
    number: "I",
    college_email: "J",
  };
  await initializeGoogleSheetsApi();
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `Sheet1!${columnMapping[updateWhat]}${decryptedRowNumber}:${columnMapping[updateWhat]}${decryptedRowNumber}`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [["YES"]],
    },
  });
}
