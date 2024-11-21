import { EventManager } from "./lib/EventManager";
import { ParticleDust } from "./lib/ParticleDust";
let Zb,
  $b,
  bool_isHttps = "https:" == window.location.protocol,
  int_pathMobile = window.location.pathname.indexOf("mobile"),
  num_global_physics_step_ms = (1e3 / 30) * 3,
  list_decal_colors = [
    {
      r: 255,
      g: 0,
      b: 0,
    },
    {
      r: 255,
      g: 119,
      b: 0,
    },
    {
      r: 255,
      g: 202,
      b: 0,
    },
    {
      r: 174,
      g: 231,
      b: 24,
    },
    {
      r: 0,
      g: 119,
      b: 255,
    },
    {
      r: 236,
      g: 19,
      b: 213,
    },
  ],
  ha = 2,
  gb = 0,
  hb = 0,
  ma = 0,
  objG_inputManager,
  qc = 0,
  rc = 0,
  H,
  ca = {},
  Ka,
  ib,
  Kb = 1,
  Z = false,
  wa = true,
  Lb = false,
  T = 0,
  Mb = 0,
  E = 1600,
  Nb = E / 2 - 100,
  $_sub = 5e3,
  ka = 1,
  bool_following_plane = true,
  numG_player_count = 0,
  Xa = 0,
  bool_hideCustomization = false,
  int_pixel_ratio = 1,
  intG_color_id = 0,
  intG_decal_id = 0,
  qa = 0,
  sc = 0,
  bool_continueGame = false,
  Eb,
  nc = 0,
  num_max_volume = 1,
  num_setting_muteVol = window.localStorage.muteVol,
  tc = 3,
  uc = 750,
  vc = 5,
  wc = 10,
  xc = 20,
  yc = 150,
  num_scale_factor = 1,
  kb = 0,
  zc = 0,
  Ac = 0.3,
  La = false,
  Ma = null,
  bool_setting_highQuality = true,
  lb = false,
  mb,
  ia,
  na,
  nb,
  Cb = true,
  lc = 2,
  xa = false,
  int_ads_refreshed = 0,
  bool_drawClouds = true,
  bool_drawWater = true,
  bool_drawExplosions = true,
  bool_drawSun = true,
  bool_drawItems = true,
  bool_drawTrails = true,
  bool_drawSplashes = true,
  bool_drawGradient = true,
  bool_drawUI = true,
  objG_followMode,
  objG_animationManager,
  objG_assets,
  objG_wsConnection,
  objD_pickups = {},
  objD_planes = {},
  objD_specialEntities = {},
  objD_missiles = {},
  list_str_leaderboard_players = [],
  objG_player_plane,
  ra,
  Qb,
  Oa = 0,
  objGUI_anchor,
  objGUI_gameInfo,
  obj_particleImpacts,
  objG_backgrounds,
  objG_sfxManager,
  Za = {},
  ub = 0,
  objG_eventManager,
  list_particleDust,
  obj_browserQueryParams = {},
  eb = false,
  str_conutryCode = null,
  str_browser_user_agent = window.navigator.userAgent,
  bool_internet_explorer =
    -1 < str_browser_user_agent.indexOf("MSIE ") ||
    -1 < str_browser_user_agent.indexOf("Trident/"),
  timeout_ws_conn,
  Sb = false,
  str_font_name = "Arial Black",
  id_weapon_machinegun = 1,
  id_weapon_trishoot = 2,
  id_weapon_missile = 4,
  id_weapon_railgun = 8,
  id_weapon_superweapon = 16,
  id_weapon_punch = 128,
  id_weapon_bombs = 256,
  str_sfxid_shot = "shot",
  str_sfxid_laser = "laser",
  str_sfxid_kinglaser = "kinglaser",
  str_sfxid_trishot = "trishot",
  str_sfxid_rail = "rail",
  str_sfxid_mlaunch = "mlaunch",
  str_sfxid_mexpl = "mexpl",
  str_sfxid_mexpl2 = "mexpl",
  str_sfxid_phit = "phit",
  str_sfxid_weapgrab = "weapgrab",
  str_sfxid_hgrab = "hgrab",
  str_sfxid_winggrab = "winggrab",
  str_sfxid_warn = "warn",
  str_sfxid_lockon = "lockon",
  str_sfxid_king = "king",
  str_sfxid_planeloop = "planeloop",
  str_sfxid_waterloop = "waterloop",
  str_sfxid_env = "env",
  str_sfxid_bigsplash = "bigsplash",
  str_sfxid_crash = "crash",
  str_sfxid_lasershot = "lasershot",
  str_sfxid_laserloop = "laserloop",
  str_sfxid_woosh = "woosh",
  str_sfxid_cannonshoot = "cannonshoot",
  str_sfxid_empty = "",
  const_Q_0 = 0,
  const_Sa_3 = 3,
  num_sound_max_distance = 600,
  id_entity_warship = 1,
  id_entity_asteroid = 2,
  const_Ic_0 = 0,
  gameSheetInfo = [
    ["bomb", 522, 34, 11, 8, 0.545, 0.5],
    ["bombdrop", 887, 196, 23, 23, 0.5, 0.5],
    ["crown", 775, 232, 23, 19, 0.5, 0.5],
    ["decal0_1", 991, 205, 30, 9, 0.417, 0.556],
    ["decal0_2", 1023, 210, 29, 8, 0.397, 0.5],
    ["decal0_3", 991, 231, 27, 12, 0.352, 0.5],
    ["decal0_4", 241, 239, 28, 15, 0.375, 0.467],
    ["decal0_5", 882, 23, 26, 18, 0.327, 0.5],
    ["decal0_6", 785, 23, 30, 19, 0.417, 0.474],
    ["decal0_7", 622, 23, 28, 20, 0.375, 0.5],
    ["decal0_8", 351, 232, 29, 22, 0.397, 0.5],
    ["decal1_1", 1030, 200, 31, 8, 0.565, 0.625],
    ["decal1_2", 1034, 189, 32, 9, 0.516, 0.778],
    ["decal1_3", 1030, 200, 31, 8, 0.532, 0.5],
    ["decal1_4", 978, 174, 32, 13, 0.516, 0.538],
    ["decal1_5", 209, 239, 30, 15, 0.55, 0.6],
    ["decal1_6", 978, 118, 25, 18, 0.7, 0.5],
    ["decal1_7", 751, 23, 32, 19, 0.547, 0.474],
    ["decal1_8", 716, 23, 33, 19, 0.53, 0.474],
    ["decal2_1", 2, 243, 35, 11, 0.5, 0.727],
    ["decal2_2", 39, 243, 35, 11, 0.5, 0.636],
    ["decal2_3", 135, 242, 35, 12, 0.5, 0.583],
    ["decal2_4", 172, 242, 35, 12, 0.5, 0.5],
    ["decal2_5", 1005, 132, 35, 9, 0.5, 0.444],
    ["decal2_6", 1003, 143, 35, 9, 0.5, 0.444],
    ["decal2_7", 651, 247, 35, 7, 0.5, 0.571],
    ["decal2_8", 1005, 120, 35, 10, 0.5, 0.5],
    ["decal3_1", 991, 189, 15, 8, 0.833, 0.625],
    ["decal3_2", 523, 2, 13, 8, 0.808, 0.625],
    ["decal3_3", 977, 86, 12, 10, 0.708, 0.6],
    ["decal3_4", 978, 23, 11, 13, 0.773, 0.538],
    ["decal3_5", 715, 239, 12, 15, 0.792, 0.533],
    ["decal3_6", 977, 68, 12, 16, 0.792, 0.5],
    ["decal3_7", 977, 48, 12, 18, 0.792, 0.5],
    ["decal3_8", 523, 12, 12, 20, 0.792, 0.5],
    ["decal4_1", 688, 247, 25, 7, 0.62, 0.714],
    ["decal4_2", 978, 138, 23, 9, 0.587, 0.667],
    ["decal4_3", 1042, 220, 20, 10, 0.525, 0.6],
    ["decal4_4", 113, 243, 20, 11, 0.525, 0.545],
    ["decal4_5", 1020, 220, 20, 11, 0.525, 0.545],
    ["decal4_6", 1008, 191, 20, 12, 0.525, 0.5],
    ["decal4_7", 1012, 175, 20, 14, 0.525, 0.5],
    ["decal4_8", 271, 239, 21, 15, 0.548, 0.467],
    ["decal5_1", 991, 245, 27, 8, 0.648, 0.5],
    ["decal5_2", 393, 224, 27, 6, 0.648, 0.333],
    ["decal5_3", 991, 216, 27, 13, 0.648, 0.538],
    ["decal5_4", 1039, 171, 27, 16, 0.648, 0.5],
    ["decal5_5", 977, 98, 26, 18, 0.635, 0.5],
    ["decal5_6", 817, 23, 26, 19, 0.635, 0.474],
    ["decal5_7", 652, 23, 25, 20, 0.66, 0.5],
    ["decal5_8", 382, 232, 28, 22, 0.589, 0.5],
    ["e0", 384, 87, 51, 51, 0.549, 0.51],
    ["e10", 207, 2, 88, 85, 0.489, 0.541],
    ["e11", 659, 45, 92, 79, 0.511, 0.494],
    ["e13", 810, 121, 91, 73, 0.527, 0.562],
    ["e14", 825, 44, 79, 72, 0.57, 0.444],
    ["e15", 912, 189, 77, 65, 0.597, 0.385],
    ["e16", 207, 89, 80, 57, 0.613, 0.491],
    ["e17", 903, 118, 73, 69, 0.671, 0.406],
    ["e18", 991, 23, 73, 65, 0.411, 0.692],
    ["e19", 422, 224, 40, 29, 0.425, 0.448],
    ["e2", 597, 129, 83, 80, 0.566, 0.537],
    ["e20", 800, 231, 34, 23, 0.5, 0.565],
    ["e21", 836, 231, 32, 23, 0.5, 0.522],
    ["e22", 870, 222, 31, 23, 0.516, 0.522],
    ["e3", 303, 147, 88, 83, 0.557, 0.53],
    ["e4", 384, 2, 88, 83, 0.557, 0.53],
    ["e5", 297, 2, 85, 84, 0.541, 0.5],
    ["e7", 205, 151, 96, 86, 0.448, 0.488],
    ["e9", 118, 151, 85, 89, 0.482, 0.483],
    ["frenzy", 393, 140, 128, 82, 0.5, 0.5],
    ["frenzyIcon", 956, 23, 20, 23, 0.5, 0.5],
    ["health", 906, 90, 23, 23, 0.5, 0.5],
    ["iconBombdrop", 347, 88, 35, 52, 0.486, 0.452],
    ["iconLaserFull", 753, 44, 70, 75, 0.5, 0.5],
    ["iconMachinegun", 622, 211, 27, 36, 0.519, 0.5],
    ["iconMelee", 729, 203, 39, 32, 0.5, 0.5],
    ["iconRailgun", 546, 87, 42, 42, 0.5, 0.5],
    ["iconRocket", 625, 45, 32, 37, 0.5, 0.541],
    ["iconTrishoot", 474, 45, 40, 40, 0.5, 0.475],
    ["iconkill", 682, 126, 126, 75, 0.5, 0.5],
    ["indicator", 2, 2, 203, 147, 0.5, 0.5],
    ["killR", 729, 237, 44, 17, 0.364, 1.794],
    ["laser", 289, 89, 56, 56, 0.5, 0.5],
    ["laser_collision0", 799, 203, 36, 26, 0.542, 0.442],
    ["laser_collision1", 464, 224, 37, 27, 0.473, 0.426],
    ["laser_collision2", 503, 224, 34, 27, 0.485, 0.426],
    ["laser_opening", 956, 48, 19, 67, 0.5, 0.5],
    ["laser_stretch", 207, 148, 19, 1, 0.5, 0.5],
    ["laserfade", 539, 2, 527, 19, 0.5, 0.5],
    ["laserplug", 294, 239, 18, 15, 0.5, 0.5],
    ["melee", 931, 90, 23, 23, 0.5, 0.5],
    ["missile", 906, 56, 23, 23, 0.5, 0.5],
    ["missile_attack", 1019, 165, 18, 8, 0.5, 0.5],
    ["nearmiss", 2, 151, 114, 90, 0.5, 0.5],
    ["parachute", 837, 196, 25, 25, 0.5, 0.5],
    ["pause", 697, 203, 30, 34, 0.5, 0.735],
    ["plane1", 1005, 106, 35, 12, 0.5, 0.667],
    ["plane2", 76, 243, 35, 11, 0.5, 0.636],
    ["plane3", 910, 41, 35, 13, 0.5, 0.538],
    ["plane4", 910, 23, 35, 16, 0.5, 0.5],
    ["plane5", 845, 23, 35, 18, 0.5, 0.5],
    ["plane6", 679, 23, 35, 19, 0.5, 0.474],
    ["plane7", 585, 23, 35, 20, 0.5, 0.5],
    ["plane8", 314, 232, 35, 22, 0.5, 0.5],
    ["punch", 539, 218, 81, 36, 0.5, 0.5],
    ["railgun", 931, 56, 23, 23, 0.5, 0.5],
    ["revenge", 523, 134, 72, 82, 0.514, 0.5],
    ["revengeIcon", 978, 149, 20, 23, 0.5, 0.5],
    ["s0", 1e3, 154, 17, 18, 0.647, -0.361],
    ["s1", 864, 196, 21, 24, 0.619, -0.063],
    ["s10", 474, 2, 47, 14, 0.489, -1.036],
    ["s11", 1005, 90, 52, 14, 0.5, -1.107],
    ["s12", 1019, 154, 19, 9, 0.526, -1.944],
    ["s2", 516, 45, 30, 40, 0.467, 0.363],
    ["s3", 514, 87, 30, 45, 0.5, 0.433],
    ["s4", 437, 87, 34, 50, 0.529, 0.45],
    ["s5", 473, 87, 39, 46, 0.513, 0.38],
    ["s6", 548, 45, 39, 39, 0.513, 0.269],
    ["s7", 651, 211, 44, 34, 0.523, 0.162],
    ["s8", 474, 18, 46, 25, 0.522, -0.14],
    ["s9", 537, 23, 46, 20, 0.5, -0.475],
    ["skull", 1040, 146, 20, 23, 0.5, 0.5],
    ["throttleFlame", 1042, 131, 23, 13, 0.5, 0.5],
    ["trishoot", 1042, 106, 23, 23, 0.5, 0.5],
    ["turbo0", 590, 86, 30, 41, 0.467, 0.5],
    ["turbo1", 589, 45, 34, 39, 0.559, 0.526],
    ["turbo2", 622, 86, 23, 39, 0.348, 0.5],
    ["wing", 770, 203, 27, 27, 0.5, 0.5],
  ];
let func_detect_country = function () {
    let b = "";
    bool_isHttps && (b = "s");
    $.get(
      "http" + b + "://ip2l.wings.io/cc",
      function (b) {
        str_conutryCode = b.substring(0, 2);
        window.localStorage.wingsCC = str_conutryCode;
        window.localStorage.wingsCCTime = +new Date();
      },
      "text",
    );
  },
  Rb = function () {
    T = +new Date();
    let b = 0;
    0 < Mb && (b = T - Mb);
    Mb = T;
    objG_followMode.update(b);
    objG_followMode.draw(b);
    window.requestAnimationFrame && window.requestAnimationFrame(Rb);
    Lb && (Lb = false);
  };
function func_displaySelectedColor(int_color_id: number) {
  intG_color_id = int_color_id;
  let e;
  for (e = 0; 5 >= e; e++) {
    let f = e,
      d = objG_assets.planes[f][int_color_id][7],
      a = document.createElement("canvas"),
      c = a.getContext("2d"),
      g = objG_assets.frames.plane8;
    a.width = g.width;
    a.height = g.height;
    c.translate(g.width / 2, g.height / 2);
    g.draw(c);
    d.draw(c);
    d = a.toDataURL("image/png");
    a = void 0;
    c = document.styleSheets.length;
    for (g = 0; g < c; g++) {
      let h = document.styleSheets[g];
      if (null == h.href) {
        a = h;
        break;
      }
    }
    a.addRule
      ? a.addRule(
          ".btn-decal" + (f + 1) + ":before",
          "background-image: url(" + d + ")",
        )
      : a.insertRule(
          ".btn-decal" + (f + 1) + ":before{background-image: url(" + d + ")}",
          a.cssRules.length,
        );
  }
  for (e = 0; 5 >= e; e++) $("#check" + e).hide();
  $("#check" + int_color_id).show();
}
function func_displaySelectedDecal(int_decal_id: number) {
  intG_decal_id = int_decal_id;
  for (let e = 0; 5 >= e; e++) $("#checkD" + e).hide();
  $("#checkD" + int_decal_id).show();
}
function funcR_showBeta() {
  bool_continueGame = false;
  $("#beta").show();
  func_displayNicknameInput();
}
function func_isNotChrome() {
  let b = -1 < navigator.userAgent.indexOf("Chrome"),
    e = -1 < navigator.userAgent.indexOf("Safari");
  b && e && (e = false);
  return e;
}
function func_setGraphicsQuality() {
  let b = "Low",
    e = $("#graphicsID")[0];
  bool_setting_highQuality && (b = "High");
  e && (e.childNodes[0].data = "Graphics: " + b);
}
function funcR_hc_showPf() {
  $("#pfArrow").show();
  $("#pfText").show();
}
function func_displayCopyLink() {
  $("#copycheckimage").hide();
  $("#copyLink").show();
  $("#copyLinkBox").hide();
  $("#overlay2").fadeIn(200);
  $("#pfArrow").hide();
  $("#pfText").hide();
  setTimeout(function () {
    $("#copycheckimage").fadeIn(300);
  }, 200);
  setTimeout(function () {
    $("#overlay2").fadeOut(200);
  }, 1e3);
  eb = false;
}
function func_displayMuteAudio() {
  let b = "images/sound_off.png";
  1 == num_setting_muteVol
    ? (num_max_volume = num_setting_muteVol = 0)
    : 0 == num_setting_muteVol &&
      ((num_setting_muteVol = 1),
      (num_max_volume = 0.05),
      (b = "images/sound_on.png"));
  window.localStorage.muteVol = num_setting_muteVol;
  $("#soundImg")[0].src = b;
}
function func_showAds() {
  window.mixpanel &&
    window.mixpanel.track("Ad Impression Opportunity", {
      domain: window.location.hostname,
    });
  if (null != adsense && adsense)
    0 == int_ads_refreshed &&
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
        (window.googletag.cmd.push(function () {
          Cb &&
            ((Cb = false),
            setTimeout(function () {
              Cb = true;
            }, 6e4 * lc),
            window.googletag &&
              window.googletag.pubads &&
              window.googletag.pubads().refresh &&
              window.googletag.pubads().refresh(window.ads));
        }),
        int_ads_refreshed++);
  else {
    $("#mpu-top").show();
    let b = $("#ldr-top");
    b && b.show();
    refreshSlots();
  }
}
function func_wsConnDisconnect() {
  objG_wsConnection && objG_wsConnection.disconnect();
}
function func_hideOverlay() {
  num_max_volume = 1 * num_setting_muteVol;
  $("#overlay").hide();
  bool_following_plane = false;
}
function func_displayContinueCountdown() {
  if (bool_continueGame) {
    let b = Math.floor((T - Eb) / 1e3);
    0 > b && (b = 0);
    let e = 10 - b;
    0 > e
      ? ((bool_continueGame = false), func_displayNicknameInput())
      : ((b = $("#countdownText")[0]),
        (e = document.createTextNode(e)),
        b.replaceChild(e, b.firstChild),
        setTimeout(func_displayContinueCountdown, 500));
  }
}
function func_displayGameover() {
  func_showAds();
  0 < nc &&
    ($("#continueTop").show(),
    $("#continueBR").show(),
    $("#continue").show(),
    $("#nickInput").hide(),
    $("#skinPanel").hide(),
    $("#howto").hide(),
    (bool_continueGame = true),
    (Eb = +new Date()),
    func_displayContinueCountdown());
  $("#overlay").fadeIn(500);
  num_max_volume = 0.05 * num_setting_muteVol;
  objGUI_gameInfo.clearBonusDisplay();
}
function func_displayGameoverScore(int_score: number) {
  if (int_pathMobile)
    (bool_following_plane = true), Z || ((ka = 1), (objG_player_plane = null));
  else {
    bool_following_plane = true;
    Z || ((ka = 1), (objG_player_plane = null));
    funcR_hc_showPf();
    if (0 <= int_score) {
      bool_continueGame = true;
      $("#beta").hide();
      let e = $("#curScore")[0],
        f;
      f = objG_eventManager.isInstagib()
        ? document.createTextNode("Kills: " + int_score)
        : document.createTextNode("Current Score: " + int_score);
      e.replaceChild(f, e.firstChild);
    }
    nc = int_score;
    setTimeout(func_displayGameover, 1e3);
  }
}
function func_displayNicknameInput() {
  $("#continueTop").hide();
  $("#continueBR").hide();
  $("#continue").hide();
  $("#nickInput").show();
  $("#skinPanel").hide();
  $("#divOff").show();
  $("#divOn").hide();
  $("#howto").show();
  $("#beta").show();
  Eb = +new Date();
}
function func_setPlayerCount() {
  numG_player_count = Object.keys(objD_planes).length;
  document.title = "Wings!";
}
function func_isIframe() {
  try {
    return window.self !== window.top;
  } catch (b) {
    return true;
  }
}
function func_padZerosPrefix(num_val: number) {
  let e = "";
  10 > num_val && (e = "0");
  return e + num_val;
}
function func_millisToTimeFormat(total_millis: number) {
  let total_seconds = total_millis / 1e3;
  let minutes = total_seconds / 60;
  let seconds = total_seconds - 60 * minutes,
    hours = minutes / 60;
  minutes -= 60 * hours;
  return 0 == hours
    ? func_padZerosPrefix(minutes) + ":" + func_padZerosPrefix(seconds)
    : func_padZerosPrefix(hours) +
        ":" +
        func_padZerosPrefix(minutes) +
        ":" +
        func_padZerosPrefix(seconds);
}
function func_calculateDistance2D(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}
function func_isTimeElapsed_50ms() {
  return 50 > +new Date() - T;
}
function func_isInsideBox(x: number, y: number, dist: number) {
  let d = objGUI_anchor.getBounds();
  return x + dist >= d[0].x &&
    x - dist <= d[1].x &&
    y + dist >= d[0].y &&
    y - dist <= d[1].y
    ? true
    : false;
}
function func_clamp(val: number, l: number, u: number) {
  return val < l ? l : val > u ? u : val;
}
function Class_StrokeStyle(size, color, is_stroke_enabled, stroke_color) {
  size && (this._size = size);
  color && (this._color = color);
  this._stroke = !!is_stroke_enabled;
  stroke_color && (this._strokeColor = stroke_color);
}
function Class_TextStyle(size, color, second_color) {
  size && (this._size = size);
  color && (this._color = color);
  second_color && (this._secondColor = second_color);
}
function func_renameBlankPlayerNames(str_name: string) {
  "" == str_name && (str_name = "<Unnamed>");
  return str_name;
}
function func_drawRoundedRectangle(
  canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  radius /= 2;
  canvas.beginPath();
  canvas.moveTo(x, y + radius);
  canvas.lineTo(x, y + height - radius);
  canvas.quadraticCurveTo(x, y + height, x + radius, y + height);
  canvas.lineTo(x + width - radius, y + height);
  canvas.quadraticCurveTo(
    x + width,
    y + height,
    x + width,
    y + height - radius,
  );
  canvas.lineTo(x + width, y + radius);
  canvas.quadraticCurveTo(x + width, y, x + width - radius, y);
  canvas.lineTo(x + radius, y);
  canvas.quadraticCurveTo(x, y, x, y + radius);
  canvas.closePath();
  canvas.fill();
}
function func_drawRoundedRectangleHalf(
  canvas,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  radius /= 2;
  canvas.beginPath();
  canvas.moveTo(x, y + radius);
  canvas.lineTo(x, y + height);
  canvas.lineTo(x + width, y + height);
  canvas.lineTo(x + width, y + radius);
  canvas.quadraticCurveTo(x + width, y, x + width - radius, y);
  canvas.lineTo(x + radius, y);
  canvas.quadraticCurveTo(x, y, x, y + radius);
  canvas.closePath();
  canvas.fill();
}
function func_rotatePoint(x: number, y: number, angle: number) {
  let d = x * Math.cos(angle) - y * Math.sin(angle);
  x = y * Math.cos(angle) + x * Math.sin(angle);
  return {
    x: d,
    y: x,
  };
}
window.location.href.split("/");
-1 == int_pathMobile && (int_pathMobile = 0);
int_pathMobile && (xa = true);
(function () {
  let b = window.location.search;
  "?" == b.charAt(0) && (b = b.slice(1));
  b = b.split("&");
  for (let e = 0; e < b.length; e++) {
    let f = b[e].split("=");
    obj_browserQueryParams[f[0]] = f[1];
  }
})();
window.stats = obj_browserQueryParams.stats ? true : false;
"true" == window.localStorage.lq && (bool_setting_highQuality = false);
window.mixpanel &&
  window.mixpanel.init("208ce64093308da8075ba320f97c12fd", {
    debug: false,
    track_pageview: true,
    persistence: "localStorage",
  });
void 0 == window.localStorage.wingsCCTime ||
(void 0 != window.localStorage.wingsCC &&
  2 != window.localStorage.wingsCC.length)
  ? func_detect_country()
  : 288e5 < +new Date() - window.localStorage.wingsCCTime
    ? func_detect_country()
    : (str_conutryCode = window.localStorage.wingsCC);
document.body.onselectstart = function () {
  return false;
};
window.switchSkins = function () {
  funcR_showBeta();
  bool_hideCustomization
    ? ($("#howto").show(),
      $("#skinPanel").hide(),
      $("#divOff").show(),
      $("#divOn").hide())
    : ($("#howto").hide(),
      $("#skinPanel").show(),
      $("#divOff").hide(),
      $("#divOn").show());
  bool_hideCustomization = !bool_hideCustomization;
};
window.setSkinColor = function (b) {
  func_displaySelectedColor(b);
};
window.setDecal = function (b) {
  func_displaySelectedDecal(b);
};
window.clickPlay = function (b) {
  Z
    ? func_hideOverlay()
    : ((window.localStorage.nick = b),
      (document.getElementsByTagName("canvas")[0].style.cursor =
        "url(images/crosshair.png) 16 16, auto"),
      kb++,
      (objG_inputManager.mouseMoved = false),
      objG_wsConnection.sendNick(b, bool_continueGame),
      bool_continueGame &&
        (func_displayNicknameInput(), (bool_continueGame = false)),
      objG_eventManager.isSpaceWars()
        ? objGUI_gameInfo.showTip(
            "Hint: Earn points faster by destroying asteroids.",
          )
        : document.fullscreenElement ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement ||
          document.msFullscreenElement ||
          (2 != kb && 4 != kb && 6 != kb) ||
          objGUI_gameInfo.showTip("Press 'F' to toggle Fullscreen"));
};
window.setSpectate = function (b) {
  xa = true;
  document.getElementsByTagName("canvas")[0].style.cursor = "default";
  func_hideOverlay();
  zc++;
  funcR_showBeta();
  Z
    ? (objG_wsConnection.leave(),
      (Z = false),
      objG_followMode.waitUntilNextFollow())
    : objG_followMode.followTopPlayer();
  ka = 0;
  zc % 2 || 1 >= numG_player_count
    ? objGUI_gameInfo.showTip("Press 'ESC' to go back")
    : objGUI_gameInfo.showTip("Click to follow next player");
};
window.setContinue = function () {
  $("#topGui").show();
  $("#roomFailed").hide();
  func_isIframe() || (parent.location.hash = "");
  objG_wsConnection.getServerAndConnect();
};
window.toggleGraphics = function () {
  bool_setting_highQuality = !bool_setting_highQuality;
  objG_followMode.resize();
  window.localStorage.lq = !bool_setting_highQuality;
  func_setGraphicsQuality();
};
window.copyRoomLink = function () {
  $("#copyLink").hide();
  $("#copyLinkBox").show();
  let b = $("#roomlinkInput")[0];
  b.value = "http://classic.wings.io/#" + objG_wsConnection.roomID;
  eb = true;
  func_isNotChrome() &&
    (($("#copyButton")[0].childNodes[0].data = "Close"),
    $("#safariTooltip").show());
  setTimeout(function () {
    b.setSelectionRange(0, b.value.length);
    b.select();
    b.focus();
  }, 100);
};
window.setCopy = function () {
  let b = $("#roomlinkInput")[0];
  b.value = "http://wings.io/#" + objG_wsConnection.roomID;
  b.setSelectionRange(0, b.value.length);
  b.select();
  b.focus();
  if (func_isNotChrome())
    $("#copyLinkBox").hide(), $("#copyLink").show(), (eb = false);
  else {
    try {
      document.execCommand("copy");
    } catch (e) {}
    func_displayCopyLink();
  }
};
null != adsense && adsense && func_showAds();
window.clickNoNames = function (b) {
  lb = !lb;
  b.checked = lb;
};
window.toggleMute = function () {
  func_displayMuteAudio();
};
void 0 == num_setting_muteVol && (num_setting_muteVol = 1);
"undefined" === typeof window.orientation ||
  int_pathMobile ||
  (window.location.href =
    "https://itunes.apple.com/us/app/wings.io/id1098205567?l=pt&ls=1&mt=8");
if (0 == num_setting_muteVol || bool_internet_explorer)
  (num_setting_muteVol = 1), int_pathMobile || func_displayMuteAudio();
bool_internet_explorer && $("#sndIcon").hide();
window.onblur = function () {
  window.didSendLoadingTime = true;
  timeout_ws_conn = setTimeout(func_wsConnDisconnect, 3e5);
  wa = false;
  num_max_volume = 0;
  objG_sfxManager &&
    (objG_sfxManager.sound.volume(0),
    objG_sfxManager.sound.volume(0, mb),
    objG_sfxManager.sound.volume(0, ia),
    objG_sfxManager.sound.volume(0, na),
    nb && objG_sfxManager.sound.volume(0, nb));
};
window.onfocus = function () {
  timeout_ws_conn && (clearTimeout(timeout_ws_conn), (timeout_ws_conn = null));
  Lb = wa = true;
  num_max_volume = 1 * num_setting_muteVol;
  for (let b in objD_planes) objD_planes[b].clearTrail();
};
window.connectToServer = function (b) {
  objG_wsConnection.roomNumber = 0;
  objG_wsConnection.remoteHost = b;
  objG_wsConnection.connect();
  console.log("CONNECTING NOW to " + b);
};
window.disconnect = function () {
  objG_wsConnection.disconnect();
  console.log("Disconnected.");
};
window.enterGame = function (b) {
  clickPlay(b);
  onfocus();
};
window.setInput = function (b, e, f) {
  objG_inputManager.angle = b;
  objG_inputManager.hover = e;
  !Sb && f
    ? objG_wsConnection.sendShooting(f)
    : Sb && !f && objG_wsConnection.sendShooting(f);
  Sb = f;
};
window.wasKilled = function (b) {
  objG_inputManager.angle = Math.PI;
  objG_inputManager.hover = 1;
  int_pathMobile &&
    ((bool_continueGame = true),
    (b = {
      score: b,
    }),
    "undefined" != typeof messageHandlers && messageHandlers.wasKilled
      ? messageHandlers.wasKilled(JSON.stringify(b))
      : window.webkit.messageHandlers.wasKilled.postMessage(b));
};
window.connectionClosed = function () {
  console.log("Connection was closed");
  objG_inputManager.angle = Math.PI;
  objG_inputManager.hover = 1;
  int_pathMobile &&
    ("undefined" != typeof messageHandlers && messageHandlers.connectionClosed
      ? messageHandlers.connectionClosed(JSON.stringify({}))
      : window.webkit.messageHandlers.connectionClosed.postMessage({}));
};
if (int_pathMobile) window.onblur();
window.localStorage.nick &&
  $("#nick")[0] &&
  ($("#nick")[0].value = window.localStorage.nick);
document.oncontextmenu = function () {
  return false;
};
int_pathMobile && (str_font_name = "Arial-BoldMT");
Class_StrokeStyle.prototype = {
  _value: "",
  _color: "#000000",
  _stroke: false,
  _strokeColor: "#000000",
  _strokeWidth: 3,
  _size: 16,
  _canvas: null,
  _ctx: null,
  _dirty: false,
  _scale: 1,
  _font: "px 'proxima-nova-1','proxima-nova-2', " + str_font_name,
  _usingRoundedFrame: false,
  _hmargin: 3,
  _vmargin: -1,
  _frameOpacity: 0.2,
  setFont: function (b) {
    this._font != b && ((this._font = b), (this._dirty = true));
  },
  setSize: function (b) {
    this._size != b && ((this._size = b), (this._dirty = true));
  },
  setScale: function (b) {
    this._scale != b && ((this._scale = b), (this._dirty = true));
  },
  setColor: function (b) {
    this._color != b && ((this._color = b), (this._dirty = true));
  },
  setStroke: function (b) {
    this._stroke != b && ((this._stroke = b), (this._dirty = true));
  },
  setStrokeWidth: function (b) {
    this._stroke != b && ((this._strokeWidth = b), (this._dirty = true));
  },
  setStrokeColor: function (b) {
    this._strokeColor != b && ((this._strokeColor = b), (this._dirty = true));
  },
  setValue: function (b) {
    b != this._value && ((this._value = b), (this._dirty = true));
  },
  setHMargin: function (b) {
    b != this._hmargin && ((this._hmargin = b), (this._dirty = true));
  },
  setVMargin: function (b) {
    b != this._vmargin && ((this._vmargin = b), (this._dirty = true));
  },
  setUsingRoundedFrame: function (b) {
    b != this._usingRoundedFrame &&
      ((this._usingRoundedFrame = b), (this._dirty = true));
  },
  setRoundedFrameOpacity: function (b) {
    b != this._frameOpacity && ((this._frameOpacity = b), (this._dirty = true));
  },
  render: function () {
    null == this._canvas &&
      ((this._canvas = document.createElement("canvas")),
      (this._ctx = this._canvas.getContext("2d")));
    if (this._dirty) {
      this._dirty = false;
      let b = this._canvas,
        e = this._ctx,
        f = this._value,
        d = this._scale,
        a = this._size,
        c = "Bold " + a + this._font;
      e.font = c;
      let g = e.measureText(f).width,
        h = this._hmargin,
        q = 2;
      -1 < this._vmargin && (q = this._vmargin);
      let n = 0;
      this._stroke && (n = this._strokeWidth);
      b.width = (g + 2 * h + n) * d;
      b.height = (a + 2 * q + n) * d;
      e.font = c;
      e.scale(d, d);
      e.globalAlpha = 1;
      e.lineJoin = "round";
      e.lineWidth = this._strokeWidth;
      e.strokeStyle = this._strokeColor;
      this._usingRoundedFrame &&
        ((e.fillStyle = "#000000"),
        (e.globalAlpha = this._frameOpacity),
        func_drawRoundedRectangle(e, 0, 0, b.width, b.height, 10),
        (e.globalAlpha = 1));
      e.fillStyle = this._color;
      this._stroke && e.strokeText(f, h + 2, a + q / 2);
      e.fillText(f, h + 2, a + q / 2);
    }
    return this._canvas;
  },
};
Class_TextStyle.prototype = {
  _value: "",
  _color: "#000000",
  _secondColor: "#FFFFFF",
  _size: 16,
  _canvas: null,
  _ctx: null,
  _dirty: false,
  _scale: 1,
  _font: "px 'proxima-nova-1','proxima-nova-2', " + str_font_name,
  _extrude: 3,
  _usingFrame: false,
  _usingRoundedFrame: false,
  _angX: 0,
  _angY: 0,
  _d: 5,
  _addTop: 0,
  setAddTop: function (b) {
    b != this._addTop && ((this._addTop = b), (this._dirty = true));
  },
  setFont: function (b) {
    this._font != b && ((this._font = b), (this._dirty = true));
  },
  setSize: function (b) {
    this._size != b && ((this._size = b), (this._dirty = true));
  },
  setScale: function (b) {
    this._scale != b && ((this._scale = b), (this._dirty = true));
  },
  setColor: function (b) {
    this._color != b && ((this._color = b), (this._dirty = true));
  },
  setSecondColor: function (b) {
    this._secondColor != b && ((this._secondColor = b), (this._dirty = true));
  },
  setValue: function (b) {
    b != this._value && ((this._value = b), (this._dirty = true));
  },
  setUsingRoundedFrame: function (b) {
    b != this.__usingRoundedFrame &&
      ((this._usingRoundedFrame = b), (this._dirty = true));
  },
  setUsingFrame: function (b) {
    b != this._usingFrame && ((this._usingFrame = b), (this._dirty = true));
  },
  calcAngVector: function (b) {
    this._angX = Math.sin(b) * this._d;
    this._angY = Math.cos(b) * this._d;
  },
  render: function () {
    null == this._canvas &&
      ((this._canvas = document.createElement("canvas")),
      (this._ctx = this._canvas.getContext("2d")));
    if (this._dirty) {
      this._dirty = false;
      let b = this._canvas,
        e = this._ctx,
        f = this._value,
        d = this._scale,
        a = this._size,
        c = "Bold " + a + this._font;
      e.font = c;
      let g = e.measureText(f).width,
        h = ~~(0.2 * a);
      b.width = (g + 6 + 10 + 2 * this._d) * d;
      b.height = (a + h + this._extrude + 2 * this._d + this._addTop) * d;
      e.font = c;
      e.scale(d, d);
      this._usingFrame &&
        ((e.globalAlpha = 1),
        (e.fillStyle = "#000000"),
        e.moveTo(this._angX, this._angY + 15 * num_scale_factor),
        e.lineTo(
          b.width + this._angX - 4 * num_scale_factor,
          this._angY + 7 * num_scale_factor,
        ),
        e.lineTo(
          b.width + this._angX - 15 * num_scale_factor,
          b.height + this._angY - 9 * num_scale_factor,
        ),
        e.lineTo(
          this._angX + 5 * num_scale_factor,
          b.height + this._angY - 17 * num_scale_factor,
        ),
        e.fill());
      this._usingRoundedFrame &&
        ((e.globalAlpha = 0.3),
        func_drawRoundedRectangle(e, 0, 0, b.width, b.height, 40),
        (e.globalAlpha = 1));
      int_pathMobile &&
        ((e.lineJoin = "round"),
        (e.lineWidth = 3),
        (e.strokeStyle = this._secondColor),
        e.strokeText(f, 8 + this._d, a - h / 2 + 1 + this._d + this._addTop),
        (this._extrude = 0));
      for (b = this._extrude; 0 <= b; b--)
        (d = b),
          (e.fillStyle = 0 == b ? this._color : this._secondColor),
          e.fillText(f, 8 + this._d, a - h / 2 + d + this._d + this._addTop);
    }
    return this._canvas;
  },
};
let Class_Assets = function () {
    this.loaded = false;
    this.onLoad = null;
    this.spriteSheetLoaded = false;
    this.gameSheet;
    this.frames = {};
    this.whitePlaneImages = {};
    this.planeFrames;
    this.planeFramesReflex;
    this.planes = [];
    this.doubleKillCanvas;
    this.tripleKillCanvas;
    this.quadKillCanvas;
    this.multiKillCanvas;
    this.warshipImage;
    this.whiteWarshipImage;
    this.cannonImage;
    this.warshipIcon;
    this.warshipLoaded = false;
    this.warshipTextureLoadCount = 0;
    this.asteroidLoaded = false;
    this.asteroidImage;
    this.whiteAsteroidImage;
    this.blinkImage;
    this.loadGameSpritesheet = function () {
      this.gameSheet = new Image();
      this.gameSheet.src = "images/sheet.png";
      this.gameSheet.onload = function () {
        objG_assets.loadGameSpritesheetFrames();
        objG_assets.spriteSheetLoaded = true;
        objG_assets.loadAnimations();
        objG_assets.generateHudIcons();
        objG_assets.loaded = true;
        objG_assets.onLoad();
      };
    };
    this.loadGameSpritesheetFrames = function () {
      for (let b = gameSheetInfo.length, e = 0; e < b; e++) {
        let f = gameSheetInfo[e],
          obj_renderManager = new Class_RenderManager();
        obj_renderManager.setFrameInfo(f, this.gameSheet);
        this.frames[f[0]] = obj_renderManager;
      }
      for (let e = 1, b; 8 >= e; e++)
        (b = this.frames["plane" + e].renderTintedFrame("#FFFFFF").canvas),
          (this.whitePlaneImages["plane" + e] = b);
      for (let e = 0; 5 >= e; e++) this.planes[e] = [];
      this.loadPlaneImages();
      for (let e = 0; 5 >= e; e++)
        this.loadPlaneDecal(0, e),
          this.loadPlaneDecal(1, e),
          this.loadPlaneDecal(2, e),
          this.loadPlaneDecal(3, e),
          this.loadPlaneDecal(4, e),
          this.loadPlaneDecal(5, e);
    };
    this.loadPlaneImages = function (b, e) {
      let f = [],
        d = [];
      for (let a = 1; 8 >= a; a++) {
        let c = this.frames["plane" + a];
        f.push(c);
        d.push(c.renderTintedFrame("rgba(0,100,255,1.0)"));
      }
      this.planeFrames = f;
      this.planeFramesReflex = d;
    };
    this.loadPlaneDecal = function (b, e) {
      let d = [];
      for (let f = list_decal_colors[e], a = 1; 8 >= a; a++) {
        let c;
        c = this.frames["decal" + b + "_" + a].generateTintImage2(
          f.r,
          f.g,
          f.b,
          1,
        );
        d.push(c);
      }
      this.planes[b][e] = d;
    };
    this.loadAnimations = function () {
      let obj_animation = new Class_Animation(),
        obj_animation2 = new Class_Animation();
      for (let f = 0; 13 > f; f++)
        obj_animation.addFrame(this.frames["s" + f]),
          obj_animation2.addFrame(
            this.frames["s" + f].renderTintedFrame("#2b9bf5"),
          );
      obj_animation.setInterval(1e3 / 30);
      objG_animationManager.addAnimationInfo("splash", obj_animation);
      obj_animation2.setInterval(1e3 / 30);
      objG_animationManager.addAnimationInfo("splashReflex", obj_animation2);
      obj_animation = new Class_Animation();
      obj_animation.addFrame(this.frames.e0);
      obj_animation.addFrame(this.frames.e0);
      obj_animation.addFrame(this.frames.e2);
      obj_animation.addFrame(this.frames.e3);
      obj_animation.addFrame(this.frames.e4);
      obj_animation.addFrame(this.frames.e5);
      obj_animation.addFrame(this.frames.e5);
      obj_animation.addFrame(this.frames.e7);
      obj_animation.addFrame(this.frames.e7);
      obj_animation.addFrame(this.frames.e9);
      obj_animation.addFrame(this.frames.e10);
      obj_animation.addFrame(this.frames.e11);
      obj_animation.addFrame(this.frames.e11);
      obj_animation.addFrame(this.frames.e13);
      obj_animation.addFrame(this.frames.e14);
      obj_animation.addFrame(this.frames.e15);
      obj_animation.addFrame(this.frames.e16);
      obj_animation.addFrame(this.frames.e17);
      obj_animation.addFrame(this.frames.e18);
      obj_animation.addFrame(this.frames.e19);
      obj_animation.addFrame(this.frames.e20);
      obj_animation.addFrame(this.frames.e21);
      obj_animation.addFrame(this.frames.e22);
      obj_animation.setInterval(1e3 / 30);
      objG_animationManager.addAnimationInfo("explosion", obj_animation);
    };
    this.generateTintedKillIcon = function (b, e, f, d) {
      let a;
      a = objG_assets.frames.iconkill;
      frameIconR = objG_assets.frames.killR;
      let c = a.generateRGBKs();
      f = a.generateTintImage(c, b, e, f);
      b = document.createElement("canvas");
      b.width = f.width;
      b.height = f.height;
      e = b.getContext("2d");
      e.drawImage(f.canvas, 0, 0);
      d = frameIconR.renderTintedFrame(d);
      d.x = a.width / 2;
      d.y = a.height / 2;
      d.draw(e);
      return b;
    };
    this.generateHudIcons = function () {
      let b, e, f, d, a, c, g, h;
      (b = 30),
        (e = 0),
        (e = this.generateTintedKillIcon(205, 154, 109, "#FFFFFF")),
        (f = this.generateTintedKillIcon(172, 121, 76, "#BBBBBB")),
        (d = document.createElement("canvas"));
      d.width = e.width;
      d.height = e.height + b;
      (a = d.getContext("2d")),
        (e = e.getContext("2d")),
        (f = f.getContext("2d"));
      a.drawImage(f.canvas, 0, 0);
      a.drawImage(e.canvas, 0, b);
      this.doubleKillCanvas = d;
      (b = 10),
        (e = 70),
        (d = 0.9),
        (c = this.generateTintedKillIcon(167, 176, 185, "#FFFFFF")),
        (f = this.generateTintedKillIcon(129, 138, 148, "#BBBBBB")),
        (g = document.createElement("canvas"));
      g.width = c.width + e;
      g.height = c.height + b;
      (h = g.getContext("2d")),
        (e = c.getContext("2d")),
        (f = f.getContext("2d")),
        (a = g.width / 2 - (c.width / 2) * d);
      h.save();
      h.translate(a, 0);
      h.scale(d, d);
      h.drawImage(f.canvas, -30, 0);
      h.drawImage(f.canvas, 30, 0);
      h.restore();
      a = g.width / 2 - c.width / 2;
      h.drawImage(e.canvas, a, b);
      this.tripleKillCanvas = g;
      shift2Y = 20;
      shift2X = 160;
      d = 0.95;
      c = this.generateTintedKillIcon(240, 164, 0, "#FFFFFF");
      f = this.generateTintedKillIcon(200, 124, 0, "#ddaf63");
      b = this.generateTintedKillIcon(158, 98, 0, "#b25c5c");
      g = document.createElement("canvas");
      g.width = c.width + shift2X;
      g.height = c.height + 1.5 * shift2Y;
      a = g.width / 2 - (c.width / 2) * d;
      h = g.getContext("2d");
      e = c.getContext("2d");
      f = f.getContext("2d");
      b = b.getContext("2d");
      h.save();
      h.translate(a, 0);
      h.scale(d, d);
      h.drawImage(b.canvas, 0, 0);
      h.restore();
      a = g.width / 2 - (c.width / 2) * d;
      h.save();
      h.translate(a, 0);
      h.scale(d, d);
      h.drawImage(f.canvas, -35, 15);
      h.drawImage(f.canvas, 35, 15);
      h.restore();
      a = g.width / 2 - c.width / 2;
      h.drawImage(e.canvas, a, 1.5 * shift2Y);
      this.quadKillCanvas = g;
      c = this.generateTintedKillIcon(222, 0, 0, "#FFFFFF");
      f = this.generateTintedKillIcon(172, 0, 0, "#d68080");
      b = this.generateTintedKillIcon(133, 0, 0, "#b25c5c");
      g = document.createElement("canvas");
      g.width = c.width + shift2X;
      g.height = c.height + 1.5 * shift2Y;
      a = g.width / 2 - (c.width / 2) * 0.65;
      h = g.getContext("2d");
      e = c.getContext("2d");
      f = f.getContext("2d");
      b = b.getContext("2d");
      h.save();
      h.translate(a, 0);
      h.scale(0.65, 0.65);
      h.drawImage(b.canvas, -105, 10);
      h.drawImage(b.canvas, 105, 10);
      h.drawImage(b.canvas, -40, 10);
      h.drawImage(b.canvas, 40, 10);
      h.drawImage(b.canvas, 0, shift2Y);
      h.restore();
      a = g.width / 2 - (c.width / 2) * d;
      h.save();
      h.translate(a, 0);
      h.scale(d, d);
      h.drawImage(f.canvas, -35, shift2Y);
      h.drawImage(f.canvas, 35, shift2Y);
      h.restore();
      a = g.width / 2 - c.width / 2;
      h.drawImage(e.canvas, a, 1.5 * shift2Y);
      this.multiKillCanvas = g;
    };
    this.load = function (b) {
      this.onLoad = b;
      this.loadGameSpritesheet();
    };
    this.loadTintImage = function (b, e, f) {
      let d = document.createElement("canvas"),
        a = d.getContext("2d"),
        c = b.width,
        g = b.height;
      d.width = c;
      d.height = g;
      let h = document.createElement("canvas");
      h.width = c;
      h.height = g;
      c = h.getContext("2d");
      c.fillStyle = f;
      c.fillRect(0, 0, h.width, h.height);
      c.globalCompositeOperation = "destination-atop";
      c.drawImage(b, 0, 0);
      a.globalAlpha = 1;
      a.drawImage(h, 0, 0);
      e(d);
    };
    this.verifyWarshipLoaded = function () {
      3 == this.warshipTextureLoadCount && (this.warshipLoaded = true);
    };
    this.loadWarshipEvent = function () {
      this.warshipLoaded ||
        ((this.warshipImage = new Image()),
        (this.warshipImage.src = "images/events/battleship.png"),
        (this.warshipImage.onload = function () {
          objG_assets.warshipLoaded = true;
          objG_assets.loadTintImage(
            objG_assets.warshipImage,
            function (b) {
              objG_assets.whiteWarshipImage = b;
              objG_assets.warshipTextureLoadCount++;
              objG_assets.verifyWarshipLoaded();
            },
            "#FFFFFF",
          );
        }),
        (this.cannonImage = new Image()),
        (this.cannonImage.src = "images/events/shipcannon.png"),
        (this.cannonImage.onload = function () {
          objG_assets.warshipTextureLoadCount++;
          objG_assets.verifyWarshipLoaded();
        }),
        (this.warshipIcon = new Image()),
        (this.warshipIcon.src = "images/events/warshipIcon.png"),
        (this.warshipIcon.onload = function () {
          objG_assets.warshipTextureLoadCount++;
          objG_assets.verifyWarshipLoaded();
        }));
    };
    this.loadAsteroidEvent = function () {
      this.asteroidLoaded ||
        ((this.asteroidImage = new Image()),
        (this.asteroidImage.src = "images/events/asteroid.png"),
        (this.asteroidImage.onload = function () {
          objG_assets.asteroidLoaded = true;
          objG_assets.loadTintImage(
            objG_assets.asteroidImage,
            function (b) {
              objG_assets.whiteAsteroidImage = b;
            },
            "#FF3333",
          );
        }),
        (this.blinkImage = new Image()),
        (this.blinkImage.src = "images/events/blink.png"));
    };
  },
  Class_InputManager = function () {
    let _this = this,
      bool_isLeftMousePressed = false,
      f = 0,
      d = 0;
    this.angle = Math.PI;
    this.throttle = 0;
    this.rotationValue = 0.1;
    this.varAngle = 0;
    this.mouseMoved = false;
    this.hover = 1;
    _this.keydown = function (event) {
      67 == event.keyCode && bool_following_plane && eb
        ? setTimeout(function () {
            func_displayCopyLink();
          }, 10)
        : bool_following_plane ||
          (32 == event.keyCode
            ? Z && objG_wsConnection.sendShooting(true)
            : 188 != event.keyCode &&
              49 != event.keyCode &&
              (222 == event.keyCode
                ? (bool_drawUI = !bool_drawUI)
                : 51 == event.keyCode
                  ? ((bool_drawGradient = !bool_drawGradient),
                    console.log("Toggled Gradient to " + bool_drawGradient))
                  : 52 == event.keyCode
                    ? ((bool_drawClouds = !bool_drawClouds),
                      console.log("Toggled drawClouds to " + bool_drawClouds))
                    : 53 == event.keyCode
                      ? ((bool_drawWater = !bool_drawWater),
                        console.log("Toggled drawWater to " + bool_drawWater))
                      : 54 == event.keyCode
                        ? ((bool_drawExplosions = !bool_drawExplosions),
                          console.log(
                            "Toggled drawExplosions to " + bool_drawExplosions,
                          ))
                        : 55 == event.keyCode
                          ? ((bool_drawSun = !bool_drawSun),
                            console.log("Toggled drawSun to " + bool_drawSun))
                          : 56 == event.keyCode
                            ? ((bool_drawItems = !bool_drawItems),
                              console.log(
                                "Toggled drawItems to " + bool_drawItems,
                              ))
                            : 57 == event.keyCode
                              ? ((bool_drawTrails = !bool_drawTrails),
                                console.log(
                                  "Toggled drawTrails to " + bool_drawTrails,
                                ))
                              : 48 == event.keyCode
                                ? ((bool_drawSplashes = !bool_drawSplashes),
                                  console.log(
                                    "Toggled drawSplashes to " +
                                      bool_drawSplashes,
                                  ))
                                : 27 == event.keyCode
                                  ? (func_showAds(),
                                    (num_max_volume =
                                      0.05 * num_setting_muteVol),
                                    $("#overlay").show(),
                                    funcR_hc_showPf(),
                                    (bool_following_plane = true),
                                    Z || ((ka = 1), (objG_player_plane = null)))
                                  : 70 == event.keyCode &&
                                    (document.fullscreenElement ||
                                    document.mozFullScreenElement ||
                                    document.webkitFullscreenElement ||
                                    document.msFullscreenElement
                                      ? document.exitFullscreen
                                        ? document.exitFullscreen()
                                        : document.msExitFullscreen
                                          ? document.msExitFullscreen()
                                          : document.mozCancelFullScreen
                                            ? document.mozCancelFullScreen()
                                            : document.webkitExitFullscreen &&
                                              document.webkitExitFullscreen()
                                      : document.documentElement
                                            .requestFullscreen
                                        ? document.documentElement.requestFullscreen()
                                        : document.documentElement
                                              .msRequestFullscreen
                                          ? document.documentElement.msRequestFullscreen()
                                          : document.documentElement
                                                .mozRequestFullScreen
                                            ? document.documentElement.mozRequestFullScreen()
                                            : document.documentElement
                                                .webkitRequestFullscreen &&
                                              document.documentElement.webkitRequestFullscreen(
                                                Element.ALLOW_KEYBOARD_INPUT,
                                              ),
                                    objGUI_gameInfo.clearTip())));
    };
    _this.keyup = function (event) {
      bool_following_plane ||
        32 != event.keyCode ||
        (Z
          ? objG_wsConnection.sendShooting(false)
          : (1 == ka
              ? ((ka = 0), objG_followMode.followTopPlayer())
              : ((ka = 1), (objG_player_plane = null)),
            objG_eventManager.isSpaceWars() &&
              setTimeout(objG_followMode.respawnParticles, 500)));
    };
    _this.mousedown = function (event) {
      bool_following_plane ||
        (Z
          ? 0 == event.button && objG_wsConnection.sendShooting(true)
          : 0 == ka
            ? 0 == event.button
              ? objG_followMode.PlayerFollowing(true)
              : 2 == event.button && objG_followMode.PlayerFollowing(false)
            : ((bool_isLeftMousePressed = true),
              (f = event.clientX),
              (d = event.clientY)));
    };
    _this.mouseup = function (event) {
      bool_following_plane ||
        (Z
          ? 0 == event.button && objG_wsConnection.sendShooting(false)
          : (bool_isLeftMousePressed = false));
    };
    _this.mousemove = function (event) {
      if (
        !bool_following_plane &&
        ((_this.mouseMoved = true),
        (qc = event.clientX),
        (rc = event.clientY),
        bool_isLeftMousePressed)
      ) {
        let c = event.clientY - d,
          g = objGUI_anchor.x - (event.clientX - f),
          h = objGUI_anchor.y - c;
        h < -E / 2 ? (h = -E / 2) : h > E / 2 && (h = E / 2);
        g < -$_sub ? (g = -$_sub) : g > $_sub && (g = $_sub);
        objGUI_anchor.setPosition(g, h);
        f = event.clientX;
        d = event.clientY;
      }
    };
    this.addListeners = function () {
      document.addEventListener("mousedown", _this.mousedown, false);
      document.addEventListener("mousemove", _this.mousemove, false);
      document.addEventListener("mouseup", _this.mouseup, false);
      document.addEventListener("keydown", _this.keydown, false);
      document.addEventListener("keyup", _this.keyup, false);
    };
  },
  Class_ParticleImpacts = function () {
    let b = [];
    this.draw = function (e) {
      let f, d, a, c, g, h, q, n, k, m, l, y, r, p;
      for (f = [], d = 0; d < b.length; d++) {
        a = b[d];
        if (void 0 == objD_planes[a.id]) f.push(a);
        else if (a.weapon == id_weapon_railgun) {
          e.lineWidth = 2 + 5 * (1 - a.a);
          e.beginPath();
          (c = parseInt(255 * a.a)),
            (g = e.createLinearGradient(
              a.hitPosition.x,
              a.hitPosition.y,
              a.origPosition.x,
              a.origPosition.y,
            ));
          0 > a.a && (a.a = 0);
          h = 255;
          1 == a.special
            ? ((h = 0), (c = parseInt(0.4 * c)))
            : 2 == a.special && ((h = 200), (c = parseInt(0.1 * c)));
          g.addColorStop(0, "rgba(255," + h + "," + c + "," + a.a + ")");
          g.addColorStop(a.a, "rgba(255," + h + "," + c + "," + a.a + ")");
          g.addColorStop(1, "rgba(255," + h + "," + c + ",0.0)");
          e.strokeStyle = g;
          e.moveTo(a.origPosition.x, a.origPosition.y);
          e.lineTo(a.hitPosition.x, a.hitPosition.y);
          e.stroke();
          (g = (a.hitPosition.x - a.origPosition.x) / 100),
            (h = (a.hitPosition.y - a.origPosition.y) / 100),
            (q = a.angle),
            (n = a.origPosition.x),
            (k = a.origPosition.y),
            (m = 0);
          e.beginPath();
          e.lineWidth = 2 == a.special ? 10 : 4;
          l = 5;
          a.special && (l = 8);
          for (c = 0; 100 > c; c++) {
            (m = m + Math.PI / 4),
              (n = Math.sin(m - 4 * a.a) * (6 + (1 - a.a) * l)),
              (y = n * Math.cos(q)),
              (r = n * Math.sin(q)),
              (n = a.origPosition.x + g * c),
              (k = a.origPosition.y + h * c);
            0 == c ? e.moveTo(n + y, k + r) : e.lineTo(n + y, k + r);
          }
          e.stroke();
          a.a -= 0.04;
          0 > a.a && f.push(a);
        } else if (objG_eventManager.isSpaceWars())
          (c = 45),
            a.isKing && (c = 90),
            (g = a.curPosition.x),
            (h = a.curPosition.y),
            (q = a.curPosition.x - a.origPosition.x),
            (m = a.curPosition.y - a.origPosition.y),
            (q = Math.sqrt(q * q + m * m)),
            q > c
              ? ((q = a.curPosition.x - a.direction.x * c),
                (m = a.curPosition.y - a.direction.y * c))
              : ((q = a.origPosition.x), (m = a.origPosition.y)),
            a.isKing
              ? ((e.shadowColor = "green"),
                (e.lineWidth = 9),
                (e.strokeStyle = "rgba(50,255,50,0.7)"),
                e.beginPath(),
                e.moveTo(g, h),
                e.lineTo(q, m),
                e.stroke(),
                (e.lineWidth = 4),
                (e.strokeStyle = "rgba(150,255,150,1.0)"))
              : a.weapon != id_weapon_trishoot
                ? ((e.shadowColor = "red"),
                  (e.lineWidth = 7),
                  (e.strokeStyle = "rgba(255,50,50,1.0)"),
                  e.beginPath(),
                  e.moveTo(g, h),
                  e.lineTo(q, m),
                  e.stroke(),
                  (e.lineWidth = 3),
                  (e.strokeStyle = "rgba(255,150,150,1.0)"))
                : ((e.shadowColor = "red"),
                  (e.lineWidth = 7),
                  (e.strokeStyle = "rgba(255,126,39,1.0)"),
                  e.beginPath(),
                  e.moveTo(g, h),
                  e.lineTo(q, m),
                  e.stroke(),
                  (e.lineWidth = 3),
                  (e.strokeStyle = "rgba(255,255,255,1.0)")),
            e.beginPath(),
            e.moveTo(g, h),
            e.lineTo(q, m),
            e.stroke(),
            a.finish
              ? f.push(a)
              : ((c = a.curPosition.x - a.hitPosition.x),
                (g = a.curPosition.y - a.hitPosition.y),
                (c = Math.sqrt(c * c + g * g)),
                (a.a -= 0.05),
                (g = 70 + 10 * Math.random()),
                c < g
                  ? ((a.finish = true),
                    (a.curPosition.x = a.hitPosition.x),
                    (a.curPosition.y = a.hitPosition.y))
                  : ((a.curPosition.x += a.direction.x * g),
                    (a.curPosition.y += a.direction.y * g)));
        else {
          e.lineWidth = 3;
          e.beginPath();
          c = 140;
          g = a.curPosition.x;
          h = a.curPosition.y;
          q = a.curPosition.x - a.origPosition.x;
          m = a.curPosition.y - a.origPosition.y;
          q = Math.sqrt(q * q + m * m);
          q > c
            ? ((q = a.curPosition.x - a.direction.x * c),
              (m = a.curPosition.y - a.direction.y * c))
            : ((q = a.origPosition.x), (m = a.origPosition.y));
          (c = e),
            (n = r = y = l = void 0),
            (n = q - g),
            (r = m - h),
            (p = g + 0.05 * n),
            (k = h + 0.05 * r),
            (l = Math.sqrt(n * n + r * r)),
            (n = n / l),
            (r = r / l),
            (n = 3 * n),
            (r = 3 * r),
            (l = p + -r),
            (y = k + n),
            (r = p - -r),
            (n = k - n);
          c.moveTo(g, h);
          c.lineTo(l, y);
          c.lineTo(q, m);
          c.lineTo(r, n);
          e.fillStyle = "rgba(255,255,255," + a.a + ")";
          e.fill();
          a.finish
            ? f.push(a)
            : ((c = a.curPosition.x - a.hitPosition.x),
              (g = a.curPosition.y - a.hitPosition.y),
              (c = Math.sqrt(c * c + g * g)),
              (a.a -= 0.05),
              (g = 100),
              c < g
                ? ((a.finish = true),
                  (a.curPosition.x = a.hitPosition.x),
                  (a.curPosition.y = a.hitPosition.y))
                : ((a.curPosition.x += a.direction.x * g),
                  (a.curPosition.y += a.direction.y * g)));
        }
      }
      for (c = 0; c < f.length; c++) (e = b.indexOf(f[c])), b.splice(e, 1);
      f.length = 0;
    };
    this.addShot = function (e, f, d, a) {
      if (func_isTimeElapsed_50ms() && xa) {
        let c = objD_planes[e];
        if (c) {
          let g = {};
          g.id = e;
          g.angle = c.angle;
          g.isKing = qa == e;
          g.hitPosition = {
            x: 10 * f,
            y: 10 * d,
          };
          g.special = 0;
          objG_eventManager.isInstagib()
            ? (g.special = 1)
            : objG_eventManager.isSpaceWars() && (g.special = 2);
          g.a = 1;
          g.weapon = a;
          f = func_rotatePoint(0, -10, c.angle);
          e = c.x + f.x;
          d = c.y + f.y;
          g.origPosition = {
            x: e,
            y: d,
          };
          c = g.hitPosition.x - e;
          f = g.hitPosition.y - d;
          a != id_weapon_superweapon &&
            ((a = Math.sqrt(c * c + f * f)),
            (g.direction = {
              x: c / a,
              y: f / a,
            }),
            (g.curPosition = {
              x: e,
              y: d,
            }),
            (g.finish = false),
            (func_isInsideBox(e, d, 100) ||
              func_isInsideBox(g.hitPosition.x, g.hitPosition.y, 100)) &&
              b.push(g));
          a = E / 2;
          g.hitPosition.y > a &&
            ((e = f / c),
            obj_particleImpacts.addSplash(
              (a - (g.hitPosition.y - e * g.hitPosition.x)) / e,
              a + 6,
              1,
              false,
            ));
        }
      }
    };
    this.addMissileImpact = function (b, f) {
      let d = 10 * b,
        a = 10 * f;
      if (func_isInsideBox(d, a, 100) && func_isTimeElapsed_50ms()) {
        let c = objG_animationManager.createAnimation("explosion");
        c.setScale(1);
        c.posX = 10 * b;
        c.posY = 10 * f;
        objG_animationManager.runAnimationBehind(c);
        d =
          1 - func_calculateDistance2D(d, a, H.x, H.y) / num_sound_max_distance;
        objG_sfxManager.playSound(str_sfxid_mexpl, d, 1, const_Sa_3, null);
      }
    };
    this.addSplash = function (b, f, d, a) {
      if (
        bool_drawSplashes &&
        !objG_eventManager.isSpaceWars() &&
        func_isInsideBox(b, f, 100) &&
        func_isTimeElapsed_50ms()
      ) {
        let c = objG_animationManager.createAnimation("splash"),
          g = objG_animationManager.createAnimation("splashReflex");
        c.setScale(d);
        a && (c.scaleX *= 1.2 + 0.4 * Math.random());
        c.posX = b;
        c.posY = f - (61 * c.scaleY) / 2;
        objG_animationManager.runAnimation(c);
        g.scaleX = c.scaleX;
        g.posX = c.posX;
        g.posY = c.posY + 77;
        g.scaleY = -2;
        objG_animationManager.runAnimationLayer2(g);
      }
    };
  },
  Class_UI_GameInfo = function () {
    let b,
      e,
      f,
      d = 0,
      a = true,
      c,
      g,
      h,
      q,
      objUI_killStatus = new Class_UI_KillStatus(),
      k,
      m,
      l,
      y,
      r,
      K,
      pa,
      s,
      w,
      z = -1,
      ta = false,
      F,
      C,
      P,
      R,
      S,
      O,
      Vb,
      ea = 1,
      Ga = 0,
      objUI_ActivityMessages = new Class_UI_ActivityMessages(),
      Fa,
      ua,
      E,
      I = 0,
      Ta,
      Ha,
      Ia,
      H = 0,
      ab,
      L,
      X = -1,
      U = false,
      V = 0,
      Q,
      W,
      $_sub,
      M,
      N,
      da,
      aa = null,
      ja = null,
      ca,
      fa,
      ia,
      ha,
      wa,
      na = 0,
      oa = 0,
      va = null,
      la,
      ma,
      ya,
      sa;
    this.draw = function (I) {
      let r, K, P, O, R, S;
      if (ta) {
        C = document.createElement("canvas");
        r = C.getContext("2d");
        this.renderLeaderboard(r, C);
      }
      if (0 < na) this.DrawWinnerLabel(I);
      else if (0 < oa) this.DrawWarshipDestroyedLabel(I);
      else {
        C &&
          0 < numG_player_count &&
          (!bool_following_plane || bool_continueGame) &&
          this.drawLeaderboard(I);
        if (objG_player_plane && !bool_following_plane) {
          I.save();
          int_pathMobile
            ? I.scale(1.5 * num_scale_factor, 1.5 * num_scale_factor)
            : I.scale(num_scale_factor, num_scale_factor);
          K = objG_assets.frames.indicator;
          I.translate(K.width / 2 + 6, K.height / 2 + 6);
          K.draw(I);
          this.DrawCurrentWeaponIcon(I, objG_player_plane.weapon);
          (r = 19), (P = 0);
          int_pathMobile && ((r = 24), (P = -5));
          null == pa && (pa = new Class_StrokeStyle(r, "#FFFFFF"));
          R = objG_eventManager.isInstagib();
          if (z != objG_player_plane.GetAmmo() || null == s) {
            S = "\u221e";
            R || ((z = objG_player_plane.GetAmmo()), -1 < z && (S = z));
            pa.setValue(S);
            s = pa.render();
            w = s.width;
          }
          I.globalAlpha = 1;
          I.drawImage(s, 0.57 * -w, 0.19 * K.height + r / 2 + P);
          I.restore();
          this.DrawScore(I);
        }
        if (0 < d) {
          K = 0;
          r = +new Date() - d;
          4e3 > r ? (K = 3e3 > r ? 1 : 1 - (r - 3e3) / 1e3) : (d = 0);
          h ||
            ((P = 20),
            int_pathMobile && (P = 30),
            (r = false),
            f
              ? ((r = 40),
                int_pathMobile && (r = 50),
                (q = new Class_TextStyle(
                  r * num_scale_factor,
                  "#FF0000",
                  "#990000",
                )),
                q.setValue(f),
                q.setUsingFrame(true),
                (r = true),
                int_pathMobile ? q.setAddTop(35) : q.setAddTop(25))
              : ((q = null), (P = int_pathMobile ? 45 : 35)),
            (h = new Class_TextStyle(
              P * num_scale_factor,
              "#FF0000",
              "#990000",
            )),
            h.setValue(e),
            h.setUsingFrame(!r));
          P = 0.25 * canvas.height;
          a
            ? (h.setColor("#00ea11"),
              h.setSecondColor("#006b08"),
              q && (q.setColor("#00ea11"), q.setSecondColor("#006b08")))
            : (h.setColor("#ff0608"),
              h.setSecondColor("#a20400"),
              q && (q.setColor("#ff0608"), q.setSecondColor("#a20400")));
          (r = h.render()), O;
          f && (O = q.render());
          I.globalAlpha = K;
          O && I.drawImage(O, 0.5 * canvas.width - O.width / 2, P - 5);
          I.drawImage(r, 0.5 * canvas.width - r.width / 2, P);
          I.globalAlpha = 1;
        }
        k &&
          ((P = 0.6 * canvas.height),
          (K = (m / 1e3) * 10),
          1 < K && (K = 1),
          g ||
            ((r = 30),
            int_pathMobile && (r = 40),
            (g = new Class_TextStyle(
              r * num_scale_factor,
              "#FF0000",
              "#990000",
            ))),
          g.setValue(k),
          g.setUsingFrame(true),
          (r = g.render()),
          (O = 0.1 * Math.sin(m / 100) * num_scale_factor),
          I.save(),
          I.translate(0.5 * canvas.width, P),
          I.scale(1 + O, 1 + O),
          I.translate(-r.width / 2, 0),
          (I.globalAlpha = K),
          I.drawImage(r, 0, 0),
          I.restore());
        l &&
          ((P = 0.397 * canvas.height),
          (K = 1),
          y ||
            ((r = 20),
            int_pathMobile && (r = 30),
            (y = new Class_TextStyle(
              r * num_scale_factor,
              "#FF0000",
              "#990000",
            ))),
          y.setValue(l),
          y.setUsingFrame(false),
          (r = y.render()),
          I.save(),
          I.translate(0.5 * canvas.width, P),
          I.scale(0.8, 0.8),
          I.translate(-r.width / 2, 0),
          (I.globalAlpha = K),
          I.drawImage(r, 0, 0),
          I.restore());
        objG_wsConnection.hasConnection &&
          xa &&
          (objG_eventManager.waiting && !int_pathMobile
            ? this.DrawWarmupTime(I)
            : objG_eventManager.isInEvent()
              ? this.DrawEventLabel(I)
              : La && !bool_following_plane && this.DrawLaserDeployed(I));
        null == k &&
          objUI_killStatus.shouldDraw() &&
          (I.save(),
          I.translate(0.5 * canvas.width, 0.67 * canvas.height),
          objUI_killStatus.draw(I),
          I.restore());
        Z ||
          bool_following_plane ||
          ((O = "FREE MODE"),
          0 == ka &&
            (O = objG_player_plane
              ? "Following " +
                func_renameBlankPlayerNames(objG_player_plane.name)
              : "FOLLOW MODE"),
          c ||
            (c = new Class_TextStyle(
              30 * num_scale_factor,
              "#ffd118",
              "#b56006",
            )),
          c.setValue(O),
          c.setUsingFrame(true),
          (r = c.render()),
          (I.globalAlpha = 1),
          (P = 0.14 * canvas.height),
          I.drawImage(r, 0.5 * canvas.width - r.width / 2, P));
        Ta &&
          (4e3 > H
            ? (null == Ia &&
                ((r = 20),
                int_pathMobile && (r = 30),
                (Ha = new Class_StrokeStyle(
                  r * num_scale_factor,
                  "#ffd118",
                  true,
                  "#633504",
                )),
                Ha.setValue(Ta),
                Ha.setStrokeWidth(5),
                Ha.setRoundedFrameOpacity(0.5),
                Ha.setHMargin(5),
                Ha.setUsingRoundedFrame(true),
                (Ia = Ha.render())),
              (O = 1),
              300 > H
                ? ((O = H / 300), (O = Math.sqrt(O, 10)))
                : 3700 < H &&
                  ((O = 1 - (H - 3700) / 300), (O = Math.sqrt(O, 10))),
              I.drawImage(
                Ia,
                Ka / 2 - Ia.width / 2,
                1.1 * Ia.height * O - Ia.height,
              ))
            : (Ta = null));
        bool_following_plane ||
          int_pathMobile ||
          objUI_ActivityMessages.draw(I);
        !bool_following_plane && 0 < qa && this.DrawKing(I);
        ta && (ta = false);
        b != num_scale_factor && ((c = g = null), (b = num_scale_factor));
      }
    };
    this.DrawKing = function (a) {
      if (F && 0 < F.length && 0 < Object.keys(objD_planes).length) {
        let c = objD_planes[F[0]],
          d;
        if (c) {
          d = func_renameBlankPlayerNames(c.name);
          objG_player_plane &&
            I != c.id &&
            c.id == objG_player_plane.id &&
            objG_sfxManager.playSound(str_sfxid_king, 1, 1, 1, null);
          I = c.id;
          d != Fa &&
            ((c = 25),
            int_pathMobile && (c = 35),
            (ua = new Class_TextStyle(
              c * num_scale_factor,
              "#fe9b00",
              "#6e3800",
            )),
            (c = " "),
            bool_setting_highQuality || (c = ""),
            int_pathMobile && (c = "  "),
            ua.setValue(c + "  King: " + d),
            ua.setUsingRoundedFrame(true));
          Fa = d;
          E = ua.render();
        }
        ua &&
          (a.save(),
          (d = 0.83 * canvas.height),
          a.drawImage(E, 0.5 * canvas.width - E.width / 2, d),
          (c = 20),
          bool_setting_highQuality || (c = 13),
          a.translate(
            0.5 * canvas.width - E.width / 2 + c,
            d + E.height / 2 - 2 * num_scale_factor,
          ),
          (d = 1),
          int_pathMobile && (d = 1.5),
          a.scale(num_scale_factor * d, num_scale_factor * d),
          objG_assets.frames.crown.draw(a),
          a.restore());
      }
    };
    this.DrawLaserDeployed = function (a) {
      a.save();
      let c, d;
      if (Ma != X) {
        X = Ma;
        c = 25;
        int_pathMobile && (c = 35);
        L = new Class_TextStyle(c * num_scale_factor, "#fbc521", "#c78109");
        Ma
          ? L.setValue("     Super Weapon: " + Ma)
          : L.setValue("     Find The Super Weapon!");
        L.setUsingRoundedFrame(true);
        ab = L.render();
      }
      c = 0.05 * canvas.height;
      a.drawImage(ab, 0.5 * canvas.width - ab.width / 2, c);
      d = 30;
      bool_setting_highQuality || (d = 20);
      a.translate(0.5 * canvas.width - ab.width / 2 + d, c + ab.height / 2);
      a.scale(num_scale_factor, num_scale_factor);
      objG_assets.frames.laser.draw(a);
      a.restore();
    };
    this.DrawRank = function (a) {
      0 < objG_player_plane.rank &&
        (void 0 == rankCanvas &&
          ((rankCanvas = document.createElement("canvas")),
          (rankCanvas.width = 200),
          (rankCanvas.height = 200),
          (rankCanvasContext = rankCanvas.getContext("2d"))),
        lastRankNumber != objG_player_plane.rank &&
          (rankCanvasContext.clearRect(0, 0, 200, 200),
          (rankCanvasContext.globalAlpha = 0.3),
          (rankCanvasContext.fillStyle = "rgba(0,0,0,1.0)"),
          func_drawRoundedRectangle(
            rankCanvasContext,
            0,
            0,
            200,
            200,
            30 * num_scale_factor,
          ),
          (ca = new Class_StrokeStyle(15 * num_scale_factor, "#EEEEEE")),
          ca.setValue(objG_player_plane.rank),
          ca.setUsingRoundedFrame(false),
          (fa = ca.render()),
          (lastRankNumber = objG_player_plane.rank)),
        a.drawImage(rankCanvas, Ka - 200, ib - 200));
    };
    this.DrawScore = function (a) {
      if (0 < objG_player_plane.rank) {
        let c = 16 * num_scale_factor,
          d = "Arial Black";
        int_pathMobile && ((c = 36 * num_scale_factor), (d = "Arial-BoldMT"));
        let b = P * num_scale_factor,
          g = b,
          h = 30 * num_scale_factor,
          e = 5 * num_scale_factor,
          k = 10 * num_scale_factor,
          n = Ka - b - 5,
          f = S + 5 + 5;
        int_pathMobile && ((h = 60 * num_scale_factor), (g = b));
        void 0 == r &&
          ((r = document.createElement("canvas")), (K = r.getContext("2d")));
        if (-1 != objG_player_plane.score)
          for (
            r.width = g,
              r.height = h,
              K.font = c + "px 'proxima-nova-1','proxima-nova-2', " + d,
              K.globalAlpha = 0.3,
              K.textBaseline = "hanging",
              func_drawRoundedRectangle(K, 0, 0, b, h, 30 * num_scale_factor),
              K.globalAlpha = 1,
              c = 2;
            0 <= c;
            c--
          )
            (d = 0),
              0 != c
                ? ((K.fillStyle = "rgba(100,49,0,1.0)"), (d = c))
                : (K.fillStyle = "rgba(255,156,0,1.0)"),
              K.fillText(objG_player_plane.rank + ". You ", e, k + d),
              (g = K.measureText(objG_player_plane.score).width),
              K.fillText(objG_player_plane.score, b - e - g, k + d);
        a.drawImage(r, n, f + 5);
      }
    };
    this.DrawWarmupTime = function (a) {
      if (U) {
        U = false;
        let c = objG_eventManager.endTime - T;
        if (0 > parseInt(c)) return;
        W = new Class_TextStyle(
          23 * num_scale_factor,
          objG_eventManager.getEventColor(),
          "#6e3800",
        );
        W.setValue(objG_eventManager.getEventName());
        N = W.render();
        $_sub = new Class_TextStyle(
          20 * num_scale_factor,
          "#fe9b00",
          "#6e3800",
        );
        $_sub.setValue("STARTS IN");
        da = $_sub.render();
        Q = new Class_TextStyle(27 * num_scale_factor, "#fe9b00", "#6e3800");
        Q.setValue(func_millisToTimeFormat(c));
        M = Q.render();
      }
      if (M) {
        let c = 0.8 * canvas.height,
          d;
        (d = N.width),
          (d = da.width > d ? da.width : d),
          (d = M.width > d ? M.width : d);
        a.fillStyle = "#000000";
        a.globalAlpha = 0.3;
        func_drawRoundedRectangle(a, canvas.width - d - 20, c, d, 102, 20);
        a.globalAlpha = 1;
        a.drawImage(N, canvas.width - d - 20, c);
        a.drawImage(da, canvas.width - d / 2 - da.width / 2 - 20, c + 36);
        a.drawImage(M, canvas.width - d / 2 - M.width / 2 - 20, c + 60);
      }
    };
    this.DrawEventLabel = function (a) {
      if (U) {
        U = false;
        let c = objG_eventManager.endTime - T;
        0 > parseInt(c) && (c = 0);
        W = new Class_TextStyle(
          25 * num_scale_factor,
          objG_eventManager.getEventColor(),
          "#6e3800",
        );
        W.setValue(objG_eventManager.getEventName());
        N = W.render();
        Q = new Class_TextStyle(25 * num_scale_factor, "#fe9b00", "#6e3800");
        objG_eventManager.isWarship()
          ? 0 < objG_eventManager.warshipsLeft
            ? Q.setValue("Warships Left: " + objG_eventManager.warshipsLeft)
            : 0 == objG_eventManager.warshipsEscaped
              ? Q.setValue("All Warships Destroyed!")
              : Q.setValue(
                  objG_eventManager.warshipsDestroyed +
                    " Destroyed, " +
                    objG_eventManager.warshipsEscaped +
                    " Escaped!",
                )
          : Q.setValue(func_millisToTimeFormat(c));
        M = Q.render();
      }
      if (M) {
        let c = 0.04 * canvas.height,
          d = M.width < N.width ? N.width : M.width;
        a.fillStyle = "#000000";
        a.globalAlpha = 0.3;
        func_drawRoundedRectangle(a, canvas.width / 2 - d / 2, c, d, 69, 20);
        a.globalAlpha = 1;
        a.drawImage(N, canvas.width / 2 - N.width / 2, c);
        a.drawImage(M, canvas.width / 2 - M.width / 2, c + 30);
      }
    };
    this.DrawWinnerLabel = function (a) {
      !ia &&
        aa &&
        ((ia = new Class_TextStyle(
          55 * num_scale_factor,
          "#fe6800",
          "#6e3800",
        )),
        ia.setValue("WINNER"),
        (ha = ia.render()),
        (wa = new Class_TextStyle(45 * num_scale_factor, "#fe9b00", "#6e3800")),
        wa.setValue(aa),
        (renderedWinnerNameCachedText = wa.render()));
      if (ha) {
        let c = 0.13 * canvas.height,
          d =
            ha.width > renderedWinnerNameCachedText.width
              ? ha.width
              : renderedWinnerNameCachedText.width;
        a.fillStyle = "#000000";
        a.globalAlpha = 0.3;
        func_drawRoundedRectangle(a, canvas.width / 2 - d / 2, c, d, 140, 20);
        a.globalAlpha = 1;
        a.drawImage(ha, canvas.width / 2 - ha.width / 2, c);
        a.drawImage(
          renderedWinnerNameCachedText,
          canvas.width / 2 - renderedWinnerNameCachedText.width / 2,
          c + 70,
        );
      }
    };
    this.DrawWarshipDestroyedLabel = function (a) {
      la ||
        ((la = new Class_TextStyle(
          45 * num_scale_factor,
          "#fe6800",
          "#6e3800",
        )),
        null == va ? la.setValue("WARSHIP") : la.setValue(va),
        (ma = la.render()),
        (ya = new Class_TextStyle(35 * num_scale_factor, "#fe9b00", "#6e3800")),
        null == va
          ? ya.setValue("ESCAPED!")
          : ya.setValue("DESTROYED A WARSHIP!"),
        (sa = ya.render()));
      if (ma) {
        let c = 0.13 * canvas.height,
          d = ma.width > sa.width ? ma.width : sa.width;
        a.fillStyle = "#000000";
        a.globalAlpha = 0.3;
        func_drawRoundedRectangle(a, canvas.width / 2 - d / 2, c, d, 114, 20);
        a.globalAlpha = 1;
        a.drawImage(ma, canvas.width / 2 - ma.width / 2, c);
        a.drawImage(sa, canvas.width / 2 - sa.width / 2, c + 60);
      }
    };
    this.DrawLastEventWinner = function (a) {
      null != aa &&
        aa != ja &&
        ((ca = new Class_StrokeStyle(15 * num_scale_factor, "#EEEEEE")),
        ca.setFont("px 'proxima-nova-1','proxima-nova-2', Arial Black"),
        ca.setValue(
          "Last Event Winner: " + func_renameBlankPlayerNames(aa) + " ",
        ),
        ca.setUsingRoundedFrame(true),
        (ja = aa),
        (fa = ca.render()));
      if (fa) {
        let c = 10 * num_scale_factor;
        a.drawImage(
          fa,
          canvas.width - fa.width - c,
          canvas.height - fa.height - c,
        );
      }
    };
    this.DrawCurrentWeaponIcon = function (a, c) {
      Vb != c && ((Vb = c), (Ga = 1));
      1 == Ga
        ? ((ea -= 0.15), 0 >= ea && ((O = Vb), (ea = 0), (Ga = 2)))
        : 2 == Ga && ((ea += 0.15), 1 <= ea && ((ea = 1), (Ga = 0)));
      let d = 0,
        b = 0,
        g = 0,
        h,
        e = true;
      switch (O) {
        case id_weapon_missile:
          d = 254;
          b = 69;
          g = 31;
          h = objG_assets.frames.iconRocket;
          break;
        case id_weapon_machinegun:
          d = 112;
          b = 130;
          g = 144;
          h = objG_assets.frames.iconMachinegun;
          break;
        case id_weapon_trishoot:
          d = 243;
          b = 150;
          g = 40;
          h = objG_assets.frames.iconTrishoot;
          break;
        case id_weapon_railgun:
          d = 40;
          b = 179;
          g = 243;
          h = objG_assets.frames.iconRailgun;
          break;
        case id_weapon_punch:
          d = 181;
          b = 25;
          g = 255;
          h = objG_assets.frames.iconMelee;
          break;
        case id_weapon_bombs:
          g = b = d = 127;
          h = objG_assets.frames.iconBombdrop;
          break;
        case id_weapon_superweapon:
          h = objG_assets.frames.iconLaserFull;
          e = false;
          break;
        default:
          return;
      }
      a.save();
      let k = Math.sqrt(ea);
      a.translate(0, -16);
      a.scale(k, k);
      a.translate(0, 16);
      a.lineWidth = 3;
      e &&
        (a.beginPath(),
        a.arc(-1, -11, 34, 0, 2 * Math.PI),
        a.closePath(),
        (a.fillStyle = "rgba(0,0,0,0.4)"),
        a.fill(),
        a.beginPath(),
        a.arc(-1, -17, 34, 0, 2 * Math.PI),
        a.closePath(),
        (a.strokeStyle = "rgba(255,255,255,1.0)"),
        (a.fillStyle = "rgba(" + d + "," + b + "," + g + ",1.0)"),
        a.fill(),
        a.stroke());
      a.translate(-1, -16);
      h.draw(a);
      a.restore();
    };
    this.update = function (a) {
      m += a;
      H += a;
      objUI_ActivityMessages.update(a);
      objUI_killStatus.update(a);
      V -= a;
      0 > V && ((V += 1e3), (U = true));
      0 < na && (na -= a);
      0 < oa && (oa -= a);
    };
    this.renderLeaderboard = function (a, c) {
      P = 270;
      S = 0;
      let d = 5 * num_scale_factor,
        b = 10 * num_scale_factor,
        g = 23 * num_scale_factor,
        h = 18 * num_scale_factor,
        e,
        k = 60 * num_scale_factor,
        n = 5 * num_scale_factor,
        f = 32,
        q = "Arial Black",
        I = 0,
        l,
        r,
        y,
        m;
      int_pathMobile &&
        ((f = 42),
        (P = 300),
        (g = 33 * num_scale_factor),
        (h = 28 * num_scale_factor),
        (q = "Arial-BoldMT"));
      e = S += d + g + d;
      m = F.length;
      int_pathMobile && (m = 5);
      10 < m && (m = 10);
      for (l = 0; l < m; l++) {
        r = objD_planes[F[l]];
        r &&
          ((S += h + b),
          (r = a.measureText(func_renameBlankPlayerNames(r.name)).width),
          I < r && (I = r));
      }
      S -= b;
      I > k && (P += I - k);
      R = P * num_scale_factor;
      S += d;
      S += n;
      c.width = R;
      c.height = S;
      k = h + "px 'proxima-nova-1','proxima-nova-2', " + q;
      a.fillStyle = "rgba(0,0,0,0.3)";
      func_drawRoundedRectangle(a, 0, 0, R, S, 30 * num_scale_factor);
      a.fillStyle = "rgba(204,84,0,1.0)";
      func_drawRoundedRectangleHalf(
        a,
        0,
        2,
        R,
        f * num_scale_factor,
        30 * num_scale_factor,
      );
      a.fillStyle = "rgba(254,102,3,1.0)";
      func_drawRoundedRectangleHalf(
        a,
        0,
        0,
        R,
        f * num_scale_factor,
        30 * num_scale_factor,
      );
      l = "LEADERBOARD";
      objG_eventManager.isInstagib() && (l = "KILLS");
      a.font = g + "px 'proxima-nova-1','proxima-nova-2', " + q;
      a.textBaseline = "hanging";
      r = a.measureText(l).width;
      a.fillStyle = "rgba(255,255,0,0.5)";
      a.fillText(l, R / 2 - r / 2, d + 1);
      a.fillStyle = "rgba(178,32,0,1.0)";
      a.fillText(l, R / 2 - r / 2, d);
      a.font = k;
      e += n;
      for (l = 0; l < m; l++)
        if ((r = objD_planes[F[l]])) {
          for (n = 2; 0 <= n; n--) {
            g = ". ";
            (r.inGame && r.id != qa) || (g = ".     ");
            q = l + 1 + g + func_renameBlankPlayerNames(r.name);
            g = 0;
            0 != n
              ? ((a.fillStyle = "rgba(100,49,0,1.0)"), (g = n))
              : (a.fillStyle =
                  ra == r.id ? "rgba(255,156,0,1.0)" : "rgba(255,220,0,1.0)");
            a.font = k;
            a.measureText(q);
            a.fillText(q, d, e + g);
            q = a.measureText(r.score).width;
            f = 1;
            I = 0;
            int_pathMobile && ((I = -6), (f = 1.5));
            if (r.inGame)
              r.id == qa &&
                (a.save(),
                (y = 38),
                9 == l && (y = 50),
                a.translate(
                  y * num_scale_factor * f + I,
                  e + g + 7 * num_scale_factor * f,
                ),
                a.scale(num_scale_factor * f, num_scale_factor * f),
                objG_assets.frames.crown.draw(a),
                a.restore());
            else {
              a.save();
              y = 38;
              9 == l && (y = 50);
              a.translate(
                y * num_scale_factor * f + I,
                e + g + 7 * num_scale_factor * f,
              );
              a.scale(num_scale_factor * f, num_scale_factor * f);
              objG_assets.frames.skull.draw(a);
              a.restore();
            }
            a.fillText(r.score, R - d - q, e + g);
          }
          e += h + b;
        }
    };
    this.drawLeaderboard = function (a) {
      a.drawImage(C, Ka - R - 5, 5);
    };
    this.addActivityMessage = function (a) {
      int_pathMobile || objUI_ActivityMessages.addActivityMessage(a);
    };
    this.addMessage = function (c, b, g) {
      e = c;
      h = null;
      f = g;
      d = +new Date();
      a = b;
    };
    this.showTip = function (a) {
      int_pathMobile || (Ta && this.clearTip(), (Ta = a), (H = 0), (Ia = null));
    };
    this.clearTip = function () {
      Ta = null;
    };
    this.showTargetLockedMessage = function () {
      l || (l = "[ LOCKED ]");
    };
    this.clearTargetLockedMessage = function () {
      l = null;
    };
    this.showWarningMessage = function (a) {
      k = a;
      m = 0;
    };
    this.clearWarningMessage = function () {
      k = null;
    };
    this.refreshLeaderboard = function (a) {
      F = a;
      ta = true;
    };
    this.addBonus = function (a, c) {
      objUI_killStatus.push(a, c);
    };
    this.clearBonusDisplay = function () {
      objUI_killStatus.clear();
    };
    this.clearNearMiss = function () {
      objUI_killStatus.clearNearMiss();
    };
    this.setLastWinner = function (a, c) {
      aa = func_renameBlankPlayerNames(a);
      console.log("Last Event Winner: " + a);
      c && ((ia = null), (na = 6e3));
    };
    this.setWarshipRemoved = function (a) {
      va = a;
      oa = 5e3;
      la = null;
    };
  },
  Class_UI_ActivityMessages = function () {
    let b = [],
      e = [];
    this.update = function (f) {
      0 < e.length && 15e3 < T - e[0] && (b.shift(), e.shift());
    };
    this.draw = function (e) {
      e.globalAlpha = 1;
      let d = canvas.height - 180 * num_scale_factor,
        a;
      for (a in b)
        e.drawImage(
          b[a],
          25,
          d +
            26 * num_scale_factor +
            5 +
            14 * a * num_scale_factor +
            15 * a * num_scale_factor,
        );
    };
    this.addActivityMessage = function (f) {
      let d = new Class_StrokeStyle(14 * num_scale_factor, "#EEEEEE");
      d.setFont("px 'proxima-nova-1','proxima-nova-2', Arial Black");
      d.setValue("\u2022 " + f);
      d.setUsingRoundedFrame(true);
      d.setHMargin(10);
      d.setVMargin(4);
      f = d.render();
      b.push(f);
      e.push(+new Date());
      5 < b.length && (b.shift(), e.shift());
      f = 0;
      for (let a in b) (d = b[a].width + 5 + 5), d > f && (f = d);
    };
  },
  Class_Plane = function () {
    let _this = this,
      num_spawn_cooldown_ms = 0,
      f = 100,
      d = false,
      obj_particleTrails = new Class_ParticleTrails(),
      obj_particleFlags,
      g,
      h = 0,
      q = (this.laserFrame = this.laserTimer = 0),
      obj_particleManager,
      k = 0,
      m = 0,
      l = 1,
      y = 0,
      r = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1],
      obj_scoreAccumInfo,
      pa = false,
      s = 0,
      w = 0,
      t = 0,
      x = 0,
      z = 0,
      C = 0,
      P = 1,
      R = 0,
      S = 0,
      O = false,
      G = true,
      ea = false,
      Ga = 0,
      D = 0,
      Fa = 0,
      ua = null,
      M = {
        1: "rgba(255, 255, 255, 0.6)",
        2: "rgba(255, 156, 0, 1.0)",
        4: "rgba(255, 43, 0, 1.0)",
        8: "rgba(0, 140, 255, 1.0)",
        16: "rgba(255, 255, 0, 1.0)",
        128: "rgba(255, 0, 255, 1.0)",
        256: "rgba(137, 137, 137, 1.0)",
      };
    this.lastUpdate = this.highlightValue = 0;
    this.id = -1;
    this.dstY =
      this.dstX =
      this.origY =
      this.origX =
      this.prevY =
      this.prevX =
      this.y =
      this.x =
        0;
    this.energy = 255;
    this.inGame = true;
    this.updateBool = false;
    this.momentum = this.speed = this.colorHue = 0;
    this.maxMomentum = 8;
    this.dstAngle = this.origAngle = this.angle = 0;
    this.controlAngle = -90;
    this.rotSpeed = 4;
    this.directionX = 0;
    this.directionY = -1;
    this.targetY = this.targetX = 0;
    this.targetMomentum = this.maxMomentum;
    this.name = "";
    this.first_set = true;
    this.rank = -1;
    this.score = 0;
    this.frameSwitchTime = 40;
    this.timeToNextFrame = 0;
    this.flameState = 1;
    this.lastImage;
    this.lastImageReflex;
    this.flipLastImage = 1;
    this.planeImages = objG_assets.planeFrames;
    this.planeImagesReflex = objG_assets.planeFramesReflex;
    this.decalFrames;
    this.decalID = this.colorID = 0;
    this.isShooting = this.isBot = this.hadHover = this.hover = false;
    obj_particleTrails.fixedColor = true;
    this.weapon = id_weapon_machinegun;
    this.ammo = -1;
    this.update = function (b) {
      if (this.inGame) {
        let g = 400,
          l;
        ea && this.weapon == id_weapon_superweapon && (g = 800);
        func_isInsideBox(this.x, this.y, g)
          ? pa ||
            (obj_particleTrails && obj_particleTrails.clear(),
            obj_particleFlags && obj_particleFlags.clear(),
            (pa = true))
          : (pa = false);
        g = this.weapon == id_weapon_superweapon && this.isShooting;
        0 < num_spawn_cooldown_ms &&
          ((f -= b),
          0 > f && ((f = 100), (d = !d)),
          (num_spawn_cooldown_ms -= b));
        objG_followMode.moveLeft && (this.controlAngle += this.rotSpeed);
        objG_followMode.moveRight && (this.controlAngle -= this.rotSpeed);
        360 < this.controlAngle
          ? (this.controlAngle = 0)
          : 0 > this.controlAngle && (this.controlAngle = 360);
        let k = func_clamp(
          (T - this.lastUpdate) / num_global_physics_step_ms,
          0,
          1,
        );
        this.prevX = this.x;
        this.prevY = this.y;
        let m = k * (this.dstY - this.origY) + this.origY;
        this.x = k * (this.dstX - this.origX) + this.origX;
        this.y = m;
        this.angle = k * (this.dstAngle - this.origAngle) + this.origAngle;
        k = this.x + 12 * Math.sin(-this.angle);
        m = this.y + 12 * Math.cos(-this.angle);
        obj_particleTrails &&
          (obj_particleTrails.setPosition(k, m),
          objG_eventManager.isSpaceWars() &&
            ((obj_particleTrails.width = 0.6),
            this.id == qa &&
              "#00FF00" != obj_particleTrails.style &&
              (obj_particleTrails.style = "#00FF00")));
        obj_particleFlags && obj_particleFlags.setPosition(k, m);
        (k =
          !this.hover && !obj_particleManager && !this.isInvulnerable() && !g)
          ? 0 == this.hadHover &&
            ((this.hadHover = true), obj_particleTrails.push())
          : (this.hadHover = false);
        obj_particleTrails &&
          ((obj_particleTrails.enabled = k), obj_particleTrails.update(b));
        obj_particleFlags &&
          ((obj_particleFlags.enabled = k), obj_particleFlags.update(b));
        k = E / 2;
        m = k - 150;
        if (this.y > m && this.y < k && 0 >= h) {
          h = 5;
          (l = Math.random() / 2),
            (m = (0.5 + (0.5 - ((k - this.y) / (k - m)) * 0.5)) * (0.95 + l)),
            (l = 20 * Math.sin(this.angle));
          obj_particleImpacts.addSplash(
            this.x - l,
            k + 5 * Math.random(),
            m,
            true,
          );
        }
        h -= b;
        obj_particleManager &&
          ((k = this.x + 12 * Math.sin(-this.angle)),
          (m = this.y + 12 * Math.cos(-this.angle)),
          obj_particleManager.setPosition(k, m),
          obj_particleManager.update(b));
        objG_player_plane == this && (hb = 0 == ha ? hb + b : 0);
        2 != ha
          ? objD_planes[gb] &&
            ((w = Math.sqrt(hb / uc)),
            1 < w && (w = 1),
            (s -= b),
            0 >= s &&
              (0 == ha
                ? ((s = 0.7 > w ? 200 + s : 80 + s),
                  objG_sfxManager.playSound(
                    str_sfxid_lockon,
                    0.1,
                    1,
                    const_Q_0,
                    null,
                  ))
                : 1 == ha &&
                  (objGUI_gameInfo.showTargetLockedMessage(),
                  (s = 50 + s),
                  objG_sfxManager.playSound(
                    str_sfxid_lockon,
                    0.1,
                    1.58,
                    const_Q_0,
                    null,
                  ))))
          : ((s = 0), objGUI_gameInfo.clearTargetLockedMessage());
        0 < ma
          ? ((t -= b),
            0 > t &&
              ((t = 100),
              objG_sfxManager.playSound(
                str_sfxid_lockon,
                0.1,
                0.5,
                const_Q_0,
                null,
              )))
          : (t = 0);
        this == objG_player_plane &&
          (ia ||
            objG_sfxManager.playSound(
              str_sfxid_planeloop,
              0.6,
              1,
              const_Q_0,
              function (a) {
                ia = a;
              },
            ),
          na ||
            objG_sfxManager.playSound(
              str_sfxid_waterloop,
              0,
              1,
              const_Q_0,
              function (a) {
                na = a;
              },
            ),
          (k = (E / 2 - this.y) / 1e3),
          1 < k && (k = 1),
          ia &&
            ((m = objG_sfxManager.sound._nodeById(ia)),
            objG_sfxManager.sound.volume(0.5 * num_max_volume, ia),
            0.01 > k && !objG_eventManager.isSpaceWars()
              ? m && m.bufferSource && (m.bufferSource.playbackRate.value = 0.1)
              : ((l = this.speed / 30),
                1 < l && (l = 1),
                (x += (0.3 + 0.8 * l - x) / 30),
                m &&
                  m.bufferSource &&
                  (m.bufferSource.playbackRate.value = x))),
          na &&
            ((m = 0),
            0.2 > k &&
              0.01 < k &&
              !objG_eventManager.isSpaceWars() &&
              (m = 1.7 * (0.2 - k)),
            objG_sfxManager.sound.volume(m * num_max_volume, na)));
        g
          ? ((k = func_calculateDistance2D(this.x, this.y, H.x, H.y)),
            (g = 1 - k / 3e3),
            1 < g && (g = 1),
            0.1 > g && (g = 0),
            0 == Fa
              ? (objG_sfxManager.playSound(
                  str_sfxid_lasershot,
                  0.2 * g,
                  0.5,
                  const_Q_0,
                  null,
                ),
                ua ||
                  objG_sfxManager.playSound(
                    str_sfxid_laserloop,
                    0.2 * g,
                    1,
                    const_Q_0,
                    function (a) {
                      nb = ua = a;
                    },
                  ))
              : ua &&
                objG_sfxManager.sound.volume(0.2 * g * num_max_volume, ua),
            (this.laserTimer += b),
            (Fa += b))
          : this.stopLaserSound();
        obj_particleManager &&
          this.weapon == id_weapon_punch &&
          1 < this.ammo &&
          (this.ammo = 1);
        0 < q && (q -= b);
        obj_scoreAccumInfo && obj_scoreAccumInfo.update(b);
        0 < R && (R -= b);
      }
    };
    this.getCurrentFrameNum = function (a) {
      a = parseInt(g / ((2 * Math.PI) / 28)) + 1;
      return (a = r[(a - 1) % 14]);
    };
    this.draw = function (b, h) {
      if (this.inGame && pa) {
        let e, f, K, s, v, R, w, S, O, t;
        obj_particleTrails && obj_particleTrails.draw(b);
        obj_particleFlags && obj_particleFlags.draw(b);
        obj_particleManager ||
          (b.save(),
          b.translate(this.x, this.y),
          (this.timeToNextFrame -= h),
          0 >= this.timeToNextFrame &&
            ((this.flameState = !this.flameState),
            (this.timeToNextFrame = this.frameSwitchTime)),
          this.hover &&
            (objG_eventManager.isSpaceWars()
              ? b.scale(0.5, 0.5)
              : b.scale(0.8, 0.8)),
          this.flameState && b.scale(0.88, 0.88),
          b.rotate(this.angle - Math.PI / 2),
          b.translate(-23, 0),
          this.isInvulnerable() && d && (b.globalAlpha = 0.3),
          objG_assets.frames.throttleFlame.draw(b),
          b.restore());
        g =
          Math.abs((this.angle - Math.PI / 2) % (2 * Math.PI)) +
          (2 * Math.PI) / 28 / 2;
        0 < this.angle - Math.PI / 2 && (g = 2 * Math.PI - g);
        this.flipLastImage = g > 0.5 * Math.PI && g < 1.5 * Math.PI ? -1 : 1;
        if (0 < q) {
          b.save();
          b.translate(this.x, this.y);
          b.scale(0.8, 0.8 * this.flipLastImage);
          b.rotate((this.angle - Math.PI / 2) * this.flipLastImage);
          b.translate(-15, -4);
          e = 1;
          60 > q ? (e = q / 60) : 240 < q && (e = (300 - q) / 60);
          b.globalAlpha = e;
          objG_assets.frames.punch.draw(b);
          b.restore();
        }
        b.save();
        b.translate(this.x, this.y);
        b.scale(0.7, 0.7);
        b.rotate(this.angle - Math.PI / 2);
        obj_particleManager
          ? ((k -= h),
            0 > k && ((k = m), y++, 8 == y && (l *= -1)),
            (y %= 14),
            (e = r[y]))
          : (y = e = this.getCurrentFrameNum(b));
        b.scale(1, this.flipLastImage * l);
        this.lastImage = this.planeImages[e - 1];
        void 0 == this.lastImage && (this.lastImage = this.planeImages[0]);
        this.lastImageReflex = this.planeImagesReflex[e - 1];
        void 0 == this.lastImageReflex &&
          (this.lastImageReflex = this.planeImagesReflex[0]);
        this.isInvulnerable() && d && (b.globalAlpha = 0.3);
        this.lastImage.draw(b);
        f = this.decalFrames[e - 1];
        void 0 == f && (f = this.decalFrames[0]);
        f.draw(b);
        16 < this.speed
          ? ((C += 0.06), 0.9 < C && (C = 0.9))
          : ((C -= 0.06), 0 > C && (C = 0));
        b.rotate(-Math.PI / 2);
        b.translate(0, 8);
        P++;
        1 < P && (P = 0);
        0 == P && ((z += 1), 2 < z && (z = 0));
        b.globalAlpha = C;
        objG_assets.frames["turbo" + z].draw(b);
        b.restore();
        0 < this.highlightValue &&
          !this.isInvulnerable() &&
          ((this.highlightValue -= 0.05),
          0 > this.highlightValue && (this.highlightValue = 0),
          b.save(),
          b.translate(this.x, this.y - 1),
          b.scale(0.7, 0.7),
          b.rotate(this.angle - Math.PI / 2),
          (b.globalAlpha = this.highlightValue),
          (e = objG_assets.whitePlaneImages["plane" + e]),
          g > 0.5 * Math.PI && g < 1.5 * Math.PI
            ? b.scale(1.2, -1.2)
            : b.scale(1.2, 1.2),
          e && b.drawImage(e, -e.width / 2, -e.height / 2),
          b.restore());
        obj_particleManager && obj_particleManager.draw(b);
        if (this.weapon == id_weapon_superweapon) {
          e = false;
          (g > 0.5 * Math.PI && g < 0.5 * Math.PI + Math.PI) || (e = true);
          if (this.isShooting) {
            b.save();
            (K = this.x - 10 * Ga), (s = this.y - 10 * D), (f = 500);
            ea && (f = Math.sqrt(K * K + s * s) - 10);
            100 > f && (f = 100);
            (v = objG_assets.frames.laser_opening.height),
              (R = Fa / 50),
              (w = 1),
              (S = 0.75 * Math.PI),
              (K = false);
            R > S
              ? ((R = R < 2 * S ? R - S : S), (w = Math.sin(0.04 * Fa)))
              : (K = true);
            b.translate(this.x, this.y);
            b.rotate(this.angle + Math.PI);
            e ? b.translate(2, 22) : b.translate(-2, 22);
            (O = s = Math.sin(R) / Math.sin(S)), (t = true);
            K &&
              (R < 0.5 * Math.PI
                ? (t = false)
                : ((R -= 0.5 * Math.PI), (O = Math.sin(R) / Math.sin(S))));
            t &&
              (b.scale((1 + 0.2 * w) * O, 1),
              b.translate(0, v / 2),
              objG_assets.frames.laser_opening.draw(b),
              (f -= v),
              b.translate(0, f / 2 + v / 2 - 1),
              b.scale(1, f),
              objG_assets.frames.laser_stretch.draw(b),
              b.scale(1, 1 / f),
              b.translate(0, f / 2 - 10),
              50 < this.laserTimer &&
                ((this.laserTimer = 0),
                (this.laserFrame = (this.laserFrame + 1) % 3)),
              ea
                ? objG_assets.frames["laser_collision" + this.laserFrame].draw(
                    b,
                  )
                : ((f = objG_assets.frames.laserfade.width),
                  b.rotate(Math.PI / 2),
                  b.translate(f / 2, 0),
                  objG_assets.frames.laserfade.draw(b)));
            b.restore();
            b.save();
            b.translate(this.x, this.y);
            b.rotate(this.angle + Math.PI);
            e ? b.translate(2, 22) : b.translate(-2, 22);
            K &&
              (b.scale(s, s),
              b.translate(0, 15),
              b.beginPath(),
              b.arc(0, 0, 15, 0, 2 * Math.PI),
              b.fill());
            b.restore();
          }
          b.save();
          b.translate(this.x, this.y);
          b.rotate(this.angle + Math.PI);
          b.translate(-3, 18);
          e && (b.scale(-1, 1), b.translate(-6, 0));
          b.rotate(-Math.PI / 2);
          objG_assets.frames.laserplug.draw(b);
          b.restore();
        }
      }
    };
    this.drawReflection = function (a, c) {
      if (this.inGame && pa) {
        let b = E / 2,
          d = b - this.y;
        if (!(0 > d || 170 < d)) {
          let h = d / 170;
          a.save();
          a.translate(this.x, b + d - 25);
          a.scale(0.8, 0.8 * -this.flipLastImage * (1 + 4 * h));
          g > 0.5 * Math.PI && g < 1.5 * Math.PI
            ? a.rotate(1.5 * Math.PI + (g - Math.PI / 2) + Math.PI)
            : a.rotate(this.angle - Math.PI / 2);
          b = 1;
          30 > d && 15 <= d ? (b = (d - 15) / 15) : 15 > d && (b = 0);
          a.globalAlpha = 0.7 * (1 - h) * b;
          this.lastImageReflex.draw(a);
          a.restore();
        }
      }
    };
    this.drawInput = function (a) {
      if (this.inGame) {
        let c = -objG_inputManager.angle + Math.PI,
          b = !objG_inputManager.hover;
        0.01 >= b && (b = 0.3);
        a.save();
        a.translate(this.x, this.y);
        a.rotate(c);
        a.translate(0, -28 - 10 * b);
        a.fillStyle = "rgba(255,255,255,0.4)";
        a.beginPath();
        a.moveTo(-8.8 * b, 0);
        a.lineTo(8.8 * b, 0);
        a.lineTo(0, -22 * b);
        a.fill();
        a.restore();
        2 != ha &&
          (c = objD_planes[gb]) &&
          this.DrawLockCrosshair(a, c.x, c.y, w, ha);
        0 < ma && this.DrawLockCrosshair(a, this.x, this.y, 1, 1);
        a.lineWidth = 1;
        a.beginPath();
        objG_eventManager.isSpaceWars()
          ? (a.strokeStyle = "rgba(255,255,255,0.3)")
          : (a.strokeStyle = "rgba(0,0,255,0.1)");
        a.arc(this.x, this.y, 75, 0, 2 * Math.PI);
        a.closePath();
        a.stroke();
      }
    };
    this.DrawLockCrosshair = function (a, c, b, d, g) {
      if (this.inGame) {
        a.lineWidth = 4;
        a.save();
        let h = 1;
        0 == ha && (h = 1 + 2 * (1 - d));
        a.beginPath();
        d = "hsla(43,100%," + (100 - 40 * d) + "%,1.0)";
        1 == g
          ? (d = "rgba(255,0,0,1.0)")
          : a.setLineDash([12 * h, 6 * h, 12 * h, 0]);
        a.strokeStyle = d;
        g = 30 * h;
        a.rect(c - g / 2, b - g / 2, g, g);
        a.stroke();
        a.restore();
      }
    };
    this.drawInfo = function (a) {
      if (this.inGame && pa) {
        let c, d;
        a.save();
        a.translate(this.x, this.y);
        if (!objG_eventManager.isInstagib()) {
          a.fillStyle = "rgba(126,219,226,1)";
          a.shadowOffsetX = 0;
          a.shadowOffsetY = 0;
          a.shadowBlur = 0;
          a.shadowColor = "rgba(255, 255, 255, 0.7)";
          a.lineWidth = 1;
          c = 28;
          qa == this.id && (c *= 2);
          d = 127.5;
          127.5 > this.energy && 63.75 < this.energy
            ? (d = 30)
            : 63.75 > this.energy && (d = 0);
          a.fillStyle = "hsl(" + d + ", 100%, 50%)";
          a.fillRect(-c / 2 + 0, 20, (this.energy / 255) * c, 8);
          a.strokeStyle = "rgba(255,255,255,1.0)";
          a.strokeRect(-c / 2, 20, c, 8);
        }
        G &&
          !lb &&
          ((a.fillStyle = "rgba(255,255,255,1)"),
          (a.fillStyle = "rgba(255,255,255,1.0)"),
          (a.font =
            "Bold 15px 'proxima-nova-1','proxima-nova-2', arial, sans-serif"),
          (a.textBaseline = "hanging"),
          (c = a.measureText(_this.name).width),
          (d = 38),
          objG_eventManager.isInstagib() && (d = 20),
          a.fillText(_this.name, -c / 2, d));
        a.restore();
        c = false;
        qa == this.id && (c = true);
        d = false;
        ub == this.id && (d = true);
        if (c || 0 < R || O || d)
          a.save(),
            a.translate(this.x, this.y - 30),
            O
              ? objG_assets.frames.pause.draw(a)
              : c
                ? objG_assets.frames.crown.draw(a)
                : d
                  ? objG_assets.frames.revengeIcon.draw(a)
                  : objG_assets.frames.frenzyIcon.draw(a),
            a.restore();
        obj_scoreAccumInfo &&
          (a.save(),
          (d = 0),
          c && (d = 30),
          a.translate(this.x, this.y - d),
          obj_scoreAccumInfo.draw(a),
          a.restore());
      }
    };
    this.setPose = function (b, d, g, h) {
      this.origX = this.x;
      this.origY = this.y;
      this.origAngle = this.dstAngle;
      this.dstX = 10 * b;
      this.dstY = 10 * d;
      this.dstAngle = g;
      this.first_set
        ? ((this.origX = this.dstX),
          (this.origY = this.dstY),
          (this.x = this.dstX),
          (this.y = this.dstY),
          (this.origAngle = this.dstAngle),
          (this.first_set = false),
          objG_wsConnection.firstClientListing ||
            (num_spawn_cooldown_ms = 1e3 * tc))
        : ((b = this.dstX - this.origX),
          (d = this.dstY - this.origY),
          (this.speed = Math.sqrt(b * b + d * d) / 3));
      this.inGame ||
        ((this.inGame = true),
        obj_particleTrails && obj_particleTrails.clear(),
        obj_particleFlags && obj_particleFlags.clear());
    };
    this.trailEffect = function () {
      wa && obj_particleTrails && obj_particleTrails.trailEffect();
    };
    this.hit = function (a) {
      func_isTimeElapsed_50ms() && (this.highlightValue = 1);
    };
    this.setScore = function (a) {
      let c = a - this.score;
      0 < c &&
        this == objG_player_plane &&
        (obj_scoreAccumInfo ||
          (obj_scoreAccumInfo = new Class_ScoreAccumInfo()),
        func_isTimeElapsed_50ms() && obj_scoreAccumInfo.addScore(c));
      this.score = a;
    };
    this.incScore = function (a) {
      this.setScore(this.score + a);
    };
    this.setName = function (c) {
      this.name = c;
      if ("" == c || null == c)
        (obj_particleTrails = new Class_ParticleTrails()),
          (obj_particleTrails.fixedColor = true),
          (obj_particleTrails.style = M[id_weapon_machinegun]),
          obj_particleTrails.clear();
    };
    this.setFlagInfo = function (b) {
      if (0 < b) {
        let d = b & 255;
        b >>= 8;
        let g = b & 255;
        b >>= 8;
        let h = 0 < (b & 4) ? true : false,
          e = 0 < (b & 2) ? true : false;
        G = 0 < (b & 8) ? true : false;
        obj_particleFlags = new Class_ParticleFlags();
        obj_particleFlags.flipX = e;
        obj_particleFlags.flipY = h;
        obj_particleFlags.scale = g / 100;
        obj_particleFlags.stringScale = d / 100;
        obj_particleFlags.setTexture(this.name);
      } else this.showName = true;
      obj_particleTrails = new Class_ParticleTrails();
      obj_particleTrails.fixedColor = true;
      obj_particleTrails.style = M[id_weapon_machinegun];
      obj_particleTrails.clear();
    };
    this.setEnergy = function (a) {
      this.energy = a;
      25 > a && !obj_particleManager
        ? ((obj_particleManager = new Class_ParticleManager()),
          obj_particleManager.init(15, this.x, this.y),
          (k = 0),
          (m = 20 + 40 * Math.random()),
          objG_player_plane == this &&
            (objG_sfxManager.playSound(
              str_sfxid_crash,
              0.7,
              1,
              const_Q_0,
              null,
            ),
            objGUI_gameInfo.clearNearMiss()))
        : 25 <= a &&
          obj_particleManager &&
          ((obj_particleManager = null), (l = 1));
    };
    this.GetAmmo = function () {
      return 1 == this.weapon ? -1 : this.ammo;
    };
    this.setColorID = function (a) {
      this.colorID = a;
      this.decalFrames = objG_assets.planes[this.decalID][this.colorID];
    };
    this.setDecalID = function (a) {
      this.decalID = a;
      this.decalFrames = objG_assets.planes[this.decalID][this.colorID];
    };
    this.setColorHue = function (a) {
      this.colorHue = a;
    };
    this.getSpeedDirectionX = function () {
      return this.x - this.prevX;
    };
    this.getSpeedDirectionY = function () {
      return this.y - this.prevY;
    };
    this.setRank = function (a) {
      this.rank = a;
    };
    this.isInvulnerable = function () {
      return 0 < num_spawn_cooldown_ms;
    };
    obj_particleTrails.style = M[id_weapon_machinegun];
    this.setWeapon = function (c) {
      obj_particleTrails.style = M[c];
      obj_particleTrails.width = 1;
      this.weapon = c;
    };
    this.cleanup = function () {
      ia && objG_sfxManager.sound.stop(ia);
      na && objG_sfxManager.sound.stop(na);
      this.stopLaserSound();
      na = ia = null;
      this.first_set = true;
      this.inGame = false;
      objGUI_gameInfo.clearTargetLockedMessage();
      ma = 0;
    };
    this.setFrenzy = function () {
      R = 1e4;
    };
    this.incKills = function () {
      S++;
    };
    this.getKills = function () {
      return S;
    };
    this.setPaused = function (a) {
      O = a ? true : false;
    };
    this.setIsBot = function (a) {
      this.isBot = a;
    };
    this.setIsShooting = function (a) {
      !a && this.isShooting && (this.laserTimer = Fa = 0);
      this.isShooting = a;
    };
    this.laserHit = function (a, c, b) {
      Ga = a;
      D = c;
      ea = b;
    };
    this.prepareFollow = function () {};
    this.stopLaserSound = function () {
      ua && (objG_sfxManager.sound.stop(ua), (ua = nb = null));
    };
    this.dash = function () {
      this == objG_player_plane &&
        objG_sfxManager.playSound(str_sfxid_woosh, 0.15, 1, const_Q_0, null);
      q = 300;
    };
    this.dashing = function () {
      return 0 < q;
    };
    this.clearTrail = function () {
      obj_particleTrails && obj_particleTrails.clear();
    };
  },
  Class_SeaWater = function () {
    let e,
      f,
      d,
      a,
      c,
      g,
      h = [],
      q = 0;
    function b(a, c) {
      0 <= a && 24 > a && (f[a] += c);
    }
    this.update = function (b) {
      let k, m, l, y;
      c = (1.1 * canvas.width) / objGUI_anchor.zoom;
      g = c / 25;
      a = Math.floor(H.x / g);
      null != d &&
        d != a &&
        (0 < d - a
          ? (f.splice(24, 24),
            f.splice(0, 0, 0),
            e.splice(24, 24),
            e.splice(0, 0, 0))
          : (f.splice(0, 1), f.push(0), e.splice(0, 1), e.push(0)));
      d = a;
      for (k = 0; 25 > k; k++) e[k] = 2 * f[k] - e[k];
      k = f;
      f = e;
      e = k;
      (k = f[0]), (m = f[0]), (l = f[1]);
      f[0] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
      f[0] = func_clamp(f[0], -100, 100);
      for (y = 1; 24 > y; ++y)
        (k = m),
          (m = l),
          (l = f[y + 1]),
          (f[y] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9))),
          (f[y] = func_clamp(f[y], -100, 100));
      k = m;
      m = l;
      f[24] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
      f[24] = func_clamp(f[24], -100, 100);
      k = m;
      m = l;
      f[0] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
      f[0] = func_clamp(f[0], -100, 100);
      k = m;
      m = l;
      f[1] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
      f[1] = func_clamp(f[1], -100, 100);
      k = m;
      f[24] = 0.99 * (0.9 * l + 0.5 * (k + l) * (1 - 0.9));
      f[24] = func_clamp(f[24], -100, 100);
      k = parseInt(24 * Math.random());
      m = (20 * Math.random()) / 20;
      f[k - 1] += m / 2;
      f[k] += m;
      f[k + 1] += m / 2;
      l = objGUI_anchor.getBounds();
      if (l[1].y > E / 2) {
        k = h.length;
        q -= b;
        0 > q &&
          ((q = 125.6),
          20 > k &&
            ((m = new Class_SeaWaterRipple()),
            h.push(m),
            (l = l[1].x - l[0].x),
            (y = 0),
            objG_player_plane &&
              (y = 50 * objG_player_plane.getSpeedDirectionX()),
            (l = Math.random() * l - l / 2 + y),
            (y = 250 * Math.random()),
            m.setPosition(l + H.x, E / 2 + y + 30, y)));
        l = [];
        for (y = 0; y < k; y++)
          (m = h[y]), m.update(b), m.deleting && l.push(m);
        for (b = 0; b < l.length; b++) (k = h.indexOf(l[b])), h.splice(k, 1);
        l.length = 0;
      }
    };
    this.drawBehind = function (a) {
      let c = E / 2 - H.y,
        b = 0.5 + (c / (E / 2)) * 6;
      this.drawWaterArea(a, 2 * b, "rgba(9,188,255,1.0)", 100, 0.25, 0.6, c);
      c = E / 2 - H.y;
      b = 0.5 + (c / (E / 2)) * 6;
      this.drawWaterArea(a, 4 * b, "rgba(8,164,254,1.0)", 100, 0.75, 0.8, c);
      this.drawWaterArea(a, 13 * b, "rgba(7,142,252,1.0)", 1e3, 0, 1, c);
    };
    this.drawFront = function (b) {
      let d = E / 2 - H.y,
        e = a * g,
        f = E / 2 + -30,
        q = b.createLinearGradient(0, f, 0, f + (600 + 2 * d));
      q.addColorStop(0, "rgba(7,142,252,1.0)");
      q.addColorStop(0.55, "rgba(0,132,232,1.0)");
      q.addColorStop(1, "rgba(0,90,190,1.0)");
      b.fillStyle = q;
      b.beginPath();
      b.moveTo(e + g - c / 2, f + 30);
      b.lineTo(e + g + c / 2, f + 30);
      b.lineTo(e + 25 * g - c / 2, 1030 + f);
      b.lineTo(e + g - c / 2, 1030 + f);
      b.fill();
      b.restore();
      e = h.length;
      for (f = 0; f < e; f++) h[f].draw(b, d);
    };
    this.drawWaterArea = function (b, d, h, e, q, r, K) {
      K = a * g;
      let p = E / 2 + -30;
      b.save();
      b.fillStyle = h;
      b.beginPath();
      b.moveTo(K + g - c / 2, f[0] * r + p + d);
      for (h = 1; 25 > h; h++) {
        let s = (h + parseInt(25 * q)) % 25;
        b.lineTo(K + (h + 1) * g - c / 2, f[s] * r + d + p);
      }
      b.lineTo(K + 25 * g - c / 2, e + d + p);
      b.lineTo(K + g - c / 2, e + d + p);
      b.fill();
      b.restore();
    };
    this.disturbSurface = function (c, d) {
      let h = Math.floor(c / g) - a + 12.5;
      b(h - 2, d / 2);
      b(h - 1, d / 2);
      b(h, d);
      b(h + 1, d / 2);
      b(h + 2, d / 2);
    };
    (function () {
      e = [];
      f = [];
      for (let a = 0; 25 > a; a++) e.push(0), f.push(0);
    })();
  },
  Class_SeaWaterRipple = function () {
    let b = [
        118.17, 11.98, 26.9, -3.43, 1.91, -19.41, 0.45, -19.48, -0.82, -19.55,
        -52.05, 2.79, -118.88, 11.55, -121.21, 11.85, -0.57, -3.74, 0.26, -4.04,
        0.57, -4.15, 121.8, 12.59, 118.17, 11.98,
      ],
      e,
      f,
      d,
      a,
      c = 0;
    this.deleting = false;
    this.speed = 0.02;
    this.setPosition = function (c, b, q) {
      e = c;
      f = b;
      d = q;
      a = d / 250;
    };
    this.update = function (a) {
      c += (a / 1e3) * this.speed * 60;
      c >= Math.PI && (this.deleting = true);
    };
    this.draw = function (d, h) {
      if (!this.deleting) {
        let q, n;
        d.save();
        q = Math.sin(c);
        d.globalAlpha = Math.sqrt(q);
        d.translate(e, f - 4 * c + (h / 500) * 150 * a);
        d.scale(0 + 1 * q, 0 + 0.8 * q);
        d.translate(0, -20);
        d.fillStyle = "#b3dff9";
        d.beginPath();
        (q = b.length), (n = 0.1 + 0.9 * a);
        d.moveTo(b[0] * n + 0, b[1] * n + 0);
        for (let k = 2; k < q; k += 6)
          d.bezierCurveTo(
            b[k] * n + 0,
            b[k + 1] * n + 0,
            b[k + 2] * n + 0,
            b[k + 3] * n + 0,
            b[k + 4] * n + 0,
            b[k + 5] * n + 0,
          );
        d.fill();
        d.restore();
      }
    };
  },
  Class_Clouds = function () {
    let b = [
        [
          -142.21, -1.18, -143.28, 0.36, -123.09, 11.23, -103.01, 13.96, -81.96,
          16.82, -65.17, 14.9, -64.36, 15.65, -41.42, 37.12, -28.62, 36.17,
          -16.75, 36.02, 18.19, 35.56, 38.19, 16.67, 39.3, 18.03, 50.57, 31.83,
          67.87, 39.26, 84.68, 33.47, 95.27, 29.83, 123.57, 5.67, 121.35, -3.74,
          118.45, -15.98, 89.66, -8.14, 88.44, -10.77, 74.28, -41.45, 51.47,
          -22.75, 50.8, -23.76, 38.13, -43.02, 24.97, -62.52, -2.75, -60.1,
          -31.37, -57.6, -55.13, -17.35, -55.49, -17.57, -98.49, -44.18,
          -132.86, -14.55, -142.21, -1.18,
        ],
        [
          -162.55, -1.68, -169.22, -19.07, -134.4, -35.44, -105.42, -35.13,
          -45.5, -34.48, -16.08, -8.51, 20.84, -12.63, 32.11, -13.89, 20.28,
          -39.57, 35.04, -45.63, 50.56, -52, 67.52, -44.38, 81.19, -32.08,
          94.38, -20.22, 83.96, -10.24, 86.36, -8.17, 92.3, -3.06, 110.55, -8.9,
          114.01, -1.75, 116.98, 4.4, 87.88, 27.98, 55.69, 21.98, 53.83, 21.64,
          55.47, 33.56, 20.71, 36.54, 5.28, 37.87, -8.91, 30.47, -14.55, 25.77,
          -17.17, 23.58, -33.82, 38.42, -52.98, 36.38, -65.86, 35.01, -74.62,
          20.26, -78.34, 16.38, -80.92, 13.67, -151.51, 27.09, -162.55, -1.68,
        ],
        [
          -132.9, 30.86, -125.9, 10.58, -96.55, -22.97, -85.94, -23.79, -61.71,
          -25.67, -53.16, -17.53, -50.03, -17.63, -46.79, -17.74, -37.17,
          -49.76, -6.45, -50.02, 26.73, -50.29, 38.01, -16.34, 44.61, -16.75,
          52.59, -17.25, 57.84, -24.32, 79.01, -23.54, 98.83, -22.8, 96.09,
          -12.23, 103.77, -9.21, 111.97, -5.97, 134.38, -11.68, 144.73, 7.12,
          152.17, 20.65, 110.44, 38.48, 91.74, 39.3, 47.05, 41.27, -50.64,
          19.62, -67.45, 24.81, -90.4, 31.9, -100.01, 37.45, -121.08, 38.84,
          -125.4, 39.13, -134.8, 36.38, -132.9, 30.86,
        ],
        [
          -142.3, 3.86, -142.68, -5.86, -66.59, -26.42, -45.57, -34.65, -22.55,
          -43.64, -21.3, -84.89, 5.81, -86.9, 25.18, -88.34, 99.82, -49.94,
          103.2, -10.26, 104.1, 0.3, 137.86, -21.94, 136.83, -10.3, 133.75,
          24.38, 117.81, 21.85, 111.08, 24.7, 107.63, 26.15, 88.76, 26.4, 83.17,
          23.68, 82.44, 23.32, 49.7, 40.09, 19.75, 36.6, -18.88, 32.08, -37.22,
          21.23, -53.51, 11.08, -57.67, 8.49, -66.63, 26.07, -94.62, 26.33,
          -103.38, 26.41, -112.73, 24.98, -123.85, 15.85, -126.35, 13.8,
          -141.87, 14.59, -142.3, 3.86,
        ],
        [
          -142.63, 14.15, -142.06, 12.44, -131.98, 6.01, -92.96, -13.64, -80.08,
          -20.13, -78.45, -40.22, -32.37, -45.14, 6.08, -49.25, 5.44, -26.43,
          8.78, -26.51, 11.15, -26.56, 20.61, -40.86, 44.75, -43.15, 61.05,
          -44.69, 72.86, -34.19, 77.21, -31.3, 84.42, -26.5, 149.08, -20.62,
          150.6, 0.29, 152.12, 21.2, 123.52, 42.13, 64.54, 49.68, 23.28, 54.96,
          37.73, 31.1, 25.32, 30.57, 13.73, 30.07, -6.57, 48.69, -21.45, 46.17,
          -44.71, 42.24, -48.23, 33.33, -81.8, 18.87, -122.06, 1.53, -142.83,
          14.75, -142.63, 14.15,
        ],
        [
          -128.91, -3.91, -100.79, -29.51, -75.44, -28.12, -55.48, -25.64,
          -35.53, -23.16, -10.93, -12.78, 7.7, -16, 15.92, -17.42, 33.99,
          -43.08, 54.49, -43.88, 83.11, -44.99, 85.4, -21.07, 89.46, -21.25,
          94.52, -21.48, 107.89, -29.23, 117.73, -3.17, 118.89, -0.07, 136.54,
          16.66, 149.39, 19.53, 149.68, 19.59, 95.95, 10.58, 17.5, 16.07, -5.04,
          17.65, -60.8, 45.1, -108.87, 48.31, -130.84, 49.78, -145.13, 42.1,
          -143.01, 29.93, -140.38, 14.79, -134.29, 0.99, -128.91, -3.91,
        ],
        [
          -105.63, 33.5, -112.73, 24.78, -104.42, 20.23, -104.9, 18.35, -106.19,
          13.28, -101.31, -5.25, -88.8, -11.01, -73.37, -18.1, -65.27, -18.01,
          -49.55, -16.92, -46.11, -16.68, -52.73, -32.67, -37.48, -39.53,
          -19.05, -47.81, 18.24, -26.76, 24.38, -21.56, 26.14, -20.07, 44.72,
          -32.26, 63.81, -26.11, 106.07, -12.51, 112.47, 3.21, 124.03, 10.2,
          146.91, 24.05, 177.98, 16.35, 176.28, 17.17, 108.58, 50.11, -0.39,
          35.83, -2.15, 35.9, -18.66, 36.6, -90.36, 52.25, -105.63, 33.5,
        ],
        [
          -515.42, -79.84, -511.96, -82.38, -492.91, -99.15, -444.49, -84.74,
          -379.42, -65.39, -353.57, -29.63, -347.84, -16.74, -347.52, -16.02,
          -326.45, -32.16, -294.56, -21.93, -266.34, -12.88, -255.45, 16.99,
          -233.61, 34.9, -195.97, 65.76, -153.63, 30.14, -135.04, 43.22, -79.08,
          82.59, 0.11, -91.66, 104.06, 4.27, 177.97, 72.49, 215.12, 9.81,
          234.44, 16.08, 252.34, 21.9, 289.03, 43.31, 332.29, 27.33, 368.2,
          14.06, 416.81, -38.28, 429.68, -21.59, 445.63, -0.91, 440.5, -8.41,
          442.5, -17, 454.3, -67.56, 497.46, -97.75, 506.29, -79.88, 515.12,
          -62.02, 527.33, 105.09, 482.02, 105.88, 436.97, 106.67, -558.17,
          136.12, -560.32, 90.04, -566.63, -45.23, -534.53, -65.79, -515.42,
          -79.84,
        ],
      ],
      e = [
        [876.66, -374.819, 1, 1.26],
        [97.633, -380.736, 0, 1],
        [192.926, 241.051, 2, 1],
        [-600.648, -471.205, 3, 1],
        [-1012.119, -182.729, 4, 1],
        [-309.131, -16.817, 5, 1],
        [-909.922, 275.895, 6, 1],
        [433.972, -27.105, 4, 0.82],
        [1061.589, 28.127, 5, 1],
        [1393.747, -174.289, 5, 0.61],
        [1571.903, 160.019, 0, 1.4],
        [2070.708, -424.461, 5, 1],
        [1890.094, -38.011, 3, 0.74],
        [2641.256, 167.835, 2, 1.3],
        [2775.003, -273.566, 1, 1.73],
        [3600.865, -10.901, 6, 1],
        [4304.657, -434.446, 3, 1.02],
        [4514.504, 49.961, 5, 1.34],
        [-1873.248, 78.997, 2, 1.85],
        [-1738.956, -423.752, 0, 1],
        [-2562.487, -248.492, 5, 1],
        [-2908.07, 273.062, 1, 1],
        [-3511.442, -140.75, 3, 1],
        [-3067.546, -513.007, 5, 1],
        [-4294.653, 81.801, 4, 1.18],
        [-4341.772, -444.099, 2, 1.49],
        [4534.451, 552.148, 7, 1],
        [3523.869, 548.891, 7, 1],
        [2523.538, 545.869, 7, 1],
        [1527.226, 539.951, 7, 1],
        [524.44, 534.033, 7, 1],
        [-491.107, 531.244, 7, 1],
        [-1491.259, 530.667, 7, 1],
        [-2491.026, 527.456, 7, 1],
        [-3488.818, 522.618, 7, 1],
        [-4489.133, 520.724, 7, 1],
        [5540.582, 549.447, 7, 1],
        [6532.003, 553.506, 7, 1],
        [5332.871, -202.519, 3, 0.92],
        [6297.753, -518.992, 0, 1.4],
        [6571.46, 146.567, 1, 1],
        [-5608.643, -91.44, 1, 1],
        [-6554.049, -474.834, 5, 1],
        [-6324.28, 338.097, 5, 1],
        [-5497.194, 515.894, 7, 1],
        [-6495.769, 511.43, 7, 1],
      ],
      f = [],
      d = [];
    this.drawCloudShape = function (a, c, b, d, e) {
      a.beginPath();
      let f = d.length;
      a.moveTo(d[0] * e + c, d[1] * e + b);
      for (let k = 2; k < f; k += 6)
        a.bezierCurveTo(
          d[k] * e + c,
          d[k + 1] * e + b,
          d[k + 2] * e + c,
          d[k + 3] * e + b,
          d[k + 4] * e + c,
          d[k + 5] * e + b,
        );
      a.fill();
    };
    this.drawCloud = function (a, c, g, h, e, f, k, m) {
      -7e3 > c && ((c = (-c + 7e3) % 14e3), (c = 7e3 - c));
      let l = c + d[h][0] * e,
        y = g + d[h][1] * e,
        r = c + d[h][2] * e,
        K = g + d[h][3] * e,
        p = objGUI_anchor.getBounds();
      l = l > p[1].x || r < p[0].x || y > p[1].y || K < p[0].y ? false : true;
      l &&
        (a.save(),
        (a.fillStyle = "rgba(190,227,249," + f + ")"),
        this.drawCloudShape(a, c, g, b[h], e),
        a.clip(),
        (a.fillStyle = "rgba(179,222,250," + f + ")"),
        this.drawCloudShape(a, c + k, g + m, b[h], e),
        a.restore());
    };
    this.drawPreRenderedCloud = function (a, c, b, e, q, n) {
      -7e3 > c && ((c = (-c + 7e3) % 14e3), (c = 7e3 - c));
      let k = d[q][0],
        m = d[q][1],
        l = c + k * n,
        y = b + m * n,
        r = c + d[q][2] * n;
      q = b + d[q][3] * n;
      let K = objGUI_anchor.getBounds();
      l = l > K[1].x || r < K[0].x || y > K[1].y || q < K[0].y ? false : true;
      l && a.drawImage(f[e], c + k * n, b + m * n);
    };
    this.update = function (a) {
      Xa -= 0.03 * a;
    };
    this.drawClouds = function (a) {
      for (let c = e.length, b = 0; b < c; b++) {
        let d = 2,
          f = e[b][0],
          n = e[b][1],
          k = 1,
          m = 1,
          l = 3,
          y = 9;
        0 == b % 2 && 7 != e[b][2]
          ? ((f += 0.2 * (H.x - f)),
            (n += 0.2 * (H.y - n)),
            (k = 0.2),
            (m = 0.7),
            (l = 1),
            (y = 3),
            (d = 0.5),
            (n *= Kb))
          : 7 == e[b][2] && ((k = 0.8), (n = Nb));
        this.drawCloud(a, f + (Xa / 4) * d, n, e[b][2], e[b][3] * m, k, l, y);
      }
    };
    this.drawPreRenderedClouds = function (a) {
      let c = e.length,
        b = Xa,
        d = Kb;
      xa || ((d = 0.6), (b = 200));
      for (let f = 0; f < c; f++) {
        let n = 2,
          k = e[f][0],
          m = e[f][1],
          l = 1;
        0 == f % 2 && 7 != e[f][2]
          ? ((k += 0.2 * (H.x - k)),
            (m += 0.2 * (H.y - m)),
            (n = 0.5),
            (m *= d),
            (l = 0.7))
          : 7 == e[f][2] && (m = Nb);
        this.drawPreRenderedCloud(
          a,
          k + (b / 4) * n,
          m,
          f,
          e[f][2],
          e[f][3] * l,
        );
      }
    };
    this.preRender = function (a) {
      a = e.length;
      for (let c = 1, g = 0; g < a; g++) {
        let h = e[g][2],
          q = -d[h][0] + d[h][2],
          n = -d[h][1] + d[h][3],
          k;
        k = document.createElement("canvas");
        let m = k.getContext("2d"),
          l = (c = 1),
          y = 3,
          r = 9;
        0 == g % 2 && 7 != e[g][2]
          ? ((c = 0.2), (l = 0.7), (y = 1), (r = 3))
          : 7 == e[g][2] && (c = 0.8);
        l = e[g][3] * l;
        let K = -d[h][0] * l,
          p = -d[h][1] * l;
        k.width = q * l;
        k.height = n * l;
        m.fillStyle = "rgba(190,227,249," + c + ")";
        this.drawCloudShape(m, K, p, b[h], l);
        m.clip();
        m.fillStyle = "rgba(179,222,250," + c + ")";
        this.drawCloudShape(m, K + y, p + r, b[h], l);
        f.push(k);
      }
    };
    (function () {
      for (let a = 0; a < b.length; a++) {
        let c = b[a],
          e = c.length,
          h = 9999,
          f = 9999,
          n = -9999,
          k = -9999,
          m = true;
        for (let l = 0; l < e; l++) {
          let y = c[l];
          m
            ? (y < h && (h = y), y > n && (n = y))
            : (y < f && (f = y), y > k && (k = y));
          m = !m;
        }
        d.push([h, f, n, k]);
      }
    })();
    this.preRender();
  },
  Class_Backgrounds = function () {
    let b = [],
      e = 0,
      obj_clouds = new Class_Clouds(),
      c = false;
    this.waves = new Class_SeaWater();
    let d = function () {
        this.vertexes = [];
        this.type = 0;
        this.add = function (a, c, b) {
          this.vertexes.push({
            x: a,
            y: c,
          });
          this.type = b;
        };
        this.draw = function (a, c) {
          if (7 == this.type) {
            if (((a.fillStyle = "#F0F000"), 3 != c)) return;
          } else if (8 == this.type) {
            if (((a.fillStyle = "#0000F0"), 2 != c)) return;
          } else if (((a.fillStyle = "#f00000"), 1 != c)) return;
          a.beginPath();
          let b = this.vertexes.length,
            d = this.vertexes[0];
          a.moveTo(d.x, d.y);
          for (d = 1; d < b; d++) {
            let e = this.vertexes[d];
            a.lineTo(e.x, e.y);
          }
          a.closePath();
          a.fill();
        };
      },
      a = function () {
        this.posY = this.posX = 0;
        this.radius = 10;
        this.draw = function (a, c) {
          1 == c &&
            (a.beginPath(),
            (a.fillStyle = "#f00"),
            a.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI),
            a.closePath(),
            a.fill());
        };
      };
    this.loadColliders = function (c) {
      let e = new XMLHttpRequest();
      e.open("GET", c, true);
      e.responseType = "arraybuffer";
      e.onload = function (c) {
        if ((c = e.response)) {
          let g, f, m, l, y, v, u;
          c = new DataView(c);
          (g = 0), (f = c.getUint8(g, true)), (g = g + 1);
          if (191 != f) console.log("ERROR LOADING MAP FILE");
          else
            for (;;) {
              (m = c.getUint8(g, true)), (g = g + 1);
              if (0 == m) break;
              else if (
                1 == m ||
                2 == m ||
                3 == m ||
                4 == m ||
                5 == m ||
                6 == m ||
                7 == m ||
                8 == m
              )
                if (((f = c.getUint8(g, true)), (g += 1), 1 == f)) {
                  (f = c),
                    (m = new a()),
                    (l = f.getFloat32(g, true)),
                    (g = g + 4),
                    (y = f.getFloat32(g, true)),
                    (g = g + 4),
                    (f = f.getFloat32(g, true)),
                    (g = g + 4);
                  m.posX = 10 * l;
                  m.posY = 10 * -y;
                  m.radius = 10 * f;
                  b.push(m);
                } else {
                  if (2 == f)
                    for (
                      f = c, l = f.getUint16(g, true), g += 2, y = 0;
                      y < l;
                      y++
                    ) {
                      for (
                        let r = f.getUint16(g, true),
                          g = g + 2,
                          p = new d(),
                          s = 0;
                        s < r;
                        s++
                      ) {
                        (v = f.getFloat32(g, true)),
                          (g = g + 4),
                          (u = f.getFloat32(g, true)),
                          (g = g + 4);
                        p.add(10 * v, 10 * -u, m);
                      }
                      b.push(objG_assets);
                    }
                }
              else
                9 == m || 10 == m || 11 == m
                  ? ((g += 4), (g += 4), (g += 4))
                  : 43 == m && ((g += 4), (g += 4), (g += 4));
            }
        }
      };
      e.send(null);
      console.log("Map loaded!");
    };
    this.drawColliders = function (a) {
      for (let c = b.length, d = 0; d < c; d++) b[d].draw(a, 1);
    };
    this.drawWater = function (a) {
      if (bool_drawWater)
        for (let c = b.length, d = 0; d < c; d++) b[d].draw(a, 2);
    };
    this.drawGrassSand = function (a) {
      for (let c = b.length, d = 0; d < c; d++) b[d].draw(a, 3);
    };
    this.drawGradient = function (a) {
      let c, b, d, f, m;
      (c =
        (canvas.width / 2 +
          (objGUI_anchor.x * objGUI_anchor.zoom - canvas.width / 2)) /
        objGUI_anchor.zoom),
        (b =
          (canvas.height / 2 +
            (objGUI_anchor.y * objGUI_anchor.zoom - canvas.height / 2)) /
          objGUI_anchor.zoom),
        (d = 0.75 * E);
      objG_eventManager.isSpaceWars() && (d = E);
      (d = a.createLinearGradient(0, -d, 0, d)), (f = 39), (m = 161);
      objG_eventManager.isSpaceWars() && ((f = 0), (m = 55));
      if (0 < e) {
        let l = e / 2500;
        1 < l && (l = 1);
        f += (255 - f) * l;
        m += (255 - m) * l;
      }
      objG_eventManager.isSpaceWars()
        ? (d.addColorStop(0, "rgba(" + parseInt(f) + ",0,0,1.0)"),
          d.addColorStop(0.3, "rgba(" + parseInt(m) + ",0,55,1.0)"),
          d.addColorStop(0.5, "rgba(" + parseInt(m) + ",0,75,1.0)"),
          d.addColorStop(0.7, "rgba(" + parseInt(m) + ",0,55,1.0)"),
          d.addColorStop(1, "rgba(" + parseInt(f) + ",0,0,1.0)"))
        : bool_drawGradient
          ? (d.addColorStop(0, "rgba(" + parseInt(f) + ",145,202,1.0)"),
            d.addColorStop(1, "rgba(" + parseInt(m) + ",231,252,1.0)"))
          : (d = "#62bae2");
      a.fillStyle = d;
      a.fillRect(
        c - canvas.width / 2 / objGUI_anchor.zoom,
        b - canvas.height / 2 / objGUI_anchor.zoom,
        canvas.width / objGUI_anchor.zoom,
        canvas.height / objGUI_anchor.zoom,
      );
    };
    this.drawWaterBehind = function (a) {
      bool_drawWater && this.waves.drawBehind(a);
    };
    this.drawWaterFront = function (a) {
      bool_drawWater && this.waves.drawFront(a);
    };
    this.drawLimits = function (a) {
      let c =
          (canvas.width / 2 +
            (objGUI_anchor.x * objGUI_anchor.zoom - canvas.width / 2)) /
          objGUI_anchor.zoom,
        b =
          (canvas.height / 2 +
            (objGUI_anchor.y * objGUI_anchor.zoom - canvas.height / 2)) /
          objGUI_anchor.zoom,
        d = 500,
        e = 2 * E,
        f = 0,
        l = 0,
        y = 0,
        r = 0,
        p;
      if (0 < c) {
        p = $_sub - c;
        p < d && ((f = Math.min(1 - p / d, 1)), (f *= 0.2));
      } else
        (p = $_sub + c), p < d && ((l = Math.min(1 - p / d, 1)), (l *= 0.2));
      objG_eventManager.isSpaceWars() &&
        ((d = 200),
        0 > b
          ? ((p = E / 2),
            (p += b),
            p < d && ((y = Math.min(1 - p / d, 1)), (y *= 0.2)))
          : ((p = E / 2),
            (p -= b),
            p < d && ((r = Math.min(1 - p / d, 1)), (r *= 0.2))));
      0 < c
        ? ((d = f), (d = y > d ? y : d), (f = d = r > d ? r : d))
        : ((d = l), (d = y > d ? y : d), (l = d = r > d ? r : d));
      r = y = d;
      0 < f
        ? ((a.fillStyle = "rgba(200,0,0," + f + ")"),
          a.fillRect($_sub, -e / 2, 2500, e))
        : ((a.fillStyle = "rgba(200,0,0," + l + ")"),
          a.fillRect(-$_sub - 2500, -e / 2, 2500, e));
      objG_eventManager.isSpaceWars() &&
        (0 > b
          ? ((a.fillStyle = "rgba(200,0,0," + y + ")"),
            a.fillRect(-$_sub, -E / 2 - 2500, 2 * $_sub, 2500))
          : ((a.fillStyle = "rgba(200,0,0," + r + ")"),
            a.fillRect(-$_sub, E / 2, 2 * $_sub, 2500)));
      objG_eventManager.isSpaceWars() ||
        ((a.fillStyle = "rgba(255,255,255,0.10)"),
        a.fillRect(
          c - canvas.width / 2 / objGUI_anchor.zoom,
          -E / 2 - 1,
          canvas.width / objGUI_anchor.zoom,
          6,
        ));
    };
    this.draw = function (a) {
      if (bool_drawSun && !objG_eventManager.isSpaceWars()) {
        let c = 0.97 * objGUI_anchor.x + 450,
          b = 0.97 * objGUI_anchor.y - 100,
          d = a.createRadialGradient(c, b, 70, c, b, 350);
        d.addColorStop(0, "rgba(255,255,255,0.4)");
        d.addColorStop(0.1, "rgba(255,255,255,0.13)");
        d.addColorStop(0.15, "rgba(255,255,255,0.05)");
        d.addColorStop(0.2, "rgba(255,255,255,0)");
        a.fillStyle = d;
        a.fillRect(c - 175, b - 175, 350, 350);
        a.fillStyle = "rgba(255,255,255,1)";
        a.beginPath();
        a.arc(c, b, 70, 0, 2 * Math.PI);
        a.fill();
      }
      bool_drawClouds &&
        !objG_eventManager.isSpaceWars() &&
        obj_clouds.drawPreRenderedClouds(a);
    };
    this.update = function (a) {
      if (xa || !c)
        if (
          ((c = true),
          this.waves.update(a),
          obj_clouds.update(a),
          null != objG_player_plane)
        ) {
          let b = objG_player_plane.x < -$_sub || objG_player_plane.x > $_sub;
          objG_eventManager.isSpaceWars() &&
            (b |= objG_player_plane.y > E / 2 || objG_player_plane.y < -E / 2);
          b
            ? (0 == e &&
                (objG_sfxManager.playSound(str_sfxid_warn, 1, 1, 1, null),
                objGUI_gameInfo.showWarningMessage("YOU ABANDONED THE FIGHT!")),
              (e += a))
            : (0 < e && objGUI_gameInfo.clearWarningMessage(), (e = 0));
        }
    };
  },
  Class_PickupItem = function () {
    let b = (this.alpha = 0),
      e = 0,
      f = Math.random() * Math.PI * 2,
      d = 1,
      a = 0,
      c = 0,
      g = 0,
      h,
      q,
      n = 1,
      k = 1,
      m = 1,
      l = 0,
      y = false;
    this.id = -1;
    this.y = this.x = 0;
    this.radius = 1.5;
    this.type;
    this.sinScaleY = this.sinScaleX = 0;
    this.fadingOut = this.grabbing = false;
    this.update = function (f) {
      let p = 0.06 * f,
        s,
        v;
      if (64 != this.type) {
        if (!objG_eventManager.isSpaceWars()) {
          (s = E / 2 - 20), (v = this.y + e);
          l += f / 400;
          v < s
            ? (v > s - 30 && (d = (s - v) / 30),
              1 > this.alpha &&
                ((this.alpha += f / 1e3), 1 < this.alpha && (this.alpha = 1)),
              (e = ((T - b) / 1e3) * Ac * 60))
            : ((a += 0.1 * p),
              (e += 0.1),
              (k -= 0.008),
              0 > k && (k = 0),
              (m = Math.sqrt(k)));
        }
        this.fadingOut &&
          (y ||
          objG_eventManager.isSpaceWars() ||
          objG_eventManager.isInstagib()
            ? delete objD_pickups[this.id]
            : ((e += 0.25),
              (this.alpha -= f / 1e3),
              0 >= this.alpha && delete objD_pickups[this.id]));
      }
      this.grabbing &&
        ((f = objD_planes[c])
          ? ((s = Math.pow(g, 2)),
            (this.x = h + (f.x - h) * s),
            (this.y = q + (f.y - q) * s),
            (n = 1 - s),
            (g += 0.07 * p),
            1 < g && delete objD_pickups[this.id])
          : delete objD_pickups[this.id]);
    };
    this.drawItem = function (c, b) {
      let g;
      if (64 == this.type)
        c.save(),
          c.beginPath(),
          (this.sinScaleX += 0.1),
          (this.sinScaleY += 0.12),
          c.translate(this.x, this.y + e),
          c.scale(
            (1 + Math.sin(this.sinScaleX) / 6) * n * 1.3,
            (1 + Math.sin(this.sinScaleY) / 6) * n * 1.3,
          ),
          b.draw(c);
      else if (y || objG_eventManager.isSpaceWars())
        objG_player_plane &&
          objG_eventManager.isSpaceWars() &&
          objG_player_plane.id == qa &&
          (g = 0.3),
          c.save(),
          c.beginPath(),
          (this.sinScaleX += 0.1),
          (this.sinScaleY += 0.12),
          c.translate(this.x, this.y),
          c.scale(
            (1 + Math.sin(this.sinScaleX) / 6) * n * 1.3,
            (1 + Math.sin(this.sinScaleY) / 6) * n * 1.3,
          ),
          c.scale(2, 2),
          (c.globalAlpha = g),
          objG_assets.frames.wing.draw(c),
          c.scale(0.5, 0.5),
          b.draw(c);
      else {
        g = 1;
        !objG_player_plane ||
          objG_player_plane.weapon != id_weapon_superweapon ||
          (this.type != id_weapon_trishoot &&
            this.type != id_weapon_missile &&
            this.type != id_weapon_railgun &&
            this.type != id_weapon_punch &&
            this.type != id_weapon_bombs) ||
          (g = 0.3);
        let h = objG_assets.frames.parachute;
        h.y = -h.height / 2 + 100 * (1 - m);
        c.save();
        this.grabbing
          ? c.translate(this.x, this.y)
          : c.translate(this.x, this.y + e);
        c.rotate(0.2 * Math.sin(l + f) * d);
        c.scale(1 * n, 1 * n);
        c.translate(0, 10);
        c.globalAlpha = this.alpha * g * 1;
        c.save();
        0 < a && (c.globalAlpha = m * g * 1);
        c.scale(1 * (1 + (1 - m)), 1 * m);
        h.draw(c);
        c.restore();
        g = 0;
        this.type == id_weapon_superweapon && (g = 8);
        c.translate(0, 4 * Math.sin(a) + g + 10);
        b.draw(c);
        c.globalAlpha = 1;
      }
      c.restore();
    };
    this.draw = function (a) {
      if (bool_drawItems) {
        let c = 40,
          b;
        32 == this.type
          ? (b = objG_assets.frames.health)
          : this.type == id_weapon_trishoot
            ? (b = objG_assets.frames.trishoot)
            : this.type == id_weapon_railgun
              ? (b = objG_assets.frames.railgun)
              : this.type == id_weapon_missile
                ? (b = objG_assets.frames.missile)
                : this.type == id_weapon_punch
                  ? (b = objG_assets.frames.melee)
                  : this.type == id_weapon_bombs
                    ? (b = objG_assets.frames.bombdrop)
                    : this.type == id_weapon_superweapon
                      ? (b = objG_assets.frames.laser)
                      : 64 == this.type &&
                        ((c = 10), (b = objG_assets.frames.wing));
        let d = this.y;
        this.grabbing || (d += e);
        if (!this.grabbing) {
          if (!func_isInsideBox(this.x, d, c)) return;
        } else if (!func_isInsideBox(this.x, this.y, c)) return;
        this.drawItem(a, b);
      }
    };
    this.fadeOut = function () {
      this.fadingOut = true;
    };
    this.playerGrab = function (a) {
      this.grabbing = true;
      c = a;
      this.y += e;
      h = this.x;
      q = this.y;
      delete objD_pickups[this.id];
      this.id = "g" + this.id;
      objD_pickups[this.id] = this;
      objG_player_plane &&
        c == objG_player_plane.id &&
        !objG_eventManager.isInstagib() &&
        (64 == this.type
          ? objG_player_plane.incScore(vc)
          : objG_player_plane.incScore(wc));
    };
    this.setPosition = function (a, c) {
      this.x = 10 * a;
      this.y = 10 * c;
      this.y > -E / 2 && (this.alpha = 1);
      b = +new Date();
    };
    objG_eventManager.isSpaceWars() && (y = true);
  },
  Class_WS_Connection = function () {
    let f;
    function b(b, a, c) {
      (169 != a && 172 != a && 162 != a && 178 != a) ||
        c ||
        (list_str_leaderboard_players = []);
      let e, h, f, n, k, m, l, y, r, p, s, u, w, t, x, z, C, P, R, S, O, G, ea;
      (e = false), (h = 1), (f = 1), (n = 0);
      c ||
        (objG_wsConnection.lastUpdateBool = !objG_wsConnection.lastUpdateBool);
      for (;;) {
        n++;
        (k = b.getUint32(h, true)), (h = h + 4);
        if (0 == k) {
          c = b;
          f = a;
          n = c.getUint8(h, true);
          h += 1;
          for (k = 0; k < n; k++) {
            (m = c.getUint32(h, true)), (h = h + 4);
            if (163 == f || 162 == f || 169 == f)
              (l = c.getUint8(h, true)), (h = h + 1);
            (y = c.getFloat32(h, true)),
              (h = h + 4),
              (r = -c.getFloat32(h, true)),
              (h = h + 4),
              (p = c.getUint32(h, true)),
              (h = h + 4),
              (s = objD_missiles[m]);
            if (null == s) {
              s = new Class_Missile();
              objD_missiles[m] = s;
              (163 != f && 162 != f && 169 != f) || s.setType(l);
              (m = objD_planes[p]), (u = false);
              m || ((u = true), (m = objD_specialEntities[p]));
              if (m) {
                (w = const_Q_0), (t = 1);
                u
                  ? ((w = const_Sa_3),
                    (u = func_calculateDistance2D(m.x, m.y, H.x, H.y)),
                    (t = 1 - u / num_sound_max_distance),
                    0.01 < t &&
                      objG_sfxManager.playSound(
                        str_sfxid_cannonshoot,
                        t,
                        1,
                        w,
                        null,
                      ),
                    m.cannonShoot())
                  : ((objG_player_plane && p == objG_player_plane.id) ||
                      ((w = const_Sa_3),
                      (u = func_calculateDistance2D(m.x, m.y, H.x, H.y)),
                      (t = 1 - u / num_sound_max_distance)),
                    0.01 < t &&
                      objG_sfxManager.playSound(
                        str_sfxid_mlaunch,
                        t,
                        1,
                        w,
                        null,
                      ),
                    m.ammo--);
              }
            }
            s.lastUpdate = T;
            s.setPosition(y, r, p);
          }
          if (
            162 == a ||
            178 == a ||
            163 == a ||
            179 == a ||
            169 == a ||
            172 == a
          )
            for (l = h; ; ) {
              c = b.getUint32(l, true);
              l += 4;
              if (0 == c) break;
              h = objD_specialEntities[c];
              if (178 == a || 162 == a)
                (f = b.getUint8(l, true)),
                  (l += 1),
                  null == h &&
                    ((h = new Class_Warship()),
                    (objD_specialEntities[c] = h),
                    h.setType(f));
              h.id = c;
              h.lastUpdate = T;
              c = b.getFloat32(l, true);
              l += 4;
              f = -b.getFloat32(l, true);
              l += 4;
              n = b.getFloat32(l, true);
              l += 4;
              k = b.getUint16(l, true);
              l += 2;
              y = b.getUint8(l, true);
              l += 1;
              h.type == id_entity_warship
                ? ((r = -b.getFloat32(l, true)),
                  (l += 4),
                  (p = b.getFloat32(l, true)),
                  (l += 4),
                  h.setCannonAngle(p),
                  h.setFloatValue(r))
                : h.type != id_entity_asteroid ||
                  (162 != a && 178 != a) ||
                  ((r = b.getUint8(l, true)), (l += 1), h.setFragment(r));
              h.setState(y);
              h.setPose(c, f, n);
              h.setEnergy(k);
            }
          break;
        }
        (x = b.getUint16(h, true)),
          (h = h + 2),
          (y = x & 1),
          (r = x & 2),
          (z = x & 4),
          (p = x & 1024),
          (s = x & 2048);
        1 != n || (163 != a && 179 != a) || (qa = x & 512 ? k : 0);
        y &&
          ((m = b.getFloat32(h, true)),
          (h += 4),
          (w = -b.getFloat32(h, true)),
          (h += 4),
          (u = b.getFloat32(h, true)),
          (h += 4),
          (t = b.getUint8(h, true)),
          (h += 1));
        (C = objD_planes[k]), (P = x & 256);
        if (C && (P && C.setFrenzy(), C.setPaused(z), objG_player_plane == C)) {
          (z = x & 8),
            (R = x & 16),
            (S = x & 32),
            (O = x & 128),
            (G = x & 4096);
          x & 64
            ? objGUI_gameInfo.addBonus(64, 0)
            : S
              ? objGUI_gameInfo.addBonus(32, 0)
              : R
                ? objGUI_gameInfo.addBonus(16, 0)
                : z && objGUI_gameInfo.addBonus(8, 0);
          G && (objGUI_gameInfo.addBonus(4096, 0), (Za[C.id] = 0));
          O && objGUI_gameInfo.addBonus(128, 0);
          P && objGUI_gameInfo.addBonus(256, C.getKills());
        }
        ea;
        if (162 == a || 178 == a || 169 == a || 172 == a)
          (ea = b.getUint32(h, true)), (h += 4);
        if ((162 != a && 178 != a) || !y)
          (162 != a && 178 != a) ||
            y ||
            null != C ||
            ((C = new Class_Plane()), (objD_planes[k] = C), (C.inGame = false));
        else {
          162 == a
            ? ((x = b.getUint16(h, true)), (h += 2))
            : ((x = b.getUint8(h, true)), (h += 1));
          P = b.getUint16(h, true);
          h += 2;
          z = b.getUint8(h, true);
          h += 1;
          R = b.getUint8(h, true);
          h += 1;
          S = b.getUint32(h, true);
          h += 4;
          for (O = ""; ; ) {
            G = b.getUint16(h, true);
            h += 2;
            if (0 == G) break;
            O += String.fromCharCode(G);
          }
          null == C && ((C = new Class_Plane()), (objD_planes[k] = C));
          -1 != O.indexOf("\ufdfd") && (O = "<Unnamed>");
          C.setColorID(z);
          C.setDecalID(R);
          C.setName(O);
          C.setFlagInfo(S);
          C.setWeapon(x);
          C.ammo = P;
        }
        if (null == C)
          console.log(
            "ERROR: Receiving data for a player (" +
              k +
              ") that does not exist, ignoring!",
          );
        else if (
          ((C.id = k),
          (C.lastUpdate = T),
          (C.updateBool = objG_wsConnection.lastUpdateBool),
          y &&
            (C.setPose(m, w, u),
            (C.energy = t),
            C.setEnergy(t),
            (C.hover = r),
            C.setIsBot(p),
            C.setIsShooting(s)),
          169 == a || 172 == a || 162 == a || 178 == a)
        )
          C.setScore(ea),
            c ||
              (1 == f && (sc = k),
              list_str_leaderboard_players.push(k),
              (e = true),
              C.setRank(f),
              f++);
      }
      e && objGUI_gameInfo.refreshLeaderboard(list_str_leaderboard_players);
    }
    function e(b, a) {
      let c, e, f, q, n, k;
      (c = 1),
        (e = b.getUint16(c, true)),
        (c = c + 2),
        (f = b.getUint32(c, true)),
        (c = c + 4),
        q;
      168 == a
        ? ((q = b.getUint8(c, true)), (c += 1))
        : ((q = b.getUint16(c, true)), (c += 2));
      if (0 < f) {
        (n = 1), (k = str_sfxid_weapgrab);
        32 > q || 128 == q || 256 == q
          ? ((c = b.getUint16(c, true)),
            objD_planes[f].setWeapon(q),
            (objD_planes[f].ammo = c))
          : 64 == q
            ? (objD_planes[f].trailEffect(),
              (k = str_sfxid_winggrab),
              null != this.lastGrabbedWingTime &&
                ((q = T - this.lastGrabbedWingTime),
                1e3 > q
                  ? objG_wsConnection.wingsInARow++
                  : (objG_wsConnection.wingsInARow = 0),
                (n = 1 + 0.05 * objG_wsConnection.wingsInARow),
                1.5 < n && (n = 1.5)),
              (this.lastGrabbedWingTime = T))
            : 32 == q && (k = str_sfxid_hgrab);
        objG_player_plane &&
          f == objG_player_plane.id &&
          objG_sfxManager.playSound(k, 1, n, const_Q_0, null);
        objD_pickups[e].playerGrab(f);
      } else objD_pickups[e].fadeOut();
    }
    this.firstClientListing = true;
    this.sentHello = this.hasConnection = false;
    this.lastGrabbedWingTime = this.remoteHost = null;
    this.connectRetry = this.wingsInARow = 0;
    this.lastUpdateBool = false;
    this.roomNumber = 0;
    this.directed = false;
    this.roomID = 0;
    this.getServerAndConnect = function () {
      let b, c, a;
      if (!int_pathMobile) {
        (b = null), (b = ""), a;
        func_isIframe() || (a = parent.location.hash);
        if (a)
          (b = a),
            (b = b.substring(1, b.length)),
            (b = ";" + b),
            (objG_wsConnection.directed = true);
        else if (obj_browserQueryParams.ip) {
          b = obj_browserQueryParams.ip;
          b = b.replace("%3A", ":");
          objG_wsConnection.remoteHost = b;
          objG_wsConnection.connect();
          return;
        }
        a = str_conutryCode;
        obj_browserQueryParams.cc && (a = obj_browserQueryParams.cc);
        if (void 0 == a) setTimeout(objG_wsConnection.getServerAndConnect, 200);
        else {
          c = "";
          bool_isHttps && (c = "s");
          $.ajax({
            url: "http" + c + "://master.wings.io/",
            type: "POST",
            success: function (a) {
              if ("0" == a)
                $("#topGui").hide(),
                  $("#topGuiConnecting").hide(),
                  $("#roomFailed").show();
              else {
                a = a.split("!");
                objG_wsConnection.roomID = 0;
                1 < a.length && (objG_wsConnection.roomID = a[1]);
                c = a[0];
                a = c.split("/");
                objG_wsConnection.roomNumber = 0;
                1 < a.length &&
                  ((objG_wsConnection.roomNumber = a[1]), (c = a[0]));
                objG_wsConnection.remoteHost = c;
                objG_wsConnection.connect();
              }
            },
            error: function () {
              setTimeout(objG_wsConnection.getServerAndConnect, 1e3);
            },
            dataType: "text",
            contentType: "text/plain",
            method: "PUT",
            cache: false,
            crossDomain: true,
            data: a + b,
          });
        }
      }
    };
    this.connect = function () {
      let b;
      if (wa || int_pathMobile) {
        b = "ws://" + objG_wsConnection.remoteHost;
        console.log("fullhost: " + b);
        if (bool_isHttps) {
          (b = objG_wsConnection.remoteHost.split(":")[0].split(".")),
            (a = parseInt(objG_wsConnection.roomNumber) + 8079 + 1e3),
            (b =
              "wss://ip-" +
              b[0] +
              "-" +
              b[1] +
              "-" +
              b[2] +
              "-" +
              b[3] +
              ".wings.io:" +
              a);
          console.log("isSecure RoomNumber: " + objG_wsConnection.roomNumber);
        } else
          0 < objG_wsConnection.roomNumber &&
            ((b =
              "ws:" +
              b.split(":")[1] +
              ":" +
              (parseInt(objG_wsConnection.roomNumber) + 8079)),
            console.log("New full host: " + b));
        try {
          f = new WebSocket(b);
        } catch (c) {
          setTimeout(objG_wsConnection.getServerAndConnect, 1e3);
          return;
        }
        f.binaryType = "arraybuffer";
        f.onopen = objG_wsConnection.onSocketOpen;
        f.onclose = objG_wsConnection.onSocketClose;
        f.onmessage = objG_wsConnection.onSocketMessage;
        f.onerror = objG_wsConnection.onSocketError;
      } else setTimeout(objG_wsConnection.getServerAndConnect, 100);
    };
    this.disconnect = function () {
      objG_wsConnection.directed &&
        (func_isIframe() || (window.location.hash = ""),
        (objG_wsConnection.directed = false));
      objG_wsConnection.roomID = 0;
      f && f.close();
    };
    this.onSocketOpen = function (b) {
      window.didSendLoadingTime ||
        ((b = +new Date() - window.startTime),
        window.stats && console.log("ltct " + b),
        window.mixpanel.track("Load Time To Play", {
          deltatime: b,
          domain: window.location.hostname,
        }),
        (window.didSendLoadingTime = true));
      objG_wsConnection.connectRetry = 0;
      objG_wsConnection.hasConnection = true;
      objG_wsConnection.directed = false;
      objG_assets.loaded && objG_wsConnection.hello();
    };
    this.onSocketClose = function (b) {
      objG_wsConnection.connectionClosed();
    };
    this.onSocketMessage = function (b) {
      objG_wsConnection.processMessage(b.data);
    };
    this.onSocketError = function (b) {
      console.log("socket error");
    };
    this.hello = function () {
      int_pathMobile
        ? objG_wsConnection.sendSingleByte(32)
        : objG_wsConnection.sendSingleByte(1);
      objG_wsConnection.ping();
      objG_wsConnection.sentHello = true;
      $("#copyLink").fadeIn(300);
      $("#topGui").show();
      $("#topGuiConnecting").hide();
      $(".btn-needs-server").removeAttr("disabled");
      $("#nick").focus();
      1 == int_pathMobile &&
        ("undefined" != typeof messageHandlers && messageHandlers.didConnect
          ? messageHandlers.didConnect(JSON.stringify({}))
          : window.webkit.messageHandlers.didConnect.postMessage({}));
    };
    this.processMessage = function (d) {
      let a, c, f, h, q, n, k, m, l, y, r, s, t, x, z, Ca, ta;
      d = new DataView(d);
      a = d.getUint8(0);
      if (0 != a)
        if (160 == a) {
          (c = 1),
            (a = -d.getUint32(c, true)),
            (c = c + 4),
            (f = d.getFloat32(c, true)),
            (c = c + 4),
            (h = d.getFloat32(c, true)),
            (c = c + 4),
            (q = d.getFloat32(c, true)),
            (c = c + 4),
            (n = d.getFloat32(c, true)),
            (c = c + 4),
            (k = d.getFloat32(c, true)),
            (c = c + 4),
            (m = d.getFloat32(c, true)),
            (c = c + 4),
            (l = d.getFloat32(c, true)),
            (c = c + 4),
            (y = d.getFloat32(c, true)),
            (c = c + 4),
            (r = d.getFloat32(c, true));
          d = d.getFloat32(c + 4, true);
          Xa = a;
          $_sub = 10 * f;
          E = 10 * h;
          uc = 1e3 * q;
          tc = n;
          Kb = E / 2 / 650;
          Nb = E / 2 - 100;
          lc = k;
          Ac = m;
          yc = l;
          vc = y;
          wc = r;
          xc = d;
        } else if (161 == a || 171 == a)
          (xa = true),
            int_pathMobile &&
              ("undefined" != typeof messageHandlers &&
              messageHandlers.didEnterGame
                ? messageHandlers.didEnterGame(JSON.stringify({}))
                : window.webkit.messageHandlers.didEnterGame.postMessage({})),
            (c = 1),
            (f = d.getUint32(c, true)),
            (c += 4),
            (h = d.getFloat32(c, true)),
            (c += 4),
            (q = -d.getFloat32(c, true)),
            (c += 4),
            (n = d.getFloat32(c, true)),
            (c += 4),
            (k = d.getUint8(c, true)),
            (c += 1),
            (m = d.getUint8(c, true)),
            (c += 1),
            (d = d.getUint32(c, true)),
            (objG_player_plane = new Class_Plane()),
            (objG_player_plane.id = f),
            objG_player_plane.setColorID(k),
            objG_player_plane.setDecalID(m),
            objG_player_plane.setName(myName),
            objG_player_plane.setFlagInfo(d),
            objG_player_plane.setPose(h, q, n),
            (objG_player_plane.updateBool = objG_wsConnection.lastUpdateBool),
            (objD_planes[f] = objG_player_plane),
            (ra = f),
            (Z = true),
            func_hideOverlay(),
            func_setPlayerCount(),
            161 == a && (Za[f] = 0);
        else if (162 == a || 178 == a)
          b(d, a, false),
            (this.firstClientListing = false),
            func_setPlayerCount();
        else if (169 == a || 172 == a) b(d, a, false), func_setPlayerCount();
        else if (163 == a || 179 == a) b(d, a, false);
        else if (164 == a || 180 == a)
          164 == a ? b(d, 162, true) : b(d, 178, true), func_setPlayerCount();
        else if (165 == a) {
          q = 1;
          a = d.getUint32(q, true);
          q += 4;
          if ((c = objD_planes[a]))
            (f = d.getUint32(q, true)),
              (q += 4),
              (h = d.getUint8(q, true)),
              (d = d.getUint32(q + 1, true)),
              (q = objG_player_plane),
              !q && Qb && (q = Qb),
              q &&
                f == q.id &&
                ((n = func_renameBlankPlayerNames(objD_planes[a].name)),
                objGUI_gameInfo.addMessage("You killed", true, n),
                objG_eventManager.isInstagib() ||
                  (a == qa ? q.incScore(yc) : q.incScore(xc))),
              0 < f
                ? ((f = objD_planes[f])
                    ? (objGUI_gameInfo.addActivityMessage(
                        func_renameBlankPlayerNames(c.name) +
                          " was Killed by " +
                          func_renameBlankPlayerNames(f.name),
                      ),
                      f.incKills(),
                      (Za[c.id] = f.id))
                    : objGUI_gameInfo.addActivityMessage(
                        func_renameBlankPlayerNames(c.name) + " was Killed",
                      ),
                  objG_animationManager.addExplosion(
                    c.dstX,
                    c.dstY,
                    c.getSpeedDirectionX(),
                    c.getSpeedDirectionY(),
                  ),
                  objG_player_plane &&
                    objG_player_plane.id == a &&
                    (f
                      ? objGUI_gameInfo.addMessage(
                          "Killed by",
                          false,
                          func_renameBlankPlayerNames(f.name),
                        )
                      : objGUI_gameInfo.addMessage(
                          "You were killed",
                          false,
                          null,
                        ),
                    Z
                      ? ((Z = false),
                        (Qb = objG_player_plane),
                        (objG_player_plane = null),
                        (ka = 1),
                        wasKilled(d),
                        func_displayGameoverScore(d))
                      : ((objG_player_plane = null),
                        objG_followMode.waitUntilNextFollow())))
                : ((Za[c.id] = 0),
                  objG_player_plane &&
                    objG_player_plane.id == a &&
                    (5 == h
                      ? objGUI_gameInfo.addMessage("You left!", false, null)
                      : 4 == h
                        ? objGUI_gameInfo.addMessage("Abandoned!", false, null)
                        : 1 == h
                          ? objGUI_gameInfo.addMessage("Crashed!", false, null)
                          : 6 == h
                            ? objGUI_gameInfo.addMessage(
                                "Exploded!",
                                false,
                                null,
                              )
                            : 7 == h
                              ? objGUI_gameInfo.addMessage(
                                  "KAMIKAZE!!",
                                  false,
                                  null,
                                )
                              : 8 == h
                                ? objGUI_gameInfo.addMessage(
                                    "You were killed by a Warship!",
                                    false,
                                    null,
                                  )
                                : 3 == h
                                  ? (objGUI_gameInfo.addMessage(
                                      "Splash!",
                                      false,
                                      null,
                                    ),
                                    objG_sfxManager.playSound(
                                      str_sfxid_bigsplash,
                                      0.7,
                                      1,
                                      const_Q_0,
                                      null,
                                    ),
                                    obj_particleImpacts.addSplash(
                                      objG_player_plane.x,
                                      E / 2 + 10,
                                      2,
                                      false,
                                    ))
                                  : objGUI_gameInfo.addMessage(
                                      "You were killed!",
                                      false,
                                      null,
                                    ),
                    Z
                      ? ((Z = false),
                        (objG_player_plane = null),
                        (ma = 0),
                        (ka = 1),
                        wasKilled(d),
                        func_displayGameoverScore(d))
                      : ((objG_player_plane = null),
                        objG_followMode.waitUntilNextFollow())),
                  5 == h
                    ? objGUI_gameInfo.addActivityMessage(
                        func_renameBlankPlayerNames(c.name) + " left",
                      )
                    : 4 == h &&
                      objGUI_gameInfo.addActivityMessage(
                        func_renameBlankPlayerNames(c.name) + " abandoned",
                      ),
                  objG_animationManager.addExplosion(
                    c.dstX,
                    c.dstY,
                    0.5 * c.getSpeedDirectionX(),
                    0.5 * c.getSpeedDirectionY(),
                  )),
              null == c
                ? console.log(
                    "ERROR: Trying to remove a player that didnt exist!",
                  )
                : objD_planes[a].cleanup();
          else if ((d = objD_specialEntities[a]))
            d.type == id_entity_asteroid &&
              objG_eventManager.isSpaceWars() &&
              (objG_animationManager.addExplosion(d.x, d.y, 0, 0),
              3 != d.fragment &&
                ((d =
                  1 -
                  func_calculateDistance2D(d.x, d.y, H.x, H.y) /
                    num_sound_max_distance),
                0.01 < d &&
                  objG_sfxManager.playSound(
                    str_sfxid_mexpl2,
                    d,
                    0.4,
                    const_Sa_3,
                    null,
                  ))),
              objD_specialEntities[a].cleanup(),
              delete objD_specialEntities[a];
          func_setPlayerCount();
        } else if (166 == a || 176 == a)
          for (c = 1, f = d.getUint16(c, true), c += 2, h = 0; h < f; h++) {
            n = d.getUint32(c, true);
            c += 4;
            176 == a
              ? ((q = d.getUint16(c, true)), (c += 2))
              : ((q = d.getUint8(c, true)), (c += 1));
            m = 1;
            l = str_sfxid_empty;
            switch (q) {
              case id_weapon_machinegun:
                l = objG_eventManager.isSpaceWars()
                  ? qa == n
                    ? str_sfxid_kinglaser
                    : str_sfxid_laser
                  : str_sfxid_shot;
                break;
              case id_weapon_trishoot:
                objG_eventManager.isSpaceWars()
                  ? ((m = 0.7), (l = str_sfxid_laser))
                  : (l = str_sfxid_trishot);
                break;
              case id_weapon_railgun:
                objG_eventManager.isSpaceWars()
                  ? ((l = str_sfxid_laser), (m = 1.3))
                  : (l = str_sfxid_rail);
            }
            k = objD_planes[n];
            !k &&
              0 < n &&
              (y = objD_specialEntities[n]) &&
              console.log("specialEntity did shoot: " + y.id);
            y = const_Q_0;
            r = 1;
            (objG_player_plane && n == objG_player_plane.id) ||
              !k ||
              ((y = const_Sa_3),
              (r =
                1 -
                func_calculateDistance2D(k.x, k.y, H.x, H.y) /
                  num_sound_max_distance));
            0.01 < r &&
              l != str_sfxid_empty &&
              objG_sfxManager.playSound(l, r, m, y, null);
            m = d.getUint16(c, true);
            c += 2;
            q == id_weapon_punch && k.dash();
            l = d.getUint8(c, true);
            c += 1;
            for (y = 0; y < l; y++) {
              (r = d.getFloat32(c, true)),
                (c = c + 4),
                (s = -d.getFloat32(c, true)),
                (c = c + 4),
                (t = 0),
                (t = false);
              if (q != id_weapon_missile && q != id_weapon_bombs)
                obj_particleImpacts.addShot(n, r, s, q);
              else {
                (t = d.getUint32(c, true)), (c = c + 4), (x = objD_missiles[t]);
                x && delete objD_missiles[t];
                t = true;
              }
              for (x = false; ; ) {
                (z = d.getUint32(c, true)), (c = c + 4);
                if (0 == z) break;
                (Ca = objD_planes[z]), (ta = false);
                Ca || ((Ca = objD_specialEntities[z]) && (ta = true));
                z == qa || ta || (t = false);
                Ca &&
                  (Ca.hit(q),
                  k &&
                    q == id_weapon_superweapon &&
                    ((x = true), k.laserHit(r, s, true)),
                  objG_player_plane &&
                    (objG_player_plane.id == z
                      ? objG_sfxManager.playSound(
                          str_sfxid_phit,
                          1,
                          1,
                          const_Q_0,
                          null,
                        )
                      : n == objG_player_plane.id &&
                        objG_sfxManager.playSound(
                          str_sfxid_phit,
                          1,
                          2,
                          const_Q_0,
                          null,
                        )));
              }
              k && !x && k.laserHit(r, s, false);
              t && obj_particleImpacts.addMissileImpact(r, s);
            }
            0 < n &&
              (n = objD_planes[n]) &&
              q != id_weapon_missile &&
              q != id_weapon_bombs &&
              ((n.ammo = m), n.setWeapon(q));
          }
        else if (167 == a || 174 == a)
          for (c = 1; ; ) {
            f = d.getUint16(c, true);
            if (0 == f) break;
            c += 2;
            174 == a
              ? ((h = d.getUint16(c, true)), (c += 2))
              : ((h = d.getUint8(c, true)), (c += 1));
            q = d.getFloat32(c, true);
            c += 4;
            n = -d.getFloat32(c, true);
            c += 4;
            k = new Class_PickupItem();
            objD_pickups[f] = k;
            k.id = f;
            k.setPosition(q, n);
            k.type = h;
          }
        else if (168 == a || 173 == a) e(d, a);
        else if (170 == a)
          (a = 1),
            (c = d.getUint8(a, true)),
            3 == c
              ? ma++
              : 4 == c
                ? ma--
                : ((gb = 2 != c ? d.getUint32(a + 1, true) : 0),
                  (hb = 0),
                  (ha = c));
        else if (16 == a)
          (c = d.getUint8(1, true)),
            (a = d.getUint32(2, true)),
            (objG_eventManager.type = c),
            (objG_eventManager.waiting = true),
            (objG_eventManager.endTime = +new Date() + 1e3 * a);
        else if (17 == a)
          (objG_eventManager.type = objG_eventManager.eventType.EVENT_NONE),
            (objG_eventManager.waiting = false),
            (objG_eventManager.endTime = 0);
        else if (18 == a || 19 == a)
          (c = 1),
            (f = d.getUint8(c, true)),
            c++,
            (a = d.getUint32(c, true)),
            (c += 4),
            (objG_eventManager.waiting = false),
            objG_eventManager.setType(f),
            objG_eventManager.type ==
              objG_eventManager.eventType.EVENT_WARSHIP &&
              ((h = d.getUint8(c, true)),
              c++,
              (f = d.getUint8(c, true)),
              c++,
              (d = d.getUint8(c, true)),
              objG_eventManager.setWarshipInfo(h, f, d)),
            (objG_followMode.whiteFlash = 1),
            (objG_eventManager.endTime = +new Date() + 1e3 * a),
            objG_eventManager.isInstagib()
              ? (objG_eventManager.railSwitch = true)
              : objG_eventManager.isWarship()
                ? objG_assets.loadWarshipEvent()
                : objG_eventManager.isSpaceWars() &&
                  objG_assets.loadAsteroidEvent();
        else if (20 == a) {
          objG_eventManager.type != objG_eventManager.eventType.EVENT_WARSHIP &&
            (objG_followMode.whiteFlash = 1);
          objG_eventManager.waiting = false;
          if (objG_eventManager.isInstagib() || objG_eventManager.isSpaceWars())
            objG_eventManager.machinegunSwitch = true;
          objG_eventManager.setType(objG_eventManager.eventType.EVENT_NONE);
        } else if (22 == a)
          (objG_eventManager.waiting = false),
            objG_eventManager.type != objG_eventManager.eventType.EVENT_NONE &&
              (objG_eventManager.type !=
                objG_eventManager.eventType.EVENT_WARSHIP &&
                (objG_followMode.whiteFlash = 1),
              objG_eventManager.setType(
                objG_eventManager.eventType.EVENT_NONE,
              ));
        else if (23 == a) {
          c = 1;
          f = d.getUint32(c, true);
          c += 4;
          if (0 < f) {
            if ((a = objD_planes[f]))
              (a = func_renameBlankPlayerNames(a.name)),
                objGUI_gameInfo.setWarshipRemoved(a);
          } else objGUI_gameInfo.setWarshipRemoved(null);
          a = d.getUint8(c, true);
          c += 1;
          f = d.getUint8(c, true);
          c += 1;
          d = d.getUint8(c, true);
          objG_eventManager.setWarshipInfo(a, f, d);
        } else if (21 == a) {
          f = d.getUint8(1, true);
          c = 2;
          for (a = ""; ; ) {
            h = d.getUint16(c, true);
            c += 2;
            if (0 == h) break;
            a += String.fromCharCode(h);
          }
          objGUI_gameInfo.setLastWinner(a, f);
        }
    };
    this.connectionClosed = function () {
      objG_followMode.gameCleanup();
      objG_wsConnection.sentHello = false;
      objG_wsConnection.hasConnection = false;
      objG_wsConnection.firstClientListing = true;
      connectionClosed();
      func_displayGameoverScore(-1);
      $("#topGui").hide();
      $("#topGuiConnecting").show();
      $("#copyLink").fadeOut(300);
      $(".btn-needs-server").attr("disabled", "disabled");
      let b = this.connectRetry;
      5 < b && (b = 5);
      setTimeout(this.getServerAndConnect, 1e3 + 1e3 * b);
      objG_wsConnection.connectRetry++;
    };
    this.sendSingleByte = function (b) {
      let a = new ArrayBuffer(1);
      new DataView(a).setUint8(0, b);
      f.send(a);
    };
    this.sendNick = function (b, a) {
      myName = b;
      let c = new ArrayBuffer(3 + 2 * b.length),
        e = new DataView(c),
        h = 2;
      a && (h = 8);
      e.setUint8(0, h);
      e.setUint8(1, intG_color_id);
      e.setUint8(2, intG_decal_id);
      for (h = 0; h < b.length; ++h)
        e.setUint16(3 + 2 * h, b.charCodeAt(h), true);
      f.send(c);
    };
    this.sendInput = function () {
      let b = new ArrayBuffer(10),
        a = new DataView(b);
      a.setUint8(0, 3);
      a.setFloat64(1, objG_inputManager.angle, true);
      let c = 0;
      if (objG_inputManager.hover || !wa) c |= 1;
      if (!wa || bool_following_plane) c |= 2;
      a.setUint8(9, c, true);
      f.send(b);
    };
    this.sendDirection = function () {
      let b = new ArrayBuffer(9),
        a = new DataView(b);
      a.setUint8(0, 4);
      a.setFloat64(1, objG_inputManager.angle, true);
      f.send(b);
    };
    this.sendThrottle = function () {
      let b = new ArrayBuffer(2),
        a = new DataView(b);
      a.setUint8(0, 6);
      1 == objG_inputManager.throttle ? a.setUint8(1, 1) : a.setUint8(1, 0);
      f.send(b);
    };
    this.sendBraking = function (b) {
      let a = new ArrayBuffer(2),
        c = new DataView(a);
      c.setUint8(0, 4);
      b ? c.setUint8(1, 1) : c.setUint8(1, 0);
      f.send(a);
    };
    this.sendShooting = function (b) {
      let a = new ArrayBuffer(2),
        c = new DataView(a);
      c.setUint8(0, 5);
      b ? c.setUint8(1, 1) : c.setUint8(1, 0);
      f.send(a);
    };
    this.leave = function () {
      let b = new ArrayBuffer(1);
      new DataView(b).setUint8(0, 7);
      f.send(b);
    };
    this.ping = function () {
      if (this.hasConnection) {
        let b = new ArrayBuffer(1);
        new DataView(b).setUint8(0, 0);
        f.send(b);
      }
    };
  },
  ClassR_FollowMode = function (b) {
    let _this = this,
      html_canvas,
      ctx_canvas,
      c = 0,
      g = 0,
      h = 0,
      q = false,
      n = 1,
      k,
      m = 0,
      l = 0,
      y = false,
      r = 1,
      x,
      pa = 0,
      L = 0,
      T = false,
      Ca = 1,
      ta,
      N;
    function e() {
      Z && objG_wsConnection.hasConnection && objG_wsConnection.sendInput();
    }
    this.whiteFlash = 0;
    _this.followTopPlayer = function () {
      let a = -1,
        b = 0;
      for (id in objD_planes)
        if (objD_planes[id].inGame) {
          let c = objD_planes[id].score;
          a < c && ((a = c), (b = id));
        }
      b &&
        ((objG_player_plane = objD_planes[b]),
        objG_player_plane.prepareFollow(),
        (Oa = ra = b));
    };
    _this.PlayerFollowing = function (a) {
      c = 0;
      let b, d, e;
      if (0 == list_str_leaderboard_players.length)
        (ra = 0), (objG_player_plane = null);
      else {
        b = false;
        0 == Oa && (b = true);
        if (!b) {
          (b = false), d;
          for (d in list_str_leaderboard_players) {
            if (b) {
              e = objD_planes[list_str_leaderboard_players[d]];
              if (!e.inGame) continue;
              ra = list_str_leaderboard_players[d];
              objG_player_plane = e;
              objG_player_plane.prepareFollow();
              Oa = ra;
              return;
            }
            if (list_str_leaderboard_players[d] == Oa)
              if (a) b = true;
              else {
                d--;
                0 > d && (d = list_str_leaderboard_players.length - 1);
                e = objD_planes[list_str_leaderboard_players[d]];
                ra = list_str_leaderboard_players[d];
                objG_player_plane = e;
                objG_player_plane.prepareFollow();
                Oa = ra;
                return;
              }
          }
        }
        ra = a = list_str_leaderboard_players[0];
        objG_player_plane = objD_planes[a];
        objG_player_plane.prepareFollow();
        Oa = a;
      }
    };
    _this.waitUntilNextFollow = function () {
      c = 3e3;
    };
    _this.update = function (a) {
      let b, e, f, s, t, w, D, C, E, Q, I, N, Y, ba;
      if (objG_assets.loaded) {
        objG_player_plane &&
          !objG_player_plane.inGame &&
          0 == ka &&
          ((objG_player_plane = null), (ra = 0));
        objGUI_gameInfo && objGUI_gameInfo.update(a);
        mb && objG_sfxManager.sound.volume(num_max_volume, mb);
        La = false;
        for (b in objD_pickups)
          objD_pickups[b].update(a),
            objD_pickups[b] &&
              !La &&
              objD_pickups[b].type == id_weapon_superweapon &&
              ((La = true), (Ma = null));
        e = null;
        for (b in objD_missiles)
          objD_missiles[b].update(a), objD_missiles[b].finished && (e = b);
        e && delete objD_missiles[e];
        e = null;
        for (b in objD_planes)
          objD_planes[b].updateBool != objG_wsConnection.lastUpdateBool
            ? (objD_planes[b] == objG_player_plane && (ra = 0),
              delete objD_planes[b])
            : (!La &&
                objD_planes[b].weapon == id_weapon_superweapon &&
                objD_planes[b].inGame &&
                ((La = true),
                (Ma = func_renameBlankPlayerNames(objD_planes[b].name))),
              sc == b && objD_planes[b].inGame && (e = objD_planes[b]),
              objG_eventManager.railSwitch
                ? (objD_planes[b].setWeapon(id_weapon_railgun),
                  (objD_planes[b].ammo = -1))
                : objG_eventManager.machinegunSwitch &&
                  (objD_planes[b].setWeapon(id_weapon_machinegun),
                  (objD_planes[b].ammo = -1)),
              objD_planes[b].update(a));
        for (b in objD_specialEntities) objD_specialEntities[b].update(a);
        objG_eventManager.railSwitch && (objG_eventManager.railSwitch = false);
        objG_eventManager.machinegunSwitch &&
          (objG_eventManager.machinegunSwitch = false);
        objGUI_anchor.update(a);
        if (!Z && 0 == ka && null == objG_player_plane && ((c -= a), 0 >= c))
          for (b in objD_planes) {
            objD_planes[b].inGame &&
              ((objG_player_plane = objD_planes[b]),
              objG_player_plane.prepareFollow(),
              (ra = b));
            break;
          }
        if (objG_eventManager.isSpaceWars()) {
          for (i in list_particleDust) {
            list_particleDust[i].update(
              objGUI_anchor.getBounds(),
              objGUI_anchor.zoom,
            );
            f = list_particleDust[i];
            0.1 < Math.abs(ca.x) + Math.abs(ca.y) &&
              ((f.x -= (f.z - 1) * ca.x * 0.5),
              (f.y -= (f.z - 1) * ca.y * 0.5));
          }
          ca.x = 0;
          ca.y = 0;
        }
        objG_animationManager.update(a);
        H = {
          x:
            (html_canvas.width / 2 +
              (objGUI_anchor.x * objGUI_anchor.zoom - html_canvas.width / 2)) /
            objGUI_anchor.zoom,
          y:
            (html_canvas.height / 2 +
              (objGUI_anchor.y * objGUI_anchor.zoom - html_canvas.height / 2)) /
            objGUI_anchor.zoom,
        };
        objG_backgrounds.update(a);
        if (!int_pathMobile && null != objG_player_plane)
          if (objG_inputManager.mouseMoved) {
            a = 1;
            bool_setting_highQuality || (a = 2);
            Zb =
              (qc +
                (objGUI_anchor.x * objGUI_anchor.zoom -
                  (html_canvas.width * a) / 2)) /
              objGUI_anchor.zoom;
            $b =
              (rc +
                (objGUI_anchor.y * objGUI_anchor.zoom -
                  (html_canvas.height * a) / 2)) /
              objGUI_anchor.zoom;
            a = Zb - objG_player_plane.x;
            (s = $b - objG_player_plane.y), (f = Math.sqrt(a * a + s * s));
            a /= f;
            s /= f;
            objG_inputManager.hover = 75 < f ? 0 : 1;
            t = f = 0;
            wa && ((f = a), (t = -s));
            0 != f &&
              ((a = Math.atan(t / f)),
              0 > f && (a = Math.PI + a),
              (a += Math.PI / 2),
              (objG_inputManager.angle = a));
          } else
            (objG_inputManager.hover = 1), (objG_inputManager.angle = Math.PI);
        t = objGUI_anchor.getBounds();
        a = t[1].x;
        f = t[0].x;
        s = t[0].y;
        t = t[1].y;
        if (e && !func_isInsideBox(e.x, e.y, 30)) {
          (w = H.x - e.x), (D = H.y - e.y), (C = Math.sqrt(w * w + D * D));
          n = 1;
          1300 < C && ((n = 1300 / C), 0.4 > n && (n = 0.4));
          D /= w;
          C = H.y - D * H.x;
          h = 0 > w ? D * a + C : D * f + C;
          h < s ? (h = s) : h > t && (h = t);
          g = (h - C) / D;
          1 < D ? (D = 1) : -1 > D && (D = -1);
          k = Math.acos(D);
          0 > w && (k += Math.PI);
          q = true;
        } else q = false;
        E, (w = false);
        (ub = objG_player_plane ? Za[objG_player_plane.id] : 0) &&
          0 < ub &&
          ((E = objD_planes[ub]), E == e && (w = true));
        !E || func_isInsideBox(E.x, E.y, 30) || w
          ? (y = false)
          : ((w = H.x - E.x),
            (D = H.y - E.y),
            (E = Math.sqrt(w * w + D * D)),
            (r = 1),
            1300 < E && ((r = 1300 / E), 0.4 > r && (r = 0.4)),
            (D /= w),
            (C = H.y - D * H.x),
            (l = 0 > w ? D * a + C : D * f + C),
            l < s ? (l = s) : l > t && (l = t),
            (m = (l - C) / D),
            1 < D ? (D = 1) : -1 > D && (D = -1),
            (x = Math.acos(D)),
            0 > w && (x += Math.PI),
            (y = true));
        if (objG_eventManager.isWarship()) {
          E = 99999;
          (e = 0), Q, I, N, Y;
          for (b in objD_specialEntities)
            if (
              ((C = objD_specialEntities[b]),
              C.state == const_Ic_0 && C.x > -$_sub && C.x < $_sub)
            ) {
              (w = H.x - C.x), (D = H.y - C.y), (ba = Math.sqrt(w * w + D * D));
              ba < E &&
                ((Q = C.x), (I = C.y), (E = ba), (e = b), (N = w), (Y = D));
            }
          0 < e
            ? func_isInsideBox(Q, I, 120)
              ? (T = false)
              : (1300 < E && ((Ca = 900 / E), 0.3 > Ca && (Ca = 0.3)),
                (D = Y / N),
                (C = H.y - D * H.x),
                (L = 0 > N ? D * a + C : D * f + C),
                L < s ? (L = s) : L > t && (L = t),
                (pa = (L - C) / D),
                1 < D ? (D = 1) : -1 > D && (D = -1),
                (ta = Math.acos(D)),
                0 > N && (ta += Math.PI),
                (T = true))
            : (T = false);
        }
      }
    };
    _this.draw = function (b) {
      if (objG_assets.loaded) {
        objGUI_anchor.setupContext();
        objG_backgrounds.drawGradient(ctx_canvas);
        objG_backgrounds.draw(ctx_canvas);
        let c = objGUI_anchor.getBounds()[1].y,
          e = false,
          f;
        if (objG_eventManager.isSpaceWars())
          for (i in list_particleDust) list_particleDust[i].draw(ctx_canvas);
        else
          c > E / 2 - 25 &&
            ((e = true), objG_backgrounds.drawWaterBehind(ctx_canvas));
        if (xa) {
          for (f in objD_pickups) objD_pickups[f].draw(ctx_canvas);
          obj_particleImpacts.draw(ctx_canvas);
          for (f in objD_missiles) objD_missiles[f].draw(ctx_canvas, b);
          for (f in objD_planes) objD_planes[f].draw(ctx_canvas, b);
          for (f in objD_planes) objD_planes[f].drawInfo(ctx_canvas);
          Z && objG_player_plane.drawInput(ctx_canvas);
          for (f in objD_specialEntities)
            objD_specialEntities[f].draw(ctx_canvas);
          objG_animationManager.drawExplosions(ctx_canvas);
          objG_animationManager.drawBehind(ctx_canvas);
        }
        e && objG_backgrounds.drawWaterFront(ctx_canvas);
        if (xa) {
          if (!objG_eventManager.isSpaceWars()) {
            for (f in objD_planes) objD_planes[f].drawReflection(ctx_canvas, b);
            for (f in objD_missiles)
              objD_missiles[f].drawReflection(ctx_canvas, b);
            for (f in objD_specialEntities)
              objD_specialEntities[f].drawReflection(ctx_canvas, b);
          }
          objG_animationManager.drawLayer2(ctx_canvas);
          objG_animationManager.draw(ctx_canvas);
          for (f in objD_specialEntities)
            objD_specialEntities[f].drawInfo(ctx_canvas);
          objG_backgrounds.drawLimits(ctx_canvas);
          q &&
            ((b = 1),
            (c = 0 < qa),
            ctx_canvas.save(),
            ctx_canvas.translate(g, h),
            ctx_canvas.scale(n, n),
            c &&
              (ctx_canvas.save(),
              (e = func_rotatePoint(0, 50, -k)),
              ctx_canvas.translate(e.x, e.y),
              objG_assets.frames.crown.draw(ctx_canvas),
              ctx_canvas.restore()),
            ctx_canvas.rotate(-k),
            (e = 1.2),
            c
              ? (ctx_canvas.translate(0, -(-20 - 10 * b)), (e = 0.9))
              : ctx_canvas.translate(0, -(-30 - 10 * b)),
            (ctx_canvas.fillStyle = "rgba(255,102,0,0.8)"),
            ctx_canvas.beginPath(),
            ctx_canvas.moveTo(-8 * b * e, 0),
            ctx_canvas.lineTo(8 * b * e, 0),
            ctx_canvas.lineTo(0, -20 * b * e),
            ctx_canvas.fill(),
            ctx_canvas.restore());
          y &&
            ((b = 1),
            ctx_canvas.save(),
            ctx_canvas.translate(m, l),
            ctx_canvas.scale(r, r),
            ctx_canvas.save(),
            (e = func_rotatePoint(0, 50, -x)),
            ctx_canvas.translate(e.x, e.y),
            objG_assets.frames.revengeIcon.draw(ctx_canvas),
            ctx_canvas.restore(),
            ctx_canvas.rotate(-x),
            ctx_canvas.translate(0, -(-20 - 10 * b)),
            (e = 0.9),
            (ctx_canvas.fillStyle = "rgba(255,102,0,0.8)"),
            ctx_canvas.beginPath(),
            ctx_canvas.moveTo(-8 * b * e, 0),
            ctx_canvas.lineTo(8 * b * e, 0),
            ctx_canvas.lineTo(0, -20 * b * e),
            ctx_canvas.fill(),
            ctx_canvas.restore());
          T &&
            objG_assets.warshipIcon &&
            ((b = 1),
            ctx_canvas.save(),
            ctx_canvas.translate(pa, L),
            ctx_canvas.scale(Ca, Ca),
            ctx_canvas.save(),
            (e = func_rotatePoint(0, 80, -ta)),
            ctx_canvas.translate(e.x, e.y),
            ctx_canvas.drawImage(
              objG_assets.warshipIcon,
              -objG_assets.warshipIcon.width / 2,
              -objG_assets.warshipIcon.height / 2,
            ),
            ctx_canvas.restore(),
            ctx_canvas.rotate(-ta),
            (e = 0.9),
            ctx_canvas.translate(0, -(-20 - 10 * b)),
            (ctx_canvas.fillStyle = "rgba(255,102,0,0.8)"),
            ctx_canvas.beginPath(),
            ctx_canvas.moveTo(-8 * b * e, 0),
            ctx_canvas.lineTo(8 * b * e, 0),
            ctx_canvas.lineTo(0, -20 * b * e),
            ctx_canvas.fill(),
            ctx_canvas.restore());
        }
        objGUI_anchor.startUILayer();
        bool_drawUI && objGUI_gameInfo.draw(ctx_canvas);
        0 < this.whiteFlash &&
          (ctx_canvas.save(),
          (ctx_canvas.globalAlpha = this.whiteFlash),
          (ctx_canvas.fillStyle = "#FFFFFF"),
          ctx_canvas.fillRect(0, 0, html_canvas.width, html_canvas.height),
          ctx_canvas.restore(),
          (this.whiteFlash -= 0.015));
      }
    };
    _this.gameCleanup = function () {
      objG_player_plane = void 0;
      ra = 0;
      Z = false;
      gb = ma = 0;
      objGUI_gameInfo && objGUI_gameInfo.clearBonusDisplay();
      for (id in objD_pickups) delete objD_pickups[id];
      objD_pickups = {};
      for (id in objD_missiles) delete objD_missiles[id];
      objD_missiles = {};
      for (id in objD_planes) delete objD_planes[id];
      objD_planes = {};
      for (id in objD_specialEntities) delete objD_specialEntities[id];
      objD_specialEntities = {};
    };
    _this.resize = function (a) {
      C();
      objG_eventManager.isSpaceWars() &&
        (N && clearTimeout(N), (N = setTimeout(_this.respawnParticles, 200)));
    };
    let C = function () {
      let a = 2,
        b,
        c;
      bool_setting_highQuality && (a = 1);
      html_canvas.width = window.innerWidth / a;
      html_canvas.height = window.innerHeight / a;
      Ka = html_canvas.width;
      ib = html_canvas.height;
      (b = ib * a),
        (c = -50 + 50 * a + "%"),
        (a = "translate(" + c + "," + c + ") scale(" + a + ")");
      $("#canvas").css({
        transform: a,
      });
      $("#canvas").css({
        "-ms-transform": a,
      });
      $("#canvas").css({
        "-webkit-transform": a,
      });
      num_scale_factor = 0.92 * Math.max(ib / 1016, Ka / 1500);
      num_scale_factor *= window.devicePixelRatio / int_pixel_ratio;
      b = Math.min(1, b / 1016);
      0 < 640 * b &&
        ((b = "translate(-50%,0%) scale(" + b + ")"),
        $("#mainDialog").css({
          transform: b,
        }),
        $("#mainDialog").css({
          "-ms-transform": b,
        }),
        $("#mainDialog").css({
          "-webkit-transform": b,
        }),
        $("#mainDialog").css({
          top: "25%",
        }));
    };
    _this.respawnParticles = function () {
      list_particleDust = [];
      for (let a = 0; 150 > a; a++) list_particleDust.push(new ParticleDust());
    };
    html_canvas = b;
    ctx_canvas = html_canvas.getContext("2d");
    C();
    objG_backgrounds = new Class_Backgrounds();
    objG_animationManager = new Class_AnimationManager();
    _this.respawnParticles();
    objG_assets = new Class_Assets();
    objG_assets.load(function () {
      console.log("Resources loaded!");
      1 == int_pathMobile &&
        ("undefined" != typeof messageHandlers && messageHandlers.didLoad
          ? messageHandlers.didLoad(JSON.stringify({}))
          : window.webkit.messageHandlers.didLoad.postMessage({}));
      objGUI_gameInfo = new Class_UI_GameInfo();
      obj_particleImpacts = new Class_ParticleImpacts();
      objG_wsConnection.hasConnection &&
        !objG_wsConnection.sentHello &&
        objG_wsConnection.hello();
      setInterval(e, 40);
      func_displaySelectedDecal(Math.floor(5 * Math.random()) + 1);
      func_displaySelectedColor(Math.floor(5 * Math.random()) + 1);
      console.log("Loading sounds!");
      objG_sfxManager = new Class_SFXmanager();
      objG_sfxManager.load(function () {
        objG_sfxManager.playSound(str_sfxid_env, 1, 1, const_Q_0, function (a) {
          mb = a;
        });
      });
    });
    myName = "";
    objGUI_anchor = new Class_UI_Anchor(html_canvas, ctx_canvas, 0, 0);
    objG_wsConnection = new Class_WS_Connection();
    objG_wsConnection.getServerAndConnect();
  },
  Class_UI_Anchor = function (html_canvas, ctx_canvas, x, y) {
    let _this = this,
      c = 0,
      g,
      h = 0,
      q = 0,
      n = 0,
      k = 0;
    this.x = x;
    this.y = y;
    this.minZoom = 1;
    this.maxZoom = 2;
    this.zoom = this.minZoom;
    this.setupContext = function () {
      let c = _this.zoom,
        d = html_canvas.width / 2 - _this.x * c,
        f = html_canvas.height / 2 - _this.y * c;
      ctx_canvas.setTransform(1, 0, 0, 1, 0, 0);
      ctx_canvas.translate(d + n, f + k);
      ctx_canvas.scale(c, c);
    };
    this.applyShake = function (a) {
      if (xa)
        if (0 < c) {
          let b = g,
            d;
          250 > c && (b = (c / 1e3 / 0.5) * g);
          h += 1;
          q += 1.1;
          (d = Math.sin(h) * (b / 4)), (b = Math.cos(q) * b);
          n = d;
          k = b;
          c -= a;
        } else k = n = 0;
    };
    this.update = function (b) {
      let c = _this.maxZoom + (_this.minZoom - _this.maxZoom);
      xa || (_this.y = 470);
      Z || 1 != ka || bool_following_plane
        ? ((_this.zoom =
            (1 / (window.devicePixelRatio / int_pixel_ratio)) * 1.2),
          (_this.zoom *= num_scale_factor),
          int_pathMobile && (_this.zoom += 0.3),
          null != objG_player_plane &&
            ((ca.x = objG_player_plane.x - _this.x),
            (ca.y = objG_player_plane.y - _this.y),
            (_this.x = objG_player_plane.x),
            (_this.y = objG_player_plane.y)))
        : ((c =
            (1 / (window.devicePixelRatio / int_pixel_ratio)) *
            0.7 *
            num_scale_factor),
          (_this.zoom += (c - _this.zoom) / 10));
      this.applyShake(b);
    };
    this.setPosition = function (x, y) {
      ca.x = x - _this.x;
      ca.y = y - _this.y;
      _this.x = x;
      _this.y = y;
    };
    this.shake = function () {
      xa && ((c = 500), (g = 7));
    };
    this.getBounds = function () {
      return [
        {
          x: _this.x - html_canvas.width / 2 / _this.zoom,
          y: _this.y - html_canvas.height / 2 / _this.zoom,
        },
        {
          x: _this.x + html_canvas.width / 2 / _this.zoom,
          y: _this.y + html_canvas.height / 2 / _this.zoom,
        },
      ];
    };
    this.getOuterBounds = function () {
      return [
        {
          x: _this.x - html_canvas.width / 2 / _this.minZoom,
          y: _this.y - html_canvas.height / 2 / _this.minZoom,
        },
        {
          x: _this.x + html_canvas.width / 2 / _this.minZoom,
          y: _this.y + html_canvas.height / 2 / _this.minZoom,
        },
      ];
    };
    this.getInnerBounds = function () {
      return [
        {
          x: _this.x - html_canvas.width / 2 / _this.maxZoom,
          y: _this.y - html_canvas.height / 2 / _this.maxZoom,
        },
        {
          x: _this.x + html_canvas.width / 2 / _this.maxZoom,
          y: _this.y + html_canvas.height / 2 / _this.maxZoom,
        },
      ];
    };
    this.startUILayer = function () {
      ctx_canvas.setTransform(1, 0, 0, 1, 0, 0);
    };
  },
  Class_RenderManager = function () {
    let b,
      e,
      f,
      d,
      a = void 0,
      c,
      g;
    this.width;
    this.height;
    this.y = this.x = 0;
    this.canvas;
    this.frameWithCanvas = function (a, b, d) {
      this.width = a.width;
      this.height = a.height;
      this.canvas = a;
      c = b;
      g = d;
    };
    this.setFrameInfo = function (h, q) {
      a = q;
      b = h[1];
      e = h[2];
      this.width = h[3];
      this.height = h[4];
      f = h[5];
      d = h[6];
      c = -this.width * f;
      g = -this.height * d;
    };
    this.draw = function (d) {
      a
        ? d.drawImage(
            a,
            b,
            e,
            this.width,
            this.height,
            c + this.x,
            g + this.y,
            this.width,
            this.height,
          )
        : d.drawImage(
            this.canvas,
            0,
            0,
            this.width,
            this.height,
            c + this.x,
            g + this.y,
            this.width,
            this.height,
          );
    };
    this.renderTintedFrame = function (d) {
      let f = document.createElement("canvas"),
        n = f.getContext("2d");
      f.width = this.width;
      f.height = this.height;
      let k = document.createElement("canvas");
      k.width = this.width;
      k.height = this.height;
      let m = k.getContext("2d");
      m.fillStyle = d;
      m.fillRect(0, 0, k.width, k.height);
      m.globalCompositeOperation = "destination-atop";
      m.drawImage(
        a,
        b,
        e,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height,
      );
      n.globalAlpha = 1;
      n.drawImage(k, 0, 0);
      d = new Class_RenderManager();
      d.frameWithCanvas(f, c, g);
      return d;
    };
    this.getImageCopy = function () {
      let c = document.createElement("canvas");
      c.width = this.width;
      c.height = this.height;
      let d = c.getContext("2d");
      d.drawImage(
        a,
        b,
        e,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height,
      );
      let f = d.getImageData(0, 0, this.width, this.height);
      return {
        canvas: c,
        ctx: d,
        toData: f.data,
        to: f,
      };
    };
    this.generateTintImage2 = function (d, f, n, k) {
      let m = document.createElement("canvas");
      m.width = this.width;
      m.height = this.height;
      let l = m.getContext("2d");
      l.drawImage(
        a,
        b,
        e,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height,
      );
      let p, r, s, t;
      for (
        p = l.getImageData(0, 0, this.width, this.height),
          r = p.data,
          s = r.length,
          t = 0;
        t < s;

      )
        (r[t] = r[t++] * (1 - k) + d * k),
          (r[t] = r[t++] * (1 - k) + f * k),
          (r[t] = r[t++] * (1 - k) + n * k),
          (r[t] = 0.8 * r[t++]);
      l.putImageData(p, 0, 0);
      d = new Class_RenderManager();
      d.frameWithCanvas(m, c, g);
      return d;
    };
    this.generateTintImage = function (a, b, d, e) {
      let f = document.createElement("canvas");
      f.width = this.width;
      f.height = this.height;
      let l = f.getContext("2d");
      l.globalAlpha = 1;
      l.globalCompositeOperation = "copy";
      l.drawImage(a[3], 0, 0);
      l.globalCompositeOperation = "lighter";
      0 < b && ((l.globalAlpha = b / 255), l.drawImage(a[0], 0, 0));
      0 < d && ((l.globalAlpha = d / 255), l.drawImage(a[1], 0, 0));
      0 < e && ((l.globalAlpha = e / 255), l.drawImage(a[2], 0, 0));
      a = new Class_RenderManager();
      a.frameWithCanvas(f, c, g);
      return a;
    };
    this.generateRGBKs = function () {
      let c = [],
        d = document.createElement("canvas");
      d.getContext("2d");
      d.width = this.width;
      d.height = this.height;
      d = document.createElement("canvas");
      d.width = this.width;
      d.height = this.height;
      d = d.getContext("2d");
      d.drawImage(
        a,
        b,
        e,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height,
      );
      let f = d.getImageData(0, 0, this.width, this.height).data,
        g = f.length,
        m = this.getImageCopy(),
        l = this.getImageCopy(),
        p = this.getImageCopy();
      d = this.getImageCopy();
      for (let r = 0; r < g; r += 4)
        (m.toData[r] = f[r]),
          (m.toData[r + 1] = 0),
          (m.toData[r + 2] = 0),
          (m.toData[r + 3] = f[r + 3]),
          (l.toData[r] = 0),
          (l.toData[r + 1] = f[r + 1]),
          (l.toData[r + 2] = 0),
          (l.toData[r + 3] = f[r + 3]),
          (p.toData[r] = 0),
          (p.toData[r + 1] = 0),
          (p.toData[r + 2] = f[r + 2]),
          (p.toData[r + 3] = f[r + 3]),
          (d.toData[r] = 0),
          (d.toData[r + 1] = 0),
          (d.toData[r + 2] = 0),
          (d.toData[r + 3] = f[r + 3]);
      m.ctx.putImageData(m.to, 0, 0);
      l.ctx.putImageData(l.to, 0, 0);
      p.ctx.putImageData(p.to, 0, 0);
      d.ctx.putImageData(d.to, 0, 0);
      f = new Image();
      f.src = m.canvas.toDataURL();
      m = new Image();
      m.src = l.canvas.toDataURL();
      l = new Image();
      l.src = p.canvas.toDataURL();
      p = new Image();
      p.src = d.canvas.toDataURL();
      c.push(f);
      c.push(m);
      c.push(l);
      c.push(p);
      return c;
    };
    this.renderToCanvas = function () {
      let c = document.createElement("canvas"),
        d = c.getContext("2d");
      c.width = this.width;
      c.height = this.height;
      let f = document.createElement("canvas");
      f.width = this.width;
      f.height = this.height;
      f.getContext("2d");
      a
        ? d.drawImage(
            a,
            b,
            e,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height,
          )
        : d.drawImage(
            this.canvas,
            0,
            0,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height,
          );
      d.globalAlpha = 1;
      d.drawImage(f, 0, 0);
      return c;
    };
  },
  Class_AnimationManager = function () {
    let b = {},
      e = [],
      f = [],
      d = [],
      a = [];
    this.addAnimationInfo = function (a, d) {
      b[a] = d;
    };
    this.setAnimationInterval = function (a, d) {
      b[a].setInterval(d);
    };
    this.createAnimation = function (a) {
      a = b[a];
      let d = new Class_DrawAnimation();
      d.setup(a);
      return d;
    };
    this.runAnimation = function (a) {
      e.push(a);
    };
    this.runAnimationLayer2 = function (a) {
      f.push(a);
    };
    this.runAnimationBehind = function (a) {
      d.push(a);
    };
    this.addBlast = function (a, b, d, e, f) {
      let k = objG_animationManager.createAnimation("explosion");
      k.setScale(d);
      k.posX = a;
      k.posY = b;
      objG_animationManager.runAnimationBehind(k);
      a = 1 - func_calculateDistance2D(a, b, H.x, H.y) / num_sound_max_distance;
      0.01 < a &&
        objG_sfxManager.playSound(str_sfxid_mexpl2, a * f, 1, e, null);
    };
    this.addExplosion = function (b, d, e, f) {
      if (
        bool_drawExplosions &&
        func_isInsideBox(b, d, 100) &&
        func_isTimeElapsed_50ms()
      ) {
        if (1 >= a.length) {
          let n = new Class_ParticleDebrisManager();
          n.init(b, d, e, f);
          a.push(n);
        }
        this.addBlast(b, d, 1, const_Sa_3, 1);
        objGUI_anchor.shake();
      }
    };
    this.update = function (b) {
      for (const i in e) e[i].update(b), e[i].deleting && e.splice(i, 1);
      for (const i in d) d[i].update(b), d[i].deleting && d.splice(i, 1);
      for (const i in f) f[i].update(b), f[i].deleting && f.splice(i, 1);
      for (const i in a) a[i].update(b), a[i].deleting && a.splice(i, 1);
    };
    this.drawBehind = function (a) {
      for (let b in d) {
        let e = d[b];
        a.save();
        a.translate(e.posX, e.posY);
        a.scale(e.scaleX, e.scaleY);
        a.rotate(e.rotation);
        e.draw(a);
        a.restore();
      }
    };
    this.drawLayer2 = function (a) {
      for (let b in f) {
        let d = f[b];
        a.save();
        a.translate(d.posX, d.posY);
        a.scale(d.scaleX, d.scaleY);
        a.rotate(d.rotation);
        d.draw(a);
        a.restore();
      }
    };
    this.draw = function (a) {
      for (let b in e) {
        let d = e[b];
        a.save();
        a.translate(d.posX, d.posY);
        a.scale(d.scaleX, d.scaleY);
        a.rotate(d.rotation);
        d.draw(a);
        a.restore();
      }
    };
    this.drawExplosions = function (b) {
      for (let d in a) a[d].draw(b);
    };
  },
  Class_DrawAnimation = function () {
    let b = 0,
      e = 0,
      f = 0;
    this.frames;
    this.frameCount = 0;
    this.deleting = false;
    this.posY = this.posX = 0;
    this.scaleY = this.scaleX = 1;
    this.rotation = 0;
    this.alpha = 1;
    this.copy = function (b) {
      b = new Class_DrawAnimation();
      b.frames = this.frames;
      b.frameCount = this.frameCount;
      b.deleting = this.deleting;
      b.posX = this.posX;
      b.posY = this.posY;
      b.scaleX = this.scaleX;
      b.scaleY = this.scaleY;
      b.rotation = this.rotation;
      b.alpha = this.alpha;
      b.setInterval(e);
      return b;
    };
    this.setup = function (b) {
      e = b.interval;
      this.frames = b.frames;
      this.frameCount = b.frames.length;
    };
    this.setInterval = function (b) {
      e = b;
    };
    this.update = function (d) {
      this.deleting ||
        (f > e && (b++, (f -= e)),
        (f += d),
        b >= this.frameCount && (this.deleting = true));
    };
    this.setScale = function (b) {
      this.scaleY = this.scaleX = b;
    };
    this.draw = function (d) {
      1 > this.alpha && (d.globalAlpha = this.alpha);
      this.frames[b].draw(d);
    };
  },
  Class_Animation = function () {
    this.frames = [];
    this.interval = 0;
    this.addFrame = function (b) {
      this.frames.push(b);
    };
    this.setInterval = function (b) {
      this.interval = b;
    };
  },
  ClassR_ParticleU = function () {
    this.color = {
      h: "61",
      s: "100%",
      l: "100%",
      a: 1,
    };
    this.rotation = 0;
    this.scale = 1;
    this.pos = {
      x: 0,
      y: 0,
    };
    this.speed = {
      x: 0,
      y: 0,
    };
    this.time = 0;
    this.used = this.active = false;
    this.rotationSpeed = 0;
    this.draw = function (b) {
      b.save();
      b.translate(this.pos.x, this.pos.y);
      b.scale(this.scale, this.scale);
      b.rotate(this.rotation);
      let e =
        "hsla(" +
        this.color.h +
        "," +
        this.color.s +
        "," +
        this.color.l +
        "," +
        this.color.a +
        ")";
      b.translate(20, -2);
      b.beginPath();
      b.arc(0, 0, 25, 0, 2 * Math.PI, false);
      b.fillStyle = e;
      b.fill();
      b.beginPath();
      b.arc(-15, -32, 7, 0, 2 * Math.PI, false);
      b.fillStyle = e;
      b.fill();
      b.restore();
    };
  },
  Class_ParticleManager = function () {
    let b = 0,
      e = 0,
      f = [],
      d = 0,
      a,
      c,
      g,
      h;
    this.life = 400;
    this.debreeAge = 0;
    this.alpha = 1;
    this.init = function (q, n, k) {
      d = q;
      a = 0;
      c = -0.03;
      h = g = 0;
      b = n;
      e = k;
      q = this.life / d;
      for (n = 0; n < d; n++)
        (k = new ClassR_ParticleU()),
          this.resetParticle(k),
          (k.active = false),
          (k.time = q * n),
          f.push(k);
    };
    this.resetParticle = function (a) {
      a.pos.x = b;
      a.pos.y = e;
      a.speed.x = g;
      a.speed.y = h;
      a.time = 0;
      a.color.a = 1;
      a.rotationSpeed = (Math.random() - 0.5) / 10;
      a.rotation = 360 * Math.random();
    };
    this.update = function (b) {
      b = 1e3 / 60;
      let e, g, h, l;
      for (e = 0; e < d; e++) {
        g = f[e];
        g.time >= this.life &&
          (g.active || ((g.active = true), (g.time %= this.life)),
          this.resetParticle(g));
        g.time += b;
        if (g.active) {
          h = g.time / this.life;
          1 < h && (h = 1);
          g.pos.x += 1 * g.speed.x;
          g.pos.y += 1 * g.speed.y;
          if (0 <= h && 0.1 > h) {
            l = h / 0.1;
            g.scale = 0.2;
          } else g.scale = 0.2 + (h - 0.1);
          g.rotation += g.rotationSpeed;
          0 <= h && 0.1 > h
            ? ((l = h / 0.1), 0.8 < l && (l = 0.8), (g.color.a = l))
            : (g.color.a = 0.9 - (h - 0.1));
          0 <= h && 0.25 > h
            ? ((l = h / 0.25),
              (g.color.h = 61 * (1 - l)),
              (g.color.s = "100%"),
              (g.color.l = "50%"))
            : 0.25 <= h &&
              0.3 >= h &&
              ((l = (h - 0.25) / (0.3 - 0.25)),
              (g.color.h = 0),
              (g.color.s = 100 * (1 - l) + "%"),
              (g.color.l = 100 * (0.4 + 0.1 * (1 - l)) + "%"));
          g.speed.x += 1 * a;
          g.speed.y += 1 * c;
        }
      }
    };
    this.updateExplosion = function (b) {
      b = 1e3 / 60;
      let e, g, h, l;
      for (e = 0; e < d; e++) {
        g = f[e];
        g.time >= this.life &&
          (g.active || ((g.active = true), (g.time %= this.life)),
          this.resetParticle(g));
        g.time += b;
        if (g.active) {
          h = g.time / this.life;
          1 < h && (h = 1);
          g.pos.x += 1 * g.speed.x;
          g.pos.y += 1 * g.speed.y;
          if (0 <= h && 0.1 > h) {
            l = h / 0.1;
            g.scale = 0.25;
          } else g.scale = 0.25 + (h - 0.1);
          g.rotation += g.rotationSpeed;
          0 <= h && 0.1 > h
            ? ((l = h / 0.1),
              0.8 < l && (l = 0.8),
              (g.color.a = l * (1 - this.debreeAge)))
            : ((l = Math.pow(1 - (h - 0.1) / 0.9, 1 + 5 * this.debreeAge)),
              (g.color.a = l.toFixed(2)));
          g.color.a *= this.alpha;
          0 <= h && 0.25 > h
            ? ((l = h / 0.25),
              (g.color.h = (61 * (1 - l)).toFixed(2)),
              (h = 100 * (1 - this.debreeAge)),
              (g.color.s = h.toFixed(2) + "%"),
              (g.color.l = "50%"))
            : 0.25 <= h &&
              0.4 >= h &&
              ((l = (h - 0.25) / (0.4 - 0.25)),
              (g.color.h = 0),
              (h = 100 * (1 - l) * (1 - this.debreeAge)),
              (g.color.s = h.toFixed(2) + "%"),
              (g.color.l = (100 * (0.4 + 0.1 * (1 - l))).toFixed(2) + "%"));
          g.speed.x += 1 * a;
          g.speed.y += 1 * c;
        }
      }
    };
    this.updateMissileSmoke = function (b) {
      b = 1e3 / 60;
      let e, g, h, l;
      for (e = 0; e < d; e++) {
        g = f[e];
        g.time >= this.life &&
          (g.active || ((g.active = true), (g.time %= this.life)),
          this.resetParticle(g));
        g.time += b;
        if (g.active) {
          h = g.time / this.life;
          1 < h && (h = 1);
          g.pos.x += 1 * g.speed.x;
          g.pos.y += 1 * g.speed.y;
          if (0 <= h && 0.1 > h) {
            l = h / 0.1;
            g.scale = 0.2;
          } else g.scale = 0.2 + 0.1 * (h - 0.1);
          g.rotation += g.rotationSpeed;
          0 <= h && 0.1 > h
            ? ((l = h / 0.1), 0.8 < l && (l = 0.8), (g.color.a = l))
            : (g.color.a = 0.9 - (h - 0.1));
          0 <= h && 0.25 > h
            ? ((g.color.h = 57), (g.color.s = "21%"), (g.color.l = "50%"))
            : 0.25 <= h &&
              ((l = (h - 0.25) / 0.75),
              (g.color.h = 57),
              (g.color.s = "21%"),
              (h = 50 - 50 * l),
              10 > h && (h = 10),
              (g.color.l = h + "%"));
          g.speed.x += 1 * a;
          g.speed.y += 1 * c;
        }
      }
    };
    this.setPosition = function (a, c) {
      b = a;
      e = c;
    };
    this.setLife = function (a) {
      this.life = a;
    };
    this.draw = function (a) {
      for (let b = d - 1; 0 <= b; b--) {
        let c = f[b];
        c.active && c.draw(a);
      }
    };
  },
  Class_ParticleDebrisManager = function () {
    let e = [],
      f,
      d;
    function b(a) {
      return Math.random() * a - a / 2;
    }
    this.deleting = false;
    this.init = function (a, c, e, h) {
      let q, n, k, m, l, p, r;
      f = a;
      d = c;
      a = 2 + 4 * Math.random();
      c = 2 + 4 * Math.random();
      q = 2 + 4 * Math.random();
      Math.random();
      (n = Math.PI / 4),
        (k = b(Math.PI / 2)),
        (m = b(n) + k),
        (l = Math.cos(m)),
        (m = Math.sin(m)),
        (p = (2 / 3) * Math.PI + b(n) + k),
        (r = Math.cos(p)),
        (p = Math.sin(p)),
        (k = (4 / 3) * Math.PI + b(n) + k),
        (n = Math.cos(k)),
        (k = Math.sin(k));
      this.addDebree(l * a + e, m * a + h);
      this.addDebree(r * c + e, p * c + h);
      this.addDebree(n * q + e, k * q + h);
    };
    this.addDebree = function (a, b) {
      let g = new Class_ParticleDebris();
      g.init(f, d);
      g.setSpeed(a, b);
      e.push(g);
    };
    this.update = function (a) {
      let b = 0;
      for (debreeID in e) {
        let d = e[debreeID];
        d.update(a);
        d.deleting && e.splice(debreeID, 1);
        b++;
      }
      0 == b && (this.deleting = true);
    };
    this.draw = function (a) {
      for (debreeID in e) e[debreeID].draw(a);
    };
  },
  Class_ParticleDebris = function () {
    let b,
      e,
      f,
      d,
      a,
      c = 0.08,
      g,
      h,
      q,
      n = 0;
    objG_eventManager.isSpaceWars() && (c = 0);
    this.deleting = false;
    this.init = function (a, b) {
      g = a;
      h = b;
      q = new Class_ParticleManager();
      q.init(15, g, h);
    };
    this.setSpeed = function (c, g) {
      b = c;
      e = g;
      f = 0;
      d = 0.2 * b;
      a = 0.2 * e;
    };
    this.update = function (k) {
      f += c;
      g += b;
      h += e + f;
      b *= 0.975;
      e *= 0.975;
      c *= 0.975;
      Math.abs(b) < Math.abs(d) && (b = d);
      Math.abs(e) < Math.abs(a) && (e = a);
      3 < f && (f = 3);
      n += k;
      500 < n && 2300 >= n
        ? (q.debreeAge = (n - 500) / 2300)
        : 2300 < n && 2500 >= n
          ? (q.alpha = (2500 - n) / 200)
          : 2500 < n && (this.deleting = true);
      this.deleting || (q.setPosition(g, h), q.updateExplosion(k));
    };
    this.draw = function (a) {
      this.deleting || q.draw(a);
    };
  },
  Class_Missile = function () {
    let obj_particleTrails = new Class_ParticleTrails(),
      e = 0,
      f = 0;
    this.lastUpdate = 0;
    this.id = -1;
    this.angle =
      this.speed =
      this.dstY =
      this.dstX =
      this.origY =
      this.origX =
      this.prevY =
      this.prevX =
      this.y =
      this.x =
        0;
    this.controlAngle = -90;
    this.frameSwitchTime = 40;
    this.timeToNextFrame = 0;
    this.flameState = 1;
    this.lastImage;
    this.first_set = true;
    this.colorHue = 0;
    this.finished = false;
    this.type = 0;
    this.update = function (d) {
      let a = func_clamp(
          (T - this.lastUpdate) / num_global_physics_step_ms,
          0,
          1,
        ),
        c = this.y - this.prevY,
        g;
      0 == this.x - this.prevX &&
        0 == c &&
        (f++, 50 < f && (this.finished = true));
      this.prevX = this.x;
      this.prevY = this.y;
      this.x = a * (this.dstX - this.origX) + this.origX;
      this.y = a * (this.dstY - this.origY) + this.origY;
      obj_particleTrails.setPosition(this.x, this.y);
      obj_particleTrails.update(d);
      if (1 == this.type)
        objG_eventManager.isSpaceWars() && (this.angle += 0.2);
      else if (2 != this.type) {
        a = E / 2;
        c = a - 100;
        if (this.y > c && this.y < a && 0 >= e) {
          e = 5;
          (g = Math.random() / 2),
            (c = (0.2 + (0.5 - ((a - this.y) / (a - c)) * 0.5)) * (0.95 + g)),
            (g = 20 * Math.sin(this.angle));
          obj_particleImpacts.addSplash(
            this.x - g,
            a + 5 * Math.random(),
            c,
            true,
          );
        }
        e -= d;
      }
    };
    this.draw = function (d, a) {
      let c = 1;
      this.timeToNextFrame -= a;
      0 >= this.timeToNextFrame &&
        ((this.flameState = !this.flameState),
        (this.timeToNextFrame = this.frameSwitchTime));
      let e = 0.7;
      this.flameState && (e = 1);
      0 == this.type &&
        ((obj_particleTrails.width = 1.5 * e),
        (obj_particleTrails.style = "rgba(247, 189, 57, 1.0)"),
        obj_particleTrails.draw(d),
        (obj_particleTrails.width = 0.4 * e),
        (obj_particleTrails.style = "rgba(232, 247, 59, 1.0)"),
        obj_particleTrails.draw(d),
        d.save(),
        d.translate(this.x, this.y),
        this.flameState ? d.scale(0.7, 0.7) : d.scale(0.9, 0.9),
        d.rotate(this.angle),
        d.translate(-27, 0),
        objG_assets.frames.throttleFlame.draw(d),
        d.restore());
      d.save();
      d.translate(this.x, this.y);
      2 != this.type
        ? (1 == this.type && (c = 1.4),
          d.scale(c, c),
          1 == this.type &&
            objG_assets.blinkImage &&
            objG_eventManager.isSpaceWars() &&
            (d.scale(2, 2),
            d.drawImage(
              objG_assets.blinkImage,
              -objG_assets.blinkImage.width / 2,
              -objG_assets.blinkImage.height / 2,
            ),
            d.scale(0.5, 0.5)),
          d.rotate(this.angle),
          0 == this.type
            ? objG_assets.frames.missile_attack.draw(d)
            : objG_assets.frames.bomb.draw(d))
        : (d.beginPath(),
          (d.fillStyle = "#FF0000"),
          d.arc(0, 0, 6, 0, 2 * Math.PI),
          d.fill(),
          d.beginPath(),
          (d.fillStyle = "#FFFFFF"),
          d.arc(0, 0, 4, 0, 2 * Math.PI),
          d.fill());
      d.restore();
    };
    this.drawReflection = function (b, a) {
      let c = E / 2,
        e = c - this.y;
      if (!(0 > e || 170 < e)) {
        let f = e / 170;
        b.save();
        b.translate(this.x, c + e - 25);
        c = 1;
        30 > e && 15 <= e ? (c = (e - 15) / 15) : 15 > e && (c = 0);
        b.globalAlpha = 0.7 * (1 - f) * c;
        b.scale(1.1, 0.6);
        b.beginPath();
        b.fillStyle = "rgba(0,100,255,1.0)";
        b.arc(0, 0, 10, 0, 2 * Math.PI);
        b.fill();
        b.restore();
      }
    };
    this.setPosition = function (b, a, c) {
      this.origX = this.dstX;
      this.origY = this.dstY;
      this.dstX = 10 * b;
      this.dstY = 10 * a;
      this.first_set &&
        ((b = objD_planes[c])
          ? ((a = 5 * Math.abs(Math.cos(b.angle + Math.PI / 2))),
            (this.origX = b.x),
            (this.origY = b.y + a),
            (this.x = b.x),
            (this.y = b.y))
          : ((this.x = this.dstX),
            (this.y = this.dstY),
            (this.origX = this.dstX),
            (this.origY = this.dstY)),
        (this.first_set = false),
        1 == this.type && (this.angle = Math.PI / 2));
      0 == this.type &&
        ((b = this.dstX - this.origX),
        (a = this.dstY - this.origY),
        (this.angle = 0 <= b ? Math.atan(a / b) : Math.atan(a / b) + Math.PI));
    };
    this.setColorHue = function (b) {
      this.colorHue = b;
    };
    this.setType = function (d) {
      this.type = d;
    };
    this.getSpeedDirectionX = function () {
      return this.x - this.prevX;
    };
    this.getSpeedDirectionY = function () {
      return this.y - this.prevY;
    };
    obj_particleTrails.tailAddJointInterval = 30;
    obj_particleTrails.enabled = true;
    obj_particleTrails.trailTime = 100;
    obj_particleTrails.width = 1.2;
    obj_particleTrails.fixedColor = true;
  },
  Class_ParticleTrails = function () {
    let b, e;
    this.tailAddJointInterval = 50;
    this.timeToNextJoint = 0;
    this.tailJoints = [[]];
    this.trailTimeEffectStart = this.trailTime = 600;
    this.trailEffectTime = 0;
    this.enabled = false;
    this.width = 1;
    this.fixedColor = false;
    this.style;
    this.update = function (f) {
      let d = this.tailJoints.length - 1,
        c,
        g,
        a;
      if (0 >= this.timeToNextJoint && -1 < d) {
        this.timeToNextJoint = this.tailAddJointInterval;
        this.enabled &&
          this.tailJoints[d].push({
            x: b,
            y: e,
            origX: b,
            origY: e,
            t: T,
            fx: (600 - Math.abs(this.trailEffectTime - 600)) / 600,
            style: this.style,
          });
        for (a = 0; a <= d; a++) {
          c = this.tailJoints[a].length;
          if (0 < c) {
            c = T - this.tailJoints[a][0].t;
            c > this.trailTime &&
              (this.tailJoints[a].splice(0, 1),
              0 == this.tailJoints[a].length && this.tailJoints.splice(a, 1));
            break;
          }
        }
      }
      for (
        g = this.timeToNextJoint / 50, d = this.tailJoints.length - 1, a = 0;
        a <= d;
        a++
      )
        (c = this.tailJoints[a].length),
          1 >= c ||
            ((c = T - this.tailJoints[a][0].t),
            c > this.trailTime - this.tailAddJointInterval &&
              ((c = this.tailJoints[a][0].origY - this.tailJoints[a][1].origY),
              (this.tailJoints[a][0].x =
                this.tailJoints[a][1].origX +
                (this.tailJoints[a][0].origX - this.tailJoints[a][1].origX) *
                  g),
              (this.tailJoints[a][0].y = this.tailJoints[a][1].origY + c * g)));
      this.timeToNextJoint -= f;
      this.trailEffectTime =
        0 > this.trailEffectTime ? 0 : this.trailEffectTime - f;
    };
    this.draw = function (b) {
      if (bool_drawTrails)
        for (let d = this.tailJoints.length, a = 0; a < d; a++)
          for (let c = this.tailJoints[a].length, e = 0; e < c - 1; e++) {
            b.strokeStyle = this.tailJoints[a][e].style;
            let h = (e / c) * (8 + 8 * this.tailJoints[a][e].fx);
            0 == h && (h = 0.1);
            b.lineWidth = h * this.width;
            b.beginPath();
            b.lineTo(this.tailJoints[a][e].x, this.tailJoints[a][e].y);
            b.lineTo(this.tailJoints[a][e + 1].x, this.tailJoints[a][e + 1].y);
            b.stroke();
          }
    };
    this.setPosition = function (f, d) {
      b = f;
      e = d;
    };
    this.push = function () {
      this.tailJoints.push([]);
    };
    this.trailEffect = function () {
      this.trailEffectTime = 1200;
    };
    this.clear = function () {
      this.tailJoints = [[]];
    };
  },
  Class_ParticleFlags = function () {
    let b, e;
    this.tailJoints = [[]];
    this.maxPoints = 1;
    this.flagDivisions = 5;
    this.letterMinDistance = this.pointMinDistance = 10;
    this.texture;
    this.textureWidth;
    this.textureHeight;
    this.loaded = this.enabled = false;
    this.width = 1;
    this.style;
    this.flagHeight;
    this.flipX = false;
    this.flipY = true;
    this.stringScale = this.scale = 1;
    this.setTexture = function (b) {
      this.texture = new Image();
      this.texture.src = "flags/" + b.toLowerCase() + ".png";
      let _this = this;
      this.texture.onload = function () {
        _this.textureWidth = _this.texture.width;
        _this.textureHeight = _this.texture.height;
        _this.maxPoints = parseInt(_this.textureWidth / 12);
        _this.flagDivisions = _this.maxPoints - 1;
        let a = _this.scale;
        _this.flagHeight = 0.5 * _this.textureHeight * a;
        a = (_this.textureWidth * a) / _this.flagDivisions;
        _this.pointMinDistance = a;
        _this.letterMinDistance = a;
        _this.enabled = true;
        _this.loaded = true;
      };
    };
    this.update = function (f) {
      f = false;
      let d = this.tailJoints[0].length;
      if (0 == d) f = true;
      else {
        let a = this.tailJoints[0][d - 1],
          c = (a = Math.sqrt(Math.pow(a.x - b, 2) + Math.pow(a.y - e, 2)));
        1 < d &&
          ((c = this.tailJoints[0][d - 2]),
          (c = Math.sqrt(Math.pow(c.x - b, 2) + Math.pow(c.y - e, 2))));
        a > this.pointMinDistance &&
          c > 3 * this.pointMinDistance &&
          (f = true);
      }
      f &&
        (this.tailJoints[0].push({
          x: b,
          y: e,
          origX: b,
          origY: e,
          t: T,
          fx: 0,
          style: this.style,
        }),
        d > this.maxPoints && this.tailJoints[0].splice(0, 1));
    };
    this.draw = function (f) {
      if (bool_drawTrails && this.loaded && 0 < this.tailJoints.length)
        for (
          let d,
            a,
            c = this.letterMinDistance,
            g = true,
            h = 0,
            q = 0,
            n,
            k,
            m,
            l,
            p,
            r,
            s = this.tailJoints[0].length - 2;
          0 <= s;
          s--
        ) {
          let t = this.tailJoints[0][s].x,
            w = this.tailJoints[0][s].y,
            u;
          g && ((d = b), (a = e));
          let v = t - d,
            x = w - a,
            A,
            C,
            z,
            B,
            E;
          u = Math.sqrt(Math.pow(v, 2) + Math.pow(x, 2));
          0 == u
            ? console.log(
                "OOPS! Division by ZERO! " + s + " : " + v + ":::" + x,
              )
            : ((A = v / u), (C = x / u));
          v = false;
          if (0 < u - c) {
            z = d + A * c;
            B = a + C * c;
            c = this.letterMinDistance;
            if (0 < h) {
              if (q < this.flagDivisions) {
                d = this.flagHeight;
                n = z - n;
                k = B - k;
                n /= this.letterMinDistance;
                k /= this.letterMinDistance;
                k = -k * d;
                n *= d;
                u = z + k;
                (v = B + n), (x = z - k), (E = B - n);
                d = this.textureWidth;
                a = this.textureHeight;
                let F, G, H, J;
                this.flipY && 0 < A ? ((F = 0), (G = a)) : ((F = a), (G = 0));
                this.flipX && 0 < A
                  ? ((H = (q / this.flagDivisions) * d),
                    (J = ((q + 1) / this.flagDivisions) * d))
                  : ((H = d * (1 - q / this.flagDivisions)),
                    (J = d * (1 - (q + 1) / this.flagDivisions)));
                d = f;
                a = this.texture;
                m = [
                  {
                    x: p,
                    y: r,
                    u: H,
                    v: F,
                  },
                  {
                    x: m,
                    y: l,
                    u: H,
                    v: G,
                  },
                  {
                    x: u,
                    y: v,
                    u: J,
                    v: G,
                  },
                  {
                    x: x,
                    y: E,
                    u: J,
                    v: F,
                  },
                ];
                l = [
                  [0, 1, 2],
                  [2, 3, 0],
                ];
                for (p = 0; 2 > p; p++) {
                  let D = l[p];
                  r = m[D[0]].x;
                  u = m[D[1]].x;
                  v = m[D[2]].x;
                  x = m[D[0]].y;
                  E = m[D[1]].y;
                  F = m[D[2]].y;
                  G = m[D[0]].u;
                  H = m[D[1]].u;
                  J = m[D[2]].u;
                  let L = m[D[0]].v,
                    M = m[D[1]].v;
                  D = m[D[2]].v;
                  d.save();
                  d.beginPath();
                  d.moveTo(r, x);
                  d.lineTo(u, E);
                  d.lineTo(v, F);
                  d.closePath();
                  d.clip();
                  let N = G * M + L * J + H * D - M * J - L * H - G * D;
                  d.transform(
                    (r * M + L * v + u * D - M * v - L * u - r * D) / N,
                    (x * M + L * F + E * D - M * F - L * E - x * D) / N,
                    (G * u + r * J + H * v - u * J - r * H - G * v) / N,
                    (G * E + x * J + H * F - E * J - x * H - G * F) / N,
                    (G * M * v +
                      L * u * J +
                      r * H * D -
                      r * M * J -
                      L * H * v -
                      G * u * D) /
                      N,
                    (G * M * F +
                      L * E * J +
                      x * H * D -
                      x * M * J -
                      L * H * F -
                      G * E * D) /
                      N,
                  );
                  d.drawImage(a, 0, 0);
                  d.restore();
                }
                q++;
              } else break;
              m = z + k;
              l = B + n;
              p = z - k;
              r = B - n;
            } else
              (d = this.flagHeight),
                (n = z - b),
                (k = B - e),
                (n /= this.letterMinDistance),
                (k /= this.letterMinDistance),
                (k = -k * d),
                (n *= d),
                (m = z + k),
                (l = B + n),
                (p = z - k),
                (r = B - n),
                (f.strokeStyle = "rgba(255, 255, 255, 0.3)"),
                (f.lineWidth = 2),
                f.beginPath(),
                f.lineTo(b, e),
                f.lineTo(z + k * this.stringScale, B + n * this.stringScale),
                f.stroke(),
                f.beginPath(),
                f.lineTo(b, e),
                f.lineTo(z - k * this.stringScale, B - n * this.stringScale),
                f.stroke();
            n = z;
            k = B;
            h++;
            v = true;
          } else c -= u;
          v ? ((d = z), (a = B), s++) : ((d = t), (a = w));
          g && (g = false);
        }
    };
    this.setPosition = function (f, d) {
      b = f;
      e = d;
    };
    this.push = function () {};
    this.trailEffect = function () {};
    this.clear = function () {
      this.tailJoints = [[]];
    };
  },
  Class_ScoreAccumInfo = function () {
    let b = [],
      e = [],
      f;
    this.update = function (d) {
      0 < e.length && 2e3 < T - e[0] && (b.shift(), e.shift());
    };
    this.draw = function (d) {
      d.globalAlpha = 1;
      for (let a in b) {
        let c = b[a],
          f = Math.sqrt((T - e[a]) / 2e3),
          h = 0.8 >= f ? f / 0.8 : 1 - (f - 0.8) / 0.2;
        d.globalAlpha = h;
        d.drawImage(c, -c.width / 2, 40 * -f - 10);
      }
      d.globalAlpha = 1;
    };
    this.addScore = function (d) {
      let a = false,
        c;
      f && 500 > T - f && (a = true);
      c = new Class_StrokeStyle(13, "#FFFFFF");
      c.setFont("px 'proxima-nova-1','proxima-nova-2', Arial Black");
      a ? (d = b[b.length - 1].number + d) : (f = T);
      c.setValue("+" + d);
      c = c.render();
      c.number = d;
      a ? (b.pop(), b.push(c)) : (b.push(c), e.push(+new Date()));
    };
  },
  Class_SFXmanager = function () {
    let b = false,
      e = {},
      f = {
        bigsplash: [0, 1889.795918367347],
        cannonshoot: [3e3, 777.8684807256235],
        crash: [5e3, 991.7913832199545],
        env: [7e3, 4486.984126984126, 1],
        hgrab: [13e3, 208.9115646258506],
        king: [15e3, 1162.01814058957],
        kinglaser: [18e3, 533.9909297052152],
        laser: [2e4, 203.4467120181418],
        laserloop: [22e3, 898.934240362813, 1],
        lasershot: [24e3, 367.6643990929698],
        lockon: [26e3, 46.14512471655274],
        mexpl: [28e3, 1007.8231292517011],
        mlaunch: [31e3, 661.4512471655338],
        phit: [33e3, 206.30385487528002],
        planeloop: [35e3, 1427.7551020408196, 1],
        rail: [38e3, 840.7482993197277],
        shot: [4e4, 101.81405895691853],
        trishot: [42e3, 392.81179138321676],
        warn: [44e3, 2109.365079365077],
        waterloop: [48e3, 629.9092970521514, 1],
        weapgrab: [5e4, 202.06349206349472],
        winggrab: [52e3, 111.97278911564723],
        woosh: [54e3, 486.2585034013591],
      };
    this.sound;
    this.load = function (d) {
      this.sound = new Howl({
        urls: [
          "sounds/out.ogg",
          "sounds/out.m4a",
          "sounds/out.mp3",
          "sounds/out.ac3",
        ],
        sprite: f,
        onload: function () {
          b = true;
          d && d();
        },
      });
    };
    this.playSound = function (d, a, c, g, h) {
      if (b && 0 != num_setting_muteVol && wa) {
        a *= num_max_volume;
        let q = f[d];
        e[d] || (e[d] = 0);
        (0 < g && e[d] >= g) ||
          (this.sound.play(d, function (b) {
            d = objG_sfxManager.sound._nodeById(b);
            d && d.bufferSource && (d.bufferSource.playbackRate.value = c);
            objG_sfxManager.sound.volume(a, b);
            h && h(b);
          }),
          (q = q[1]),
          g != const_Q_0 && e[d]++,
          setTimeout(function () {
            g != const_Q_0 && e[d]--;
          }, q));
      }
    };
    this.stop = function (d) {
      b && d.stop();
    };
    this.setVolume = function (b) {
      this.sound.volume(b);
    };
  },
  Class_UI_KillStatus = function () {
    let b = [],
      f = null,
      d = null,
      a = null,
      c = null,
      g = 0,
      h = 0,
      e = 2e3,
      q = false,
      n = 1,
      k = false,
      m = 0,
      l = 0;
    this.update = function (a) {
      1 == g && ((h += a), h > e && (q = true));
      q
        ? ((g -= 0.2),
          0 > g &&
            ((g = 0),
            b.shift(),
            0 < b.length ? this.processCode(b[0]) : (d = null)),
          (m = -(1 - g)))
        : (1 > g && ((g += 0.2), 1 < g && (g = 1)),
          (m = 1 - (1.5 * g - 0.75) / 0.75));
    };
    this.draw = function (a) {
      d &&
        ((a.globalAlpha = g),
        a.scale(
          (n + 0.2 * m) * num_scale_factor,
          (n + 0.2 * m) * num_scale_factor,
        ),
        a.drawImage(d, -d.width / 2, -d.height + 120),
        a.drawImage(currentText2Render, -currentText2Render.width / 2, 110),
        k
          ? ((c.y = 30), c.draw(a))
          : a.drawImage(c, -c.width / 2 - 5, -c.height - d.height + 120));
    };
    this.replaceCode = function (a) {
      for (let c in b) {
        if (64 >= b[c] && 64 >= a) return b[c] < a ? ((b[c] = a), c) : -2;
        if ((256 == b[c] && 256 == a) || (128 == b[c] && 128 == a) || 4096 == a)
          return c;
      }
      return -1;
    };
    this.push = function (a, c) {
      256 == a && (l = c);
      let d = this.replaceCode(a);
      -1 == d
        ? (b.push(a), 1 == b.length && this.processCode(a))
        : 0 == d && this.processCode(a);
    };
    this.processCode = function (b) {
      q = false;
      g = h = 0;
      let e = "",
        m = "KILL",
        s;
      k = false;
      8 == b
        ? ((e = "DOUBLE"),
          (s = "#cd9a6d"),
          (c = objG_assets.doubleKillCanvas),
          (n = 0.8))
        : 16 == b
          ? ((e = "TRIPLE"),
            (s = "#95b9c9"),
            (c = objG_assets.tripleKillCanvas),
            (n = 0.9),
            (m += "!"))
          : 32 == b
            ? ((e = "QUAD"),
              (s = "#f0a400"),
              (c = objG_assets.quadKillCanvas),
              (n = 1),
              (m += "!!"))
            : 64 == b
              ? ((e = "MULTI"),
                (s = "#de0000"),
                (c = objG_assets.multiKillCanvas),
                (n = 1.1),
                (m += "!!"))
              : 128 == b
                ? ((e = "NEAR"),
                  (s = "#ffe774"),
                  (c = objG_assets.frames.nearmiss),
                  (n = 0.8),
                  (m = "MISS"),
                  (k = true))
                : 4096 == b
                  ? ((e = "REVENGE"),
                    (s = "#dd1824"),
                    (c = objG_assets.frames.revenge),
                    (n = 1),
                    (m = "KILL"),
                    (k = true))
                  : 256 == b &&
                    ((e = l + " KILL STREAK!"),
                    (s = "#a5dd11"),
                    (c = objG_assets.frames.frenzy),
                    (n = 0.8),
                    (m = ""),
                    (k = true));
      "" != e &&
        ((f = new Class_StrokeStyle(40, s, true, "#000000")),
        f.setValue(e),
        f.setStrokeWidth(10),
        (d = f.render()),
        (a = new Class_StrokeStyle(40, s, true, "#000000")),
        a.setValue(m),
        a.setStrokeWidth(10),
        (currentText2Render = a.render()));
    };
    this.clearNearMiss = function () {
      for (let a in b)
        if (128 == b[a]) {
          0 == a ? (h = e) : b.splice(a, 1);
          break;
        }
    };
    this.clear = function () {
      b = [];
      null != d && (q = true);
    };
    this.shouldDraw = function () {
      return g;
    };
  },
  Class_Warship = function () {
    let e = 1,
      f = 20,
      d = 100,
      a = 1,
      b = (this.isShooting = this.isBot = false);
    this.lastUpdate = this.highlightValue = this.state = 0;
    this.id = -1;
    this.dstFloatValue =
      this.dstY =
      this.dstX =
      this.origFloatValue =
      this.origY =
      this.origX =
      this.prevFloatValue =
      this.prevY =
      this.prevX =
      this.floatValue =
      this.y =
      this.x =
        0;
    this.energy = 255;
    this.inGame = true;
    this.updateBool = false;
    this.dstAngle = this.origAngle = this.angle = Math.PI / 2;
    this.name = "";
    this.first_set = true;
    this.type = 0;
    this.warshipContext = this.warshipCanvas = null;
    this.fragment = 1;
    this.recoilTime = this.cannonAngle = 0;
    this.update = function (c) {
      if (this.inGame) {
        func_isInsideBox(this.x, this.y + this.floatValue, 120)
          ? b || (b = true)
          : (b = false);
        let g = func_clamp(
          (T - this.lastUpdate) / num_global_physics_step_ms,
          0,
          1,
        );
        this.prevX = this.x;
        this.prevY = this.y;
        this.prevFloatValue = this.floatValue;
        let h = g * (this.dstY - this.origY) + this.origY,
          q =
            g * (this.dstFloatValue - this.origFloatValue) +
            this.origFloatValue;
        this.x = g * (this.dstX - this.origX) + this.origX;
        this.y = h;
        this.floatValue = q;
        this.angle = g * (this.dstAngle - this.origAngle) + this.origAngle;
        this.cannonAngle =
          g * (this.dstCannonAngle - this.origCannonAngle) +
          this.origCannonAngle;
        0 < this.highlightValue &&
          ((this.highlightValue -= 0.06),
          0 > this.highlightValue && (this.highlightValue = 0));
        this.type == id_entity_warship &&
          1 == this.state &&
          0 < f &&
          ((e -= 0.02),
          0 > e && (e = 0),
          (d -= c),
          0 > d &&
            ((d = 150),
            (f -= 1),
            (g =
              Math.random() * objG_assets.warshipImage.width -
              objG_assets.warshipImage.width / 2),
            (h =
              (Math.random() * objG_assets.warshipImage.height) / 2 -
              objG_assets.warshipImage.height / 4),
            objG_animationManager.addBlast(
              this.x + g,
              this.y + h + q,
              0.5,
              const_Q_0,
              2,
            )));
        2 == this.state
          ? ((a -= 0.01), 0 > a && (a = 0))
          : ((a += 0.01), 1 < a && (a = 1));
        this.recoilTime = 0 < this.recoilTime ? this.recoilTime - c : 0;
      }
    };
    this.loadWarshipCanvas = function () {
      let a = document.createElement("canvas"),
        b = a.getContext("2d"),
        d = objG_assets.warshipImage.height;
      a.width = objG_assets.warshipImage.width;
      a.height = d;
      this.warshipCanvas = a;
      this.warshipContext = b;
    };
    this.draw = function (c) {
      if (this.inGame && b)
        if (this.type == id_entity_warship && objG_assets.warshipLoaded) {
          if (
            (objG_assets.warshipImage &&
              !this.warshipCanvas &&
              this.loadWarshipCanvas(),
            this.warshipCanvas)
          ) {
            c.save();
            c.globalAlpha = a;
            c.translate(this.x, this.y - 4);
            this.warshipContext.clearRect(
              0,
              0,
              this.warshipCanvas.width,
              this.warshipCanvas.height,
            );
            let d = 0.267 * this.warshipCanvas.width,
              e = 0.63 * this.warshipCanvas.height;
            this.warshipContext.save();
            this.warshipContext.translate(0, this.floatValue + 4);
            this.warshipContext.translate(
              this.warshipCanvas.width / 2,
              this.warshipCanvas.height / 2,
            );
            this.warshipContext.rotate(this.angle);
            this.warshipContext.translate(
              -this.warshipCanvas.width / 2,
              -this.warshipCanvas.height / 2,
            );
            this.warshipContext.translate(d, e);
            this.warshipContext.rotate(-this.cannonAngle);
            d = 10 * (1 - this.recoilTime / 200);
            this.warshipContext.translate(
              0.5 * -objG_assets.cannonImage.width,
              -20 - d,
            );
            this.warshipContext.drawImage(objG_assets.cannonImage, 0, 0);
            this.warshipContext.restore();
            this.warshipContext.save();
            this.warshipContext.translate(0, this.floatValue + 4);
            this.warshipContext.translate(
              this.warshipCanvas.width / 2,
              this.warshipCanvas.height / 2,
            );
            this.warshipContext.rotate(this.angle);
            this.warshipContext.translate(
              -this.warshipCanvas.width / 2,
              -this.warshipCanvas.height / 2,
            );
            this.warshipContext.drawImage(objG_assets.warshipImage, 0, 0);
            0 < this.highlightValue &&
              ((this.warshipContext.globalAlpha = 0.8 * this.highlightValue),
              this.warshipContext.drawImage(
                objG_assets.whiteWarshipImage,
                0,
                0,
              ),
              (this.warshipContext.globalAlpha = 1));
            this.warshipContext.restore();
            1 == this.state && (c.globalAlpha = 0.8);
            c.drawImage(
              this.warshipCanvas,
              -objG_assets.warshipImage.width / 2,
              -objG_assets.warshipImage.height / 2,
            );
            c.restore();
          }
        } else
          this.type == id_entity_asteroid &&
            objG_assets.asteroidImage &&
            (c.save(),
            (c.globalAlpha = a),
            c.translate(this.x, this.y),
            c.rotate(-this.angle),
            (d = (3 - this.fragment + 1) / 3),
            c.scale(d, d),
            c.drawImage(
              objG_assets.asteroidImage,
              -objG_assets.asteroidImage.width / 2,
              -objG_assets.asteroidImage.height / 2,
            ),
            0 < this.highlightValue &&
              ((c.globalAlpha = 0.8 * this.highlightValue),
              c.drawImage(
                objG_assets.whiteAsteroidImage,
                -objG_assets.asteroidImage.width / 2,
                -objG_assets.asteroidImage.height / 2,
              ),
              (c.globalAlpha = 1)),
            c.restore());
    };
    this.drawReflection = function (c, d) {
      this.inGame &&
        b &&
        this.type == id_entity_warship &&
        objG_assets.warshipLoaded &&
        (c.save(),
        (c.globalAlpha = 0.15 * a),
        c.translate(this.x, this.y + this.warshipCanvas.height - 4),
        c.scale(1, -1),
        c.drawImage(
          this.warshipCanvas,
          -objG_assets.warshipImage.width / 2,
          -objG_assets.warshipImage.height / 2,
        ),
        c.restore(),
        c.save(),
        c.translate(
          this.x + 85 + this.floatValue + 100 * this.angle,
          this.y + this.warshipCanvas.height / 2 - 4,
        ),
        (c.globalAlpha = e * a),
        c.beginPath(),
        c.moveTo(-3, 1.5),
        c.lineTo(0, -1.5),
        c.lineTo(-300, 0),
        (c.fillStyle = "rgba(255,255,255,1.0)"),
        c.fill(),
        c.restore(),
        (c.globalAlpha = 1));
    };
    this.drawInput = function (a) {};
    this.drawInfo = function (a) {
      if (
        this.inGame &&
        b &&
        this.state == const_Ic_0 &&
        65535 != this.energy
      ) {
        a.save();
        a.translate(this.x, this.y);
        a.fillStyle = "rgba(126,219,226,1)";
        a.shadowOffsetX = 0;
        a.shadowOffsetY = 0;
        a.shadowBlur = 0;
        a.shadowColor = "rgba(255, 255, 255, 0.7)";
        a.lineWidth = 1;
        let d = 28,
          e;
        this.type == id_entity_asteroid
          ? ((e = 50 / this.fragment), (d *= 3 / this.fragment))
          : ((e = 55), (d *= 5));
        let f = 512;
        32767.5 > this.energy && 16383.75 < this.energy
          ? (f = 30)
          : 16383.75 > this.energy && (f = 0);
        a.fillStyle = "hsl(" + f + ", 100%, 50%)";
        a.fillRect(-d / 2 + 0, e + 0, (this.energy / 65535) * d, 8);
        a.strokeStyle = "rgba(255,255,255,1.0)";
        a.strokeRect(-d / 2, e, d, 8);
        a.restore();
      }
    };
    this.hit = function (a) {
      func_isTimeElapsed_50ms() &&
        ((this.highlightValue =
          a == id_weapon_missile || this.type == id_entity_asteroid
            ? this.highlightValue + 1
            : this.highlightValue + 0.3),
        1 < this.highlightValue && (this.highlightValue = 1));
    };
    this.setPose = function (a, b, d) {
      this.origX = this.x;
      this.origY = this.y;
      this.origAngle = this.dstAngle;
      this.dstX = 10 * a;
      this.dstY = 10 * b;
      this.dstAngle = d;
      this.first_set
        ? ((this.origX = this.dstX),
          (this.origY = this.dstY),
          (this.x = this.dstX),
          (this.y = this.dstY),
          (this.origAngle = this.dstAngle),
          (this.first_set = false))
        : ((a = this.dstX - this.origX),
          (b = this.dstY - this.origY),
          (this.speed = Math.sqrt(a * a + b * b) / 3));
      this.inGame || (this.inGame = true);
    };
    this.setFloatValue = function (a) {
      this.origFloatValue = this.floatValue;
      this.dstFloatValue = 10 * a;
      this.first_set && (this.floatValue = this.dstFloatValue);
    };
    this.setType = function (a) {
      this.type = a;
    };
    this.setState = function (a) {
      this.state = a;
    };
    this.setEnergy = function (a) {
      this.energy = a;
    };
    this.setFragment = function (b) {
      this.fragment = b;
      3 != b && 1 == b && (a = 0);
    };
    this.setCannonAngle = function (a) {
      this.origCannonAngle = this.cannonAngle;
      this.dstCannonAngle = a;
      this.first_set && (this.cannonAngle = this.dstCannonAngle);
    };
    this.cannonShoot = function () {
      this.recoilTime = 200;
    };
    this.getSpeedDirectionX = function () {
      return this.x - this.prevX;
    };
    this.getSpeedDirectionY = function () {
      return this.y - this.prevY;
    };
    this.cleanup = function () {
      this.first_set = true;
      this.inGame = false;
    };
  };
window.onload = function () {
  Modernizr.canvas &&
    Modernizr.websockets &&
    (null == objG_followMode &&
      (window.devicePixelRatio &&
        (int_pixel_ratio = 1 < window.devicePixelRatio ? 2 : 1),
      (objG_eventManager = new EventManager()),
      (objG_followMode = new ClassR_FollowMode(
        document.getElementById("canvas"),
      )),
      window.addEventListener("resize", objG_followMode.resize, false),
      (objG_inputManager = new Class_InputManager()),
      objG_inputManager.addListeners(),
      window.requestAnimationFrame
        ? window.requestAnimationFrame(Rb)
        : setInterval(Rb, 1e3 / 60),
      $("#overlay").show()),
    objG_followMode.resize(),
    func_setGraphicsQuality());
};
