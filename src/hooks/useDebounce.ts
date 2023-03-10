const useDebounce = (callback: any, delay: number) => {
  let timer: any;
  return (...args: string[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export default useDebounce;
