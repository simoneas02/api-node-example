# api-node-example

> A simple `api` created with `NodeJS`, `express` and `mongo` just for my learnning.

## Run the project local

**0 -** install the basic dependencies

- [NodeJS](https://nodejs.org/en/)
- [Mongo](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

**1 -** Clone the project and install the dependencies:

```sh
$ git clone https://github.com/simoneas02/api-node-example
$ cd api-node-example/
$ yarn
```

**2 -** Start development mode:

```sh
$ yarn start
```

## Create an User
- Create a POST request to `http://localhost:3000/auth/resgister`
- Header should be `application/json`
- Body should contain the following fields:
```JSON
{
	"name": "some-name",
	"email": "some-email.com",
	"password": "some-password"
}
```

## Contributing

Find on our [issues](https://github.com/simoneas02/api-node-example/issues/) the next steps of the project ;)  
Want to contribute? [Follow these recommendations](https://github.com/simoneas02/api-node-example/blob/master/CONTRIBUTING.md).


## History

See [Releases](https://github.com/simoneas02/api-node-example/releases) for detailed changelog.


## License

[MIT License](https://github.com/simoneas02/api-node-example/blob/master/LICENSE.md) © [Simone Amorim](https://simoneas02.github.io)
