
//https://blog.insiderattack.net/how-not-to-measure-time-in-programming-11089d546180

import { execSync } from "child_process";
import { setTimeout } from "timers-promises";
import { performance } from "perf_hooks";

function setFakeTime() {
  const toTwoDigits = (num) => num.toString().padStart(2, "0");
  const now = new Date();
  const month = toTwoDigits(now.getMonth() + 1);
  const date = toTwoDigits(now.getDate());
  const hours = toTwoDigits(now.getHours());
  const fakeMinutes = toTwoDigits(now.getMinutes() + 1); // set minutes to 1 min ahead of actual time
  const year = now.getFullYear().toString().substring(2, 4);

  // set fake time
  execSync(`date -u ${month}${date}${hours}${fakeMinutes}${year}`);
}

function correctTimeNTP() {
  const output = execSync(`sntp -sS time.apple.com`);
  console.log(`Time corrected: ${output}`);
}

const doSomething = () => setTimeout(2000);

(async () => {
  setFakeTime();

  const startTimeToD = Date.now(); // set startTime with time-of-day clock
  const startTimeMon = performance.now(); // set startTime with monotonic clock

  setImmediate(() => {
    correctTimeNTP(); // synchronies the clock
  });
  await doSomething();

  const endTimeToD = Date.now(); // set endTime with time-of-day clock
  const endTimeMon = performance.now(); // set endTime with monotonic clock
  const durationToD = endTimeToD - startTimeToD;
  const durationMon = endTimeMon - startTimeMon;
  const error = (durationToD - durationMon) / 1000;

  console.log(`Duration measured by time-of-day clock\t: ${durationToD}ms`);
  console.log(`Duration measured by monotonic clock\t: ${durationMon}ms`);
  console.log(`Error: ${error.toFixed(3)}s`);
})();
