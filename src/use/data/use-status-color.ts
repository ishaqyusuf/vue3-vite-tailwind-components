export default {
  getColor: (status, colorList) => {
    return colorList && colorList.find((s) => s.status == status)?.color;
  },
};
