import os from "os";

console.log("Platform: " + os.platform());
console.log("Architecture: " + os.arch());
console.log("Hostname: " + os.hostname());
console.log("A string that identifies the operating system release number: " + os.release());
console.log("The number of bytes that represent the total memory available in the system.: " + os.totalmem());
console.log("Identifies the operating system:: " + os.type());
console.log("The number of seconds the computer has been running since it was last rebooted: " + os.uptime());
console.log("Object that contains the current username, uid, gid, shell, and homedir " + JSON.stringify(os.userInfo()));