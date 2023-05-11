import { db } from "@/lib/db/client";
import { country, insertCountrySchema } from "@/lib/db/schemas/country";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const countries = await db
      .select()
      .from(country)
      .orderBy(asc(country.name));

    return NextResponse.json(
      {
        countries,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = insertCountrySchema.parse(body);

    await db.insert(country).values(validatedBody);

    return NextResponse.json(
      {
        message: "Country created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
