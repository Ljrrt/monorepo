import { signal } from '@preact/signals-react';

export const signalBoolean = signal<boolean>(false);

export const signalStringArray = signal<string[]>([]);

export const signalNumber = signal<number>(0);
