const M5StickC = require("m5stickcjs");

let m5 = new M5StickC('OBNIZ_ID_HERE');

console.log("connecting");

m5.onconnect = async ()=> {
  console.log("connected");

  m5.buttonA.onchange = (state) => {
    console.log("buttonA :"  + (state ? "pushed" : "released"));
  }

  m5.buttonB.onchange = (state) => {
    console.log("buttonB :"  + (state ? "pushed" : "released"));
  }

}