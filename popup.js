'use strict';
var frequecyValue = 7;
var blinkr = {
  blinkrOn : function() {
    chrome.alarms.get("blinkr", function (alarm) {
      if (typeof alarm !== 'undefined') {
        chrome.alarms.clear("blinkr");
      }
      chrome.alarms.create("blinkr", {delayInMinutes: 0.1, periodInMinutes: Number(frequecyValue)});
    });
    chrome.storage.local.set({"blinkstatus": "on"}, function() {
    });
    window.close();
  },

  blinkrOff : function() {
    chrome.alarms.clear("blinkr");
    chrome.storage.local.set({"blinkstatus": "off"}, function() {
    });
    window.close();
  },

  blinkFreq: function() {
    frequecyValue = document.getElementById('inputtime').value;
    chrome.storage.local.set({"blinkrfreq": frequecyValue}, function() {
    });
    blinkr.blinkrOn();
  },

  setup: function() {
    document.getElementById('blinkrOn').addEventListener('click', blinkr.blinkrOn);
    document.getElementById('blinkrOff').addEventListener('click', blinkr.blinkrOff);
    document.getElementById('time').addEventListener('click', blinkr.blinkFreq);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  chrome.storage.local.get(["blinkrfreq", "blinkstatus"], function (values) {
    if (typeof values.blinkrfreq !== 'undefined') {
      frequecyValue = values.blinkrfreq;
      document.getElementById('inputtime').value = frequecyValue;
    } else {
      document.getElementById('inputtime').value = frequecyValue;
    }
    if (typeof values.blinkstatus !== 'undefined') {
      if (values.blinkstatus === "on") {
        document.getElementById('blinkrOff').removeAttribute('disabled');
        document.getElementById('blinkrOn').setAttribute('disabled', 'disabled');
      } else {
        document.getElementById('blinkrOn').removeAttribute('disabled');
        document.getElementById('blinkrOff').setAttribute('disabled', 'disabled');
      }
    } else {
      document.getElementById('blinkrOn').removeAttribute('disabled');
      document.getElementById('blinkrOff').setAttribute('disabled', 'disabled');
    }
  });
  blinkr.setup();
});