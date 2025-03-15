export enum TOKEN_TYPE {
  Access = 'Access',
  Refresh = 'Refresh',
  Ability = 'Ability',
}

export const cookieName: Record<TOKEN_TYPE, string> = {
  [TOKEN_TYPE.Access]: 'access',
  [TOKEN_TYPE.Refresh]: 'refresh',
  [TOKEN_TYPE.Ability]: 'ability',
};

export enum DEVICE_TYPE {
  WEB = 'web',
  IOS = 'ios',
  IPAD = 'ipad',
  TVOS = 'tvos',
  ANDROID = 'android',
  ANDROIDTV = 'androidtv',
}
