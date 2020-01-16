var M5StickC =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const m5stickc_1 = __webpack_require__("./src/m5stickc.ts");
module.exports = m5stickc_1.M5StickC;


/***/ }),

/***/ "./src/m5stickc.ts":
/***/ (function(module, exports, __webpack_require__) {

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
const obniz_1 = __importDefault(__webpack_require__("./src/webpack-replace/obniz.js"));
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
        this.led = this.wired("LED", { anode: 10 });
        this._methodSwith(this.led, "on", "off");
        this.led.off();
        this._addToAllComponentKeys();
    }
    gyroWait() {
        let supportedIMUNameArr=["MPU6886"];
        if (!(supportedIMUNameArr.includes(this.imu.constructor.name))){
            throw new Error("gyroWait is supported only on M5stickC with "+supportedIMUNameArr.join());
        }
        return this.imu.getGyroWait();
    }
    accelerationWait() {
        let supportedIMUNameArr=["MPU6886", "SH200Q"];
        if (!(supportedIMUNameArr.includes(this.imu.constructor.name))){
            throw new Error("accelerationWait is supported only on M5stickC with "+supportedIMUNameArr.join());
        }
        return this.imu.getAccelWait();
    }
    setupIMUWait(imuName) {
        if(typeof imuName==="undefined"){imuName="MPU6886";}
        const i2c = this.m5i2c;
        const onerror = i2c.onerror;
        this.imu = this.wired(imuName, { i2c });
        const p1 = this.imu.whoamiWait();
        const p2 = new Promise((resolve, reject) => {
            i2c.onerror = reject;
        });
        return Promise.race([p1, p2]).then(async (val) => {
            if (!val) {
                throw new Error("Cannot find IMU ("+imuName+") on this M5StickC");
                //
                // // @ts-ignore
                // this.imu._reset = () => {
                //     return;
                // };
            }
            // restore
            i2c.onerror = onerror;
            switch(imuName){
                case "SH200Q":
                    await this.imu.initWait();
                    break;
                case "MPU6886":
                    this.imu.init();
                    break;
                default:
                    break;
            }
            return this.imu;
        });
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


/***/ }),

/***/ "./src/webpack-replace/obniz.js":
/***/ (function(module, exports) {


let obniz;
if (typeof Obniz !== "undefined") {
    obniz = Obniz;
} else {
    obniz = window.Obniz;
}

module.exports=obniz;


/***/ })

/******/ });