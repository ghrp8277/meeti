export enum ExposureType {
  COMPANION = 'COMPANION',
  TRANSFER = 'TRANSFER',
}

export const EXPOSURE_TYPE_LABELS = {
  [ExposureType.COMPANION]: '동행글 우선 노출권',
  [ExposureType.TRANSFER]: '양도글 우선 노출권',
} as const;
