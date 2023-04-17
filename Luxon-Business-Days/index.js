// Use DateTime as normal
//import { DateTime } from 'luxon-business-days';
import pkg from 'luxon-business-days';
const { DateTime, moment } = pkg;

const dt = DateTime.local();
console.log(dt);
console.log("Current Date US", dt.toISO()); //ISO Format Means - 2021-06-22T19:11:45.640-06:00

const dateTime = DateTime.fromISO(new Date().toISOString()).setZone('Asia/Kolkata').toISO(); 
console.log("Current Date Asia ", dateTime);

const { availableHolidayMatchers } = dt;
const myCompanyIsNoFun = [
  availableHolidayMatchers.isNewYearsDay,
  availableHolidayMatchers.isChristmasDay,
];
console.log("availableHolidayMatchers",availableHolidayMatchers);
// const myCompanyIsNoFun = new Set([
//     '2023-04-17', // <-- you were missing the 0 here in yours
//     '2023-04-13',
//     // snip
// ]);
  
console.log("hiolidays",myCompanyIsNoFun);
dt.setupBusiness({ 
    businessDays : [1,2,3,4,5],
    holidayMatchers: myCompanyIsNoFun 
});
//const res = dt.plusBusiness(); 
const res = dt.minusBusiness();
console.log(res.toISO());
// dt = dt.plusBusiness({ days: 2 }); // 7/9/19 - Tuesday (Skipped through Saturday/Sunday)
// dt = dt.minusBusiness({ days: 2 }); // back to 7/5/19
// dt = dt.minusBusiness({ days: -2 }) // back to 7/9/19
// dt = dt.plusBusiness({ days: -2 }); // back to 7/5/19


//DURATION 
const date1 = DateTime.fromISO("2023-04-14T14:07:32")
const date2 = DateTime.fromISO("2023-04-14T12:32:20")

const diff = date1.diff(date2, ["years", "months", "days", "hours", "minutes", "seconds"]);
console.log("diff",diff);


//UTC Conversion
const d = DateTime.fromISO('2019-07-09T18:45', {zone: 'America/Chicago'});
console.log(d.toISO());
console.log(d.toUTC().toISO());