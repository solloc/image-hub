var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');
// var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean-server', function () {
    return gulp.src('dist/server/*')
        .pipe(clean());
});

gulp.task('clean-client', function () {
    return gulp.src('dist/client/*')
        .pipe(clean());
});

gulp.task('move',['clean-client'], function () {
    return gulp.src('src/client/*.*')
        .pipe(gulp.dest('dist/client'));
        // .pipe(livereload());
});

gulp.task('build',['clean-server'] , function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            // noImplicitAny: true,
            // out: 'index.js'
        }))
        .pipe(gulp.dest('dist'));
    // return tsProject.src()
    //     .pipe(tsProject())
    //     .js.pipe(gulp.dest("dist"));
});

gulp.task('watch',['build','move'], function () {
    gulp.watch('src/server/**/*.ts', ['build']);
    gulp.watch('src/client/**/*.*', ['move']);
});

gulp.task('serve',['watch'], function () {
   nodemon({
       script: './dist/server/index.js'
   })
});

gulp.task('default',['serve'], function () {

});