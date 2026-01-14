import { ImagePayload, Time } from '@monorepo/common';

import { removeBackground } from '@imgly/background-removal';

import { formatDistanceToNow, parseISO } from 'date-fns';
import { decode, encode }                from 'base64-arraybuffer';

export class CommonHelpers {
  public static copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => {

      })
      .catch(() => {
        console.error('Failed to copy');
      });
  }

  public static async removeBackground(image: ImagePayload): Promise<ImagePayload> {
    const arrayBuffer = decode(image.base64);
    const blob        = new Blob([arrayBuffer], { type: image.mediaType });

    const resultBlob = await removeBackground(blob);

    const resultArrayBuffer = await resultBlob.arrayBuffer();
    const uint8Array        = new Uint8Array(resultArrayBuffer);
    const base64            = encode(resultArrayBuffer);

    return {
      uint8Array,
      base64,
      mediaType: 'image/png',
    };
  }

  public static getTimeFormatted(seconds: number): Time {
    const time: Time = {
      hours:   Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };
    return time;
  }

  public static async getTextFromClipboard(): Promise<string> {
    return await navigator.clipboard.readText();
  }

  public static decodeBase64(base64: string): ArrayBuffer {
    const arraybuffer = decode(base64);
    return arraybuffer;
  }

  public static getRandomInteger(min: number, max: number): number {
    const randomInteger = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomInteger;
  }

  public static encodeArrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
    const base64 = encode(arrayBuffer);
    return base64;
  }

  public static hexToRgb(hex: string) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(m[1], 16),
      g: parseInt(m[2], 16),
      b: parseInt(m[3], 16),
    };
  }

  public static rgbArrayToHex(rgb: [number, number, number]): string {
    const hex = rgb.map((value) => {
      const hexValue = value.toString(16);
      return hexValue.length === 1 ? '0' + hexValue : hexValue;
    }).join('');

    return `#${hex}`;
  }

  public static hexToRgbArray(hex: string): [number, number, number] {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return [0, 0, 0];

    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
    ];
  }

  public static getCssVariable(variable: string) {
    return getComputedStyle(document.documentElement).getPropertyValue(variable);
  }

  public static lerp(start: number, end: number, t: number): number {
    return start + (end - start) * t; ;
  }

  public static lerpArray(start: number[], end: number[], t: number): number[] {
    return start.map((startItem, index) => startItem + (end[index] - startItem) * t);
  }

  public static async downloadURI(uri: string, name?: string) {
    const response = await fetch(uri);
    const blob     = await response.blob();
    const url      = URL.createObjectURL(blob);
    const link     = document.createElement('a');
    link.href      = url;
    link.download  = name || 'download';
    link.click();
    URL.revokeObjectURL(url);
  }

  public static async getFileFromUrl(url: string, fileName?: string): Promise<File> {
    const response  = await fetch(url);
    const blob      = await response.blob();
    const imageFile = new File([blob], fileName ? fileName : 'untitled', { type: blob.type });

    return imageFile;
  }

  public static generateUUID(): string {
    if (crypto.randomUUID) {
      return crypto.randomUUID();
    }

    const fallback = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;

    return fallback;
  }

  public static async getImagePayloadFromUrl(url: string, fileName?: string): Promise<ImagePayload> {
    const imageFile = await this.getFileFromUrl(url, fileName);

    const imageData = this.getImagePayloadFromFile(imageFile);

    return imageData;
  }

  public static async getImagePayloadFromFile(file: File): Promise<ImagePayload> {
    const arrayBuffer = await file.arrayBuffer();

    const uint8Array = new Uint8Array(arrayBuffer);
    const base64     = CommonHelpers.encodeArrayBufferToBase64(arrayBuffer);
    const mediaType  = file.type;

    const imageData: ImagePayload = { uint8Array, base64, mediaType };
    return imageData;
  }

  public static getFileFromImagePayload(ImagePayload: ImagePayload): File {
    const arrayBuffer = decode(ImagePayload.base64);
    const blob        = new Blob([arrayBuffer], { type: ImagePayload.mediaType });
    const extension   = ImagePayload.mediaType.split('/')[1] || 'png';
    const file        = new File([blob], `created-file.${extension}`, { type: ImagePayload.mediaType });

    return file;
  }

  public static setTabName(name: string) {
    document.title = `${name}`;
  }

  public static openFileSelector(accepts: string, callback: (file: File) => void): void {
    const input = document.createElement('input');
    input.type  = 'file';

    input.accept = accepts;

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        const file = target.files[0];
        callback(file);
      }
    };

    input.click();
  }

  public static formatNumberTwoDigits(number: number): string {
    const formatedNumber = number.toFixed().padStart(2, '0');
    return formatedNumber;
  }

  public getFormatedTime(miliseconds: number, decimals: number = 2): string {
    const time = (miliseconds / 1000).toFixed(decimals);
    return time;
  }

  public static async preloadImage(url: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const image   = new Image();
      image.onload  = () => resolve();
      image.onerror = () => reject(new Error(`Failed to load: ${url}`));
      image.src     = url;
    });
  }

  public static async preloadImages(urls: string[]): Promise<void> {
    const promises = urls.map(url => CommonHelpers.preloadImage(url));
    await Promise.all(promises);
  }

  public static getUniqueLetters(word: string): string[] {
    const uniqueLetters = [...new Set(word.split(''))];

    return uniqueLetters;
  }

  public static async compressImage(base64: string, mediaType: string, maxWidth: number = 800, quality: number = 0.7): Promise<ImagePayload> {
    return new Promise((resolve) => {
      const img  = new Image();
      img.onload = () => {
        const canvas  = document.createElement('canvas');
        const ratio   = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
        canvas.width  = img.width * ratio;
        canvas.height = img.height * ratio;

        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL('image/jpeg', quality).split(',')[1];
        const arrayBuffer      = CommonHelpers.decodeBase64(compressedBase64);

        resolve({
          base64:     compressedBase64,
          uint8Array: new Uint8Array(arrayBuffer),
          mediaType:  'image/jpeg',
        });
      };
      img.src = `data:${mediaType};base64,${base64}`;
    });
  }

  public static async downloadCsvFromUrl(url: string) {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`Failed to download CSV file: ${response.statusText}`);

    const csvData = await response.text();

    return csvData;
  }

  public static getLastUpdated(timeStamptz: string): string {
    const date          = parseISO(timeStamptz);
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });

    return formattedDate;
  }

  public static getUniqueIdInList(baseId: string, ids: string[]): string {
    const match = baseId.match(/^(.*?)(-\d+)?$/);
    let base    = baseId;
    let suffix  = 1;

    if (match) {
      base = match[1];
      if (match[2]) {
        suffix = parseInt(match[2].slice(1)) + 1;
      }
    }

    const baseLower = base.toLowerCase();
    let newId       = `${baseLower}-${suffix}`;

    while (ids.some(id => id.toLowerCase() === newId)) {
      suffix++;
      newId = `${baseLower}-${suffix}`;
    }

    return newId.toLowerCase();
  }

  public static scrollToBottom(container: HTMLDivElement | null) {
    if (!container) return;

    container.scrollTo({
      top:      container.scrollHeight,
      behavior: 'smooth',
    });
  }
}
