import {
  init,
  events,
  paint,
  markers,
  network,
  profiler,
  vitals,
} from "@palette.dev/browser";

init({
  key: "clax5s0e10000l308833y9u4k",
  plugins: [events(), vitals(), network(), profiler(), markers(), paint()],
  version: process.env.REACT_APP_GIT_SHA,
  debug: true,
});

profiler.on(
  [
    "paint.click",
    "paint.keydown",
    "paint.scroll",
    "paint.mousemove",
    "markers.measure",
    "events.load",
    "events.dcl",
  ],
  {
    sampleInterval: 1,
    maxBufferSize: 100_000,
  },
);
