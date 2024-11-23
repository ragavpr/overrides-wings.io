class Tracking {
  sendLoadingTime() {
    if (!window.didSendLoadingTime) {
      let ev = +new Date() - window.startTime;
      window.stats && console.log("ltct " + ev);
      window.mixpanel.track("Load Time To Play", {
        deltatime: ev,
        domain: window.location.hostname,
      });
      window.didSendLoadingTime = true;
    }
  }
}

const tracking = new Tracking();
export default tracking;

window.mixpanel &&
  window.mixpanel.init("208ce64093308da8075ba320f97c12fd", {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
  });
