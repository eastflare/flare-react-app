import { Env } from "config/env";

const env = Env.getInstance();

const DeviceDetactPage = () => {
  return (
    <div>
      현재 Device는
      {env.deviceTypeCode}
      입니다.
    </div>
  );
};

export default DeviceDetactPage;
