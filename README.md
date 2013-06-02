# Grunt Coffeescript template

This is a simple template for building web application using
coffeescript and grunt. It contains a few useful options for
development such as live reloading of the server.

the base template comes with bootstrap 2.1.1 less templates and images
as well as the basic html5boilerplate 4.0.0 index.html and lib dependencies.

## Prerequisites
* Must have [node.js (tested using v0.8.4)](http://nodejs.org/) installed with npm (Node Package Manager)
* Install the following Node.js modules via the terminal.  This is a one-time task as the `-g` switch will install the modules globally.
* `npm install -g grunt`
* `npm install -g coffee-script`
* `git clone https://github.com/bjconlan/grunt.template-coffeescript.git`
* `cd grunt.template-coffeescript/build/tasks`
* `coffee -c *`
* `cd ../..`
* `npm install`
* `grunt` (this will compile the required files into dist)

You are now ready to run the basic template.

I would recommend that you fork the template to something a little more useful for you project (or simply copy it)

## Run It
* Navigate to the root of the project
* `grunt dev`
* point your browser to localhost:8000 or localhost:8001 (reload)

## Making Changes
* `grunt dev` will watch for any file changes in the src folder. 
  Specifically 'src/js', 'src/coffee', 'src/less',' src/css', 
  'src/html', 'src/img' and 'lib' folders. When changes are detected,
  the files will be linted, compiled and copied to the dest foldr.

## Things to do on a project basis.
* Overwriting the default server configuration used by grunt is
  recommended once a clean and functioning client application has been
  developed.
* `grunt prod` is an simple target which should contains javascript
  tasks to minimize and obfuscate code which is useful for production.
