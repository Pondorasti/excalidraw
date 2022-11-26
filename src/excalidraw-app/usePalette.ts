import {
  init,
  events,
  paint,
  measure,
  network,
  profiler,
  vitals,
  debounce,
} from "@palette.dev/browser";
import { useEffect, useRef } from "react";

init({
  key: "clax5s0e10000l308833y9u4k",
  plugins: [events(), vitals(), network(), profiler(), measure(), paint()],
  version: process.env.REACT_APP_GIT_SHA,
});

// -------------------------------------------------------------------
// Profile page load
//   * Collect samples every 10ms
//   * Start the profiler immediately to capture the initial page load
// -------------------------------------------------------------------
profiler.start({ sampleInterval: 10, maxBufferSize: 100_000 });
addEventListener("load", () => {
  performance.measure("load");
  profiler.stop();
});

// Debounce profiler start/stop and user interactions
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
    //   * Start the profiler on click, keypress, mousemove, and wheel events
    //   * Stop the profiler after 1s of inactivity
    // -------------------------------------------------------------------
    addEventListener("click", debounceProfilerRef, {
      capture: true,
    });
    addEventListener("keypress", debounceProfilerRef, {
      capture: true,
    });
    addEventListener("mousemove", debounceProfilerRef, {
      capture: true,
    });
    addEventListener("wheel", debounceProfilerRef, {
      capture: true,
    });

    return () => {
      removeEventListener("click", debounceProfilerRef);
      removeEventListener("keypress", debounceProfilerRef);
      removeEventListener("mousemove", debounceProfilerRef);
      removeEventListener("wheel", debounceProfilerRef);
    };
  }, []);
};
