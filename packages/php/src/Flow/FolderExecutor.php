<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleDrive\Actions\FolderCreate;
use ParticleAcademy\GoogleDrive\GoogleDrive;

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
 * Google Drive folder, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleDriveFolderExecutor` in
 * @particle-academy/google-drive-js: the same request, built from the node's
 * config by the same `Actions\FolderCreate` a host would call directly, and
 * the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Drive. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_drive_folder',
    aliases: [
        'google_drive_folder',
    ],
    category: 'io',
    label: 'Google Drive folder',
    description: 'Create a folder in Google Drive.',
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
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.id',
            'type' => 'string',
            'description' => 'The created folder\'s id.',
        ],
        [
            'path' => 'data.name',
            'type' => 'string',
            'description' => 'The folder name Google stored.',
        ],
        [
            'path' => 'data.mimeType',
            'type' => 'string',
            'description' => 'The fixed Google Drive folder MIME type.',
        ],
        [
            'path' => 'data.parents',
            'type' => 'array',
            'description' => 'The parent folder id array returned by Drive.',
        ],
    ],
)]
final class FolderExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleDrive::descriptor(),
            FolderCreate::OPERATION,
            $config,
            [
                'method' => FolderCreate::METHOD,
                'path' => FolderCreate::PATH,
                'json' => FolderCreate::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_drive folder_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
