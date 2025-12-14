import LZString from 'lz-string';

import {
  base64StringToBlob,
  blobToBase64String,
} from 'blob-util';

export class StringHelpers {
  public static hashCode(data: string) {
    return [...data].reduce(
      (hash, c) => (Math.imul(31, hash) + c.charCodeAt(0)) | 0,
      0,
    );
  }

  public static compress(data: string): string {
    return LZString.compress(data);
  }

  public static compressToBase64(data: string): string {
    return LZString.compressToBase64(data);
  }

  public static compressToUint8Array(data: string): Uint8Array {
    return LZString.compressToUint8Array(data);
  }

  public static decompress(data: string): string {
    return LZString.decompress(data);
  }

  public static decompressFromBase64(data: string): string {
    return LZString.decompressFromBase64(data);
  }

  public static decompressFromUint8Array(data: Uint8Array): string {
    return LZString.decompressFromUint8Array(data);
  }

  public static blobToBase64(blob: Blob): Promise<string> {
    return blobToBase64String(blob);
  }

  public static base64ToBlob(base64: string): Blob {
    return base64StringToBlob(base64);
  }

  public static getFirstLetter(string: string | undefined): string {
    if (!string) return 'X';
    return string.charAt(0).toUpperCase();
  }
}
