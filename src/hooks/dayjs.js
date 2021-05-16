import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default {
  install: function (Vue, options) {
    Vue.filter("dayjs", (value, format = "YYY-MM-DD") => {
      try {
        return dayjs.utc(value).local().format(format);
      } catch (error) {}
      return value;
    });
    Vue.prototype.$dayjs = dayjs;
  },
};
