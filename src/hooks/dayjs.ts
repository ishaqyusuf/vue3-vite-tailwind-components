import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export default {
  install: function (app, options) {
    app.config.globalProperties.$dayjs = {
      format(value, format = "YYYY-MM-DD") {
        try {
          return dayjs.utc(value).local().format(format);
        } catch (error) {}
        return value;
      },
    };
  },
};
