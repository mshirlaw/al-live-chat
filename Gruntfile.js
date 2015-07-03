module.exports = function(grunt){
    require("load-grunt-tasks")(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        karma: {
            unit: {
                configFile: "karma.conf.js"
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "babel-transpiled/es5.js": "es6/es6.js"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-karma");
    grunt.registerTask("default", ["karma","babel"]);
};