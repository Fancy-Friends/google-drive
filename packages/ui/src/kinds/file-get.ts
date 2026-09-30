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
 * Google Drive file — Read one file's metadata and its download/view links.
 *
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleDriveMeta } from "../service.js";

export const GOOGLE_DRIVE_FILE_GET_KIND = "@particle-academy/google_drive_file_get";
export const GOOGLE_DRIVE_FILE_GET_OPERATION = "file_get";

export const GOOGLE_DRIVE_FILE_GET_META = googleDriveMeta("action", "read a file", "https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_DRIVE_FILE_GET_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The file id."
  },
  {
    "path": "data.name",
    "type": "string",
    "description": "The file name."
  },
  {
    "path": "data.mimeType",
    "type": "string",
    "description": "The file's MIME type."
  },
  {
    "path": "data.size",
    "type": "string",
    "description": "Bytes, as a decimal STRING -- Drive's own int64 convention. Absent for Google Workspace editor files (Docs, Sheets, Slides) and for folders."
  },
  {
    "path": "data.parents",
    "type": "array",
    "description": "Parent folder ids. A file has at most one today even though the field stays an array."
  },
  {
    "path": "data.modifiedTime",
    "type": "string",
    "description": "RFC 3339."
  },
  {
    "path": "data.webViewLink",
    "type": "string",
    "description": "Opens the file in its Drive/editor viewer. Requires the viewer to already have access."
  },
  {
    "path": "data.webContentLink",
    "type": "string",
    "description": "A direct download URL for files with binary content. Absent for Google Workspace editor files and folders -- those export instead, which this connector does not yet offer."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleDriveFileGetKind: NodeKindDefinition = defineConnectorKind(GOOGLE_DRIVE_FILE_GET_META, {
  name: GOOGLE_DRIVE_FILE_GET_KIND,
  aliases: ["google_drive_file_get"],
  label: "Google Drive file",
  description: "Read one file's metadata and its download/view links.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_DRIVE_FILE_GET_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "fileId",
      "label": "File ID",
      "required": true,
      "description": "From file_list, or another node's output."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_DRIVE_FILE_GET_META, config as Record<string, unknown>, "read a file"),
});
