# react-app-rewire-css-modules-simple [![npm](https://img.shields.io/npm/v/react-app-rewire-css-modules-simple.svg?style=flat-square)](https://www.npmjs.com/package/react-app-rewire-css-modules-simple)
Add CSS Module loaders to your create-react-app via react-app-rewired. Simple, without SASS or LESS.

## Installation

```
npm install --save-dev react-app-rewire-css-modules-simple
```

## Usage

Use the following file extensions for any css module styles:

* `*.module.css`

### Example

In your react-app-rewired configuration:

```javascript
/* config-overrides.js */

const rewireCssModules = require("react-app-rewire-css-modules-simple");

module.exports = function override(config, env) {
  
  config = rewireCssModules(config, env);
  
  // with loaderOptions
  config = rewireCssModules.withLoaderOptions({
    localIdentName: '[local]___[hash:base64:5]',
  })(config, env);

  return config;
};
```

In your React application:

```css
/* App.module.css */

.div {
  color: red;
}
```

```jsx harmony
// App.js

import React from 'react';
import styles from './App.module.css';

export default ({text}) => (
    <div className={styles.div}>{text}</div>
)
```