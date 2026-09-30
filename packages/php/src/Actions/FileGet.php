<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Actions;

use ParticleAcademy\GoogleDrive\GoogleDrive;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/file-get.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/file-get.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */
/**
 * Read one file's metadata and its download/view links.
 *
 * GET /drive/v3/files/{fileId} —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/files/get
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Drive or calls the faker.
 */
final class FileGet
{
    public const OPERATION = 'file_get';
    public const METHOD = 'GET';
    public const PATH = '/drive/v3/files/{fileId}';
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
        if (($config['fileId'] ?? null) === null || ($config['fileId'] ?? null) === '') {
            throw new ConnectorConfigException('file_get: "fileId" is required (File ID).');
        }

        $body = [];

        $body['fields'] = 'id,name,mimeType,size,parents,modifiedTime,webViewLink,webContentLink';
        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/drive/v3/files/'.rawurlencode((string) ($config['fileId'] ?? ''));
    }
}
