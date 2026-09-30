/*
 * Google Drive — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { googleDriveFaker } from "@particle-academy/google-drive-js";
import { GOOGLE_DRIVE_KINDS } from "@particle-academy/google-drive-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/google-drive-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "file_get",
    "config": {},
    "expected": {
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
    }
  },
  {
    "operation": "file_list",
    "config": {},
    "expected": {
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
    }
  },
  {
    "operation": "folder_create",
    "config": {},
    "expected": {
      "kind": "drive#file",
      "id": "1Folder_fake_bf17a2312165",
      "name": "New folder",
      "mimeType": "application/vnd.google-apps.folder",
      "parents": [
        "root"
      ]
    }
  },
  {
    "operation": "permission_create",
    "config": {},
    "expected": {
      "kind": "drive#permission",
      "id": "perm_fake_05ad8861209f",
      "type": "user",
      "role": "reader",
      "emailAddress": "ada@example.test"
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = googleDriveFaker(operation, fakeRequest("google_drive", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(GOOGLE_DRIVE_KINDS.length, 4);
for (const kind of GOOGLE_DRIVE_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/google-drive-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
