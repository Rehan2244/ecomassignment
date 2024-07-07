import React,{useState} from "react";
export const useDebounce = (callback:(...args:any[])=>void, delay:number|undefined) => {
    const [timer, setTimer] = useState<any>(null);
  
    return (...args:any) => {
      clearTimeout(timer);
      setTimer(setTimeout(() => {
        callback(...args);
      }, delay));
    };
  };