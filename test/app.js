const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('app', () => {
  before(() =>
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test-app',
        author: 'tester',
        githubUsername: 'tester',
        gitRepo: 'testrepo'
      })
      .toPromise()
  );

  describe('app', () => {
    it('creates files', () => {
      assert.file([
        'src/bootstrap.jsx',
        'public/index.html',
        'package.json',
        'config/webpack.config.dev.js'
      ]);
    });
  });
});
