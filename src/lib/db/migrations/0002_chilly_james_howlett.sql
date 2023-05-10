ALTER TABLE "todo" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;
ALTER TABLE "todo" ADD COLUMN "is_done" boolean DEFAULT false NOT NULL;