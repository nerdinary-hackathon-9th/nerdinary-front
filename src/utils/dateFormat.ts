/**
 * 날짜를 YYYY.MM.DD 형식으로 포맷팅합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns YYYY.MM.DD 형식의 문자열
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

/**
 * 날짜를 한국 로케일 형식으로 포맷팅합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열
 * @returns 한국 형식의 날짜 문자열 (예: 2025.11.22)
 */
export const formatDateKo = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\. /g, '.')
    .replace(/\.$/, '');
};
