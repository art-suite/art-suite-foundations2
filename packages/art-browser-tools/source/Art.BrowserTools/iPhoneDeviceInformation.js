"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let Math = global.Math,
    iPhonePointSizes,
    iPhoneNotchSafePadding,
    iPhoneNotchSizes,
    iPhoneDisplayScales,
    iPhoneDiagonalSizeInches,
    iPhonePixelsPerInch,
    iPhonePixelSizes;
  return {
    iPhonePointSizes: (iPhonePointSizes = {
      iPhone4: [320, 480],
      iPhone5: [320, 568],
      iPhone6: [375, 667],
      iPhoneX: [375, 812],
      iPhone6Plus: [414, 736],
      iPhoneXSMax: [414, 896],
      iPhoneXR: [414, 896],
    }),
    iPhoneNotchSafePadding: (iPhoneNotchSafePadding = { top: 44, bottom: 21 }),
    iPhoneNotchSizes: (iPhoneNotchSizes = {
      iPhoneX: 30,
      iPhoneXSMax: 30,
      iPhoneXR: 30,
    }),
    iPhoneDisplayScales: (iPhoneDisplayScales = {
      iPhone4: 2,
      iPhone5: 2,
      iPhone6: 2,
      iPhone6Plus: 3,
      iPhoneX: 3,
      iPhoneXSMax: 3,
      iPhoneXR: 2,
    }),
    iPhoneDiagonalSizeInches: (iPhoneDiagonalSizeInches = {
      iPhone4: 3.5,
      iPhone5: 4,
      iPhone6: 4.7,
      iPhone6Plus: 5.5,
      iPhoneX: 5.8,
      iPhoneXSMax: 6.5,
      iPhoneXR: 6.1,
    }),
    iPhonePixelsPerInch: (iPhonePixelsPerInch = {
      iPhone4: 326,
      iPhone5: 326,
      iPhone6: 326,
      iPhone6Plus: 401,
      iPhoneX: 458,
      iPhoneXSMax: 458,
      iPhoneXR: 326,
    }),
    iPhonePixelSizes: (iPhonePixelSizes = Caf.object(
      iPhoneDisplayScales,
      (pixelsPerPoint, model) => {
        let x, y;
        [x, y] = iPhonePointSizes[model];
        return [x * pixelsPerPoint, y * pixelsPerPoint];
      }
    )),
    iPhonePointsPerInch: Caf.object(
      iPhonePointSizes,
      ([x, y], model) =>
        Math.sqrt(x * x + y * y) / iPhoneDiagonalSizeInches[model]
    ),
  };
});
