import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import kebabCase from 'lodash.kebabcase';

dayjs.extend(utc);

/**
 * Date format
 * @param dateValue target date string
 * @param format format template(default:YYYY-MM-DD)
 * @returns formatted date string
 */
export const formatDate = (
  dateValue: string,
  format = 'YYYY-MM-DD'
): string => {
  return dayjs.utc(dateValue).format(format);
};

/**
 * Get page path from tag
 * @param tag tag string
 * @returnsc tag page path
 */
export const getPathByTag = (tag: string | undefined | null): string => {
  if (!tag) return `/tag/`;
  return `/tag/${kebabCase(tag)}/`;
};
