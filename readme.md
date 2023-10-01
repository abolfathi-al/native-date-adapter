# NativeDateAdapter

Native Date adapter for Typescript, Just like native javascript `Date`.
> Date convertor functions use [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) which is ECMAScript Internationalization

## Installation

```bash
npm install native-date-adapter --save
# or
yarn add native-date-adapter
```

### Browser

```html
<head>
  <script src="path/to/native-date-adapter/dist/index.js"></script>
</head>
```

### Node, ESM

```js
import { NativeDateAdapter } from 'native-date-adapter'
// or
const NativeDateAdapter = require('native-date-adapter')
```

### Initialization

For initializing `NativeDateAdapter` after setting the locale, you can pass parameters of Native date adapter (it's just like native Date) or Other objects like `Date` , `NativeDateAdapter`, `ISOString`, `Milliseconds` as parameters.

```js
const dateHandler = NativeDateAdapter.setLocale('fa-IR');

new dateHandler()
new dateHandler(milliseconds)
new dateHandler(gregorianDateString)
new dateHandler(adapterYear, adapterMonth, adapterDay, hours, minutes, seconds, milliseconds)
```

### API

```js
const dateHandler = NativeDateAdapter.setLocale('fa-IR');
const date = new dateHandler(1396, 5, 5)

// Getters
date.getFullYear() // 1396
date.getMonth() // 5 (indexed from zero, so 5 is شهریور)
date.getDate() // 5 (day in month)
date.getDay() // 4 (day of week started from saturday and indexed from zero, so 4 is چهارشنبه)

// Setters
date.setFullYear(1371)
date.setMonth(6)
date.setDate(1)

// Formated output
date.toISOString() // 1992-09-22T20:30:00.000Z
```

### Difference with native Date?

`NativeDateAdapter` is an instance of native `Date`. All methods act just like the native API, so you can send `NativeDateAdapter` by AJAX libs to server or run `JSON.stringify` on it. Everything else works as well. It will also automatically convert to ISO.
