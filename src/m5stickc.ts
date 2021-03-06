import Obniz from "obniz";

import InfraredLED from "obniz/dist/src/parts/Infrared/InfraredLED";
import LED from "obniz/dist/src/parts/Light/LED";
import Button from "obniz/dist/src/parts/MovementSensor/Button";

import I2C from "obniz/dist/src/obniz/libs/io_peripherals/i2c";
import IO from "obniz/dist/src/obniz/libs/io_peripherals/io";
import ST7735S from "obniz/dist/src/parts/Display/ST7735S";
import {I2cPartsAbstructOptions} from "obniz/dist/src/parts/i2cParts";
import MPU6886 from "obniz/dist/src/parts/MovementSensor/MPU6886";
import SH200Q from "obniz/dist/src/parts/MovementSensor/SH200Q";
import AXP192 from "obniz/dist/src/parts/Power/AXP192";

export class M5StickC extends Obniz {

    public buttonA?: Button;
    public buttonB?: Button;

    public ir?: InfraredLED;
    public led?: LED;

    // auto assign
    public io15?: IO;
    public io13?: IO;
    public io23?: IO;
    public io18?: IO;
    public io26?: IO;
    public io32?: IO;
    public io33?: IO;
    public io34?: IO;
    public io36?: IO;

    public axp?: AXP192;
    public m5display?: ST7735S;
    public m5i2c?: I2C;

    public imu?: MPU6886 | SH200Q;

    constructor(id: string, options?: any) {
        super(id, options);

    }

    public _prepareComponents() {

        // @ts-ignore
        super._prepareComponents();

        this.buttonA = this.wired("Button", {signal: 37});
        this.buttonB = this.wired("Button", {signal: 39});
        this.ir = this.wired("InfraredLED", {anode: 9});

        const i2cParams = {sda: 21, scl: 22, clock: 100000, pull: "3v", mode: "master"};
        // @ts-ignore
        this.m5i2c = this.getI2CWithConfig(i2cParams);

        this.axp = this.wired("AXP192", {i2c: this.m5i2c} as I2cPartsAbstructOptions);

        const displayParams = {sclk: 13, mosi: 15, cs: 5, res: 18, dc: 23};
        this.m5display = this.wired("ST7735S", displayParams);
        // @ts-ignore
        this.m5display.onWait = async () => {
            this.axp!.set3VLDO2_3();
            this.axp!.enableLDO2_3();
            this.wait(200);
        };

        this.led = this.wired("LED", {cathode: 10});
        // this._methodSwith(this.led, "on", "off");
        this.led.off();

        this._addToAllComponentKeys();

    }

    public gyroWait(): Promise<{ x: number, y: number, z: number }> {
        const supportedIMUNameArr = ["MPU6886", "SH200Q"];
        if (!(supportedIMUNameArr.includes(this.imu!.constructor.name))) {
            throw new Error(`gyroWait is supported only on M5stickC with ${supportedIMUNameArr.join()}`);
        }
        return this.imu!.getGyroWait();
    }

    public accelerationWait(): Promise<{ x: number, y: number, z: number }> {
        const supportedIMUNameArr = ["MPU6886", "SH200Q"];
        if (!(supportedIMUNameArr.includes(this.imu!.constructor.name))) {
            throw new Error(`accelerationWait is supported only on M5stickC with ${supportedIMUNameArr.join()}`);
        }
        return this.imu!.getAccelWait();
    }

    private setupIMUWait(imuName: "MPU6886"|"SH200Q" = "MPU6886"): Promise<MPU6886|SH200Q> {
        const i2c = this.m5i2c!;
        const onerror = i2c.onerror;
        this.imu = this.wired(imuName, {i2c});

        const p1 = this.imu.whoamiWait();
        const p2 = new Promise((resolve, reject) => {
            i2c.onerror = reject;
        });
        return Promise.race([p1, p2]).then(async (val) => {
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
                    await (this.imu as SH200Q).initWait();
                    break;
                case "MPU6886":
                    (this.imu as MPU6886).init();
                    break;
                default:
                    break;
            }
            return this.imu!;
        });

    }

    private _methodSwith(obj: any, func1: string, func2: string) {
        obj["_" + func1] = obj[func1];
        obj["_" + func2] = obj[func2];
        obj[func1] = obj["_" + func2];
        obj[func2] = obj["_" + func1];
    }

    private _addToAllComponentKeys() {
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
