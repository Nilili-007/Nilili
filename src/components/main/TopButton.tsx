const TopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      className="bg-black text-white fixed bottom-[50px] right-[50px] rounded-full p-5 text-xl font-bold"
      onClick={scrollToTop}
    >
      TOP
    </button>
  );
};

export default TopButton;
