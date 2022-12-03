export type cycle = 'none' | 'clean' | 'spot';
/**
 * Known phase strings and their meanings:
 * 
 * | phase | Meaning |
 * |:-|:-:|
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
 * @see [openhab.org/addons/bindings/irobot/](https://www.openhab.org/addons/bindings/irobot/)
 */
export type phase = 'charge' | 'new' | 'run' | 'resume' | 'hmMidMsn' | 'recharge' | 'stuck' | 'hmUsrDock' | 'dock' | 'dockend' | 'cancelled' | 'stop' | 'pause' | 'hmPostMsn' | '';
/**
 * Error codes. Data type is string in order to be able to utilize mapping to human-readable strings.
 * 
 * |Code|Meaning|
 * |:--|:--:|
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
export type langs = ['ar-SA_1',
  'ar-SA_2',
  'cs-CZ_1',
  'cs-CZ_2',
  'da-DK_1',
  'da-DK_2',
  'de-DE_1',
  'de-DE_2',
  'en-GB_1',
  'en-GB_2',
  'en-US_1',
  'en-US_2',
  'es-ES_1',
  'es-ES_2',
  'es-XL_1',
  'es-XL_2',
  'fi-FI_1',
  'fi-FI_2',
  'fr-CA_1',
  'fr-CA_2',
  'fr-FR_1',
  'fr-FR_2',
  'he-IL_1',
  'he-IL_2',
  'it-IT_1',
  'it-IT_2',
  'ja-JP_1',
  'ja-JP_2',
  'ko-KR_1',
  'ko-KR_2',
  'nb-NO_1',
  'nb-NO_2',
  'nl-NL_1',
  'nl-NL_2',
  'pl-PL_1',
  'pl-PL_2',
  'pt-BR_1',
  'pt-BR_2',
  'pt-PT_1',
  'pt-PT_2',
  'ru-RU_1',
  'ru-RU_2',
  'sv-SE_1',
  'sv-SE_2',
  'tr-TR_1',
  'tr-TR_2',
  'zh-CN_1',
  'zh-CN_2',
  'zh-HK_1',
  'zh-HK_2',
  'zh-TW_1',
  'zh-TW_2'];

export type schedule = {
  cycle: ['start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none', 'start' | 'none'],
  h: [number, number, number, number, number, number, number],
  m: [number, number, number, number, number, number, number];
};