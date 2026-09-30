<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleDrive\Actions\FileList;
use ParticleAcademy\GoogleDrive\GoogleDrive;

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
 * List Google Drive files, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleDriveFileListExecutor` in
 * @particle-academy/google-drive-js: the same request, built from the node's
 * config by the same `Actions\FileList` a host would call directly, and the
 * same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Drive. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_drive_file_list',
    aliases: [
        'google_drive_file_list',
    ],
    category: 'io',
    label: 'List Google Drive files',
    description: 'List files this app created (or the user explicitly opened) in Google Drive. Under the drive.file scope this connector uses, a file created by any other app or picked up in the Drive UI directly never appears here.',
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
            'path' => 'data.files',
            'type' => 'array',
            'description' => 'id, name, mimeType, size, modifiedTime, webViewLink per file -- leaner than file_get\'s projection. Read one file directly with file_get for parents and webContentLink.',
        ],
        [
            'path' => 'data.nextPageToken',
            'type' => 'string',
            'description' => 'Present when there is another page.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class FileListExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleDrive::descriptor(),
            FileList::OPERATION,
            $config,
            [
                'method' => FileList::METHOD,
                'path' => FileList::PATH,
                'query' => FileList::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_drive file_list'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
