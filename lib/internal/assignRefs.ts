import { MutableRefObject, Ref } from "react";

/**
 * Takes both ref objects and ref functions and returns assigned ref function.
 * @param refs Refs to assign.
 * @returns Assigned ref.
 */
export const assignRefs = <T>(...refs: Ref<T | null>[]) => {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<T | null>).current = node;
      }
    }
  };
};
