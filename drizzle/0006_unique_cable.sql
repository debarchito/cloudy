ALTER TABLE "dirs" ADD COLUMN "modified_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;--> statement-breakpoint
ALTER TABLE "files" ADD COLUMN "modified_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL;