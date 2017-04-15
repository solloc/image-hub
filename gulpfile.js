var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');
var tsProject = ts.createProject('tsconfig.json');
var runSequence = require('run-sequence');
var del = require('del');
// var watch = require('gulp-watch');
var batch = require('gulp-batch');

// gulp.task('clean-server', function () {
//     return gulp.src('dist/server/*')
//         .pipe(clean());
// });
//
// gulp.task('clean-client', function () {
//     return gulp.src('dist/client/*')
//         .pipe(clean());
// });

gulp.task('clean', function () {
    // return gulp.src('dist/*')
    //     .pipe(clean());
    return del('dist');
});



gulp.task('lib', function () {
   return gulp.src([
       'core-js/client/shim.min.js',
       'zone.js/dist/zone.js',
       'systemjs/dist/system.src.js'
   ], {cwd: 'node_modules/**'})
       .pipe(gulp.dest('dist/client/lib'));
});

gulp.task('move', function () {
    return gulp.src('src/client/*.html')
    // return watch('src/client/*.html')
    //     .pipe(watch('src/client/*.html'))
        .pipe(gulp.dest('dist/client'));
        // .pipe(livereload());
});



gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build']);
    gulp.watch('src/client/*.html', ['move']);
})

gulp.task('build', function () {

        var tsResult = gulp.src("src/**/*.ts")
            .pipe(tsProject());

        // return watch('src/**/*.ts')
        //     .pipe(tsResult.js.pipe(gulp.dest('dist')));

        return tsResult.js
            // .pipe(watch('src/**/*.ts'))
            .pipe(gulp.dest('dist'));



        // var tsResult = gulp.src("src/**/*.ts")
        //     .pipe(tsProject());
        //
        // return tsResult.js.pipe(gulp.dest('dist'));


    // return tsProject.src()
    //     .pipe(tsProject())
    //     .js.pipe(gulp.dest("dist"));

    // return gulp.src('src/**/*.ts')
    //     .pipe(ts({
    //         // noImplicitAny: true,
    //         // out: 'index.js'
    //     }))
    //     .pipe(gulp.dest('dist'));
    // // return tsProject.src()
    // //     .pipe(tsProject())
    // //     .js.pipe(gulp.dest("dist"));
});




// gulp.task('watch', function () {
//     gulp.watch('src/*', ['build']);
// });

// gulp.task('build-all', function () {
//
//     // watch('src/**/*.ts'
//    // return runSequence('clean','build','move','lib');
//
//     // var tsResult = gulp.src("src/**/*.ts")
//     //     .pipe(tsProject());
//     //
//     // // return watch('src/**/*.ts')
//     // //     .pipe(tsResult.js.pipe(gulp.dest('dist')));
//     //
//     // return tsResult.js
//     // // .pipe(watch('src/**/*.ts'))
//     //     .pipe(gulp.dest('dist'));
//
//
//
//
// });

gulp.task('build-all',['clean'],function (callback) {
   return runSequence(
       'lib',
       'move',
       'build',
       function (error) {
           callback(error);
       }
   );
});


gulp.task('serve',['build-all','watch'], function () {
   nodemon({
       script: 'dist/server/index.js',
       watch: 'dist/**/*.*'
   })
});

gulp.task('default', ['serve'], function () {
});