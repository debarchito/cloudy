import { sql } from "drizzle-orm";
import * as schema from "$lib/server/schema";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

/**
 * @description Represents the return type of the `ls` function.
 */
type LsReturn = {
  size?: number;
  dirs?: {
    id: string;
    name: string;
    properties: Record<string, string>;
    created_at: string;
  }[];
  files?: {
    id: string;
    name: string;
    chunk_url_array: string[];
    properties: Record<string, string>;
    created_at: string;
  }[];
};

/**
 * @description Builds the `ls` function that retrieves the list of directories and files within a specified parent directory for a given user.
 * @param db - The database instance.
 * @returns A function that accepts the `userId` and `parentDirId` (`root` is default), and returns a Promise of the list of directories and files.
 */
export function lsBuilder(db: NodePgDatabase<typeof schema>) {
  return async function (userId: string, parentDirId = "root") {
    parentDirId = parentDirId === "root" ? `root_${userId}` : parentDirId;
    return db.execute<LsReturn>(
      await sql`
      SELECT
        jsonb_build_object(
          'dirs',
          jsonb_agg(jsonb_build_object(
            'id', directory_id,
            'name', directory_name,
            'properties', directory_properties,
            'created_at', directory_created_at,
            modified_at', directory_modified_at,
            'size', directory_size
          ))
          FILTER (WHERE directory_name IS NOT NULL),
          'files',
          jsonb_agg(jsonb_build_object(
            'id', file_id,
            'name', file_name,
            'properties', file_properties,
            'chunk_urls', file_chunk_urls,
            'created_at', file_created_at,
            'modified_at', file_modified_at,
            'size', file_size
          ))
          FILTER (WHERE file_name IS NOT NULL)
          'size',
          (
            SELECT size
            FROM dirs
            WHERE id = ${parentDirId}
          )
        ) AS result
        FROM (
          SELECT
            d.id AS directory_id,
            d.name AS directory_name,
            d.properties AS directory_properties,
            d.created_at AS directory_created_at,
            d.modified_at AS directory_modified_at,
            d.size AS directory_size,
            null AS file_id,
            null AS file_name,
            null AS file_properties,
            null AS file_chunk_urls,
            null AS file_created_at,
            null AS file_modified_at,
            null AS file_size
          FROM
            dirs d
          WHERE
            d.parent_dir_id = ${parentDirId}
            AND d.id != 'root'
            AND d.user_id = ${userId}
            UNION ALL
          SELECT
            null AS directory_id,
            null AS directory_name,
            null AS directory_properties,
            null AS directory_created_at,
            null AS directory_modified_at,
            null AS directory_size,
            f.id AS file_id,
            f.name AS file_name,
            f.properties AS file_properties,
            f.chunk_urls AS file_chunk_urls,
            f.created_at AS file_created_at,
            f.modified_at AS file_modified_at,
            f.size AS file_size
          FROM
            files f
            WHERE
            f.parent_dir_id = ${parentDirId}
            AND f.user_id = ${userId}
      ) AS combined_results`,
    );
  };
}
