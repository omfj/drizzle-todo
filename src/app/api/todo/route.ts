import { db } from "@/db/client";
import { insertTodoSchema, todos } from "@/db/schema/todos";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const rows = await db.select().from(todos).orderBy(desc(todos.createdAt));

    return NextResponse.json(rows, {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedBody = insertTodoSchema.parse(body);

    await db.insert(todos).values(validatedBody);

    return new Response("Success!", { status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, {
      status: 500,
    });
  }
}
