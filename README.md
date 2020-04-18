# media-stream-validator

Apple's mediastreamvalidator tool is an extremely picky way to evaluate your HLS streams against the specifications. It often reports "must fix" errors in the stream that in reality will probably not cause failures. However, if you are having issues with HLS stream failures or inconsistencies across devices (especially on iOS devices) it is a great utility to validate your streams.

This project is a simple Node wrapper, written in TypeScript with full typing goodness, that you can use in your manual or automated testing of streams.

Please note that it can take a while to run because it downloads and evaluates the entire video, including each rendition.

```
import { mediaStreamValidator } from "mediastreamvalidator";

const streamUri = "YOUR_STREAM_URL_HERE";

(async () => {
    const results = await mediaStreamValidator(streamUri);
    console.log(results);
})();
```

There are more usages examples in the the `examples` folder.

## Options

The first argument of `mediaStreamValidator` is the URI to the stream, which is required. The second is optional. It has various options, which should mainly be self-explanatory thanks to intellisense.

But here are some quick notes on them.

### path: string

Use this to use a custom path to the `mediastreamvalidator` executable. You can also use the `MEDIA_STREAM_VALIDATOR_PATH` environment variable instead.

### outputFile: string

The `mediastreamvalidator` insists on writing its JSON output to a file. So there is a temporary file created and then quickly deleted after this library parses it. If, for some reason, you want to customize where that temporary file is written this option is for you. By default, it creates it as `mediastreamvalidator_output.json` in the current folder.

### processPlaylistOnly: boolean

Running the script and downloading all of the video can be very time consuming. If you want to only evaluate the manifests and not the segments, set this option to true. It will run a lot faster and give you great high level information about your stream. But it's less likely to uncover issues.

### timeoutSeconds: number

The default timeout for the script is five minutes. If you want to set this shorter or longer, use this option.

### userAgent: string

If, for some reason, you want to set the user agent of the requests for the manifests and segments, here you go.

### device: string

In case you need to emmulate being a certain device, you can specific that here. Possible values are: ipod, iphone, atv or ipad.
