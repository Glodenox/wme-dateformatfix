// ==UserScript==
// @name        WME Date Format Fix
// @namespace   http://www.tomputtemans.com/
// @description Fixes the date format if it is still missing or allows you to override the default date format
// @include     /^https:\/\/(www|beta)\.waze\.com\/(?!user\/)(.{2,6}\/)?editor\/.*$/
// @version     0.0.4
// @grant       none
// ==/UserScript==
(function() {
  function init() {
    if (typeof I18n === 'undefined') {
      log('No internationalisation object found yet, snoozing');
      setTimeout(init, 300);
      return;
    }
    fixDateFormat();
  }
  
  function fixDateFormat() {
    try {
      var dateFormat = I18n.translations.en.date.formats.long;
      var timeFormat = I18n.translations.en.time.formats.long;
      if (dateFormat && timeFormat) {
        return;
      }
    } catch (e) {
      // see http://www.cplusplus.com/reference/ctime/strftime/ for the supported format specifiers
      addFormat('en', '%a %b %d, %H:%M (%z)');
      addFormat('nl', '%a %d %b, %H:%M (%z)');
      addFormat('fr', '%a %d %b, %H:%M (%z)');
    }
  }
  
  function addFormat(locale, format) {
    if (I18n.translations[locale]) {
      if (!I18n.translations[locale].date) {
        I18n.translations[locale].date = {};
      }
      if (!I18n.translations[locale].date.formats) {
        I18n.translations[locale].date.formats = {};
      }
      I18n.translations[locale].date.formats.long = format;
      
      if (!I18n.translations[locale].time) {
        I18n.translations[locale].time = {};
      }
      if (!I18n.translations[locale].time.formats) {
        I18n.translations[locale].time.formats = {};
      }
      I18n.translations[locale].time.formats.long = format;
    }
  }

  init();
})();
