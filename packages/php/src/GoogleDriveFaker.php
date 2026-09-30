<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive;

use ParticleAcademy\Connectors\FakeRequest;

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
 * The Google Drive faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class GoogleDriveFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'file_get' => self::FileGet($config, $fake),
            'file_list' => self::FileList($config, $fake),
            'folder_create' => self::FolderCreate($config, $fake),
            'permission_create' => self::PermissionCreate($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'google_drive: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function FileGet(array $config, mixed $fake): array|\stdClass
    {
        return [
        'kind' => 'drive#file',
        'id' => ((($v = $config['fileId'] ?? null) !== null && $v !== '') ? (string) $v : $fake->id('1Pdf')),
        'name' => 'invoice.pdf',
        'mimeType' => 'application/pdf',
        'size' => '48213',
        'parents' => [
            'root',
        ],
        'modifiedTime' => '2026-09-25T11:00:00.000Z',
        'webViewLink' => 'https://drive.google.com/file/d/1Pdf/view',
        'webContentLink' => 'https://drive.google.com/uc?id=1Pdf&export=download',
    ];
    }

    /** @param array<string,mixed> $config */
    private static function FileList(array $config, mixed $fake): array|\stdClass
    {
        return [
        'files' => [
            [
                'kind' => 'drive#file',
                'id' => $fake->id('1Doc'),
                'name' => 'Q3 report',
                'mimeType' => 'application/vnd.google-apps.document',
                'modifiedTime' => '2026-09-28T16:20:00.000Z',
                'webViewLink' => 'https://docs.google.com/document/d/1Doc/edit',
            ],
            [
                'kind' => 'drive#file',
                'id' => $fake->id('1Pdf'),
                'name' => 'invoice.pdf',
                'mimeType' => 'application/pdf',
                'size' => '48213',
                'modifiedTime' => '2026-09-25T11:00:00.000Z',
                'webViewLink' => 'https://drive.google.com/file/d/1Pdf/view',
            ],
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function FolderCreate(array $config, mixed $fake): array|\stdClass
    {
        return [
        'kind' => 'drive#file',
        'id' => $fake->id('1Folder'),
        'name' => ((($v = $config['name'] ?? null) !== null && $v !== '') ? (string) $v : 'New folder'),
        'mimeType' => 'application/vnd.google-apps.folder',
        'parents' => [
            'root',
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function PermissionCreate(array $config, mixed $fake): array|\stdClass
    {
        return [
        'kind' => 'drive#permission',
        'id' => $fake->id('perm'),
        'type' => ((($v = $config['type'] ?? null) !== null && $v !== '') ? (string) $v : 'user'),
        'role' => ((($v = $config['role'] ?? null) !== null && $v !== '') ? (string) $v : 'reader'),
        'emailAddress' => ((($v = $config['emailAddress'] ?? null) !== null && $v !== '') ? (string) $v : 'ada@example.test'),
    ];
    }
}
