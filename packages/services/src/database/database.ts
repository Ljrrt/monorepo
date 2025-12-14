import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseHelper } from '../utils/supabase-helper';

interface SupabaseResponse {
  data:       any;
  error:      any;
  status:     number;
  statusText: string;
}

export type DatabaseSupabaseActions = 'select' | 'delete' | 'insert' | 'update';

export abstract class Database {
  protected client: SupabaseClient = SupabaseHelper.getClient();
  protected table:  string;

  constructor(table: string) {
    this.table = table;
  }

  public getTable(): string {
    return this.table;
  }

  protected process(action: DatabaseSupabaseActions, response: SupabaseResponse): any {
    if (response.error) {
      throw response.error;
    }

    if (action === 'delete' || action === 'update') {
      return response.status >= 200 && response.status < 300;
    }

    return response.data;
  }
}
