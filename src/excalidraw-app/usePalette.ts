import {
  init,
  events,
  paint,
  markers,
  network,
  profiler,
  vitals,
  debounce,
} from "@palette.dev/browser";
import { useEffect, useRef } from "react";

init({
  key: "clax5s0e10000l308833y9u4k",
  plugins: [events(), vitals(), network(), profiler(), markers(), paint()],
  version: process.env.REACT_APP_GIT_SHA,
  debug: true,
});

// -------------------------------------------------------------------
// Profile page load
//   * Collect samples every 10ms
//   * Start the profiler immediately to capture the initial page load
// -------------------------------------------------------------------
if (typeof window !== "undefined") {
  profiler.start({ sampleInterval: 10, maxBufferSize: 100_000 });
  addEventListener("load", () => {
    performance.measure("load");
    profiler.stop();
  });
}

// Debounce profiler start/stop and key events
export const usePalette = () => {
  const debounceProfiler = useRef(
    debounce(
      () => profiler.stop(),
      () => profiler.start({ sampleInterval: 10, maxBufferSize: 100_000 }),
    ),
  );

  useEffect(() => {
    const debounceProfilerRef = debounceProfiler.current;

    // -------------------------------------------------------------------
    // Profile page interactions
    //   * Collect samples every 10ms
    //   * Start the profiler on click, keypress, pointermove, and wheel events
    //   * Stop the profiler after 1s of inactivity
    // -------------------------------------------------------------------
    addEventListener("click", debounceProfilerRef);
    addEventListener("keypress", debounceProfilerRef);
    addEventListener("pointermove", debounceProfilerRef);
    addEventListener("wheel", debounceProfilerRef);

    return () => {
      removeEventListener("click", debounceProfilerRef);
      removeEventListener("keypress", debounceProfilerRef);
      removeEventListener("pointermove", debounceProfilerRef);
      removeEventListener("wheel", debounceProfilerRef);
    };
  }, []);
};
