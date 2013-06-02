module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: '<json:package.json>',

		meta: {
			banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
		},

		clean: {
			folder: "dist"
		},

		jade: {
	        compile: {
	            options: {
	                pretty: true
	            },
	            files: grunt.file.expandMapping(['**/*.jade'], 'dist/', {
	                cwd: 'src/html',
	                rename: function(destBase, destPath) {
	                    return destBase + destPath.replace(/\.jade$/, '.html');
	                }
	            })

	        }
	    },

		coffee: {
			compile: {
			    files: {
			      'dist/js/main.js': ['src/coffee/*.coffee'] // compile and concat into single file
			    }
			}
		},

		copy: {
		  html: {
		    files: [
		      {expand: true, src: ['src/html/**/*.html'], dest: 'dist/'}
		    ]
		  },
	   	  js: {
		    files: [
		    	{expand: true, src: ['src/js/**/*.js'], dest: 'dist/js/'}
		    ]
		  },
	   	  lib: {
		    files: [		    	
		      {expand: true, src: ['lib/**/*.js'], dest: 'dist/lib/'}
		    ]
		  },
	   	  css: {
		    files: [
		      {expand: true, src: ['src/css/**/*.css'], dest: 'dist/css'}
		    ]
		  },
	   	  img: {
		    files: [		      
		      {expand: true, src: ['src/img/**/*'], dest: 'dist/img'}
		    ]
		  }
		},

		

		docco: {
			app: {
        		src: ['src/coffee/**/*.coffee',
        		      'src/js/**/*.js' ]
      		}
		},

		lint: {
			scripts: ['src/js/**/*.js']
		},

		jshint: {
			options: {
				browser: true,
				devel: true,
				camelcase: true,
				curly: true,
				immed: true,
				latedef: true,
				newcap: true,
				globalstrict: true,
				eqnull: true, // CoffeeScript uses null for default parameter values
				jquery: true,
				smarttabs: true,
			},
			globals: {
				angular: true
			}
		},

		// compile Less to CSS
		less: {
			dist: {
				src: 'src/less/styles.less',
				dest: 'dist/css/style.css'
			}
		},

		reload: {
			proxy: {
				host: 'localhost',
				port: '8000'
			}
		},

		watch: {
			js: {
				files: 'src/js/**/*.js',
				tasks: ['jshint', 'copy:js']
			},
			lib: {
				files: 'lib/**/*.js',
				tasks: ['copy:lib']
			},
			coffee: {
				files: 'src/coffee/**/*.coffee',
				tasks: ['coffee']
			},
			css: {
				files: 'src/css/**/*.css',
				tasks: ['copy:css']
			},
			less: {
				files: 'src/less/**/*.less',
				tasks: ['less']
			},
			jade: {
				files: 'src/html/**/*.jade',
				tasks: ['jade:compile']
			},
			html: {
				files: 'src/html/**/*.html',
				tasks: ['copy:html']
			},
			img: {
				files: 'src/img/**/*',
				tasks: ['copy:img']
			},
			reload: {
				files: ['dist/**'],
				tasks: ['reload']
			}
		},

		connect : {
			server: {
				options : {
					port: 8000,
					base: 'dist'
				}
			}
		},
		
		min: {
			prod: {
				src: ['<banner>', 'dist/js/**/*.js'],
				dest: 'dist/<%= pkg.name %>.min.js'
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-docco');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-reload');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('common', ['clean','jshint','copy','jade','coffee','less']);
	grunt.registerTask('default', 'common');
	//  
	grunt.registerTask('dev', ['common','connect','reload','watch']);
	grunt.registerTask('prod', ['common','min']);
};
