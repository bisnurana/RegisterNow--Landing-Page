const gulp = require('gulp'),
	  sass = require('gulp-sass'),	
	  sourceMaps = require('gulp-sourcemaps'),
	  autoprefixer = require('gulp-autoprefixer'),
	  imageMin = require('gulp-imagemin'),
	  useref = require('gulp-useref'),
	  gulpif = require('gulp-if'),
	  uglify = require('gulp-uglify'),
	  babel = require('gulp-babel'),
	  uncss = require('gulp-uncss'),
	  browserSync = require('browser-sync').create();

// Handle sass files
gulp.task('css', function(){
	return gulp.src('src/sass/**/*.scss')
			.pipe(sourceMaps.init())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(uncss({
				html:['dist/index.html']
			}))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(sourceMaps.write('./maps'))
			.pipe(gulp.dest('dist/css'))
			.pipe(browserSync.stream())
});

// Handle unnecessary css for production
gulp.task('uncss', function(){
	return gulp.src('src/sass/**/*.scss')
			.pipe(sourceMaps.init())
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(autoprefixer({
				browsers: ['last 2 versions']
			}))
			.pipe(sourceMaps.write('./maps'))
			.pipe(gulp.dest('dist/css'))
			.pipe(browserSync.stream())
});

// Handle html and js files
gulp.task('copy', function(){
	return gulp.src('src/**/*.html')
			.pipe(useref())
			.pipe(gulpif('*.js', sourceMaps.init()))
			.pipe(gulpif('*.js', babel({presets: ["env"]})))
			.pipe(gulpif('*.js', uglify()))
			.pipe(gulpif('*.js', sourceMaps.write('.')))
			.pipe(gulp.dest('dist'))
			.pipe(browserSync.stream())
});

// Optimize images
gulp.task('images', function(){
	return gulp.src('src/img/*')
			.pipe(imageMin())
			.pipe(gulp.dest('dist/img'))
});

// Browersync task
gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir:'dist'
		}
	})

});

// Watch files for changes
gulp.task('watch', ['browserSync', 'css'], function(){
	gulp.watch('src/sass/**/*.scss', ['css']);
	gulp.watch('src/**/*.+(html|js)', ['copy']);

});

gulp.task('default', ['watch']);




