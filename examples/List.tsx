/**
 * Simple workarounf to apply styles to a list
 * when user scrolls to the bottom of the list.
 */

import React from "react";
import { useRef } from "react";
import { useOnScreen } from "../lib/useOnScreen";

type ListProps = {
  children: React.ReactNode;
};

export const List = ({ children }: ListProps) => {
  const ref = useRef(null);
  const { isOnScreen } = useOnScreen({ ref, margin: "100px" });

  return (
    <ul className={isOnScreen ? "some-effects" : "regular-list"}>
      {children}
      <li ref={ref} className="hidden-dummy" aria-hidden />
    </ul>
  );
};

export default List;
