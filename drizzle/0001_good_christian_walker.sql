CREATE TABLE IF NOT EXISTS "dirs" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"name" varchar(128) NOT NULL,
	"properties" jsonb NOT NULL,
	"parent_dir_id" varchar(128) DEFAULT 'root' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "files" (
	"id" varchar(128) PRIMARY KEY NOT NULL,
	"user_id" varchar(16) NOT NULL,
	"name" varchar(128) NOT NULL,
	"chunk_url_array" text[] NOT NULL,
	"properties" jsonb NOT NULL,
	"parent_dir_id" varchar(128) DEFAULT 'root' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dirs" ADD CONSTRAINT "dirs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dirs" ADD CONSTRAINT "dirs_parent_dir_id_dirs_id_fk" FOREIGN KEY ("parent_dir_id") REFERENCES "dirs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "files" ADD CONSTRAINT "files_parent_dir_id_dirs_id_fk" FOREIGN KEY ("parent_dir_id") REFERENCES "dirs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
