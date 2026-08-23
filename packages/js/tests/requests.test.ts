/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */

/**
 * What Google Drive actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { googleDriveFolderCreate } from "../src/actions/folder-create.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "clientId": "test_clientId",
  "clientSecret": "test_clientSecret",
  "accessToken": "test_accessToken",
  "refreshToken": "test_refreshToken"
};

test("folder_create sends POST /drive/v3/files", async () => {
  const { seen, transport } = capture();

  await googleDriveFolderCreate({
    config: {
      "name": "example-name",
      "parents": "parents-one, parents-two"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/drive/v3/files"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "name": "example-name",
    "parents": [
      "parents-one",
      "parents-two"
    ],
    "mimeType": "application/vnd.google-apps.folder"
  });
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await googleDriveFolderCreate({
    config: {
      "name": "example-name",
      "parents": "parents-one, parents-two"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen[0]!.headers.Authorization, "Bearer test_accessToken");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    googleDriveFolderCreate({
      config: {
        "parents": "parents-one, parents-two"
      },
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("name"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
