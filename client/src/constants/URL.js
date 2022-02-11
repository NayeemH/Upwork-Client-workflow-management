export const PROTOCOL = "http://";
export let BASE_URL = `${PROTOCOL}${window.location.host.replace(
  ":3000",
  ":5001"
)}`;

export const IMAGE_PATH = `${BASE_URL}/image/`;
