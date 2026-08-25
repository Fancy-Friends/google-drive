# Google Drive

Google Drive for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/google-drive-ui` | `npm install @particle-academy/google-drive-ui` |
| Node | `@particle-academy/google-drive-js` | `npm install @particle-academy/google-drive-js` |
| PHP 8.4+ | `particle-academy/google-drive-php` | `composer require particle-academy/google-drive-php` |
| Python 3.11+ | `fancy-google-drive` | `pip install fancy-google-drive` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Google Drive SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Google Drive connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | From Google Cloud Console. One value for the whole installation. |
| **OAuth client secret** | per installation | **secret** | The client secret for the same OAuth app. |
| **Access token** | per connected account | **secret** | Per connected Google account; expires after one hour. |
| **Refresh token** | per connected account | **secret** | Per connected Google account; the host uses it to refresh the access token. |

### Authorising

Google Drive uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://accounts.google.com/o/oauth2/v2/auth
- **Token URL** — https://oauth2.googleapis.com/token
- **Scopes** — `https://www.googleapis.com/auth/drive.file`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.

The refresh tokens do **not** rotate: the same one is reusable, so a refresh may safely be retried and may run concurrently. Stated rather than assumed, because the opposite — a provider that spends the token and revokes the grant on a replay — looks identical until it happens.

### The estate

**Google Drive has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> Google Drive has no sandbox. Every folder created in live mode is real; use the faker during development and delete live test folders afterward.

## What it can do

### Actions

#### `folder_create` — Google Drive folder

Create a folder in Google Drive.

`POST /drive/v3/files` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `name` | yes | The folder name. Drive does not require names to be unique within a parent. |
| `parents` | no | Parent folder ids, comma separated. Leave empty to create the folder in My Drive. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Google Drive has a sandbox. Set a
node's mode to `fake` and it returns the shape Google Drive actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/google-drive`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
