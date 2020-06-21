const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    this.log('initializing...');
  }
  start() {
    this.log('Starting...');
  }
  prompting() {
    this.log(yosay(
      `Welcome to the spectacular ${chalk.red('modular-react-redux')} generator!`
    ));
  
    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What would you like to name this project?',
      default: this.appname.replace(' ', '-'),
    }, {
      type: 'input',
      name: 'author',
      message: 'Authors name?',
      default: '',
    }, {
      type: 'input',
      name: 'githubUsername',
      message: 'Github username?',
      default: 'githubusername',
    }];
    return this.prompt(prompts).then((props) => {
      var repoPrompts = [{
        type: 'input',
        name: 'repo',
        message: 'Github repo url?',
        default: `https://github.com/${props.githubUsername}/${props.name}.git`,
      }];
  
      return this.prompt(repoPrompts).then((gitProps) => {
        this.props = { ...props, ...gitProps };
      });
    });
  }
  writing() {
    this.fs.copyTpl(
      this.templatePath('**/*'),
      this.destinationRoot(),
      this.props,
      {},
      { globOptions: { dot: true } }
    )
  }
  install() {
    this.installDependencies();
  }
  end() {
    this.spawnCommand('npm', ['run', 'dev']);
  }
};
