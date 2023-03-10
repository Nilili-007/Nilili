const useDebounce = (callback: any, delay: number) => {
  let timer: any;
  return (...args: string[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
    console.log("callback", callback);
    console.log("timer", timer);
  };
};

export default useDebounce;
