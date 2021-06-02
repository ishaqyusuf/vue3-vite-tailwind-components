export function useFileFormat() {
  var formats = {
    "jpg;png;gif": "img",
    pdf: "pdf",
    ppt: "ppt",
    "docx;doc": "doc",
    "xls;csv": "excel",
    "json;xml;sql": "code",
    default: "doc",
  };
  function get(format) {
    const k =
      Object.keys(formats).find((k) => k.split(";").includes(format)) ??
      "default";
    return formats[k];
  }
  return {
    get,
  };
}
