// App.tsx
import { Analytics } from "@vercel/analytics/react";
import Derivative from "./derivative";

export default function App() {
  return (
    <>
      <Derivative />
      <Analytics />
    </>
  );
}