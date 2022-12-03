import { cycle, phase, schedule } from '../global';



export class Local {
  /**
   * (this is not a promise)
   * 
   * see {@link https://github.com/koalazak/dorita980/blob/master/READMEv1.6.6.md#cleaning-preferences-flags-table-firmware-166}
   *
   * @example flag `1024` returns:
   * ```
   * { 
   *   carpetBoost: 'auto',
   *   edgeClean: true,
   *   cleaningPasses: '1',
   *   alwaysFinish: true 
   * }
   * ```
   * | Carpet Boost \|| Cleaning Passes \|| Finish Cleaning when bin is full \|| Edge Clean \|| Flags DEC  | 
   * |:---------------|:-----------------:|:----------------------------------:|:------------:|-----------:| 
   * | auto           | auto              | on                                 | on           | 0          | 
   * | auto           | auto              | on                                 | off          | 2          | 
   * | auto           | auto              | off                                | on           | 32         | 
   * | auto           | auto              | off                                | off          | 24         | 
   * | auto           | one               | on                                 | on           | 1024       | 
   * | auto           | one               | on                                 | off          | 1026       | 
   * | auto           | one               | off                                | on           | 1056       | 
   * | auto           | one               | off                                | off          | 1058       | 
   * | auto           | two               | on                                 | on           | 1025       | 
   * | auto           | two               | on                                 | off          | 1027       | 
   * | auto           | two               | off                                | on           | 1057       | 
   * | auto           | two               | off                                | off          | 1059       | 
   * | Performance    | auto              | on                                 | on           | 80         | 
   * | Performance    | auto              | on                                 | off          | 82         | 
   * | Performance    | auto              | off                                | on           | 112        | 
   * | Performance    | auto              | off                                | off          | 114        | 
   * | Performance    | one               | on                                 | on           | 1104       | 
   * | Performance    | one               | on                                 | off          | 1106       | 
   * | Performance    | one               | off                                | on           | 1136       | 
   * | Performance    | one               | off                                | off          | 1138       | 
   * | Performance    | two               | on                                 | on           | 1105       | 
   * | Performance    | two               | on                                 | off          | 1107       | 
   * | Performance    | two               | off                                | on           | 1137       | 
   * | Performance    | two               | off                                | off          | 1139       | 
   * | Eco            | auto              | on                                 | on           | 16         | 
   * | Eco            | auto              | on                                 | off          | 18         | 
   * | Eco            | auto              | off                                | on           | 48         | 
   * | Eco            | auto              | off                                | off          | 50         | 
   * | Eco            | one               | on                                 | on           | 1040       | 
   * | Eco            | one               | on                                 | off          | 1042       | 
   * | Eco            | one               | off                                | on           | 1072       | 
   * | Eco            | one               | off                                | off          | 1074       | 
   * | Eco            | two               | on                                 | on           | 1041       | 
   * | Eco            | two               | on                                 | off          | 1043       | 
   * | Eco            | two               | off                                | on           | 1073       | 
   * | Eco            | two               | off                                | off          | 1075       | 
   */
  decodeCleaningPreferences(flag: number): {
    carpetBoost: 'auto' | 'performance' | 'eco',
    edgeClean: boolean,
    cleaningPasses: '1' | '2' | 'auto',
    alwaysFinish: boolean;
  };
  getTime(): Promise<{ ok: { d: string, h: number, m: number; }, id: 8; }>;
  getBbrun(): Promise<{ ok: { hr: number, min: number, sqft: number, nStuck: number, nScrubs: number, nPicks: number, nPanics: number, nCliffsF: number, nCliffsR: number, nMBStll: number, nWStll: number, nCBump: number; }, id: 9; }>;
  getLangs(): Promise<{ ok: { total: number, iterIndex: number, iterName: string; }, id: 2; }>;
  getSys(): Promise<{
    ok:
    {
      umi: number,
      pid: number,
      blid: number[],
      sw: 'v1.6.6' | string,
      cfg: number,
      boot: number,
      main: number,
      wifi: number,
      nav: string,
      ui: number,
      audio: number,
      bat: 'lith' | string;
    },
    id: 2;
  }>;
  getWirelessLastStatus(): Promise<{ ok: { softap: number, station: number, cloud: number, strssi: number, diagflags: number; }, id: 2; }>;
  /**
   * @example starts every day at `10:30am` except Monday:
   * ```
   * { ok:
   *   { cycle: [ 'start', 'none', 'start', 'start', 'start', 'start', 'start' ],
   *      h: [ 10, 10, 10, 10, 10, 10, 10 ],
   *      m: [ 30, 30, 30, 30, 30, 30, 30 ] 
   *   },
   *   id: 2 
   * }
   * ```
   */
  getWeek(): Promise<{
    ok: schedule,
    id: 2;
  }>;
  /** 
   * If autoDecodeFlags is `false` the returned object not include `cleaningPreferences` property. Default is `true` so always decode flags. */
  getPreferences(autoDecodeFlags?: boolean): Promise<{
    ok:
    {
      /** see {@link https://github.com/koalazak/dorita980/blob/master/READMEv1.6.6.md#cleaning-preferences-flags-table-firmware-166} */
      flags: number,
      lang: number,
      timezone: 'America/Buenos_Aires' | string,
      name: string,
      cleaningPreferences: {
        carpetBoost: 'auto' | 'performance' | 'eco',
        edgeClean: boolean,
        cleaningPasses: '1' | '2' | 'auto',
        alwaysFinish: boolean;
      };
    },
    id: 2;
  }>;
  /**
   * With this you can draw a map :)
   *
   * If autoDecodeFlags is `false` the returned object not include `missionFlags` and `notReadyMsg` properties. Default is `true` so always decode flags.
   */
  getMission(autoDecodeFlags?: boolean): Promise<{
    ok:
    {
      flags: number,
      cycle: cycle,
      phase: phase,
      pos: { theta: number, point: { x: number, y: number; }; },
      batPct: number,
      expireM: number,
      rechrgM: number,
      error: number,
      notReady: number,
      mssnM: number,
      sqft: number,
      missionFlags: { idle: boolean, binFull: boolean, binRemoved: boolean, beeping: boolean; },
      notReadyMsg: 'Ready' | string;
    },
    id: 2;
  }>;
  getWirelessConfig(): Promise<{ ok: any, id: number; }>;
  getWirelessStatus(): Promise<{
    ok:
    {
      softap: number,
      station: number,
      strssi: number,
      dhcp: number,
      addr: number,
      mask: number,
      gtwy: number,
      dns1: number,
      dns2: number,
      bssid: number[],
      sec: number;
    },
    id: 2;
  }>;
  getCloudConfig(): Promise<{
    ok: { cloudconfig: 'https://irobot-connect.axeda.com/ammp/'; },
    id: 2;
  }>;
  getSKU(): Promise<{ ok: any, id: number; }>;
  start(): Promise<{ ok: null, id: 293; }>;
  pause(): Promise<{ ok: null, id: 293; }>;
  stop(): Promise<{ ok: null, id: 293; }>;
  resume(): Promise<{ ok: null, id: 293; }>;
  /** Note: before dock you need to {@link pause()} or {@link stop()} your robot */
  dock(): Promise<{ ok: null, id: 293; }>;
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
  setWeek(week: schedule): Promise<{ ok: null, id: 218; }>;
  setTime(time: { d: number | string, h: number, m: number; }): Promise<{ ok: null, id: 23; }>;
  setPtime(time: { time: number; }): Promise<{ ok: null, id: 23; }>;
  setPreferences(preferences: {
    /** see {@link https://github.com/koalazak/dorita980/blob/master/READMEv1.6.6.md#cleaning-preferences-flags-table-firmware-166} */
    flags: number,
    lang: number,
    timezone: 'America/Buenos_Aires' | string,
    name: string;
  }): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCarpetBoostAuto(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCarpetBoostPerformance(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCarpetBoostEco(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setEdgeCleanOn(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setEdgeCleanOff(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCleaningPassesAuto(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCleaningPassesOne(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setCleaningPassesTwo(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setAlwaysFinishOn(): Promise<{ ok: null, id: 293; }>;
  /** This method uses {@link setPreferences()} with the correct `flags` for each setting */
  setAlwaysFinishOff(): Promise<{ ok: null, id: 293; }>;
}