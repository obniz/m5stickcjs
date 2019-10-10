"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const obniz_1 = __importDefault(require("obniz"));
class M5stickc extends obniz_1.default {
    constructor(id, options) {
        super(id, options);
    }
    _prepareComponents() {
        // @ts-ignore
        super._prepareComponents();
        // const i2cParams = {sda: 21, scl: 22, clock: 100000, pull: "3v", mode: "master"};
        // @ts-ignore
        // this.m5i2c = this.getI2CWithConfig(i2cParams);
        this.buttonA = this.wired("Button", { signal: 37 });
        this.buttonB = this.wired("Button", { signal: 39 });
        this.ir = this.wired("InfraredLED", { anode: 9 });
        this.led = this.wired("LED", { anode: 10 });
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
exports.M5stickc = M5stickc;
