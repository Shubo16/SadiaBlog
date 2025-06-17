function Footer() {
  const date = new Date();
  const getCurrentYear = date.getFullYear();

  return (
    <div className="w-full">
      <div className="border-t-4 border-black dark:border-jadeGreen h-auto py-4 px-4 w-full flex justify-between lg:gap-10 items-center font-poppins bg-white dark:bg-gray-900">
        <div className="flex justify-evenly w-auto gap-5 text-xs md:text-lg text-gray-900 dark:text-gray-300">
          <a href="#">
            <h4 className="font-light hover:text-jadeGreen dark:hover:text-jadeGreen">
              LinkedIn
            </h4>
          </a>
          <a href="#">
            <h4 className="font-light hover:text-jadeGreen dark:hover:text-jadeGreen">
              Instagram
            </h4>
          </a>
          <a
            href="mailto:contact@sadiasblog.com"
            className="font-light hover:text-jadeGreen dark:hover:text-jadeGreen"
          >
            Contact Me
          </a>
        </div>
        <div className="text-center capitalize text-xs md:text-lg text-gray-900 dark:text-gray-300">
          <h4>Sadia's Blog &copy;</h4>
          <p>{getCurrentYear}</p>
          <p>Designed by Shubo</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;