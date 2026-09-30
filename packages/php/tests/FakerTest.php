<?php

declare(strict_types=1);

use ParticleAcademy\GoogleDrive\GoogleDriveFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */
/**
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('file_get fakes the shape Google Drive publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_drive', 'file_get', $config));

    $faked = GoogleDriveFaker::respond('file_get', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'kind' => 'drive#file',
        'id' => '1Pdf_fake_738be566ebc3',
        'name' => 'invoice.pdf',
        'mimeType' => 'application/pdf',
        'size' => '48213',
        'parents' => [
            'root',
        ],
        'modifiedTime' => '2026-09-25T11:00:00.000Z',
        'webViewLink' => 'https://drive.google.com/file/d/1Pdf/view',
        'webContentLink' => 'https://drive.google.com/uc?id=1Pdf&export=download',
    ]);
});

it('file_list fakes the shape Google Drive publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_drive', 'file_list', $config));

    $faked = GoogleDriveFaker::respond('file_list', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'files' => [
            [
                'kind' => 'drive#file',
                'id' => '1Doc_fake_0002209ac639',
                'name' => 'Q3 report',
                'mimeType' => 'application/vnd.google-apps.document',
                'modifiedTime' => '2026-09-28T16:20:00.000Z',
                'webViewLink' => 'https://docs.google.com/document/d/1Doc/edit',
            ],
            [
                'kind' => 'drive#file',
                'id' => '1Pdf_fake_60477aa36d78',
                'name' => 'invoice.pdf',
                'mimeType' => 'application/pdf',
                'size' => '48213',
                'modifiedTime' => '2026-09-25T11:00:00.000Z',
                'webViewLink' => 'https://drive.google.com/file/d/1Pdf/view',
            ],
        ],
    ]);
});

it('folder_create fakes the shape Google Drive publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_drive', 'folder_create', $config));

    $faked = GoogleDriveFaker::respond('folder_create', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'kind' => 'drive#file',
        'id' => '1Folder_fake_bf17a2312165',
        'name' => 'New folder',
        'mimeType' => 'application/vnd.google-apps.folder',
        'parents' => [
            'root',
        ],
    ]);
});

it('permission_create fakes the shape Google Drive publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_drive', 'permission_create', $config));

    $faked = GoogleDriveFaker::respond('permission_create', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'kind' => 'drive#permission',
        'id' => 'perm_fake_05ad8861209f',
        'type' => 'user',
        'role' => 'reader',
        'emailAddress' => 'ada@example.test',
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('google_drive', 'no_such_operation', []));

    expect(fn () => GoogleDriveFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
