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

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => googleDriveFaker("no_such_operation", fakeRequest("google_drive", "no_such_operation", {})), /no fake response/);
});
