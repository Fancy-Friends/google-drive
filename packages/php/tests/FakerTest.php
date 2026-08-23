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

it('folder_create fakes the shape Google Drive publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_drive', 'folder_create', $config));

    $faked = GoogleDriveFaker::respond('folder_create', ['config' => $config, 'fake' => $fake]);

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

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('google_drive', 'no_such_operation', []));

    expect(fn () => GoogleDriveFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
