import { cycle, initiator, phase, schedule } from '../global';



export class Local {
  /**
   * Close the connection to the robot. It's important if you want to send commands via the official mobile app via Local network. There's a maximum of 1 connection at any time in local network, so if your app is connected, the official mobile app only works via cloud access.
   *
   * While dorita980 is connected, you can call other methods to send commands and listen for the events to get data. Just call the {@link end()} method if you want. While dorita980 is connected, the official mobile app will only work via the cloud to send commands to your robot.
   */
  end(): void;
  getTime(): Promise<number>;
  getBbrun(): Promise<RobotState['bbrun']>;
  getLangs(): Promise<RobotState['langs']>;
  getSys(): Promise<{
    bbrstinfo: RobotState['bbrstinfo'],
    cap: RobotState['cap'];
    sku: RobotState['sku'],
    batteryType: RobotState['batteryType'],
    soundVer: RobotState['soundVer'],
    uiSwVer: RobotState['uiSwVer'],
    navSwVer: RobotState['navSwVer'],
    wifiSwVer: RobotState['wifiSwVer'],
    mobilityVer: RobotState['mobilityVer'],
    bootloaderVer: RobotState['bootloaderVer'],
    umiVer: RobotState['umiVer'],
    softwareVer: RobotState['softwareVer'],
    audio: RobotState['audio'],
    bin: RobotState['bin'];
  }
  >;
  getWirelessLastStatus(): Promise<{
    wifistat: RobotState['wifistat'],
    wlcfg: RobotState['wlcfg'];
  }>;
  /**
     * @example starts every day at `10:30am` except Monday:
     * ```
     * { cycle: [ 'start', 'none', 'start', 'start', 'start', 'start', 'start' ],
     *    h: [ 10, 10, 10, 10, 10, 10, 10 ],
     *    m: [ 30, 30, 30, 30, 30, 30, 30 ] 
     * }
     * ```
     */
  getWeek(): Promise<RobotState['cleanSchedule']>;
  /**
   * Get the full robot state but wait for the `['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose']` fields before returning.
   *
   * Alias for {@link getRobotState() getRobotState(['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'pose', 'signal'])}
   *
   * Waits for the 'signal' to make sure we have the full state object.
   *
   * Use {@link getRobotState() getRobotState(['cleanMissionStatus', 'cleanSchedule', 'name', 'vacHigh', 'signal'])} without `pose` in models without navigation like E6 models.
   */
  getPreferences(): Promise<{
    cleanMissionStatus: RobotState['cleanMissionStatus'];
    cleanSchedule: RobotState['cleanSchedule'];
    name: RobotState['name'];
    vacHigh: RobotState['vacHigh'];
    signal: RobotState['signal'];
  }>;
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
  setPreferences(newPreferences: Record<string, Partial<{
    carpetBoost: RobotState['carpetBoost'];
    vacHigh: RobotState['vacHigh'];
    openOnly: RobotState['openOnly'];
    noAutoPasses: RobotState['noAutoPasses'];
    twoPass: RobotState['twoPass'];
    binPause: RobotState['binPause'];
  }>>): Promise<{ ok: null; }>;
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
  getRobotState<WaitForFields extends (keyof RobotState)[]>(waitForFields: WaitForFields): Promise<Pick<RobotState, WaitForFields[number]>>;
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
  getRobotState<WaitForFields extends (keyof RobotState)>(waitForFields: WaitForFields): Promise<Pick<RobotState, WaitForFields>>;

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
  getRobotState(): Promise<{}>;
  /**
   * With this you can draw a map :) in models with position reporting. Use {@link getBasicMission()} in robots without position reporting feature like E5 models.
   */
  getMission(): Promise<{
    cleanMissionStatus: RobotState['cleanMissionStatus'];
    bin: RobotState['bin'];
    batPct: RobotState['batPct'];
    pose?: RobotState['pose'];
  }>;
  /**
   * Same as {@link getMission()} but don't wait for `pose` information
   */
  getBasicMission(): Promise<{
    cleanMissionStatus: RobotState['cleanMissionStatus'];
    bin: RobotState['bin'];
    batPct: RobotState['batPct'];
  }>;
  getWirelessConfig(): Promise<{
    wlcfg: RobotState['wlcfg'];
    netinfo: RobotState['netinfo'];
  }>;
  getWirelessStatus(): Promise<{
    wifistat: RobotState['wifistat'];
    netinfo: RobotState['netinfo'];
  }>;
  getCloudConfig(): Promise<RobotState['cloudEnv']>;
  getSKU(): Promise<string>;
  start(): Promise<{ ok: null; }>;
  clean(): Promise<{ ok: null; }>;
  pause(): Promise<{ ok: null; }>;
  stop(): Promise<{ ok: null; }>;
  resume(): Promise<{ ok: null; }>;
  /** Note: before dock you need to {@link pause()} or {@link stop()} your robot. */
  dock(): Promise<{ ok: null; }>;
  /** Note: sends locate request. If the robot is on dock nothing will happen, otherwise it will beep. */
  find(): Promise<{ ok: null; }>;
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
  setWeek(week: RobotState['cleanSchedule']): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCarpetBoostAuto(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCarpetBoostPerformance(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCarpetBoostEco(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setEdgeCleanOn(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setEdgeCleanOff(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCleaningPassesAuto(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCleaningPassesOne(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCleaningPassesTwo(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setAlwaysFinishOn(): Promise<{ ok: null; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setAlwaysFinishOff(): Promise<{ ok: null; }>;
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
  on(event: 'update', callback: (data: {
    state: {
      reported: Partial<RobotState>;
    };
  }) => void): this;
  /** Emitted every `emitIntervalTime` milliseconds with the mission data. (util for mapping in models with position reporting) */
  on(event: 'mission', callback: (data: {
    cleanMissionStatus: RobotState['cleanMissionStatus'];
    bin: RobotState['bin'];
    batPct: RobotState['batPct'];
    pose?: RobotState['pose'];
  }) => void): this;
  /** 
   * Emitted every time the Robot publish a new message to the mqtt bus. 
   * 
   * Will print the Full robot state!
   */
  on(event: 'state', callback: (data: RobotState) => void): this;
}
interface RobotState {
  netinfo: {
    dhcp: boolean,
    addr: number,
    mask: number,
    gw: number,
    dns1: number,
    dns2: number,
    bssid: string,
    sec: number;
  } | Record<string, boolean | number | string>,
  wifistat: { wifi: number, uap: boolean, cloud: number; } | Record<string, boolean | number>,
  wlcfg: { sec: number, ssid: string; } | Record<string, number | string>;
  mac: string,
  country: 'US' | string,
  cloudEnv: 'prod' | string,
  svcEndpoints: { svcDeplId: 'v011' | string; } | Record<string, string>,
  mapUploadAllowed: boolean,
  localtimeoffset: number,
  utctime: number,
  pose: { theta: number, point: { x: number, y: number; }; },
  batPct: number,
  dock: { known: boolean; },
  bin: { present: boolean, full: boolean; },
  audio: { active: boolean; },
  cleanMissionStatus: {
    cycle: cycle;
    phase: phase,
    expireM: number,
    rechrgM: number,
    error: number,
    notReady: number,
    mssnM: number,
    sqft: number,
    initiator: initiator,
    nMssn: number;
  },
  language: number,
  noAutoPasses: boolean,
  noPP: boolean,
  ecoCharge: boolean,
  vacHigh: boolean,
  binPause: boolean,
  carpetBoost: boolean,
  openOnly: boolean,
  twoPass: boolean,
  schedHold: boolean,
  lastCommand: { command: 'none' | string, time: number, initiator: initiator; } | null | Record<string, any>,
  langs: [
    { 'en-US': 0; },
    { 'fr-FR': 1; },
    { 'es-ES': 2; },
    { 'de-DE': 3; },
    { 'it-IT': 4; }
  ] | Record<string, number>[],
  bbnav: { aMtrack: number, nGoodLmrks: number, aGain: number, aExpo: number; } | Record<string, number>;
  bbpanic: { panics: number[]; } | Record<string, number[]>,
  bbpause: {
    pauses: number[];
  } | Record<string, number>,
  bbmssn: {
    nMssn: number,
    nMssnOk: number,
    nMssnC: number,
    nMssnF: number,
    aMssnM: number,
    aCycleM: number;
  } | Record<string, number>,
  bbrstinfo: { nNavRst: number, nMobRst: number, causes: string; } | Record<string, number | string>,
  cap: {
    pose: number,
    ota: number,
    multiPass: number,
    carpetBoost: number,
    pp: number,
    binFullDetect: number,
    langOta: number,
    maps: number,
    edge: number,
    eco: number,
    svcConf: number;
  } | Record<string, number>,
  hardwareRev: number,
  sku: 'R985020' | string,
  batteryType: 'lith' | string,
  soundVer: '31' | string,
  uiSwVer: '4582' | string,
  navSwVer: '01.12.01#1' | string,
  wifiSwVer: '20992' | string,
  mobilityVer: '5865' | string,
  bootloaderVer: '4042' | string,
  umiVer: '6' | string,
  softwareVer: 'v2.4.8-44' | string,
  tz: { events: { dt: number, off: number; }[], ver: 16 | number; },
  timezone: 'America/Los_Angeles' | string,
  name: string,
  cleanSchedule: schedule,
  bbchg3: {
    avgMin: number,
    hOnDock: number,
    nAvail: number,
    estCap: number,
    nLithChrg: number,
    nNimhChrg: number,
    nDocks: number;
  } | Record<string, number>,
  bbchg: { nChgOk: number, nLithF: number, aborts: number[]; } | Record<string, number | number[]>,
  bbswitch: { nBumper: number, nClean: number, nSpot: number, nDock: number, nDrops: number; } | Record<string, number>,
  bbrun: {
    hr: number,
    min: number,
    sqft: number,
    nStuck: number,
    nScrubs: number,
    nPicks: number,
    nPanics: number,
    nCliffsF: number,
    nCliffsR: number,
    nMBStll: number,
    nWStll: number,
    nCBump: number;
  } | Record<string, number>,
  bbsys: { hr: number, min: number; },
  signal: { rssi: number, snr: number; };
}
