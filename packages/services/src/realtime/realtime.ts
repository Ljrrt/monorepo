import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

import { SupabaseHelper } from '../utils/supabase-helper';

export interface MessageExample extends Message {
  example: string;
}

export interface Message {
  [key: string]: string | boolean | object | number | undefined;
};

type MessageListener = (message: Message, eventId: string) => void | Promise<void>;

export class Realtime {
  protected client: SupabaseClient = SupabaseHelper.getClient();

  public send(channel: string, eventId: string, message?: Message) {
    const realtimeChannel = this.client.channel(channel);

    realtimeChannel.send({
      type:    'broadcast',
      event:   'all',
      payload: { message: message || {}, eventId: eventId },
    });
  }

  public subscribe(channel: string, onMessage: MessageListener, onSubscribe?: () => void): RealtimeChannel {
    const realtimeChannel = this.client.channel(channel, { config: { broadcast: { self: true } } });

    realtimeChannel
      .on(
        'broadcast',
        { event: 'all' },
        payload => onMessage(payload.payload.message, payload.payload.eventId),
      )
      .subscribe((status) => {
        if (status == 'SUBSCRIBED' && onSubscribe) {
          onSubscribe();
        }
      });

    return realtimeChannel;
  }

  public unsubscribe(realtimeChannel: RealtimeChannel): void {
    realtimeChannel.unsubscribe();
  }
}
