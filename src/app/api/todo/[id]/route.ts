import { db } from "@/db/client";
import { insertTodoSchema, todos } from "@/db/schema/todos";
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

    await db.delete(todos).where(eq(todos.id, id));

    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(error, {
      status: 500,
    });
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

    await db.update(todos).set(validatedBody).where(eq(todos.id, id));

    return new Response("Success!", {
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

export async function GET(
  _request: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);
    const id = parseInt(params.id);

    const row = await db.select().from(todos).where(eq(todos.id, id));

    return NextResponse.json(row[0], {
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
