/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/folder-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/folder-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */

/**
 * Create a folder in Google Drive.
 *
 * POST /drive/v3/files —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Drive or calls the
 * faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_DRIVE } from "../service.js";

export const FOLDER_CREATE_OPERATION = "folder_create";

export type FolderCreateOptions = {
  /** The node's resolved config. Keys: name, parents. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleDriveFolderCreate(options: FolderCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.name === undefined || config.name === null || config.name === "") {
    throw new Error(`folder_create: "name" is required (Folder name).`);
  }

  return callConnector(GOOGLE_DRIVE, {
    operation: FOLDER_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/drive/v3/files",
      json: {
        "name": String(config.name),
        ...(config.parents !== undefined && config.parents !== null && config.parents !== "" ? { "parents": parentsList(config.parents) } : {}),
        "mimeType": "application/vnd.google-apps.folder",
      },
    },
  });
}

/** One value, a ","-separated string, or an array — all end up a list. */
function parentsList(value: unknown): string[] {
  const items = Array.isArray(value)
    ? value.map(String)
    : typeof value === "string"
      ? value.split(",")
      : [];

  return items.map((item) => item.trim()).filter(Boolean);
}
