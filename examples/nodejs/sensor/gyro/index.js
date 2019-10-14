const M5StickC = require("m5stickcjs");

let m5 = new M5StickC('OBNIZ_ID_HERE');

console.log("connecting");
m5.onconnect = async function () {
  console.log("connected");

  await m5.setupIMUWait();
  while(1) {
    let data = await m5.gyroWait();
    Object.keys(data).map(function(key, index) {
      data[key] = data[key].toFixed(2);
    });

    console.log(data);
  }

};
