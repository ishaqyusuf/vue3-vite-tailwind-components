export default {
  getColor: (status, colorList, def: any = null) => {
    return (
      (colorList && colorList.find((s) => s.status == status)?.color) ?? def
    );
  },
};
