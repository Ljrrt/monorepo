import { Database, SupabaseHelper } from '@monorepo/services';

import { CONFIG } from 'utils';

interface ExampleRecord  {
  property: string;
}

export default class DatabaseExample extends Database  {
  constructor() {
    super(CONFIG.databases.words);
  }

  public async getAll(): Promise<ExampleRecord[]> {
    const data = this.process(
      'select',
      await SupabaseHelper.supabase.from(this.table)
        .select(),
    );

    return data ? data : [];
  }

  public async get(property: string): Promise<ExampleRecord> {
    const data = this.process(
      'select',
      await SupabaseHelper.supabase.from(this.getTable())
        .select('*')
        .eq('property', property),
    );
    return  data[0];
  }

  public async create(record: ExampleRecord): Promise<ExampleRecord> {
    const data = this.process(
      'insert',
      await SupabaseHelper.supabase.from(this.table)
        .insert(
          { ...record },
        ).select(),
    );

    return data[0];
  }

  public async delete(property: string): Promise<boolean> {
    const data = this.process(
      'delete',
      await SupabaseHelper.supabase.from(this.table)
        .delete()
        .eq('property', property),
    );

    return data;
  }
}
