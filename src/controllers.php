<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

//Request::setTrustedProxies(array('127.0.0.1'));

$app->get('/', function () use ($app) {

    $client = $app['elasticsearch'];

    return $app['twig']->render('index.html.twig', array());
})
->bind('homepage')
;

$app->get('/foos', function () use ($app) {

    $values = array(
        'id' => 'foo',
        'foo' => 'bar'
    );

    return $app['twig']->render('detail.html.twig', $values);
});

$app->get('/foo/{id}', function ($id) {
    return "Library detail page: {$id}"; 
})
->value("id", ""); // set a default value

$app->get('/library/{id}', function ($id) {
    return "Library detail! {$id}";
})
->value("id", ""); // set a default value

$app->error(function (\Exception $e, Request $request, $code) use ($app) {
    if ($app['debug']) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = array(
        'errors/'.$code.'.html.twig',
        'errors/'.substr($code, 0, 2).'x.html.twig',
        'errors/'.substr($code, 0, 1).'xx.html.twig',
        'errors/default.html.twig',
    );

    return new Response($app['twig']->resolveTemplate($templates)->render(array('code' => $code)), $code);
});
