import { Platform } from "react-native";

export function useMapsLinking() {
  function deviceMapNavigation(
    latitude: string,
    longitude: string,
    businessLabel: string
  ) {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${latitude},${longitude}`;
    const label = businessLabel;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    return url || "";
  }

  return { deviceMapNavigation };
}
