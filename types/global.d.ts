export type cycle = 'none' | 'clean' | 'spot';
/**
 * Known phase strings and their meanings:
 * 
 * | phase | Meaning |
 * | - | - |
 * | charge | Charging |
 * | new | New Mission* |
 * | run | Running |
 * | resume | Resumed* |
 * | hmMidMsn | Going for recharge during mission |
 * | recharge | Recharging |
 * | stuck | Stuck |
 * | hmUsrDock | Going Home (on user command) |
 * | dock | Docking* |
 * | dockend | Docking - End Mission* |
 * | cancelled | Cancelled* |
 * | stop | Stopped |
 * | pause | Paused* |
 * | hmPostMsn | Going home after mission |
 * | '' (empty string) | None* |
 * 
 * Phases, marked with asterisk (*), have not been seen being reported by Roomba 930. All the definitions are taken from Roomba980-Python.
 * 
 * @see {@link https://www.openhab.org/addons/bindings/irobot/}
 */
export type phase = 'charge' | 'new' | 'run' | 'resume' | 'hmMidMsn' | 'recharge' | 'stuck' | 'hmUsrDock' | 'dock' | 'dockend' | 'cancelled' | 'stop' | 'pause' | 'hmPostMsn' | '';
/**
 * Error codes. Data type is string in order to be able to utilize mapping to human-readable strings.
 * 
 * |Code|Meaning|
 * |:----|:----|
 * |0|None|
 * |1|Left wheel off floor|
 * |2|Main Brushes stuck|
 * |3|Right wheel off floor|
 * |4|Left wheel stuck|
 * |5|Right wheel stuck|
 * |6|Stuck near a cliff|
 * |7|Left wheel error|
 * |8|Bin error|
 * |9|Bumper stuck|
 * |10|Right wheel error|
 * |11|Bin error|
 * |12|Cliff sensor issue|
 * |13|Both wheels off floor|
 * |14|Bin missing|
 * |15|Reboot required|
 * |16|Bumped unexpectedly|
 * |17|Path blocked|
 * |18|Docking issue|
 * |19|Undocking issue|
 * |20|Docking issue|
 * |21|Navigation problem|
 * |22|Navigation problem|
 * |23|Battery issue|
 * |24|Navigation problem|
 * |25|Reboot required|
 * |26|Vacuum problem|
 * |27|Vacuum problem|
 * |29|Software update needed|
 * |30|Vacuum problem|
 * |31|Reboot required|
 * |32|Smart map problem|
 * |33|Path blocked|
 * |34|Reboot required|
 * |35|Unrecognized cleaning pad|
 * |36|Bin full|
 * |37|Tank needed refilling|
 * |38|Vacuum problem|
 * |39|Reboot required|
 * |40|Navigation problem|
 * |41|Timed out|
 * |42|Localization problem|
 * |43|Navigation problem|
 * |44|Pump issue|
 * |45|Lid open|
 * |46|Low battery|
 * |47|Reboot required|
 * |48|Path blocked|
 * |52|Pad required attention|
 * |65|Hardware problem detected|
 * |66|Low memory|
 * |68|Hardware problem detected|
 * |73|Pad type changed|
 * |74|Max area reached|
 * |75|Navigation problem|
 * |76|Hardware problem detected|
 */
export type error = number;
export type initiator = '' | 'manual' | 'localApp' | string; 