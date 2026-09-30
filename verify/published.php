<?php

declare(strict_types=1);

/*
 * Google Drive — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/google-drive-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\GoogleDrive\GoogleDriveFaker;

$goldens = [
    [
        'operation' => 'file_get',
        'config' => [],
        'expected' => [
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
        ],
    ],
    [
        'operation' => 'file_list',
        'config' => [],
        'expected' => [
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
        ],
    ],
    [
        'operation' => 'folder_create',
        'config' => [],
        'expected' => [
            'kind' => 'drive#file',
            'id' => '1Folder_fake_bf17a2312165',
            'name' => 'New folder',
            'mimeType' => 'application/vnd.google-apps.folder',
            'parents' => [
                'root',
            ],
        ],
    ],
    [
        'operation' => 'permission_create',
        'config' => [],
        'expected' => [
            'kind' => 'drive#permission',
            'id' => 'perm_fake_05ad8861209f',
            'type' => 'user',
            'role' => 'reader',
            'emailAddress' => 'ada@example.test',
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('google_drive', $operation, $config));
    $faked = GoogleDriveFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
