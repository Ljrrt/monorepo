import { SupabaseClient, createClient } from '@supabase/supabase-js';

export class SupabaseHelper {
  private static client:  SupabaseClient;
  public static supabase: SupabaseClient = this.getClient();

  public static getClient(): SupabaseClient {
    if (SupabaseHelper.client) {
      return SupabaseHelper.client;
    }

    const supabaseURL = import.meta.env.VITE_SUPABASE_URL;
    const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

    SupabaseHelper.client = createClient(supabaseURL,
      supabaseKey, {
        realtime: {
          heartbeatIntervalMs: 10000,
          reconnectAfterMs:    (tries: number) => Math.min(tries * 1000, 30000),
        },
      });

    return SupabaseHelper.client;
  }
}
