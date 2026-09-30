/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/file-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/file-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */

/**
 * List files this app created (or the user explicitly opened) in Google Drive.
 * Under the drive.file scope this connector uses, a file created by any other
 * app or picked up in the Drive UI directly never appears here.
 *
 * GET /drive/v3/files —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list
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

export const FILE_LIST_OPERATION = "file_list";

export type FileListOptions = {
  /** The node's resolved config. Keys: q, pageSize, pageToken, orderBy. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleDriveFileList(options: FileListOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  {
    const n = Number(config.pageSize);
    const given = config.pageSize !== undefined && config.pageSize !== null && config.pageSize !== "";
    if (given && !(Number.isInteger(n) && n >= 1 && n <= 1000)) {
      throw new Error(
        `file_list: "pageSize" must be a integer, got ${JSON.stringify(config.pageSize)}.`,
      );
    }
  }

  return callConnector(GOOGLE_DRIVE, {
    operation: FILE_LIST_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: "/drive/v3/files",
      query: {
        ...(config.q !== undefined && config.q !== null && config.q !== "" ? { "q": String(config.q) } : {}),
        "pageSize": config.pageSize !== undefined && config.pageSize !== null && config.pageSize !== "" ? Math.trunc(Number(config.pageSize)) : 100,
        ...(config.pageToken !== undefined && config.pageToken !== null && config.pageToken !== "" ? { "pageToken": String(config.pageToken) } : {}),
        ...(config.orderBy !== undefined && config.orderBy !== null && config.orderBy !== "" ? { "orderBy": String(config.orderBy) } : {}),
        "fields": "files(id,name,mimeType,size,modifiedTime,webViewLink),nextPageToken",
      },
    },
  });
}
