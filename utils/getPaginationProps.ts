// postCount - 포스트의 총 개수
// currentPage - 현재 페이지(1부터 시작)
// postSlice - 한 페이지에 ?개 포스트
// pageSlice - 페이지 버튼 ?개
export default function getPaginationProps(
  postCount: number,
  currentPage: number,
  postSlice: number,
  pageSlice: number
) {
  const pageCount = Math.floor((postCount - 1) / postSlice) + 1;
  const startPage = Math.floor((currentPage - 1) / pageSlice) * pageSlice + 1;
  const lastPage = startPage + postSlice - 1 < pageCount ? startPage + postSlice - 1 : pageCount;
  const sliceStart = currentPage * postSlice - postSlice;
  const sliceEnd = currentPage * postSlice;

  return {
    currentPage,
    pageCount, // 총 페이지 수
    startPage, // 시작 페이지(페이지네이션 버튼)
    lastPage, // 마지막 페이지(페이지네이션 버튼)
    sliceStart, // slice 시작(전체 포스트 배열에서 slice할 때 사용)
    sliceEnd, // slice 끝(전체 포스트 배열에서 slice할 때 사용)
  };
}
