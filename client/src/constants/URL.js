export const PROTOCOL = "http://";
export const PROD = false;
export const BASE = PROD ? "meetnayeem" : "localhost";

export let BASE_URL = PROD
  ? `${PROTOCOL}${window.location.host + ":5001"}`
  : `${PROTOCOL}${window.location.host.replace(":3000", ":5001")}`;

export const IMAGE_PATH = `${BASE_URL}/image/`;
