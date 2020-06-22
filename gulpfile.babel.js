import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
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
  gulp.src(['generators/**/index.js', '!generators/**/templates/**/*.js'])
    .pipe(excludeGitignore())
);

const runTest = () => (
  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    // eslint-disable-next-line brace-style
    .on('error', error => { console.log(error); })
);

const test = gulp.series(preTest, runTest);

exports.lint = lint;
exports.test = test;
exports.default = gulp.series(lint, test);
