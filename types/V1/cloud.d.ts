export class Cloud {
  getStatus(): Promise<any>;
  accumulatedHistorical(): Promise<any>;
  missionHistory(): Promise<any>;
  clean(): Promise<any>;
  quick(): Promise<any>;
  spot(): Promise<any>;
  dock(): Promise<any>;
  start(): Promise<any>;
  pause(): Promise<any>;
  resume(): Promise<any>;
  stop(): Promise<any>;
  wake(): Promise<any>;
  reset(): Promise<any>;
  find(): Promise<any>;
  /** untested */
  wipe(): Promise<any>;
  /** untested */
  patch(): Promise<any>;
  /** untested */
  dlpkg(): Promise<any>;
  /** untested */
  rechrg(): Promise<any>;
  /** untested */
  wlapon(): Promise<any>;
  /** untested */
  wlapoff(): Promise<any>;
  /** untested */
  wlston(): Promise<any>;
  /** untested */
  wlstoff(): Promise<any>;
  /** untested */
  wifiscan(): Promise<any>;
  /** untested */
  ipdone(): Promise<any>;
  /** untested */
  provdone(): Promise<any>;
  /** untested */
  bye(): Promise<any>;
  /** untested */
  wllogflush(): Promise<any>;
  sleep(): Promise<any>;
  off(): Promise<any>;
  fbeep(): Promise<any>;
}