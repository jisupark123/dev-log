import { atom } from 'recoil';

type TUser = {
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
};

export const initUser: TUser = {
  isAdmin: false,
  setAdmin: () => {},
};

export const userAtom = atom({
  key: 'userAtom',
  default: initUser,
});
