import {
  isMediaStreamValidatorInstalled,
  mediaStreamValidator,
} from "../dist/mediastreamvalidator";

const bitMovinSample =
  "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

(async () => {
  const isInstalled = await isMediaStreamValidatorInstalled(1, 0);
  if (!isInstalled) {
    console.log(
      "mediastreamvalidator tool is not installed. Go take care of that and come back!"
    );
    return;
  }
  const results = await mediaStreamValidator(bitMovinSample, {
    timeoutSeconds: 60,
    processPlaylistOnly: true,
  });
  console.log(`Found these ${results.variants.length} variants:`);
  results.variants.forEach((variant) => {
    console.log(
      ` * ${variant.playlistResolutionWidth}x${variant.playlistResolutionHeight}@${variant.playlistMaxBitrate}`
    );
  });
})();
