<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Actions;

use ParticleAcademy\GoogleDrive\GoogleDrive;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/file-list.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/file-list.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */
/**
 * List files this app created (or the user explicitly opened) in Google Drive.
 * Under the drive.file scope this connector uses, a file created by any other
 * app or picked up in the Drive UI directly never appears here.
 *
 * GET /drive/v3/files —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/list
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Drive or calls the faker.
 */
final class FileList
{
    public const OPERATION = 'file_list';
    public const METHOD = 'GET';
    public const PATH = '/drive/v3/files';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the form body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Google Drive.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        $pageSize = $config['pageSize'] ?? null;
        if (($pageSize !== null && $pageSize !== '') && ! (is_numeric($pageSize) && (float) $pageSize === floor((float) $pageSize) && (float) $pageSize >= 1 && (float) $pageSize <= 1000)) {
            throw new ConnectorConfigException(
                'file_list: "pageSize" must be a integer, got '.json_encode($pageSize).'.'
            );
        }

        $body = [];

        $value = $config['q'] ?? null;
        if ($value !== null && $value !== '') {
            $body['q'] = (string) $value;
        }

        $value = $config['pageSize'] ?? null;
        $body['pageSize'] = ($value !== null && $value !== '') ? (int) $value : 100;

        $value = $config['pageToken'] ?? null;
        if ($value !== null && $value !== '') {
            $body['pageToken'] = (string) $value;
        }

        $value = $config['orderBy'] ?? null;
        if ($value !== null && $value !== '') {
            $body['orderBy'] = (string) $value;
        }

        $body['fields'] = 'files(id,name,mimeType,size,modifiedTime,webViewLink),nextPageToken';
        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }
}
