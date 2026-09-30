"""
Google Drive — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_google_drive._fake import FakeValues, seed_for_call
from fancy_google_drive.faker import respond

GOLDENS = [
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
                "root",
            ],
            "modifiedTime": "2026-09-25T11:00:00.000Z",
            "webViewLink": "https://drive.google.com/file/d/1Pdf/view",
            "webContentLink": "https://drive.google.com/uc?id=1Pdf&export=download",
        },
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
        },
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
                "root",
            ],
        },
    },
    {
        "operation": "permission_create",
        "config": {},
        "expected": {
            "kind": "drive#permission",
            "id": "perm_fake_05ad8861209f",
            "type": "user",
            "role": "reader",
            "emailAddress": "ada@example.test",
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-google-drive")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("google_drive", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
