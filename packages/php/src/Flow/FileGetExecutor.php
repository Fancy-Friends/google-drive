<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleDrive\Actions\FileGet;
use ParticleAcademy\GoogleDrive\GoogleDrive;

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
 * Google Drive file, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleDriveFileGetExecutor` in
 * @particle-academy/google-drive-js: the same request, built from the node's
 * config by the same `Actions\FileGet` a host would call directly, and the
 * same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Drive. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_drive_file_get',
    aliases: [
        'google_drive_file_get',
    ],
    category: 'io',
    label: 'Google Drive file',
    description: 'Read one file\'s metadata and its download/view links.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The file id.',
        ],
        [
            'path' => 'data.name',
            'type' => 'string',
            'description' => 'The file name.',
        ],
        [
            'path' => 'data.mimeType',
            'type' => 'string',
            'description' => 'The file\'s MIME type.',
        ],
        [
            'path' => 'data.size',
            'type' => 'string',
            'description' => 'Bytes, as a decimal STRING -- Drive\'s own int64 convention. Absent for Google Workspace editor files (Docs, Sheets, Slides) and for folders.',
        ],
        [
            'path' => 'data.parents',
            'type' => 'array',
            'description' => 'Parent folder ids. A file has at most one today even though the field stays an array.',
        ],
        [
            'path' => 'data.modifiedTime',
            'type' => 'string',
            'description' => 'RFC 3339.',
        ],
        [
            'path' => 'data.webViewLink',
            'type' => 'string',
            'description' => 'Opens the file in its Drive/editor viewer. Requires the viewer to already have access.',
        ],
        [
            'path' => 'data.webContentLink',
            'type' => 'string',
            'description' => 'A direct download URL for files with binary content. Absent for Google Workspace editor files and folders -- those export instead, which this connector does not yet offer.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class FileGetExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleDrive::descriptor(),
            FileGet::OPERATION,
            $config,
            [
                'method' => FileGet::METHOD,
                'path' => FileGet::path($config),
                'query' => FileGet::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_drive file_get'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
