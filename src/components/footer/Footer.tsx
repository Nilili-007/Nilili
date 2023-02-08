const Footer = () => {
  return (
    <footer className="text-gray-700 body-font">
      <div className="w-full bg-black shadow">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <a href="/">
                <h2 className="text-2xl text-white">Nilili</h2>
              </a>
            </div>
          </div>
          <div>
            <div className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <div className=" text-white border-white hover:border-transparent hover:text-teal-500  mt-4 lg:mt-0">
                family site
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
