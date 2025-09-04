import { useRef } from "react";

function Appo() {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current.focus(); // directly focuses the input
  };

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus the input</button>
    </>
  );
}
export default Appo;
