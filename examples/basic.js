const {
  isMediaStreamValidatorInstalled,
  mediaStreamValidator,
} = require("../dist/mediastreamvalidator");

const bitMovinSample =
  "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

(async () => {
  const isInstalled = await isMediaStreamValidatorInstalled(1, 0);
  if (isInstalled) {
    const output = await mediaStreamValidator(bitMovinSample);
    if (output.messages.length) {
      console.log(`There were ${output.messages.length} areas of concern.`);
    } else {
      console.log("Stream looks perfect!");
    }
  } else {
    console.log(
      "mediastreamvalidator is not installed. Download it from https://developer.apple.com/downloads/"
    );
  }
})();
