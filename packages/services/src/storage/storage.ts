import { SupabaseClient } from '@supabase/supabase-js';

import { SupabaseHelper }              from '../utils/supabase-helper';
import { CommonHelpers, ImagePayload } from '@monorepo/common';

interface StorageData {
  id:       string;
  path:     string;
  fullPath: string;
}

type FileBody =
  | ArrayBuffer
  | Blob
  | File;

interface TransformOptions {
  width?:   number;
  height?:  number;
  resize?:  'cover' | 'contain' | 'fill';
  quality?: number;
  format?:  'origin';
}
export class Storage {
  protected client: SupabaseClient = SupabaseHelper.getClient();

  protected bucket: string;

  constructor(bucket: string) {
    this.bucket = bucket;
  }

  public async uploadFile(path: string, fileBody: FileBody,  contentType?: string): Promise<StorageData> {
    const { data, error } = await this.client.storage.from(this.bucket).upload(path, fileBody, { contentType: contentType, upsert: true });

    if (error) {
      throw error;
    } else {
      return data;
    }
  }

  public async createBucket(): Promise<any | undefined> {
    const { data, error } = await this.client.storage.createBucket(this.bucket, {
      public: true,
    });

    if (error) {
      console.error(error);
      return undefined;
    } else {
      return data;
    }
  }

  public getIdFromPath(path: string): string | undefined {
    const id = path.split('/').pop() || undefined;

    return id;
  }

  public getPublicUrl(path: string, download: string | boolean = false, transform?: TransformOptions): string {
    const { data } = this.client.storage.from(this.bucket).getPublicUrl(path, { download: download, transform: transform });

    return data.publicUrl;
  }

  public async uploadImage(path: string, image: ImagePayload, download: string | boolean = false): Promise<{ id: string;url: string; }> {
    const arraybuffer = CommonHelpers.decodeBase64(image.base64);
    const contentType = image.mediaType;

    const uploadedImage = await this.uploadFile(path, arraybuffer, contentType);

    const imageUrl = this.getPublicUrl(uploadedImage.path, download);

    return { id: uploadedImage.id, url: imageUrl };
  }
}
