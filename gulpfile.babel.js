import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';
import excludeGitignore from 'gulp-exclude-gitignore';
import plumber from 'gulp-plumber';

const lint = () => (
  gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

const preTest = () => (
  gulp.src(['generators/**/*.js', '!generators/**/templates/*.js'])
    .pipe(excludeGitignore())
    .pipe(istanbul({ includeUntested: true }))
    .pipe(istanbul.hookRequire())
);

const runTest = () => (
  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec'}))
    .on('error', (error) => { console.log(error); })
    .pipe(istanbul.writeReports())
);

const test = gulp.series(preTest, runTest);

exports.lint = lint;
exports.test = test
exports.default = gulp.series(lint, test);
