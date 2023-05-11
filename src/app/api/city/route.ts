import { db } from "@/lib/db/client";
import { city, insertCitySchema } from "@/lib/db/schemas/city";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = insertCitySchema.parse(body);

    await db.insert(city).values(validatedBody);

    return NextResponse.json(
      {
        message: "City created successfully",
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
