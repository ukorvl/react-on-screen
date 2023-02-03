# @ukrovl/react-on-screen

Lightweight typescript library to detect React elements visibility

[![Test](https://github.com/NilFoundation/react-components/actions/workflows/test.yaml/badge.svg)](https://github.com/NilFoundation/react-components/actions/workflows/test.yaml)
[![Npm version](https://img.shields.io/npm/v/@ukorvl/react-on-screen)](https://www.npmjs.com/package/@ukorvl/react-on-screen)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Minified size](https://img.shields.io/bundlephobia/min/@ukorvl/react-on-screen)](https://bundlephobia.com/package/@ukorvl/react-on-screen)

## Table of contents
  - [Getting started](#getting-started)
  - [Usage](#usage)
    - [Render props](#render-props)
    - [Hook](#hook)
    - [HOC](#hoc)
  - [License](#license)

## Getting started
Using npm
```bash
$ npm i @ukorvl/react-on-screen
```
or yarn
```bash
yarn add @ukorvl/react-on-screen
```
or CDN
```html
<script src="https://unpkg.com/@ukorvl/react-on-screen"></script>
```

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
const List = ({isOnScreen, ref, ...restProps}: ListProps) => (
  <ul className={isOnScreen ? 'my-class' : ''} {...restProps}>
    <li>Something</li>
      {'...'}
  </ul>
)

export const ListWithOnScreen = WithOnScreen(List, {threshold: 0.5, margin: '4rem'});
```

## License

[MIT](http://opensource.org/licenses/MIT)
