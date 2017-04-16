var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var nodemon = require('gulp-nodemon');
// var livereload = require('gulp-livereload');

// var runSequence = require('run-sequence');
var del = require('del');
// var watch = require('gulp-watch');
var batch = require('gulp-batch');
var sass = require('gulp-sass');




// ts({
//     moduleResolution: 'node'
// });


// gulp.task('clean-server', function () {
//     return gulp.src('dist/server/*')
//         .pipe(clean());
// });
//
// gulp.task('clean-client', function () {
//     return gulp.src('dist/client/*')
//         .pipe(clean());
// });

// gulp.task('clean', function () {
//     // return gulp.src('dist/*')
//     //     .pipe(clean());
//     return del('dist');
// });

// gulp.task('lib', function () {
//    return gulp.src([
//        'core-js/client/shim.min*',
//        'zone.js/dist/zone*',
//        'systemjs/dist/system.src*',
//        '@angular/core/bundles/core.umd*',
//        '@angular/common/bundles/common.umd*',
//        '@angular/compiler/bundles/compiler.umd*',
//        '@angular/platform-browser/bundles/platform-browser.umd*',
//        '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd*',
//        '@angular/http/bundles/http.umd*',
//        '@angular/router/bundles/router.umd*',
//        '@angular/forms/bundles/forms.umd*'
//    ], {cwd: 'node_modules/**'})
//        .pipe(gulp.dest('dist/client/lib'));
// });

// gulp.task('move', function () {
//     return gulp.src('src/client/**/*.{html,js}')
//     // return watch('src/client/*.html')
//     //     .pipe(watch('src/client/*.html'))
//         .pipe(gulp.dest('dist/client'));
//         // .pipe(livereload());
// });



// gulp.task('watch', function () {
//     gulp.watch('src/**/*.ts', ['build']);
//     gulp.watch('src/client/**/*.{html,js}', ['move']);
// })


gulp.task('styles', function () {
    return gulp.src('src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src'));
});

gulp.task('build', function () {
    var tsProject = ts.createProject('tsconfig.json');
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest('src'));
    // return gulp.src('client/**/*.ts')
    //     .pipe(tsProject())
    //     .js
    //     .pipe(gulp.dest('client'));

        // var tsResult = gulp.src("src/**/*.ts")
        //     .pipe(tsProject());
        //
        // // return watch('src/**/*.ts')
        // //     .pipe(tsResult.js.pipe(gulp.dest('dist')));
        //
        // return tsResult.js
        //     // .pipe(watch('src/**/*.ts'))
        //     .pipe(gulp.dest('dist'));



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

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', ['build']);
});

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

// gulp.task('build-all',['clean'],function (callback) {
//    return runSequence(
//        'lib',
//        'move',
//        'build',
//        function (error) {
//            callback(error);
//        }
//    );
// });


gulp.task('serve',['build','watch'], function () {
   nodemon({
       script: 'src/server/server.js',
       watch: '*.*'
   })
});

gulp.task('default', ['serve'], function () {
});