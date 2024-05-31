import { useRecoilState } from 'recoil';
import { categoryAtom } from './atom';
import { useCallback } from 'react';

export default function useCategory() {
  const [category, setCategory] = useRecoilState(categoryAtom);

  function toggleShowCategoryFilter() {
    setCategory((prev) => ({ ...prev, showCategoryFilter: !prev.showCategoryFilter }));
  }

  return { showCategoryFilter: category.showCategoryFilter, toggleShowCategoryFilter };
}
