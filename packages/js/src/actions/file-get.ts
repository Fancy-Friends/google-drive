/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/file-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/file-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */

/**
 * Read one file's metadata and its download/view links.
 *
 * GET /drive/v3/files/{fileId} —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Drive or calls the
 * faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_DRIVE } from "../service.js";

export const FILE_GET_OPERATION = "file_get";

export type FileGetOptions = {
  /** The node's resolved config. Keys: fileId. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleDriveFileGet(options: FileGetOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.fileId === undefined || config.fileId === null || config.fileId === "") {
    throw new Error(`file_get: "fileId" is required (File ID).`);
  }

  return callConnector(GOOGLE_DRIVE, {
    operation: FILE_GET_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: `/drive/v3/files/${encodeURIComponent(String(config.fileId))}`,
      query: {
        "fields": "id,name,mimeType,size,parents,modifiedTime,webViewLink,webContentLink",
      },
    },
  });
}
