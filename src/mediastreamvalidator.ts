import { execFile } from "child_process";
import { readFile, unlink } from "fs";
import {
  MediaStreamValidatorOpts,
  MediaStreamValidatorData,
} from "./interfaces";

const DEFAULT_OUPUT_FILE = "./mediastreamvalidator_output.json";

function getMediaStreamValidatorPath(path?: string) {
  return (
    path || process.env.MEDIA_STREAM_VALIDATOR_PATH || "mediastreamvalidator"
  );
}

function mediaStreamValidatorExecute(
  mediaStreamValidatorPath: string,
  args: string[]
): Promise<void> {
  return new Promise((resolve, reject) => {
    execFile(mediaStreamValidatorPath, args, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export function isMediaStreamValidatorInstalled(): Promise<boolean>;
export function isMediaStreamValidatorInstalled(
  majorVersionRequirement: number,
  minorVersionRequirement?: number
): Promise<boolean>;
export function isMediaStreamValidatorInstalled(
  path: string,
  majorVersionRequirement?: number,
  minorVersionRequirement?: number
): Promise<boolean>;
export function isMediaStreamValidatorInstalled(
  pathOrMajor?: string | number,
  majorOrMinor?: number,
  minorVersion?: number
): Promise<boolean> {
  const firstArgIsPath = typeof pathOrMajor === "string";
  const mediaStreamValidatorPath: string = (() => {
    if (firstArgIsPath) {
      return String(pathOrMajor);
    }
    return getMediaStreamValidatorPath();
  })();
  const majorVersionRequirement: number = (() => {
    if (firstArgIsPath) {
      return Number(majorOrMinor || 1);
    }
    return Number(pathOrMajor || 1);
  })();
  const minorVersionRequirement: number = (() => {
    if (firstArgIsPath) {
      return minorVersion || 2;
    }
    return majorOrMinor || 2;
  })();
  return new Promise((resolve, reject) => {
    execFile(mediaStreamValidatorPath, ["-v"], (err, stdout, stderr) => {
      // Get version number from output
      const version: number[] = (
        ((stderr || "").match(/Version ([0-9]+\.[0-9]+)/) || [])[1] || "0.0"
      )
        .split(".")
        .map((value) => {
          return Number(value);
        });
      // Make sure it's installed and has the proper version
      if (
        err ||
        majorVersionRequirement > version[0] ||
        (majorVersionRequirement == version[0] &&
          minorVersionRequirement > version[1])
      ) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export const mediaStreamValidator = (
  target: string,
  opts?: MediaStreamValidatorOpts
): Promise<MediaStreamValidatorData> => {
  return new Promise(async (resolve, reject) => {
    opts = opts || {};
    const path = getMediaStreamValidatorPath(opts.path);
    const outputFile = opts.outputFile || DEFAULT_OUPUT_FILE;
    const args: string[] = ["-O", outputFile, target];
    if (opts.processPlaylistOnly) {
      args.push("-p");
    }
    if (opts.timeoutSeconds) {
      args.push("-t");
      args.push(String(opts.timeoutSeconds));
    }
    if (opts.userAgent) {
      args.push("-u");
      args.push(opts.userAgent);
    }
    if (opts.device) {
      args.push("-d");
      args.push(opts.device);
    }
    mediaStreamValidatorExecute(path, args)
      .then(() => {
        readFile(outputFile, "utf8", (err, json) => {
          if (err) {
            reject(err);
          }
          unlink(outputFile, (err) => {
            resolve(JSON.parse(json));
          });
        });
      })
      .catch(reject);
  });
};
