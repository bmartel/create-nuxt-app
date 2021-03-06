const path = require("path");

class CssExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-_:/]+/g) || [];
  }
}

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

const resolve = dir => path.join(__dirname, "..", dir);

module.exports = {
  ensureSlash,
  resolve,
  CssExtractor
};
