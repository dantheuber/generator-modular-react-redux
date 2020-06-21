/* eslint-disable no-param-reassign */

/*
  HTML Webpack Plugin Extension which moves the specified scripts to the head of the page.

 Use case:
  Manually placing scripts using a template requires disabling the inject feature,
  in turn not allowing other html webpack plugin extensions to add their changes
  since no assets are ever injected by the html webpack plugin.

 Options:

 {
   headScripts: (Array<String>)
 }
*/

const isMatchingScriptTag = (tag, scriptName) => tag.tagName === 'script' && tag.attributes.src && tag.attributes.src.includes(scriptName);

class MoveScriptExtHtmlWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const {
      headScripts,
    } = this.options;

    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, cb) => {
        const toMoveToHead = [];
        headScripts.forEach((scriptName) => {
          htmlPluginData.head = htmlPluginData.head.filter((tag) => {
            if (isMatchingScriptTag(tag, scriptName)) {
              toMoveToHead.push(tag);
              return false;
            }
            return true;
          });
          htmlPluginData.body = htmlPluginData.body.filter((tag) => {
            if (isMatchingScriptTag(tag, scriptName)) {
              toMoveToHead.push(tag);
              return false;
            }
            return true;
          });
        });
        htmlPluginData.head = [...toMoveToHead, ...htmlPluginData.head];
        cb(null, htmlPluginData);
      });
    });
  }
}

module.exports = MoveScriptExtHtmlWebpackPlugin;
