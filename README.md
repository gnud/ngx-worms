# Worms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Features
Bootstrap 4 - [integrate](https://www.amadousall.com/the-good-parts-of-bootstrap-4-you-are-missing-in-your-angular-material-projects/#bootstrapgrid) into angular

Angular material - [docs](https://material.angular.io/)

Canvas API -[docs](https://developer.mozilla.org/kab/docs/Web/API/Canvas_API)


## Demo
visit https://gnud.github.io/ngx-worms/

Demo deploy guide:

1. build angular cli production build

```
ng build --prod --base-href ""
```

base href must be empty so that urls will be resolved relative to the root.
Due to Github pages doesn't allow sub directories.

2. Publish to github pages

```
npx ngh --dir=dist/worms
```

You will get something like this:
```
*** Successfully published!
```

Wait one or several minutes until github updates the content or you will get the old content.
