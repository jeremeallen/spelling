// Modules required
var gulp = require('gulp');

// Compile and minify app.scss file to app.min.css
gulp.task('default', function() {
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css').pipe(gulp.dest('css'));
    gulp.src('node_modules/bootstrap/dist/css/bootstrap.css.map').pipe(gulp.dest('css'));
});

// Watch for .scss changes in src/sass folder
gulp.task('watch', function() {
    gulp.watch('css/*', ['default']);
});
