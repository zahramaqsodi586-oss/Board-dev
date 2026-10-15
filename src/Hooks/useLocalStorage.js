import { useEffect, useState } from "react";


export function useLocalStorage(key, initialValue){

  const [value, setValue] = useState(() => {

    try {

      const storedValue = localStorage.getItem(key);

      return storedValue !== null
      ? JSON.parse(storedValue)
      : initialValue;
      
    } catch (error) {
      console.error(`Error reading localStorage key "${key}" :`, error);
      return initialValue;
    }
  })


//Save the latest values whenever the date is changed
useEffect(() => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage key "${key}" :`, error);
  }
}, [key, value]);

return [value, setValue];
}