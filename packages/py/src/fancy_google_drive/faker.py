# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- google_drive

"""The Google Drive faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _as_number(value: Any) -> float | None:
    """The coercion an `"as": "integer" | "number"` config binding uses: a value
    that IS a number, never int(float(...))'s uncaught ValueError on one that
    merely looks like text (a text field's auto-generated example, before an
    author has typed a real one).
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _file_get(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "kind": "drive#file",
        "id": (
            str(_v)
            if (_v := config.get("fileId")) is not None and _v != ""
            else fake.id("1Pdf")
        ),
        "name": "invoice.pdf",
        "mimeType": "application/pdf",
        "size": "48213",
        "parents": [
            "root",
        ],
        "modifiedTime": "2026-09-25T11:00:00.000Z",
        "webViewLink": "https://drive.google.com/file/d/1Pdf/view",
        "webContentLink": "https://drive.google.com/uc?id=1Pdf&export=download",
    }


def _file_list(config: dict[str, Any], fake: FakeValues) -> Any:
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
    }


def _folder_create(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "kind": "drive#file",
        "id": fake.id("1Folder"),
        "name": (
            str(_v)
            if (_v := config.get("name")) is not None and _v != ""
            else "New folder"
        ),
        "mimeType": "application/vnd.google-apps.folder",
        "parents": [
            "root",
        ],
    }


def _permission_create(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "kind": "drive#permission",
        "id": fake.id("perm"),
        "type": (str(_v) if (_v := config.get("type")) is not None and _v != "" else "user"),
        "role": (str(_v) if (_v := config.get("role")) is not None and _v != "" else "reader"),
        "emailAddress": (
            str(_v)
            if (_v := config.get("emailAddress")) is not None and _v != ""
            else "ada@example.test"
        ),
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "file_get":
        return _file_get(config, fake)

    if operation == "file_list":
        return _file_list(config, fake)

    if operation == "folder_create":
        return _folder_create(config, fake)

    if operation == "permission_create":
        return _permission_create(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'google_drive: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
