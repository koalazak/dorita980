import { cycle, initiator, langs, phase } from '../global';



export class Local {
  /**
   * Close the connection to the robot. It's important if you want to send commands via the official mobile app via Local network. There's a maximum of 1 connection at any time in local network, so if your app is connected, the official mobile app only works via cloud access.
   *
   * While dorita980 is connected, you can call other methods to send commands and listen for the events to get data. Just call the {@link end()} method if you want. While dorita980 is connected, the official mobile app will only work via the cloud to send commands to your robot.
   */
  end(): void;
  //getTime(): Promise<never>;
  getBbrun(): Promise<RobotState['bbrun']>;
  //getLangs(): Promise<never>;
  //getSys(): Promise<never>;
  getWirelessLastStatus(): Promise<{ wifistat: RobotState['wifistat'], wlcfg: RobotState['wlcfg']; }>;
  /**
     * @example starts every day at `10:30am` except Monday:
     * ```
     * { cycle: [ 'start', 'none', 'start', 'start', 'start', 'start', 'start' ],
     *    h: [ 10, 10, 10, 10, 10, 10, 10 ],
     *    m: [ 30, 30, 30, 30, 30, 30, 30 ] 
     * },
     * ```
     */
  //getWeek(): Promise<never>;
  /**
   * Get the full robot state but wait for the `['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose']` fields before returning.
   *
   * Alias for {@link getRobotState() getRobotState(['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose', 'signal'])}
   *
   * Waits for the 'signal' to make sure we have the full state object.
   *
   * Use {@link getRobotState() getRobotState(['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'signal'])} without `pose` in models without navigation like E6 models.
   */
  //getPreferences(): Promise</*RobotState['c]eanMissionStatus' | 'cleanSchedule' | 'name' | 'vacHigh' | 'pose'>*/ never>;
  /**
* Partially overwrites the robot state to configure it.
* 
* @example```javascript
* var newPreferences = { 
*   binPause: false
* };
*
* myRobotViaLocal.setPreferences(newPreferences)
* ```
*/
  //setPreferences(newPreferences: Record<string, any>): Promise<{ ok: null; }>;
  /**
   * Get the robot state but wait for the `waitForFields` fields before return.
   * 
   * The state object starts empty and the robot will add data over time.
   * 
   * @example```javascript
   * myRobotViaLocal.getRobotState(['batPct', 'bbchg3']).then((actualState) => {
   *   console.log(actualState);
   * });
   * ```
   */
  getRobotState<WaitForFields extends (keyof RobotState)[]>(waitForFields: WaitForFields): Promise<Partial<RobotState> & Pick<RobotState, WaitForFields[number]>>;
  /**
 * Get the robot state but wait for the `waitForFields` fields before return.
 * 
 * The state object starts empty and the robot will add data over time.
 * 
 * @example```javascript
 * myRobotViaLocal.getRobotState(['batPct', 'bbchg3']).then((actualState) => {
 *   console.log(actualState);
 * });
 * ```
 */
  getRobotState<WaitForFields extends (keyof RobotState)>(waitForFields: WaitForFields): Promise<Partial<RobotState> & Pick<RobotState, WaitForFields>>;

  /**
 * Get the robot state but wait for the `waitForFields` fields before return.
 * 
 * The state object starts empty and the robot will add data over time.
 * 
 * @example```javascript
 * myRobotViaLocal.getRobotState(['batPct', 'bbchg3']).then((actualState) => {
 *   console.log(actualState);
 * });
 * ```
 */
  getRobotState(): Promise<Partial<RobotState>>;
  /**
   * With this you can draw a map :) in models with position reporting. Use {@link getBasicMission()} in robots without position reporting feature like E5 models.
   */
  getMission(): Promise<{ cleanMissionStatus: RobotState['cleanMissionStatus']; bin: RobotState['bin']; batPct: RobotState['batPct']; }>;
  /**
   * Same as {@link getMission()} but don't wait for `pose` information
   */
  getBasicMission(): Promise<{ cleanMissionStatus: RobotState['cleanMissionStatus']; bin: RobotState['bin']; batPct: RobotState['batPct']; }>;
  getWirelessConfig(): Promise<{ wlcfg: RobotState['wlcfg']; netinfo: RobotState['netinfo']; }>;
  getWirelessStatus(): Promise<{ wifistat: RobotState['wifistat'], netinfo: RobotState['netinfo']; }>;
  getCloudConfig(): Promise<RobotState['cloudEnv']>;
  getSKU(): Promise<string>;
  start(): Promise<{ ok: null; }>;
  clean(): Promise<{ ok: null; }>;
  /**
   * @example {@link cleanRoom()} is an alias for {@link start()} - but with arguments. To clean a room - you need a structure similar to:
   * ```javascript
   * const args = {
   *   pmap_id: 'ABCDEFG123456FGKS789',
   *   regions: [
   *     { region_id: '5', type: 'rid'}
   *   ],
   *   user_pmapv_id: '190917T20125Z'
   * };
   *
   * myRobotViaLocal.cleanRoom(args);
   * ```
   * The easiest way to find this information is to start a clean using the iRobot app and then call the {@link getRobotState()} method and copy the `lastCommand` values from it. Using this you can derive the `pmap_id`, `user_pmapv_id` and `regions` data. Or looking into `pmaps` property in the state.
   */
  cleanRoom(room: Map): Promise<{ ok: null; }>;
  /**
   * @example By adding more regions to the regions array, a set of rooms will be cleaned. At least from firmware Version 3.8.3 you can set the desired order, when cleaning multiple rooms by adding `ordered = 1`
   * ```javascript
   * const args = {
   *   ordered: 1,
   *   pmap_id: 'ABCDEFG123456FGKS789',
   *   regions: [
   *     { region_id: '5', type: 'rid'},
   *     { region_id: '0', type: 'rid'},
   *     { region_id: '1', type: 'rid'}
   *   ],
   *   user_pmapv_id: '190917T20125Z'
   * };
   *
   * myRobotViaLocal.cleanRoom(args);
   * ```
   */
  cleanRoom(rooms: OrderedMap): Promise<{ ok: null; }>;
  pause(): Promise<{ ok: null; }>;
  stop(): Promise<{ ok: null; }>;
  resume(): Promise<{ ok: null; }>;
  /** Note: before dock you need to {@link pause()} or {@link stop()} your robot. */
  dock(): Promise<{ ok: null; }>;
  /** Note: sends locate request. The robot will beep. */
  find(): Promise<{ ok: null; }>;
  evac(): Promise<{ ok: null; }>;
  train(): Promise<{ ok: null; }>;
  /**
     * @example Disable Sunday and start every day at `10:30am`:
     * ```javascript
     * var newWeek = {
     *   cycle:['none','start','start','start','start','start','start'],
     *   h:[10,10,10,10,10,10,10],
     *   m:[30,30,30,30,30,30,30]
     * }
     * myRobotViaLocal.setWeek(newWeek)
     * ```
     */
  /*setWeek(week: {
    cycle: ['start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none'],
    h: [number, number, number, number, number, number, number],
    m: [number, number, number, number, number, number, number];
  }): Promise<{ ok: null; }>;*/
  /**
   * Just to experiment with raw commands using the MQTT client. Known topics are `cmd` and `delta`. But Experiment with other topics and message formats!
   *
   * The `delta` commands typically have the following json format:
   * `{state: newState}`
   * 
   * The `cmd` commands typically have the following json format:
   * `{command: command, time: Date.now() / 1000 | 0, initiator: 'localApp'};`
   * 
   * @example For example to send a clean command:
   * ```javascript
   * let myCommand = {command: 'clean', time: Date.now() / 1000 | 0, initiator: 'localApp'};
   *
   * myRobotViaLocal.publish('cmd', JSON.stringify(myCommand), function(e) {
   * if(e) console.log('error', e);
   * });
   * ```
   * Don't forget stringify the json message with JSON.stringify(rawJsonMessageAsString).
   * 
   * You can see undocumented commands and preferences in [this thread](https://github.com/koalazak/dorita980/issues/39)
   */
  publish(topic: 'cmd' | 'delta' | string, rawJsonMessageAsString: string, callback: (err, response) => void): void;
  /** Emitted on successful Connection. */
  on(event: 'connect', callback: () => void): this;
  /** Emitted after a disconnection. */
  on(event: 'close', callback: () => void): this;
  /** Emitted when the client goes offline. */
  on(event: 'offline', callback: () => void): this;
  /** Emitted every time the Robot publishes a new message to the mqtt bus. */
  on(event: 'update', callback: (data: Partial<RobotState>) => void): this;
  /** Emitted every `emitIntervalTime` milliseconds with the mission data. (util for mapping in models with position reporting) */
  on(event: 'mission', callback: (data: { cleanMissionStatus: RobotState['cleanMissionStatus']; bin: RobotState['bin']; batPct: RobotState['batPct']; }) => void): this;
  /** 
   * Emitted every time the Robot publish a new message to the mqtt bus. 
   * 
   * Will print the Full robot state!
   */
  on(event: 'state', callback: (data: RobotState) => void): this;
}
interface Region {
  region_id: string;
  type: 'zid' | 'rid';
}
interface Map {
  pmap_id: string;
  regions: [Region];
  user_pmapv_id: string;
}
interface OrderedMap {
  ordered?: 1;
  pmap_id: string;
  regions: Region[];
  user_pmapv_id: string;
}
interface RobotState {
  audio: { volume: number; },
  batPct: number,
  batteryType: 'F12433011' | string,
  batInfo: {
    mDate: string,
    mName: 'PanasonicEnergy' | string,
    mDaySerial: number,
    mData: string,
    mLife: string,
    cCount: number,
    afCount: number;
  },
  batAuthEnable: null | any,
  bbchg: {
    nChatters: number,
    nKnockoffs: number,
    nLithF: number,
    nChgOk: number,
    aborts: number[],
    chgErr: number[],
    smberr: number,
    nChgErr: number;
  },
  bbchg3: { estCap: number, nAvail: number, hOnDock: number, avgMin: number; },
  bbmssn: {
    aCycleM: number,
    nMssnF: number,
    nMssnC: number,
    nMssnOk: number,
    aMssnM: number,
    nMssn: number;
  },
  bbnav: { aMtrack: number, nGoodLmrks: number, aGain: number, aExpo: number; },
  bbpause: {
    pauses: number[];
  },
  bbrstinfo: {
    nNavRst: number,
    nMapLoadRst: number,
    nMobRst: number,
    nSafRst: number,
    safCauses: number[];
  },
  bbrun: {
    nCBump: number,
    nMBStll: number,
    nPanics: number,
    nOvertemps: number,
    nPicks: number,
    nOpticalDD: number,
    nPiezoDD: number,
    nWStll: number,
    nScrubs: number,
    nEvacs: number,
    nStuck: number,
    nCliffsF: number,
    nCliffsR: number;
  },
  bbswitch: { nBumper: number, nDrops: number, nDock: number, nSpot: number, nClean: number; },
  bbsys: { min: number, hr: number; },
  behaviorFwk: null | any,
  bin: { present: boolean, full: boolean; },
  binPause: boolean,
  bleDevLoc: boolean,
  cap: {
    binFullDetect: number,
    oMode: number,
    dockComm: number,
    wDevLoc: number,
    bleDevLoc: number,
    edge: number,
    maps: number,
    pmaps: number,
    mc: number,
    tLine: number,
    area: number,
    eco: number,
    multiPass: number,
    team: number,
    pp: number,
    pose: number,
    lang: number,
    '5ghz': number,
    prov: number,
    sched: number,
    svcConf: number,
    ota: number,
    log: number,
    langOta: number,
    ns: number,
    tileScan: number;
  } | Record<string, number>;
  carpetBoost: boolean,
  childLock: boolean,
  chrgLrPtrn: number,
  cleanMissionStatus: {
    cycle: cycle,
    phase: phase,
    expireM: number,
    rechrgM: number,
    error: number,
    notReady: number,
    condNotReady: any[],
    mssnM: number,
    expireTm: number,
    rechrgTm: number,
    mssnStrtTm: number,
    operatingMode: number,
    initiator: initiator,
    nMssn: number,
    missionId: string;
  },
  cleanSchedule2: [
    {
      enabled: boolean,
      type: number,
      start: {
        day: number[],
        hour: number,
        min: number;
      },
      cmdStr: '{\'command\': \'start\'}' | string;
    }
  ],
  cloudEnv: 'prod' | string,
  connected: boolean,
  country: 'US' | string,
  deploymentState: number,
  dock: {
    known: boolean,
    pn: 'unknown' | string,
    state: 301 | number,
    id: string,
    fwVer: '4.8.3' | string,
    hwRev: number,
    varID: number;
  },
  evacAllowed: boolean,
  ecoCharge: boolean,
  featureFlags: {
    pmapSharing: number,
    reachableSpaceFlags: number,
    wallE: number,
    stratParams: number,
    childLockEnable: number,
    covHybridPlan: number,
    trainingStrategy: number,
    covPlan: number,
    chrgLrPtrnEnable: number,
    clearHaz: boolean;
  },
  hwPartsRev: {
    mobBrd: number,
    mobBlid: string,
    imuPartNo: string,
    lrDrv: string,
    navSerialNo: string,
    wlan0HwAddr: string,
    NavBrd: number;
  },
  hwDbgr: null | any,
  langs2: {
    sVer: '1.0' | string,
    dLangs: {
      ver: '0.35' | string, langs: langs;
    },
    sLang: langs[number];
    aSlots: number;
  },
  lastCommand: { command: 'none' | 'evac' | string, time: number, initiator: initiator; } | Map | null | Record<string, any>,
  lastDisconnect: number,
  mapUploadAllowed: boolean,
  missionTelemetry: {
    aux_comms: number,
    bat_stats: number,
    behaviors_report: number,
    camera_settings: number,
    coverage_report: number,
    map_hypotheses: number,
    map_load: number,
    map_save: number,
    pmap_navigability: number,
    roomseg_report: number,
    sensor_stats: number,
    tumor_classifier_report: number,
    visual_stasis_report: number,
    vital_stats: number,
    vslam_report: number;
  } | Record<string, number>,
  mssnNavStats: {
    nMssn: number,
    missionId: string,
    gLmk: number,
    lmk: number,
    reLc: number,
    plnErr: 'none' | string,
    mTrk: number,
    kdp: number,
    sfkdp: number,
    nmc: number,
    nmmc: number,
    nrmc: number,
    mpSt: 'idle' | string,
    l_drift: number,
    h_drift: number,
    l_squal: number,
    h_squal: number;
  } | Record<string, number | string>,
  name: string,
  noAutoPasses: boolean,
  openOnly: boolean,
  optFeats: { pmaps: null | any; } | Record<string, any>,
  pmapLearningAllowed: boolean,
  pmaps: Record<string, string>[],
  pmapCL: boolean,
  pmapSGen: number,
  pmapShare: { copy: number[], share: null | any; } | Record<string, any>,
  rankOverlap: number,
  reflexSettings: { rlWheelDrop: { enabled: number; } | Record<string, number>; } | Record<string, any>;
  runtimeStats: { min: number, sqft: number, hr: number; },
  sceneRecog: null | any,
  schedHold: boolean,
  secureBoot: {
    log: number,
    flip: number,
    sbl1Ver: 'B3.2.02_PPUB' | string,
    stublVer: 'B3.2.03_PPUB' | string,
    efuse: number,
    blType: number,
    enforce: number,
    lastRst: string,
    recov: 'linux+4.15.0+Firmware-Build+1339' | string,
    idSwitch: number,
    permReq: number,
    perm: 'none' | string;
  } | Record<string, number | string>,
  sku: 'i855020' | string,
  softwareVer: 'lewis+22.29.3+2022-08-23-eb90240ea48+Firmware-Build+1832' | string,
  subModSwVer: {
    nav: 'lewis-nav+22.29.3+ubuntu-HEAD-eb90240ea48+1832' | string,
    mob: '22.29.3+ubuntu-HEAD-eb90240ea48+1832' | string,
    pwr: '0.6.0+ubuntu-HEAD-eb90240ea48+1832' | string,
    sft: '1.4.0+ubuntu-HEAD-9a9a5d0c891+36' | string,
    mobBtl: '4.2' | string,
    linux: 'linux+4.20.0+Firmware-Build+1832' | string,
    con: '3.14.4-tags/release-3.14.4@050d359d/ubuntu' | string;
  } | Record<string, string>,
  svcEndpoints: { svcDeplId: 'v011' | string; } | Record<string, string>,
  timezone: 'America/Los_Angeles' | string,
  tls: {
    tzbChk: number,
    privKType: number,
    lcCiphers: number[];
  } | Record<string, number | number[]>,
  twoPass: boolean,
  tz: { events: { dt: number, off: number; }[], ver: 16 | number; },
  vacHigh: boolean,
  wDevLoc: boolean,
  netinfo: {
    dhcp: boolean,
    addr: string,
    mask: '255.255.255.0' | string,
    gw: string,
    dns1: string,
    dns2: string,
    bssid: string,
    sec: number;
  } | Record<string, boolean | string | number>,
  signal: { rssi: number, snr: number, noise: number; },
  wifistat: { cloud: number, wifi: number, uap: boolean; },
  wlcfg: { sec: number, ssid: string; };
}