import ReactDOM from "react-dom/client";
import App from "App.tsx";
import "index.css";
import { Env } from "config/env";
import { PrintDebug } from "config/removeConsole";

function main() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <App />
    // </React.StrictMode>
  );
}

async function asyncInit() {
  //운영이 아닐 경우만 console.log 출력
  const isPrd = import.meta.env.VITE_NODE_ENV === "prd";
  PrintDebug({
    isPrintLog: !isPrd,
    isPrintInfoWarnError: !isPrd,
  });
  await Env.configure();
}

asyncInit().then(() => {
  main();
});
