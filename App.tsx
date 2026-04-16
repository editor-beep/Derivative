// App.tsx
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Derivative from "./derivative";

export default function App() {
  return (
    <>
      <Derivative />
      <Analytics />
      <SpeedInsights />
    </>
  );
}