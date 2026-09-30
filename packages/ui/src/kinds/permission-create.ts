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
 * Share a Google Drive file — Grant a user, group, domain, or anyone with the
 * link access to a file.
 *
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/create
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleDriveMeta } from "../service.js";

export const GOOGLE_DRIVE_PERMISSION_CREATE_KIND = "@particle-academy/google_drive_permission_create";
export const GOOGLE_DRIVE_PERMISSION_CREATE_OPERATION = "permission_create";

export const GOOGLE_DRIVE_PERMISSION_CREATE_META = googleDriveMeta("action", "share a file", "https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/create");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_DRIVE_PERMISSION_CREATE_OUTPUT: OutputField[] = [
  {
    "path": "data.id",
    "type": "string",
    "description": "The new permission's id."
  },
  {
    "path": "data.type",
    "type": "string",
    "description": "Echoes what was sent."
  },
  {
    "path": "data.role",
    "type": "string",
    "description": "Echoes what was sent."
  },
  {
    "path": "data.emailAddress",
    "type": "string",
    "description": "Present for a user or group grant."
  },
  {
    "path": "mode",
    "type": "string",
    "description": "Which estate this ran against. Google has no sandbox, so: fake or live."
  }
];

export const googleDrivePermissionCreateKind: NodeKindDefinition = defineConnectorKind(GOOGLE_DRIVE_PERMISSION_CREATE_META, {
  name: GOOGLE_DRIVE_PERMISSION_CREATE_KIND,
  aliases: ["google_drive_permission_create"],
  label: "Share a Google Drive file",
  description: "Grant a user, group, domain, or anyone with the link access to a file.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: GOOGLE_DRIVE_PERMISSION_CREATE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "fileId",
      "label": "File ID",
      "required": true
    },
    {
      "type": "select",
      "key": "type",
      "label": "Grantee type",
      "required": true,
      "default": "user",
      "options": [
        {
          "value": "user",
          "label": "A specific person"
        },
        {
          "value": "group",
          "label": "A Google Group"
        },
        {
          "value": "domain",
          "label": "Everyone in a domain"
        },
        {
          "value": "anyone",
          "label": "Anyone with the link"
        }
      ]
    },
    {
      "type": "select",
      "key": "role",
      "label": "Role",
      "required": true,
      "default": "reader",
      "options": [
        {
          "value": "reader",
          "label": "Reader"
        },
        {
          "value": "commenter",
          "label": "Commenter"
        },
        {
          "value": "writer",
          "label": "Writer"
        }
      ],
      "description": "organizer, fileOrganizer and owner exist in Drive's API but only apply inside a shared drive, which this action does not target."
    },
    {
      "type": "text",
      "key": "emailAddress",
      "label": "Email address",
      "description": "Required when the grantee type is a person or a Google Group. Ignored for domain and anyone."
    },
    {
      "type": "text",
      "key": "domain",
      "label": "Domain",
      "description": "Required when the grantee type is domain, e.g. example.com. Ignored otherwise."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_DRIVE_PERMISSION_CREATE_META, config as Record<string, unknown>, "share a file"),
});
