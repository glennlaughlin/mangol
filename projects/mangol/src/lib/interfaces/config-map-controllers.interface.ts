export interface MangolControllersOptions {
  show: boolean;
}

export interface MangolControllersZoomDictionary {
  zoomIn?: string;
  zoomOut?: string;
}

export interface MangolControllersZoomOptions extends MangolControllersOptions {
  dictionary?: MangolControllersZoomDictionary;
  showTooltip?: boolean;
}

export interface MangolControllersScalebarOptions
  extends MangolControllersOptions {}

export interface MangolControllersFullScreenDictionary {
  maximize?: string;
  minimize?: string;
}

export interface MangolControllersFullScreenOptions
  extends MangolControllersOptions {
  dictionary?: MangolControllersFullScreenDictionary;
  showTooltip?: boolean;
}

export interface MangolControllersPositionDictionary {
  textCopied?: string;
  copyCoordinates?: string;
  closeSnackbar?: string;
}

export interface MangolControllersPositionOptions
  extends MangolControllersOptions {
  precision?: number;
  dictionary?: MangolControllersPositionDictionary;
}

export interface MangolControllersTileloadOptions
  extends MangolControllersOptions {}

export interface MangolControllersRotationDictionary {
  rotateToNorth?: string;
}

export interface MangolControllersRotationOptions
  extends MangolControllersOptions {
  dictionary?: MangolControllersRotationDictionary;
  showTooltip?: boolean;
}

/**
 * TODO: Implement a reposition option.
 * This *should* use the MangolService to reposition the map to center on a distinct location.
 */
export interface MyControllersRePositionOptions
extends MangolControllersOptions {
  reCenterOn?: Coordinates;
}

export interface MangolConfigMapControllers {
  zoom?: MangolControllersZoomOptions;
  scalebar?: MangolControllersScalebarOptions;
  position?: MangolControllersPositionOptions;
  tileload?: MangolControllersTileloadOptions;
  rotation?: MangolControllersRotationOptions;
  fullScreen?: MangolControllersFullScreenOptions;
  rePosition?: MyControllersRePositionOptions;
}
