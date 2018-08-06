# synergia

## To Run in local:
1) Open terminal and go to home directory of project.
2) Run command: `npm install` <-- this is required only once
3) Run command: `npm start`
4) Open the `index.html` file in browser.

## Deploy
Generate build and then zip the following files:
* api folder
* css folder
* js folder
* fonts folder
* images folder
* src/index.html
* src/public folder
* package.json

Once copied to deployment server, run following command: `npm install`

Start nginx and point it to the index.html file and open the configured path in browser. If you are using any other web server then you can copy this output files directly into webapp or respective serve directory of web server.
