const fs = require('fs');
const path = require('path');

module.exports = (context) => {
  const srcPath = path.join(context, 'src');

  return fs.readdirSync(srcPath)
    .filter((file) => {
      const filePath = path.join(srcPath, file);
      return fs.statSync(filePath).isDirectory();
    });
};
