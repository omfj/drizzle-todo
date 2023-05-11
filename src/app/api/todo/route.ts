import { db } from "@/db/client";
import { insertTodoSchema, todo } from "@/db/schema/todo";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const todos = await db.select().from(todo).orderBy(desc(todo.createdAt));

    return NextResponse.json(
      {
        todos,
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
    const validatedBody = insertTodoSchema.parse(body);

    await db.insert(todo).values(validatedBody);

    return NextResponse.json(
      {
        message: "Todo created successfully",
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
