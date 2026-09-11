# Changelog

All notable changes to `@particle-academy/google-drive-ui`,
`@particle-academy/google-drive-js`, `particle-academy/google-drive-php` and
`fancy-google-drive`.

## [0.3.3] — 2026-09-11

### Added

- **`fancy-flow-php` executors for every node.** `src/Flow/` carries one `#[FlowNode]` class per action and trigger, and `GoogleDriveFlow::EXECUTORS` lists them.

A Laravel host running fancy-flow-php could show this connector's nodes in its editor and could not run them: `particle-academy/google-drive-php` shipped the request builders and no executor. Each one is the PHP twin of the executor in `@particle-academy/google-drive-js` — the same kind, the same request, the same value on `out` — and an unsafe-to-replay action derives its idempotency key from the run and the node, so a retried durable run sends the key it sent the first time.

Register them by adding `vendor/particle-academy/google-drive-php/packages/php/src/Flow` to `config('fancy-flow.discover')`. `particle-academy/fancy-flow-php` is SUGGESTED, not required, and conflicts outside `>=0.51.0 <2.0`, the range the executors were tested under. Nothing outside `Flow\` needs it.

### Fixed

- **Fake mode through `ConnectorClient` threw.** `GoogleDrive::descriptor()` handed the connector core its faker as `GoogleDriveFaker::respond(...)`, which takes `($operation, $request)`; the core calls a faker `($operation, $config, $fake, $input)`. So `$config` arrived as `$request` and every fake call died on "Call to a member function … on null". The descriptor now translates between the two. Calling `GoogleDriveFaker::respond()` directly — what this package's own tests do, which is why they never saw it — is unchanged.

## [0.3.2] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it.
`npm view @particle-academy/google-drive-ui@0.3.2` shows the attestation; releases before
this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.3.1.

- **`repository.directory` in the npm packages.**

`@particle-academy/google-drive-ui` and `@particle-academy/google-drive-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

## [0.3.1] — 2026-08-24

### Fixed

- **`@particle-academy/google-drive-js` now accepts a RANGE of `@particle-academy/google-drive-ui`, not one exact version.**

It peer-depended on `@particle-academy/google-drive-ui` at exactly the release it shipped with. That is the
strict form of the thing the kit's own rule forbids — a first-party sibling gets
a range — and the same block applied the rule correctly to its other two
dependencies. It was this one pair that slipped.

What it cost: ship `@particle-academy/google-drive-ui` with a fixed help string and every consumer on the
previous `@particle-academy/google-drive-js` had an **unmet peer**, which npm 7+ errors on. A documentation
patch could not be delivered without a matching runtime release, and a routine
`npm update` that moved the ui package alone broke the install.

The coupling is real and is not being loosened away. The ui package emits the
config schema and the js package implements against it, so a ui that adds a
field to a js that ignores it is silently wrong. But a PATCH is non-additive by
definition and a MINOR is where a field can appear — so `>=0.3.1 <0.4.0` is the
coupling that actually exists rather than the strictest one expressible.

Nothing else changed. `particle-academy/google-drive-php` and `fancy-google-drive` are unaffected; neither has an
equivalent edge.

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
[0.3.1]: https://github.com/Fancy-Friends/google-drive/releases/tag/v0.3.1
