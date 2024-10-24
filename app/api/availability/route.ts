import { NextResponse } from "next/server";

const CAL_API_KEY = process.env.NEXT_PUBLIC_CAL_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("dateFrom");
  const endDate = searchParams.get("dateTo");

  try {
    const response = await fetch(
      `https://api.cal.com/v1/availability?apiKey=${CAL_API_KEY}&username=sammarxz&dateFrom=${startDate}&dateTo=${endDate}&eventTypeId=6&timeZone=America/Sao_Paulo`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Falha ao buscar disponibilidade");
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Erro ao buscar disponibilidade" },
      { status: 500 }
    );
  }
}