import { useEffect, useState } from "react";

export enum DeviceType {
  COMPUTER = "computer",
  MOBILE = "mobile",
  TABLET = "tablet",
  UNKNOWN = "unknown",
}

// tabletRegex taken from https://stackoverflow.com/a/50195587
const tabletRegex =
  /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/;
// mobileRegex taken from https://stackoverflow.com/a/26577897
const mobileRegex =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i;
const chinBrowserRegex = /Chrome|Safari/i;

const useDevice = () => {
  const [stateHasChin, setStateHasChin] = useState(false);
  const [stateDeviceType, setStateDeviceType] = useState<DeviceType>(
    DeviceType.UNKNOWN
  );

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      // Check for device type
      if (
        mobileRegex.test(navigator.userAgent) ||
        window.matchMedia("(any-pointer: coarse)").matches
      ) {
        setStateDeviceType(DeviceType.MOBILE);

        // Check if device has chin (safari and chrome only)
        setStateHasChin(chinBrowserRegex.test(navigator.userAgent));
      } else if (tabletRegex.test(navigator.userAgent)) {
        setStateDeviceType(DeviceType.TABLET);
      } else {
        setStateDeviceType(DeviceType.COMPUTER);
      }
    }
  }, []);

  return {
    deviceType: stateDeviceType,
    hasChin: stateHasChin,
  };
};

export default useDevice;
