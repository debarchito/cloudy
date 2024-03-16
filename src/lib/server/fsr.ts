import * as schema from "./schema";
import { generateId } from "lucia";
import { listBuilder } from "./fsr/list";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

/**
 * @description Represents the parameters for a file in the system.
 */
type FileParameters = Omit<
  typeof schema.files.$inferInsert,
  "id" | "createdAt" | "modifiedAt" | "properties"
> & {
  properties: Record<string, string>;
};

/**
 * @description Represents the parameters for a directory in the file system.
 */
type DirParameters = Omit<
  typeof schema.dirs.$inferInsert,
  "id" | "createdAt" | "modifiedAt" | "properties"
> & {
  properties: Record<string, string>;
};

/**
 * @description File System Representation (fsr)
 * @param db - The database instance.
 * @returns Helper functions to operate on the fsr.
 */
export function fsr(db: NodePgDatabase<typeof schema>) {
  return {
    /**
     * @description Creates a file.
     * @param params - The file parameters required to create a file.
     * @returns A Promise of the details of the created file.
     */
    async createFile(params: FileParameters) {
      const id = generateId(128);
      const parentDirId =
        params.parentDirId === "root" ? `root_${params.userId}` : params.parentDirId;
      return db
        .insert(schema.files)
        .values({ ...params, id, parentDirId })
        .returning();
    },

    /**
     * @description Creates a directory.
     * @param params - The directory parameters required to create a directory.
     * @returns A Promise of the details of the created directory.
     */
    async createDir(params: DirParameters) {
      const id = generateId(128);
      const parentDirId =
        params.parentDirId === "root" ? `root_${params.userId}` : params.parentDirId;
      return db
        .insert(schema.dirs)
        .values({ ...params, id, parentDirId })
        .returning();
    },

    /**
     * @description Retrieves the list of directories and files within a specified parent directory for a given user.
     * @param userId - The user ID.
     * @param parentDirId - The parent directory ID.
     * @returns A Promise of the list of directories and files.
     */
    list: listBuilder(db),
  };
}

/**
 * Type signature of fsr.
 */
export type FSR = ReturnType<typeof fsr>;
