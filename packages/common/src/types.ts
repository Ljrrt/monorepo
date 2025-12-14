export interface FilePayload {
  mediaType: string;
  base64:    string;

}

export interface GenerateTextBody {
  prompt:          string;
  files?:          FilePayload[];
  numberOfImages?: number;
  systemPrompt?:   string;
}

export interface GenerateTextResponse {
  text: string;
}

export interface DmxSendBody {
  channel: number;
  value:   number;
}

export interface DmxSendResponse {
  success: boolean;
}

export interface Time {
  hours:   number;
  minutes: number;
  seconds: number;
}

export type Vector3 = [number, number, number];

export interface GenerateImageBody {
  model:             ImageGeneratorModel;
  prompt:            string;
  n?:                number;
  maxImagesPerCall?: number;
  size?:             SizeFormatted;
  aspectRatio?:      AspectRatio;
  seed?:             number;
  providerOptions?:  Record<string, Record<string, JSONValue>>;
}

export enum ImageGeneratorModel {
  NANO_BANANA,
  NOVA_CANVAS,
}

type JSONValue = null | string | number | boolean | JSONObject | JSONArray;

type JSONObject = {
  [key: string]: JSONValue;
};

type JSONArray = JSONValue[];

export type SizeFormatted = `${number}x${number}`;

export type AspectRatio = `${number}:${number}`;

export enum BedrockStyle {
  ANIMATED_FILM                = '3D_ANIMATED_FAMILY_FILM',
  FLAT_VECTOR_ILLUSTRATION     = 'FLAT_VECTOR_ILLUSTRATION',
  GRAPHIC_NOVEL_ILLUSTRATION   = 'GRAPHIC_NOVEL_ILLUSTRATION',
  MAXIMALISM                   = 'MAXIMALISM',
  MIDCENTURY_RETRO             = 'MIDCENTURY_RETRO',
  PHOTOREALISM                 = 'PHOTOREALISM',
  SOFT_DIGITAL_PAINTING        = 'SOFT_DIGITAL_PAINTING',
}

export interface ImagePayload {
  mediaType:  string;
  base64:     string;
  uint8Array: Uint8Array<ArrayBufferLike>;
}

export interface Size {
  width:  number;
  height: number;
}

export interface GradientStop {
  color:   string;
  percent: number;
}

export interface ModelPayload {
  name:        string;
  description: string;
  icon:        string;
}

export interface CommonMetadata {
  name:         string;
  description?: string;
  image?:       File;
  tags?:        string[];
  icon?:        string;
}

type SuccessResult<T> = readonly[T, null];

type ErrorResult<E = Error> = readonly[null, E];

export type Result<T, E = Error> = SuccessResult<T> | ErrorResult<E>;
