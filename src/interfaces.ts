export interface MediaStreamValidatorMessage {
  errorComment: string;
  errorDomain: string;
  errorReferenceDataID: number;
  errorStatusCode: number;
  errorRequirementLevel: number;
  errorDetail: string;
}

export interface MediaStreamValidatorSslHost {
  sslNegotiatedProtocolVersion: number;
  sslNegotiatedCipher: number;
  sslECKeyECNamedCurve: number;
}

export interface MediaStreamValidatorPlaylistGroup {
  playlistGroupID: string;
  renditions: {
    url: string;
    persistentID: number;
  }[];
}

export interface MediaStreamValidatorDiscontinuitySegment {
  discontinuityDomain: number;
  segmentByteRangeLength: number;
  format: string;
  url: string;
  dataID: number;
  videoFrameRate: number;
  videoStartsWithIDR: boolean;
  segmentDurationTag: number;
  mediaSequence: number;
  sslContentDeliveredSecurely: boolean;
  segmentByteRangeOffset: number;
}

export interface MediaStreamValidatorDiscontinuityMeasurements {
  measuredMaxBitrate: number;
  measuredMeanBitrate: number;
}

export interface MediaStreamValidatorDiscontinuity {
  segments: MediaStreamValidatorDiscontinuitySegment[];
  measurements: MediaStreamValidatorDiscontinuityMeasurements;
  tracks: MediaStreamValidatorDiscontinuityTrack[];
}

export interface MediaStreamValidatorDiscontinuityTrack {
  trackVideoIDRStandardDeviation: number;
  trackId: number;
  trackVideoWidth: 480;
  trackVideoLevel: number;
  trackVideoHeight: number;
  trackMediaType: string;
  trackVideoIDRInterval: number;
  trackVideoIsInterlaced: boolean;
  trackVideoProfile: number;
  trackMediaSubType: string;
}

export interface MediaStreamValidatorVariant {
  videoRangeKey: string;
  processedSegmentsCount: number;
  url: string;
  hasDiscSequenceTag: boolean;
  measuredMeanBitrate: number;
  parsedSegmentsCount: number;
  hasEndTag: boolean;
  playlistCodecs: string;
  playlistResolutionHeight: number;
  measuredMaxBitrate: number;
  independentSegments: boolean;
  audioGroup: MediaStreamValidatorPlaylistGroup;
  closedCaptionGroup: MediaStreamValidatorPlaylistGroup;
  iframeOnly: boolean;
  playlistKind: string;
  playlistMaxBitrate: number;
  sslContentDeliveredSecurely: boolean;
  discontinuities: MediaStreamValidatorDiscontinuity[];
  playlistResolutionWidth: number;
  playlistTargetDuration: number;
  gzipEncoded: boolean;
  dataID: number;
}

export interface MediaStreamValidatorData {
  independentSegments: boolean;
  gzipEncoded: boolean;
  validatorTimestamp: string;
  dataID: number;
  url: string;
  messages: MediaStreamValidatorMessage[];
  validatorVersion: string;
  sslHosts: {
    [host: string]: MediaStreamValidatorSslHost;
  };
  sslContentDeliveredSecurely: boolean;
  playlistKind: string;
  variants: MediaStreamValidatorVariant[];
  dataVersion: number;
}

export interface MediaStreamValidatorOpts {
  path?: string;
  outputFile?: string;
  processPlaylistOnly?: boolean;
  timeoutSeconds?: number;
  userAgent?: string;
  device?: "ipod" | "iphone" | "atv" | "ipad";
}
