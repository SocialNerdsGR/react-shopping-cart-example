# React fundamentals workshop Shopping cart

Shopping cart application.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

In order to run the application, you need to setup the [Shopping cart API](https://github.com/SocialNerdsGR/shopping-cart-json-server)

## Installing

There are 2 ways to run the app on your computer. Running natively Node or using Docker.

### Using Node

Install node modules
`npm install`

Run development server
`npm run dev`

### Using Docker

Build the image
`docker build -t socialnerds/shopping-cart-app .`

Run the image
`docker run -p 8080:80 -d socialnerds/shopping-cart-app`

## Usage

Run development server (available only running natively Node).

`npm start`

## Tests

`npm tests`

## Deployment

WIP

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details
