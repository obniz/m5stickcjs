# M5StickC.js


** 
This SDK is currently out of maintenance.
M5StickC.js has been merged into obniz.js.
Please use obnizjs v3.4.0 or later to be create M5StickC instance. **

```
const m5 = new Obniz.M5StickC("obniz_id"); // on obniz.js v3.4.0 or later
```

---


SDK for controlling [M5StickC](https://docs.m5stack.com/#/en/core/m5stickc) with [obnizOS](https://obniz.io).
It works on both browser and nodejs.


# Usage

See [HTML Examples](./examples/html) or [Node.js Examples](./examples/nodejs)


# Installation

### Browser
Add the following script tag to your html

```html
  <script src="https://unpkg.com/obniz/obniz.js"></script> <!-- m5stickc.js use obniz.js.  load obniz.js before m5stickc.js -->
  <script src="https://unpkg.com/m5stickcjs/m5stickc.js"></script>
```

### Nodejs
Install via npm

```
  npm install m5stickcjs
```

and import it to js file.

```nodejs
  const M5StickC = require('m5stickcjs');
```


# Examples

Examples is [here](/examples).

# Document
More details, see [M5Stackjs document](https://obniz.github.io/m5stickcjs/classes/_src_m5stickc_.m5stickc.html) or [obniz document](https://obniz.io/doc/root)
