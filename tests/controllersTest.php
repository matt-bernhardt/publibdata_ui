<?php

use Silex\WebTestCase;

class controllersTest extends WebTestCase
{
    public function testGetHomepage()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertContains('PubLibData lets librarians', $crawler->filter('body')->text());
    }

    public function testGetLibraryPage()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/library/Abington');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertContains('Abington', $crawler->filter('body')->text());
    }

    public function testGetYearAPI()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/library_year/2016');

        $this->assertTrue($client->getResponse()->isOk());
    }

    public function testGetLibraryAPI()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/library_location/Abington');

        $this->assertTrue($client->getResponse()->isOk());
    }

    public function createApplication()
    {
        $app = require __DIR__.'/../src/app.php';
        require __DIR__.'/../config/dev.php';
        require __DIR__.'/../src/controllers.php';
        $app['session.test'] = true;

        return $this->app = $app;
    }
}
