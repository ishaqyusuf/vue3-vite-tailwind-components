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
      readable(value, short = false) {
        try {
          let now = dayjs.utc().local();
          let d = dayjs.utc(value).local();
          let diff = now.diff(d, "days");
          let format =
            diff == 0
              ? short
                ? "HH:mm"
                : "hh:mm a"
              : diff == 1
              ? "Yesterday"
              : now.diff(d, "years") == 0
              ? "MMM DD"
              : "MMM DD, YY";
          let smartDate = diff == 1 ? format : d.format(format);
          return smartDate;
        } catch (error) {}
        return value;
      },
    };
  },
};
