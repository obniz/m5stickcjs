import Obniz from "obniz";

import {InfraredLED} from "obniz/parts/Infrared/InfraredLED";
import {LED} from "obniz/parts/Light/LED";
import {Button} from "obniz/parts/MovementSensor/Button";

import {I2C} from "obniz/obniz/libs/io_peripherals/i2c";
import {IO} from "obniz/obniz/libs/io_peripherals/io";
import {ST7735S} from "obniz/parts/Display/ST7735S";
import {AXP192} from "obniz/parts/Power/AXP192";

export class M5stickc extends Obniz {

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

        this.axp =  this.wired("AXP192", {i2c: this.m5i2c});
        this.wait(200);

        const displayParams = {sclk: 13, mosi: 15, cs: 5, res: 18, dc: 23};
        this.m5display = this.wired("ST7735S", displayParams);
        // @ts-ignore
        this.m5display.onWait = async () => {
            this.axp!.set3VLDO2_3();
            this.axp!.enableLDO2_3();
        };

        this.led = this.wired("LED", {anode: 10});
        this._methodSwith(this.led, "on", "off");
        this.led.off();

        this._addToAllComponentKeys();

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
        ];

        for (const key of keys) {
            // @ts-ignore
            this._allComponentKeys.push(key);

            // @ts-ignore
            if (!this[key]._reset) {

                // @ts-ignore
                this[key]._reset = () => {
                    return;
                };
            }

        }

    }
}
