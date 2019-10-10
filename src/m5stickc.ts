import Obniz from "obniz";

import {InfraredLED} from "obniz/parts/Infrared/InfraredLED/index";
import {LED} from "obniz/parts/Light/LED/index";
import {Button} from "obniz/parts/MovementSensor/Button";

import {I2C} from "obniz/obniz/libs/io_peripherals/i2c";
import {IO} from "obniz/obniz/libs/io_peripherals/io";

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

    public m5i2c?: I2C;

    constructor(id: string, options?: any) {
        super(id, options);

    }

    public _prepareComponents() {

        // @ts-ignore
        super._prepareComponents();

        // const i2cParams = {sda: 21, scl: 22, clock: 100000, pull: "3v", mode: "master"};

        // @ts-ignore
        // this.m5i2c = this.getI2CWithConfig(i2cParams);

        this.buttonA = this.wired("Button", {signal: 37});
        this.buttonB = this.wired("Button", {signal: 39});
        this.ir = this.wired("InfraredLED", {anode: 9});
        this.led = this.wired("LED", {anode: 10});

        const keys = [
            "buttonA",
            "buttonB",
            "ir",
            "led",
        ];

        for (const key of keys) {
            // @ts-ignore
            this._allComponentKeys.push(key);

        }

    }

}
