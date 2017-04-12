var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
// var tsProject = ts.createProject('tsconfig.json');

gulp.task('clean', function () {
    return gulp.src('dist/*')
        .pipe(clean());
});

gulp.task('move',['clean'] , function () {
    return gulp.src('app/src/client/*.*')
        .pipe(gulp.dest('dist/client'));
});

gulp.task('default',['move'] , function () {
    return gulp.src('app/src/**/*.ts')
        .pipe(ts({
            // noImplicitAny: true,
            // out: 'index.js'
        }))
        .pipe(gulp.dest('dist'));
    // return tsProject.src()
    //     .pipe(tsProject())
    //     .js.pipe(gulp.dest("dist"));
});


