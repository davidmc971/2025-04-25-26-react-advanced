import { useEffect, useState } from "react";

/**
 * @import { MouseEventHandler } from "react"
 */

export default function UseEffectPage() {
  const [lastClickLocation, setLastClickLocation] = useState();

  const [count, setCount] = useState(0);

  useEffect(() => {
    /** @type MouseEventHandler */
    const listener = (e) => {
      setLastClickLocation([e.pageX, e.pageY]);
    };

    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 500);

    return () => {
      clearInterval(intervalId);
    }
  }, [])

  return (
    <div>
      <p>Last click location</p>
      <code>
        {!!lastClickLocation &&
          `${lastClickLocation[0]}, ${lastClickLocation[1]}`}
      </code>
      <br />
      <p>Count: {count}</p>
    </div>
  );
}
