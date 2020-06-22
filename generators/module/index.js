/* eslint-disable arrow-parens */
/* eslint-disable no-return-await */
const Generator = require('yeoman-generator');
const rename = require('gulp-rename');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const getModules = require('../../utils/get-modules');
const toCamel = require('../../utils/to-camel');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...');
  }

  async prompting() {
    const modules = getModules(this.contextRoot);

    var prompts = [{
      type: 'input',
      name: 'moduleName',
      message: 'What would you like to name this module?',
      default: 'new-module'
    }];

    const prompt = async () => await this.prompt(prompts).then(async (props) => {
      if (modules.includes(props.moduleName)) {
        this.log(`${chalk.red(props.moduleName)} already exists! Please choose another name.`);
        return await prompt();
      }

      return props;
    });
    const props = await prompt();
    const camelName = toCamel(props.moduleName);
    this.props = {
      ...props,
      camelName,
      importName: `${camelName.charAt(0).toLowerCase()}${camelName.slice(1)}`
    };
  }

  writing() {
    const {props} = this;
    this.destinationRoot('src/');
    this.registerTransformStream(rename((path) => {
      path.basename = path.basename
        .replace(/(%Name%)/g, props.camelName)
        .replace(/(%moduleName%)/g, props.moduleName);
      path.dirname = path.dirname
        .replace(/(%Name%)/g, props.camelName)
        .replace(/(%moduleName%)/g, props.moduleName);
    }));
    this.fs.copyTpl(
      this.templatePath(),
      this.destinationPath(),
      this.props
    );

    // Add new reducer to the root reducers file
    const reducerPath = path.join(this.contextRoot, 'src/reducers.js');
    const content = fs.readFileSync(reducerPath, 'utf-8');
    const nameImport = this.props.camelName.toUpperCase();
    const newReducerImport = `\nimport { NAME as ${nameImport}, reducer as ${this.props.importName} } from './${this.props.moduleName}';`;
    const newReducerLine = `  [${nameImport}]: ${this.props.importName},`;
    const importRegex = /import \{ NAME as [A-Z]+, reducer as [a-zA-Z]+ \} from '\.\/[a-z\-]+';/g;
    const reducerObjectLine = / {2}\[[A-Z]+\]: [A-Za-z]+,/g;
    const objLines = content.match(reducerObjectLine);
    const lastObjLine = objLines[objLines.length - 1];
    const imports = content.match(importRegex);
    const lastImport = imports[imports.length - 1];
    let newFileContent = content
      .replace(lastImport, `${lastImport}${newReducerImport}`)
      .replace(lastObjLine, `${lastObjLine}\n${newReducerLine}`);
    fs.truncateSync(reducerPath);
    fs.writeFileSync(reducerPath, newFileContent, {encoding: 'utf-8'});
  }

  end() {
    this.log(`${chalk.green('Successfully')} created ${chalk.yellow(this.props.moduleName)}`);
  }
};
