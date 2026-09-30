# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- google_drive

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_google_drive._fake import FakeValues, seed_for_call
from fancy_google_drive.faker import respond


def test_file_get_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_drive", "file_get", config))

    faked = respond("file_get", {"config": config, "fake": fake})

    assert faked == {
        "kind": "drive#file",
        "id": "1Pdf_fake_738be566ebc3",
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


def test_file_list_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_drive", "file_list", config))

    faked = respond("file_list", {"config": config, "fake": fake})

    assert faked == {
        "files": [
            {
                "kind": "drive#file",
                "id": "1Doc_fake_0002209ac639",
                "name": "Q3 report",
                "mimeType": "application/vnd.google-apps.document",
                "modifiedTime": "2026-09-28T16:20:00.000Z",
                "webViewLink": "https://docs.google.com/document/d/1Doc/edit",
            },
            {
                "kind": "drive#file",
                "id": "1Pdf_fake_60477aa36d78",
                "name": "invoice.pdf",
                "mimeType": "application/pdf",
                "size": "48213",
                "modifiedTime": "2026-09-25T11:00:00.000Z",
                "webViewLink": "https://drive.google.com/file/d/1Pdf/view",
            },
        ],
    }


def test_folder_create_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_drive", "folder_create", config))

    faked = respond("folder_create", {"config": config, "fake": fake})

    assert faked == {
        "kind": "drive#file",
        "id": "1Folder_fake_bf17a2312165",
        "name": "New folder",
        "mimeType": "application/vnd.google-apps.folder",
        "parents": [
            "root",
        ],
    }


def test_permission_create_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("google_drive", "permission_create", config))

    faked = respond("permission_create", {"config": config, "fake": fake})

    assert faked == {
        "kind": "drive#permission",
        "id": "perm_fake_05ad8861209f",
        "type": "user",
        "role": "reader",
        "emailAddress": "ada@example.test",
    }


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("google_drive", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
