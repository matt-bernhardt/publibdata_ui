<?php

use Silex\Application;
use Silex\Provider\AssetServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\HttpFragmentServiceProvider;
use Elasticsearch\ClientBuilder;

$app = new Application();
$app['debug'] = true;
$app->register(new ServiceControllerServiceProvider());
$app->register(new AssetServiceProvider());
$app->register(new TwigServiceProvider());
$app->register(new HttpFragmentServiceProvider());

$app['elasticsearch'] = function () {
    $hosts = [
        '52.87.178.46:9200',
    ];

    $client = ClientBuilder::create()->setHosts($hosts)->build();   // Instantiate a new ClientBuilder

    return $client;
};

$app['twig'] = $app->extend('twig', function ($twig, $app) {
    // add custom globals, filters, tags, ...

    return $twig;
});

return $app;
