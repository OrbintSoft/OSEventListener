[![Build Status](https://dev.azure.com/orbintsoft/OSEventListener/_apis/build/status/OrbintSoft.OSEventListener?branchName=master)](https://dev.azure.com/orbintsoft/OSEventListener/_build/latest?definitionId=6&branchName=master)
[![npm version](https://badge.fury.io/js/oseventlistener.svg)](https://badge.fury.io/js/oseventlistener)
[![Donations via PayPal](https://img.shields.io/badge/Donations-via%20Paypal-blue.svg)](https://www.paypal.me/OrbintSoft)

# OSEventListener
A simple Typescript/VanillaJS Event Listener


## Why choose OS Event Listener?

- It is modern, code written in Typescript with ES2020 target and ES Modules.
- It is simple to use.
- It is cross compatible, it works in any browser with at least ES2015 support, NodeJs and more.
- It is modular, it supports AMD, UMD, CommonJS, SystemJs module loading systems.
- Works very well in a browser without any deps or tools, because it provides an iife browser bundle that exposes the library on window ready to be used.
- It is strong typed, thanks to Typescript it provides type definitions, there is no use of "any" type.
- It is advanced, the behavior can be changed with custom options covering most of use cases.

## How to load it

**You can check samples here:**
https://github.com/OrbintSoft/OSEventListener/blob/master/sample

If you checkout the git project you can run **npm run server**, to start a simple server and test the varius module loading.

**Below the supported module loading systems**

AMD: https://github.com/OrbintSoft/OSEventListener/blob/master/sample/amd.html

UMD: https://github.com/OrbintSoft/OSEventListener/blob/master/sample/umd.html

System.JS: https://github.com/OrbintSoft/OSEventListener/blob/master/sample/system.html

Browser / IIFE Bundle: https://github.com/OrbintSoft/OSEventListener/blob/master/sample/bundle.html

ES6: https://github.com/OrbintSoft/OSEventListener/blob/master/sample/es.html

## How to use:

**Create an Event**
```
const event = new EventListener('name');
```

**Subscribe to an event**
```
const fn = (sender, data) => {
	console.log(data);
};
event.subscribe(fn);
```

**Subscribe with key**
```
event.subscribeWithKey((sender, data) => {
	console.log(data);
}, 'logdata');
```

**Unsubscribe to an event**
```
event.unsubscribe(fn);
```

**Unsubscribe with key**
```
event.unsubscribeWithKey('logdata');
```

**Dispatch an event**
```
event.dispatch(this, 'my data');
```