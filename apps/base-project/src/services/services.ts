import { Realtime, Ai, Storage, Dmx } from '@monorepo/services';

import DatabaseExample from 'services/database-example';
import { CONFIG }      from 'utils';

export default class Services {
  public static databaseWords = new DatabaseExample();
  public static realtime      = new Realtime();
  public static ai            = new Ai();
  public static storage       = new Storage(CONFIG.storage.bucket);
  public static dmx           = new Dmx();
}
