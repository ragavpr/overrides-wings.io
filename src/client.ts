import ads from "./lib/ads";
import tracking from "./lib/tracking";
import { EventManager } from "./lib/EventManager";
import { ParticleDust } from "./lib/ParticleDust";
type GameSheetMapping = [
  id: string,
  x: number,
  y: number,
  width: number,
  height: number,
  u1: number,
  u2: number,
];
const canvas = $("#canvas")[0] as HTMLCanvasElement;
let Zb,
  $b,
  bool_isHttps = "https:" == window.location.protocol,
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
  time_since_boost_pickup = 0,
  ma = 0,
  objG_inputManager: InputManager,
  qc = 0,
  rc = 0,
  H: { x: number; y: number },
  ca = { x: 0, y: 0 },
  canvas_width: number,
  canvas_height: number,
  cloud_sprange_start_Y = 1,
  Z = false,
  wa = true,
  Lb = false,
  frametime_millis = 0,
  last_frametime_millis = 0,
  room_height = 1600,
  cloud_sprange_end_Y = room_height / 2 - 100,
  Gborder_X = 5e3,
  ka = 1,
  bool_following_plane = true,
  numG_player_count = 0,
  cloud_pos_time = 0,
  bool_hideCustomization = false,
  int_pixel_ratio = 1,
  intG_color_id = 0,
  intG_decal_id = 0,
  qa = 0,
  sc = 0,
  bool_continueGame = false,
  time_game_over: number,
  last_game_score = 0,
  num_max_volume = 1,
  num_setting_muteVol = window.localStorage.muteVol,
  spawn_cooldown_time = 3,
  boost_time = 750,
  score_boost_pickup = 5,
  score_weapon_pickup = 10,
  diff_kills = 20,
  diff_score = 150,
  num_scale_factor = 1,
  kb = 0,
  zc = 0,
  Ac = 0.3,
  La = false,
  str_name_superweapon_holder: string | undefined,
  bool_setting_highQuality = true,
  lb = false,
  mb: number,
  ia: number | undefined,
  na: number | undefined,
  nb: number | undefined,
  xa = false,
  bool_drawClouds = true,
  bool_drawWater = true,
  bool_drawExplosions = true,
  bool_drawSun = true,
  bool_drawItems = true,
  bool_drawTrails = true,
  bool_drawSplashes = true,
  bool_drawGradient = true,
  bool_drawUI = true,
  objG_followMode: FollowMode_R,
  objG_animationManager: AnimationManager,
  objG_assets: Assets,
  objG_wsConnection: WS_Connection,
  objD_pickups: Record<number | string, PickupItem> = {},
  objD_planes: Record<number, Plane> = {},
  objD_specialEntities: Record<number, SpecialEntity> = {},
  objD_missiles: Record<number, Missile> = {},
  listG_plane_ids: number[] = [],
  objG_player_plane: Plane | undefined,
  current_following_plane_id: number,
  objG_player_plane_temp: Plane | undefined,
  Oa = 0,
  objGUI_anchor: UI_Anchor,
  objGUI_gameInfo: UI_GameInfo,
  obj_particleImpacts: ParticleImpacts,
  objG_backgrounds: Backgrounds,
  objG_sfxManager: SFXmanager,
  plane_last_killed_by: Record<number, number> = {},
  ub = 0,
  objG_eventManager: EventManager,
  list_particleDust: ParticleDust[],
  obj_browserQueryParams: Record<string, string> = {},
  eb = false,
  str_conutryCode: string | null = null,
  str_browser_user_agent = window.navigator.userAgent,
  bool_internet_explorer =
    -1 < str_browser_user_agent.indexOf("MSIE ") ||
    -1 < str_browser_user_agent.indexOf("Trident/"),
  timeout_ws_conn: Timer | undefined,
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
  myName: string,
  gameSheetInfo: GameSheetMapping[] = [
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
const func_detect_country = () => {
  let temp_http_s = "";
  bool_isHttps && (temp_http_s = "s");
  $.get(
    "http" + temp_http_s + "://ip2l.wings.io/cc",
    (b) => {
      str_conutryCode = b.substring(0, 2);
      window.localStorage.wingsCC = str_conutryCode;
      window.localStorage.wingsCCTime = +new Date();
    },
    "text",
  );
};
const requestAnimationFrameCallback = () => {
  frametime_millis = +new Date();
  let deltatime = 0;
  if (0 < last_frametime_millis) {
    deltatime = frametime_millis - last_frametime_millis;
  }
  last_frametime_millis = frametime_millis;
  objG_followMode.update(deltatime);
  objG_followMode.draw(deltatime);
  if (window.requestAnimationFrame)
    window.requestAnimationFrame(requestAnimationFrameCallback);
  Lb && (Lb = false);
};
function func_displaySelectedColor(int_color_id: number) {
  intG_color_id = int_color_id;
  for (let i = 0; 5 >= i; i++) {
    let plane_frame = objG_assets.planes[i][int_color_id][7];
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d")!;
    let plane_body = objG_assets.frames.plane8;
    canvas.width = plane_body.width;
    canvas.height = plane_body.height;
    if (!ctx) throw new Error("WARN: Canvas is empty");
    ctx.translate(plane_body.width / 2, plane_body.height / 2);
    plane_body.draw(ctx);
    plane_frame.draw(ctx);
    let image_str = canvas.toDataURL("image/png");
    let css_style!: CSSStyleSheet;
    let styles_len = document.styleSheets.length;
    for (let j = 0; j < styles_len; j++) {
      let h: CSSStyleSheet = document.styleSheets[j];
      if (null == h.href) {
        css_style = h;
        break;
      }
    }
    css_style.addRule
      ? css_style.addRule(
          ".btn-decal" + (i + 1) + ":before",
          "background-image: url(" + image_str + ")",
        )
      : css_style.insertRule(
          ".btn-decal" +
            (i + 1) +
            ":before{background-image: url(" +
            image_str +
            ")}",
          css_style.cssRules.length,
        );
  }
  for (let i = 0; 5 >= i; i++) $("#check" + i).hide();
  $("#check" + int_color_id).show();
}
function func_displaySelectedDecal(int_decal_id: number) {
  intG_decal_id = int_decal_id;
  for (let i = 0; 5 >= i; i++) $("#checkD" + i).hide();
  $("#checkD" + int_decal_id).show();
}
function funcR_showBeta() {
  bool_continueGame = false;
  $("#beta").show();
  func_displayNicknameInput();
}
function func_isNotChrome() {
  let is_UA_Chrome = -1 < navigator.userAgent.indexOf("Chrome");
  let is_UA_Safari = -1 < navigator.userAgent.indexOf("Safari");
  return !(is_UA_Safari && is_UA_Chrome);
}
function func_setGraphicsQuality() {
  let str_quality = "Low";
  let element_quality = $("#graphicsID")[0];
  bool_setting_highQuality && (str_quality = "High");
  element_quality &&
    (element_quality.childNodes[0].textContent = "Graphics: " + str_quality);
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
  setTimeout(() => {
    $("#copycheckimage").fadeIn(300);
  }, 200);
  setTimeout(() => {
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
  ($("#soundImg")[0] as HTMLImageElement).src = b;
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
    let seconds_since_gameover = Math.floor(
      (frametime_millis - time_game_over) / 1e3,
    );
    0 > seconds_since_gameover && (seconds_since_gameover = 0);
    let continue_countdown = 10 - seconds_since_gameover;
    if (0 > continue_countdown) {
      (bool_continueGame = false), func_displayNicknameInput();
    } else {
      let element_countdown = $("#countdownText")[0];
      let text_countdown = document.createTextNode(
        continue_countdown.toString(),
      );
      element_countdown.replaceChild(
        text_countdown,
        element_countdown.firstChild!,
      ),
        setTimeout(func_displayContinueCountdown, 500);
    }
  }
}
function func_displayGameover() {
  ads.func_showAds();
  0 < last_game_score &&
    ($("#continueTop").show(),
    $("#continueBR").show(),
    $("#continue").show(),
    $("#nickInput").hide(),
    $("#skinPanel").hide(),
    $("#howto").hide(),
    (bool_continueGame = true),
    (time_game_over = +new Date()),
    func_displayContinueCountdown());
  $("#overlay").fadeIn(500);
  num_max_volume = 0.05 * num_setting_muteVol;
  objGUI_gameInfo.clearBonusDisplay();
}
function func_displayGameoverScore(int_score: number) {
  bool_following_plane = true;
  Z || ((ka = 1), (objG_player_plane = undefined));
  funcR_hc_showPf();
  if (0 <= int_score) {
    bool_continueGame = true;
    $("#beta").hide();
    let e = $("#curScore")[0],
      f;
    f = objG_eventManager.isInstagib()
      ? document.createTextNode("Kills: " + int_score)
      : document.createTextNode("Current Score: " + int_score);
    e.replaceChild(f, e.firstChild!);
  }
  last_game_score = int_score;
  setTimeout(func_displayGameover, 1e3);
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
  time_game_over = +new Date();
}
function func_setPlayerCount() {
  numG_player_count = Object.keys(objD_planes).length;
  document.title = "Wings!";
}
function func_isIframe() {
  try {
    return window.self !== window.top;
  } catch (err) {
    return true;
  }
}
function func_padZerosPrefix(num_val: number) {
  let padding = "";
  10 > num_val && (padding = "0");
  return padding + Math.floor(num_val);
}
function func_millisToTimeFormat(total_millis: number) {
  let total_seconds = Math.floor(total_millis / 1e3);
  let minutes = Math.floor(total_seconds / 60);
  let seconds = total_seconds - 60 * minutes;
  let hours = Math.floor(minutes / 60);
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
  return 50 > +new Date() - frametime_millis;
}
function func_isInsideBox(x: number, y: number, dist: number) {
  let d = objGUI_anchor.getBounds();
  return (
    x + dist >= d[0].x &&
    x - dist <= d[1].x &&
    y + dist >= d[0].y &&
    y - dist <= d[1].y
  );
}
function func_clamp(val: number, l: number, u: number) {
  return val < l ? l : val > u ? u : val;
}
function func_renameBlankPlayerNames(str_name: string) {
  "" == str_name && (str_name = "<Unnamed>");
  return str_name;
}
function func_drawRoundedRectangle(
  canvas: CanvasRenderingContext2D,
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
  canvas: CanvasRenderingContext2D,
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
  return {
    x: x * Math.cos(angle) - y * Math.sin(angle),
    y: y * Math.cos(angle) + x * Math.sin(angle),
  };
}

function W_switchSkins() {
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
}
function W_setSkinColor(id_color: number) {
  func_displaySelectedColor(id_color);
}
function W_setDecal(id_decal: number) {
  func_displaySelectedDecal(id_decal);
}
function W_clickPlay(name: string) {
  Z
    ? func_hideOverlay()
    : ((window.localStorage.nick = name),
      (document.getElementsByTagName("canvas")[0].style.cursor =
        "url(images/crosshair.png) 16 16, auto"),
      kb++,
      (objG_inputManager.mouseMoved = false),
      objG_wsConnection.sendNick(name, bool_continueGame),
      bool_continueGame &&
        (func_displayNicknameInput(), (bool_continueGame = false)),
      objG_eventManager.isSpaceWars()
        ? objGUI_gameInfo.showTip(
            "Hint: Earn points faster by destroying asteroids.",
          )
        : document.fullscreenElement ||
          (2 != kb && 4 != kb && 6 != kb) ||
          objGUI_gameInfo.showTip("Press 'F' to toggle Fullscreen"));
}
function W_setSpectate() {
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
}
function W_setContinue() {
  $("#topGui").show();
  $("#roomFailed").hide();
  func_isIframe() || (parent.location.hash = "");
  objG_wsConnection.getServerAndConnect();
}
function W_toggleGraphics() {
  bool_setting_highQuality = !bool_setting_highQuality;
  objG_followMode.resize();
  window.localStorage.lq = !bool_setting_highQuality;
  func_setGraphicsQuality();
}
function W_copyRoomLink() {
  $("#copyLink").hide();
  $("#copyLinkBox").show();
  let b = $("#roomlinkInput")[0] as HTMLInputElement;
  b.value = "http://classic.wings.io/#" + objG_wsConnection.roomID;
  eb = true;
  func_isNotChrome() &&
    (($("#copyButton")[0].childNodes[0].textContent = "Close"),
    $("#safariTooltip").show());
  setTimeout(() => {
    b.setSelectionRange(0, b.value.length);
    b.select();
    b.focus();
  }, 100);
}
function W_setCopy() {
  let b = $("#roomlinkInput")[0] as HTMLInputElement;
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
}
function W_clickNoNames(checkbox: HTMLInputElement) {
  lb = !lb;
  checkbox.checked = lb;
}
function W_toggleMute() {
  func_displayMuteAudio();
}

function W_onblur() {
  // window.didSendLoadingTime = true;
  timeout_ws_conn = setTimeout(func_wsConnDisconnect, 3e5);
  wa = false;
  num_max_volume = 0;
  objG_sfxManager &&
    (objG_sfxManager.sound.volume(0),
    objG_sfxManager.sound.volume(0, mb),
    objG_sfxManager.sound.volume(0, ia),
    objG_sfxManager.sound.volume(0, na),
    nb && objG_sfxManager.sound.volume(0, nb));
}
function W_onfocus() {
  if (timeout_ws_conn) {
    clearTimeout(timeout_ws_conn);
    timeout_ws_conn = undefined;
  }
  Lb = wa = true;
  num_max_volume = 1 * num_setting_muteVol;
  for (let b in objD_planes) objD_planes[b].clearTrail();
}
function W_connectToServer(host: string) {
  objG_wsConnection.roomNumber = 0;
  objG_wsConnection.remoteHost = host;
  objG_wsConnection.connect();
  console.log("CONNECTING NOW to " + host);
}
function W_disconnect() {
  objG_wsConnection.disconnect();
  console.log("Disconnected.");
}
function W_enterGame(name: string) {
  W_clickPlay(name);
  W_onfocus();
}
function W_setInput(angle: number, hover: number, isShooting: boolean) {
  objG_inputManager.angle = angle;
  objG_inputManager.hover = hover;
  !Sb && isShooting
    ? objG_wsConnection.sendShooting(isShooting)
    : Sb && !isShooting && objG_wsConnection.sendShooting(isShooting);
  Sb = isShooting;
}
function W_wasKilled(b: any) {
  objG_inputManager.angle = Math.PI;
  objG_inputManager.hover = 1;
}
function W_connectionClosed() {
  console.log("Connection was closed");
  objG_inputManager.angle = Math.PI;
  objG_inputManager.hover = 1;
}

let x = {
  W_wasKilled,
  W_toggleMute,
  W_toggleGraphics,
  W_switchSkins,
  W_setSpectate,
  W_setSkinColor,
  W_setInput,
  W_setDecal,
  W_setCopy,
  W_setContinue,
  W_onfocus,
  W_onblur,
  W_enterGame,
  W_disconnect,
  W_copyRoomLink,
  W_connectionClosed,
  W_connectToServer,
  W_clickPlay,
  W_clickNoNames,
  default: undefined,
};
x.default; //To not tree-shake

class StyleStroke {
  _value = "";
  _color = "#000000";
  _stroke = false;
  _strokeColor = "#000000";
  _strokeWidth = 3;
  _size = 16;
  _canvas?: HTMLCanvasElement;
  _ctx?: CanvasRenderingContext2D;
  _dirty = false;
  _scale = 1;
  _font = "px 'proxima-nova-1','proxima-nova-2', " + str_font_name;
  _usingRoundedFrame = false;
  _hmargin = 3;
  _vmargin = -1;
  _frameOpacity = 0.2;
  constructor(
    size?: number,
    color?: string,
    is_stroke_enabled = false,
    stroke_color?: string,
  ) {
    size && (this._size = size);
    color && (this._color = color);
    this._stroke = is_stroke_enabled;
    stroke_color && (this._strokeColor = stroke_color);
  }
  setFont(b: string) {
    this._font != b && ((this._font = b), (this._dirty = true));
  }
  setSize(b: number) {
    this._size != b && ((this._size = b), (this._dirty = true));
  }
  setScale(scale: number) {
    this._scale != scale && ((this._scale = scale), (this._dirty = true));
  }
  setColor(color: string) {
    this._color != color && ((this._color = color), (this._dirty = true));
  }
  setStroke(stroke: boolean) {
    this._stroke != stroke && ((this._stroke = stroke), (this._dirty = true));
  }
  setStrokeWidth(stroke_width: number) {
    this._strokeWidth != stroke_width &&
      ((this._strokeWidth = stroke_width), (this._dirty = true));
  }
  setStrokeColor(stroke_color: string) {
    this._strokeColor != stroke_color &&
      ((this._strokeColor = stroke_color), (this._dirty = true));
  }
  setValue(value: string) {
    value != this._value && ((this._value = value), (this._dirty = true));
  }
  setHMargin(h_margin: number) {
    h_margin != this._hmargin &&
      ((this._hmargin = h_margin), (this._dirty = true));
  }
  setVMargin(v_margin: number) {
    v_margin != this._vmargin &&
      ((this._vmargin = v_margin), (this._dirty = true));
  }
  setUsingRoundedFrame(using_rounded_frame: boolean) {
    using_rounded_frame != this._usingRoundedFrame &&
      ((this._usingRoundedFrame = using_rounded_frame), (this._dirty = true));
  }
  setRoundedFrameOpacity(rounded_frame_opacity: number) {
    rounded_frame_opacity != this._frameOpacity &&
      ((this._frameOpacity = rounded_frame_opacity), (this._dirty = true));
  }
  render() {
    if (!this._canvas) {
      this._canvas = document.createElement("canvas");
      this._ctx = this._canvas.getContext("2d")!;
    }
    if (this._dirty) {
      this._dirty = false;
      let _canvas = this._canvas,
        _ctx = this._ctx!,
        _value = this._value,
        _scale = this._scale,
        _size = this._size,
        bold_font = "Bold " + _size + this._font;
      _ctx.font = bold_font;
      let text_width = _ctx.measureText(_value).width,
        _hmargin = this._hmargin,
        _vmargin = 2;
      -1 < this._vmargin && (_vmargin = this._vmargin);
      let n = 0;
      this._stroke && (n = this._strokeWidth);
      _canvas.width = (text_width + 2 * _hmargin + n) * _scale;
      _canvas.height = (_size + 2 * _vmargin + n) * _scale;
      _ctx.font = bold_font;
      _ctx.scale(_scale, _scale);
      _ctx.globalAlpha = 1;
      _ctx.lineJoin = "round";
      _ctx.lineWidth = this._strokeWidth;
      _ctx.strokeStyle = this._strokeColor;
      this._usingRoundedFrame &&
        ((_ctx.fillStyle = "#000000"),
        (_ctx.globalAlpha = this._frameOpacity),
        func_drawRoundedRectangle(
          _ctx,
          0,
          0,
          _canvas.width,
          _canvas.height,
          10,
        ),
        (_ctx.globalAlpha = 1));
      _ctx.fillStyle = this._color;
      this._stroke &&
        _ctx.strokeText(_value, _hmargin + 2, _size + _vmargin / 2);
      _ctx.fillText(_value, _hmargin + 2, _size + _vmargin / 2);
    }
    return this._canvas;
  }
}
class StyleText {
  _value = "";
  _color = "#000000";
  _secondColor = "#FFFFFF";
  _size = 16;
  _canvas?: HTMLCanvasElement;
  _ctx?: CanvasRenderingContext2D;
  _dirty = false;
  _scale = 1;
  _font = "px 'proxima-nova-1','proxima-nova-2', " + str_font_name;
  _extrude = 3;
  _usingFrame = false;
  _usingRoundedFrame = false;
  _angX = 0;
  _angY = 0;
  _d = 5;
  _addTop = 0;
  constructor(size?: number, color?: string, second_color?: string) {
    size && (this._size = size);
    color && (this._color = color);
    second_color && (this._secondColor = second_color);
  }
  setAddTop(add_top: number) {
    add_top != this._addTop && ((this._addTop = add_top), (this._dirty = true));
  }
  setFont(font: string) {
    this._font != font && ((this._font = font), (this._dirty = true));
  }
  setSize(size: number) {
    this._size != size && ((this._size = size), (this._dirty = true));
  }
  setScale(scale: number) {
    this._scale != scale && ((this._scale = scale), (this._dirty = true));
  }
  setColor(color: string) {
    this._color != color && ((this._color = color), (this._dirty = true));
  }
  setSecondColor(second_color: string) {
    this._secondColor != second_color &&
      ((this._secondColor = second_color), (this._dirty = true));
  }
  setValue(value: string) {
    value != this._value && ((this._value = value), (this._dirty = true));
  }
  setUsingRoundedFrame(using_rounded_frame: boolean) {
    using_rounded_frame != this._usingRoundedFrame &&
      ((this._usingRoundedFrame = using_rounded_frame), (this._dirty = true));
  }
  setUsingFrame(using_frame: boolean) {
    using_frame != this._usingFrame &&
      ((this._usingFrame = using_frame), (this._dirty = true));
  }
  calcAngVector(angle: number) {
    this._angX = Math.sin(angle) * this._d;
    this._angY = Math.cos(angle) * this._d;
  }
  render() {
    if (!this._canvas) {
      this._canvas = document.createElement("canvas");
      this._ctx = this._canvas.getContext("2d")!;
    }
    if (this._dirty) {
      this._dirty = false;
      let _canvas = this._canvas,
        _ctx = this._ctx!,
        _value = this._value,
        _scale = this._scale,
        _size = this._size,
        bold_text = "Bold " + _size + this._font;
      _ctx.font = bold_text;
      let text_width = _ctx.measureText(_value).width,
        _vmargin = Math.floor(0.2 * _size);
      _canvas.width = (text_width + 6 + 10 + 2 * this._d) * _scale;
      _canvas.height =
        (_size + _vmargin + this._extrude + 2 * this._d + this._addTop) *
        _scale;
      _ctx.font = bold_text;
      _ctx.scale(_scale, _scale);
      this._usingFrame &&
        ((_ctx.globalAlpha = 1),
        (_ctx.fillStyle = "#000000"),
        _ctx.moveTo(this._angX, this._angY + 15 * num_scale_factor),
        _ctx.lineTo(
          _canvas.width + this._angX - 4 * num_scale_factor,
          this._angY + 7 * num_scale_factor,
        ),
        _ctx.lineTo(
          _canvas.width + this._angX - 15 * num_scale_factor,
          _canvas.height + this._angY - 9 * num_scale_factor,
        ),
        _ctx.lineTo(
          this._angX + 5 * num_scale_factor,
          _canvas.height + this._angY - 17 * num_scale_factor,
        ),
        _ctx.fill());
      this._usingRoundedFrame &&
        ((_ctx.globalAlpha = 0.3),
        func_drawRoundedRectangle(
          _ctx,
          0,
          0,
          _canvas.width,
          _canvas.height,
          40,
        ),
        (_ctx.globalAlpha = 1));
      for (let _extrude = this._extrude; 0 <= _extrude; _extrude--)
        (_scale = _extrude),
          (_ctx.fillStyle = 0 == _extrude ? this._color : this._secondColor),
          _ctx.fillText(
            _value,
            8 + this._d,
            _size - _vmargin / 2 + _scale + this._d + this._addTop,
          );
    }
    return this._canvas;
  }
}
class Assets {
  loaded = false; // L1 load
  onLoad!: () => void;
  spriteSheetLoaded = false;
  gameSheet!: HTMLImageElement;
  frames: Record<string, FrameImage> = {};
  whitePlaneImages: Record<string, HTMLCanvasElement> = {};
  planeFrames!: FrameImage[]; // L3 load
  planeFramesReflex!: FrameImage[]; // L3 load
  planes: FrameImage[][][] = []; //pre-rendered for all decals, colors and rotations
  doubleKillCanvas!: HTMLCanvasElement; // L2 load
  tripleKillCanvas!: HTMLCanvasElement; // L2 load
  quadKillCanvas!: HTMLCanvasElement; // L2 load
  multiKillCanvas!: HTMLCanvasElement; // L2 load
  warshipImage!: HTMLImageElement; // depends-on warshipLoaded
  whiteWarshipImage!: HTMLCanvasElement; // depends-on warshipLoaded
  cannonImage!: HTMLImageElement; // depends-on warshipLoaded
  warshipIcon!: HTMLImageElement; // depends-on warshipLoaded
  warshipLoaded = false;
  warshipTextureLoadCount = 0;
  asteroidLoaded = false;
  asteroidImage!: HTMLImageElement; // depends-on asteroidLoaded
  whiteAsteroidImage!: HTMLCanvasElement; // depends-on asteroidLoaded
  blinkImage!: HTMLImageElement; // depends-on asteroidLoaded
  loadGameSpritesheet() {
    this.gameSheet = new Image();
    this.gameSheet.src = "images/sheet.png";
    this.gameSheet.onload = () => {
      objG_assets.loadGameSpritesheetFrames();
      objG_assets.spriteSheetLoaded = true;
      objG_assets.loadAnimations();
      objG_assets.generateHudIcons();
      objG_assets.loaded = true;
      objG_assets.onLoad();
    };
  }
  loadGameSpritesheetFrames() {
    for (let b = gameSheetInfo.length, e = 0; e < b; e++) {
      let gamesheet_mapping = gameSheetInfo[e],
        obj_frameImage = new FrameImage();
      obj_frameImage.setFrameInfo(gamesheet_mapping, this.gameSheet);
      this.frames[gamesheet_mapping[0]] = obj_frameImage;
    }
    for (let e = 1, b; 8 >= e; e++)
      (b = this.frames["plane" + e].renderTintedFrame("#FFFFFF").canvas),
        (this.whitePlaneImages["plane" + e] = b);
    for (let e = 0; 5 >= e; e++) this.planes[e] = [];
    this.loadPlaneImages();
    for (let e = 0; 5 >= e; e++) {
      this.loadPlaneDecal(0, e);
      this.loadPlaneDecal(1, e);
      this.loadPlaneDecal(2, e);
      this.loadPlaneDecal(3, e);
      this.loadPlaneDecal(4, e);
      this.loadPlaneDecal(5, e);
    }
  }
  loadPlaneImages() {
    let f = [],
      d = [];
    for (let a = 1; 8 >= a; a++) {
      let c = this.frames["plane" + a];
      f.push(c);
      d.push(c.renderTintedFrame("rgba(0,100,255,1.0)"));
    }
    this.planeFrames = f;
    this.planeFramesReflex = d;
  }
  loadPlaneDecal(b: number, e: number) {
    let d: FrameImage[] = [];
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
  }
  loadAnimations() {
    let obj_animation = new Animation(),
      obj_animation2 = new Animation();
    for (let f = 0; 13 > f; f++)
      obj_animation.addFrame(this.frames["s" + f]),
        obj_animation2.addFrame(
          this.frames["s" + f].renderTintedFrame("#2b9bf5"),
        );
    obj_animation.setInterval(1e3 / 30);
    objG_animationManager.addAnimationInfo("splash", obj_animation);
    obj_animation2.setInterval(1e3 / 30);
    objG_animationManager.addAnimationInfo("splashReflex", obj_animation2);
    obj_animation = new Animation();
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
  }
  generateTintedKillIcon(r: number, g: number, b: number, color: string) {
    let img_iconkill = objG_assets.frames.iconkill;
    let frameIconR = objG_assets.frames.killR;
    let img_rgbk = img_iconkill.generateRGBKs();
    let img_iconkill_tinted = img_iconkill.generateTintImage(img_rgbk, r, g, b);
    let canvas = document.createElement("canvas");
    canvas.width = img_iconkill_tinted.width;
    canvas.height = img_iconkill_tinted.height;
    let ctx = canvas.getContext("2d")!;
    ctx.drawImage(img_iconkill_tinted.canvas, 0, 0);
    let img_killR_tinted = frameIconR.renderTintedFrame(color);
    img_killR_tinted.x = img_iconkill.width / 2;
    img_killR_tinted.y = img_iconkill.height / 2;
    img_killR_tinted.draw(ctx);
    return canvas;
  }
  generateHudIcons() {
    let scale,
      center_offset,
      shift2Y = 20,
      shift2X = 160;

    let canvas2 = document.createElement("canvas");
    let canvas21 = this.generateTintedKillIcon(205, 154, 109, "#FFFFFF");
    let canvas22 = this.generateTintedKillIcon(172, 121, 76, "#BBBBBB");
    let ctx2 = canvas2.getContext("2d")!;
    let ctx21 = canvas21.getContext("2d")!;
    let ctx22 = canvas22.getContext("2d")!;
    canvas2.width = canvas21.width;
    canvas2.height = canvas21.height + 30;
    ctx2.drawImage(ctx22.canvas, 0, 0);
    ctx2.drawImage(ctx21.canvas, 0, 30);
    this.doubleKillCanvas = canvas2;

    let canvas3 = document.createElement("canvas");
    let canvas31 = this.generateTintedKillIcon(167, 176, 185, "#FFFFFF");
    let canvas32 = this.generateTintedKillIcon(129, 138, 148, "#BBBBBB");
    let ctx3 = canvas3.getContext("2d")!;
    let ctx31 = canvas31.getContext("2d")!;
    let ctx32 = canvas32.getContext("2d")!;
    canvas3.width = canvas31.width + 70;
    canvas3.height = canvas31.height + 10;
    scale = 0.9;
    center_offset = canvas3.width / 2 - (canvas31.width / 2) * scale;
    ctx3.save();
    ctx3.translate(center_offset, 0);
    ctx3.scale(scale, scale);
    ctx3.drawImage(ctx32.canvas, -30, 0);
    ctx3.drawImage(ctx32.canvas, 30, 0);
    ctx3.restore();
    center_offset = canvas3.width / 2 - canvas31.width / 2;
    ctx3.drawImage(ctx31.canvas, center_offset, 10);
    this.tripleKillCanvas = canvas3;

    let canvas4 = document.createElement("canvas");
    let canvas41 = this.generateTintedKillIcon(240, 164, 0, "#FFFFFF");
    let canvas42 = this.generateTintedKillIcon(200, 124, 0, "#ddaf63");
    let canvas43 = this.generateTintedKillIcon(158, 98, 0, "#b25c5c");
    let ctx4 = canvas4.getContext("2d")!;
    let ctx41 = canvas41.getContext("2d")!;
    let ctx42 = canvas42.getContext("2d")!;
    let ctx43 = canvas43.getContext("2d")!;
    canvas4.width = canvas41.width + shift2X;
    canvas4.height = canvas41.height + 1.5 * shift2Y;
    scale = 0.95;
    center_offset = canvas4.width / 2 - (canvas41.width / 2) * scale;
    ctx4.save();
    ctx4.translate(center_offset, 0);
    ctx4.scale(scale, scale);
    ctx4.drawImage(ctx43.canvas, 0, 0);
    ctx4.restore();
    center_offset = canvas4.width / 2 - (canvas41.width / 2) * scale;
    ctx4.save();
    ctx4.translate(center_offset, 0);
    ctx4.scale(scale, scale);
    ctx4.drawImage(ctx42.canvas, -35, 15);
    ctx4.drawImage(ctx42.canvas, 35, 15);
    ctx4.restore();
    center_offset = canvas4.width / 2 - canvas41.width / 2;
    ctx4.drawImage(ctx41.canvas, center_offset, 1.5 * shift2Y);
    this.quadKillCanvas = canvas4;

    let canvas5 = document.createElement("canvas");
    let canvas51 = this.generateTintedKillIcon(222, 0, 0, "#FFFFFF");
    let canvas52 = this.generateTintedKillIcon(172, 0, 0, "#d68080");
    let canvas53 = this.generateTintedKillIcon(133, 0, 0, "#b25c5c");
    let ctx5 = canvas5.getContext("2d")!;
    let ctx51 = canvas51.getContext("2d")!;
    let ctx52 = canvas52.getContext("2d")!;
    let ctx53 = canvas53.getContext("2d")!;
    canvas5.width = canvas51.width + shift2X;
    canvas5.height = canvas51.height + 1.5 * shift2Y;
    center_offset = canvas5.width / 2 - (canvas51.width / 2) * 0.65;
    ctx5.save();
    ctx5.translate(center_offset, 0);
    ctx5.scale(0.65, 0.65);
    ctx5.drawImage(ctx53.canvas, -105, 10);
    ctx5.drawImage(ctx53.canvas, 105, 10);
    ctx5.drawImage(ctx53.canvas, -40, 10);
    ctx5.drawImage(ctx53.canvas, 40, 10);
    ctx5.drawImage(ctx53.canvas, 0, shift2Y);
    ctx5.restore();
    center_offset = canvas5.width / 2 - (canvas51.width / 2) * scale;
    ctx5.save();
    ctx5.translate(center_offset, 0);
    ctx5.scale(scale, scale);
    ctx5.drawImage(ctx52.canvas, -35, shift2Y);
    ctx5.drawImage(ctx52.canvas, 35, shift2Y);
    ctx5.restore();
    center_offset = canvas5.width / 2 - canvas51.width / 2;
    ctx5.drawImage(ctx51.canvas, center_offset, 1.5 * shift2Y);
    this.multiKillCanvas = canvas5;
  }
  load(callback: () => void) {
    this.onLoad = callback;
    this.loadGameSpritesheet();
  }
  loadTintImage(
    b: HTMLImageElement,
    e: (b: HTMLCanvasElement) => void,
    f: string,
  ) {
    let d = document.createElement("canvas"),
      a = d.getContext("2d")!,
      c = b.width,
      g = b.height;
    d.width = c;
    d.height = g;
    let h = document.createElement("canvas");
    h.width = c;
    h.height = g;
    let ctx = h.getContext("2d")!;
    ctx.fillStyle = f;
    ctx.fillRect(0, 0, h.width, h.height);
    ctx.globalCompositeOperation = "destination-atop";
    ctx.drawImage(b, 0, 0);
    a.globalAlpha = 1;
    a.drawImage(h, 0, 0);
    e(d);
  }
  verifyWarshipLoaded() {
    3 == this.warshipTextureLoadCount && (this.warshipLoaded = true);
  }
  loadWarshipEvent() {
    this.warshipLoaded ||
      ((this.warshipImage = new Image()),
      (this.warshipImage.src = "images/events/battleship.png"),
      (this.warshipImage.onload = () => {
        objG_assets.warshipLoaded = true;
        objG_assets.loadTintImage(
          objG_assets.warshipImage,
          (b) => {
            objG_assets.whiteWarshipImage = b;
            objG_assets.warshipTextureLoadCount++;
            objG_assets.verifyWarshipLoaded();
          },
          "#FFFFFF",
        );
      }),
      (this.cannonImage = new Image()),
      (this.cannonImage.src = "images/events/shipcannon.png"),
      (this.cannonImage.onload = () => {
        objG_assets.warshipTextureLoadCount++;
        objG_assets.verifyWarshipLoaded();
      }),
      (this.warshipIcon = new Image()),
      (this.warshipIcon.src = "images/events/warshipIcon.png"),
      (this.warshipIcon.onload = () => {
        objG_assets.warshipTextureLoadCount++;
        objG_assets.verifyWarshipLoaded();
      }));
  }
  loadAsteroidEvent() {
    this.asteroidLoaded ||
      ((this.asteroidImage = new Image()),
      (this.asteroidImage.src = "images/events/asteroid.png"),
      (this.asteroidImage.onload = () => {
        objG_assets.asteroidLoaded = true;
        objG_assets.loadTintImage(
          objG_assets.asteroidImage,
          (b) => {
            objG_assets.whiteAsteroidImage = b;
          },
          "#FF3333",
        );
      }),
      (this.blinkImage = new Image()),
      (this.blinkImage.src = "images/events/blink.png"));
  }
}
class InputManager {
  angle = Math.PI;
  throttle = 0;
  rotationValue = 0.1;
  varAngle = 0;
  mouseMoved = false;
  hover = 1;
  addListeners: () => void;
  constructor() {
    let bool_isLeftMousePressed = false,
      f = 0,
      d = 0;
    const keydown = (ev: KeyboardEvent) => {
      67 == ev.keyCode && bool_following_plane && eb
        ? setTimeout(() => {
            func_displayCopyLink();
          }, 10)
        : bool_following_plane ||
          (32 == ev.keyCode
            ? Z && objG_wsConnection.sendShooting(true)
            : 188 != ev.keyCode &&
              49 != ev.keyCode &&
              (222 == ev.keyCode
                ? (bool_drawUI = !bool_drawUI)
                : 51 == ev.keyCode
                  ? ((bool_drawGradient = !bool_drawGradient),
                    console.log("Toggled Gradient to " + bool_drawGradient))
                  : 52 == ev.keyCode
                    ? ((bool_drawClouds = !bool_drawClouds),
                      console.log("Toggled drawClouds to " + bool_drawClouds))
                    : 53 == ev.keyCode
                      ? ((bool_drawWater = !bool_drawWater),
                        console.log("Toggled drawWater to " + bool_drawWater))
                      : 54 == ev.keyCode
                        ? ((bool_drawExplosions = !bool_drawExplosions),
                          console.log(
                            "Toggled drawExplosions to " + bool_drawExplosions,
                          ))
                        : 55 == ev.keyCode
                          ? ((bool_drawSun = !bool_drawSun),
                            console.log("Toggled drawSun to " + bool_drawSun))
                          : 56 == ev.keyCode
                            ? ((bool_drawItems = !bool_drawItems),
                              console.log(
                                "Toggled drawItems to " + bool_drawItems,
                              ))
                            : 57 == ev.keyCode
                              ? ((bool_drawTrails = !bool_drawTrails),
                                console.log(
                                  "Toggled drawTrails to " + bool_drawTrails,
                                ))
                              : 48 == ev.keyCode
                                ? ((bool_drawSplashes = !bool_drawSplashes),
                                  console.log(
                                    "Toggled drawSplashes to " +
                                      bool_drawSplashes,
                                  ))
                                : 27 == ev.keyCode
                                  ? (ads.func_showAds(),
                                    (num_max_volume =
                                      0.05 * num_setting_muteVol),
                                    $("#overlay").show(),
                                    funcR_hc_showPf(),
                                    (bool_following_plane = true),
                                    Z ||
                                      ((ka = 1),
                                      (objG_player_plane = undefined)))
                                  : 70 == ev.keyCode &&
                                    (document.fullscreenElement
                                      ? document.exitFullscreen &&
                                        document.exitFullscreen()
                                      : document.documentElement
                                          .requestFullscreen &&
                                        document.documentElement.requestFullscreen()),
              objGUI_gameInfo.clearTip()));
    };
    const keyup = (ev: KeyboardEvent) => {
      bool_following_plane ||
        32 != ev.keyCode ||
        (Z
          ? objG_wsConnection.sendShooting(false)
          : (1 == ka
              ? ((ka = 0), objG_followMode.followTopPlayer())
              : ((ka = 1), (objG_player_plane = undefined)),
            objG_eventManager.isSpaceWars() &&
              setTimeout(objG_followMode.respawnParticles, 500)));
    };
    const mousedown = (ev: MouseEvent) => {
      bool_following_plane ||
        (Z
          ? 0 == ev.button && objG_wsConnection.sendShooting(true)
          : 0 == ka
            ? 0 == ev.button
              ? objG_followMode.PlayerFollowing(true)
              : 2 == ev.button && objG_followMode.PlayerFollowing(false)
            : ((bool_isLeftMousePressed = true),
              (f = ev.clientX),
              (d = ev.clientY)));
    };
    const mouseup = (ev: MouseEvent) => {
      bool_following_plane ||
        (Z
          ? 0 == ev.button && objG_wsConnection.sendShooting(false)
          : (bool_isLeftMousePressed = false));
    };
    const mousemove = (ev: MouseEvent) => {
      if (
        !bool_following_plane &&
        ((this.mouseMoved = true),
        (qc = ev.clientX),
        (rc = ev.clientY),
        bool_isLeftMousePressed)
      ) {
        let c = ev.clientY - d,
          g = objGUI_anchor.x - (ev.clientX - f),
          h = objGUI_anchor.y - c;
        h < -room_height / 2
          ? (h = -room_height / 2)
          : h > room_height / 2 && (h = room_height / 2);
        g < -Gborder_X ? (g = -Gborder_X) : g > Gborder_X && (g = Gborder_X);
        objGUI_anchor.setPosition(g, h);
        f = ev.clientX;
        d = ev.clientY;
      }
    };
    this.addListeners = () => {
      document.addEventListener("mousedown", mousedown, false);
      document.addEventListener("mousemove", mousemove, false);
      document.addEventListener("mouseup", mouseup, false);
      document.addEventListener("keydown", keydown, false);
      document.addEventListener("keyup", keyup, false);
    };
  }
}
class ParticleImpacts {
  #inst_impact_list: ParticleImpacts.ImpactInfo[] = [];
  draw(e: CanvasRenderingContext2D) {
    let f, d, a, c, g, h, q, n, k, m, l, y, r, p;
    for (f = [], d = 0; d < this.#inst_impact_list.length; d++) {
      a = this.#inst_impact_list[d];
      if (undefined == objD_planes[a.id]) f.push(a);
      else if (a.weapon == id_weapon_railgun) {
        e.lineWidth = 2 + 5 * (1 - a.a);
        e.beginPath();
        (c = Math.floor(255 * a.a)),
          (g = e.createLinearGradient(
            a.hitPosition.x,
            a.hitPosition.y,
            a.origPosition.x,
            a.origPosition.y,
          ));
        0 > a.a && (a.a = 0);
        h = 255;
        1 == a.special
          ? ((h = 0), (c = Math.floor(0.4 * c)))
          : 2 == a.special && ((h = 200), (c = Math.floor(0.1 * c)));
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
          (n = r = y = l = undefined),
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
    for (c = 0; c < f.length; c++)
      this.#inst_impact_list.splice(this.#inst_impact_list.indexOf(f[c]), 1);
    f.length = 0;
  }
  addShot(plane_id: number, x_gu: number, y_gu: number, weapon_id: number) {
    if (func_isTimeElapsed_50ms() && xa) {
      let c = objD_planes[plane_id];
      if (c) {
        let g: ParticleImpacts.ImpactInfo = {};
        g.id = plane_id;
        g.angle = c.angle;
        g.isKing = qa == plane_id;
        g.hitPosition = {
          x: 10 * x_gu,
          y: 10 * y_gu,
        };
        g.special = 0;
        objG_eventManager.isInstagib()
          ? (g.special = 1)
          : objG_eventManager.isSpaceWars() && (g.special = 2);
        g.a = 1;
        g.weapon = weapon_id;
        let rot_point = func_rotatePoint(0, -10, c.angle);
        let rot_x = c.x + rot_point.x;
        let rot_y = c.y + rot_point.y;
        g.origPosition = {
          x: rot_x,
          y: rot_y,
        };
        let hit_x = g.hitPosition.x - rot_x;
        let hit_y = g.hitPosition.y - rot_y;
        if (weapon_id != id_weapon_superweapon) {
          let diag = Math.sqrt(hit_x * hit_x + hit_y * hit_y);
          g.direction = {
            x: hit_x / diag,
            y: hit_y / diag,
          };
          g.curPosition = {
            x: rot_x,
            y: rot_y,
          };
          g.finish = false;
          if (
            func_isInsideBox(rot_x, rot_y, 100) ||
            func_isInsideBox(g.hitPosition.x, g.hitPosition.y, 100)
          )
            this.#inst_impact_list.push(g);
        }
        weapon_id = room_height / 2;
        g.hitPosition.y > weapon_id &&
          ((rot_x = hit_y / hit_x),
          obj_particleImpacts.addSplash(
            (weapon_id - (g.hitPosition.y - rot_x * g.hitPosition.x)) / rot_x,
            weapon_id + 6,
            1,
            false,
          ));
      }
    }
  }
  addMissileImpact(x_gu: number, y_gu: number) {
    let x = 10 * x_gu;
    let y = 10 * y_gu;
    if (func_isInsideBox(x, y, 100) && func_isTimeElapsed_50ms()) {
      let c = objG_animationManager.createAnimation("explosion");
      c.setScale(1);
      c.posX = x;
      c.posY = y;
      objG_animationManager.runAnimationBehind(c);
      let sfx_vol =
        1 - func_calculateDistance2D(x, y, H.x, H.y) / num_sound_max_distance;
      objG_sfxManager.playSound(str_sfxid_mexpl, sfx_vol, 1, const_Sa_3);
    }
  }
  addSplash(x: number, y: number, size: number, randomize: boolean) {
    if (
      bool_drawSplashes &&
      !objG_eventManager.isSpaceWars() &&
      func_isInsideBox(x, y, 100) &&
      func_isTimeElapsed_50ms()
    ) {
      let anim_splash = objG_animationManager.createAnimation("splash"),
        anim_splashreflex =
          objG_animationManager.createAnimation("splashReflex");
      anim_splash.setScale(size);
      randomize && (anim_splash.scaleX *= 1.2 + 0.4 * Math.random());
      anim_splash.posX = x;
      anim_splash.posY = y - (61 * anim_splash.scaleY) / 2;
      objG_animationManager.runAnimation(anim_splash);
      anim_splashreflex.scaleX = anim_splash.scaleX;
      anim_splashreflex.posX = anim_splash.posX;
      anim_splashreflex.posY = anim_splash.posY + 77;
      anim_splashreflex.scaleY = -2;
      objG_animationManager.runAnimationLayer2(anim_splashreflex);
    }
  }
}
namespace ParticleImpacts {
  export type ImpactInfo = Record<string, any>;
}
class UI_GameInfo {
  #scale_factor?: number;
  #center_txt_msg = "";
  #center_txt_msg_suffix?: string;
  #center_txt_last_update = 0;
  #center_txt_murderer = true;
  #style_followmode_txt?: StyleText;
  #style_warningmsg_txt?: StyleText;
  #style_centermsg_txt?: StyleText;
  #style_centermsg_suffix_txt?: StyleText;
  #objUI_killStatus = new UI_KillStatus();
  #warning_msg_txt?: string;
  #m = 0;
  #missle_locked_txt?: string;
  #style_missile_locked_txt?: StyleText;
  #canvas_leaderboard_you!: HTMLCanvasElement;
  #ctx_leaderboard_you!: CanvasRenderingContext2D;
  #stroke_ammo_count?: StyleStroke;
  #canvasr_ammo_count?: HTMLCanvasElement;
  #ammo_count_width = 0;
  #ammo_count = -1;
  #leaberboard_refresh = false;
  #list_plane_ids: number[] = [];
  #canvas_leaderboard?: HTMLCanvasElement;
  #lb_scale!: number;
  #lb_width!: number;
  #lb_height!: number;
  #id_weapon_draw?: number;
  #id_weapon_current?: number;
  #ea = 1;
  #Ga = 0;
  #objUI_ActivityMessages = new UI_ActivityMessages();
  #king_name?: string;
  #style_king_txt?: StyleText;
  #canvasr_king_txt?: HTMLCanvasElement;
  #king_plane_id = 0;
  #tip_message_txt?: string;
  #stroke_tip_message?: StyleStroke;
  #canvasr_tip_message?: HTMLCanvasElement;
  #H = 0;
  #canvasr_sw_holder?: HTMLCanvasElement;
  #style_swholder?: StyleText;
  #sw_holder_name?: string;
  #U = false;
  #V = 0;
  #style_warshipev_info?: StyleText;
  #style_curr_event?: StyleText;
  #style_warmup_event?: StyleText;
  #canvasr_warshipev_info?: HTMLCanvasElement;
  #canvasr_curr_event!: HTMLCanvasElement;
  #canvar_warmup_event!: HTMLCanvasElement;
  #evt_winner_name?: string;
  // #ja = null;
  // #ca;
  // #fa;
  #style_evt_winner?: StyleText;
  #canvasr_evt_winner?: HTMLCanvasElement;
  #style_evt_winner_name?: StyleText;
  #canvasr_evt_winner_name?: HTMLCanvasElement;
  #na = 0;
  #warship_remote_txt_timeout = 0;
  #warship_remove_txt?: string;
  #style_warship?: StyleText;
  #canvasr_warship?: HTMLCanvasElement;
  #style_warship_rmreason?: StyleText;
  #canvasr_warship_rmreason!: HTMLCanvasElement;
  draw(I: CanvasRenderingContext2D) {
    let r, K, P, O, R;
    if (this.#leaberboard_refresh) {
      this.#canvas_leaderboard = document.createElement("canvas");
      r = this.#canvas_leaderboard.getContext("2d")!;
      this.renderLeaderboard(r, this.#canvas_leaderboard);
    }
    if (0 < this.#na) this.DrawWinnerLabel(I);
    else if (0 < this.#warship_remote_txt_timeout)
      this.DrawWarshipDestroyedLabel(I);
    else {
      if (
        this.#canvas_leaderboard &&
        0 < numG_player_count &&
        (!bool_following_plane || bool_continueGame)
      ) {
        this.drawLeaderboard(I);
      }
      if (objG_player_plane && !bool_following_plane) {
        I.save();
        I.scale(num_scale_factor, num_scale_factor);
        K = objG_assets.frames.indicator;
        I.translate(K.width / 2 + 6, K.height / 2 + 6);
        K.draw(I);
        this.DrawCurrentWeaponIcon(I, objG_player_plane.weapon);
        r = 19;
        P = 0;
        if (null == this.#stroke_ammo_count)
          this.#stroke_ammo_count = new StyleStroke(r, "#FFFFFF");
        R = objG_eventManager.isInstagib();
        if (
          this.#ammo_count != objG_player_plane.GetAmmo() ||
          null == this.#canvasr_ammo_count
        ) {
          let S: string | number = "\u221e";
          if (!R) {
            this.#ammo_count = objG_player_plane.GetAmmo();
            -1 < this.#ammo_count && (S = this.#ammo_count);
          }
          this.#stroke_ammo_count.setValue(S.toString());
          this.#canvasr_ammo_count = this.#stroke_ammo_count.render();
          this.#ammo_count_width = this.#canvasr_ammo_count.width;
        }
        I.globalAlpha = 1;
        I.drawImage(
          this.#canvasr_ammo_count,
          0.57 * -this.#ammo_count_width,
          0.19 * K.height + r / 2 + P,
        );
        I.restore();
        this.DrawScore(I);
      }
      if (0 < this.#center_txt_last_update) {
        K = 0;
        r = +new Date() - this.#center_txt_last_update;
        if (4e3 > r) {
          K = 3e3 > r ? 1 : 1 - (r - 3e3) / 1e3;
        } else {
          this.#center_txt_last_update = 0;
        }
        if (!this.#style_centermsg_txt) {
          P = 20;
          r = false;
          if (this.#center_txt_msg_suffix) {
            r = 40;
            this.#style_centermsg_suffix_txt = new StyleText(
              r * num_scale_factor,
              "#FF0000",
              "#990000",
            );
            this.#style_centermsg_suffix_txt.setValue(
              this.#center_txt_msg_suffix,
            );
            this.#style_centermsg_suffix_txt.setUsingFrame(true);
            r = true;
            this.#style_centermsg_suffix_txt.setAddTop(25);
          } else {
            this.#style_centermsg_suffix_txt = undefined;
            P = 35;
          }
          this.#style_centermsg_txt = new StyleText(
            P * num_scale_factor,
            "#FF0000",
            "#990000",
          );
          this.#style_centermsg_txt.setValue(this.#center_txt_msg);
          this.#style_centermsg_txt.setUsingFrame(!r);
        }
        P = 0.25 * canvas.height;
        if (this.#center_txt_murderer) {
          this.#style_centermsg_txt.setColor("#00ea11");
          this.#style_centermsg_txt.setSecondColor("#006b08");
          if (this.#style_centermsg_suffix_txt) {
            this.#style_centermsg_suffix_txt.setColor("#00ea11");
            this.#style_centermsg_suffix_txt.setSecondColor("#006b08");
          }
        } else {
          this.#style_centermsg_txt.setColor("#ff0608");
          this.#style_centermsg_txt.setSecondColor("#a20400");
          if (this.#style_centermsg_suffix_txt) {
            this.#style_centermsg_suffix_txt.setColor("#ff0608");
            this.#style_centermsg_suffix_txt.setSecondColor("#a20400");
          }
        }
        r = this.#style_centermsg_txt.render();
        if (this.#center_txt_msg_suffix) {
          O = this.#style_centermsg_suffix_txt!.render();
        }
        I.globalAlpha = K;
        if (O) I.drawImage(O, 0.5 * canvas.width - O.width / 2, P - 5);
        I.drawImage(r, 0.5 * canvas.width - r.width / 2, P);
        I.globalAlpha = 1;
      }
      if (this.#warning_msg_txt) {
        P = 0.6 * canvas.height;
        K = (this.#m / 1e3) * 10;
        1 < K && (K = 1);
        if (!this.#style_warningmsg_txt) {
          r = 30;
          this.#style_warningmsg_txt = new StyleText(
            r * num_scale_factor,
            "#FF0000",
            "#990000",
          );
        }
        this.#style_warningmsg_txt.setValue(this.#warning_msg_txt);
        this.#style_warningmsg_txt.setUsingFrame(true);
        r = this.#style_warningmsg_txt.render();
        O = 0.1 * Math.sin(this.#m / 100) * num_scale_factor;
        I.save();
        I.translate(0.5 * canvas.width, P);
        I.scale(1 + O, 1 + O);
        I.translate(-r.width / 2, 0);
        I.globalAlpha = K;
        I.drawImage(r, 0, 0);
        I.restore();
      }
      if (this.#missle_locked_txt) {
        P = 0.397 * canvas.height;
        K = 1;
        if (!this.#style_missile_locked_txt) {
          r = 20;
          this.#style_missile_locked_txt = new StyleText(
            r * num_scale_factor,
            "#FF0000",
            "#990000",
          );
        }
        this.#style_missile_locked_txt.setValue(this.#missle_locked_txt);
        this.#style_missile_locked_txt.setUsingFrame(false);
        r = this.#style_missile_locked_txt.render();
        I.save();
        I.translate(0.5 * canvas.width, P);
        I.scale(0.8, 0.8);
        I.translate(-r.width / 2, 0);
        I.globalAlpha = K;
        I.drawImage(r, 0, 0);
        I.restore();
      }
      if (objG_wsConnection.hasConnection && xa) {
        if (objG_eventManager.waiting) this.DrawWarmupTime(I);
        else if (objG_eventManager.isInEvent()) this.DrawEventLabel(I);
        else if (La && !bool_following_plane) this.DrawLaserDeployed(I);
      }
      if (
        undefined == this.#warning_msg_txt &&
        this.#objUI_killStatus.shouldDraw()
      ) {
        I.save();
        I.translate(0.5 * canvas.width, 0.67 * canvas.height);
        this.#objUI_killStatus.draw(I);
        I.restore();
      }
      if (!Z && !bool_following_plane) {
        O = "FREE MODE";
        if (0 == ka) {
          O = objG_player_plane
            ? "Following " + func_renameBlankPlayerNames(objG_player_plane.name)
            : "FOLLOW MODE";
        }
        if (!this.#style_followmode_txt) {
          this.#style_followmode_txt = new StyleText(
            30 * num_scale_factor,
            "#ffd118",
            "#b56006",
          );
        }
        this.#style_followmode_txt.setValue(O);
        this.#style_followmode_txt.setUsingFrame(true);
        r = this.#style_followmode_txt.render();
        I.globalAlpha = 1;
        P = 0.14 * canvas.height;
        I.drawImage(r, 0.5 * canvas.width - r.width / 2, P);
      }
      if (this.#tip_message_txt) {
        if (4e3 > this.#H) {
          if (null == this.#canvasr_tip_message) {
            r = 20;
            this.#stroke_tip_message = new StyleStroke(
              r * num_scale_factor,
              "#ffd118",
              true,
              "#633504",
            );
            this.#stroke_tip_message.setValue(this.#tip_message_txt);
            this.#stroke_tip_message.setStrokeWidth(5);
            this.#stroke_tip_message.setRoundedFrameOpacity(0.5);
            this.#stroke_tip_message.setHMargin(5);
            this.#stroke_tip_message.setUsingRoundedFrame(true);
            this.#canvasr_tip_message = this.#stroke_tip_message.render();
          }
          O = 1;
          if (300 > this.#H) {
            O = this.#H / 300;
            O = Math.sqrt(O);
          } else if (3700 < this.#H) {
            O = 1 - (this.#H - 3700) / 300;
            O = Math.sqrt(O);
          }
          I.drawImage(
            this.#canvasr_tip_message,
            canvas_width / 2 - this.#canvasr_tip_message.width / 2,
            1.1 * this.#canvasr_tip_message.height * O -
              this.#canvasr_tip_message.height,
          );
        } else {
          this.#tip_message_txt = undefined;
        }
      }
      if (!bool_following_plane) this.#objUI_ActivityMessages.draw(I);
      if (!bool_following_plane && 0 < qa) this.DrawKing(I);
      if (this.#leaberboard_refresh) this.#leaberboard_refresh = false;
      if (this.#scale_factor != num_scale_factor) {
        this.#style_followmode_txt = this.#style_warningmsg_txt = undefined;
        this.#scale_factor = num_scale_factor;
      }
    }
  }
  DrawKing(ctx: CanvasRenderingContext2D) {
    if (
      this.#list_plane_ids &&
      0 < this.#list_plane_ids.length &&
      0 < Object.keys(objD_planes).length
    ) {
      let obj_plane = objD_planes[this.#list_plane_ids[0]];
      if (obj_plane) {
        let name = func_renameBlankPlayerNames(obj_plane.name);
        if (
          objG_player_plane &&
          this.#king_plane_id != obj_plane.id &&
          obj_plane.id == objG_player_plane.id
        )
          objG_sfxManager.playSound(str_sfxid_king, 1, 1, 1);
        this.#king_plane_id = obj_plane.id;
        let font_size = 25;
        let spaces = " ";
        if (!bool_setting_highQuality) spaces = "";
        this.#style_king_txt ??= new StyleText(
          font_size * num_scale_factor,
          "#fe9b00",
          "#6e3800",
        );
        this.#style_king_txt.setUsingRoundedFrame(true);
        if (name != this.#king_name) {
          this.#style_king_txt.setValue(spaces + "  King: " + name);
        }
        this.#king_name = name;
        this.#canvasr_king_txt = this.#style_king_txt.render();
      }
      if (this.#style_king_txt && this.#canvasr_king_txt) {
        ctx.save();
        let d = 0.83 * canvas.height;
        ctx.drawImage(
          this.#canvasr_king_txt,
          0.5 * canvas.width - this.#canvasr_king_txt.width / 2,
          d,
        );
        let font_size = 20;
        if (!bool_setting_highQuality) font_size = 13;
        ctx.translate(
          0.5 * canvas.width - this.#canvasr_king_txt.width / 2 + font_size,
          d + this.#canvasr_king_txt.height / 2 - 2 * num_scale_factor,
        );
        d = 1;
        ctx.scale(num_scale_factor * d, num_scale_factor * d);
        objG_assets.frames.crown.draw(ctx);
        ctx.restore();
      }
    }
  }
  DrawLaserDeployed(ctx: CanvasRenderingContext2D) {
    ctx.save();
    let c, d;
    if (str_name_superweapon_holder != this.#sw_holder_name) {
      this.#sw_holder_name = str_name_superweapon_holder;
      c = 25;
      this.#style_swholder = new StyleText(
        c * num_scale_factor,
        "#fbc521",
        "#c78109",
      );
      if (str_name_superweapon_holder) {
        this.#style_swholder.setValue(
          "     Super Weapon: " + str_name_superweapon_holder,
        );
      } else {
        this.#style_swholder.setValue("     Find The Super Weapon!");
      }
      this.#style_swholder.setUsingRoundedFrame(true);
      this.#canvasr_sw_holder = this.#style_swholder.render();
    }
    if (!this.#canvasr_sw_holder) {
      console.warn("#ab not initialized", this.#style_swholder);
      return;
    }
    c = 0.05 * canvas.height;
    ctx.drawImage(
      this.#canvasr_sw_holder,
      0.5 * canvas.width - this.#canvasr_sw_holder.width / 2,
      c,
    );
    d = 30;
    if (!bool_setting_highQuality) d = 20;
    ctx.translate(
      0.5 * canvas.width - this.#canvasr_sw_holder.width / 2 + d,
      c + this.#canvasr_sw_holder.height / 2,
    );
    ctx.scale(num_scale_factor, num_scale_factor);
    objG_assets.frames.laser.draw(ctx);
    ctx.restore();
  }
  // DrawRank(ctx: CanvasRenderingContext2D) {
  //   0 < objG_player_plane.rank &&
  //     (undefined == rankCanvas &&
  //       ((rankCanvas = document.createElement("canvas")),
  //       (rankCanvas.width = 200),
  //       (rankCanvas.height = 200),
  //       (rankCanvasContext = rankCanvas.getContext("2d"))),
  //     lastRankNumber != objG_player_plane.rank &&
  //       (rankCanvasContext.clearRect(0, 0, 200, 200),
  //       (rankCanvasContext.globalAlpha = 0.3),
  //       (rankCanvasContext.fillStyle = "rgba(0,0,0,1.0)"),
  //       func_drawRoundedRectangle(
  //         rankCanvasContext,
  //         0,
  //         0,
  //         200,
  //         200,
  //         30 * num_scale_factor,
  //       ),
  //       (this.#ca = new StyleStroke(15 * num_scale_factor, "#EEEEEE")),
  //       this.#ca.setValue(objG_player_plane.rank),
  //       this.#ca.setUsingRoundedFrame(false),
  //       (this.#fa = this.#ca.render()),
  //       (lastRankNumber = objG_player_plane.rank)),
  //     ctx.drawImage(rankCanvas, canvas_width - 200, canvas_height - 200));
  // }
  DrawScore(ctx: CanvasRenderingContext2D) {
    if (objG_player_plane && 0 < objG_player_plane.rank) {
      let c = 16 * num_scale_factor,
        d = "Arial Black";
      let b = this.#lb_scale * num_scale_factor,
        g = b,
        h = 30 * num_scale_factor,
        e = 5 * num_scale_factor,
        k = 10 * num_scale_factor,
        n = canvas_width - b - 5,
        f = this.#lb_height + 5 + 5;
      if (undefined == this.#canvas_leaderboard_you) {
        this.#canvas_leaderboard_you = document.createElement("canvas");
        this.#ctx_leaderboard_you =
          this.#canvas_leaderboard_you.getContext("2d")!;
      }
      if (-1 != objG_player_plane.score) {
        this.#canvas_leaderboard_you.width = g;
        this.#canvas_leaderboard_you.height = h;
        this.#ctx_leaderboard_you.font =
          c + "px 'proxima-nova-1','proxima-nova-2', " + d;
        this.#ctx_leaderboard_you.globalAlpha = 0.3;
        this.#ctx_leaderboard_you.textBaseline = "hanging";
        func_drawRoundedRectangle(
          this.#ctx_leaderboard_you,
          0,
          0,
          b,
          h,
          30 * num_scale_factor,
        );
        this.#ctx_leaderboard_you.globalAlpha = 1;
        for (c = 2; 0 <= c; c--) {
          let d = 0;
          if (0 != c) {
            this.#ctx_leaderboard_you.fillStyle = "rgba(100,49,0,1.0)";
            d = c;
          } else {
            this.#ctx_leaderboard_you.fillStyle = "rgba(255,156,0,1.0)";
          }
          this.#ctx_leaderboard_you.fillText(
            objG_player_plane.rank + ". You ",
            e,
            k + d,
          );
          g = this.#ctx_leaderboard_you.measureText(
            objG_player_plane.score.toString(),
          ).width;
          this.#ctx_leaderboard_you.fillText(
            objG_player_plane.score.toString(),
            b - e - g,
            k + d,
          );
        }
      }
      ctx.drawImage(this.#canvas_leaderboard_you, n, f + 5);
    }
  }
  DrawWarmupTime(ctx: CanvasRenderingContext2D) {
    if (this.#U) {
      this.#U = false;
      let c = objG_eventManager.endTime - frametime_millis;
      if (0 > Math.floor(c)) return;
      this.#style_curr_event = new StyleText(
        23 * num_scale_factor,
        objG_eventManager.getEventColor(),
        "#6e3800",
      );
      this.#style_curr_event.setValue(objG_eventManager.getEventName());
      this.#canvasr_curr_event = this.#style_curr_event.render();
      this.#style_warmup_event = new StyleText(
        20 * num_scale_factor,
        "#fe9b00",
        "#6e3800",
      );
      this.#style_warmup_event.setValue("STARTS IN");
      this.#canvar_warmup_event = this.#style_warmup_event.render();
      this.#style_warshipev_info = new StyleText(
        27 * num_scale_factor,
        "#fe9b00",
        "#6e3800",
      );
      this.#style_warshipev_info.setValue(func_millisToTimeFormat(c));
      this.#canvasr_warshipev_info = this.#style_warshipev_info.render();
    }
    if (this.#canvasr_warshipev_info) {
      let c = 0.8 * canvas.height,
        d;
      d = this.#canvasr_curr_event.width;
      d =
        this.#canvar_warmup_event.width > d
          ? this.#canvar_warmup_event.width
          : d;
      d =
        this.#canvasr_warshipev_info.width > d
          ? this.#canvasr_warshipev_info.width
          : d;
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 0.3;
      func_drawRoundedRectangle(ctx, canvas.width - d - 20, c, d, 102, 20);
      ctx.globalAlpha = 1;
      ctx.drawImage(this.#canvasr_curr_event, canvas.width - d - 20, c);
      ctx.drawImage(
        this.#canvar_warmup_event,
        canvas.width - d / 2 - this.#canvar_warmup_event.width / 2 - 20,
        c + 36,
      );
      ctx.drawImage(
        this.#canvasr_warshipev_info,
        canvas.width - d / 2 - this.#canvasr_warshipev_info.width / 2 - 20,
        c + 60,
      );
    }
  }
  DrawEventLabel(ctx: CanvasRenderingContext2D) {
    if (this.#U) {
      this.#U = false;
      let c = objG_eventManager.endTime - frametime_millis;
      if (0 > Math.floor(c)) c = 0;
      this.#style_curr_event = new StyleText(
        25 * num_scale_factor,
        objG_eventManager.getEventColor(),
        "#6e3800",
      );
      this.#style_curr_event.setValue(objG_eventManager.getEventName());
      this.#canvasr_curr_event = this.#style_curr_event.render();
      this.#style_warshipev_info = new StyleText(
        25 * num_scale_factor,
        "#fe9b00",
        "#6e3800",
      );
      if (objG_eventManager.isWarship()) {
        if (0 < objG_eventManager.warshipsLeft) {
          this.#style_warshipev_info.setValue(
            "Warships Left: " + objG_eventManager.warshipsLeft,
          );
        } else {
          if (0 == objG_eventManager.warshipsEscaped) {
            this.#style_warshipev_info.setValue("All Warships Destroyed!");
          } else {
            this.#style_warshipev_info.setValue(
              objG_eventManager.warshipsDestroyed +
                " Destroyed, " +
                objG_eventManager.warshipsEscaped +
                " Escaped!",
            );
          }
        }
      } else {
        this.#style_warshipev_info.setValue(func_millisToTimeFormat(c));
      }
      this.#canvasr_warshipev_info = this.#style_warshipev_info.render();
    }
    if (this.#canvasr_warshipev_info) {
      let c = 0.04 * canvas.height,
        d =
          this.#canvasr_warshipev_info.width < this.#canvasr_curr_event.width
            ? this.#canvasr_curr_event.width
            : this.#canvasr_warshipev_info.width;
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 0.3;
      func_drawRoundedRectangle(ctx, canvas.width / 2 - d / 2, c, d, 69, 20);
      ctx.globalAlpha = 1;
      ctx.drawImage(
        this.#canvasr_curr_event,
        canvas.width / 2 - this.#canvasr_curr_event.width / 2,
        c,
      );
      ctx.drawImage(
        this.#canvasr_warshipev_info,
        canvas.width / 2 - this.#canvasr_warshipev_info.width / 2,
        c + 30,
      );
    }
  }
  DrawWinnerLabel(ctx: CanvasRenderingContext2D) {
    if (!this.#style_evt_winner && this.#evt_winner_name) {
      this.#style_evt_winner = new StyleText(
        55 * num_scale_factor,
        "#fe6800",
        "#6e3800",
      );
      this.#style_evt_winner.setValue("WINNER");
      this.#canvasr_evt_winner = this.#style_evt_winner.render();
      this.#style_evt_winner_name = new StyleText(
        45 * num_scale_factor,
        "#fe9b00",
        "#6e3800",
      );
      this.#style_evt_winner_name.setValue(this.#evt_winner_name);
      this.#canvasr_evt_winner_name = this.#style_evt_winner_name.render();
    }
    if (this.#canvasr_evt_winner && this.#canvasr_evt_winner_name) {
      let c = 0.13 * canvas.height,
        d =
          this.#canvasr_evt_winner.width > this.#canvasr_evt_winner_name.width
            ? this.#canvasr_evt_winner.width
            : this.#canvasr_evt_winner_name.width;
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 0.3;
      func_drawRoundedRectangle(ctx, canvas.width / 2 - d / 2, c, d, 140, 20);
      ctx.globalAlpha = 1;
      ctx.drawImage(
        this.#canvasr_evt_winner,
        canvas.width / 2 - this.#canvasr_evt_winner.width / 2,
        c,
      );
      ctx.drawImage(
        this.#canvasr_evt_winner_name,
        canvas.width / 2 - this.#canvasr_evt_winner_name.width / 2,
        c + 70,
      );
    }
  }
  DrawWarshipDestroyedLabel(ctx: CanvasRenderingContext2D) {
    if (!this.#style_warship) {
      this.#style_warship = new StyleText(
        45 * num_scale_factor,
        "#fe6800",
        "#6e3800",
      );
      if (undefined == this.#warship_remove_txt)
        this.#style_warship.setValue("WARSHIP");
      else this.#style_warship.setValue(this.#warship_remove_txt);
      this.#canvasr_warship = this.#style_warship.render();
      this.#style_warship_rmreason = new StyleText(
        35 * num_scale_factor,
        "#fe9b00",
        "#6e3800",
      );
      if (undefined == this.#warship_remove_txt)
        this.#style_warship_rmreason.setValue("ESCAPED!");
      else this.#style_warship_rmreason.setValue("DESTROYED A WARSHIP!");
      this.#canvasr_warship_rmreason = this.#style_warship_rmreason.render();
    }
    if (this.#canvasr_warship) {
      let c = 0.13 * canvas.height,
        d =
          this.#canvasr_warship.width > this.#canvasr_warship_rmreason.width
            ? this.#canvasr_warship.width
            : this.#canvasr_warship_rmreason.width;
      ctx.fillStyle = "#000000";
      ctx.globalAlpha = 0.3;
      func_drawRoundedRectangle(ctx, canvas.width / 2 - d / 2, c, d, 114, 20);
      ctx.globalAlpha = 1;
      ctx.drawImage(
        this.#canvasr_warship,
        canvas.width / 2 - this.#canvasr_warship.width / 2,
        c,
      );
      ctx.drawImage(
        this.#canvasr_warship_rmreason,
        canvas.width / 2 - this.#canvasr_warship_rmreason.width / 2,
        c + 60,
      );
    }
  }
  // DrawLastEventWinner(ctx: CanvasRenderingContext2D) {
  //   null != this.#aa &&
  //     this.#aa != this.#ja &&
  //     ((this.#ca = new StyleStroke(15 * num_scale_factor, "#EEEEEE")),
  //     this.#ca.setFont("px 'proxima-nova-1','proxima-nova-2', Arial Black"),
  //     this.#ca.setValue(
  //       "Last Event Winner: " + func_renameBlankPlayerNames(this.#aa) + " ",
  //     ),
  //     this.#ca.setUsingRoundedFrame(true),
  //     (this.#ja = this.#aa),
  //     (this.#fa = this.#ca.render()));
  //   if (this.#fa) {
  //     let c = 10 * num_scale_factor;
  //     ctx.drawImage(
  //       this.#fa,
  //       canvas.width - this.#fa.width - c,
  //       canvas.height - this.#fa.height - c,
  //     );
  //   }
  // }
  DrawCurrentWeaponIcon(ctx: CanvasRenderingContext2D, id_weapon: number) {
    if (this.#id_weapon_current != id_weapon) {
      this.#id_weapon_current = id_weapon;
      this.#Ga = 1;
    }
    if (1 == this.#Ga) {
      this.#ea -= 0.15;
      if (0 >= this.#ea) {
        this.#id_weapon_draw = this.#id_weapon_current;
        this.#ea = 0;
        this.#Ga = 2;
      }
    } else {
      if (2 == this.#Ga) this.#ea += 0.15;
      if (1 <= this.#ea) {
        this.#ea = 1;
        this.#Ga = 0;
      }
    }
    let d = 0,
      b = 0,
      g = 0,
      h,
      e = true;
    switch (this.#id_weapon_draw) {
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
    ctx.save();
    let k = Math.sqrt(this.#ea);
    ctx.translate(0, -16);
    ctx.scale(k, k);
    ctx.translate(0, 16);
    ctx.lineWidth = 3;
    if (e) {
      ctx.beginPath();
      ctx.arc(-1, -11, 34, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-1, -17, 34, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.strokeStyle = "rgba(255,255,255,1.0)";
      ctx.fillStyle = "rgba(" + d + "," + b + "," + g + ",1.0)";
      ctx.fill();
      ctx.stroke();
    }
    ctx.translate(-1, -16);
    h.draw(ctx);
    ctx.restore();
  }
  update(deltatime: number) {
    this.#m += deltatime;
    this.#H += deltatime;
    this.#objUI_ActivityMessages.update(deltatime);
    this.#objUI_killStatus.update(deltatime);
    this.#V -= deltatime;
    if (0 > this.#V) {
      this.#V += 1e3;
      this.#U = true;
    }
    0 < this.#na && (this.#na -= deltatime);
    0 < this.#warship_remote_txt_timeout &&
      (this.#warship_remote_txt_timeout -= deltatime);
  }
  renderLeaderboard(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    this.#lb_scale = 270;
    this.#lb_height = 0;
    let d = 5 * num_scale_factor;
    let b = 10 * num_scale_factor;
    let head_lh = 23 * num_scale_factor;
    let item_lh = 18 * num_scale_factor;
    let e;
    let k = 60 * num_scale_factor;
    let n = 5 * num_scale_factor;
    let f = 32;
    let font = "Arial Black";
    let I = 0;
    let r;
    let y;
    let m;
    e = this.#lb_height += d + head_lh + d;
    m = this.#list_plane_ids.length;
    10 < m && (m = 10);
    for (let i = 0; i < m; i++) {
      r = objD_planes[this.#list_plane_ids[i]];
      if (r) {
        this.#lb_height += item_lh + b;
        r = ctx.measureText(func_renameBlankPlayerNames(r.name)).width;
        if (I < r) I = r;
      }
    }
    this.#lb_height -= b;
    if (I > k) this.#lb_scale += I - k;
    this.#lb_width = this.#lb_scale * num_scale_factor;
    this.#lb_height += d;
    this.#lb_height += n;
    canvas.width = this.#lb_width;
    canvas.height = this.#lb_height;
    let item_font_style =
      item_lh + "px 'proxima-nova-1','proxima-nova-2', " + font;
    ctx.fillStyle = "rgba(0,0,0,0.3)";
    func_drawRoundedRectangle(
      ctx,
      0,
      0,
      this.#lb_width,
      this.#lb_height,
      30 * num_scale_factor,
    );
    ctx.fillStyle = "rgba(204,84,0,1.0)";
    func_drawRoundedRectangleHalf(
      ctx,
      0,
      2,
      this.#lb_width,
      f * num_scale_factor,
      30 * num_scale_factor,
    );
    ctx.fillStyle = "rgba(254,102,3,1.0)";
    func_drawRoundedRectangleHalf(
      ctx,
      0,
      0,
      this.#lb_width,
      f * num_scale_factor,
      30 * num_scale_factor,
    );
    let txt = "LEADERBOARD";
    objG_eventManager.isInstagib() && (txt = "KILLS");
    ctx.font = head_lh + "px 'proxima-nova-1','proxima-nova-2', " + font;
    ctx.textBaseline = "hanging";
    let width_name = ctx.measureText(txt).width;
    ctx.fillStyle = "rgba(255,255,0,0.5)";
    ctx.fillText(txt, this.#lb_width / 2 - width_name / 2, d + 1);
    ctx.fillStyle = "rgba(178,32,0,1.0)";
    ctx.fillText(txt, this.#lb_width / 2 - width_name / 2, d);
    ctx.font = item_font_style;
    e += n;
    for (let i = 0; i < m; i++) {
      let obj_plane = objD_planes[this.#list_plane_ids[i]];
      if (obj_plane) {
        for (n = 2; 0 <= n; n--) {
          let txt_spacing = ". ";
          if (!obj_plane.inGame || obj_plane.id == qa) txt_spacing = ".     ";
          let txt_lb_name =
            i + 1 + txt_spacing + func_renameBlankPlayerNames(obj_plane.name);
          let g = 0;
          if (0 != n) {
            ctx.fillStyle = "rgba(100,49,0,1.0)";
            g = n;
          } else {
            ctx.fillStyle =
              current_following_plane_id == obj_plane.id
                ? "rgba(255,156,0,1.0)"
                : "rgba(255,220,0,1.0)";
          }
          ctx.font = item_font_style;
          ctx.measureText(txt_lb_name);
          ctx.fillText(txt_lb_name, d, e + g);
          let width_score = ctx.measureText(obj_plane.score.toString()).width;
          f = 1;
          I = 0;
          if (obj_plane.inGame) {
            if (obj_plane.id == qa) {
              ctx.save();
              y = 38;
              9 == i && (y = 50);
              ctx.translate(
                y * num_scale_factor * f + I,
                e + g + 7 * num_scale_factor * f,
              );
              ctx.scale(num_scale_factor * f, num_scale_factor * f);
              objG_assets.frames.crown.draw(ctx);
              ctx.restore();
            }
          } else {
            ctx.save();
            y = 38;
            9 == i && (y = 50);
            ctx.translate(
              y * num_scale_factor * f + I,
              e + g + 7 * num_scale_factor * f,
            );
            ctx.scale(num_scale_factor * f, num_scale_factor * f);
            objG_assets.frames.skull.draw(ctx);
            ctx.restore();
          }
          ctx.fillText(
            obj_plane.score.toString(),
            this.#lb_width - d - width_score,
            e + g,
          );
        }
        e += item_lh + b;
      }
    }
  }
  drawLeaderboard(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.#canvas_leaderboard!,
      canvas_width - this.#lb_width - 5,
      5,
    );
  }
  addActivityMessage(message_str: string) {
    this.#objUI_ActivityMessages.addActivityMessage(message_str);
  }
  addMessage(txt_msg: string, murderer: boolean, txt_msg_suffix?: string) {
    this.#center_txt_msg = txt_msg;
    this.#style_centermsg_txt = undefined;
    this.#center_txt_msg_suffix = txt_msg_suffix;
    this.#center_txt_last_update = +new Date();
    this.#center_txt_murderer = murderer;
  }
  showTip(tip_string: string) {
    this.#tip_message_txt && this.clearTip();
    this.#tip_message_txt = tip_string;
    this.#H = 0;
    this.#canvasr_tip_message = undefined;
  }
  clearTip() {
    this.#tip_message_txt = undefined;
  }
  showTargetLockedMessage() {
    this.#missle_locked_txt || (this.#missle_locked_txt = "[ LOCKED ]");
  }
  clearTargetLockedMessage() {
    this.#missle_locked_txt = undefined;
  }
  showWarningMessage(message_str: string) {
    this.#warning_msg_txt = message_str;
    this.#m = 0;
  }
  clearWarningMessage() {
    this.#warning_msg_txt = undefined;
  }
  refreshLeaderboard(list_plane_ids: number[]) {
    this.#list_plane_ids = list_plane_ids;
    this.#leaberboard_refresh = true;
  }
  addBonus(flag_streak: number, kills: number) {
    this.#objUI_killStatus.push(flag_streak, kills);
  }
  clearBonusDisplay() {
    this.#objUI_killStatus.clear();
  }
  clearNearMiss() {
    this.#objUI_killStatus.clearNearMiss();
  }
  setLastWinner(winner_name: string, c: number) {
    this.#evt_winner_name = func_renameBlankPlayerNames(winner_name);
    console.log("Last Event Winner: " + winner_name);
    c && ((this.#style_evt_winner = undefined), (this.#na = 6e3));
  }
  setWarshipRemoved(warship_remove_txt?: string) {
    this.#warship_remove_txt = warship_remove_txt;
    this.#warship_remote_txt_timeout = 5e3;
    this.#style_warship = undefined;
  }
}
class UI_ActivityMessages {
  #rendered_canvas_list: HTMLCanvasElement[] = [];
  #item_add_time: number[] = [];
  update(deltatime: number) {
    0 < this.#item_add_time.length &&
      15e3 < frametime_millis - this.#item_add_time[0] &&
      (this.#rendered_canvas_list.shift(), this.#item_add_time.shift());
  }
  draw(e: CanvasRenderingContext2D) {
    e.globalAlpha = 1;
    let d = canvas.height - 180 * num_scale_factor;
    for (let key in this.#rendered_canvas_list) {
      let a = parseInt(key);
      e.drawImage(
        this.#rendered_canvas_list[a],
        25,
        d +
          26 * num_scale_factor +
          5 +
          14 * a * num_scale_factor +
          15 * a * num_scale_factor,
      );
    }
  }
  addActivityMessage(message_str: string) {
    let d = new StyleStroke(14 * num_scale_factor, "#EEEEEE");
    d.setFont("px 'proxima-nova-1','proxima-nova-2', Arial Black");
    d.setValue("\u2022 " + message_str);
    d.setUsingRoundedFrame(true);
    d.setHMargin(10);
    d.setVMargin(4);
    let canvas = d.render();
    this.#rendered_canvas_list.push(canvas);
    this.#item_add_time.push(+new Date());
    if (5 < this.#rendered_canvas_list.length) {
      this.#rendered_canvas_list.shift();
      this.#item_add_time.shift();
    }
    for (let max = 0, d, i = 0; i < this.#rendered_canvas_list.length; i++) {
      d = this.#rendered_canvas_list[i].width + 5 + 5;
      d > max && (max = d);
    }
  }
}
class Plane {
  #num_spawn_cooldown_ms = 0;
  #f = 100;
  #d = false;
  #obj_particleTrails = new ParticleTrails();
  #obj_particleFlags?: ParticleFlags;
  #g?: number;
  #h = 0;
  #q = 0;
  laserFrame = 0;
  laserTimer = 0;
  #obj_particleManager?: ParticleManager;
  #k = 0;
  #m = 0;
  #l = 1;
  #y = 0;
  #r = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, 4, 3, 2, 1];
  #obj_scoreAccumInfo?: ScoreAccumInfo;
  #pa = false;
  #s = 0;
  #w = 0;
  #t = 0;
  #x = 0;
  #z = 0;
  #C = 0;
  #P = 1;
  #R = 0;
  #S = 0;
  #O = false;
  #G = true;
  #ea = false;
  #Ga = 0;
  #D = 0;
  #Fa = 0;
  #ua?: number;
  #M: Record<number, string> = {
    1: "rgba(255, 255, 255, 0.6)",
    2: "rgba(255, 156, 0, 1.0)",
    4: "rgba(255, 43, 0, 1.0)",
    8: "rgba(0, 140, 255, 1.0)",
    16: "rgba(255, 255, 0, 1.0)",
    128: "rgba(255, 0, 255, 1.0)",
    256: "rgba(137, 137, 137, 1.0)",
  };
  lastUpdate = 0;
  highlightValue = 0;
  id = -1;
  dstY = 0;
  dstX = 0;
  origY = 0;
  origX = 0;
  prevY = 0;
  prevX = 0;
  y = 0;
  x = 0;
  energy = 255;
  inGame = true;
  updateBool = false;
  momentum = 0;
  speed = 0;
  colorHue = 0;
  maxMomentum = 8;
  dstAngle = 0;
  origAngle = 0;
  angle = 0;
  controlAngle = -90;
  rotSpeed = 4;
  directionX = 0;
  directionY = -1;
  targetY = 0;
  targetX = 0;
  targetMomentum = this.maxMomentum;
  name = "";
  first_set = true;
  rank = -1;
  score = 0;
  frameSwitchTime = 40;
  timeToNextFrame = 0;
  flameState = true;
  lastImage?: FrameImage;
  lastImageReflex?: FrameImage;
  flipLastImage = 1;
  planeImages = objG_assets.planeFrames;
  planeImagesReflex = objG_assets.planeFramesReflex;
  decalFrames!: FrameImage[]; //setDecalId() //setColorId()
  decalID = 0;
  colorID = 0;
  isShooting = false;
  isBot = false;
  hadHover = false;
  hover = false;
  weapon = id_weapon_machinegun;
  ammo = -1;
  showName = true;
  constructor() {
    this.#obj_particleTrails.fixedColor = true;
    this.#obj_particleTrails.style = this.#M[id_weapon_machinegun];
  }
  update(deltatime: number) {
    if (this.inGame) {
      let g = 400,
        l;
      this.#ea && this.weapon == id_weapon_superweapon && (g = 800);
      if (func_isInsideBox(this.x, this.y, g)) {
        if (!this.#pa) {
          if (this.#obj_particleTrails) this.#obj_particleTrails.clear();
          if (this.#obj_particleFlags) this.#obj_particleFlags.clear();
          this.#pa = true;
        }
      } else this.#pa = false;
      let g2 = this.weapon == id_weapon_superweapon && this.isShooting;
      if (0 < this.#num_spawn_cooldown_ms) {
        this.#f -= deltatime;
        if (0 > this.#f) {
          this.#f = 100;
          this.#d = !this.#d;
        }
        this.#num_spawn_cooldown_ms -= deltatime;
      }
      // objG_followMode.moveLeft && (this.controlAngle += this.rotSpeed);
      // objG_followMode.moveRight && (this.controlAngle -= this.rotSpeed);
      if (360 < this.controlAngle) this.controlAngle = 0;
      else if (0 > this.controlAngle) this.controlAngle = 360;
      let k = func_clamp(
        (frametime_millis - this.lastUpdate) / num_global_physics_step_ms,
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
      if (this.#obj_particleTrails) {
        this.#obj_particleTrails.setPosition(k, m);
        if (objG_eventManager.isSpaceWars()) {
          this.#obj_particleTrails.width = 0.6;
          if (this.id == qa && "#00FF00" != this.#obj_particleTrails.style)
            this.#obj_particleTrails.style = "#00FF00";
        }
      }
      this.#obj_particleFlags && this.#obj_particleFlags.setPosition(k, m);
      let k2 =
        !this.hover &&
        !this.#obj_particleManager &&
        !this.isInvulnerable() &&
        !g2;
      if (k2) {
        if (false == this.hadHover) {
          this.hadHover = true;
          this.#obj_particleTrails.push();
        }
      } else this.hadHover = false;
      if (this.#obj_particleTrails) {
        this.#obj_particleTrails.enabled = !!k2;
        this.#obj_particleTrails.update(deltatime);
      }
      if (this.#obj_particleFlags) {
        this.#obj_particleFlags.enabled = !!k2;
        this.#obj_particleFlags.update(deltatime);
      }
      let k3 = room_height / 2;
      let m2 = k3 - 150;
      if (this.y > m2 && this.y < k3 && 0 >= this.#h) {
        this.#h = 5;
        l = Math.random() / 2;
        m2 = (0.5 + (0.5 - ((k3 - this.y) / (k3 - m2)) * 0.5)) * (0.95 + l);
        l = 20 * Math.sin(this.angle);
        obj_particleImpacts.addSplash(
          this.x - l,
          k3 + 5 * Math.random(),
          m2,
          true,
        );
      }
      this.#h -= deltatime;
      if (this.#obj_particleManager) {
        let k2 = this.x + 12 * Math.sin(-this.angle);
        let m = this.y + 12 * Math.cos(-this.angle);
        this.#obj_particleManager.setPosition(k2, m);
        this.#obj_particleManager.update(deltatime);
      }
      if (objG_player_plane == this) {
        time_since_boost_pickup =
          0 == ha ? time_since_boost_pickup + deltatime : 0;
      }
      if (2 != ha) {
        if (objD_planes[gb]) {
          this.#w = Math.sqrt(time_since_boost_pickup / boost_time);
          if (1 < this.#w) this.#w = 1;
          this.#s -= deltatime;
          if (0 >= this.#s) {
            if (0 == ha) {
              this.#s = 0.7 > this.#w ? 200 + this.#s : 80 + this.#s;
              objG_sfxManager.playSound(str_sfxid_lockon, 0.1, 1, const_Q_0);
            } else if (1 == ha) {
              objGUI_gameInfo.showTargetLockedMessage();
              this.#s = 50 + this.#s;
              objG_sfxManager.playSound(str_sfxid_lockon, 0.1, 1.58, const_Q_0);
            }
          }
        }
      } else {
        this.#s = 0;
        objGUI_gameInfo.clearTargetLockedMessage();
      }
      if (0 < ma) {
        this.#t -= deltatime;
        if (0 > this.#t) {
          this.#t = 100;
          objG_sfxManager.playSound(str_sfxid_lockon, 0.1, 0.5, const_Q_0);
        }
      } else this.#t = 0;
      if (this == objG_player_plane) {
        if (!ia) {
          objG_sfxManager.playSound(
            str_sfxid_planeloop,
            0.6,
            1,
            const_Q_0,
            (a) => {
              ia = a;
            },
          );
        }
        if (!na) {
          objG_sfxManager.playSound(
            str_sfxid_waterloop,
            0,
            1,
            const_Q_0,
            (a) => {
              na = a;
            },
          );
        }
        let k2 = (room_height / 2 - this.y) / 1e3;
        if (1 < k2) k2 = 1;
        if (ia) {
          let m = objG_sfxManager.sound._nodeById(ia);
          objG_sfxManager.sound.volume(0.5 * num_max_volume, ia);
          if (0.01 > k2 && !objG_eventManager.isSpaceWars()) {
            if (m && m.bufferSource) m.bufferSource.playbackRate.value = 0.1;
          } else {
            l = this.speed / 30;
            if (1 < l) l = 1;
            this.#x += (0.3 + 0.8 * l - this.#x) / 30;
            if (m && m.bufferSource)
              m.bufferSource.playbackRate.value = this.#x;
          }
        }
        if (na) {
          m2 = 0;
          if (0.2 > k2 && 0.01 < k2 && !objG_eventManager.isSpaceWars())
            m2 = 1.7 * (0.2 - k2);
          objG_sfxManager.sound.volume(m2 * num_max_volume, na);
        }
      }
      if (g2) {
        let k2 = func_calculateDistance2D(this.x, this.y, H.x, H.y);
        let g2 = 1 - k2 / 3e3;
        if (1 < g2) g2 = 1;
        if (0.1 > g2) g2 = 0;
        if (0 == this.#Fa) {
          objG_sfxManager.playSound(
            str_sfxid_lasershot,
            0.2 * g2,
            0.5,
            const_Q_0,
          );
          if (!this.#ua)
            objG_sfxManager.playSound(
              str_sfxid_laserloop,
              0.2 * g2,
              1,
              const_Q_0,
              (a) => {
                nb = this.#ua = a;
              },
            );
        } else if (this.#ua)
          objG_sfxManager.sound.volume(0.2 * g2 * num_max_volume, this.#ua);
        this.laserTimer += deltatime;
        this.#Fa += deltatime;
      } else this.stopLaserSound();
      if (
        this.#obj_particleManager &&
        this.weapon == id_weapon_punch &&
        1 < this.ammo
      )
        this.ammo = 1;
      if (0 < this.#q) this.#q -= deltatime;
      if (this.#obj_scoreAccumInfo) this.#obj_scoreAccumInfo.update(deltatime);
      if (0 < this.#R) this.#R -= deltatime;
    }
  }
  getCurrentFrameNum(ctx: CanvasRenderingContext2D) {
    if (this.#g == undefined) return 0;
    let a = Math.floor(this.#g / ((2 * Math.PI) / 28)) + 1;
    return (a = this.#r[(a - 1) % 14]);
  }
  draw(ctx: CanvasRenderingContext2D, deltatime: number) {
    if (this.inGame && this.#pa) {
      let e, f, K, s, v, R, w, S, O, t;
      this.#obj_particleTrails && this.#obj_particleTrails.draw(ctx);
      this.#obj_particleFlags && this.#obj_particleFlags.draw(ctx);
      if (!this.#obj_particleManager) {
        ctx.save();
        ctx.translate(this.x, this.y);
        this.timeToNextFrame -= deltatime;
        if (0 >= this.timeToNextFrame) {
          this.flameState = !this.flameState;
          this.timeToNextFrame = this.frameSwitchTime;
        }
        if (this.hover) {
          objG_eventManager.isSpaceWars()
            ? ctx.scale(0.5, 0.5)
            : ctx.scale(0.8, 0.8);
        }
        this.flameState && ctx.scale(0.88, 0.88);
        ctx.rotate(this.angle - Math.PI / 2);
        ctx.translate(-23, 0);
        this.isInvulnerable() && this.#d && (ctx.globalAlpha = 0.3);
        objG_assets.frames.throttleFlame.draw(ctx);
        ctx.restore();
      }
      this.#g =
        Math.abs((this.angle - Math.PI / 2) % (2 * Math.PI)) +
        (2 * Math.PI) / 28 / 2;
      0 < this.angle - Math.PI / 2 && (this.#g = 2 * Math.PI - this.#g);
      this.flipLastImage =
        this.#g > 0.5 * Math.PI && this.#g < 1.5 * Math.PI ? -1 : 1;
      if (0 < this.#q) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(0.8, 0.8 * this.flipLastImage);
        ctx.rotate((this.angle - Math.PI / 2) * this.flipLastImage);
        ctx.translate(-15, -4);
        e = 1;
        60 > this.#q
          ? (e = this.#q / 60)
          : 240 < this.#q && (e = (300 - this.#q) / 60);
        ctx.globalAlpha = e;
        objG_assets.frames.punch.draw(ctx);
        ctx.restore();
      }
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(0.7, 0.7);
      ctx.rotate(this.angle - Math.PI / 2);
      if (this.#obj_particleManager) {
        this.#k -= deltatime;
        if (0 > this.#k) {
          this.#k = this.#m;
          this.#y++;
          if (8 == this.#y) this.#l *= -1;
        }
        this.#y %= 14;
        e = this.#r[this.#y];
      } else {
        this.#y = e = this.getCurrentFrameNum(ctx);
      }
      ctx.scale(1, this.flipLastImage * this.#l);
      this.lastImage = this.planeImages[e - 1] ?? this.planeImages[0];
      this.lastImageReflex =
        this.planeImagesReflex[e - 1] ?? this.planeImagesReflex[0];
      this.isInvulnerable() && this.#d && (ctx.globalAlpha = 0.3);
      this.lastImage.draw(ctx);
      f = this.decalFrames[e - 1] ?? this.decalFrames[0];
      f.draw(ctx);
      if (16 < this.speed) {
        (this.#C += 0.06), 0.9 < this.#C && (this.#C = 0.9);
      } else {
        (this.#C -= 0.06), 0 > this.#C && (this.#C = 0);
      }
      ctx.rotate(-Math.PI / 2);
      ctx.translate(0, 8);
      this.#P++;
      if (1 < this.#P) {
        this.#P = 0;
      }
      if (0 == this.#P) {
        this.#z += 1;
        if (2 < this.#z) this.#z = 0;
      }
      ctx.globalAlpha = this.#C;
      objG_assets.frames["turbo" + this.#z].draw(ctx);
      ctx.restore();
      if (0 < this.highlightValue && !this.isInvulnerable()) {
        this.highlightValue -= 0.05;
        0 > this.highlightValue && (this.highlightValue = 0);
        ctx.save();
        ctx.translate(this.x, this.y - 1);
        ctx.scale(0.7, 0.7);
        ctx.rotate(this.angle - Math.PI / 2);
        ctx.globalAlpha = this.highlightValue;
        e = objG_assets.whitePlaneImages["plane" + e];
        if (this.#g > 0.5 * Math.PI && this.#g < 1.5 * Math.PI)
          ctx.scale(1.2, -1.2);
        else ctx.scale(1.2, 1.2);
        if (e) ctx.drawImage(e, -e.width / 2, -e.height / 2);
        ctx.restore();
      }
      this.#obj_particleManager && this.#obj_particleManager.draw(ctx);
      if (this.weapon == id_weapon_superweapon) {
        e = false;
        (this.#g > 0.5 * Math.PI && this.#g < 0.5 * Math.PI + Math.PI) ||
          (e = true);
        if (this.isShooting) {
          ctx.save();
          K = this.x - 10 * this.#Ga;
          s = this.y - 10 * this.#D;
          f = 500;
          if (this.#ea) f = Math.sqrt(K * K + s * s) - 10;
          if (100 > f) f = 100;
          v = objG_assets.frames.laser_opening.height;
          R = this.#Fa / 50;
          w = 1;
          S = 0.75 * Math.PI;
          K = false;
          if (R > S) {
            R = R < 2 * S ? R - S : S;
            w = Math.sin(0.04 * this.#Fa);
          } else K = true;
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle + Math.PI);
          e ? ctx.translate(2, 22) : ctx.translate(-2, 22);
          O = s = Math.sin(R) / Math.sin(S);
          t = true;
          if (K) {
            if (R < 0.5 * Math.PI) t = false;
            else {
              R -= 0.5 * Math.PI;
              O = Math.sin(R) / Math.sin(S);
            }
          }
          if (t) {
            ctx.scale((1 + 0.2 * w) * O, 1);
            ctx.translate(0, v / 2);
            objG_assets.frames.laser_opening.draw(ctx);
            f -= v;
            ctx.translate(0, f / 2 + v / 2 - 1);
            ctx.scale(1, f);
            objG_assets.frames.laser_stretch.draw(ctx);
            ctx.scale(1, 1 / f);
            ctx.translate(0, f / 2 - 10);
            if (50 < this.laserTimer) {
              this.laserTimer = 0;
              this.laserFrame = (this.laserFrame + 1) % 3;
            }
            if (this.#ea)
              objG_assets.frames["laser_collision" + this.laserFrame].draw(ctx);
            else {
              f = objG_assets.frames.laserfade.width;
              ctx.rotate(Math.PI / 2);
              ctx.translate(f / 2, 0);
              objG_assets.frames.laserfade.draw(ctx);
            }
          }
          ctx.restore();
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle + Math.PI);
          if (e) ctx.translate(2, 22);
          else ctx.translate(-2, 22);
          if (K) {
            ctx.scale(s, s);
            ctx.translate(0, 15);
            ctx.beginPath();
            ctx.arc(0, 0, 15, 0, 2 * Math.PI);
            ctx.fill();
          }
          ctx.restore();
        }
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI);
        ctx.translate(-3, 18);
        if (e) {
          ctx.scale(-1, 1);
          ctx.translate(-6, 0);
        }
        ctx.rotate(-Math.PI / 2);
        objG_assets.frames.laserplug.draw(ctx);
        ctx.restore();
      }
    }
  }
  drawReflection(ctx: CanvasRenderingContext2D, deltatime: number) {
    if (this.inGame && this.#pa && this.#g != undefined) {
      let b = room_height / 2,
        d = b - this.y;
      if (!(0 > d || 170 < d)) {
        let h = d / 170;
        ctx.save();
        ctx.translate(this.x, b + d - 25);
        ctx.scale(0.8, 0.8 * -this.flipLastImage * (1 + 4 * h));
        if (this.#g > 0.5 * Math.PI && this.#g < 1.5 * Math.PI)
          ctx.rotate(1.5 * Math.PI + (this.#g - Math.PI / 2) + Math.PI);
        else ctx.rotate(this.angle - Math.PI / 2);
        b = 1;
        if (30 > d && 15 <= d) b = (d - 15) / 15;
        else 15 > d && (b = 0);
        ctx.globalAlpha = 0.7 * (1 - h) * b;
        this.lastImageReflex?.draw(ctx);
        ctx.restore();
      }
    }
  }
  drawInput(ctx: CanvasRenderingContext2D) {
    if (this.inGame) {
      let c = -objG_inputManager.angle + Math.PI;
      let b = objG_inputManager.hover ? 0.3 : 1;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(c);
      ctx.translate(0, -28 - 10 * b);
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.beginPath();
      ctx.moveTo(-8.8 * b, 0);
      ctx.lineTo(8.8 * b, 0);
      ctx.lineTo(0, -22 * b);
      ctx.fill();
      ctx.restore();
      let obj_plane = objD_planes[gb];
      if (2 != ha && obj_plane)
        this.DrawLockCrosshair(ctx, obj_plane.x, obj_plane.y, this.#w, ha);
      0 < ma && this.DrawLockCrosshair(ctx, this.x, this.y, 1, 1);
      ctx.lineWidth = 1;
      ctx.beginPath();
      if (objG_eventManager.isSpaceWars())
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
      else ctx.strokeStyle = "rgba(0,0,255,0.1)";
      ctx.arc(this.x, this.y, 75, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
  DrawLockCrosshair(
    a: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    if (this.inGame) {
      a.lineWidth = 4;
      a.save();
      let h = 1;
      0 == ha && (h = 1 + 2 * (1 - width));
      a.beginPath();
      let color = "hsla(43,100%," + (100 - 40 * width) + "%,1.0)";
      if (1 == height) color = "rgba(255,0,0,1.0)";
      else a.setLineDash([12 * h, 6 * h, 12 * h, 0]);
      a.strokeStyle = color;
      height = 30 * h;
      a.rect(x - height / 2, y - height / 2, height, height);
      a.stroke();
      a.restore();
    }
  }
  drawInfo(ctx: CanvasRenderingContext2D) {
    if (this.inGame && this.#pa) {
      let c, d;
      ctx.save();
      ctx.translate(this.x, this.y);
      if (!objG_eventManager.isInstagib()) {
        ctx.fillStyle = "rgba(126,219,226,1)";
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 1;
        c = 28;
        if (qa == this.id) c *= 2;
        d = 127.5;
        if (127.5 > this.energy && 63.75 < this.energy) d = 30;
        else if (63.75 > this.energy) d = 0;
        ctx.fillStyle = "hsl(" + d + ", 100%, 50%)";
        ctx.fillRect(-c / 2 + 0, 20, (this.energy / 255) * c, 8);
        ctx.strokeStyle = "rgba(255,255,255,1.0)";
        ctx.strokeRect(-c / 2, 20, c, 8);
      }
      if (this.#G && !lb) {
        ctx.fillStyle = "rgba(255,255,255,1)";
        ctx.fillStyle = "rgba(255,255,255,1.0)";
        ctx.font =
          "Bold 15px 'proxima-nova-1','proxima-nova-2', arial, sans-serif";
        ctx.textBaseline = "hanging";
        c = ctx.measureText(this.name).width;
        d = 38;
        objG_eventManager.isInstagib() && (d = 20);
        ctx.fillText(this.name, -c / 2, d);
      }
      ctx.restore();
      c = false;
      if (qa == this.id) c = true;
      d = false;
      if (ub == this.id) d = true;
      if (c || 0 < this.#R || this.#O || d) {
        ctx.save();
        ctx.translate(this.x, this.y - 30);
        if (this.#O) objG_assets.frames.pause.draw(ctx);
        else if (c) objG_assets.frames.crown.draw(ctx);
        else if (d) objG_assets.frames.revengeIcon.draw(ctx);
        else objG_assets.frames.frenzyIcon.draw(ctx);
        ctx.restore();
      }
      if (this.#obj_scoreAccumInfo) {
        ctx.save();
        d = 0;
        if (c) d = 30;
        ctx.translate(this.x, this.y - d);
        this.#obj_scoreAccumInfo.draw(ctx);
        ctx.restore();
      }
    }
  }
  setPose(x_gu: number, y_gu: number, angle: number) {
    this.origX = this.x;
    this.origY = this.y;
    this.origAngle = this.dstAngle;
    this.dstX = 10 * x_gu;
    this.dstY = 10 * y_gu;
    this.dstAngle = angle;
    if (this.first_set) {
      this.origX = this.dstX;
      this.origY = this.dstY;
      this.x = this.dstX;
      this.y = this.dstY;
      this.origAngle = this.dstAngle;
      this.first_set = false;
      if (!objG_wsConnection.firstClientListing)
        this.#num_spawn_cooldown_ms = 1e3 * spawn_cooldown_time;
    } else {
      x_gu = this.dstX - this.origX;
      y_gu = this.dstY - this.origY;
      this.speed = Math.sqrt(x_gu * x_gu + y_gu * y_gu) / 3;
    }
    if (!this.inGame) {
      this.inGame = true;
      this.#obj_particleTrails && this.#obj_particleTrails.clear();
      this.#obj_particleFlags && this.#obj_particleFlags.clear();
    }
  }
  trailEffect() {
    wa && this.#obj_particleTrails && this.#obj_particleTrails.trailEffect();
  }
  hit(a: number) {
    func_isTimeElapsed_50ms() && (this.highlightValue = 1);
  }
  setScore(score: number) {
    let diff = score - this.score;
    if (0 < diff && this == objG_player_plane) {
      if (!this.#obj_scoreAccumInfo)
        this.#obj_scoreAccumInfo = new ScoreAccumInfo();
      if (func_isTimeElapsed_50ms()) this.#obj_scoreAccumInfo.addScore(diff);
    }
    this.score = score;
  }
  incScore(diff: number) {
    this.setScore(this.score + diff);
  }
  setName(name: string) {
    this.name = name;
    if ("" == name || null == name) {
      this.#obj_particleTrails = new ParticleTrails();
      this.#obj_particleTrails.fixedColor = true;
      this.#obj_particleTrails.style = this.#M[id_weapon_machinegun];
      this.#obj_particleTrails.clear();
    }
  }
  setFlagInfo(uint32_flaginfo: number) {
    if (0 < uint32_flaginfo) {
      let stringScale = uint32_flaginfo & 255;
      uint32_flaginfo >>= 8;
      let scale = uint32_flaginfo & 255;
      uint32_flaginfo >>= 8;
      let flipY = 0 < (uint32_flaginfo & 4) ? true : false;
      let flipX = 0 < (uint32_flaginfo & 2) ? true : false;
      this.#G = 0 < (uint32_flaginfo & 8) ? true : false;
      this.#obj_particleFlags = new ParticleFlags();
      this.#obj_particleFlags.flipX = flipX;
      this.#obj_particleFlags.flipY = flipY;
      this.#obj_particleFlags.scale = scale / 100;
      this.#obj_particleFlags.stringScale = stringScale / 100;
      this.#obj_particleFlags.setTexture(this.name);
    } else this.showName = true;
    this.#obj_particleTrails = new ParticleTrails();
    this.#obj_particleTrails.fixedColor = true;
    this.#obj_particleTrails.style = this.#M[id_weapon_machinegun];
    this.#obj_particleTrails.clear();
  }
  setEnergy(hp: number) {
    this.energy = hp;
    if (25 > hp && !this.#obj_particleManager) {
      this.#obj_particleManager = new ParticleManager();
      this.#obj_particleManager.init(15, this.x, this.y);
      this.#k = 0;
      this.#m = 20 + 40 * Math.random();
      if (objG_player_plane == this) {
        objG_sfxManager.playSound(str_sfxid_crash, 0.7, 1, const_Q_0);
        objGUI_gameInfo.clearNearMiss();
      }
    } else if (25 <= hp && this.#obj_particleManager) {
      this.#obj_particleManager = undefined;
      this.#l = 1;
    }
  }
  GetAmmo() {
    return 1 == this.weapon ? -1 : this.ammo;
  }
  setColorID(id_color: number) {
    this.colorID = id_color;
    this.decalFrames = objG_assets.planes[this.decalID][this.colorID];
  }
  setDecalID(id_decal: number) {
    this.decalID = id_decal;
    this.decalFrames = objG_assets.planes[this.decalID][this.colorID];
  }
  setColorHue(hue: number) {
    this.colorHue = hue;
  }
  getSpeedDirectionX() {
    return this.x - this.prevX;
  }
  getSpeedDirectionY() {
    return this.y - this.prevY;
  }
  setRank(rank: number) {
    this.rank = rank;
  }
  isInvulnerable() {
    return 0 < this.#num_spawn_cooldown_ms;
  }
  setWeapon(flag_weapon: number) {
    this.#obj_particleTrails.style = this.#M[flag_weapon];
    this.#obj_particleTrails.width = 1;
    this.weapon = flag_weapon;
  }
  cleanup() {
    ia && objG_sfxManager.sound.stop(ia);
    na && objG_sfxManager.sound.stop(na);
    this.stopLaserSound();
    na = ia = undefined;
    this.first_set = true;
    this.inGame = false;
    objGUI_gameInfo.clearTargetLockedMessage();
    ma = 0;
  }
  setFrenzy() {
    this.#R = 1e4;
  }
  incKills() {
    this.#S++;
  }
  getKills() {
    return this.#S;
  }
  setPaused(flag_4: number) {
    this.#O = flag_4 ? true : false;
  }
  setIsBot(flag_1024: number) {
    this.isBot = flag_1024 ? true : false;
  }
  setIsShooting(flag_2048: number) {
    if (!flag_2048 && this.isShooting) this.laserTimer = this.#Fa = 0;
    this.isShooting = flag_2048 ? true : false;
  }
  laserHit(a: number, c: number, b: boolean) {
    this.#Ga = a;
    this.#D = c;
    this.#ea = b;
  }
  prepareFollow() {}
  stopLaserSound() {
    if (this.#ua) {
      objG_sfxManager.sound.stop(this.#ua);
      this.#ua = nb = undefined;
    }
  }
  dash() {
    this == objG_player_plane &&
      objG_sfxManager.playSound(str_sfxid_woosh, 0.15, 1, const_Q_0);
    this.#q = 300;
  }
  dashing() {
    return 0 < this.#q;
  }
  clearTrail() {
    this.#obj_particleTrails && this.#obj_particleTrails.clear();
  }
}
class WaterSea {
  #e: number[];
  #f: number[];
  #d?: number;
  #a?: number;
  #c?: number;
  #g?: number;
  #h: WaterSeaRipple[] = [];
  #q = 0;
  constructor() {
    this.#e = [];
    this.#f = [];
    for (let a = 0; 25 > a; a++) {
      this.#e.push(0);
      this.#f.push(0);
    }
  }
  #b(a: number, c: number) {
    0 <= a && 24 > a && (this.#f[a] += c);
  }
  update(deltatime: number) {
    let k, m, l, y;
    this.#c = (1.1 * canvas.width) / objGUI_anchor.zoom;
    this.#g = this.#c / 25;
    this.#a = Math.floor(H.x / this.#g);
    if (null != this.#d && this.#d != this.#a) {
      if (0 < this.#d - this.#a) {
        this.#f.splice(24, 24);
        this.#f.splice(0, 0, 0);
        this.#e.splice(24, 24);
        this.#e.splice(0, 0, 0);
      } else {
        this.#f.splice(0, 1);
        this.#f.push(0);
        this.#e.splice(0, 1);
        this.#e.push(0);
      }
    }
    this.#d = this.#a;
    for (k = 0; 25 > k; k++) this.#e[k] = 2 * this.#f[k] - this.#e[k];
    k = this.#f;
    this.#f = this.#e;
    this.#e = k;
    k = this.#f[0];
    m = this.#f[0];
    l = this.#f[1];
    this.#f[0] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
    this.#f[0] = func_clamp(this.#f[0], -100, 100);
    for (y = 1; 24 > y; ++y) {
      k = m;
      m = l;
      l = this.#f[y + 1];
      this.#f[y] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
      this.#f[y] = func_clamp(this.#f[y], -100, 100);
    }
    k = m;
    m = l;
    this.#f[24] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
    this.#f[24] = func_clamp(this.#f[24], -100, 100);
    k = m;
    m = l;
    this.#f[0] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
    this.#f[0] = func_clamp(this.#f[0], -100, 100);
    k = m;
    m = l;
    this.#f[1] = 0.99 * (0.9 * m + 0.5 * (k + l) * (1 - 0.9));
    this.#f[1] = func_clamp(this.#f[1], -100, 100);
    k = m;
    this.#f[24] = 0.99 * (0.9 * l + 0.5 * (k + l) * (1 - 0.9));
    this.#f[24] = func_clamp(this.#f[24], -100, 100);
    k = Math.floor(24 * Math.random());
    m = (20 * Math.random()) / 20;
    this.#f[k - 1] += m / 2;
    this.#f[k] += m;
    this.#f[k + 1] += m / 2;
    l = objGUI_anchor.getBounds();
    if (l[1].y > room_height / 2) {
      k = this.#h.length;
      this.#q -= deltatime;
      if (0 > this.#q) {
        this.#q = 125.6;
        if (20 > k) {
          m = new WaterSeaRipple();
          this.#h.push(m);
          l = l[1].x - l[0].x;
          y = 0;
          if (objG_player_plane)
            y = 50 * objG_player_plane.getSpeedDirectionX();
          l = Math.random() * l - l / 2 + y;
          y = 250 * Math.random();
          m.setPosition(l + H.x, room_height / 2 + y + 30, y);
        }
      }
      l = [];
      for (y = 0; y < k; y++)
        (m = this.#h[y]), m.update(deltatime), m.deleting && l.push(m);
      for (deltatime = 0; deltatime < l.length; deltatime++)
        (k = this.#h.indexOf(l[deltatime])), this.#h.splice(k, 1);
      l.length = 0;
    }
  }
  drawBehind(ctx: CanvasRenderingContext2D) {
    let c = room_height / 2 - H.y,
      b = 0.5 + (c / (room_height / 2)) * 6;
    this.drawWaterArea(ctx, 2 * b, "rgba(9,188,255,1.0)", 100, 0.25, 0.6, c);
    c = room_height / 2 - H.y;
    b = 0.5 + (c / (room_height / 2)) * 6;
    this.drawWaterArea(ctx, 4 * b, "rgba(8,164,254,1.0)", 100, 0.75, 0.8, c);
    this.drawWaterArea(ctx, 13 * b, "rgba(7,142,252,1.0)", 1e3, 0, 1, c);
  }
  drawFront(ctx: CanvasRenderingContext2D) {
    if (this.#a == undefined || this.#g == undefined || this.#c == undefined)
      return;
    let d = room_height / 2 - H.y,
      e = this.#a * this.#g,
      f = room_height / 2 + -30,
      q = ctx.createLinearGradient(0, f, 0, f + (600 + 2 * d));
    q.addColorStop(0, "rgba(7,142,252,1.0)");
    q.addColorStop(0.55, "rgba(0,132,232,1.0)");
    q.addColorStop(1, "rgba(0,90,190,1.0)");
    ctx.fillStyle = q;
    ctx.beginPath();
    ctx.moveTo(e + this.#g - this.#c / 2, f + 30);
    ctx.lineTo(e + this.#g + this.#c / 2, f + 30);
    ctx.lineTo(e + 25 * this.#g - this.#c / 2, 1030 + f);
    ctx.lineTo(e + this.#g - this.#c / 2, 1030 + f);
    ctx.fill();
    ctx.restore();
    e = this.#h.length;
    for (f = 0; f < e; f++) this.#h[f].draw(ctx, d);
  }
  drawWaterArea(
    ctx: CanvasRenderingContext2D,
    d: number,
    fill_color: string,
    e: number,
    q: number,
    r: number,
    K: number,
  ) {
    if (this.#a == undefined || this.#g == undefined || this.#c == undefined)
      return;
    K = this.#a * this.#g;
    let p = room_height / 2 + -30;
    ctx.save();
    ctx.fillStyle = fill_color;
    ctx.beginPath();
    ctx.moveTo(K + this.#g - this.#c / 2, this.#f[0] * r + p + d);
    for (let i = 1; 25 > i; i++) {
      let s = (i + Math.floor(25 * q)) % 25;
      ctx.lineTo(K + (i + 1) * this.#g - this.#c / 2, this.#f[s] * r + d + p);
    }
    ctx.lineTo(K + 25 * this.#g - this.#c / 2, e + d + p);
    ctx.lineTo(K + this.#g - this.#c / 2, e + d + p);
    ctx.fill();
    ctx.restore();
  }
  disturbSurface(c: number, d: number) {
    if (this.#a == undefined || this.#g == undefined) return;
    let h = Math.floor(c / this.#g) - this.#a + 12.5;
    this.#b(h - 2, d / 2);
    this.#b(h - 1, d / 2);
    this.#b(h, d);
    this.#b(h + 1, d / 2);
    this.#b(h + 2, d / 2);
  }
}
class WaterSeaRipple {
  #bezier = [
    118.17, 11.98, 26.9, -3.43, 1.91, -19.41, 0.45, -19.48, -0.82, -19.55,
    -52.05, 2.79, -118.88, 11.55, -121.21, 11.85, -0.57, -3.74, 0.26, -4.04,
    0.57, -4.15, 121.8, 12.59, 118.17, 11.98,
  ];
  #x!: number; // setPosition()
  #y!: number; // setPosition()
  #scale!: number; // setPosition()
  #a!: number; // setPosition()
  #c = 0;
  deleting = false;
  speed = 0.02;
  setPosition(x: number, y: number, scale: number) {
    this.#x = x;
    this.#y = y;
    this.#scale = scale;
    this.#a = this.#scale / 250;
  }
  update(deltatime: number) {
    this.#c += (deltatime / 1e3) * this.speed * 60;
    this.#c >= Math.PI && (this.deleting = true);
  }
  draw(ctx: CanvasRenderingContext2D, h: number) {
    if (!this.deleting) {
      let q, n;
      ctx.save();
      q = Math.sin(this.#c);
      ctx.globalAlpha = Math.sqrt(q);
      ctx.translate(this.#x, this.#y - 4 * this.#c + (h / 500) * 150 * this.#a);
      ctx.scale(0 + 1 * q, 0 + 0.8 * q);
      ctx.translate(0, -20);
      ctx.fillStyle = "#b3dff9";
      ctx.beginPath();
      (q = this.#bezier.length), (n = 0.1 + 0.9 * this.#a);
      ctx.moveTo(this.#bezier[0] * n + 0, this.#bezier[1] * n + 0);
      for (let k = 2; k < q; k += 6)
        ctx.bezierCurveTo(
          this.#bezier[k] * n + 0,
          this.#bezier[k + 1] * n + 0,
          this.#bezier[k + 2] * n + 0,
          this.#bezier[k + 3] * n + 0,
          this.#bezier[k + 4] * n + 0,
          this.#bezier[k + 5] * n + 0,
        );
      ctx.fill();
      ctx.restore();
    }
  }
}
class Clouds {
  #cloud_bezier = [
    [
      -142.21, -1.18, -143.28, 0.36, -123.09, 11.23, -103.01, 13.96, -81.96,
      16.82, -65.17, 14.9, -64.36, 15.65, -41.42, 37.12, -28.62, 36.17, -16.75,
      36.02, 18.19, 35.56, 38.19, 16.67, 39.3, 18.03, 50.57, 31.83, 67.87,
      39.26, 84.68, 33.47, 95.27, 29.83, 123.57, 5.67, 121.35, -3.74, 118.45,
      -15.98, 89.66, -8.14, 88.44, -10.77, 74.28, -41.45, 51.47, -22.75, 50.8,
      -23.76, 38.13, -43.02, 24.97, -62.52, -2.75, -60.1, -31.37, -57.6, -55.13,
      -17.35, -55.49, -17.57, -98.49, -44.18, -132.86, -14.55, -142.21, -1.18,
    ],
    [
      -162.55, -1.68, -169.22, -19.07, -134.4, -35.44, -105.42, -35.13, -45.5,
      -34.48, -16.08, -8.51, 20.84, -12.63, 32.11, -13.89, 20.28, -39.57, 35.04,
      -45.63, 50.56, -52, 67.52, -44.38, 81.19, -32.08, 94.38, -20.22, 83.96,
      -10.24, 86.36, -8.17, 92.3, -3.06, 110.55, -8.9, 114.01, -1.75, 116.98,
      4.4, 87.88, 27.98, 55.69, 21.98, 53.83, 21.64, 55.47, 33.56, 20.71, 36.54,
      5.28, 37.87, -8.91, 30.47, -14.55, 25.77, -17.17, 23.58, -33.82, 38.42,
      -52.98, 36.38, -65.86, 35.01, -74.62, 20.26, -78.34, 16.38, -80.92, 13.67,
      -151.51, 27.09, -162.55, -1.68,
    ],
    [
      -132.9, 30.86, -125.9, 10.58, -96.55, -22.97, -85.94, -23.79, -61.71,
      -25.67, -53.16, -17.53, -50.03, -17.63, -46.79, -17.74, -37.17, -49.76,
      -6.45, -50.02, 26.73, -50.29, 38.01, -16.34, 44.61, -16.75, 52.59, -17.25,
      57.84, -24.32, 79.01, -23.54, 98.83, -22.8, 96.09, -12.23, 103.77, -9.21,
      111.97, -5.97, 134.38, -11.68, 144.73, 7.12, 152.17, 20.65, 110.44, 38.48,
      91.74, 39.3, 47.05, 41.27, -50.64, 19.62, -67.45, 24.81, -90.4, 31.9,
      -100.01, 37.45, -121.08, 38.84, -125.4, 39.13, -134.8, 36.38, -132.9,
      30.86,
    ],
    [
      -142.3, 3.86, -142.68, -5.86, -66.59, -26.42, -45.57, -34.65, -22.55,
      -43.64, -21.3, -84.89, 5.81, -86.9, 25.18, -88.34, 99.82, -49.94, 103.2,
      -10.26, 104.1, 0.3, 137.86, -21.94, 136.83, -10.3, 133.75, 24.38, 117.81,
      21.85, 111.08, 24.7, 107.63, 26.15, 88.76, 26.4, 83.17, 23.68, 82.44,
      23.32, 49.7, 40.09, 19.75, 36.6, -18.88, 32.08, -37.22, 21.23, -53.51,
      11.08, -57.67, 8.49, -66.63, 26.07, -94.62, 26.33, -103.38, 26.41,
      -112.73, 24.98, -123.85, 15.85, -126.35, 13.8, -141.87, 14.59, -142.3,
      3.86,
    ],
    [
      -142.63, 14.15, -142.06, 12.44, -131.98, 6.01, -92.96, -13.64, -80.08,
      -20.13, -78.45, -40.22, -32.37, -45.14, 6.08, -49.25, 5.44, -26.43, 8.78,
      -26.51, 11.15, -26.56, 20.61, -40.86, 44.75, -43.15, 61.05, -44.69, 72.86,
      -34.19, 77.21, -31.3, 84.42, -26.5, 149.08, -20.62, 150.6, 0.29, 152.12,
      21.2, 123.52, 42.13, 64.54, 49.68, 23.28, 54.96, 37.73, 31.1, 25.32,
      30.57, 13.73, 30.07, -6.57, 48.69, -21.45, 46.17, -44.71, 42.24, -48.23,
      33.33, -81.8, 18.87, -122.06, 1.53, -142.83, 14.75, -142.63, 14.15,
    ],
    [
      -128.91, -3.91, -100.79, -29.51, -75.44, -28.12, -55.48, -25.64, -35.53,
      -23.16, -10.93, -12.78, 7.7, -16, 15.92, -17.42, 33.99, -43.08, 54.49,
      -43.88, 83.11, -44.99, 85.4, -21.07, 89.46, -21.25, 94.52, -21.48, 107.89,
      -29.23, 117.73, -3.17, 118.89, -0.07, 136.54, 16.66, 149.39, 19.53,
      149.68, 19.59, 95.95, 10.58, 17.5, 16.07, -5.04, 17.65, -60.8, 45.1,
      -108.87, 48.31, -130.84, 49.78, -145.13, 42.1, -143.01, 29.93, -140.38,
      14.79, -134.29, 0.99, -128.91, -3.91,
    ],
    [
      -105.63, 33.5, -112.73, 24.78, -104.42, 20.23, -104.9, 18.35, -106.19,
      13.28, -101.31, -5.25, -88.8, -11.01, -73.37, -18.1, -65.27, -18.01,
      -49.55, -16.92, -46.11, -16.68, -52.73, -32.67, -37.48, -39.53, -19.05,
      -47.81, 18.24, -26.76, 24.38, -21.56, 26.14, -20.07, 44.72, -32.26, 63.81,
      -26.11, 106.07, -12.51, 112.47, 3.21, 124.03, 10.2, 146.91, 24.05, 177.98,
      16.35, 176.28, 17.17, 108.58, 50.11, -0.39, 35.83, -2.15, 35.9, -18.66,
      36.6, -90.36, 52.25, -105.63, 33.5,
    ],
    [
      -515.42, -79.84, -511.96, -82.38, -492.91, -99.15, -444.49, -84.74,
      -379.42, -65.39, -353.57, -29.63, -347.84, -16.74, -347.52, -16.02,
      -326.45, -32.16, -294.56, -21.93, -266.34, -12.88, -255.45, 16.99,
      -233.61, 34.9, -195.97, 65.76, -153.63, 30.14, -135.04, 43.22, -79.08,
      82.59, 0.11, -91.66, 104.06, 4.27, 177.97, 72.49, 215.12, 9.81, 234.44,
      16.08, 252.34, 21.9, 289.03, 43.31, 332.29, 27.33, 368.2, 14.06, 416.81,
      -38.28, 429.68, -21.59, 445.63, -0.91, 440.5, -8.41, 442.5, -17, 454.3,
      -67.56, 497.46, -97.75, 506.29, -79.88, 515.12, -62.02, 527.33, 105.09,
      482.02, 105.88, 436.97, 106.67, -558.17, 136.12, -560.32, 90.04, -566.63,
      -45.23, -534.53, -65.79, -515.42, -79.84,
    ],
  ];
  #cloud_positions = [
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
  ];
  #rendered: HTMLCanvasElement[] = [];
  #d: number[][] = [];
  constructor() {
    for (let a = 0; a < this.#cloud_bezier.length; a++) {
      let c = this.#cloud_bezier[a],
        e = c.length,
        h = 9999,
        f = 9999,
        n = -9999,
        k = -9999,
        m = true;
      for (let l = 0; l < e; l++) {
        let y = c[l];
        if (m) {
          if (y < h) h = y;
          if (y > n) n = y;
        } else {
          if (y < f) f = y;
          if (y > k) k = y;
        }
        m = !m;
      }
      this.#d.push([h, f, n, k]);
    }
    this.preRender();
  }
  drawCloudShape(
    ctx: CanvasRenderingContext2D,
    c: number,
    b: number,
    d: number[],
    e: number,
  ) {
    ctx.beginPath();
    let f = d.length;
    ctx.moveTo(d[0] * e + c, d[1] * e + b);
    for (let k = 2; k < f; k += 6)
      ctx.bezierCurveTo(
        d[k] * e + c,
        d[k + 1] * e + b,
        d[k + 2] * e + c,
        d[k + 3] * e + b,
        d[k + 4] * e + c,
        d[k + 5] * e + b,
      );
    ctx.fill();
  }
  drawCloud(
    ctx: CanvasRenderingContext2D,
    c: number,
    g: number,
    h: number,
    e: number,
    opacity: number,
    k: number,
    m: number,
  ) {
    if (-7e3 > c) {
      c = (-c + 7e3) % 14e3;
      c = 7e3 - c;
    }
    let l = c + this.#d[h][0] * e,
      y = g + this.#d[h][1] * e,
      r = c + this.#d[h][2] * e,
      K = g + this.#d[h][3] * e,
      p = objGUI_anchor.getBounds();
    let bl =
      l > p[1].x || r < p[0].x || y > p[1].y || K < p[0].y ? false : true;
    if (bl) {
      ctx.save();
      ctx.fillStyle = "rgba(190,227,249," + opacity + ")";
      this.drawCloudShape(ctx, c, g, this.#cloud_bezier[h], e);
      ctx.clip();
      ctx.fillStyle = "rgba(179,222,250," + opacity + ")";
      this.drawCloudShape(ctx, c + k, g + m, this.#cloud_bezier[h], e);
      ctx.restore();
    }
  }
  drawPreRenderedCloud(
    a: CanvasRenderingContext2D,
    c: number,
    b: number,
    e: number,
    q: number,
    n: number,
  ) {
    if (-7e3 > c) {
      c = (-c + 7e3) % 14e3;
      c = 7e3 - c;
    }
    let k = this.#d[q][0],
      m = this.#d[q][1],
      l = c + k * n,
      y = b + m * n,
      r = c + this.#d[q][2] * n;
    q = b + this.#d[q][3] * n;
    let K = objGUI_anchor.getBounds();
    let bl =
      l > K[1].x || r < K[0].x || y > K[1].y || q < K[0].y ? false : true;
    if (bl) a.drawImage(this.#rendered[e], c + k * n, b + m * n);
  }
  update(deltatime: number) {
    cloud_pos_time -= 0.03 * deltatime;
  }
  drawClouds(ctx: CanvasRenderingContext2D) {
    for (let c = this.#cloud_positions.length, b = 0; b < c; b++) {
      let d = 2,
        f = this.#cloud_positions[b][0],
        n = this.#cloud_positions[b][1],
        k = 1,
        m = 1,
        l = 3,
        y = 9;
      if (0 == b % 2 && 7 != this.#cloud_positions[b][2]) {
        f += 0.2 * (H.x - f);
        n += 0.2 * (H.y - n);
        k = 0.2;
        m = 0.7;
        l = 1;
        y = 3;
        d = 0.5;
        n *= cloud_sprange_start_Y;
      } else if (7 == this.#cloud_positions[b][2]) {
        k = 0.8;
        n = cloud_sprange_end_Y;
      }
      this.drawCloud(
        ctx,
        f + (cloud_pos_time / 4) * d,
        n,
        this.#cloud_positions[b][2],
        this.#cloud_positions[b][3] * m,
        k,
        l,
        y,
      );
    }
  }
  drawPreRenderedClouds(ctx: CanvasRenderingContext2D) {
    let count = this.#cloud_positions.length,
      b = cloud_pos_time,
      d = cloud_sprange_start_Y;
    if (!xa) {
      d = 0.6;
      b = 200;
    }
    for (let f = 0; f < count; f++) {
      let n = 2,
        k = this.#cloud_positions[f][0],
        m = this.#cloud_positions[f][1],
        l = 1;
      if (0 == f % 2 && 7 != this.#cloud_positions[f][2]) {
        k += 0.2 * (H.x - k);
        m += 0.2 * (H.y - m);
        n = 0.5;
        m *= d;
        l = 0.7;
      } else if (7 == this.#cloud_positions[f][2]) m = cloud_sprange_end_Y;
      this.drawPreRenderedCloud(
        ctx,
        k + (b / 4) * n,
        m,
        f,
        this.#cloud_positions[f][2],
        this.#cloud_positions[f][3] * l,
      );
    }
  }
  preRender() {
    let count = this.#cloud_positions.length;
    for (let c = 1, i = 0; i < count; i++) {
      let h = this.#cloud_positions[i][2],
        q = -this.#d[h][0] + this.#d[h][2],
        n = -this.#d[h][1] + this.#d[h][3],
        k;
      k = document.createElement("canvas");
      let ctx = k.getContext("2d")!,
        l = (c = 1),
        y = 3,
        r = 9;
      if (0 == i % 2 && 7 != this.#cloud_positions[i][2]) {
        c = 0.2;
        l = 0.7;
        y = 1;
        r = 3;
      } else if (7 == this.#cloud_positions[i][2]) c = 0.8;
      l = this.#cloud_positions[i][3] * l;
      let K = -this.#d[h][0] * l,
        p = -this.#d[h][1] * l;
      k.width = q * l;
      k.height = n * l;
      ctx.fillStyle = "rgba(190,227,249," + c + ")";
      this.drawCloudShape(ctx, K, p, this.#cloud_bezier[h], l);
      ctx.clip();
      ctx.fillStyle = "rgba(179,222,250," + c + ")";
      this.drawCloudShape(ctx, K + y, p + r, this.#cloud_bezier[h], l);
      this.#rendered.push(k);
    }
  }
}
class Backgrounds {
  // #b: Backgrounds.Class_a[] = [];
  #e = 0;
  #obj_clouds = new Clouds();
  #c = false;
  waves = new WaterSea();

  // loadColliders(url: string) {
  //   let e = new XMLHttpRequest();
  //   e.open("GET", url, true);
  //   e.responseType = "arraybuffer";
  //   e.onload = (bin: ArrayBuffer) => {
  //     if ((bin = e.response)) {
  //       let g, f, m, l, y, v, u, r, p, s;
  //       let c = new DataView(bin);
  //       (g = 0), (f = c.getUint8(g)), (g = g + 1);
  //       if (191 != f) console.log("ERROR LOADING MAP FILE");
  //       else
  //         for (;;) {
  //           (m = c.getUint8(g)), (g = g + 1);
  //           if (0 == m) break;
  //           else if (
  //             1 == m ||
  //             2 == m ||
  //             3 == m ||
  //             4 == m ||
  //             5 == m ||
  //             6 == m ||
  //             7 == m ||
  //             8 == m
  //           )
  //             if (((f = c.getUint8(g)), (g += 1), 1 == f)) {
  //               (f = c),
  //                 (m = new Backgrounds.Class_a()),
  //                 (l = f.getFloat32(g, true)),
  //                 (g = g + 4),
  //                 (y = f.getFloat32(g, true)),
  //                 (g = g + 4),
  //                 (f = f.getFloat32(g, true)),
  //                 (g = g + 4);
  //               m.posX = 10 * l;
  //               m.posY = 10 * -y;
  //               m.radius = 10 * f;
  //               this.#b.push(m);
  //             } else {
  //               if (2 == f)
  //                 for (
  //                   f = c, l = f.getUint16(g, true), g += 2, y = 0;
  //                   y < l;
  //                   y++
  //                 ) {
  //                   for (
  //                       r = f.getUint16(g, true),
  //                       g = g + 2,
  //                       p = new Backgrounds.Class_d(),
  //                       s = 0;
  //                     s < r;
  //                     s++
  //                   ) {
  //                     (v = f.getFloat32(g, true)),
  //                       (g = g + 4),
  //                       (u = f.getFloat32(g, true)),
  //                       (g = g + 4);
  //                     p.add(10 * v, 10 * -u, m);
  //                   }
  //                   this.#b.push(objG_assets);
  //                 }
  //             }
  //           else
  //             9 == m || 10 == m || 11 == m
  //               ? ((g += 4), (g += 4), (g += 4))
  //               : 43 == m && ((g += 4), (g += 4), (g += 4));
  //         }
  //     }
  //   };
  //   e.send(null);
  //   console.log("Map loaded!");
  // }
  // drawColliders(a) {
  //   for (let c = this.#b.length, d = 0; d < c; d++) this.#b[d].draw(a, 1);
  // }
  // drawWater(a) {
  //   if (bool_drawWater)
  //     for (let c = this.#b.length, d = 0; d < c; d++) this.#b[d].draw(a, 2);
  // }
  // drawGrassSand(a) {
  //   for (let c = this.#b.length, d = 0; d < c; d++) this.#b[d].draw(a, 3);
  // }
  drawGradient(ctx: CanvasRenderingContext2D) {
    let c, b, d, f, m;
    c =
      (canvas.width / 2 +
        (objGUI_anchor.x * objGUI_anchor.zoom - canvas.width / 2)) /
      objGUI_anchor.zoom;
    b =
      (canvas.height / 2 +
        (objGUI_anchor.y * objGUI_anchor.zoom - canvas.height / 2)) /
      objGUI_anchor.zoom;
    d = 0.75 * room_height;
    objG_eventManager.isSpaceWars() && (d = room_height);
    d = ctx.createLinearGradient(0, -d, 0, d);
    f = 39;
    m = 161;
    if (objG_eventManager.isSpaceWars()) {
      f = 0;
      m = 55;
    }
    if (0 < this.#e) {
      let l = this.#e / 2500;
      1 < l && (l = 1);
      f += (255 - f) * l;
      m += (255 - m) * l;
    }
    if (objG_eventManager.isSpaceWars()) {
      d.addColorStop(0, "rgba(" + Math.floor(f) + ",0,0,1.0)");
      d.addColorStop(0.3, "rgba(" + Math.floor(m) + ",0,55,1.0)");
      d.addColorStop(0.5, "rgba(" + Math.floor(m) + ",0,75,1.0)");
      d.addColorStop(0.7, "rgba(" + Math.floor(m) + ",0,55,1.0)");
      d.addColorStop(1, "rgba(" + Math.floor(f) + ",0,0,1.0)");
    } else if (bool_drawGradient) {
      d.addColorStop(0, "rgba(" + Math.floor(f) + ",145,202,1.0)");
      d.addColorStop(1, "rgba(" + Math.floor(m) + ",231,252,1.0)");
    } else d = "#62bae2";
    ctx.fillStyle = d;
    ctx.fillRect(
      c - canvas.width / 2 / objGUI_anchor.zoom,
      b - canvas.height / 2 / objGUI_anchor.zoom,
      canvas.width / objGUI_anchor.zoom,
      canvas.height / objGUI_anchor.zoom,
    );
  }
  drawWaterBehind(ctx: CanvasRenderingContext2D) {
    bool_drawWater && this.waves.drawBehind(ctx);
  }
  drawWaterFront(ctx: CanvasRenderingContext2D) {
    bool_drawWater && this.waves.drawFront(ctx);
  }
  drawLimits(ctx: CanvasRenderingContext2D) {
    let c =
        (canvas.width / 2 +
          (objGUI_anchor.x * objGUI_anchor.zoom - canvas.width / 2)) /
        objGUI_anchor.zoom,
      b =
        (canvas.height / 2 +
          (objGUI_anchor.y * objGUI_anchor.zoom - canvas.height / 2)) /
        objGUI_anchor.zoom,
      d = 500,
      e = 2 * room_height,
      f = 0,
      l = 0,
      y = 0,
      r = 0,
      p;
    if (0 < c) {
      p = Gborder_X - c;
      if (p < d) {
        f = Math.min(1 - p / d, 1);
        f *= 0.2;
      }
    } else {
      p = Gborder_X + c;
      if (p < d) {
        l = Math.min(1 - p / d, 1);
        l *= 0.2;
      }
    }
    if (objG_eventManager.isSpaceWars()) {
      d = 200;
      if (0 > b) {
        p = room_height / 2;
        p += b;
        p < d && ((y = Math.min(1 - p / d, 1)), (y *= 0.2));
      } else {
        p = room_height / 2;
        p -= b;
        p < d && ((r = Math.min(1 - p / d, 1)), (r *= 0.2));
      }
    }
    if (0 < c) {
      d = f;
      d = y > d ? y : d;
      f = d = r > d ? r : d;
    } else {
      d = l;
      d = y > d ? y : d;
      l = d = r > d ? r : d;
    }
    r = y = d;
    if (0 < f) {
      ctx.fillStyle = "rgba(200,0,0," + f + ")";
      ctx.fillRect(Gborder_X, -e / 2, 2500, e);
    } else {
      ctx.fillStyle = "rgba(200,0,0," + l + ")";
      ctx.fillRect(-Gborder_X - 2500, -e / 2, 2500, e);
    }
    if (objG_eventManager.isSpaceWars()) {
      if (0 > b) {
        ctx.fillStyle = "rgba(200,0,0," + y + ")";
        ctx.fillRect(-Gborder_X, -room_height / 2 - 2500, 2 * Gborder_X, 2500);
      } else {
        ctx.fillStyle = "rgba(200,0,0," + r + ")";
        ctx.fillRect(-Gborder_X, room_height / 2, 2 * Gborder_X, 2500);
      }
    }
    if (!objG_eventManager.isSpaceWars()) {
      ctx.fillStyle = "rgba(255,255,255,0.10)";
      ctx.fillRect(
        c - canvas.width / 2 / objGUI_anchor.zoom,
        -room_height / 2 - 1,
        canvas.width / objGUI_anchor.zoom,
        6,
      );
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (bool_drawSun && !objG_eventManager.isSpaceWars()) {
      let c = 0.97 * objGUI_anchor.x + 450,
        b = 0.97 * objGUI_anchor.y - 100,
        d = ctx.createRadialGradient(c, b, 70, c, b, 350);
      d.addColorStop(0, "rgba(255,255,255,0.4)");
      d.addColorStop(0.1, "rgba(255,255,255,0.13)");
      d.addColorStop(0.15, "rgba(255,255,255,0.05)");
      d.addColorStop(0.2, "rgba(255,255,255,0)");
      ctx.fillStyle = d;
      ctx.fillRect(c - 175, b - 175, 350, 350);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.beginPath();
      ctx.arc(c, b, 70, 0, 2 * Math.PI);
      ctx.fill();
    }
    if (bool_drawClouds && !objG_eventManager.isSpaceWars())
      this.#obj_clouds.drawPreRenderedClouds(ctx);
  }
  update(deltatime: number) {
    if (xa || !this.#c)
      if (
        ((this.#c = true),
        this.waves.update(deltatime),
        this.#obj_clouds.update(deltatime),
        null != objG_player_plane)
      ) {
        let b =
          objG_player_plane.x < -Gborder_X || objG_player_plane.x > Gborder_X;
        if (objG_eventManager.isSpaceWars())
          b =
            b ||
            objG_player_plane.y > room_height / 2 ||
            objG_player_plane.y < -room_height / 2;
        if (b) {
          if (0 == this.#e) {
            objG_sfxManager.playSound(str_sfxid_warn, 1, 1, 1);
            objGUI_gameInfo.showWarningMessage("YOU ABANDONED THE FIGHT!");
          }
          this.#e += deltatime;
        } else {
          0 < this.#e && objGUI_gameInfo.clearWarningMessage();
          this.#e = 0;
        }
      }
  }
}
// namespace Backgrounds {
//   export class Class_d {
//     vertexes = [];
//     type = 0;
//     add(a, c, b) {
//       this.vertexes.push({
//         x: a,
//         y: c,
//       });
//       this.type = b;
//     }
//     draw(a, c) {
//       if (7 == this.type) {
//         if (((a.fillStyle = "#F0F000"), 3 != c)) return;
//       } else if (8 == this.type) {
//         if (((a.fillStyle = "#0000F0"), 2 != c)) return;
//       } else if (((a.fillStyle = "#f00000"), 1 != c)) return;
//       a.beginPath();
//       let b = this.vertexes.length,
//         d = this.vertexes[0];
//       a.moveTo(d.x, d.y);
//       for (d = 1; d < b; d++) {
//         let e = this.vertexes[d];
//         a.lineTo(e.x, e.y);
//       }
//       a.closePath();
//       a.fill();
//     }
//   }
//   export class Class_a {
//     posY = 0;
//     posX = 0;
//     radius = 10;
//     draw(a, c) {
//       1 == c &&
//         (a.beginPath(),
//         (a.fillStyle = "#f00"),
//         a.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI),
//         a.closePath(),
//         a.fill());
//     }
//   }
// }
class PickupItem {
  #b = 0;
  alpha = 0;
  #e = 0;
  #f = Math.random() * Math.PI * 2;
  #d = 1;
  #a = 0;
  #c = 0;
  #g = 0;
  #x!: number; // setPosition()
  #y!: number; // setPosition()
  #n = 1;
  #k = 1;
  #m = 1;
  #l = 0;
  #inSpace = false;

  id!: number | string; // set
  y!: number; // setPosition()
  x!: number; // setPosition()
  radius = 1.5;
  type!: number; // set
  sinScaleY = 0;
  sinScaleX = 0;
  fadingOut = false;
  grabbing = false;
  constructor() {
    objG_eventManager.isSpaceWars() && (this.#inSpace = true);
  }
  update(deltatime: number) {
    let p = 0.06 * deltatime,
      s,
      v,
      plane;
    if (64 != this.type) {
      if (!objG_eventManager.isSpaceWars()) {
        s = room_height / 2 - 20;
        v = this.y + this.#e;
        this.#l += deltatime / 400;
        if (v < s) {
          if (v > s - 30) this.#d = (s - v) / 30;
          if (1 > this.alpha) {
            this.alpha += deltatime / 1e3;
            if (1 < this.alpha) this.alpha = 1;
          }
          this.#e = ((frametime_millis - this.#b) / 1e3) * Ac * 60;
        } else {
          this.#a += 0.1 * p;
          this.#e += 0.1;
          this.#k -= 0.008;
          if (0 > this.#k) this.#k = 0;
          this.#m = Math.sqrt(this.#k);
        }
      }
      if (this.fadingOut) {
        if (
          !this.#inSpace &&
          !objG_eventManager.isSpaceWars() &&
          !objG_eventManager.isInstagib()
        )
          delete objD_pickups[this.id];
        else {
          this.#e += 0.25;
          this.alpha -= deltatime / 1e3;
          if (0 >= this.alpha) delete objD_pickups[this.id];
        }
      }
    }
    if (this.grabbing) {
      plane = objD_planes[this.#c];
      if (plane) {
        s = Math.pow(this.#g, 2);
        this.x = this.#x + (plane.x - this.#x) * s;
        this.y = this.#y + (plane.y - this.#y) * s;
        this.#n = 1 - s;
        this.#g += 0.07 * p;
        1 < this.#g && delete objD_pickups[this.id];
      } else delete objD_pickups[this.id];
    }
  }
  drawItem(ctx: CanvasRenderingContext2D, img: FrameImage) {
    let g = 1;
    if (64 == this.type) {
      ctx.save();
      ctx.beginPath();
      this.sinScaleX += 0.1;
      this.sinScaleY += 0.12;
      ctx.translate(this.x, this.y + this.#e);
      ctx.scale(
        (1 + Math.sin(this.sinScaleX) / 6) * this.#n * 1.3,
        (1 + Math.sin(this.sinScaleY) / 6) * this.#n * 1.3,
      );
      img.draw(ctx);
    } else if (this.#inSpace || objG_eventManager.isSpaceWars()) {
      if (
        objG_player_plane &&
        objG_eventManager.isSpaceWars() &&
        objG_player_plane.id == qa
      )
        g = 0.3;
      ctx.save();
      ctx.beginPath();
      this.sinScaleX += 0.1;
      this.sinScaleY += 0.12;
      ctx.translate(this.x, this.y);
      ctx.scale(
        (1 + Math.sin(this.sinScaleX) / 6) * this.#n * 1.3,
        (1 + Math.sin(this.sinScaleY) / 6) * this.#n * 1.3,
      );
      ctx.scale(2, 2);
      ctx.globalAlpha = g;
      objG_assets.frames.wing.draw(ctx);
      ctx.scale(0.5, 0.5);
      img.draw(ctx);
    } else {
      g = 1;
      if (
        objG_player_plane &&
        objG_player_plane.weapon == id_weapon_superweapon &&
        (this.type == id_weapon_trishoot ||
          this.type == id_weapon_missile ||
          this.type == id_weapon_railgun ||
          this.type == id_weapon_punch ||
          this.type == id_weapon_bombs)
      )
        g = 0.3;
      let h = objG_assets.frames.parachute;
      h.y = -h.height / 2 + 100 * (1 - this.#m);
      ctx.save();
      if (this.grabbing) ctx.translate(this.x, this.y);
      else ctx.translate(this.x, this.y + this.#e);
      ctx.rotate(0.2 * Math.sin(this.#l + this.#f) * this.#d);
      ctx.scale(1 * this.#n, 1 * this.#n);
      ctx.translate(0, 10);
      ctx.globalAlpha = this.alpha * g * 1;
      ctx.save();
      if (0 < this.#a) ctx.globalAlpha = this.#m * g * 1;
      ctx.scale(1 * (1 + (1 - this.#m)), 1 * this.#m);
      h.draw(ctx);
      ctx.restore();
      g = 0;
      if (this.type == id_weapon_superweapon) g = 8;
      ctx.translate(0, 4 * Math.sin(this.#a) + g + 10);
      img.draw(ctx);
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (bool_drawItems) {
      let c = 40,
        type;

      if (32 == this.type) type = objG_assets.frames.health;
      else if (this.type == id_weapon_trishoot)
        type = objG_assets.frames.trishoot;
      else if (this.type == id_weapon_railgun)
        type = objG_assets.frames.railgun;
      else if (this.type == id_weapon_missile)
        type = objG_assets.frames.missile;
      else if (this.type == id_weapon_punch) type = objG_assets.frames.melee;
      else if (this.type == id_weapon_bombs) type = objG_assets.frames.bombdrop;
      else if (this.type == id_weapon_superweapon)
        type = objG_assets.frames.laser;
      else if (64 == this.type) {
        c = 10;
        type = objG_assets.frames.wing;
      }
      let d = this.y;
      if (!this.grabbing) d += this.#e;
      if (!this.grabbing) {
        if (!func_isInsideBox(this.x, d, c)) return;
      } else if (!func_isInsideBox(this.x, this.y, c)) return;
      this.drawItem(ctx, type!);
    }
  }
  fadeOut() {
    this.fadingOut = true;
  }
  playerGrab(id_plane: number) {
    this.grabbing = true;
    this.#c = id_plane;
    this.y += this.#e;
    this.#x = this.x;
    this.#y = this.y;
    delete objD_pickups[this.id];
    this.id = "g" + this.id;
    objD_pickups[this.id] = this;
    if (
      objG_player_plane &&
      this.#c == objG_player_plane.id &&
      !objG_eventManager.isInstagib()
    ) {
      if (64 == this.type) objG_player_plane.incScore(score_boost_pickup);
      else objG_player_plane.incScore(score_weapon_pickup);
    }
  }
  setPosition(x_gu: number, y_gu: number) {
    this.x = this.#x = 10 * x_gu;
    this.y = this.#y = 10 * y_gu;
    this.y > -room_height / 2 && (this.alpha = 1);
    this.#b = +new Date();
  }
}
class WS_Connection {
  #ws_conn?: WebSocket;
  func_process_msg_extra(
    data_view: DataView,
    msg_type: number,
    bool_something: boolean,
  ) {
    if (
      (169 == msg_type ||
        172 == msg_type ||
        162 == msg_type ||
        178 == msg_type) &&
      !bool_something
    )
      listG_plane_ids = [];
    let cond_refresh_lb = false;
    let offset = 1;
    let f = 1;
    let n = 0;
    if (!bool_something)
      objG_wsConnection.lastUpdateBool = !objG_wsConnection.lastUpdateBool;
    while (true) {
      n++;
      let id_plane = data_view.getUint32(offset, true);
      offset = offset + 4;
      if (0 == id_plane) {
        let count = data_view.getUint8(offset);
        offset += 1;
        for (let i = 0; i < count; i++) {
          let id_missile = data_view.getUint32(offset, true);
          offset = offset + 4;
          let flag_type_missile;
          if (163 == msg_type || 162 == msg_type || 169 == msg_type) {
            flag_type_missile = data_view.getUint8(offset);
            offset = offset + 1;
          }
          let x_gu = data_view.getFloat32(offset, true);
          offset = offset + 4;
          let y_gu = -data_view.getFloat32(offset, true);
          offset = offset + 4;
          let id_launched_by = data_view.getUint32(offset, true);
          offset = offset + 4;
          let obj_missile = objD_missiles[id_missile];
          if (null == obj_missile) {
            obj_missile = new Missile();
            objD_missiles[id_missile] = obj_missile;
            if (163 == msg_type || 162 == msg_type || 169 == msg_type)
              obj_missile.setType(flag_type_missile!);
            let obj_plane: Plane | SpecialEntity = objD_planes[id_launched_by];
            let isSpecialEntity = false;
            if (!obj_plane) {
              isSpecialEntity = true;
              obj_plane = objD_specialEntities[id_launched_by];
            }
            if (obj_plane) {
              let max_parallel = const_Q_0;
              let volume = 1;
              if (isSpecialEntity) {
                max_parallel = const_Sa_3;
                let dist = func_calculateDistance2D(
                  obj_plane.x,
                  obj_plane.y,
                  H.x,
                  H.y,
                );
                volume = 1 - dist / num_sound_max_distance;
                if (0.01 < volume)
                  objG_sfxManager.playSound(
                    str_sfxid_cannonshoot,
                    volume,
                    1,
                    max_parallel,
                  );
                (obj_plane as SpecialEntity).cannonShoot();
              } else {
                if (
                  !(objG_player_plane && id_launched_by == objG_player_plane.id)
                ) {
                  max_parallel = const_Sa_3;
                  let dist = func_calculateDistance2D(
                    obj_plane.x,
                    obj_plane.y,
                    H.x,
                    H.y,
                  );
                  volume = 1 - dist / num_sound_max_distance;
                }
                if (0.01 < volume) {
                  objG_sfxManager.playSound(
                    str_sfxid_mlaunch,
                    volume,
                    1,
                    max_parallel,
                  );
                  (obj_plane as Plane).ammo--;
                }
              }
            }
          }
          obj_missile.lastUpdate = frametime_millis;
          obj_missile.setPosition(x_gu, y_gu, id_launched_by);
        }
        if (
          162 == msg_type ||
          178 == msg_type ||
          163 == msg_type ||
          179 == msg_type ||
          169 == msg_type ||
          172 == msg_type
        )
          while (true) {
            let bool_something = data_view.getUint32(offset, true);
            offset += 4;
            if (0 == bool_something) break;
            let spc_entity = objD_specialEntities[bool_something];
            if (178 == msg_type || 162 == msg_type) {
              let type_spcentity = data_view.getUint8(offset);
              offset += 1;
              if (null == spc_entity) {
                spc_entity = new SpecialEntity();
                objD_specialEntities[bool_something] = spc_entity;
                spc_entity.setType(type_spcentity);
              }
            }
            spc_entity.id = bool_something;
            spc_entity.lastUpdate = frametime_millis;
            let x_gu = data_view.getFloat32(offset, true);
            offset += 4;
            let y_gu = -data_view.getFloat32(offset, true);
            offset += 4;
            let angle = data_view.getFloat32(offset, true);
            offset += 4;
            let energy = data_view.getUint16(offset, true);
            offset += 2;
            let spc_entity_state = data_view.getUint8(offset);
            offset += 1;
            if (spc_entity.type == id_entity_warship) {
              let float_val = -data_view.getFloat32(offset, true);
              offset += 4;
              let cannon_angle = data_view.getFloat32(offset, true);
              offset += 4;
              spc_entity.setCannonAngle(cannon_angle);
              spc_entity.setFloatValue(float_val);
            } else if (
              spc_entity.type == id_entity_asteroid &&
              (162 == msg_type || 178 == msg_type)
            ) {
              let r = data_view.getUint8(offset);
              offset += 1;
              spc_entity.setFragment(r);
            }
            spc_entity.setState(spc_entity_state);
            spc_entity.setPose(x_gu, y_gu, angle);
            spc_entity.setEnergy(energy);
          }
        break;
      }
      let flag_bonus = data_view.getUint16(offset, true);
      offset = offset + 2;
      let isPlane,
        is_hovering,
        flagPaused,
        is_bot,
        is_shooting,
        x_gu,
        y_gu,
        angle,
        energy,
        score;
      isPlane = flag_bonus & 1;
      is_hovering = flag_bonus & 2;
      flagPaused = flag_bonus & 4;
      is_bot = flag_bonus & 1024;
      is_shooting = flag_bonus & 2048;
      if (1 == n && (163 == msg_type || 179 == msg_type))
        qa = flag_bonus & 512 ? id_plane : 0;
      if (isPlane) {
        x_gu = data_view.getFloat32(offset, true);
        offset += 4;
        y_gu = -data_view.getFloat32(offset, true);
        offset += 4;
        angle = data_view.getFloat32(offset, true);
        offset += 4;
        energy = data_view.getUint8(offset);
        offset += 1;
      }
      let obj_plane = objD_planes[id_plane];
      let P = flag_bonus & 256;
      if (obj_plane && P) {
        obj_plane.setFrenzy();
        obj_plane.setPaused(flagPaused);
      }
      if (objG_player_plane == obj_plane) {
        let z = flag_bonus & 8;
        let R = flag_bonus & 16;
        let S = flag_bonus & 32;
        let O = flag_bonus & 128;
        let G = flag_bonus & 4096;
        if (flag_bonus & 64) objGUI_gameInfo.addBonus(64, 0);
        else if (S) objGUI_gameInfo.addBonus(32, 0);
        else if (R) objGUI_gameInfo.addBonus(16, 0);
        else if (z) objGUI_gameInfo.addBonus(8, 0);
        if (G) {
          objGUI_gameInfo.addBonus(4096, 0);
          plane_last_killed_by[obj_plane.id] = 0;
        }
        if (O) objGUI_gameInfo.addBonus(128, 0);
        if (P) objGUI_gameInfo.addBonus(256, obj_plane.getKills());
      }
      if (
        162 == msg_type ||
        178 == msg_type ||
        169 == msg_type ||
        172 == msg_type
      ) {
        score = data_view.getUint32(offset, true);
        offset += 4;
      }
      if ((162 != msg_type && 178 != msg_type) || !isPlane) {
        if ((162 == msg_type || 178 == msg_type) && !isPlane && !obj_plane) {
          obj_plane = new Plane();
          objD_planes[id_plane] = obj_plane;
          obj_plane.inGame = false;
        }
      } else {
        let type_weapon;
        if (162 == msg_type) {
          type_weapon = data_view.getUint16(offset, true);
          offset += 2;
        } else {
          type_weapon = data_view.getUint8(offset);
          offset += 1;
        }
        let ammo = data_view.getUint16(offset, true);
        offset += 2;
        let id_color = data_view.getUint8(offset);
        offset += 1;
        let id_decal = data_view.getUint8(offset);
        offset += 1;
        let flag_info = data_view.getUint32(offset, true);
        offset += 4;
        let name = "";
        while (true) {
          let uint16_char = data_view.getUint16(offset, true);
          offset += 2;
          if (0 == uint16_char) break;
          name += String.fromCharCode(uint16_char);
        }
        if (null == obj_plane) {
          obj_plane = new Plane();
          objD_planes[id_plane] = obj_plane;
        }
        if (-1 != name.indexOf("\ufdfd")) name = "<Unnamed>";
        obj_plane.setColorID(id_color);
        obj_plane.setDecalID(id_decal);
        obj_plane.setName(name);
        obj_plane.setFlagInfo(flag_info);
        obj_plane.setWeapon(type_weapon);
        obj_plane.ammo = ammo;
      }
      if (null == obj_plane) {
        console.log(
          "ERROR: Receiving data for a player (" +
            id_plane +
            ") that does not exist, ignoring!",
        );
      } else {
        obj_plane.id = id_plane;
        obj_plane.lastUpdate = frametime_millis;
        obj_plane.updateBool = objG_wsConnection.lastUpdateBool;
        if (isPlane) {
          obj_plane.setPose(x_gu!, y_gu!, angle!);
          obj_plane.energy = energy!;
          obj_plane.setEnergy(energy!);
          obj_plane.hover = !!is_hovering;
          obj_plane.setIsBot(is_bot);
          obj_plane.setIsShooting(is_shooting);
        }
        if (
          169 == msg_type ||
          172 == msg_type ||
          162 == msg_type ||
          178 == msg_type
        ) {
          obj_plane.setScore(score!);
          if (!bool_something) {
            if (1 == f) sc = id_plane;
            listG_plane_ids.push(id_plane);
            cond_refresh_lb = true;
            obj_plane.setRank(f);
            f++;
          }
        }
      }
    }
    cond_refresh_lb && objGUI_gameInfo.refreshLeaderboard(listG_plane_ids);
  }
  func_process_msg_grab(data_view: DataView, msg_type: number) {
    let offset = 1;
    let id_pickup = data_view.getUint16(offset, true);
    offset = offset + 2;
    let id_plane = data_view.getUint32(offset, true);
    offset = offset + 4;
    let flag_type_pickup;
    if (168 == msg_type) {
      flag_type_pickup = data_view.getUint8(offset);
      offset += 1;
    } else {
      flag_type_pickup = data_view.getUint16(offset, true);
      offset += 2;
    }
    if (0 < id_plane) {
      let pitch = 1;
      let id_sfx = str_sfxid_weapgrab;
      if (
        32 > flag_type_pickup ||
        128 == flag_type_pickup ||
        256 == flag_type_pickup
      ) {
        offset = data_view.getUint16(offset, true);
        objD_planes[id_plane].setWeapon(flag_type_pickup);
        objD_planes[id_plane].ammo = offset;
      } else if (64 == flag_type_pickup) {
        objD_planes[id_plane].trailEffect();
        id_sfx = str_sfxid_winggrab;
        if (null != this.lastGrabbedWingTime) {
          let time_since_last_grab =
            frametime_millis - this.lastGrabbedWingTime;
          if (1e3 > time_since_last_grab) objG_wsConnection.wingsInARow++;
          else objG_wsConnection.wingsInARow = 0;
          pitch = 1 + 0.05 * objG_wsConnection.wingsInARow;
          if (1.5 < pitch) pitch = 1.5;
        }
        this.lastGrabbedWingTime = frametime_millis;
      } else if (32 == flag_type_pickup) id_sfx = str_sfxid_hgrab;
      if (objG_player_plane && id_plane == objG_player_plane.id)
        objG_sfxManager.playSound(id_sfx, 1, pitch, const_Q_0);
      objD_pickups[id_pickup].playerGrab(id_plane);
    } else objD_pickups[id_pickup].fadeOut();
  }
  firstClientListing = true;
  sentHello = false;
  hasConnection = false;
  lastGrabbedWingTime: number | null = null;
  remoteHost: string | null = null;
  connectRetry = 0;
  wingsInARow = 0;
  lastUpdateBool = false;
  roomNumber = 0;
  directed = false;
  roomID = 0;
  getServerAndConnect() {
    let b, c, a;
    b = "";
    if (!func_isIframe()) a = parent.location.hash;
    if (a) {
      b = a;
      b = b.substring(1, b.length);
      b = ";" + b;
      objG_wsConnection.directed = true;
    } else if (obj_browserQueryParams.ip) {
      b = obj_browserQueryParams.ip;
      b = b.replace("%3A", ":");
      objG_wsConnection.remoteHost = b;
      objG_wsConnection.connect();
      return;
    }
    a = str_conutryCode;
    if (obj_browserQueryParams.cc) a = obj_browserQueryParams.cc;
    if (!a) setTimeout(objG_wsConnection.getServerAndConnect, 200);
    else {
      c = "";
      if (bool_isHttps) c = "s";
      $.ajax({
        url: "http" + c + "://master.wings.io/",
        type: "POST",
        success: (a) => {
          if ("0" == a) {
            $("#topGui").hide();
            $("#topGuiConnecting").hide();
            $("#roomFailed").show();
          } else {
            a = a.split("!");
            objG_wsConnection.roomID = 0;
            if (1 < a.length) {
              objG_wsConnection.roomID = a[1];
            }
            c = a[0];
            a = c.split("/");
            objG_wsConnection.roomNumber = 0;
            if (1 < a.length) {
              objG_wsConnection.roomNumber = a[1];
              c = a[0];
            }
            objG_wsConnection.remoteHost = c;
            objG_wsConnection.connect();
          }
        },
        error: () => {
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
  connect() {
    let b;
    if (wa) {
      b = "ws://" + objG_wsConnection.remoteHost!;
      console.log("fullhost: " + b);
      if (bool_isHttps) {
        b = objG_wsConnection.remoteHost!.split(":")[0].split(".");
        let port = Math.floor(objG_wsConnection.roomNumber) + 8079 + 1e3;
        b =
          "wss://ip-" +
          b[0] +
          "-" +
          b[1] +
          "-" +
          b[2] +
          "-" +
          b[3] +
          ".wings.io:" +
          port;
        console.log("isSecure RoomNumber: " + objG_wsConnection.roomNumber);
      } else if (0 < objG_wsConnection.roomNumber) {
        b =
          "ws:" +
          b.split(":")[1] +
          ":" +
          (Math.floor(objG_wsConnection.roomNumber) + 8079);
        console.log("New full host: " + b);
      }
      try {
        this.#ws_conn = new WebSocket(b);
      } catch (c) {
        setTimeout(objG_wsConnection.getServerAndConnect, 1e3);
        return;
      }
      this.#ws_conn.binaryType = "arraybuffer";
      this.#ws_conn.onopen = objG_wsConnection.onSocketOpen;
      this.#ws_conn.onclose = objG_wsConnection.onSocketClose;
      this.#ws_conn.onmessage = objG_wsConnection.onSocketMessage;
      this.#ws_conn.onerror = objG_wsConnection.onSocketError;
    } else setTimeout(objG_wsConnection.getServerAndConnect, 100);
  }
  disconnect() {
    if (objG_wsConnection.directed) {
      if (!func_isIframe()) window.location.hash = "";
      objG_wsConnection.directed = false;
    }
    objG_wsConnection.roomID = 0;
    this.#ws_conn?.close();
  }
  onSocketOpen(ev: Event) {
    tracking.sendLoadingTime();
    objG_wsConnection.connectRetry = 0;
    objG_wsConnection.hasConnection = true;
    objG_wsConnection.directed = false;
    objG_assets.loaded && objG_wsConnection.hello();
  }
  onSocketClose(ev: CloseEvent) {
    objG_wsConnection.connectionClosed();
  }
  onSocketMessage(ev: MessageEvent<ArrayBuffer>) {
    objG_wsConnection.processMessage(ev.data);
  }
  onSocketError(ev: Event) {
    console.log("socket error");
  }
  hello() {
    // objG_wsConnection.sendSingleByte(32); // mobile player
    objG_wsConnection.sendSingleByte(1);
    objG_wsConnection.ping();
    objG_wsConnection.sentHello = true;
    $("#copyLink").fadeIn(300);
    $("#topGui").show();
    $("#topGuiConnecting").hide();
    $(".btn-needs-server").removeAttr("disabled");
    $("#nick").focus();
  }
  processMessage(array_buffer: ArrayBuffer) {
    let data_view = new DataView(array_buffer),
      msg_type = data_view.getUint8(0);
    if (0 != msg_type)
      if (160 == msg_type) {
        let offset = 1;
        cloud_pos_time = -data_view.getUint32(offset, true);
        offset = offset + 4;
        let room_width_gu = data_view.getFloat32(offset, true);
        offset = offset + 4;
        Gborder_X = 10 * room_width_gu;
        let room_height_gu = data_view.getFloat32(offset, true);
        offset = offset + 4;
        room_height = 10 * room_height_gu;
        cloud_sprange_start_Y = room_height / 2 / 650;
        cloud_sprange_end_Y = room_height / 2 - 100;
        boost_time = 1e3 * data_view.getFloat32(offset, true);
        offset = offset + 4;
        spawn_cooldown_time = data_view.getFloat32(offset, true);
        offset = offset + 4;
        ads.next_adTimeout_6s = data_view.getFloat32(offset, true);
        offset = offset + 4;
        Ac = data_view.getFloat32(offset, true);
        offset = offset + 4;
        diff_score = data_view.getFloat32(offset, true);
        offset = offset + 4;
        score_boost_pickup = data_view.getFloat32(offset, true);
        offset = offset + 4;
        score_weapon_pickup = data_view.getFloat32(offset, true);
        diff_kills = data_view.getFloat32(offset + 4, true);
      } else if (161 == msg_type || 171 == msg_type) {
        // processGlobal player plane //161 no revenge //171 revenge
        xa = true;
        let offset = 1;
        let id_plane = data_view.getUint32(offset, true);
        offset += 4;
        let x_gu = data_view.getFloat32(offset, true);
        offset += 4;
        let y_gu = -data_view.getFloat32(offset, true);
        offset += 4;
        let angle = data_view.getFloat32(offset, true);
        offset += 4;
        let id_color = data_view.getUint8(offset);
        offset += 1;
        let id_decal = data_view.getUint8(offset);
        offset += 1;
        let uint32_flag_info = data_view.getUint32(offset, true);
        objG_player_plane = new Plane();
        objG_player_plane.id = id_plane;
        objG_player_plane.setColorID(id_color);
        objG_player_plane.setDecalID(id_decal);
        objG_player_plane.setName(myName);
        objG_player_plane.setFlagInfo(uint32_flag_info);
        objG_player_plane.setPose(x_gu, y_gu, angle);
        objG_player_plane.updateBool = objG_wsConnection.lastUpdateBool;
        objD_planes[id_plane] = objG_player_plane;
        current_following_plane_id = id_plane;
        Z = true;
        func_hideOverlay();
        func_setPlayerCount();
        if (161 == msg_type) plane_last_killed_by[id_plane] = 0;
      } else if (162 == msg_type || 178 == msg_type) {
        this.func_process_msg_extra(data_view, msg_type, false);
        this.firstClientListing = false;
        func_setPlayerCount();
      } else if (169 == msg_type || 172 == msg_type) {
        this.func_process_msg_extra(data_view, msg_type, false);
        func_setPlayerCount();
      } else if (163 == msg_type || 179 == msg_type) {
        this.func_process_msg_extra(data_view, msg_type, false);
      } else if (164 == msg_type || 180 == msg_type) {
        if (164 == msg_type) this.func_process_msg_extra(data_view, 162, true);
        else {
          this.func_process_msg_extra(data_view, 178, true);
          func_setPlayerCount();
        }
      } else if (165 == msg_type) {
        let offset2 = 1;
        let msg_type = data_view.getUint32(offset2, true);
        offset2 += 4;
        let obj_plane = objD_planes[msg_type];
        if (obj_plane) {
          let id_plane = data_view.getUint32(offset2, true);
          offset2 += 4;
          let flag_demise_type = data_view.getUint8(offset2);
          let was_killed = data_view.getUint32(offset2 + 1, true);
          let plane_player = objG_player_plane;
          if (!plane_player && objG_player_plane_temp)
            plane_player = objG_player_plane_temp;
          if (plane_player && id_plane == plane_player.id) {
            let other_plane_name = func_renameBlankPlayerNames(
              objD_planes[msg_type].name,
            );
            objGUI_gameInfo.addMessage("You killed", true, other_plane_name);
            if (!objG_eventManager.isInstagib()) {
              if (msg_type == qa) plane_player.incScore(diff_score);
              else plane_player.incScore(diff_kills);
            }
          }
          if (0 < id_plane) {
            let obj_plane_other = objD_planes[id_plane];
            if (obj_plane_other) {
              objGUI_gameInfo.addActivityMessage(
                func_renameBlankPlayerNames(obj_plane.name) +
                  " was Killed by " +
                  func_renameBlankPlayerNames(obj_plane_other.name),
              );
              obj_plane_other.incKills();
              plane_last_killed_by[obj_plane.id] = obj_plane_other.id;
            } else
              objGUI_gameInfo.addActivityMessage(
                func_renameBlankPlayerNames(obj_plane.name) + " was Killed",
              );
            objG_animationManager.addExplosion(
              obj_plane.dstX,
              obj_plane.dstY,
              obj_plane.getSpeedDirectionX(),
              obj_plane.getSpeedDirectionY(),
            );
            if (objG_player_plane && objG_player_plane.id == msg_type) {
              if (obj_plane_other)
                objGUI_gameInfo.addMessage(
                  "Killed by",
                  false,
                  func_renameBlankPlayerNames(obj_plane_other.name),
                );
              else objGUI_gameInfo.addMessage("You were killed", false);
              if (Z) {
                Z = false;
                objG_player_plane_temp = objG_player_plane;
                objG_player_plane = undefined;
                ka = 1;
                W_wasKilled(was_killed);
                func_displayGameoverScore(was_killed);
              } else {
                objG_player_plane = undefined;
                objG_followMode.waitUntilNextFollow();
              }
            }
          } else {
            plane_last_killed_by[obj_plane.id] = 0;
            if (objG_player_plane && objG_player_plane.id == msg_type) {
              if (5 == flag_demise_type)
                objGUI_gameInfo.addMessage("You left!", false);
              else if (4 == flag_demise_type)
                objGUI_gameInfo.addMessage("Abandoned!", false);
              else if (1 == flag_demise_type)
                objGUI_gameInfo.addMessage("Crashed!", false);
              else if (6 == flag_demise_type)
                objGUI_gameInfo.addMessage("Exploded!", false);
              else if (7 == flag_demise_type)
                objGUI_gameInfo.addMessage("KAMIKAZE!!", false);
              else if (8 == flag_demise_type)
                objGUI_gameInfo.addMessage(
                  "You were killed by a Warship!",
                  false,
                );
              else if (3 == flag_demise_type) {
                objGUI_gameInfo.addMessage("Splash!", false);
                objG_sfxManager.playSound(
                  str_sfxid_bigsplash,
                  0.7,
                  1,
                  const_Q_0,
                );
                obj_particleImpacts.addSplash(
                  objG_player_plane.x,
                  room_height / 2 + 10,
                  2,
                  false,
                );
              } else {
                objGUI_gameInfo.addMessage("You were killed!", false);
              }
              if (Z) {
                Z = false;
                objG_player_plane = undefined;
                ma = 0;
                ka = 1;
                W_wasKilled(was_killed);
                func_displayGameoverScore(was_killed);
              } else {
                objG_player_plane = undefined;
                objG_followMode.waitUntilNextFollow();
              }
            }
            if (5 == flag_demise_type)
              objGUI_gameInfo.addActivityMessage(
                func_renameBlankPlayerNames(obj_plane.name) + " left",
              );
            else if (4 == flag_demise_type)
              objGUI_gameInfo.addActivityMessage(
                func_renameBlankPlayerNames(obj_plane.name) + " abandoned",
              );
            objG_animationManager.addExplosion(
              obj_plane.dstX,
              obj_plane.dstY,
              0.5 * obj_plane.getSpeedDirectionX(),
              0.5 * obj_plane.getSpeedDirectionY(),
            );
          }
          if (null == obj_plane)
            console.log("ERROR: Trying to remove a player that didnt exist!");
          else objD_planes[msg_type].cleanup();
        } else {
          let obj_spcentity = objD_specialEntities[msg_type];
          if (obj_spcentity) {
            if (
              obj_spcentity.type == id_entity_asteroid &&
              objG_eventManager.isSpaceWars()
            ) {
              objG_animationManager.addExplosion(
                obj_spcentity.x,
                obj_spcentity.y,
                0,
                0,
              );
              if (3 != obj_spcentity.fragment) {
                let volume =
                  1 -
                  func_calculateDistance2D(
                    obj_spcentity.x,
                    obj_spcentity.y,
                    H.x,
                    H.y,
                  ) /
                    num_sound_max_distance;
                if (0.01 < volume)
                  objG_sfxManager.playSound(
                    str_sfxid_mexpl2,
                    volume,
                    0.4,
                    const_Sa_3,
                  );
              }
            }
            objD_specialEntities[msg_type].cleanup();
            delete objD_specialEntities[msg_type];
          }
        }
        func_setPlayerCount();
      } else if (166 == msg_type || 176 == msg_type) {
        // player's bullet hit
        let offset = 1;
        let count = data_view.getUint16(offset, true);
        offset += 2;
        for (let i = 0; i < count; i++) {
          let id_weapon;
          let id_gameobj = data_view.getUint32(offset, true);
          offset += 4;
          if (176 == msg_type) {
            id_weapon = data_view.getUint16(offset, true);
            offset += 2;
          } else {
            id_weapon = data_view.getUint8(offset);
            offset += 1;
          }
          let pitch = 1;
          let id_sfx = str_sfxid_empty;
          switch (id_weapon) {
            case id_weapon_machinegun:
              id_sfx = objG_eventManager.isSpaceWars()
                ? qa == id_gameobj
                  ? str_sfxid_kinglaser
                  : str_sfxid_laser
                : str_sfxid_shot;
              break;
            case id_weapon_trishoot:
              if (objG_eventManager.isSpaceWars()) {
                pitch = 0.7;
                id_sfx = str_sfxid_laser;
              } else id_sfx = str_sfxid_trishot;
              break;
            case id_weapon_railgun:
              if (objG_eventManager.isSpaceWars()) {
                id_sfx = str_sfxid_laser;
                pitch = 1.3;
              } else id_sfx = str_sfxid_rail;
          }
          let obj_plane = objD_planes[id_gameobj];
          if (!obj_plane && 0 < id_gameobj) {
            let obj_spc = objD_specialEntities[id_gameobj];
            if (obj_spc) console.log("specialEntity did shoot: " + obj_spc.id);
          }
          let max_parallel = const_Q_0;
          let volume = 1;
          if (
            !(objG_player_plane && id_gameobj == objG_player_plane.id) &&
            obj_plane
          ) {
            max_parallel = const_Sa_3;
            volume =
              1 -
              func_calculateDistance2D(obj_plane.x, obj_plane.y, H.x, H.y) /
                num_sound_max_distance;
          }
          if (0.01 < volume && id_sfx != str_sfxid_empty)
            objG_sfxManager.playSound(id_sfx, volume, pitch, max_parallel);
          let ammo = data_view.getUint16(offset, true);
          offset += 2;
          id_weapon == id_weapon_punch && obj_plane.dash();
          let len2 = data_view.getUint8(offset);
          offset += 1;
          for (let j = 0; j < len2; j++) {
            let x_gu = data_view.getFloat32(offset, true);
            offset = offset + 4;
            let y_gu = -data_view.getFloat32(offset, true);
            offset = offset + 4;
            let missile_hit = false;
            if (id_weapon != id_weapon_missile && id_weapon != id_weapon_bombs)
              obj_particleImpacts.addShot(id_gameobj, x_gu, y_gu, id_weapon);
            else {
              let id_missile = data_view.getUint32(offset, true);
              offset = offset + 4;
              objD_missiles[id_missile] && delete objD_missiles[id_missile];
              missile_hit = true;
            }
            let sw_hit = false;
            while (true) {
              let id_gobj = data_view.getUint32(offset, true);
              offset = offset + 4;
              if (0 == id_gobj) break;
              let obj_gameentity: Plane | SpecialEntity = objD_planes[id_gobj];
              let cond_missile_hit = false;
              if (!obj_gameentity) {
                obj_gameentity = objD_specialEntities[id_gobj];
                if (obj_gameentity) cond_missile_hit = true;
              }
              if (id_gobj != qa && !cond_missile_hit) missile_hit = false;
              if (obj_gameentity) {
                obj_gameentity.hit(id_weapon);
                if (obj_plane && id_weapon == id_weapon_superweapon) {
                  sw_hit = true;
                  obj_plane.laserHit(x_gu, y_gu, true);
                }
                if (objG_player_plane) {
                  if (objG_player_plane.id == id_gobj)
                    objG_sfxManager.playSound(str_sfxid_phit, 1, 1, const_Q_0);
                  else if (id_gameobj == objG_player_plane.id)
                    objG_sfxManager.playSound(str_sfxid_phit, 1, 2, const_Q_0);
                }
              }
            }
            if (obj_plane && !sw_hit) obj_plane.laserHit(x_gu, y_gu, false);
            if (missile_hit) obj_particleImpacts.addMissileImpact(x_gu, y_gu);
          }
          if (0 < id_gameobj) {
            let loc_plane = objD_planes[id_gameobj];
            if (
              loc_plane &&
              id_weapon != id_weapon_missile &&
              id_weapon != id_weapon_bombs
            ) {
              loc_plane.ammo = ammo;
              loc_plane.setWeapon(id_weapon);
            }
          }
        }
      } else if (167 == msg_type || 174 == msg_type) {
        // process pickupItem list
        let offset = 1;
        while (true) {
          let id_pickup = data_view.getUint16(offset, true);
          let pickup_type: number;
          if (0 == id_pickup) break;
          offset += 2;
          if (174 == msg_type) {
            pickup_type = data_view.getUint16(offset, true);
            offset += 2;
          } else {
            pickup_type = data_view.getUint8(offset);
            offset += 1;
          }
          let x_gu = data_view.getFloat32(offset, true);
          offset += 4;
          let y_gu = -data_view.getFloat32(offset, true);
          offset += 4;
          let obj_pickupItem = new PickupItem();
          objD_pickups[id_pickup] = obj_pickupItem;
          obj_pickupItem.id = id_pickup;
          obj_pickupItem.setPosition(x_gu, y_gu);
          obj_pickupItem.type = pickup_type;
        }
      } else if (168 == msg_type || 173 == msg_type) {
        this.func_process_msg_grab(data_view, msg_type);
      } else if (170 == msg_type) {
        let offset = 1;
        let dat = data_view.getUint8(offset);
        if (3 == dat) ma++;
        else if (4 == dat) ma--;
        else {
          gb = 2 != dat ? data_view.getUint32(offset + 1, true) : 0;
          time_since_boost_pickup = 0;
          ha = dat;
        }
      } else if (16 == msg_type) {
        // event upcoming
        let flag_event_type: EventManager.eventType = data_view.getUint8(1);
        let time_s_until_start = data_view.getUint32(2, true);
        objG_eventManager.type = flag_event_type;
        objG_eventManager.waiting = true;
        objG_eventManager.endTime = +new Date() + 1e3 * time_s_until_start;
      } else if (17 == msg_type) {
        // no event?
        objG_eventManager.type = objG_eventManager.eventType.EVENT_NONE;
        objG_eventManager.waiting = false;
        objG_eventManager.endTime = 0;
      } else if (18 == msg_type || 19 == msg_type) {
        // event start
        let offset = 1;
        let event_type: EventManager.eventType = data_view.getUint8(offset);
        offset++;
        let time_s_until_end = data_view.getUint32(offset, true);
        offset += 4;
        objG_eventManager.waiting = false;
        objG_eventManager.setType(event_type);
        if (
          objG_eventManager.type == objG_eventManager.eventType.EVENT_WARSHIP
        ) {
          let warships_left = data_view.getUint8(offset);
          offset++;
          let warships_destroyed = data_view.getUint8(offset);
          offset++;
          let warships_escaped = data_view.getUint8(offset);
          objG_eventManager.setWarshipInfo(
            warships_left,
            warships_destroyed,
            warships_escaped,
          );
        }
        objG_followMode.whiteFlash = 1;
        objG_eventManager.endTime = +new Date() + 1e3 * time_s_until_end;
        if (objG_eventManager.isInstagib()) objG_eventManager.railSwitch = true;
        else if (objG_eventManager.isWarship()) objG_assets.loadWarshipEvent();
        else if (objG_eventManager.isSpaceWars())
          objG_assets.loadAsteroidEvent();
      } else if (20 == msg_type) {
        // event end?
        if (objG_eventManager.type != objG_eventManager.eventType.EVENT_WARSHIP)
          objG_followMode.whiteFlash = 1;
        objG_eventManager.waiting = false;
        if (objG_eventManager.isInstagib() || objG_eventManager.isSpaceWars())
          objG_eventManager.machinegunSwitch = true;
        objG_eventManager.setType(objG_eventManager.eventType.EVENT_NONE);
      } else if (22 == msg_type) {
        // event end
        objG_eventManager.waiting = false;
        if (objG_eventManager.type != objG_eventManager.eventType.EVENT_NONE) {
          if (
            objG_eventManager.type != objG_eventManager.eventType.EVENT_WARSHIP
          )
            objG_followMode.whiteFlash = 1;
          objG_eventManager.setType(objG_eventManager.eventType.EVENT_NONE);
        }
      } else if (23 == msg_type) {
        // warship deleted
        let offset = 1;
        let plane_id = data_view.getUint32(offset, true);
        offset += 4;
        if (0 < plane_id) {
          let plane = objD_planes[plane_id];
          if (plane) {
            let warship_killer_name = func_renameBlankPlayerNames(plane.name);
            objGUI_gameInfo.setWarshipRemoved(warship_killer_name);
          }
        } else objGUI_gameInfo.setWarshipRemoved();
        let warships_left = data_view.getUint8(offset);
        offset += 1;
        let warships_destroyed = data_view.getUint8(offset);
        offset += 1;
        let warships_escaped = data_view.getUint8(offset);
        objG_eventManager.setWarshipInfo(
          warships_left,
          warships_destroyed,
          warships_escaped,
        );
      } else if (21 == msg_type) {
        // event winner - sudden death
        let event_type = data_view.getUint8(1);
        let name = "";
        let offset = 2;
        while (true) {
          let utf16_char = data_view.getUint16(offset, true);
          offset += 2;
          if (0 == utf16_char) break;
          name += String.fromCharCode(utf16_char);
        }
        objGUI_gameInfo.setLastWinner(name, event_type);
      }
  }
  connectionClosed() {
    objG_followMode.gameCleanup();
    objG_wsConnection.sentHello = false;
    objG_wsConnection.hasConnection = false;
    objG_wsConnection.firstClientListing = true;
    W_connectionClosed();
    func_displayGameoverScore(-1);
    $("#topGui").hide();
    $("#topGuiConnecting").show();
    $("#copyLink").fadeOut(300);
    $(".btn-needs-server").attr("disabled", "disabled");
    let b = this.connectRetry;
    if (5 < b) b = 5;
    setTimeout(this.getServerAndConnect, 1e3 + 1e3 * b);
    objG_wsConnection.connectRetry++;
  }
  sendSingleByte(byte: number) {
    let arr = new ArrayBuffer(1);
    new DataView(arr).setUint8(0, byte);
    this.#ws_conn?.send(arr);
  }
  sendNick(name: string, continue_game: boolean) {
    myName = name;
    let arr = new ArrayBuffer(3 + 2 * name.length),
      datv = new DataView(arr),
      flag_contiue_game = 2;
    continue_game && (flag_contiue_game = 8);
    datv.setUint8(0, flag_contiue_game);
    datv.setUint8(1, intG_color_id);
    datv.setUint8(2, intG_decal_id);
    for (let i = 0; i < name.length; ++i)
      datv.setUint16(3 + 2 * i, name.charCodeAt(i), true);
    this.#ws_conn?.send(arr);
  }
  sendInput() {
    let arr = new ArrayBuffer(10),
      datv = new DataView(arr);
    datv.setUint8(0, 3);
    datv.setFloat64(1, objG_inputManager.angle, true);
    let uint8_type = 0;
    if (objG_inputManager.hover || !wa) uint8_type |= 1;
    if (!wa || bool_following_plane) uint8_type |= 2;
    datv.setUint8(9, uint8_type);
    this.#ws_conn?.send(arr);
  }
  sendDirection() {
    let arr = new ArrayBuffer(9),
      datv = new DataView(arr);
    datv.setUint8(0, 4);
    datv.setFloat64(1, objG_inputManager.angle, true);
    this.#ws_conn?.send(arr);
  }
  sendThrottle() {
    let arr = new ArrayBuffer(2),
      datv = new DataView(arr);
    datv.setUint8(0, 6);
    1 == objG_inputManager.throttle ? datv.setUint8(1, 1) : datv.setUint8(1, 0);
    this.#ws_conn?.send(arr);
  }
  sendBraking(isBraking: boolean) {
    let arr = new ArrayBuffer(2),
      datv = new DataView(arr);
    datv.setUint8(0, 4);
    isBraking ? datv.setUint8(1, 1) : datv.setUint8(1, 0);
    this.#ws_conn?.send(arr);
  }
  sendShooting(isShooting: boolean) {
    let arr = new ArrayBuffer(2),
      datv = new DataView(arr);
    datv.setUint8(0, 5);
    isShooting ? datv.setUint8(1, 1) : datv.setUint8(1, 0);
    this.#ws_conn?.send(arr);
  }
  leave() {
    let arr = new ArrayBuffer(1);
    new DataView(arr).setUint8(0, 7);
    this.#ws_conn?.send(arr);
  }
  ping() {
    if (this.hasConnection) {
      let arr = new ArrayBuffer(1);
      new DataView(arr).setUint8(0, 0);
      this.#ws_conn?.send(arr);
    }
  }
}
class FollowMode_R {
  #html_canvas: HTMLCanvasElement;
  #ctx_canvas: CanvasRenderingContext2D;
  #c = 0;
  #g = 0;
  #h = 0;
  #q = false;
  #n = 1;
  #k!: number;
  #m = 0;
  #l = 0;
  #y = false;
  #r = 1;
  #x!: number;
  #pa = 0;
  #L = 0;
  #T = false;
  #Ca = 1;
  #ta!: number;
  #N?: Timer;
  whiteFlash;
  resize: () => void;
  constructor(canvas: HTMLCanvasElement) {
    if (!canvas) {
      throw new Error("Canvas is not valid");
    }
    this.resize = () => {
      this.C();
      if (objG_eventManager.isSpaceWars()) {
        this.#N && clearTimeout(this.#N);
        this.#N = setTimeout(this.respawnParticles, 200);
      }
    };
    let e = () => {
      if (Z && objG_wsConnection.hasConnection) objG_wsConnection.sendInput();
    };
    this.whiteFlash = 0;
    this.#html_canvas = canvas;
    this.#ctx_canvas = this.#html_canvas.getContext("2d")!;
    this.C();
    objG_backgrounds = new Backgrounds();
    objG_animationManager = new AnimationManager();
    this.respawnParticles();
    objG_assets = new Assets();
    objG_assets.load(() => {
      console.log("Resources loaded!");
      objGUI_gameInfo = new UI_GameInfo();
      obj_particleImpacts = new ParticleImpacts();
      if (objG_wsConnection.hasConnection && !objG_wsConnection.sentHello)
        objG_wsConnection.hello();
      setInterval(e, 40);
      func_displaySelectedDecal(Math.floor(5 * Math.random()) + 1);
      func_displaySelectedColor(Math.floor(5 * Math.random()) + 1);
      console.log("Loading sounds!");
      objG_sfxManager = new SFXmanager();
      objG_sfxManager.load(() => {
        objG_sfxManager.playSound(str_sfxid_env, 1, 1, const_Q_0, (a) => {
          mb = a;
        });
      });
    });
    myName = "";
    objGUI_anchor = new UI_Anchor(this.#html_canvas, this.#ctx_canvas, 0, 0);
    objG_wsConnection = new WS_Connection();
    objG_wsConnection.getServerAndConnect();
  }

  followTopPlayer() {
    let max_score = -1;
    let max_score_plane_id = 0;
    for (let id in objD_planes)
      if (objD_planes[id].inGame) {
        let score = objD_planes[id].score;
        if (max_score < score) {
          max_score = score;
          max_score_plane_id = parseInt(id);
        }
      }
    if (max_score_plane_id) {
      objG_player_plane = objD_planes[max_score_plane_id];
      objG_player_plane.prepareFollow();
      Oa = current_following_plane_id = max_score_plane_id;
    }
  }
  PlayerFollowing(isFollowing: boolean) {
    this.#c = 0;
    let b, d, e;
    if (0 == listG_plane_ids.length) {
      current_following_plane_id = 0;
      objG_player_plane = undefined;
    } else {
      b = false;
      0 == Oa && (b = true);
      if (!b) {
        b = false;
        for (const ds in listG_plane_ids) {
          d = parseInt(ds);
          if (b) {
            e = objD_planes[listG_plane_ids[d]];
            if (!e.inGame) continue;
            current_following_plane_id = listG_plane_ids[d];
            objG_player_plane = e;
            objG_player_plane.prepareFollow();
            Oa = current_following_plane_id;
            return;
          }
          if (listG_plane_ids[d] == Oa)
            if (isFollowing) b = true;
            else {
              d--;
              0 > d && (d = listG_plane_ids.length - 1);
              e = objD_planes[listG_plane_ids[d]];
              current_following_plane_id = listG_plane_ids[d];
              objG_player_plane = e;
              objG_player_plane.prepareFollow();
              Oa = current_following_plane_id;
              return;
            }
        }
      }
      current_following_plane_id = listG_plane_ids[0];
      objG_player_plane = objD_planes[current_following_plane_id];
      objG_player_plane.prepareFollow();
      Oa = current_following_plane_id;
    }
  }
  waitUntilNextFollow() {
    this.#c = 3e3;
  }
  update(deltatime: number) {
    let b, f, s, t, w, D, E, ba;
    if (objG_assets.loaded) {
      if (objG_player_plane && !objG_player_plane.inGame && 0 == ka) {
        objG_player_plane = undefined;
        current_following_plane_id = 0;
      }
      if (objGUI_gameInfo) objGUI_gameInfo.update(deltatime);
      if (mb) objG_sfxManager.sound.volume(num_max_volume, mb);
      La = false;
      for (b in objD_pickups) {
        objD_pickups[b].update(deltatime);
        if (
          objD_pickups[b] &&
          !La &&
          objD_pickups[b].type == id_weapon_superweapon
        ) {
          La = true;
          str_name_superweapon_holder = undefined;
        }
      }
      let missile_index: number | undefined;
      for (b in objD_missiles) {
        objD_missiles[b].update(deltatime);
        if (objD_missiles[b].finished) missile_index = parseInt(b);
      }
      if (missile_index) delete objD_missiles[missile_index];
      let e: Plane | undefined;
      for (const bs in objD_planes) {
        let b = parseInt(bs);
        if (objD_planes[b].updateBool != objG_wsConnection.lastUpdateBool) {
          if (objD_planes[b] == objG_player_plane)
            current_following_plane_id = 0;
          delete objD_planes[b];
        } else {
          if (
            !La &&
            objD_planes[b].weapon == id_weapon_superweapon &&
            objD_planes[b].inGame
          ) {
            (La = true),
              (str_name_superweapon_holder = func_renameBlankPlayerNames(
                objD_planes[b].name,
              ));
          }
          if (sc == b && objD_planes[b].inGame) e = objD_planes[b];
          if (objG_eventManager.railSwitch) {
            objD_planes[b].setWeapon(id_weapon_railgun);
            objD_planes[b].ammo = -1;
          } else if (objG_eventManager.machinegunSwitch) {
            objD_planes[b].setWeapon(id_weapon_machinegun);
            objD_planes[b].ammo = -1;
          }
          objD_planes[b].update(deltatime);
        }
      }
      for (b in objD_specialEntities) objD_specialEntities[b].update(deltatime);
      if (objG_eventManager.railSwitch) objG_eventManager.railSwitch = false;
      if (objG_eventManager.machinegunSwitch)
        objG_eventManager.machinegunSwitch = false;
      objGUI_anchor.update(deltatime);
      this.#c -= deltatime;
      if (!Z && 0 == ka && null == objG_player_plane && 0 >= this.#c)
        for (b in objD_planes) {
          if (objD_planes[b].inGame) {
            objG_player_plane = objD_planes[b];
            objG_player_plane.prepareFollow();
            current_following_plane_id = parseInt(b);
          }
          break;
        }
      if (objG_eventManager.isSpaceWars()) {
        for (let i in list_particleDust) {
          list_particleDust[i].update(
            objGUI_anchor.getBounds(),
            //objGUI_anchor.zoom,
          );
          f = list_particleDust[i];
          if (0.1 < Math.abs(ca.x) + Math.abs(ca.y)) {
            f.x -= (f.z - 1) * ca.x * 0.5;
            f.y -= (f.z - 1) * ca.y * 0.5;
          }
        }
        ca.x = 0;
        ca.y = 0;
      }
      objG_animationManager.update(deltatime);
      H = {
        x:
          (this.#html_canvas.width / 2 +
            (objGUI_anchor.x * objGUI_anchor.zoom -
              this.#html_canvas.width / 2)) /
          objGUI_anchor.zoom,
        y:
          (this.#html_canvas.height / 2 +
            (objGUI_anchor.y * objGUI_anchor.zoom -
              this.#html_canvas.height / 2)) /
          objGUI_anchor.zoom,
      };
      objG_backgrounds.update(deltatime);
      if (null != objG_player_plane)
        if (objG_inputManager.mouseMoved) {
          deltatime = 1;
          bool_setting_highQuality || (deltatime = 2);
          Zb =
            (qc +
              (objGUI_anchor.x * objGUI_anchor.zoom -
                (this.#html_canvas.width * deltatime) / 2)) /
            objGUI_anchor.zoom;
          $b =
            (rc +
              (objGUI_anchor.y * objGUI_anchor.zoom -
                (this.#html_canvas.height * deltatime) / 2)) /
            objGUI_anchor.zoom;
          deltatime = Zb - objG_player_plane.x;
          s = $b - objG_player_plane.y;
          f = Math.sqrt(deltatime * deltatime + s * s);
          deltatime /= f;
          s /= f;
          objG_inputManager.hover = 75 < f ? 0 : 1;
          t = f = 0;
          if (wa) {
            f = deltatime;
            t = -s;
          }
          if (0 != f) {
            deltatime = Math.atan(t / f);
            0 > f && (deltatime = Math.PI + deltatime);
            deltatime += Math.PI / 2;
            objG_inputManager.angle = deltatime;
          }
        } else {
          objG_inputManager.hover = 1;
          objG_inputManager.angle = Math.PI;
        }
      t = objGUI_anchor.getBounds();
      deltatime = t[1].x;
      f = t[0].x;
      s = t[0].y;
      t = t[1].y;
      if (e && !func_isInsideBox(e.x, e.y, 30)) {
        w = H.x - e.x;
        D = H.y - e.y;
        let hyp = Math.sqrt(w * w + D * D);
        this.#n = 1;
        if (1300 < hyp) {
          this.#n = 1300 / hyp;
          if (0.4 > this.#n) this.#n = 0.4;
        }
        D /= w;
        let C = H.y - D * H.x;
        this.#h = 0 > w ? D * deltatime + C : D * f + C;
        if (this.#h < s) this.#h = s;
        else if (this.#h > t) this.#h = t;
        this.#g = (this.#h - C) / D;
        if (1 < D) D = 1;
        else if (-1 > D) D = -1;
        this.#k = Math.acos(D);
        if (0 > w) this.#k += Math.PI;
        this.#q = true;
      } else this.#q = false;
      w = false;
      ub = objG_player_plane ? plane_last_killed_by[objG_player_plane.id] : 0;
      if (ub && 0 < ub) {
        E = objD_planes[ub];
        if (E == e) w = true;
      }
      if (!E || func_isInsideBox(E.x, E.y, 30) || w) this.#y = false;
      else {
        w = H.x - E.x;
        D = H.y - E.y;
        E = Math.sqrt(w * w + D * D);
        this.#r = 1;
        if (1300 < E) {
          this.#r = 1300 / E;
          if (0.4 > this.#r) this.#r = 0.4;
        }
        D /= w;
        let C = H.y - D * H.x;
        this.#l = 0 > w ? D * deltatime + C : D * f + C;
        if (this.#l < s) this.#l = s;
        else if (this.#l > t) this.#l = t;
        this.#m = (this.#l - C) / D;
        if (1 < D) D = 1;
        else if (-1 > D) D = -1;
        this.#x = Math.acos(D);
        if (0 > w) this.#x += Math.PI;
        this.#y = true;
      }
      if (objG_eventManager.isWarship()) {
        E = 99999;
        let e = 0,
          lX = 0,
          lY = 0,
          N = 1,
          Y = 1;
        for (const bs in objD_specialEntities) {
          let b = parseInt(bs);
          let C = objD_specialEntities[b];
          if (C.state == const_Ic_0 && C.x > -Gborder_X && C.x < Gborder_X) {
            w = H.x - C.x;
            D = H.y - C.y;
            ba = Math.sqrt(w * w + D * D);
            if (ba < E) {
              lX = C.x;
              lY = C.y;
              E = ba;
              e = b;
              N = w;
              Y = D;
            }
          }
        }
        if (0 < e) {
          if (func_isInsideBox(lX, lY, 120)) this.#T = false;
          else {
            if (1300 < E) {
              this.#Ca = 900 / E;
              if (0.3 > this.#Ca) this.#Ca = 0.3;
            }
            D = Y / N;
            let C = H.y - D * H.x;
            this.#L = 0 > N ? D * deltatime + C : D * f + C;
            if (this.#L < s) this.#L = s;
            else if (this.#L > t) this.#L = t;
            this.#pa = (this.#L - C) / D;
            if (1 < D) D = 1;
            else if (-1 > D) D = -1;
            this.#ta = Math.acos(D);
            if (0 > N) this.#ta += Math.PI;
            this.#T = true;
          }
        } else this.#T = false;
      }
    }
  }
  draw(deltatime: number) {
    if (objG_assets.loaded) {
      objGUI_anchor.setupContext();
      objG_backgrounds.drawGradient(this.#ctx_canvas);
      objG_backgrounds.draw(this.#ctx_canvas);
      let c = objGUI_anchor.getBounds()[1].y,
        e = false,
        f;
      if (objG_eventManager.isSpaceWars())
        for (let i in list_particleDust)
          list_particleDust[i].draw(this.#ctx_canvas);
      else
        c > room_height / 2 - 25 &&
          ((e = true), objG_backgrounds.drawWaterBehind(this.#ctx_canvas));
      if (xa) {
        for (f in objD_pickups) objD_pickups[f].draw(this.#ctx_canvas);
        obj_particleImpacts.draw(this.#ctx_canvas);
        for (f in objD_missiles)
          objD_missiles[f].draw(this.#ctx_canvas, deltatime);
        for (f in objD_planes) objD_planes[f].draw(this.#ctx_canvas, deltatime);
        for (f in objD_planes) objD_planes[f].drawInfo(this.#ctx_canvas);
        Z && objG_player_plane?.drawInput(this.#ctx_canvas);
        for (f in objD_specialEntities)
          objD_specialEntities[f].draw(this.#ctx_canvas);
        objG_animationManager.drawExplosions(this.#ctx_canvas);
        objG_animationManager.drawBehind(this.#ctx_canvas);
      }
      e && objG_backgrounds.drawWaterFront(this.#ctx_canvas);
      if (xa) {
        if (!objG_eventManager.isSpaceWars()) {
          for (f in objD_planes)
            objD_planes[f].drawReflection(this.#ctx_canvas, deltatime);
          for (f in objD_missiles)
            objD_missiles[f].drawReflection(this.#ctx_canvas, deltatime);
          for (f in objD_specialEntities)
            objD_specialEntities[f].drawReflection(this.#ctx_canvas, deltatime);
        }
        objG_animationManager.drawLayer2(this.#ctx_canvas);
        objG_animationManager.draw(this.#ctx_canvas);
        for (f in objD_specialEntities)
          objD_specialEntities[f].drawInfo(this.#ctx_canvas);
        objG_backgrounds.drawLimits(this.#ctx_canvas);
        if (this.#q) {
          deltatime = 1;
          let c = 0 < qa;
          this.#ctx_canvas.save();
          this.#ctx_canvas.translate(this.#g, this.#h);
          this.#ctx_canvas.scale(this.#n, this.#n);
          if (c) {
            this.#ctx_canvas.save();
            let e = func_rotatePoint(0, 50, -this.#k);
            this.#ctx_canvas.translate(e.x, e.y);
            objG_assets.frames.crown.draw(this.#ctx_canvas);
            this.#ctx_canvas.restore();
          }
          this.#ctx_canvas.rotate(-this.#k);
          let e = 1.2;
          if (c) {
            this.#ctx_canvas.translate(0, -(-20 - 10 * deltatime));
            e = 0.9;
          } else this.#ctx_canvas.translate(0, -(-30 - 10 * deltatime));
          this.#ctx_canvas.fillStyle = "rgba(255,102,0,0.8)";
          this.#ctx_canvas.beginPath();
          this.#ctx_canvas.moveTo(-8 * deltatime * e, 0);
          this.#ctx_canvas.lineTo(8 * deltatime * e, 0);
          this.#ctx_canvas.lineTo(0, -20 * deltatime * e);
          this.#ctx_canvas.fill();
          this.#ctx_canvas.restore();
        }
        if (this.#y) {
          deltatime = 1;
          this.#ctx_canvas.save();
          this.#ctx_canvas.translate(this.#m, this.#l);
          this.#ctx_canvas.scale(this.#r, this.#r);
          this.#ctx_canvas.save();
          let pt = func_rotatePoint(0, 50, -this.#x);
          this.#ctx_canvas.translate(pt.x, pt.y);
          objG_assets.frames.revengeIcon.draw(this.#ctx_canvas);
          this.#ctx_canvas.restore();
          this.#ctx_canvas.rotate(-this.#x);
          this.#ctx_canvas.translate(0, -(-20 - 10 * deltatime));
          let e = 0.9;
          this.#ctx_canvas.fillStyle = "rgba(255,102,0,0.8)";
          this.#ctx_canvas.beginPath();
          this.#ctx_canvas.moveTo(-8 * deltatime * e, 0);
          this.#ctx_canvas.lineTo(8 * deltatime * e, 0);
          this.#ctx_canvas.lineTo(0, -20 * deltatime * e);
          this.#ctx_canvas.fill();
          this.#ctx_canvas.restore();
        }
        if (this.#T && objG_assets.warshipIcon) {
          deltatime = 1;
          this.#ctx_canvas.save();
          this.#ctx_canvas.translate(this.#pa, this.#L);
          this.#ctx_canvas.scale(this.#Ca, this.#Ca);
          this.#ctx_canvas.save();
          let pt = func_rotatePoint(0, 80, -this.#ta);
          this.#ctx_canvas.translate(pt.x, pt.y);
          this.#ctx_canvas.drawImage(
            objG_assets.warshipIcon,
            -objG_assets.warshipIcon.width / 2,
            -objG_assets.warshipIcon.height / 2,
          );
          this.#ctx_canvas.restore();
          this.#ctx_canvas.rotate(-this.#ta);
          let e = 0.9;
          this.#ctx_canvas.translate(0, -(-20 - 10 * deltatime));
          this.#ctx_canvas.fillStyle = "rgba(255,102,0,0.8)";
          this.#ctx_canvas.beginPath();
          this.#ctx_canvas.moveTo(-8 * deltatime * e, 0);
          this.#ctx_canvas.lineTo(8 * deltatime * e, 0);
          this.#ctx_canvas.lineTo(0, -20 * deltatime * e);
          this.#ctx_canvas.fill();
          this.#ctx_canvas.restore();
        }
      }
      objGUI_anchor.startUILayer();
      bool_drawUI && objGUI_gameInfo.draw(this.#ctx_canvas);
      if (0 < this.whiteFlash) {
        this.#ctx_canvas.save();
        this.#ctx_canvas.globalAlpha = this.whiteFlash;
        this.#ctx_canvas.fillStyle = "#FFFFFF";
        this.#ctx_canvas.fillRect(
          0,
          0,
          this.#html_canvas.width,
          this.#html_canvas.height,
        );
        this.#ctx_canvas.restore();
        this.whiteFlash -= 0.015;
      }
    }
  }
  gameCleanup() {
    objG_player_plane = undefined;
    current_following_plane_id = 0;
    Z = false;
    gb = ma = 0;
    objGUI_gameInfo && objGUI_gameInfo.clearBonusDisplay();
    for (let id in objD_pickups) delete objD_pickups[id];
    objD_pickups = {};
    for (let id in objD_missiles) delete objD_missiles[id];
    objD_missiles = {};
    for (let id in objD_planes) delete objD_planes[id];
    objD_planes = {};
    for (let id in objD_specialEntities) delete objD_specialEntities[id];
    objD_specialEntities = {};
  }
  C() {
    let scale_factor = 2,
      b,
      c;
    bool_setting_highQuality && (scale_factor = 1);
    this.#html_canvas.width = window.innerWidth / scale_factor;
    this.#html_canvas.height = window.innerHeight / scale_factor;
    canvas_width = this.#html_canvas.width;
    canvas_height = this.#html_canvas.height;
    b = canvas_height * scale_factor;
    c = -50 + 50 * scale_factor + "%";
    let a = "translate(" + c + "," + c + ") scale(" + scale_factor + ")";
    $("#canvas").css({
      transform: a,
    });
    $("#canvas").css({
      "-ms-transform": a,
    });
    $("#canvas").css({
      "-webkit-transform": a,
    });
    num_scale_factor =
      0.92 * Math.max(canvas_height / 1016, canvas_width / 1500);
    num_scale_factor *= window.devicePixelRatio / int_pixel_ratio;
    b = Math.min(1, b / 1016);
    if (0 < 640 * b) {
      b = "translate(-50%,0%) scale(" + b + ")";
      $("#mainDialog").css({
        transform: b,
      });
      $("#mainDialog").css({
        "-ms-transform": b,
      });
      $("#mainDialog").css({
        "-webkit-transform": b,
      });
      $("#mainDialog").css({
        top: "25%",
      });
    }
  }
  respawnParticles() {
    list_particleDust = [];
    for (let i = 0; 150 > i; i++) list_particleDust.push(new ParticleDust());
  }
}
class UI_Anchor {
  #c = 0;
  #g!: number;
  #h = 0;
  #q = 0;
  #n = 0;
  #k = 0;
  #minZoom = 1;
  #maxZoom = 2;
  #zoom = this.#minZoom;
  #html_canvas;
  #ctx_canvas;
  x;
  y;
  zoom!: number;
  minZoom!: number;
  maxZoom!: number;
  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
  ) {
    this.x = x;
    this.y = y;
    this.#html_canvas = canvas;
    this.#ctx_canvas = ctx;
  }

  setupContext() {
    let c = this.zoom,
      d = this.#html_canvas.width / 2 - this.x * c,
      f = this.#html_canvas.height / 2 - this.y * c;
    this.#ctx_canvas.setTransform(1, 0, 0, 1, 0, 0);
    this.#ctx_canvas.translate(d + this.#n, f + this.#k);
    this.#ctx_canvas.scale(c, c);
  }
  applyShake(deltatime: number) {
    if (xa)
      if (0 < this.#c) {
        let b = this.#g,
          d;
        if (250 > this.#c) b = (this.#c / 1e3 / 0.5) * this.#g;
        this.#h += 1;
        this.#q += 1.1;
        d = Math.sin(this.#h) * (b / 4);
        b = Math.cos(this.#q) * b;
        this.#n = d;
        this.#k = b;
        this.#c -= deltatime;
      } else this.#k = this.#n = 0;
  }
  update(deltatime: number) {
    let c = this.maxZoom + (this.minZoom - this.maxZoom);
    if (!xa) this.y = 470;
    if (Z || 1 != ka || bool_following_plane) {
      this.zoom = (1 / (window.devicePixelRatio / int_pixel_ratio)) * 1.2;
      this.zoom *= num_scale_factor;
      if (null != objG_player_plane) {
        ca.x = objG_player_plane.x - this.x;
        ca.y = objG_player_plane.y - this.y;
        this.x = objG_player_plane.x;
        this.y = objG_player_plane.y;
      }
    } else {
      c =
        (1 / (window.devicePixelRatio / int_pixel_ratio)) *
        0.7 *
        num_scale_factor;
      this.zoom += (c - this.zoom) / 10;
    }
    this.applyShake(deltatime);
  }
  setPosition(x: number, y: number) {
    ca.x = x - this.x;
    ca.y = y - this.y;
    this.x = x;
    this.y = y;
  }
  shake() {
    if (xa) {
      this.#c = 500;
      this.#g = 7;
    }
  }
  getBounds() {
    return [
      {
        x: this.x - this.#html_canvas.width / 2 / this.zoom,
        y: this.y - this.#html_canvas.height / 2 / this.zoom,
      },
      {
        x: this.x + this.#html_canvas.width / 2 / this.zoom,
        y: this.y + this.#html_canvas.height / 2 / this.zoom,
      },
    ];
  }
  getOuterBounds() {
    return [
      {
        x: this.x - this.#html_canvas.width / 2 / this.minZoom,
        y: this.y - this.#html_canvas.height / 2 / this.minZoom,
      },
      {
        x: this.x + this.#html_canvas.width / 2 / this.minZoom,
        y: this.y + this.#html_canvas.height / 2 / this.minZoom,
      },
    ];
  }
  getInnerBounds() {
    return [
      {
        x: this.x - this.#html_canvas.width / 2 / this.maxZoom,
        y: this.y - this.#html_canvas.height / 2 / this.maxZoom,
      },
      {
        x: this.x + this.#html_canvas.width / 2 / this.maxZoom,
        y: this.y + this.#html_canvas.height / 2 / this.maxZoom,
      },
    ];
  }
  startUILayer() {
    this.#ctx_canvas.setTransform(1, 0, 0, 1, 0, 0);
  }
}
class FrameImage {
  #x!: number;
  #y!: number;
  #u1!: number;
  #u2!: number;
  #image!: HTMLImageElement;
  #draw_width!: number;
  #draw_height!: number;
  width!: number;
  height!: number;
  y = 0;
  x = 0;
  canvas!: HTMLCanvasElement;
  frameWithCanvas(
    canvas: HTMLCanvasElement,
    draw_width: number,
    draw_height: number,
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas;
    this.#draw_width = draw_width;
    this.#draw_height = draw_height;
  }
  setFrameInfo(gamesheet_info: GameSheetMapping, gamesheet: HTMLImageElement) {
    this.#image = gamesheet;
    this.#x = gamesheet_info[1];
    this.#y = gamesheet_info[2];
    this.width = gamesheet_info[3];
    this.height = gamesheet_info[4];
    this.#u1 = gamesheet_info[5];
    this.#u2 = gamesheet_info[6];
    this.#draw_width = -this.width * this.#u1;
    this.#draw_height = -this.height * this.#u2;
  }
  draw(ctx: CanvasRenderingContext2D) {
    this.#image
      ? ctx.drawImage(
          this.#image,
          this.#x,
          this.#y,
          this.width,
          this.height,
          this.#draw_width + this.x,
          this.#draw_height + this.y,
          this.width,
          this.height,
        )
      : ctx.drawImage(
          this.canvas,
          0,
          0,
          this.width,
          this.height,
          this.#draw_width + this.x,
          this.#draw_height + this.y,
          this.width,
          this.height,
        );
  }
  renderTintedFrame(tint_color: string) {
    let f = document.createElement("canvas"),
      n = f.getContext("2d")!;
    f.width = this.width;
    f.height = this.height;
    let k = document.createElement("canvas");
    k.width = this.width;
    k.height = this.height;
    let m = k.getContext("2d")!;
    m.fillStyle = tint_color;
    m.fillRect(0, 0, k.width, k.height);
    m.globalCompositeOperation = "destination-atop";
    m.drawImage(
      this.#image,
      this.#x,
      this.#y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
    );
    n.globalAlpha = 1;
    n.drawImage(k, 0, 0);
    let tinted_frame_image = new FrameImage();
    tinted_frame_image.frameWithCanvas(f, this.#draw_width, this.#draw_height);
    return tinted_frame_image;
  }
  getImageCopy() {
    let c = document.createElement("canvas");
    c.width = this.width;
    c.height = this.height;
    let d = c.getContext("2d")!;
    d.drawImage(
      this.#image,
      this.#x,
      this.#y,
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
  }
  generateTintImage2(r: number, g: number, b: number, a: number) {
    let canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      this.#image,
      this.#x,
      this.#y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
    );
    let p = ctx.getImageData(0, 0, this.width, this.height),
      image_raw = p.data,
      size = image_raw.length;
    for (let t = 0; t < size; ) {
      image_raw[t] = image_raw[t++] * (1 - a) + r * a;
      image_raw[t] = image_raw[t++] * (1 - a) + g * a;
      image_raw[t] = image_raw[t++] * (1 - a) + b * a;
      image_raw[t] = 0.8 * image_raw[t++];
    }
    ctx.putImageData(p, 0, 0);
    let tinted_frame_image = new FrameImage();
    tinted_frame_image.frameWithCanvas(
      canvas,
      this.#draw_width,
      this.#draw_height,
    );
    return tinted_frame_image;
  }
  generateTintImage(
    img_rgbk: FrameImage.ImgRGBK,
    r: number,
    g: number,
    b: number,
  ) {
    let canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext("2d")!;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "copy";
    ctx.drawImage(img_rgbk[3], 0, 0);
    ctx.globalCompositeOperation = "lighter";
    if (0 < r) {
      ctx.globalAlpha = r / 255;
      ctx.drawImage(img_rgbk[0], 0, 0);
    }
    if (0 < g) {
      ctx.globalAlpha = g / 255;
      ctx.drawImage(img_rgbk[1], 0, 0);
    }
    if (0 < b) {
      ctx.globalAlpha = b / 255;
      ctx.drawImage(img_rgbk[2], 0, 0);
    }
    let frame_image = new FrameImage();
    frame_image.frameWithCanvas(canvas, this.#draw_width, this.#draw_height);
    return frame_image;
  }
  generateRGBKs(): FrameImage.ImgRGBK {
    let canvas = document.createElement("canvas");
    canvas.width = this.width;
    canvas.height = this.height;
    let ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      this.#image,
      this.#x,
      this.#y,
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height,
    );
    let image_data = ctx.getImageData(0, 0, this.width, this.height).data;
    let size = image_data.length;
    let img_R = this.getImageCopy();
    let img_G = this.getImageCopy();
    let img_B = this.getImageCopy();
    let img_K = this.getImageCopy();
    for (let i = 0; i < size; i += 4) {
      img_R.toData[i] = image_data[i];
      img_R.toData[i + 1] = 0;
      img_R.toData[i + 2] = 0;
      img_R.toData[i + 3] = image_data[i + 3];
      img_G.toData[i] = 0;
      img_G.toData[i + 1] = image_data[i + 1];
      img_G.toData[i + 2] = 0;
      img_G.toData[i + 3] = image_data[i + 3];
      img_B.toData[i] = 0;
      img_B.toData[i + 1] = 0;
      img_B.toData[i + 2] = image_data[i + 2];
      img_B.toData[i + 3] = image_data[i + 3];
      img_K.toData[i] = 0;
      img_K.toData[i + 1] = 0;
      img_K.toData[i + 2] = 0;
      img_K.toData[i + 3] = image_data[i + 3];
    }
    img_R.ctx.putImageData(img_R.to, 0, 0);
    img_G.ctx.putImageData(img_G.to, 0, 0);
    img_B.ctx.putImageData(img_B.to, 0, 0);
    img_K.ctx.putImageData(img_K.to, 0, 0);
    let R = new Image();
    let G = new Image();
    let B = new Image();
    let K = new Image();
    R.src = img_R.canvas.toDataURL();
    G.src = img_G.canvas.toDataURL();
    B.src = img_B.canvas.toDataURL();
    K.src = img_K.canvas.toDataURL();
    return [R, G, B, K];
  }
  renderToCanvas() {
    let c = document.createElement("canvas"),
      d = c.getContext("2d")!;
    c.width = this.width;
    c.height = this.height;
    let f = document.createElement("canvas");
    f.width = this.width;
    f.height = this.height;
    f.getContext("2d");
    if (this.#image)
      d.drawImage(
        this.#image,
        this.#x,
        this.#y,
        this.width,
        this.height,
        0,
        0,
        this.width,
        this.height,
      );
    else
      d.drawImage(
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
  }
}
namespace FrameImage {
  export type ImgRGBK = [
    R: HTMLImageElement,
    G: HTMLImageElement,
    B: HTMLImageElement,
    K: HTMLImageElement,
  ];
}
class AnimationManager {
  #animations: Record<string, Animation> = {};
  #runL1: DrawAnimation[] = [];
  #runL2: DrawAnimation[] = [];
  #runBG: DrawAnimation[] = [];
  #instances_DebrisMan: ParticleDebrisManager[] = [];
  addAnimationInfo(id_anim: string, obj_anim: Animation) {
    this.#animations[id_anim] = obj_anim;
  }
  // setAnimationInterval(a, d) {
  //   this.#animations[a].setInterval(d);
  // }
  createAnimation(id_anim: string) {
    let obj_anim = this.#animations[id_anim];
    let d = new DrawAnimation();
    d.setup(obj_anim);
    return d;
  }
  runAnimation(a: DrawAnimation) {
    this.#runL1.push(a);
  }
  runAnimationLayer2(a: DrawAnimation) {
    this.#runL2.push(a);
  }
  runAnimationBehind(a: DrawAnimation) {
    this.#runBG.push(a);
  }
  addBlast(
    x: number,
    y: number,
    size: number,
    max_parallel: number,
    strength: number,
  ) {
    let k = objG_animationManager.createAnimation("explosion");
    k.setScale(size);
    k.posX = x;
    k.posY = y;
    objG_animationManager.runAnimationBehind(k);
    x = 1 - func_calculateDistance2D(x, y, H.x, H.y) / num_sound_max_distance;
    if (0.01 < x)
      objG_sfxManager.playSound(
        str_sfxid_mexpl2,
        x * strength,
        1,
        max_parallel,
      );
  }
  addExplosion(x: number, y: number, v_x: number, v_y: number) {
    if (
      bool_drawExplosions &&
      func_isInsideBox(x, y, 100) &&
      func_isTimeElapsed_50ms()
    ) {
      if (1 >= this.#instances_DebrisMan.length) {
        let n = new ParticleDebrisManager();
        n.init(x, y, v_x, v_y);
        this.#instances_DebrisMan.push(n);
      }
      this.addBlast(x, y, 1, const_Sa_3, 1);
      objGUI_anchor.shake();
    }
  }
  update(deltatime: number) {
    for (const i in this.#runL1) {
      this.#runL1[i].update(deltatime);
      if (this.#runL1[i].deleting) this.#runL1.splice(parseInt(i), 1);
    }
    for (const i in this.#runBG) {
      this.#runBG[i].update(deltatime);
      if (this.#runBG[i].deleting) this.#runBG.splice(parseInt(i), 1);
    }
    for (const i in this.#runL2) {
      this.#runL2[i].update(deltatime);
      if (this.#runL2[i].deleting) this.#runL2.splice(parseInt(i), 1);
    }
    for (const i in this.#instances_DebrisMan) {
      this.#instances_DebrisMan[i].update(deltatime);
      if (this.#instances_DebrisMan[i].deleting)
        this.#instances_DebrisMan.splice(parseInt(i), 1);
    }
  }
  drawBehind(ctx: CanvasRenderingContext2D) {
    for (let b in this.#runBG) {
      let e = this.#runBG[b];
      ctx.save();
      ctx.translate(e.posX, e.posY);
      ctx.scale(e.scaleX, e.scaleY);
      ctx.rotate(e.rotation);
      e.draw(ctx);
      ctx.restore();
    }
  }
  drawLayer2(ctx: CanvasRenderingContext2D) {
    for (let b in this.#runL2) {
      let d = this.#runL2[b];
      ctx.save();
      ctx.translate(d.posX, d.posY);
      ctx.scale(d.scaleX, d.scaleY);
      ctx.rotate(d.rotation);
      d.draw(ctx);
      ctx.restore();
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    for (let b in this.#runL1) {
      let d = this.#runL1[b];
      ctx.save();
      ctx.translate(d.posX, d.posY);
      ctx.scale(d.scaleX, d.scaleY);
      ctx.rotate(d.rotation);
      d.draw(ctx);
      ctx.restore();
    }
  }
  drawExplosions(ctx: CanvasRenderingContext2D) {
    for (let d in this.#instances_DebrisMan)
      this.#instances_DebrisMan[d].draw(ctx);
  }
}
class DrawAnimation {
  #b = 0;
  #interval = 0;
  #f = 0;
  frames!: FrameImage[]; // setup()
  frameCount = 0;
  deleting = false;
  posY = 0;
  posX = 0;
  scaleY = 1;
  scaleX = 1;
  rotation = 0;
  alpha = 1;
  // copy(b) {
  //   b = new DrawAnimation();
  //   b.frames = this.frames;
  //   b.frameCount = this.frameCount;
  //   b.deleting = this.deleting;
  //   b.posX = this.posX;
  //   b.posY = this.posY;
  //   b.scaleX = this.scaleX;
  //   b.scaleY = this.scaleY;
  //   b.rotation = this.rotation;
  //   b.alpha = this.alpha;
  //   b.setInterval(this.#e);
  //   return b;
  // }
  setup(anim: Animation) {
    this.#interval = anim.interval;
    this.frames = anim.frames;
    this.frameCount = anim.frames.length;
  }
  setInterval(interval: number) {
    this.#interval = interval;
  }
  update(deltatime: number) {
    if (!this.deleting) {
      if (this.#f > this.#interval) {
        this.#b++;
        this.#f -= this.#interval;
      }
      this.#f += deltatime;
      if (this.#b >= this.frameCount) this.deleting = true;
    }
  }
  setScale(scale: number) {
    this.scaleY = this.scaleX = scale;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (1 > this.alpha) ctx.globalAlpha = this.alpha;
    this.frames[this.#b].draw(ctx);
  }
}
class Animation {
  frames: FrameImage[] = [];
  interval = 0;
  addFrame(img: FrameImage) {
    this.frames.push(img);
  }
  setInterval(interval: number) {
    this.interval = interval;
  }
}
class ParticleU_R {
  color: Record<string, string | number> = {
    h: "61",
    s: "100%",
    l: "100%",
    a: 1,
  };
  rotation = 0;
  scale = 1;
  pos = {
    x: 0,
    y: 0,
  };
  speed = {
    x: 0,
    y: 0,
  };
  time = 0;
  used = false;
  active = false;
  rotationSpeed = 0;
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate(this.rotation);
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
    ctx.translate(20, -2);
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, 2 * Math.PI, false);
    ctx.fillStyle = e;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-15, -32, 7, 0, 2 * Math.PI, false);
    ctx.fillStyle = e;
    ctx.fill();
    ctx.restore();
  }
}
class ParticleManager {
  #b = 0;
  #e = 0;
  #f: ParticleU_R[] = [];
  #d = 0;
  #a!: number; // init()
  #c!: number; // init()
  #g!: number; // init()
  #h!: number; // init()
  life = 400;
  debreeAge = 0;
  alpha = 1;
  init(q: number, x: number, y: number) {
    this.#d = q;
    this.#a = 0;
    this.#c = -0.03;
    this.#h = this.#g = 0;
    this.#b = x;
    this.#e = y;
    q = this.life / this.#d;
    for (let i = 0; i < this.#d; i++) {
      let j = new ParticleU_R();
      this.resetParticle(j);
      j.active = false;
      j.time = q * i;
      this.#f.push(j);
    }
  }
  resetParticle(particle: ParticleU_R) {
    particle.pos.x = this.#b;
    particle.pos.y = this.#e;
    particle.speed.x = this.#g;
    particle.speed.y = this.#h;
    particle.time = 0;
    particle.color.a = 1;
    particle.rotationSpeed = (Math.random() - 0.5) / 10;
    particle.rotation = 360 * Math.random();
  }
  update(deltatime: number) {
    deltatime = 1e3 / 60;
    let e, g, h, l;
    for (e = 0; e < this.#d; e++) {
      g = this.#f[e];
      if (g.time >= this.life) {
        if (!g.active) {
          g.active = true;
          g.time %= this.life;
        }
        this.resetParticle(g);
      }
      g.time += deltatime;
      if (g.active) {
        h = g.time / this.life;
        if (1 < h) h = 1;
        g.pos.x += 1 * g.speed.x;
        g.pos.y += 1 * g.speed.y;
        if (0 <= h && 0.1 > h) {
          l = h / 0.1;
          g.scale = 0.2;
        } else g.scale = 0.2 + (h - 0.1);
        g.rotation += g.rotationSpeed;
        if (0 <= h && 0.1 > h) {
          l = h / 0.1;
          if (0.8 < l) l = 0.8;
          g.color.a = l;
        } else g.color.a = 0.9 - (h - 0.1);
        if (0 <= h && 0.25 > h) {
          l = h / 0.25;
          g.color.h = 61 * (1 - l);
          g.color.s = "100%";
          g.color.l = "50%";
        } else if (0.25 <= h && 0.3 >= h) {
          l = (h - 0.25) / (0.3 - 0.25);
          g.color.h = 0;
          g.color.s = 100 * (1 - l) + "%";
          g.color.l = 100 * (0.4 + 0.1 * (1 - l)) + "%";
        }
        g.speed.x += 1 * this.#a;
        g.speed.y += 1 * this.#c;
      }
    }
  }
  updateExplosion(deltatime: number) {
    deltatime = 1e3 / 60;
    let e, g, h, l;
    for (e = 0; e < this.#d; e++) {
      g = this.#f[e];
      if (g.time >= this.life) {
        if (!g.active) {
          g.active = true;
          g.time %= this.life;
        }
        this.resetParticle(g);
      }
      g.time += deltatime;
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
        if (0 <= h && 0.1 > h) {
          l = h / 0.1;
          if (0.8 < l) l = 0.8;
          g.color.a = l * (1 - this.debreeAge);
        } else {
          l = Math.pow(1 - (h - 0.1) / 0.9, 1 + 5 * this.debreeAge);
          g.color.a = l.toFixed(2);
        }
        g.color.a = parseFloat(g.color.a as any) * this.alpha;
        if (0 <= h && 0.25 > h) {
          l = h / 0.25;
          g.color.h = (61 * (1 - l)).toFixed(2);
          h = 100 * (1 - this.debreeAge);
          g.color.s = h.toFixed(2) + "%";
          g.color.l = "50%";
        } else if (0.25 <= h && 0.4 >= h) {
          l = (h - 0.25) / (0.4 - 0.25);
          g.color.h = 0;
          h = 100 * (1 - l) * (1 - this.debreeAge);
          g.color.s = h.toFixed(2) + "%";
          g.color.l = (100 * (0.4 + 0.1 * (1 - l))).toFixed(2) + "%";
        }
        g.speed.x += 1 * this.#a;
        g.speed.y += 1 * this.#c;
      }
    }
  }
  updateMissileSmoke(deltatime: number) {
    deltatime = 1e3 / 60;
    let e, g, h, l;
    for (e = 0; e < this.#d; e++) {
      g = this.#f[e];
      if (g.time >= this.life) {
        if (!g.active) {
          g.active = true;
          g.time %= this.life;
        }
        this.resetParticle(g);
      }
      g.time += deltatime;
      if (g.active) {
        h = g.time / this.life;
        if (1 < h) h = 1;
        g.pos.x += 1 * g.speed.x;
        g.pos.y += 1 * g.speed.y;
        if (0 <= h && 0.1 > h) {
          l = h / 0.1;
          g.scale = 0.2;
        } else g.scale = 0.2 + 0.1 * (h - 0.1);
        g.rotation += g.rotationSpeed;
        if (0 <= h && 0.1 > h) {
          l = h / 0.1;
          if (0.8 < l) l = 0.8;
          g.color.a = l;
        } else g.color.a = 0.9 - (h - 0.1);
        if (0 <= h && 0.25 > h) {
          g.color.h = 57;
          g.color.s = "21%";
          g.color.l = "50%";
        } else if (0.25 <= h) {
          l = (h - 0.25) / 0.75;
          g.color.h = 57;
          g.color.s = "21%";
          h = 50 - 50 * l;
          if (10 > h) h = 10;
          g.color.l = h + "%";
        }
        g.speed.x += 1 * this.#a;
        g.speed.y += 1 * this.#c;
      }
    }
  }
  setPosition(x: number, y: number) {
    this.#b = x;
    this.#e = y;
  }
  setLife(duration: number) {
    this.life = duration;
  }
  draw(ctx: CanvasRenderingContext2D) {
    for (let i = this.#d - 1; 0 <= i; i--) {
      let particle = this.#f[i];
      if (particle.active) particle.draw(ctx);
    }
  }
}
class ParticleDebrisManager {
  #debris_instances: ParticleDebris[] = [];
  #x!: number; // init()
  #y!: number; // init()
  deleting = false;
  #gen_random(a: number) {
    // ( -a to a)
    return Math.random() * a - a / 2;
  }
  init(x: number, y: number, v_x: number, v_y: number) {
    let q, n, k, m, l, p, r;
    this.#x = x;
    this.#y = y;

    x = 2 + 4 * Math.random();
    y = 2 + 4 * Math.random();
    q = 2 + 4 * Math.random();
    Math.random();

    n = Math.PI / 4;
    k = this.#gen_random(Math.PI / 2);

    m = this.#gen_random(n) + k;
    l = Math.cos(m);
    m = Math.sin(m);

    p = (2 / 3) * Math.PI + this.#gen_random(n) + k;
    r = Math.cos(p);
    p = Math.sin(p);

    k = (4 / 3) * Math.PI + this.#gen_random(n) + k;
    n = Math.cos(k);
    k = Math.sin(k);

    this.addDebree(l * x + v_x, m * x + v_y);
    this.addDebree(r * y + v_x, p * y + v_y);
    this.addDebree(n * q + v_x, k * q + v_y);
  }
  addDebree(x: number, y: number) {
    let debris = new ParticleDebris();
    debris.init(this.#x, this.#y);
    debris.setSpeed(x, y);
    this.#debris_instances.push(debris);
  }
  update(deltatime: number) {
    let b = 0;
    for (let debreeID in this.#debris_instances) {
      let d = this.#debris_instances[debreeID];
      d.update(deltatime);
      if (d.deleting) this.#debris_instances.splice(parseInt(debreeID), 1);
      b++;
    }
    0 == b && (this.deleting = true);
  }
  draw(ctx: CanvasRenderingContext2D) {
    for (let debreeID in this.#debris_instances)
      this.#debris_instances[debreeID].draw(ctx);
  }
}
class ParticleDebris {
  #v_x!: number; // setSpeed()
  #v_y!: number; // setSpeed()
  #f!: number; // setSpeed()
  #d!: number; // setSpeed()
  #a!: number; // setSpeed()
  #c = 0.08;
  #x!: number; // init()
  #y!: number; // init()
  #obj_particleMan!: ParticleManager; // init()
  #n = 0;
  deleting = false;
  constructor() {
    if (objG_eventManager.isSpaceWars()) this.#c = 0;
  }
  init(x: number, y: number) {
    this.#x = x;
    this.#y = y;
    this.#obj_particleMan = new ParticleManager();
    this.#obj_particleMan.init(15, this.#x, this.#y);
  }
  setSpeed(x: number, y: number) {
    this.#v_x = x;
    this.#v_y = y;
    this.#f = 0;
    this.#d = 0.2 * this.#v_x;
    this.#a = 0.2 * this.#v_y;
  }
  update(deltatime: number) {
    this.#f += this.#c;
    this.#x += this.#v_x;
    this.#y += this.#v_y + this.#f;
    this.#v_x *= 0.975;
    this.#v_y *= 0.975;
    this.#c *= 0.975;
    if (Math.abs(this.#v_x) < Math.abs(this.#d)) this.#v_x = this.#d;
    if (Math.abs(this.#v_y) < Math.abs(this.#a)) this.#v_y = this.#a;
    if (3 < this.#f) this.#f = 3;
    this.#n += deltatime;
    if (500 < this.#n && 2300 >= this.#n)
      this.#obj_particleMan.debreeAge = (this.#n - 500) / 2300;
    else if (2300 < this.#n && 2500 >= this.#n)
      this.#obj_particleMan.alpha = (2500 - this.#n) / 200;
    else if (2500 < this.#n) this.deleting = true;
    if (!this.deleting) {
      this.#obj_particleMan.setPosition(this.#x, this.#y);
      this.#obj_particleMan.updateExplosion(deltatime);
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (!this.deleting) this.#obj_particleMan.draw(ctx);
  }
}
class Missile {
  #obj_particleTrails: ParticleTrails;
  #e = 0;
  #f = 0;
  lastUpdate = 0;
  id = -1;
  angle = 0;
  speed = 0;
  dstY = 0;
  dstX = 0;
  origY = 0;
  origX = 0;
  prevY = 0;
  prevX = 0;
  y = 0;
  x = 0;
  controlAngle = -90;
  frameSwitchTime = 40;
  timeToNextFrame = 0;
  flameState = true;
  //lastImage;
  first_set = true;
  colorHue = 0;
  finished = false;
  type = 0;
  constructor() {
    this.#obj_particleTrails = new ParticleTrails();
    this.#obj_particleTrails.tailAddJointInterval = 30;
    this.#obj_particleTrails.enabled = true;
    this.#obj_particleTrails.trailTime = 100;
    this.#obj_particleTrails.width = 1.2;
    this.#obj_particleTrails.fixedColor = true;
  }
  update(deltatime: number) {
    let a = func_clamp(
        (frametime_millis - this.lastUpdate) / num_global_physics_step_ms,
        0,
        1,
      ),
      c = this.y - this.prevY,
      g;
    if (0 == this.x - this.prevX && 0 == c) {
      this.#f++;
      if (50 < this.#f) this.finished = true;
    }
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = a * (this.dstX - this.origX) + this.origX;
    this.y = a * (this.dstY - this.origY) + this.origY;
    this.#obj_particleTrails.setPosition(this.x, this.y);
    this.#obj_particleTrails.update(deltatime);
    if (1 == this.type && objG_eventManager.isSpaceWars()) this.angle += 0.2;
    else if (2 != this.type) {
      a = room_height / 2;
      c = a - 100;
      if (this.y > c && this.y < a && 0 >= this.#e) {
        this.#e = 5;
        g = Math.random() / 2;
        c = (0.2 + (0.5 - ((a - this.y) / (a - c)) * 0.5)) * (0.95 + g);
        g = 20 * Math.sin(this.angle);
        obj_particleImpacts.addSplash(
          this.x - g,
          a + 5 * Math.random(),
          c,
          true,
        );
      }
      this.#e -= deltatime;
    }
  }
  draw(ctx: CanvasRenderingContext2D, deltatime: number) {
    let c = 1;
    this.timeToNextFrame -= deltatime;
    if (0 >= this.timeToNextFrame) {
      this.flameState = !this.flameState;
      this.timeToNextFrame = this.frameSwitchTime;
    }
    let e = 0.7;
    this.flameState && (e = 1);
    if (0 == this.type) {
      this.#obj_particleTrails.width = 1.5 * e;
      this.#obj_particleTrails.style = "rgba(247, 189, 57, 1.0)";
      this.#obj_particleTrails.draw(ctx);
      this.#obj_particleTrails.width = 0.4 * e;
      this.#obj_particleTrails.style = "rgba(232, 247, 59, 1.0)";
      this.#obj_particleTrails.draw(ctx);
      ctx.save();
      ctx.translate(this.x, this.y);
      this.flameState ? ctx.scale(0.7, 0.7) : ctx.scale(0.9, 0.9);
      ctx.rotate(this.angle);
      ctx.translate(-27, 0);
      objG_assets.frames.throttleFlame.draw(ctx);
      ctx.restore();
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    if (2 != this.type) {
      1 == this.type && (c = 1.4);
      ctx.scale(c, c);
      if (
        1 == this.type &&
        objG_assets.blinkImage &&
        objG_eventManager.isSpaceWars()
      ) {
        ctx.scale(2, 2);
        ctx.drawImage(
          objG_assets.blinkImage,
          -objG_assets.blinkImage.width / 2,
          -objG_assets.blinkImage.height / 2,
        );
        ctx.scale(0.5, 0.5);
      }
      ctx.rotate(this.angle);
      if (0 == this.type) objG_assets.frames.missile_attack.draw(ctx);
      else objG_assets.frames.bomb.draw(ctx);
    } else {
      ctx.beginPath(), (ctx.fillStyle = "#FF0000");
      ctx.arc(0, 0, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "#FFFFFF";
      ctx.arc(0, 0, 4, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.restore();
  }
  drawReflection(ctx: CanvasRenderingContext2D, deltatime: number) {
    let c = room_height / 2,
      e = c - this.y;
    if (!(0 > e || 170 < e)) {
      let f = e / 170;
      ctx.save();
      ctx.translate(this.x, c + e - 25);
      c = 1;
      30 > e && 15 <= e ? (c = (e - 15) / 15) : 15 > e && (c = 0);
      ctx.globalAlpha = 0.7 * (1 - f) * c;
      ctx.scale(1.1, 0.6);
      ctx.beginPath();
      ctx.fillStyle = "rgba(0,100,255,1.0)";
      ctx.arc(0, 0, 10, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
  }
  setPosition(x_gu: number, y_gu: number, id_plane: number) {
    this.origX = this.dstX;
    this.origY = this.dstY;
    this.dstX = 10 * x_gu;
    this.dstY = 10 * y_gu;
    if (this.first_set) {
      let obj_plane = objD_planes[id_plane];
      if (obj_plane) {
        y_gu = 5 * Math.abs(Math.cos(obj_plane.angle + Math.PI / 2));
        this.origX = obj_plane.x;
        this.origY = obj_plane.y + y_gu;
        this.x = obj_plane.x;
        this.y = obj_plane.y;
      } else {
        this.x = this.dstX;
        this.y = this.dstY;
        this.origX = this.dstX;
        this.origY = this.dstY;
      }
      this.first_set = false;
      1 == this.type && (this.angle = Math.PI / 2);
    }
    if (0 == this.type) {
      x_gu = this.dstX - this.origX;
      y_gu = this.dstY - this.origY;
      this.angle =
        0 <= x_gu ? Math.atan(y_gu / x_gu) : Math.atan(y_gu / x_gu) + Math.PI;
    }
  }
  setColorHue(hue: number) {
    this.colorHue = hue;
  }
  setType(flag_type: number) {
    this.type = flag_type;
  }
  getSpeedDirectionX() {
    return this.x - this.prevX;
  }
  getSpeedDirectionY() {
    return this.y - this.prevY;
  }
}
class ParticleTrails {
  #x: number = 0;
  #y: number = 0;
  tailAddJointInterval = 50;
  timeToNextJoint = 0;
  tailJoints: [Trail.TrailSegment[]] = [[]];
  trailTimeEffectStart = 600;
  trailTime = 600;
  trailEffectTime = 0;
  enabled = false;
  width = 1;
  fixedColor = false;
  style = "rgba(255, 255, 255, 0.0)";
  update(deltatime: number) {
    let d = this.tailJoints.length - 1;
    if (0 >= this.timeToNextJoint && -1 < d) {
      this.timeToNextJoint = this.tailAddJointInterval;
      if (this.enabled)
        this.tailJoints[d].push({
          x: this.#x,
          y: this.#y,
          origX: this.#x,
          origY: this.#y,
          t: frametime_millis,
          fx: (600 - Math.abs(this.trailEffectTime - 600)) / 600,
          style: this.style,
        });
      for (let i = 0; i <= d; i++) {
        let c = this.tailJoints[i].length;
        if (0 < c) {
          c = frametime_millis - this.tailJoints[i][0].t;
          if (c > this.trailTime) {
            this.tailJoints[i].splice(0, 1);
            0 == this.tailJoints[i].length && this.tailJoints.splice(i, 1);
          }
          break;
        }
      }
    }
    let tail_remain = this.timeToNextJoint / 50;
    d = this.tailJoints.length - 1;
    for (let i = 0; i <= d; i++) {
      let c = this.tailJoints[i].length;
      if (!(1 >= c)) {
        c = frametime_millis - this.tailJoints[i][0].t;
        if (c > this.trailTime - this.tailAddJointInterval) {
          c = this.tailJoints[i][0].origY - this.tailJoints[i][1].origY;
          this.tailJoints[i][0].x =
            this.tailJoints[i][1].origX +
            (this.tailJoints[i][0].origX - this.tailJoints[i][1].origX) *
              tail_remain;
          this.tailJoints[i][0].y =
            this.tailJoints[i][1].origY + c * tail_remain;
        }
      }
    }
    this.timeToNextJoint -= deltatime;
    this.trailEffectTime =
      0 > this.trailEffectTime ? 0 : this.trailEffectTime - deltatime;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (bool_drawTrails)
      for (let d = this.tailJoints.length, a = 0; a < d; a++)
        for (let c = this.tailJoints[a].length, e = 0; e < c - 1; e++) {
          ctx.strokeStyle = this.tailJoints[a][e].style!;
          let h = (e / c) * (8 + 8 * this.tailJoints[a][e].fx);
          0 == h && (h = 0.1);
          ctx.lineWidth = h * this.width;
          ctx.beginPath();
          ctx.lineTo(this.tailJoints[a][e].x, this.tailJoints[a][e].y);
          ctx.lineTo(this.tailJoints[a][e + 1].x, this.tailJoints[a][e + 1].y);
          ctx.stroke();
        }
  }
  setPosition(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }
  push() {
    this.tailJoints.push([]);
  }
  trailEffect() {
    this.trailEffectTime = 1200;
  }
  clear() {
    this.tailJoints = [[]];
  }
}
class ParticleFlags {
  #x: number = 0;
  #y: number = 0;
  tailJoints: [Trail.TrailSegment[]] = [[]];
  maxPoints = 1;
  flagDivisions = 5;
  letterMinDistance = 10;
  pointMinDistance = 10;
  texture!: HTMLImageElement; //setTexture()
  textureWidth!: number; //loaded
  textureHeight!: number; //loaded
  loaded = false;
  enabled = false;
  width = 1;
  style = "rgba(255, 255, 255, 0.3)";
  flagHeight!: number; //loaded
  flipX = false;
  flipY = true;
  stringScale = 1;
  scale = 1;
  setTexture(name: string) {
    this.texture = new Image();
    this.texture.src = "flags/" + name.toLowerCase() + ".png";
    this.texture.onload = () => {
      this.textureWidth = this.texture.width;
      this.textureHeight = this.texture.height;
      this.maxPoints = Math.floor(this.textureWidth / 12);
      this.flagDivisions = this.maxPoints - 1;
      let a = this.scale;
      this.flagHeight = 0.5 * this.textureHeight * a;
      a = (this.textureWidth * a) / this.flagDivisions;
      this.pointMinDistance = a;
      this.letterMinDistance = a;
      this.enabled = true;
      this.loaded = true;
    };
  }
  update(deltatime: number) {
    let complete = false;
    let count = this.tailJoints[0].length;
    if (0 == count) complete = true;
    else {
      let tail_segment = this.tailJoints[0][count - 1];
      let c = Math.sqrt(
        Math.pow(tail_segment.x - this.#x, 2) +
          Math.pow(tail_segment.y - this.#y, 2),
      );
      let c_old = c;
      if (1 < count) {
        let tail_segment = this.tailJoints[0][count - 2];
        c = Math.sqrt(
          Math.pow(tail_segment.x - this.#x, 2) +
            Math.pow(tail_segment.y - this.#y, 2),
        );
      }
      if (c_old > this.pointMinDistance && c > 3 * this.pointMinDistance)
        complete = true;
    }
    if (complete) {
      this.tailJoints[0].push({
        x: this.#x,
        y: this.#y,
        origX: this.#x,
        origY: this.#y,
        t: frametime_millis,
        fx: 0,
        style: this.style,
      });
      if (count > this.maxPoints) this.tailJoints[0].splice(0, 1);
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (bool_drawTrails && this.loaded && 0 < this.tailJoints.length) {
      let d = 0,
        a = 0,
        c = this.letterMinDistance,
        g = true,
        h = 0,
        q = 0,
        n = 0,
        k = 0,
        m = 0,
        l = 0,
        p = 0,
        r = 0;
      for (let s = this.tailJoints[0].length - 2; 0 <= s; s--) {
        let t = this.tailJoints[0][s].x,
          w = this.tailJoints[0][s].y,
          u;
        if (g) {
          d = this.#x;
          a = this.#y;
        }
        let vp = t - d,
          x = w - a,
          A = 0,
          C = 0,
          z = 0,
          B = 0,
          E = 0;
        u = Math.sqrt(Math.pow(vp, 2) + Math.pow(x, 2));
        if (0 == u)
          console.log("OOPS! Division by ZERO! " + s + " : " + vp + ":::" + x);
        else {
          A = vp / u;
          C = x / u;
        }
        let bool_cond = false;
        if (0 < u - c) {
          z = d + A * c;
          B = a + C * c;
          c = this.letterMinDistance;
          if (0 < h) {
            if (q < this.flagDivisions) {
              let flag_height = this.flagHeight;
              n = z - n;
              k = B - k;
              n /= this.letterMinDistance;
              k /= this.letterMinDistance;
              k = -k * flag_height;
              n *= flag_height;
              u = z + k;
              let v = B + n;
              x = z - k;
              E = B - n;
              let tex_width = this.textureWidth;
              let tex_height = this.textureHeight;
              let F, G, H, J;
              if (this.flipY && 0 < A) {
                F = 0;
                G = tex_height;
              } else {
                F = tex_height;
                G = 0;
              }
              if (this.flipX && 0 < A) {
                H = (q / this.flagDivisions) * tex_width;
                J = ((q + 1) / this.flagDivisions) * tex_width;
              } else {
                H = tex_width * (1 - q / this.flagDivisions);
                J = tex_width * (1 - (q + 1) / this.flagDivisions);
              }
              let ctx_r = ctx;
              let tex_r = this.texture;
              let list_vertices = [
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
              let list_triangles = [
                [0, 1, 2],
                [2, 3, 0],
              ];
              for (p = 0; 2 > p; p++) {
                let triangle = list_triangles[p];
                r = list_vertices[triangle[0]].x;
                u = list_vertices[triangle[1]].x;
                v = list_vertices[triangle[2]].x;
                x = list_vertices[triangle[0]].y;
                E = list_vertices[triangle[1]].y;
                F = list_vertices[triangle[2]].y;
                G = list_vertices[triangle[0]].u;
                H = list_vertices[triangle[1]].u;
                J = list_vertices[triangle[2]].u;
                let L = list_vertices[triangle[0]].v;
                let M = list_vertices[triangle[1]].v;
                let D = list_vertices[triangle[2]].v;
                ctx_r.save();
                ctx_r.beginPath();
                ctx_r.moveTo(r, x);
                ctx_r.lineTo(u, E);
                ctx_r.lineTo(v, F);
                ctx_r.closePath();
                ctx_r.clip();
                let N = G * M + L * J + H * D - M * J - L * H - G * D;
                ctx_r.transform(
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
                ctx_r.drawImage(tex_r, 0, 0);
                ctx_r.restore();
              }
              q++;
            } else break;
            m = z + k;
            l = B + n;
            p = z - k;
            r = B - n;
          } else {
            d = this.flagHeight;
            n = z - this.#x;
            k = B - this.#y;
            n /= this.letterMinDistance;
            k /= this.letterMinDistance;
            k = -k * d;
            n *= d;
            m = z + k;
            l = B + n;
            p = z - k;
            r = B - n;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.lineTo(this.#x, this.#y);
            ctx.lineTo(z + k * this.stringScale, B + n * this.stringScale);
            ctx.stroke();
            ctx.beginPath();
            ctx.lineTo(this.#x, this.#y);
            ctx.lineTo(z - k * this.stringScale, B - n * this.stringScale);
            ctx.stroke();
          }
          n = z;
          k = B;
          h++;
          bool_cond = true;
        } else c -= u;
        if (bool_cond) {
          d = z;
          a = B;
          s++;
        } else {
          d = t;
          a = w;
        }
        if (g) g = false;
      }
    }
  }
  setPosition(x: number, y: number) {
    this.#x = x;
    this.#y = y;
  }
  push() {}
  trailEffect() {}
  clear() {
    this.tailJoints = [[]];
  }
}
namespace Trail {
  export type TrailSegment = {
    x: number;
    y: number;
    origX: number;
    origY: number;
    t: number;
    fx: number;
    style: string;
  };
}
class ScoreAccumInfo {
  #drawable_canvas_img: ScoreAccumInfo.HTMLCanvasElementExtended[] = [];
  #inst_create_time_list: number[] = [];
  #last_inst_time?: number;
  update(deltatime: number) {
    if (
      0 < this.#inst_create_time_list.length &&
      2e3 < frametime_millis - this.#inst_create_time_list[0]
    ) {
      this.#drawable_canvas_img.shift();
      this.#inst_create_time_list.shift();
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = 1;
    for (let i in this.#drawable_canvas_img) {
      let canvas_img = this.#drawable_canvas_img[i],
        f = Math.sqrt(
          (frametime_millis - this.#inst_create_time_list[i]) / 2e3,
        ),
        h = 0.8 >= f ? f / 0.8 : 1 - (f - 0.8) / 0.2;
      ctx.globalAlpha = h;
      ctx.drawImage(canvas_img, -canvas_img.width / 2, 40 * -f - 10);
    }
    ctx.globalAlpha = 1;
  }
  addScore(diff: number) {
    let a = false,
      c;
    if (this.#last_inst_time && 500 > frametime_millis - this.#last_inst_time)
      a = true;
    c = new StyleStroke(13, "#FFFFFF");
    c.setFont("px 'proxima-nova-1','proxima-nova-2', Arial Black");
    if (a) {
      diff =
        this.#drawable_canvas_img[this.#drawable_canvas_img.length - 1].number +
        diff;
    } else this.#last_inst_time = frametime_millis;
    c.setValue("+" + diff);
    c = c.render() as ScoreAccumInfo.HTMLCanvasElementExtended;
    c.number = diff;
    if (a) {
      this.#drawable_canvas_img.pop();
      this.#drawable_canvas_img.push(c);
    } else {
      this.#drawable_canvas_img.push(c);
      this.#inst_create_time_list.push(+new Date());
    }
  }
}
namespace ScoreAccumInfo {
  export type HTMLCanvasElementExtended = HTMLCanvasElement & {
    number: number;
  };
}
class SFXmanager {
  #isLoaded = false;
  #instance_tracker: Record<string, number> = {};
  #clip_info: SFXmanager.SoundSpriteDefinitions = {
    bigsplash: [0, 1889.795918367347],
    cannonshoot: [3e3, 777.8684807256235],
    crash: [5e3, 991.7913832199545],
    env: [7e3, 4486.984126984126, true],
    hgrab: [13e3, 208.9115646258506],
    king: [15e3, 1162.01814058957],
    kinglaser: [18e3, 533.9909297052152],
    laser: [2e4, 203.4467120181418],
    laserloop: [22e3, 898.934240362813, true],
    lasershot: [24e3, 367.6643990929698],
    lockon: [26e3, 46.14512471655274],
    mexpl: [28e3, 1007.8231292517011],
    mlaunch: [31e3, 661.4512471655338],
    phit: [33e3, 206.30385487528002],
    planeloop: [35e3, 1427.7551020408196, true],
    rail: [38e3, 840.7482993197277],
    shot: [4e4, 101.81405895691853],
    trishot: [42e3, 392.81179138321676],
    warn: [44e3, 2109.365079365077],
    waterloop: [48e3, 629.9092970521514, true],
    weapgrab: [5e4, 202.06349206349472],
    winggrab: [52e3, 111.97278911564723],
    woosh: [54e3, 486.2585034013591],
  };
  sound!: SFXmanager.Howl;
  load(callback: () => void) {
    // @ts-ignore old version types unavailable
    this.sound = new Howl({
      urls: [
        "sounds/out.mp3",
        "sounds/out.ogg",
        "sounds/out.m4a",
        "sounds/out.ac3",
      ],
      sprite: this.#clip_info,
      onload: () => {
        this.#isLoaded = true;
        callback && callback();
      },
    });
  }
  playSound(
    sfx_name: string,
    volume: number,
    speed: number,
    max_parallel: number,
    callback?: (nodeId: number) => void,
  ) {
    if (this.#isLoaded && 0 != num_setting_muteVol && wa) {
      volume *= num_max_volume;
      let q = this.#clip_info[sfx_name];
      if (!this.#instance_tracker[sfx_name])
        this.#instance_tracker[sfx_name] = 0;
      if (
        !(0 < max_parallel && this.#instance_tracker[sfx_name] >= max_parallel)
      ) {
        this.sound.play(sfx_name, (nodeId: number) => {
          let gameNode = objG_sfxManager.sound._nodeById(nodeId);
          if (gameNode?.bufferSource)
            gameNode.bufferSource.playbackRate.value = speed;
          objG_sfxManager.sound.volume(volume, nodeId);
          callback?.(nodeId);
        });
        if (max_parallel != const_Q_0) this.#instance_tracker[sfx_name]++;
        setTimeout(() => {
          if (max_parallel != const_Q_0) this.#instance_tracker[sfx_name]--;
        }, q[1]);
      }
    }
  }
  // stop(d) {
  //   this.#b && d.stop();
  // }
  // setVolume(b) {
  //   this.sound.volume(b);
  // }
}
namespace SFXmanager {
  export type SoundSpriteDefinitions = Record<
    string | number,
    | [start: number, end: number]
    | [start: number, end: number, looping: boolean]
  >;
  export interface GainNode {
    bufferSource?: {
      playbackRate: {
        value: number;
      };
    };
  }
  export interface Howl {
    constructor(options: {
      urls: string[];
      sprite: SoundSpriteDefinitions;
      onload?: () => void;
    }): Howl;
    play(sfx_name: string, callback?: (end: number) => void): number;
    stop(id: number): number;
    volume(volume: number, nodeId?: number): number;
    _nodeById(id: number): GainNode | undefined;
  }
}
class UI_KillStatus {
  #b: number[] = [];
  #s1?: StyleStroke;
  #txt1?: HTMLCanvasElement;
  #s2?: StyleStroke;
  #draw_frame?: HTMLCanvasElement | FrameImage;
  #opacity = 0;
  #h = 0;
  #e = 2e3;
  #q = false;
  #scale = 1;
  #m = 0;
  #l = 0;
  #txt2?: HTMLCanvasElement;
  update(deltatime: number) {
    if (1 == this.#opacity) {
      this.#h += deltatime;
      if (this.#h > this.#e) this.#q = true;
    }
    if (this.#q) {
      this.#opacity -= 0.2;
      if (0 > this.#opacity) {
        this.#opacity = 0;
        this.#b.shift();
        if (0 < this.#b.length) this.processCode(this.#b[0]);
        else this.#txt1 = undefined;
      }
      this.#m = -(1 - this.#opacity);
    } else {
      if (1 > this.#opacity) {
        this.#opacity += 0.2;
        if (1 < this.#opacity) this.#opacity = 1;
      }
      this.#m = 1 - (1.5 * this.#opacity - 0.75) / 0.75;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.#txt1) {
      ctx.globalAlpha = this.#opacity;
      ctx.scale(
        (this.#scale + 0.2 * this.#m) * num_scale_factor,
        (this.#scale + 0.2 * this.#m) * num_scale_factor,
      );
      ctx.drawImage(
        this.#txt1,
        -this.#txt1.width / 2,
        -this.#txt1.height + 120,
      );
      ctx.drawImage(this.#txt2!, -this.#txt2!.width / 2, 110);
      if (this.#draw_frame!.constructor === FrameImage) {
        this.#draw_frame.y = 30;
        this.#draw_frame.draw(ctx);
      } else if (this.#draw_frame!.constructor === HTMLCanvasElement) {
        ctx.drawImage(
          this.#draw_frame,
          -this.#draw_frame.width / 2 - 5,
          -this.#draw_frame.height - this.#txt1.height + 120,
        );
      }
    }
  }
  replaceCode(flag_streak: number) {
    for (let c in this.#b) {
      if (64 >= this.#b[c] && 64 >= flag_streak)
        return this.#b[c] < flag_streak ? ((this.#b[c] = flag_streak), c) : -2;
      if (
        (256 == this.#b[c] && 256 == flag_streak) ||
        (128 == this.#b[c] && 128 == flag_streak) ||
        4096 == flag_streak
      )
        return c;
    }
    return -1;
  }
  push(flag_streak: number, kills: number) {
    if (256 == flag_streak) this.#l = kills;
    let d = this.replaceCode(flag_streak);
    if (-1 == d) {
      this.#b.push(flag_streak);
      if (1 == this.#b.length) this.processCode(flag_streak);
    } else if (0 == d) this.processCode(flag_streak);
  }
  processCode(flag_streak: number) {
    this.#q = false;
    this.#opacity = this.#h = 0;
    let str_type = "",
      str_postfix = "KILL",
      color;
    if (8 == flag_streak) {
      str_type = "DOUBLE";
      color = "#cd9a6d";
      this.#draw_frame = objG_assets.doubleKillCanvas;
      this.#scale = 0.8;
    } else if (16 == flag_streak) {
      str_type = "TRIPLE";
      color = "#95b9c9";
      this.#draw_frame = objG_assets.tripleKillCanvas;
      this.#scale = 0.9;
      str_postfix += "!";
    } else if (32 == flag_streak) {
      str_type = "QUAD";
      color = "#f0a400";
      this.#draw_frame = objG_assets.quadKillCanvas;
      this.#scale = 1;
      str_postfix += "!!";
    } else if (64 == flag_streak) {
      str_type = "MULTI";
      color = "#de0000";
      this.#draw_frame = objG_assets.multiKillCanvas;
      this.#scale = 1.1;
      str_postfix += "!!";
    } else if (128 == flag_streak) {
      str_type = "NEAR";
      color = "#ffe774";
      this.#draw_frame = objG_assets.frames.nearmiss;
      this.#scale = 0.8;
      str_postfix = "MISS";
    } else if (4096 == flag_streak) {
      str_type = "REVENGE";
      color = "#dd1824";
      this.#draw_frame = objG_assets.frames.revenge;
      this.#scale = 1;
      str_postfix = "KILL";
    } else if (256 == flag_streak) {
      str_type = this.#l + " KILL STREAK!";
      color = "#a5dd11";
      this.#draw_frame = objG_assets.frames.frenzy;
      this.#scale = 0.8;
      str_postfix = "";
    }
    if ("" != str_type) {
      this.#s1 = new StyleStroke(40, color, true, "#000000");
      this.#s1.setValue(str_type);
      this.#s1.setStrokeWidth(10);
      this.#txt1 = this.#s1.render();
      this.#s2 = new StyleStroke(40, color, true, "#000000");
      this.#s2.setValue(str_postfix);
      this.#s2.setStrokeWidth(10);
      this.#txt2 = this.#s2.render();
    }
  }
  clearNearMiss() {
    for (let i in this.#b)
      if (128 == this.#b[i]) {
        if (i == "0") {
          this.#h = this.#e;
        } else {
          this.#b.splice(parseInt(i), 1);
        }
        break;
      }
  }
  clear() {
    this.#b = [];
    if (this.#txt1 != null) {
      this.#q = true;
    }
  }
  shouldDraw() {
    return this.#opacity;
  }
}
class SpecialEntity {
  #e = 1;
  #f = 20;
  #d = 100;
  #a = 1;
  #b = false;
  isShooting = false;
  isBot = false;
  lastUpdate = 0;
  highlightValue = 0;
  state = 0;
  id = -1;
  dstFloatValue = 0;
  dstY = 0;
  dstX = 0;
  origFloatValue = 0;
  origY = 0;
  origX = 0;
  prevFloatValue = 0;
  prevY = 0;
  prevX = 0;
  floatValue = 0;
  y = 0;
  x = 0;
  energy = 255;
  inGame = true;
  updateBool = false;
  dstAngle = Math.PI / 2;
  origAngle = Math.PI / 2;
  angle = Math.PI / 2;
  name = "";
  first_set = true;
  type = 0;
  warshipContext?: CanvasRenderingContext2D;
  warshipCanvas?: HTMLCanvasElement;
  fragment = 1;
  recoilTime = 0;
  cannonAngle = 0;
  dstCannonAngle = 0;
  origCannonAngle = 0;
  speed = 0;
  update(deltatime: number) {
    if (this.inGame) {
      if (func_isInsideBox(this.x, this.y + this.floatValue, 120)) {
        if (!this.#b) this.#b = true;
      } else this.#b = false;
      let g = func_clamp(
        (frametime_millis - this.lastUpdate) / num_global_physics_step_ms,
        0,
        1,
      );
      this.prevX = this.x;
      this.prevY = this.y;
      this.prevFloatValue = this.floatValue;
      let h = g * (this.dstY - this.origY) + this.origY,
        q =
          g * (this.dstFloatValue - this.origFloatValue) + this.origFloatValue;
      this.x = g * (this.dstX - this.origX) + this.origX;
      this.y = h;
      this.floatValue = q;
      this.angle = g * (this.dstAngle - this.origAngle) + this.origAngle;
      this.cannonAngle =
        g * (this.dstCannonAngle - this.origCannonAngle) + this.origCannonAngle;
      if (0 < this.highlightValue) {
        this.highlightValue -= 0.06;
        if (0 > this.highlightValue) this.highlightValue = 0;
      }
      if (this.type == id_entity_warship && 1 == this.state && 0 < this.#f) {
        this.#e -= 0.02;
        if (0 > this.#e) this.#e = 0;
        this.#d -= deltatime;
        if (0 > this.#d) {
          this.#d = 150;
          this.#f -= 1;
          g =
            Math.random() * objG_assets.warshipImage.width -
            objG_assets.warshipImage.width / 2;
          h =
            (Math.random() * objG_assets.warshipImage.height) / 2 -
            objG_assets.warshipImage.height / 4;
          objG_animationManager.addBlast(
            this.x + g,
            this.y + h + q,
            0.5,
            const_Q_0,
            2,
          );
        }
      }
      if (2 == this.state) {
        this.#a -= 0.01;
        if (0 > this.#a) this.#a = 0;
      } else {
        this.#a += 0.01;
        if (1 < this.#a) this.#a = 1;
      }
      this.recoilTime = 0 < this.recoilTime ? this.recoilTime - deltatime : 0;
    }
  }
  loadWarshipCanvas() {
    let a = document.createElement("canvas"),
      b = a.getContext("2d")!,
      d = objG_assets.warshipImage.height;
    a.width = objG_assets.warshipImage.width;
    a.height = d;
    this.warshipCanvas = a;
    this.warshipContext = b;
  }
  draw(ctx: CanvasRenderingContext2D) {
    if (this.inGame && this.#b)
      if (this.type == id_entity_warship && objG_assets.warshipLoaded) {
        if (
          objG_assets.warshipImage &&
          (!this.warshipCanvas || !this.warshipContext)
        )
          this.loadWarshipCanvas();
        if (this.warshipCanvas && this.warshipContext) {
          ctx.save();
          ctx.globalAlpha = this.#a;
          ctx.translate(this.x, this.y - 4);
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
          if (0 < this.highlightValue) {
            this.warshipContext.globalAlpha = 0.8 * this.highlightValue;
            this.warshipContext.drawImage(objG_assets.whiteWarshipImage, 0, 0);
            this.warshipContext.globalAlpha = 1;
          }
          this.warshipContext.restore();
          if (1 == this.state) ctx.globalAlpha = 0.8;
          ctx.drawImage(
            this.warshipCanvas,
            -objG_assets.warshipImage.width / 2,
            -objG_assets.warshipImage.height / 2,
          );
          ctx.restore();
        }
      } else if (this.type == id_entity_asteroid && objG_assets.asteroidImage) {
        ctx.save();
        ctx.globalAlpha = this.#a;
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);
        this.#d = (3 - this.fragment + 1) / 3;
        ctx.scale(this.#d, this.#d);
        ctx.drawImage(
          objG_assets.asteroidImage,
          -objG_assets.asteroidImage.width / 2,
          -objG_assets.asteroidImage.height / 2,
        );
        if (0 < this.highlightValue) {
          ctx.globalAlpha = 0.8 * this.highlightValue;
          ctx.drawImage(
            objG_assets.whiteAsteroidImage,
            -objG_assets.asteroidImage.width / 2,
            -objG_assets.asteroidImage.height / 2,
          );
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      }
  }
  drawReflection(ctx: CanvasRenderingContext2D, deltatime: number) {
    if (this.warshipCanvas && this.warshipContext) {
      if (
        this.inGame &&
        this.#b &&
        this.type == id_entity_warship &&
        objG_assets.warshipLoaded
      ) {
        ctx.save();
        ctx.globalAlpha = 0.15 * this.#a;
        ctx.translate(this.x, this.y + this.warshipCanvas.height - 4);
        ctx.scale(1, -1);
        ctx.drawImage(
          this.warshipCanvas,
          -objG_assets.warshipImage.width / 2,
          -objG_assets.warshipImage.height / 2,
        );
        ctx.restore();
        ctx.save();
        ctx.translate(
          this.x + 85 + this.floatValue + 100 * this.angle,
          this.y + this.warshipCanvas.height / 2 - 4,
        );
        ctx.globalAlpha = this.#e * this.#a;
        ctx.beginPath();
        ctx.moveTo(-3, 1.5);
        ctx.lineTo(0, -1.5);
        ctx.lineTo(-300, 0);
        ctx.fillStyle = "rgba(255,255,255,1.0)";
        ctx.fill();
        ctx.restore();
        ctx.globalAlpha = 1;
      }
    }
  }
  drawInput(ctx: CanvasRenderingContext2D) {}
  drawInfo(ctx: CanvasRenderingContext2D) {
    if (
      this.inGame &&
      this.#b &&
      this.state == const_Ic_0 &&
      65535 != this.energy
    ) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.fillStyle = "rgba(126,219,226,1)";
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      ctx.shadowBlur = 0;
      ctx.shadowColor = "rgba(255, 255, 255, 0.7)";
      ctx.lineWidth = 1;
      let d = 28,
        e;
      if (this.type == id_entity_asteroid) {
        e = 50 / this.fragment;
        d *= 3 / this.fragment;
      } else {
        e = 55;
        d *= 5;
      }
      let f = 512;
      if (32767.5 > this.energy && 16383.75 < this.energy) f = 30;
      else if (16383.75 > this.energy) f = 0;
      ctx.fillStyle = "hsl(" + f + ", 100%, 50%)";
      ctx.fillRect(-d / 2 + 0, e + 0, (this.energy / 65535) * d, 8);
      ctx.strokeStyle = "rgba(255,255,255,1.0)";
      ctx.strokeRect(-d / 2, e, d, 8);
      ctx.restore();
    }
  }
  hit(id_weapon: number) {
    if (func_isTimeElapsed_50ms()) {
      this.highlightValue =
        id_weapon == id_weapon_missile || this.type == id_entity_asteroid
          ? this.highlightValue + 1
          : this.highlightValue + 0.3;
      if (1 < this.highlightValue) this.highlightValue = 1;
    }
  }
  setPose(x_gu: number, y_gu: number, angle: number) {
    this.origX = this.x;
    this.origY = this.y;
    this.origAngle = this.dstAngle;
    this.dstX = 10 * x_gu;
    this.dstY = 10 * y_gu;
    this.dstAngle = angle;
    if (this.first_set) {
      this.origX = this.dstX;
      this.origY = this.dstY;
      this.x = this.dstX;
      this.y = this.dstY;
      this.origAngle = this.dstAngle;
      this.first_set = false;
    } else {
      x_gu = this.dstX - this.origX;
      y_gu = this.dstY - this.origY;
      this.speed = Math.sqrt(x_gu * x_gu + y_gu * y_gu) / 3;
    }
    if (!this.inGame) this.inGame = true;
  }
  setFloatValue(float_gu: number) {
    this.origFloatValue = this.floatValue;
    this.dstFloatValue = 10 * float_gu;
    if (this.first_set) this.floatValue = this.dstFloatValue;
  }
  setType(entity_type: number) {
    this.type = entity_type;
  }
  setState(flag_state: number) {
    this.state = flag_state;
  }
  setEnergy(energy: number) {
    this.energy = energy;
  }
  setFragment(frag: number) {
    this.fragment = frag;
    3 != frag && 1 == frag && (this.#a = 0);
  }
  setCannonAngle(angle: number) {
    this.origCannonAngle = this.cannonAngle;
    this.dstCannonAngle = angle;
    if (this.first_set) this.cannonAngle = this.dstCannonAngle;
  }
  cannonShoot() {
    this.recoilTime = 200;
  }
  getSpeedDirectionX() {
    return this.x - this.prevX;
  }
  getSpeedDirectionY() {
    return this.y - this.prevY;
  }
  cleanup() {
    this.first_set = true;
    this.inGame = false;
  }
}

let search_params = window.location.search;
if ("?" == search_params.charAt(0)) {
  search_params = search_params.slice(1);
}
let param = search_params.split("&");
for (let e = 0; e < param.length; e++) {
  let f = param[e].split("=");
  obj_browserQueryParams[f[0]] = f[1];
}

//window.stats = obj_browserQueryParams.stats ? true : false;

if ("true" == window.localStorage.lq) bool_setting_highQuality = false;

if (
  undefined == window.localStorage.wingsCCTime ||
  (undefined != window.localStorage.wingsCC &&
    2 != window.localStorage.wingsCC.length)
) {
  func_detect_country();
} else if (288e5 < +new Date() - window.localStorage.wingsCCTime) {
  func_detect_country();
} else {
  str_conutryCode = window.localStorage.wingsCC;
}

num_setting_muteVol ??= 1;

if (0 == num_setting_muteVol || bool_internet_explorer) {
  num_setting_muteVol = 1;
  func_displayMuteAudio();
}

bool_internet_explorer && $("#sndIcon").hide();

if (window.localStorage.nick && $("#nick")[0]) {
  ($("#nick")[0] as HTMLInputElement).value = window.localStorage.nick;
}

document.body.onselectstart = (ev: Event) => {
  return false;
};
document.oncontextmenu = (ev: MouseEvent) => {
  return false;
};

window.onload = () => {
  // @ts-ignore Modernizr dynamically loaded
  if (Modernizr.canvas && Modernizr.websockets) {
    if (objG_followMode == null) {
      if (window.devicePixelRatio) {
        int_pixel_ratio = 1 < window.devicePixelRatio ? 2 : 1;
        objG_eventManager = new EventManager();
      }
      objG_followMode = new FollowMode_R(canvas);
      window.addEventListener("resize", objG_followMode.resize, false);
      objG_inputManager = new InputManager();
      objG_inputManager.addListeners();
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(requestAnimationFrameCallback);
      } else {
        setInterval(requestAnimationFrameCallback, 1e3 / 60);
      }
      $("#overlay").show();
    }
    objG_followMode.resize();
    func_setGraphicsQuality();
  }
};
