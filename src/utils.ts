export function getPageRange(currentPage: number, pageSize: number, count: number) {
  const currentPageIdx = currentPage - 1;
  const startIndex = currentPageIdx * pageSize;
  const stopIndex = startIndex + (pageSize - 1);
  return [startIndex, stopIndex];
}
