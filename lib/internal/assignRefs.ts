import { MutableRefObject, Ref } from 'react';

/**
 * Takes both ref objects and ref functions and returns assigned ref function.
 * @param refs Refs to assign.
 * @returns Assigned ref.
 */
export const assignRefs = <T>(...refs: Ref<T | null>[]) => {
  return (node: T | null) => {
    refs.forEach((r) => {
      if (typeof r === 'function') {
        r(node);
      } else if (r) {
        (r as MutableRefObject<T | null>).current = node;
      }
    });
  };
};
