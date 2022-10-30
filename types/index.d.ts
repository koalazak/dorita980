import { Cloud as CloudV1 } from './V1/cloud';
import { Local as LocalV1 } from './V1/local';
import { Cloud as CloudV2 } from './V2/cloud';
import { Local as LocalV2 } from './V2/local';
import { Cloud as CloudV3 } from './V3/cloud';
import { Local as LocalV3 } from './V3/local';



export function Cloud(username: string, password: string, version?: number): CloudV2 | CloudV3;
export function Cloud(username: string, password: string, version: 1): CloudV1;
export function Cloud(username: string, password: string, version: 2): CloudV2;
export function Cloud(username: string, password: string, version: 3): CloudV3;

export function Local(blid: string, password: string, ip: string, version?: number, interval?: number): LocalV2 | LocalV3;
export function Local(blid: string, password: string, ip: string, version: 1): LocalV1;
export function Local(blid: string, password: string, ip: string, version: 2, interval?: number): LocalV2;
export function Local(blid: string, password: string, ip: string, version: 3, interval?: number): LocalV3;

/**
 * If you don't known which IP address to use in {@link Local()} you can use {@link getRobotIP()} to find it. This process takes 1-2 seconds, so if you know the IP you can just use it explicity.
 *
 * You need UDP broadcast enabled in your network!
 * 
 * @example ```
 * var dorita980 = require('dorita980');
 *
 * dorita980.getRobotIP((ierr, ip) => {
 *   if (ierr) return console.log('error looking for robot IP');
 *
 *   var myRobotViaLocal = dorita980.Local('MyUsernameBlid', 'MyPassword', ip);
 *
 *   myRobotViaLocal.getMission()
 *     .then((mission) => {
 *       console.log(mission);
 *     }).catch((err) => {
 *       console.log(err);
 *     });
 *   });
 * ```
 */
export function getRobotIP(callback: (err, ip: string) => void): void;
/**
 * You can also use {@link discovery} method to get all the robots discovery data:
 * 
 * You need UDP broadcast enabled in your network!
 * 
 * @example ```
 * var dorita980 = require('dorita980');
 *
 * dorita980.discovery((ierr, data) => {
 *   console.log(data);
 * });
 * ```
 */
export function discovery(callback: (err, data: DiscoveryData) => void): void;
export function getRobotPublicInfo(callback: (err, data: PublicInfo) => void): void;

interface DiscoveryData {
  ver: '2' | string,
  hostname: string,
  robotname: string,
  ip: string,
  mac: string,
  sw: string,
  sku: string,
  nc: number,
  proto: 'mqtt' | string;
}
interface PublicInfo {
  ver: '2' | string,
  hostname: string,
  robotname: string,
  ip: string,
  mac: string,
  sw: string,
  sku: string,
  nc: number,
  proto: 'mqtt' | string;
  blid: string;
}