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
 * List Google Drive files — List files this app created (or the user
 * explicitly opened) in Google Drive. Under the drive.file scope this
 * connector uses, a file created by any other app or picked up in the Drive UI
 * directly never appears here.
 *
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleDriveMeta } from "../service.js";

export const GOOGLE_DRIVE_FILE_LIST_KIND = "@particle-academy/google_drive_file_list";
export const GOOGLE_DRIVE_FILE_LIST_OPERATION = "file_list";

export const GOOGLE_DRIVE_FILE_LIST_META = googleDriveMeta("action", "list files", "https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_DRIVE_FILE_LIST_OUTPUT: OutputField[] = [
  {
    "path": "data.files",
    "type": "array",
    "description": "id, name, mimeType, size, modifiedTime, webViewLink per file -- leaner than file_get's projection. Read one file directly with file_get for parents and webContentLink."
  },
  {
    "path": "data.nextPageToken",
    "type": "string",
    "description": "Present when there is another page."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleDriveFileListKind: NodeKindDefinition = defineConnectorKind(GOOGLE_DRIVE_FILE_LIST_META, {
  name: GOOGLE_DRIVE_FILE_LIST_KIND,
  aliases: ["google_drive_file_list"],
  label: "List Google Drive files",
  description: "List files this app created (or the user explicitly opened) in Google Drive. Under the drive.file scope this connector uses, a file created by any other app or picked up in the Drive UI directly never appears here.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_DRIVE_FILE_LIST_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "q",
      "label": "Search query",
      "description": "Drive's query syntax, e.g. \"mimeType='application/pdf' and trashed=false\". Leave blank to list everything this app can see."
    },
    {
      "type": "number",
      "key": "pageSize",
      "label": "Page size",
      "min": 1,
      "max": 1000,
      "default": 100,
      "description": "Files per page. Drive's maximum is 1000."
    },
    {
      "type": "text",
      "key": "pageToken",
      "label": "Page token",
      "description": "From a previous page's nextPageToken."
    },
    {
      "type": "text",
      "key": "orderBy",
      "label": "Order by",
      "description": "A comma-separated list of Drive sort keys, e.g. \"modifiedTime desc\". Leave blank for Drive's default order."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_DRIVE_FILE_LIST_META, config as Record<string, unknown>, "list files"),
});
