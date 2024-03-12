import * as schema from "./schema";
import { nanoid } from "$lib/utils";
import { lsBuilder } from "./fsr/ls";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

/**
 * Represents the parameters for a file in the system.
 */
type FileParameters = Omit<typeof schema.files.$inferInsert, "id" | "createdAt" | "properties"> & {
  properties: Record<string, string>;
};

/**
 * Represents the parameters for a directory in the file system.
 */
type DirParameters = Omit<typeof schema.dirs.$inferInsert, "id" | "createdAt" | "properties"> & {
  properties: Record<string, string>;
};

/**
 * @description File System Representation (fsr)
 * @param db - The database instance.
 * @returns Shell-like methods to operate on the fsr.
 */
export async function fsr(db: NodePgDatabase<typeof schema>) {
  return {
    /**
     * @description Creates a file.
     * @param params - The file parameters required to create a file.
     * @returns A Promise of the details of the created file.
     */
    async touch(params: FileParameters) {
      const id = nanoid(128);
      return db
        .insert(schema.files)
        .values({ ...params, id })
        .returning();
    },

    /**
     * @description Creates a directory.
     * @param params - The directory parameters required to create a directory.
     * @returns A Promise of the details of the created directory.
     */
    async mkdir(params: DirParameters) {
      const id = nanoid(128);
      return db
        .insert(schema.dirs)
        .values({ ...params, id })
        .returning();
    },

    /**
     * @description Retrieves the list of directories and files within a specified parent directory for a given user.
     * @param userId - The user ID.
     * @param parentDirId - The parent directory ID.
     * @returns A Promise of the list of directories and files.
     */
    ls: lsBuilder(db),
  };
}
