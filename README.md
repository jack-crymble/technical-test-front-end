## About Software Development @ Cyberhawk

## The task

We've designed this task to try and give you the ability to show us what you can do and hopefully flex your technical and creative muscles. You can't show off too much here, show us you at your best and wow us!

To make things as simple as we could, we've opted to use [Laravel Sail](https://laravel.com/docs/8.x/sail) to provide a quick and convenient development environment, this will require you to install
[Docker Desktop](https://www.docker.com/products/docker-desktop) before you can start the test. We've provided [some more detailed instructions](#setting-everything-up) below in case this is your first time using Docker or Sail.

We'd like you to build the front-end of an application that will display an example wind farm, its turbines and their components and inspections.
We'd like to be able to see components and their grades (measurement of damage/wear) ranging between 1 - 5.

We've provided a pre-built API and an API spec document `api-spec.yaml` that we'd like you to consume to provide the functionality requested.

Don't be afraid of submitting incomplete code or code that isn't quite doing what you would like, just like your maths teacher, we like to see your working.
Just Document what you had hoped to achieve and your thoughts behind any unfinished code, so that we know what your plan was.

### Requirements

-   Display a list of farms, turbines, components, inspections and grades
-   Each Turbine should have a number of components
-   A component can be have a grade from 1 to 5 (1 being perfect and 5 being completely broken/missing) via an inspection
-   Conform to the spec provided in the `api-spec.yaml` file in the root of this project.

### Bonus Points

-   Great UX/UI
-   Use of React JS
-   Use of Tailwind CSS
-   Use of 3D
-   Use of a web map technology in the display of the data
-   Automated tests
-   API Authentication
-   API Authorization
-   Use of coding style guidelines (we use PSR-12 and AirBnb)
-   Use of git with clear logical commits
-   Specs/Plans/Designs

### Submitting The Task

We're not too fussy about how you submit the task, providing it gets to us and we're able to run it we'll be happy however here are some of the ways we commonly see:

-   Fork this repo, add us as a collaborator on your GitHub repo and send us a link
-   ZIP the project and email it to us at andy.rayne@thecyberhawk.com / joe.ware@thecyberhawk.com

## Setting Everything Up

As mentioned above we have chosen to make use of Laravel Sail as the foundation of this technical test.

-   If you haven't already, you will need to install [Docker Desktop](https://www.docker.com/products/docker-desktop).
-   One that is installed your next step is to install this projects composer dependencies (including Sail).
    -   This will require either PHP 8 installed on your local machine or the use of [a small docker container](https://laravel.com/docs/8.x/sail#installing-composer-dependencies-for-existing-projects) that runs PHP 8 that can install the dependencies for us.
-   If you haven't done so already copy the `.env.example` file to `.env`
    -   If you are running a local development environment you may need to change some default ports in the `.env` file
        -   We've already changed mysql to 33060 and NGINX to 81 for you
-   It should now be time to [start Sail](https://laravel.com/docs/8.x/sail#starting-and-stopping-sail) and the task
-   There is a file in the root of this project called `api-spec.yaml` this can be imported into your application of choice to ensure you're building your application to the spec that we're expecting. Some notable applications are:

    -   Postman
    -   Swagger
    -   StopLight

-   You can seed the pre-built API using the commands:
    -   `sail artisan migrate --seed`

### Installing Composer Dependencies

https://laravel.com/docs/9.x/sail#installing-composer-dependencies-for-existing-projects

```bash
docker run --rm \
-u "$(id -u):$(id -g)" \
-v $(pwd):/var/www/html \
-w /var/www/html \
laravelsail/php81-composer:latest \
composer install --ignore-platform-reqs
```

### Quick Tips

-   Don't run npm/composer from your host, always run it via the sail command
    -   This is because the docker container may not be able to write to the filesystem after you do so
-   Ensure you have a valid .env file before starting sail for the first time.
    -   Sail creates a docker volume which is persistent, so stopping/starting sail will not affect/fix issues in a volume (missing DB etc)

## Your Notes

This is a place for you to add your notes, plans, thinking and any feedback you have for us of the task, please feel free to include whatever you like here, we'll make sure to read it.

### Demo

[Video demo of application](https://www.loom.com/share/b9fe33ebfea14357b643d2f9490234b5?sid=d447236d-27b4-466f-b590-e13c9b309ff7)

### Rough idea of my thought process

-   Set up docker containers
-   Understand the data structure and relationships
-   Brainstorm potential designs / layouts that can best display the data
-   Start writing code making use of reusable components where possible
-   Design primative login functionality (any username / password combo will work) to demonstrate Redux understanding
-   Write tests to show 100% coverage of a handful of files
-   Sweep application and re-align any inconsistencies

### Notes

-   Link above for installing php directs you to php 8.1 which does not work. It depends on ubuntu resources which have been removed - `The repository 'http://ports.ubuntu.com/ubuntu-ports impish Release' does not have a Release file.` To resolve this, instead use php 8.2 and install its dependencies.
-   The use of less random coordinates for turbine location would have been nice. As well as including location data for each of the farms.
-   The curent login functionality does not reach out to any API (as none are defined in the provided back end) so instead it aids in the use of route guards preventing users who have not logged in from accessing both the `/dashboard` and `/inspection` routes. Any username and password combination will work.

### Future steps

These are a few things I would like to add to the app in the future:

-   Login functionality integrated with BE authentication logic
-   Dashboard Page: Hovering over a row in the table will highlight a marker on the map. The marker will also show some more information about the specific turbine on click.
-   Inspection Page: Displaying a rotating circle of the 5 turbines, each in different states of health depending on the grade they've been given. The grade for each component would be clearly visible on the turbine and interaction with that component would show a history of inspections to show the degradation of the component over time.
-   Map Component: Dynamically zoom the map to contain each of the displayed turbines.
-   Offer an immersive 3D view option for inspecting each of the turbines components where the user can view 3d models of the specific turbine inspected. This will give them a more accurate understanding of what needs to be fixed on that component
