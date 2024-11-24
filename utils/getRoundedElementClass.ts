export const getRoundedElementClass = (index: number, totalItems: number) => {
  if (totalItems === 1 || index === 0) return 'rounded-tl-none rounded-tr-lg';
  if (index === totalItems - 1) return 'rounded-t-lg';
  return '';
};
