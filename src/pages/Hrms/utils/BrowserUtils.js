const getBrowserInfo = () => {
  var agent = navigator.userAgent.toLowerCase();

  var regStr_ie = /msie [\d.]+;/gi;
  var regStr_ff = /firefox\/[\d.]+/gi;
  var regStr_chrome = /chrome\/[\d.]+/gi;
  var regStr_saf = /safari\/[\d.]+/gi;
  var regStr_saf = /opera\/[\d.]+/gi;
  //IE
  if (agent.indexOf('msie') > 0) {
    return 'msie: ' + agent.match(regStr_ie);
  }

  //firefox
  if (agent.indexOf('firefox') > 0) {
    return 'firefox: ' + agent.match(regStr_ff);
  }

  //Chrome
  if (agent.indexOf('chrome') > 0) {
    return 'chrome: ' + agent.match(regStr_chrome);
  }

  //Safari
  if (agent.indexOf('safari') > 0) {
    return 'safari: ' + agent.match(regStr_saf);
  }

  //opera
  if (agent.indexOf('opera') > 0) {
    return 'opera: ' + agent.match(regStr_saf);
  }
};

const detectOS = function() {
  var sUserAgent = navigator.userAgent;
  var isWin = navigator.platform == 'Win32' || navigator.platform == 'Windows';
  var isMac =
    navigator.platform == 'Mac68K' ||
    navigator.platform == 'MacPPC' ||
    navigator.platform == 'Macintosh' ||
    navigator.platform == 'MacIntel';
  if (isMac) return 'Mac';
  var isUnix = navigator.platform == 'X11' && !isWin && !isMac;
  if (isUnix) return 'Unix';
  var isLinux = String(navigator.platform).indexOf('Linux') > -1;
  var bIsAndroid = sUserAgent.toLowerCase().match(/android/i) == 'android';
  if (isLinux) {
    if (bIsAndroid) return 'Android';
    else return 'Linux';
  }

  if (isWin) {
    var isWin2K =
      sUserAgent.indexOf('Windows NT 5.0') > -1 || sUserAgent.indexOf('Windows 2000') > -1;
    if (isWin2K) return 'Win2000';

    var isWinXP =
      sUserAgent.indexOf('Windows NT 5.1') > -1 || sUserAgent.indexOf('Windows XP') > -1;
    sUserAgent.indexOf('Windows XP') > -1;
    if (isWinXP) return 'WinXP';

    var isWin2003 =
      sUserAgent.indexOf('Windows NT 5.2') > -1 || sUserAgent.indexOf('Windows 2003') > -1;
    if (isWin2003) return 'Win2003';

    var isWinVista =
      sUserAgent.indexOf('Windows NT 6.0') > -1 || sUserAgent.indexOf('Windows Vista') > -1;
    if (isWinVista) return 'WinVista';

    var isWin7 = sUserAgent.indexOf('Windows NT 6.1') > -1 || sUserAgent.indexOf('Windows 7') > -1;
    if (isWin7) return 'Win7';

    var isWin8 = sUserAgent.indexOf('windows nt6.2') > -1 || sUserAgent.indexOf('Windows 8') > -1;
    if (isWin8) return 'Win8';

    var isWin10 =
      sUserAgent.indexOf('windows nt 10.0') > -1 || sUserAgent.indexOf('Windows 10') > -1;
    if (isWin10) return 'Win10';
  }
  return 'Other';
};

const digits = function() {
  var agent = navigator.userAgent.toLowerCase();
  var sUserAgent = navigator.userAgent;
  var sUserAgent = navigator.userAgent;
  var is64 = sUserAgent.indexOf('WOW64') > -1 || sUserAgent.indexOf('WIN64') > -1;
  if (is64) {
    return '64';
  } else {
    return '32';
  }
};

export const osInfo = {
  browser: (getBrowserInfo() + '').replace(/[^0-9.]/gi, ''),
  os: detectOS(),
  digits: digits(),
};
