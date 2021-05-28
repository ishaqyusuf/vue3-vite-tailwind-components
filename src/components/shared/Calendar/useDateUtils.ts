import en from "./locale/translations/en";

const useUtc = false;
const setDate = (date, value) => {
  return useUtc ? date.setUTCDate(value) : date.setDate(value);
};
const getDate = (date) => {
  return useUtc ? date.getUTCDate() : date.getDate();
};
const getDay = (date) => {
  return useUtc ? date.getUTCDay() : date.getDay();
};
const getMonth = (date) => {
  return useUtc ? date.getUTCMonth() : date.getMonth();
};
const getFullYear = (date) => {
  return useUtc ? date.getUTCFullYear() : date.getFullYear();
};
const getMonthName = (month, months) => {
  if (!months) {
    throw Error("missing 2nd parameter Months array");
  }
  if (typeof month === "object") {
    return months[getMonth(month)];
  }
  if (typeof month === "number") {
    return months[month];
  }
  throw TypeError("Invalid type");
};
const getMonthNameAbbr = (month, monthsAbbr) => {
  if (!monthsAbbr) {
    throw Error("missing 2nd paramter Months array");
  }
  if (typeof month === "object") {
    return monthsAbbr[getMonth(month)];
  }
  if (typeof month === "number") {
    return monthsAbbr[month];
  }
  throw TypeError("Invalid type");
};
const getNthSuffix = (day) => {
  switch (day) {
    case 1:
    case 21:
    case 31:
      return "st";
    case 2:
    case 22:
      return "nd";
    case 3:
    case 23:
      return "rd";
    default:
      return "th";
  }
};
const getDayNameAbbr = (date, days) => {
  if (typeof date !== "object") {
    throw TypeError("Invalid Type");
  }
  return days[getDay(date)];
};
const utils = {
  /**
   * @type {Boolean}
   */
  useUtc,
  /**
   * Returns the full year, using UTC or not
   * @param {Date} date
   */
  getFullYear,
  /**
   * Returns the month, using UTC or not
   * @param {Date} date
   */
  getMonth,

  /**
   * Returns the date, using UTC or not
   * @param {Date} date
   */
  getDate,

  /**
   * Returns the day, using UTC or not
   * @param {Date} date
   */
  getDay,

  /**
   * Returns the hours, using UTC or not
   * @param {Date} date
   */
  getHours(date) {
    return useUtc ? date.getUTCHours() : date.getHours();
  },

  /**
   * Returns the minutes, using UTC or not
   * @param {Date} date
   */
  getMinutes(date) {
    return useUtc ? date.getUTCMinutes() : date.getMinutes();
  },

  /**
   * Sets the full year, using UTC or not
   * @param {Date} date
   */
  setFullYear(date, value, useUtc) {
    return useUtc ? date.setUTCFullYear(value) : date.setFullYear(value);
  },

  /**
   * Sets the month, using UTC or not
   * @param {Date} date
   */
  setMonth(date, value) {
    return useUtc ? date.setUTCMonth(value) : date.setMonth(value);
  },

  /**
   * Sets the date, using UTC or not
   * @param {Date} date
   * @param {Number} value
   */
  setDate,

  /**
   * Check if date1 is equivalent to date2, without comparing the time
   * @see https://stackoverflow.com/a/6202196/4455925
   * @param {Date} date1
   * @param {Date} date2
   */
  compareDates(date1, date2) {
    const d1 = new Date(date1.getTime());
    const d2 = new Date(date2.getTime());

    if (useUtc) {
      d1.setUTCHours(0, 0, 0, 0);
      d2.setUTCHours(0, 0, 0, 0);
    } else {
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
    }
    return d1.getTime() === d2.getTime();
  },

  /**
   * Validates a date object
   * @param {Date} date - an object instantiated with the new Date constructor
   * @return {Boolean}
   */
  isValidDate(date) {
    if (Object.prototype.toString.call(date) !== "[object Date]") {
      return false;
    }
    return !isNaN(date.getTime());
  },

  /**
   * Return abbreviated week day name
   * @param {Date}
   * @param {Array}
   * @return {String}
   */
  getDayNameAbbr,

  /**
   * Return name of the month
   * @param {Number|Date}
   * @param {Array}
   * @return {String}
   */
  getMonthName,

  /**
   * Return an abbreviated version of the month
   * @param {Number|Date}
   * @return {String}
   */
  getMonthNameAbbr,

  /**
   * Alternative get total number of days in month
   * @param {Number} year
   * @param {Number} m
   * @return {Number}
   */
  daysInMonth(year, month) {
    return /8|3|5|10/.test(month)
      ? 30
      : month === 1
      ? (!(year % 4) && year % 100) || !(year % 400)
        ? 29
        : 28
      : 31;
  },

  /**
   * Get nth suffix for date
   * @param {Number} day
   * @return {String}
   */
  getNthSuffix,

  /**
   * Formats date object
   * @param {Date}
   * @param {String}
   * @param {Object}
   * @return {String}
   */
  formatDate(date, format, translation) {
    translation = !translation ? en : translation;
    let year = getFullYear(date);
    let month = getMonth(date) + 1;
    let day = getDate(date);
    let str = format
      .replace(/dd/, ("0" + day).slice(-2))
      .replace(/d/, day)
      .replace(/yyyy/, year)
      .replace(/yy/, String(year).slice(2))
      .replace(/MMMM/, getMonthName(getMonth(date), translation.months))
      .replace(/MMM/, getMonthNameAbbr(getMonth(date), translation.monthsAbbr))
      .replace(/MM/, ("0" + month).slice(-2))
      .replace(/M(?!a|ä|e)/, month)
      .replace(/su/, getNthSuffix(getDate(date)))
      .replace(/D(?!e|é|i)/, getDayNameAbbr(date, translation.days));
    return str;
  },

  /**
   * Creates an array of dates for each day in between two dates.
   * @param {Date} start
   * @param {Date} end
   * @return {Array}
   */
  createDateArray(start, end) {
    let dates: any = [];
    while (start <= end) {
      dates.push(new Date(start));
      start = setDate(new Date(start), getDate(new Date(start)) + 1);
    }
    return dates;
  },

  /**
   * method used as a prop validator for input values
   * @param {*} val
   * @return {Boolean}
   */
  validateDateInput(val) {
    return (
      val === null ||
      val instanceof Date ||
      typeof val === "string" ||
      typeof val === "number"
    );
  },
};

export const makeDateUtils = (useUtc) => ({ ...utils, useUtc });

export default {
  ...utils,
};
// eslint-disable-next-line
