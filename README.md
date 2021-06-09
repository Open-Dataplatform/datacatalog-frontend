# DataCatalog

## Table of Contents
1. [Project setup](#project-setup)
2. [Dev setup](#dev-setup)
3. [Build](#build)
4. [Generate types from swagger](#generate-types-from-swagger)
5. [Testing](#testing)
6. [Further help](#further-help)

### Project setup
The project consists of an Angular 8 application with less as a dynamic css preprocessor. 
It uses typescript to add optional static typing to javascript. The frontend works in close relations with the data catalogue endpoint, that is specified in the `/environment` folder.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.0. 

The project is structured as module and component based. A brief overview of the project folder setup can be seen here.
```
src 
└───app
│   └───components (The components in the project)
│   └───pages (The pages in the project)
│   └───shared (Shared services and components)
│
└───assets (Asset files that are used in the project eg. images fonts ect.)
└───environments (Global environments, setup for prod / dev)
└───types (Type definition files for typescript)
```

### Dev setup
To get started you need node.js, it can be downloaded from `https://nodejs.org/`.
To get the project up and running, clone the repository to your development machine.
Open a terminal and navigate to the root of the project folder. Then run `npm install` this will fetch all the dependent node modules for the project.
Now you should have a working project - typing `ng serve` will run a dev server- and a watcher at `http://localhost:4200/` with hot module reloading enabled.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Generate types from swagger
Run `npm run build:dts` to generate type definitions from swagger. The definitions will be stored in the `types/`  folder as `mimir-api.d.ts`.  
This will be required to continue development if the endpoint is updated. 

This will remove response from the ending of the types to make it more sensible in the frontend, it also prefixes the interfaces with `I` to indicate it's an Interface eg. `IDataset`.

### Testing
Run `ng test` to start a jasmine test. components and services are setup to test if they can be initiated properly.

### Further help
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
For more general information about Angular checkout the [Official Angular site](https://angular.io/)
