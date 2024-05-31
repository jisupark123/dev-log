import { atom } from 'recoil';

const initCategory: {
  showCategoryFilter: boolean;
  toggleShowCategoryFilter: () => void;
} = {
  showCategoryFilter: false,
  toggleShowCategoryFilter: () => {},
};

export const categoryAtom = atom({
  key: 'categoryAtom',
  default: initCategory,
});
