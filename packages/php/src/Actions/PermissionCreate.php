<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Actions;

use ParticleAcademy\GoogleDrive\GoogleDrive;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/permission-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/permission-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_drive
 */
/**
 * Grant a user, group, domain, or anyone with the link access to a file.
 *
 * POST /drive/v3/files/{fileId}/permissions —
 * https://developers.google.com/workspace/drive/api/reference/rest/v3/permissions/create
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Drive or calls the faker.
 */
final class PermissionCreate
{
    public const OPERATION = 'permission_create';
    public const METHOD = 'POST';
    public const PATH = '/drive/v3/files/{fileId}/permissions';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the JSON body for one call.
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
            throw new ConnectorConfigException('permission_create: "fileId" is required (File ID).');
        }

        if (($config['type'] ?? null) === null || ($config['type'] ?? null) === '') {
            throw new ConnectorConfigException('permission_create: "type" is required (Grantee type).');
        }

        if (($config['role'] ?? null) === null || ($config['role'] ?? null) === '') {
            throw new ConnectorConfigException('permission_create: "role" is required (Role).');
        }

        $body = [];

        $value = $config['type'] ?? null;
        $body['type'] = (string) $value;

        $value = $config['role'] ?? null;
        $body['role'] = (string) $value;

        $value = $config['emailAddress'] ?? null;
        if ($value !== null && $value !== '') {
            $body['emailAddress'] = (string) $value;
        }

        $value = $config['domain'] ?? null;
        if ($value !== null && $value !== '') {
            $body['domain'] = (string) $value;
        }

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
        return '/drive/v3/files/'.rawurlencode((string) ($config['fileId'] ?? '')).'/permissions';
    }

    /**
     * The QUERY parameters, which are not the same as the body.
     *
     * A POST can carry both. Sent in the body instead, a parameter like
     * Sheets' `valueInputOption` is IGNORED and the provider falls back to its
     * own default — so the request succeeds and does the wrong thing.
     *
     * @param array<string,mixed> $config
     * @return array<string,mixed>|\stdClass
     */
    public static function query(array $config): array|\stdClass
    {
        $body = [];

        $body['sendNotificationEmail'] = 'false';

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }
}
