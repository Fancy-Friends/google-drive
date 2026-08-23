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
 * Google Drive folder — Create a folder in Google Drive.
 *
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleDriveMeta } from "../service.js";

export const GOOGLE_DRIVE_FOLDER_KIND = "@particle-academy/google_drive_folder";
export const GOOGLE_DRIVE_FOLDER_OPERATION = "folder_create";

export const GOOGLE_DRIVE_FOLDER_META = googleDriveMeta("action", "create a folder", "https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_DRIVE_FOLDER_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The created folder's id."
  },
  {
    "path": "data.name",
    "type": "string",
    "description": "The folder name Google stored."
  },
  {
    "path": "data.mimeType",
    "type": "string",
    "description": "The fixed Google Drive folder MIME type."
  },
  {
    "path": "data.parents",
    "type": "array",
    "description": "The parent folder id array returned by Drive."
  }
];

export const googleDriveFolderKind: NodeKindDefinition = defineConnectorKind(GOOGLE_DRIVE_FOLDER_META, {
  name: GOOGLE_DRIVE_FOLDER_KIND,
  aliases: ["google_drive_folder"],
  label: "Google Drive folder",
  description: "Create a folder in Google Drive.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: GOOGLE_DRIVE_FOLDER_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "name",
      "label": "Folder name",
      "required": true,
      "description": "The folder name. Drive does not require names to be unique within a parent."
    },
    {
      "type": "text",
      "key": "parents",
      "label": "Parent folder IDs",
      "description": "Parent folder ids, comma separated. Leave empty to create the folder in My Drive."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_DRIVE_FOLDER_META, config as Record<string, unknown>, "create a folder"),
});
