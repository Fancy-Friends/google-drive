<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Actions;

use ParticleAcademy\GoogleDrive\GoogleDrive;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/folder-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/folder-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */
/**
 * Create a folder in Google Drive.
 *
 * POST /drive/v3/files —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/create
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Drive or calls the faker.
 */
final class FolderCreate
{
    public const OPERATION = 'folder_create';
    public const METHOD = 'POST';
    public const PATH = '/drive/v3/files';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Google Drive.
     *
     * @param array<string,mixed> $config
     * @return array<string,scalar>
     */
    public static function body(array $config): array
    {
        if (($config['name'] ?? null) === null || ($config['name'] ?? null) === '') {
            throw new ConnectorConfigException('folder_create: "name" is required (Folder name).');
        }

        $body = [];

        $value = $config['name'] ?? null;
        $body['name'] = (string) $value;

        $value = $config['parents'] ?? null;
        if ($value !== null && $value !== '') {
            $body['parents'] = self::parentsList($config['parents'] ?? null);
        }

        $body['mimeType'] = 'application/vnd.google-apps.folder';

        return $body;
    }

    /** One value, a ,-separated string, or an array — all end up a list. @return list<string> */
    private static function parentsList(mixed $value): array
    {
        if (is_array($value)) {
            $items = array_map(static fn (mixed $item): string => (string) $item, $value);
        } elseif (is_string($value)) {
            $items = explode(',', $value);
        } else {
            return [];
        }

        $items = array_map(trim(...), $items);

        return array_values(array_filter($items, static fn (string $item): bool => $item !== ''));
    }
}
