<?php

// configure your app for the production environment
use Silex\Provider\MonologServiceProvider;

$app->register(new MonologServiceProvider(), array(
    'monolog.logfile' => __DIR__.'/../var/logs/silex_prod.log',
));

$app['twig.path'] = array(__DIR__.'/../templates');
// $app['twig.options'] = array('cache' => __DIR__.'/../var/cache/twig', 'autoreload' => true);
$app['twig.options'] = array('cache' => false, 'autoreload' => true);
