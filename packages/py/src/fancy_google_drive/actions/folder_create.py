# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/folder-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/folder-create.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_drive

"""Create a folder in Google Drive.

POST /drive/v3/files —
https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Drive or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "folder_create"
METHOD = "POST"
PATH = "/drive/v3/files"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("name") is None or config.get("name") == "":
        raise ConnectorConfigError(
            "folder_create: \"name\" is required (Folder name)."
        )

    out: dict[str, Any] = {}
    _value = config.get("name")
    if _value is None or _value == "":
        raise ConnectorConfigError("folder_create: \"name\" is required.")

    out["name"] = str(_value)
    _value = config.get("parents")
    if _value is not None and _value != "":
        out["parents"] = _parents_list(config.get("parents"))

    out["mimeType"] = "application/vnd.google-apps.folder"
    return out


def folder_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Create a folder in Google Drive."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )


def _parents_list(value: Any) -> list[str]:
    """One value, a ","-separated string, or a list — all end up a list."""
    if isinstance(value, list):
        items = [str(item) for item in value]
    elif isinstance(value, str):
        items = value.split(",")
    else:
        return []

    return [item.strip() for item in items if item.strip()]