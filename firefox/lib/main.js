var pageMod = require("sdk/page-mod");
var self = require("sdk/self");

pageMod.PageMod({
  include: ["https://github.com/*", "https://www.github.com/*"],
  contentScriptFile: [self.data.url("jquery.min.js"),
                      self.data.url("script.js")]
});
