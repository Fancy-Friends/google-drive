# Changelog

All notable changes to `@particle-academy/google-drive-ui`,
`@particle-academy/google-drive-js`, `particle-academy/google-drive-php` and
`fancy-google-drive`.

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
