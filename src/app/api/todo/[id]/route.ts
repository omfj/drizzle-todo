import { db } from "@/db/client";
import { insertTodoSchema, todo } from "@/db/schema/todo";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string(),
  }),
});

export async function DELETE(
  _request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const id = parseInt(params.id);

    await db.delete(todo).where(eq(todo.id, id));

    return NextResponse.json(
      {
        message: "Todo deleted successfully",
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

export async function PATCH(
  request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const id = parseInt(params.id);

    const body = await request.json();
    const validatedBody = insertTodoSchema.pick({ isDone: true }).parse(body);

    await db.update(todo).set(validatedBody).where(eq(todo.id, id));

    return NextResponse.json(
      {
        message: "Todo updated successfully",
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

export async function GET(
  _request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const id = parseInt(params.id);

    const todoItem = await db.select().from(todo).where(eq(todo.id, id));

    return NextResponse.json(todoItem[0], {
      status: 200,
    });
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
