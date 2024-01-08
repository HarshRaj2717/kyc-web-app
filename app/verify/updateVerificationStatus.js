"use server";
import { google } from "googleapis";

let auth = null;
let client = null;
let googleSheets = null;
let spreadsheetId = null;

async function initializeGoogleSheetsApi() {
  auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  client = await auth.getClient();
  googleSheets = google.sheets({ version: "v4", auth: client });
  spreadsheetId = process.env.SHEET_ID;
}

export async function updater(rowNumber, updateWhat) {
  decryptedRowNumber = atob(rowNumber);
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
      values: ["YES"],
    },
  });
}
