gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'

#-=======================================================---
#------------------ Compile Coffee
#-=======================================================---

gulp.task 'coffee', ->

	gulp.src 'coffee/*.coffee'
		.pipe(coffee(bare: true).on 'error', gutil.log)
		.pipe(gulp.dest(''))