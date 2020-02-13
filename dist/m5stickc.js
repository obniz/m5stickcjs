"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const obniz_1 = __importDefault(require("obniz"));
class M5StickC extends obniz_1.default {
    constructor(id, options) {
        super(id, options);
    }
    _prepareComponents() {
        // @ts-ignore
        super._prepareComponents();
        this.buttonA = this.wired("Button", { signal: 37 });
        this.buttonB = this.wired("Button", { signal: 39 });
        this.ir = this.wired("InfraredLED", { anode: 9 });
        const i2cParams = { sda: 21, scl: 22, clock: 100000, pull: "3v", mode: "master" };
        // @ts-ignore
        this.m5i2c = this.getI2CWithConfig(i2cParams);
        this.axp = this.wired("AXP192", { i2c: this.m5i2c });
        const displayParams = { sclk: 13, mosi: 15, cs: 5, res: 18, dc: 23 };
        this.m5display = this.wired("ST7735S", displayParams);
        // @ts-ignore
        this.m5display.onWait = () => __awaiter(this, void 0, void 0, function* () {
            this.axp.set3VLDO2_3();
            this.axp.enableLDO2_3();
            this.wait(200);
        });
        this.led = this.wired("LED", { cathode: 10 });
        // this._methodSwith(this.led, "on", "off");
        this.led.off();
        this._addToAllComponentKeys();
    }
    gyroWait() {
        const supportedIMUNameArr = ["MPU6886", "SH200Q"];
        if (!(supportedIMUNameArr.includes(this.imu.constructor.name))) {
            throw new Error(`gyroWait is supported only on M5stickC with ${supportedIMUNameArr.join()}`);
        }
        return this.imu.getGyroWait();
    }
    accelerationWait() {
        const supportedIMUNameArr = ["MPU6886", "SH200Q"];
        if (!(supportedIMUNameArr.includes(this.imu.constructor.name))) {
            throw new Error(`accelerationWait is supported only on M5stickC with ${supportedIMUNameArr.join()}`);
        }
        return this.imu.getAccelWait();
    }
    setupIMUWait(imuName = "MPU6886") {
        const i2c = this.m5i2c;
        const onerror = i2c.onerror;
        this.imu = this.wired(imuName, { i2c });
        const p1 = this.imu.whoamiWait();
        const p2 = new Promise((resolve, reject) => {
            i2c.onerror = reject;
        });
        return Promise.race([p1, p2]).then((val) => __awaiter(this, void 0, void 0, function* () {
            if (!val) {
                throw new Error(`Cannot find IMU (${imuName}) on this M5StickC`);
                //
                // // @ts-ignore
                // this.imu._reset = () => {
                //     return;
                // };
            }
            // restore
            i2c.onerror = onerror;
            switch (imuName) {
                case "SH200Q":
                    yield this.imu.initWait();
                    break;
                case "MPU6886":
                    this.imu.init();
                    break;
                default:
                    break;
            }
            return this.imu;
        }));
    }
    _methodSwith(obj, func1, func2) {
        obj["_" + func1] = obj[func1];
        obj["_" + func2] = obj[func2];
        obj[func1] = obj["_" + func2];
        obj[func2] = obj["_" + func1];
    }
    _addToAllComponentKeys() {
        const keys = [
            "buttonA",
            "buttonB",
            "ir",
            "led",
            "m5display",
            "axp",
            "imu",
        ];
        for (const key of keys) {
            // @ts-ignore
            this._allComponentKeys.push(key);
            // @ts-ignore
            if (this[key] && !this[key]._reset) {
                // @ts-ignore
                this[key]._reset = () => {
                    return;
                };
            }
        }
    }
}
exports.M5StickC = M5StickC;
