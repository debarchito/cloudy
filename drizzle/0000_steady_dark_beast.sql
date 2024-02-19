CREATE TABLE `sessions` (
	`id` text(16) PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(16) PRIMARY KEY NOT NULL,
	`name` text(128) NOT NULL,
	`password` text NOT NULL
);
