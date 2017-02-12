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

$app->get('/library/{id}', function ($id) use ($app) {
    return $app['twig']->render('library.html.twig', array('id' => $id));
});

$app->get('/library_api/{id}', function ($id) use ($app) { 
  
  $client = $app['elasticsearch'];
  $params = [
      'index' => 'publiclibdata',
      'type' => 'logs',
      'size' => 500,
      'body' => [
          'query' => [
              'match' => [
                  'Location' => trim($id)
              ]
          ]
      ]
  ];
  
  $response = $client->search($params);
  return new JsonResponse($response);
})
->value("id", "*"); // set a default value

$app->get('/library_year/{id}', function ($id) use ($app) { 
  
  $client = $app['elasticsearch'];
  $params = [
      'index' => 'publiclibdata',
      'type' => 'logs',
      'size' => 500,
      'body' => [
          'query' => [
              'match' => [
                  'Year' => trim($id)
              ]
          ]
      ]
  ];
  
  $response = $client->search($params);
  return new JsonResponse($response);
})
->value("id", "2016"); // set a default value

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

$app->get('/library_api_autocomplete/{id}', function ($id) use ($app) { 
  // example query http://localhost:8282/library_api_autocomplete/*
  // This one uses the new, fixed index 
  // Facets come back in the Buckets object
  if  (empty($id)) {
    $id = "*";
  }
  $client = $app['elasticsearch'];
  $params = [
      'index' => 'publiclibdata',
      'type' => 'logs',
      'from' => 0,
      'size' => 100,
      "_source" => [
          "Location"
        ],
      'body' => [
          'query' => [
            "query_string" => [
                 "default_field" => "Location",
                 "query" => "{$id}"
                   ]
          ],
      "aggregations" => [
            "libraries" => [
                "terms" => [
                  "field" => "Location.keyword",
                  "size" => 500
                  ]
                ],
              "Years" => [
                  "terms" => [
                    "field" => "Year.keyword"
                      ]
                ],
              ]
      ]
  ];
  $response = $client->search($params);
  return new JsonResponse($response);
})
->value("id", "*"); // set a default value