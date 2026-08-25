# Changelog

All notable changes to `@particle-academy/google-drive-ui`,
`@particle-academy/google-drive-js`, `particle-academy/google-drive-php` and
`fancy-google-drive`.

## [0.3.0] — 2026-08-24

### Added

- **The README now says how to SET THIS CONNECTOR UP**, in the package itself.

Until now it explained what the four packages are, what they cost and why the
repo is generated — and said nothing about credentials, scopes, sandboxes or
operations. Somebody who installed it could not learn from it which credentials
a connection needs, where a human GETS them, which scopes to request, or what
the connector can actually do. All of that was already in the definition; the
one document a consumer reads was the one that omitted everything actionable.

The new **Setting it up** section carries:

- every credential, with the text saying where the value comes from, whether it
  is **per installation** or **per connected account**, and whether it is secret;
- the OAuth authorize and token URLs and the exact scopes, verbatim;
- the access-token lifetime, and where refresh tokens ROTATE, the two things a
  host must not do — retry a failed refresh, or refresh concurrently — because a
  replay revokes the entire grant and nothing in the failure says why;
- the estate in this provider's own terms, including the cases where a
  successful-looking run reaches nobody, or reaches the real one;
- every action and trigger with its method, path, inputs, and whether it is safe
  to replay;
- a trigger's provider-side setup, which nobody can derive from anything else.

It is **generated from `provider/manifest.json`**, so it cannot drift from what
the packages do — which is the point at a few hundred providers, where a
hand-written setup section is a few hundred documents going quietly stale.

No code changed. This release exists because a registry and an installing agent
read the PUBLISHED artifact, and the artifact carried the old README.

## [0.2.0] — 2026-08-24

### Changed

- **`@particle-academy/google-drive-ui` is now an OPTIONAL PEER dependency of `@particle-academy/google-drive-js`, not a hard one.**

`./flow` needs it; nothing else does. It was a hard dependency, and because
`@particle-academy/google-drive-ui` itself peer-depends on `fancy-flow` — which npm 7+ installs
automatically — `npm install @particle-academy/google-drive-js` pulled the **entire flow engine**
onto disk for a consumer who only wanted to call the API. Roughly **18 MB
became 874 KB**, and the package works exactly as before:

```js
import { googleDrive… } from "@particle-academy/google-drive-js";
// an injected transport, no flow engine anywhere
```

**This is breaking if you use `@particle-academy/google-drive-js/flow`.** Add `@particle-academy/google-drive-ui` to your own
dependencies — it was always being installed for you, and now it is declared.
Everything importing only the main entry point is unaffected.

The fix is on this edge rather than on `@particle-academy/google-drive-ui` → `fancy-flow`: the ui package
genuinely requires fancy-flow, since it calls `defineConnectorKind`, and marking
that peer optional would be a lie about what it needs.

## [0.1.0] — 2026-08-23

First release.

### Added

- `folder_create` — create a metadata-only Google Drive folder with a name and
  optional parent folder id. `POST /drive/v3/files`.
- A top-level `File` faker for development without touching a real Drive.

### Narrow access, honest replay behavior

The connector requests `drive.file`, the narrowest scope accepted by
`files.create`. It can manage files this app creates, not arbitrary pre-existing
Drive files. Google has no Drive sandbox and exposes no idempotency key, so live
tests create real folders and retries can create duplicates.

[0.1.0]: https://github.com/Fancy-Friends/google-drive/releases/tag/v0.1.0
[0.2.0]: https://github.com/Fancy-Friends/google-drive/releases/tag/v0.2.0
[0.3.0]: https://github.com/Fancy-Friends/google-drive/releases/tag/v0.3.0
