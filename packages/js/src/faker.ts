/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */

/**
 * The Google Drive faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Google Drive actually publishes, so an author can wire {{
 * $json.data.id }} against a fake and have it keep working against the real
 * thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeFileGet({ config, fake }: FakeRequest): unknown {
  return {
    "kind": "drive#file",
    "id": (config.fileId !== undefined && config.fileId !== null && config.fileId !== "" ? String(config.fileId) : fake.id("1Pdf")),
    "name": "invoice.pdf",
    "mimeType": "application/pdf",
    "size": "48213",
    "parents": [
      "root",
    ],
    "modifiedTime": "2026-09-25T11:00:00.000Z",
    "webViewLink": "https://drive.google.com/file/d/1Pdf/view",
    "webContentLink": "https://drive.google.com/uc?id=1Pdf&export=download",
  };
}

function fakeFileList({ config, fake }: FakeRequest): unknown {
  return {
    "files": [
      {
        "kind": "drive#file",
        "id": fake.id("1Doc"),
        "name": "Q3 report",
        "mimeType": "application/vnd.google-apps.document",
        "modifiedTime": "2026-09-28T16:20:00.000Z",
        "webViewLink": "https://docs.google.com/document/d/1Doc/edit",
      },
      {
        "kind": "drive#file",
        "id": fake.id("1Pdf"),
        "name": "invoice.pdf",
        "mimeType": "application/pdf",
        "size": "48213",
        "modifiedTime": "2026-09-25T11:00:00.000Z",
        "webViewLink": "https://drive.google.com/file/d/1Pdf/view",
      },
    ],
  };
}

function fakeFolderCreate({ config, fake }: FakeRequest): unknown {
  return {
    "kind": "drive#file",
    "id": fake.id("1Folder"),
    "name": (config.name !== undefined && config.name !== null && config.name !== "" ? String(config.name) : "New folder"),
    "mimeType": "application/vnd.google-apps.folder",
    "parents": [
      "root",
    ],
  };
}

function fakePermissionCreate({ config, fake }: FakeRequest): unknown {
  return {
    "kind": "drive#permission",
    "id": fake.id("perm"),
    "type": (config.type !== undefined && config.type !== null && config.type !== "" ? String(config.type) : "user"),
    "role": (config.role !== undefined && config.role !== null && config.role !== "" ? String(config.role) : "reader"),
    "emailAddress": (config.emailAddress !== undefined && config.emailAddress !== null && config.emailAddress !== "" ? String(config.emailAddress) : "ada@example.test"),
  };
}

export const googleDriveFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "file_get":
      return fakeFileGet(request);

    case "file_list":
      return fakeFileList(request);

    case "folder_create":
      return fakeFolderCreate(request);

    case "permission_create":
      return fakePermissionCreate(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `google_drive: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
