class Ads {
  int_ads_refreshed = 0;
  #is_adReady = true;
  next_adTimeout_6s = 2;
  func_showAds() {
    window.mixpanel &&
    window.mixpanel.track("Ad Impression Opportunity", {
      domain: window.location.hostname,
    });
  if (null != adsense && adsense)
    0 == this.int_ads_refreshed &&
      cpmstarAPI({
        kind: "createmodule",
        module: "anchor78670",
        config: {
          kind: "anchor",
          options: {
            dir: 1,
            width: "1050px",
          },
          request: {
            poolid: "78670",
            kind: "banner",
          },
        },
      }),
      window.googletag &&
        (window.googletag.cmd.push(() => {
          this.#is_adReady &&
            ((this.#is_adReady = false),
            setTimeout(() => {
              this.#is_adReady = true;
            }, 6e4 * this.next_adTimeout_6s),
            window.googletag &&
              window.googletag.pubads &&
              window.googletag.pubads().refresh &&
              window.googletag.pubads().refresh(window.ads));
        }),
        this.int_ads_refreshed++);
  else {
    $("#mpu-top").show();
    let b = $("#ldr-top");
    b && b.show();
    refreshSlots();
  }
}
}

const ads = new Ads();
export default ads;

// null != adsense && adsense && ads.func_showAds();