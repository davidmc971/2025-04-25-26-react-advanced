import { useEffect, useRef } from "react";

/** @import { RefObject, HTMLDivElement } from "react" */

export default function UseRefPage() {
  /** @type RefObject<HTMLDivElement> */
  const ref = useRef();

  useEffect(() => {
    if (ref.current != null) {
      const div = ref.current;

      div.innerHTML = "Test";
    }
  }, []);

  return <div ref={ref}>useRef</div>;
}
