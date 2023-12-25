import { useRecoilState } from 'recoil';
import { userAtom } from './atom';
import { useCallback } from 'react';

export default function useUser() {
  const [user, setUser] = useRecoilState(userAtom);

  // function setAdmin(isAdmin: boolean) {
  //   setUser((prev) => ({ ...prev, isAdmin }));
  // }
  const setAdmin = useCallback(
    (isAdmin: boolean) => {
      setUser((prev) => ({ ...prev, isAdmin }));
    },
    [setUser]
  );
  return { isAdmin: user.isAdmin, setAdmin };
}
