chrome.app.runtime.onLaunched.addListener(() => {
  chrome.app.window.create('index.html', {
    id: 'rnlogmonitor-window',
    innerBounds: {
      width: 800,
      height: 600
    }
  });
});
