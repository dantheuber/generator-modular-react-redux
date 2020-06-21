import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';

describe('generator-modular-react-redux:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test-app',
        author: 'tester',
        githubUsername: 'tester',
        gitRepo: 'testrepo'
      })
      .toPromise();
  });

  it('creates files', () => {
    assert.file([
      'public/index.html',
      'package.json',
      'webpack.config.js',
    ]);
  });
});
