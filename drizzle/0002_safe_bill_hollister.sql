ALTER TABLE "dirs" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "created_at" timestamp DEFAULT CURRENT_TIMESTAMP;