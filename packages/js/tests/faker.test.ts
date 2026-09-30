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
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { googleDriveFaker } from "../src/faker.js";

test("file_get fakes the shape Google Drive publishes", () => {
  const config = {};

  const faked = googleDriveFaker("file_get", fakeRequest("google_drive", "file_get", config));

  assert.deepEqual(faked, {
    "kind": "drive#file",
    "id": "1Pdf_fake_738be566ebc3",
    "name": "invoice.pdf",
    "mimeType": "application/pdf",
    "size": "48213",
    "parents": [
      "root"
    ],
    "modifiedTime": "2026-09-25T11:00:00.000Z",
    "webViewLink": "https://drive.google.com/file/d/1Pdf/view",
    "webContentLink": "https://drive.google.com/uc?id=1Pdf&export=download"
  });
});

test("file_list fakes the shape Google Drive publishes", () => {
  const config = {};

  const faked = googleDriveFaker("file_list", fakeRequest("google_drive", "file_list", config));

  assert.deepEqual(faked, {
    "files": [
      {
        "kind": "drive#file",
        "id": "1Doc_fake_0002209ac639",
        "name": "Q3 report",
        "mimeType": "application/vnd.google-apps.document",
        "modifiedTime": "2026-09-28T16:20:00.000Z",
        "webViewLink": "https://docs.google.com/document/d/1Doc/edit"
      },
      {
        "kind": "drive#file",
        "id": "1Pdf_fake_60477aa36d78",
        "name": "invoice.pdf",
        "mimeType": "application/pdf",
        "size": "48213",
        "modifiedTime": "2026-09-25T11:00:00.000Z",
        "webViewLink": "https://drive.google.com/file/d/1Pdf/view"
      }
    ]
  });
});

test("folder_create fakes the shape Google Drive publishes", () => {
  const config = {};

  const faked = googleDriveFaker("folder_create", fakeRequest("google_drive", "folder_create", config));

  assert.deepEqual(faked, {
    "kind": "drive#file",
    "id": "1Folder_fake_bf17a2312165",
    "name": "New folder",
    "mimeType": "application/vnd.google-apps.folder",
    "parents": [
      "root"
    ]
  });
});

test("permission_create fakes the shape Google Drive publishes", () => {
  const config = {};

  const faked = googleDriveFaker("permission_create", fakeRequest("google_drive", "permission_create", config));

  assert.deepEqual(faked, {
    "kind": "drive#permission",
    "id": "perm_fake_05ad8861209f",
    "type": "user",
    "role": "reader",
    "emailAddress": "ada@example.test"
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => googleDriveFaker("no_such_operation", fakeRequest("google_drive", "no_such_operation", {})), /no fake response/);
});
