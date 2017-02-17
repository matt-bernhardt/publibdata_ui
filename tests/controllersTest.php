<?php

namespace Codex\PubLibData;

use Silex\WebTestCase;

/**
 * For now, this is pretty simple. Individual tests are documented below.
 * There is only one class.
 */
class ControllersTest extends WebTestCase
{
    /**
     * Does the homepage exist, and does it contain the welcome phrase?
     */
    public function testGetHomepage()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertContains('PubLibData lets librarians', $crawler->filter('body')->text());
    }

    /**
     * Does a library detail page exist, and does it have the name of the library?
     */
    public function testGetLibraryPage()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/library/Abington');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertContains('Abington', $crawler->filter('body')->text());
    }

    /**
     * Does the year API exist?
     */
    public function testGetYearAPI()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/library_year/2016');

        $this->assertTrue($client->getResponse()->isOk());
    }

    /**
     * Does the library API exist?
     */
    public function testGetLibraryAPI()
    {
        $client = $this->createClient();
        $client->followRedirects(true);
        $crawler = $client->request('GET', '/library_location/Abington');

        $this->assertTrue($client->getResponse()->isOk());
    }

    /**
     * Can the application itself be created?
     *
     * @return Object The created application
     */
    public function createApplication()
    {
        $app = require __DIR__.'/../src/app.php';
        require __DIR__.'/../config/dev.php';
        require __DIR__.'/../src/controllers.php';
        $app['session.test'] = true;

        return $this->app = $app;
    }
}
