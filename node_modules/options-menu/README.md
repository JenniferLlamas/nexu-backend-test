# Options menu

[![Build Status](https://travis-ci.org/gnavalesi/options-menu.svg?branch=master)](https://travis-ci.org/gnavalesi/options-menu) [![Test Coverage](https://codeclimate.com/github/gnavalesi/options-menu/badges/coverage.svg)](https://codeclimate.com/github/gnavalesi/options-menu/coverage) [![Code Climate](https://codeclimate.com/github/gnavalesi/options-menu/badges/gpa.svg)](https://codeclimate.com/github/gnavalesi/options-menu) [![Dependency Status](https://www.versioneye.com/user/projects/578a5db3c3d40f003caa3422/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/578a5db3c3d40f003caa3422)

A simple library to use options menu in a console application.


## Usage

### Single option

``` menu.single(title: String, options: Array[Object], [callback: Function])```

#### Example

```js
var menu = require('menu');

var title = 'Menu title';
var options = [{
    title: 'Option 1',
    action: function() {
        console.log('You choose option 1');
    }
}, {
   title: 'Option 2',
   action: function() {
       console.log('You choose option 2');
   }
}];

var callback = function() {
    console.log('The callback is called');
};

menu.single(title, options, callback);
```

It will show the following menu and allow a single option to be selected:

```
Menu title:
1) Option 1
2) Option 2

> a
Invalid option
> 1
You choose option 1
The callback is called
```

### Multi option

``` menu.multi(title: String, options: Array[Object], [callback: Function])```

#### Example

```js
var menu = require('menu');

var title = 'Menu title';
var options = [{
    title: 'Option 1',
    action: function() {
        console.log('You choose option 1');
    }
}, {
   title: 'Option 2',
   action: function() {
       console.log('You choose option 2');
   }
}];

var callback = function() {
    console.log('The callback is called');
};

menu.multi(title, options, callback);
```

It will show the following menu and allow a single option to be selected:

```
Menu title:
1) Option 1
2) Option 2

> a
Invalid option
> 1 2
You choose option 1
You choose option 2
The callback is called
```

### Build

Returns a function that, when called, it will show the menu

``` menu.build(type: Function, title: String, options: Array[Object], [callback: Function])```

#### Example

```js
var menu = require('menu');

var title = 'Menu title';
var options = [{
    title: 'Option 1',
    action: function() {
        console.log('You choose option 1');
    }
}, {
   title: 'Option 2',
   action: function() {
       console.log('You choose option 2');
   }
}];

var callback = function() {
    console.log('The callback is called');
};

var myMenu = menu.build(menu.multi, title, options, callback);

myMenu();
```