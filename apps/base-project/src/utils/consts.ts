export enum EventId {
  ALL                   = '*',
  COMPUTER_CONNECTED    = 'twisters-computer-connected',
  COMPUTER_DISCONNECTED = 'twisters-computer-disconnected',
  TABLET_CONNECTED      = 'twisters-tablet-connected',
  TABLET_DISCONNECTED   = 'twisters-tablet-disconnected',
  UPDATE_STATE          = 'twisters-update-state',
  LETTERS               = 'twisters-keyboard-letters',
  RESET                 = 'twisters-reset',
  RESET_SOFT            = 'twisters-reset-soft',
  RESET_LEADERBOARD     = 'twisters-reset-leaderboard',
}

export const COMPUTER_CHANNEL = 'twisters-computer-channel';

export const TABLET_CHANNEL = 'twisters-tablet-channel';

export const KEYBOARD_CHANNEL = 'twisters-keyboard-channel-';

export const INSTRUCTIONS: string[] = [
  'Two Teams. One Word. Race!',
  'Press every letter together!',
  'Time’s up → most points win',
];

export interface Instruction {
  position: number;
  text:     string;
  icon:     string;
}

export const CONST_EXAMPLE = 'const-string-example';
