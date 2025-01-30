// utils/dateUtils.js
import { format } from 'date-fns';

export const formatDate = (date, pattern = 'yyyy-MM-dd') => {
  try {
    return format(date, pattern);
  } catch (error) {
    throw new Error(`Date formatting failed: ${error.message}`);
  }
};

export const isToday = (date) => {
  const today = new Date();
  return formatDate(date, 'yyyy-MM-dd') === formatDate(today, 'yyyy-MM-dd');
};

export const isValidDate = (dateString) => {
  return !isNaN(Date.parse(dateString));
};

// Alternative: Named export as object
// export default { formatDate, isToday, isValidDate };