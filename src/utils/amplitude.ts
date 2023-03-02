import { init, track, setUserId, reset } from "@amplitude/analytics-browser";

const API_KEY: any = process.env.REACT_APP_amplitudeApi;

export const initAmplitude = () => {
  init(API_KEY);
};

export const logEvent = (eventName: string, eventProperties: any) => {
  track(eventName, eventProperties);
};

export const setAmplitudeUserId = (userId: string | undefined) => {
  setUserId(userId);
};

export const resetAmplitude = () => {
  reset();
};
