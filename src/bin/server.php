<?php
/**
 * Luodaan serveri websocket-yhteyttä varten
 */
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use MyApp\Draw;

require '../../vendor/autoload.php';
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new Draw()
        )
    ),
    3000
);

$server->run();