"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "getEnv",
      "iPhoneNotchSizes",
      "min",
      "isMobileBrowserRegExp1",
      "isNumber",
      "iPhoneNotchSafePadding",
      "parseInt",
      "merge",
      "isWebSpiderRegExp",
      "max",
      "log",
    ],
    [
      global,
      require("./StandardImport"),
      require("./iPhoneDeviceInformation"),
      require("./UseragentRegExp"),
    ],
    (
      getEnv,
      iPhoneNotchSizes,
      min,
      isMobileBrowserRegExp1,
      isNumber,
      iPhoneNotchSafePadding,
      parseInt,
      merge,
      isWebSpiderRegExp,
      max,
      log
    ) => {
      let window,
        document,
        screen,
        CSS,
        navigator,
        opera,
        devicePixelRatio,
        userRequestedFakeNativeApp,
        fakeNativeApp,
        smallestTabletDeviceWidth,
        BrowserDetection,
        temp,
        temp1;
      temp = global;
      window = temp.window;
      document = temp.document;
      screen = temp.screen;
      CSS = temp.CSS;
      navigator = temp.navigator;
      opera = temp.opera;
      devicePixelRatio =
        undefined !== (temp1 = temp.devicePixelRatio) ? temp1 : 1;
      userRequestedFakeNativeApp = fakeNativeApp = !!(
        getEnv().fakeNative ||
        getEnv().fakeNativeApp ||
        getEnv().nativePreview
      );
      smallestTabletDeviceWidth = 600;
      return (BrowserDetection = Caf.defClass(
        class BrowserDetection extends Object {},
        function (BrowserDetection, classSuper, instanceSuper) {
          let getAgent,
            artBrowserUserAgent,
            getIsMobileBrowser,
            _safeAreaInsetCssKey,
            simpleBrowserInfo,
            simpleBrowserInfoDepricationWarning;
          this.isBrowser = !!navigator;
          this.getAgent = getAgent = function () {
            return (
              (Caf.exists(navigator) && navigator.userAgent) ||
              (Caf.exists(navigator) && navigator.vendor) ||
              opera ||
              ""
            );
          };
          this.getMaxCanvasPixels = () =>
            this.simpleBrowserInfo.os === "iOS"
              ? 16777216
              : 64 * Caf.pow(1024, 2);
          this.getHasIPhoneXNotch = function (
            subDevice = simpleBrowserInfo.subDevice
          ) {
            return iPhoneNotchSizes[subDevice] > 0;
          };
          this.getNotchInfo = (subDevice = simpleBrowserInfo.subDevice) => {
            let notchWidth, temp2;
            return this.getHasIPhoneXNotch(subDevice)
              ? {
                  notchHeight:
                    (temp2 = iPhoneNotchSizes[subDevice]) != null ? temp2 : 30,
                  notchWidth: (notchWidth = 209),
                  roundedCornerRadius: 40,
                  antiNotchWidth:
                    (min(screen.availWidth, screen.availHeight) - notchWidth) /
                    2,
                  notchLocation: this.getOrientationIsPortrait()
                    ? "top"
                    : this.getOrientationAngle() === 90
                    ? "left"
                    : "right",
                }
              : undefined;
          };
          artBrowserUserAgent = getAgent();
          getIsMobileBrowser = function () {
            return isMobileBrowserRegExp1.test(artBrowserUserAgent);
          };
          this.getClientWidth = function () {
            let temp2;
            return ((temp2 = document.documentElement) != null
              ? temp2
              : document.body
            ).clientWidth;
          };
          this.getClientHeight = function () {
            let temp2;
            return ((temp2 = document.documentElement) != null
              ? temp2
              : document.body
            ).clientWidth;
          };
          this.getOrientationAngle = function () {
            let temp2, base;
            return (temp2 =
              Caf.exists(screen) &&
              Caf.exists((base = screen.orientation)) &&
              base.angle) != null
              ? temp2
              : global.orientation;
          };
          this.getOrientationIsPortrait = (viewSize) => {
            let o;
            return (() => {
              switch (false) {
                case !isNumber((o = this.getOrientationAngle())):
                  return o % 180 === 0;
                case !(viewSize != null):
                  return viewSize.x <= viewSize.y;
                default:
                  return true;
              }
            })();
          };
          this.getScreenSize = (viewSize) => {
            let orientationIsLandscape, availWidth, availHeight, temp2;
            orientationIsLandscape = !this.getOrientationIsPortrait(viewSize);
            temp2 = global.screen;
            availWidth = temp2.availWidth;
            availHeight = temp2.availHeight;
            return (orientationIsLandscape && availHeight > availWidth) ||
              (!orientationIsLandscape && availHeight < availWidth)
              ? { x: availHeight, y: availWidth }
              : { x: availWidth, y: availHeight };
          };
          _safeAreaInsetCssKey = null;
          this.getSafeAreaInsetCssKey = function () {
            return _safeAreaInsetCssKey != null
              ? _safeAreaInsetCssKey
              : (_safeAreaInsetCssKey =
                  CSS != null &&
                  (() => {
                    switch (false) {
                      case !CSS.supports(
                        "padding-bottom: env(safe-area-inset-bottom)"
                      ):
                        return "env";
                      case !CSS.supports(
                        "padding-bottom: constant(safe-area-inset-bottom)"
                      ):
                        return "constant";
                    }
                  })());
          };
          this.getCssSafeAreaInset = () => {
            let top, bottom, key, div, computedStyle, result;
            return fakeNativeApp && this.getHasIPhoneXNotch()
              ? (((top = iPhoneNotchSafePadding.top),
                (bottom = iPhoneNotchSafePadding.bottom)),
                this.getOrientationIsPortrait()
                  ? { left: 0, right: 0, top, bottom }
                  : { left: top, right: bottom, top: 0, bottom })
              : ((key = this.getSafeAreaInsetCssKey())
                  ? ((div = document.createElement("div")),
                    (div.style.paddingTop = `${Caf.toString(
                      key
                    )}(safe-area-inset-top)`),
                    (div.style.paddingLeft = `${Caf.toString(
                      key
                    )}(safe-area-inset-left)`),
                    (div.style.paddingRight = `${Caf.toString(
                      key
                    )}(safe-area-inset-right)`),
                    (div.style.paddingBottom = `${Caf.toString(
                      key
                    )}(safe-area-inset-bottom)`),
                    document.body.appendChild(div),
                    (computedStyle = window.getComputedStyle(div)),
                    (result = {
                      top: parseInt(computedStyle.paddingTop) | 0,
                      left: parseInt(computedStyle.paddingLeft) | 0,
                      right: parseInt(computedStyle.paddingRight) | 0,
                      bottom: parseInt(computedStyle.paddingBottom) | 0,
                    }),
                    document.body.removeChild(div))
                  : (result = { top: 0, left: 0, right: 0, bottom: 0 }),
                result.top === 0 &&
                simpleBrowserInfo.os === "iOS" &&
                simpleBrowserInfo.nativeApp &&
                (simpleBrowserInfo.device === "iPad" ||
                  this.getOrientationIsPortrait())
                  ? merge(result, { top: 20 })
                  : result);
          };
          simpleBrowserInfo = null;
          this.getCachedSimpleBrowserInfo = () =>
            (this.simpleBrowserInfo =
              simpleBrowserInfo != null
                ? simpleBrowserInfo
                : (simpleBrowserInfo = this.getSimpleBrowserInfo()));
          this.getSimpleBrowserInfo = !this.isBrowser
            ? function () {
                return {};
              }
            : () => {
                let detectedOs,
                  iOS,
                  windowsPhone,
                  windows,
                  osx,
                  android,
                  linux,
                  webSpider,
                  ie11,
                  firefox,
                  safari,
                  edge,
                  chrome,
                  nativeApp,
                  device,
                  touch,
                  deviceMajorScreenSize,
                  deviceMinorScreenSize,
                  temp2;
                artBrowserUserAgent = getAgent();
                return (this.simpleBrowserInfo = simpleBrowserInfo = {
                  devicePixelRatio,
                  pixelsPerPoint: devicePixelRatio,
                  os: (detectedOs = (() => {
                    switch (false) {
                      case !(iOS = /ipad|ipod|iphone/i.test(
                        artBrowserUserAgent
                      )):
                        return "iOS";
                      case !(windowsPhone = /Windows Phone/i.test(
                        artBrowserUserAgent
                      )):
                        return "windowsPhone";
                      case !(windows = /windows/i.test(artBrowserUserAgent)):
                        return "windows";
                      case !(osx = /mac os x/i.test(artBrowserUserAgent)):
                        return "osx";
                      case !(android = /android/i.test(artBrowserUserAgent)):
                        return "android";
                      case !(linux = /linux/.test(artBrowserUserAgent)):
                        return "linux";
                      default:
                        return "other";
                    }
                  })()),
                  browser: (() => {
                    switch (false) {
                      case !(webSpider = isWebSpiderRegExp.test(
                        artBrowserUserAgent
                      )):
                        return "webSpider";
                      case !(ie11 =
                        !!window.MSInputMethodContext &&
                        !!document.documentMode):
                        return "ie11";
                      case !(firefox = !!window.InstallTrigger):
                        return "firefox";
                      case !(safari =
                        iOS ||
                        /^((?!chrome|android).)*safari/i.test(
                          artBrowserUserAgent
                        )):
                        return "safari";
                      case !(edge = /Edge/.test(artBrowserUserAgent)):
                        return "edge";
                      case !(opera =
                        window.opera != null ||
                        /\ OPR\//.test(artBrowserUserAgent)):
                        return "opera";
                      case !(chrome = /Chrome\/\d/i.test(artBrowserUserAgent)):
                        return "chrome";
                      default:
                        return "other";
                    }
                  })(),
                  fakeNativeApp: (fakeNativeApp =
                    userRequestedFakeNativeApp &&
                    (detectedOs === "android" || detectedOs === "iOS")),
                  nativeApp: (nativeApp = !!(fakeNativeApp || global.cordova)),
                  device: (device = (() => {
                    switch (false) {
                      case !/iphone|ipod/i.test(artBrowserUserAgent):
                        return "iPhone";
                      case !/ipad/i.test(artBrowserUserAgent):
                        return "iPad";
                      default:
                        return "other";
                    }
                  })()),
                  touch: (touch =
                    document.documentElement.ontouchstart != null ||
                    getIsMobileBrowser()),
                  deviceMajorScreenSize: (deviceMajorScreenSize = max(
                    screen.availWidth,
                    screen.availHeight
                  )),
                  deviceMinorScreenSize: (deviceMinorScreenSize = min(
                    screen.availWidth,
                    screen.availHeight
                  )),
                  subDevice:
                    (temp2 = (() => {
                      switch (device) {
                        case "iPhone":
                          return Caf.find(
                            require("./iPhoneDeviceInformation")
                              .iPhonePointSizes,
                            ([w, h], iPhoneName) => iPhoneName,
                            ([w, h], iPhoneName) =>
                              w === deviceMinorScreenSize &&
                              h === deviceMajorScreenSize
                          );
                      }
                    })()) != null
                      ? temp2
                      : "other",
                  deviceType: touch
                    ? deviceMinorScreenSize < smallestTabletDeviceWidth
                      ? "phone"
                      : "tablet"
                    : "desktop",
                });
              };
          this.simpleBrowserInfo = this.getSimpleBrowserInfo();
          this.getIsMobileBrowser = getIsMobileBrowser;
          simpleBrowserInfoDepricationWarning = function () {
            return log.warn("DEPRICATED - use simpleBrowserInfo directly");
          };
          this.isSafari = function () {
            simpleBrowserInfoDepricationWarning();
            return !!simpleBrowserInfo.safari;
          };
          this.isMobileBrowser = () => {
            log.warn("isMobileBrowser DEPRICATED - use getIsMobileBrowser");
            return this.getIsMobileBrowser();
          };
          this.nativeAppDetect = function () {
            simpleBrowserInfoDepricationWarning();
            return !!simpleBrowserInfo.nativeApp;
          };
          this.isTouchDevice = function () {
            simpleBrowserInfoDepricationWarning();
            return !!simpleBrowserInfo.touch;
          };
          this.iOSDetect = function () {
            simpleBrowserInfoDepricationWarning();
            return simpleBrowserInfo.os === "iOS";
          };
          this.androidDetect = function () {
            simpleBrowserInfoDepricationWarning();
            return simpleBrowserInfo.os === "android";
          };
          this.iPhoneDetect = function () {
            simpleBrowserInfoDepricationWarning();
            return simpleBrowserInfo.device === "iPhone";
          };
          this.iPadDetect = function () {
            simpleBrowserInfoDepricationWarning();
            return simpleBrowserInfo.device === "iPad";
          };
          this.isIe11 = function () {
            simpleBrowserInfoDepricationWarning();
            return simpleBrowserInfo.browser === "ie11";
          };
        }
      ));
    }
  );
});
