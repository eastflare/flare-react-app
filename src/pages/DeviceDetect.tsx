import { isMobile, isTablet, isBrowser } from "react-device-detect";

const DeviceDetact = () => {
  return (
    <div>
      현재 Device는
      {isMobile && <p>Mobile Device</p>}
      {isTablet && <p>Tablet Device</p>}
      {isBrowser && <p>Browser Device</p>}
      입니다.
    </div>
  );
};

export default DeviceDetact;
