# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/file-list.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/file-list.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_drive

"""List files this app created (or the user explicitly opened) in Google Drive.
Under the drive.file scope this connector uses, a file created by any other
app or picked up in the Drive UI directly never appears here.

GET /drive/v3/files —
https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Drive or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "file_list"
METHOD = "GET"
PATH = "/drive/v3/files"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the form body for one call, failing loudly and specifically."""
    pagesize = config.get("pageSize")
    if pagesize is not None and pagesize != "":
        try:
            _n = float(pagesize)
        except (TypeError, ValueError):
            _n = None
        if _n is None or _n != int(_n) or _n < 1 or _n > 1000:
            raise ConnectorConfigError(
                "file_list: \"pageSize\" must be a integer, got "
                f"{pagesize!r}."
            )

    out: dict[str, Any] = {}
    _value = config.get("q")
    if _value is not None and _value != "":
        out["q"] = str(_value)
    _value = config.get("pageSize")
    out["pageSize"] = int(float(_value)) if _value is not None and _value != "" else 100
    _value = config.get("pageToken")
    if _value is not None and _value != "":
        out["pageToken"] = str(_value)
    _value = config.get("orderBy")
    if _value is not None and _value != "":
        out["orderBy"] = str(_value)

    out["fields"] = "files(id,name,mimeType,size,modifiedTime,webViewLink),nextPageToken"
    return out


def file_list(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """List files this app created (or the user explicitly opened) in Google Drive. Under the
    drive.file scope this connector uses, a file created by any other app or picked up in the
    Drive UI directly never appears here.
    """
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        form=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
