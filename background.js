function updateIcon() {
  browser.proxy.settings.get({}).then(function(fetched) {
    let newSetting = fetched.value;
    if (newSetting.proxyType === "none") {
      browser.browserAction.setIcon({
        "path": {
          "32": "proxy_off.svg",
          "64": "proxy_off.svg",
        }
      });
      browser.browserAction.setTitle({
        title: "Proxy off"
      });
    }
    else {
      browser.browserAction.setIcon({
        "path": {
          "32": "proxy_on.svg",
          "64": "proxy_on.svg",
        }
      });
      browser.browserAction.setTitle({
        title: "Proxy on"
      });
    }
  });
}

function toggleProxy() {
  browser.proxy.settings.get({}).then(function(fetched) {
    let newSetting = fetched.value;
    if (newSetting.proxyType === "none") {
      newSetting.proxyType = "manual"
      browser.proxy.settings.set({
        value: newSetting
      });
    }
    else {
      newSetting.proxyType = "none";
      browser.proxy.settings.set({
        value: newSetting
      });
    }
    updateIcon();
  });
}

browser.proxy.settings.clear({}).then(function(){
  updateIcon();
});

browser.browserAction.onClicked.addListener(toggleProxy);
