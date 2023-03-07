const Footer = () => {
  return (
    <footer className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="border-t border-slate-900/5 py-10">
        <div className="text-center title3">NILILI</div>
        <p className="mt-5 text-center text-sm leading-6 text-gray-500">
          © 2023 007 All rights reserved.
        </p>
        <div className="mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-gray-400">
          <a
            className="hover:text-white"
            href="https://forms.gle/EgTg3Fu4Ecd3ezt37"
          >
            Customer Service Center
          </a>
          <div className="h-4 w-px bg-gray-100"></div>
          <a
            className="hover:text-white"
            href="https://github.com/Nilili-007/Nilili"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
