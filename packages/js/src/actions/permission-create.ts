/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/permission-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/permission-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */

/**
 * Grant a user, group, domain, or anyone with the link access to a file.
 *
 * POST /drive/v3/files/{fileId}/permissions —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/create
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

export const PERMISSION_CREATE_OPERATION = "permission_create";

export type PermissionCreateOptions = {
  /** The node's resolved config. Keys: fileId, type, role, emailAddress, domain. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleDrivePermissionCreate(options: PermissionCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.fileId === undefined || config.fileId === null || config.fileId === "") {
    throw new Error(`permission_create: "fileId" is required (File ID).`);
  }

  if (config.type === undefined || config.type === null || config.type === "") {
    throw new Error(`permission_create: "type" is required (Grantee type).`);
  }

  if (config.role === undefined || config.role === null || config.role === "") {
    throw new Error(`permission_create: "role" is required (Role).`);
  }

  return callConnector(GOOGLE_DRIVE, {
    operation: PERMISSION_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/drive/v3/files/${encodeURIComponent(String(config.fileId))}/permissions`,
      json: {
        "type": String(config.type),
        "role": String(config.role),
        ...(config.emailAddress !== undefined && config.emailAddress !== null && config.emailAddress !== "" ? { "emailAddress": String(config.emailAddress) } : {}),
        ...(config.domain !== undefined && config.domain !== null && config.domain !== "" ? { "domain": String(config.domain) } : {}),
      },
      query: {
        "sendNotificationEmail": "false",
      },
    },
  });
}
