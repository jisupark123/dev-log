export function seriesToPath(series: string) {
  // 공백을 -로 변경
  return series.replace(/\s/g, '-');
}

export function pathToSeries(path: string) {
  // -를 공백으로 변경
  return path.replace(/-/g, ' ');
}
