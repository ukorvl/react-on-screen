<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/ukorvl/design/master/react-on-screen/react-on-screen-dark.svg"/>
  <img alt="react-on-screen logo" src="https://raw.githubusercontent.com/ukorvl/design/master/react-on-screen/react-on-screen.svg" width="600"/>
</picture>

Lightweight typescript library to detect React elements visibility

[![Build](https://github.com/ukorvl/react-on-screen/actions/workflows/build.yaml/badge.svg)](https://github.com/ukorvl/react-on-screen/actions/workflows/build.yaml)
[![Npm version](https://img.shields.io/npm/v/@ukorvl/react-on-screen)](https://www.npmjs.com/package/@ukorvl/react-on-screen)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Minified size](https://img.shields.io/bundlephobia/min/@ukorvl/react-on-screen)](https://bundlephobia.com/package/@ukorvl/react-on-screen)

## Table of contents
  - [Getting started](#getting-started)
  - [Usage](#usage)
    - [Render props](#render-props)
    - [Hook](#hook)
    - [HOC](#hoc)
    - [Api](#api)
  - [License](#license)

## Getting started
### npm
```bash
$ npm i @ukorvl/react-on-screen
```
### yarn
```bash
yarn add @ukorvl/react-on-screen
```
### CDN
```html
<script src="https://unpkg.com/@ukorvl/react-on-screen/build/react-on-screen.standalone.js"></script>
```
The standalone version creates window.ReactOnScreen object with all exports from esm version.

Note, that ```react``` package is not included into standalone version, but is required. Standalone version requires global ```React``` variable to work as expected.

## Usage

This library is using Intersection observer API under the hood, so you may need to polyfill it. More information about Intersection observer API browser support at [caniuse](https://caniuse.com/intersectionobserver).

### Render props
```tsx
import { OnScreen } from '@ukorvl/react-on-screen';

const MyComponent = () => (
  <OnScreen>
    {({isOnScreen, ref}) => (
      <div ref={ref}>
        {isOnScreen ? 'On screen!' : 'Not on screen'}
      </div>
    )}
  </OnScreen>
)
```

### Hook
```tsx
import useOnScreen from '@ukorvl/react-on-screen';

const MyComponent = () => {
  const ref = useRef<T>(null);
  const {isOnScreen} = useOnScreen({ref});

  return (
    <div ref={ref}>{isOnScreen ? 'On screen!' : 'Not on screen'}</div>
  )
}
```

### HOC
```tsx
const List = forwardRef(function List({isOnScreen, ...restProps}: ListProps, ref) {
  return (
    <ul className={isOnScreen ? 'my-class' : ''} {...restProps}>
      <li>Something</li>
        {'...'}
    </ul>
  )
})

export const ListWithOnScreen = WithOnScreen(List, {threshold: 0.5, margin: '4rem'});
```

### API
**useOnScreen** hook settings. **OnScreen** and **WithOnScreen** components have the same api, except ref. **useOnScreen** consumes target element ref as a setting, but components deal with target element in a different way.

|Name            |Default         |Description        |
|----------------|----------------|-------------------|
|threshold       |0                |Could be a single number from 0 to 1, or array of numbers. If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5. Set 1 to consider visibility only if all element is on the screen.If array of thresholds is provided, visibility detection will be triggered every time visibility passes one of provided thresholds.|
|margin          |undefined        |Could be any valid css margin value. This value serves to grow or shrink each side of the target element's bounding box before computing is it visible or not.|
|once            |false            |Triggers visibility detection only once. Once target element becomes visible, visibility detection will be disabled.|

## License

[MIT](http://opensource.org/licenses/MIT)
