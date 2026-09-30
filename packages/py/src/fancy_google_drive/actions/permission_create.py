# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/permission-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/permission-create.json (or weaver's template/) and
# regenerate:
#
# npm run provider -- google_drive

"""Grant a user, group, domain, or anyone with the link access to a file.

POST /drive/v3/files/{fileId}/permissions —
https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/create

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Drive or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "permission_create"
METHOD = "POST"
PATH = "/drive/v3/files/{fileId}/permissions"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("fileId") is None or config.get("fileId") == "":
        raise ConnectorConfigError(
            "permission_create: \"fileId\" is required (File ID)."
        )

    if config.get("type") is None or config.get("type") == "":
        raise ConnectorConfigError(
            "permission_create: \"type\" is required (Grantee type)."
        )

    if config.get("role") is None or config.get("role") == "":
        raise ConnectorConfigError(
            "permission_create: \"role\" is required (Role)."
        )

    out: dict[str, Any] = {}
    _value = config.get("type")
    if _value is None or _value == "":
        raise ConnectorConfigError("permission_create: \"type\" is required.")

    out["type"] = str(_value)
    _value = config.get("role")
    if _value is None or _value == "":
        raise ConnectorConfigError("permission_create: \"role\" is required.")

    out["role"] = str(_value)
    _value = config.get("emailAddress")
    if _value is not None and _value != "":
        out["emailAddress"] = str(_value)
    _value = config.get("domain")
    if _value is not None and _value != "":
        out["domain"] = str(_value)

    return out



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/drive/v3/files/"
        + quote(str(config.get("fileId") or ""), safe="")
        + "/permissions"
    )


def query(config: dict[str, Any]) -> dict[str, Any]:
    """The QUERY parameters, which are not the same as the body.

    A POST can carry both. Sent in the body instead, a parameter like Sheets'
    `valueInputOption` is IGNORED and the provider falls back to its own
    default — so the request succeeds and quietly does the wrong thing.
    """
    out: dict[str, Any] = {}
    out["sendNotificationEmail"] = "false"
    return out

def permission_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Grant a user, group, domain, or anyone with the link access to a file."""
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
