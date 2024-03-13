ALTER TABLE "dirs" ALTER COLUMN "parent_dir_id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "files" ALTER COLUMN "parent_dir_id" DROP DEFAULT;