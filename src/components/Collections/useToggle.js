import { useState, useCallback } from "react";

// Toggles between true or false
const useToggle = (initialValue = false) =>{
  const [toggle, setToggle] = useState(initialValue);

  return [toggle, useCallback(() => setToggle(status => !status), [])];
}

export default useToggle;