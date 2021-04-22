/* eslint-disable prettier/prettier */
//  This file using require.context() to get in all of the folder recursively and
//  require all the en.js and vi.js files

//  Deleting any file in the folder structure cause some file not found error in the runtime,
//  to fix that, just re-save this file

const en = {};
const vi = {};

// See docs: https://webpack.js.org/guides/dependency-management/#context-module-api

const globs = import.meta.glob("./**/index.ts");

Object.keys(globs).forEach((fileName) => {
  const module = globs[fileName];

  const temp = fileName
    .replace(/(\.\/|\.ts)/g /* Remove "./" and ".js" */, "")
    .split("/");
  const moduleName = temp.length > 1 ? temp[temp.length - 2] : temp[0];

  switch (temp[temp.length - 1]) {
    case "en":
      en[moduleName] = module;
      break;
    case "vi":
      vi[moduleName] = module;
      break;
    default:
      break;
  }
});

export default { en, vi };
