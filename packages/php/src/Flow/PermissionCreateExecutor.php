<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleDrive\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleDrive\Actions\PermissionCreate;
use ParticleAcademy\GoogleDrive\GoogleDrive;

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
 * Share a Google Drive file, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleDrivePermissionCreateExecutor` in
 * @particle-academy/google-drive-js: the same request, built from the node's
 * config by the same `Actions\PermissionCreate` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Drive. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_drive_permission_create',
    aliases: [
        'google_drive_permission_create',
    ],
    category: 'io',
    label: 'Share a Google Drive file',
    description: 'Grant a user, group, domain, or anyone with the link access to a file.',
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
            'description' => 'The new permission\'s id.',
        ],
        [
            'path' => 'data.type',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.role',
            'type' => 'string',
            'description' => 'Echoes what was sent.',
        ],
        [
            'path' => 'data.emailAddress',
            'type' => 'string',
            'description' => 'Present for a user or group grant.',
        ],
        [
            'path' => 'mode',
            'type' => 'string',
            'description' => 'Which estate this ran against. Google has no sandbox, so: fake or live.',
        ],
    ],
)]
final class PermissionCreateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleDrive::descriptor(),
            PermissionCreate::OPERATION,
            $config,
            [
                'method' => PermissionCreate::METHOD,
                'path' => PermissionCreate::path($config),
                'json' => PermissionCreate::body($config),
                'query' => PermissionCreate::query($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_drive permission_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
