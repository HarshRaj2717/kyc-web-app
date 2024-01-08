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

async function getCurRowNumber() {
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
  });
  return getRows.data.values.length;
}

export async function setName(formData) {
  await initializeGoogleSheetsApi();
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:K",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [Object.values(formData)],
    },
  });
  return getCurRowNumber();
}

export async function updateCurData(formData, curRowNumber) {
  if (curRowNumber === 0) return;
  await googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: `Sheet1!A${curRowNumber}:K${curRowNumber}`,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [Object.values(formData)],
    },
  });
}
