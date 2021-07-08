import concat from "better-concat";

await concat({
  files: ["html/sheet.html", "html/worker.js", "html/roll-template.html"],
  fileStr: (content, path) => {
    if (path.endsWith(".js")) {
      return "<script type=\"text/worker\">\n" + content + "\n</script>\n";
    }
    return content;
  },
  out: process.argv[2] || 'out.html',
});
