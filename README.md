# OneTwoTree 🌳

This project is a school project. Its goal to rate music and leave commands on particular part of the track.

## Architecture

```
packages/
	server/				"Server with API and html serving"
	app/				"Code for the UI"
	domain/				"Domain models"
	services/			"Entity objects"
```

[See server readme](../blob/master/packages/server/README.md)

## Scripts

### `DOTENV_CONFIG_PATH=../../.env npm run build -ws`

Build all to the build directory

#### Build output

```
build/
	app/
	domain/
	server/ 
```

## Environment variables

### `DOTENV_CONFIG_<OPTION>`

[see](https://www.npmjs.com/package/dotenv)

Mostly used to set the DOTENV_CONFIG_PATH to use the root. 

### BUILD_PATH

[see](https://create-react-app.dev/docs/advanced-configuration)

Specify a new path for Create React App to output assets.