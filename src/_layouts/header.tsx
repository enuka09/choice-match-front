import React, { useState } from "react";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
  HeartIcon,
  ShoppingCartIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import {
  MagnifyingGlassCircleIcon,
  HomeIcon,
  UserIcon as SolidUserIcon,
  HeartIcon as SolidHeartIcon,
  ShoppingCartIcon as SolidShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Logo from "../assests/main_logo.png";
import { Link } from "react-router-dom";
import { headerLinks } from "./data/navBarLinks";
import { IMainMenu } from "./types";
import Dropdown from "../components/molecules/Dropdown";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleNavMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [openSubMenu, setOpenSubMenu] = useState<IMainMenu | null>(null);
  const toggleSubMenu = (subMenu: IMainMenu) => {
    setOpenSubMenu(openSubMenu === subMenu ? null : subMenu);
  };

  return (
    <>
      {/* Top Header */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-1 bg-primary-300 p-3 py-2 text-center text-xs font-normal tracking-widest text-white sm:text-xs md:flex-row md:space-x-1 md:space-y-0 lg:text-base">
        <p>
          Shop, Smile, Repeat. Discover your style with AI-Powered Fashion! Enjoy free delivery on orders over LKR
          7500/-
        </p>
      </div>
      {/* Top Header ends here ... */}

      {/* Main Header */}
      <div className="sticky left-0 top-0 z-40 shadow-lg lg:shadow-none">
        <div className="header relative z-10 flex h-16 w-full items-center justify-between space-x-6 bg-primary-700 sm-max:px-3 md:px-8 lg:h-90 lg:px-20">
          <div className="flex items-center space-x-3">
            <a href="/" className="logo">
              <img src={Logo} alt="Logo" className="h-auto xs:max-w-44 lg:max-w-60" />
            </a>
          </div>
          <nav className="hidden items-center lg:flex">
            <div className="menu_container relative">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search for the perfect outfit here..."
                  className="h-10 rounded-bl-sm rounded-tl-sm border px-4 py-2 font-medium focus:outline-none lg:w-64 cs-1300:w-96"
                />
                <button className="h-10 rounded-br-sm rounded-tr-sm bg-primary-100 px-5 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-primary-300">
                  <MagnifyingGlassIcon className="h-6 w-6" />
                </button>
              </div>
            </div>
          </nav>
          <div className="flex items-center text-sm font-semibold capitalize tracking-wide lg:space-x-4 cs-1300:space-x-8">
            <div className="hidden cursor-pointer lg:block" title="Cart" aria-label="Cart">
              <ShoppingCartIcon className="h-6 w-6 text-white" />
            </div>
            <div className="hidden cursor-pointer lg:block" title="Wishlist">
              <HeartIcon className="h-6 w-6 text-white" />
            </div>
            <div className="hidden cursor-pointer lg:block" title="Profile">
              <UserIcon className="h-6 w-6 text-white" />
            </div>
            <button className="hidden rounded-sm bg-white text-primary-700 md:px-2 md:py-1 md:text-sm lg:block">
              Track My Order
            </button>

            {/* Mobile Menu */}
            <div className="flex flex-col items-center justify-center lg:hidden" title="name" onClick={toggleNavMenu}>
              <Bars3Icon className="block h-8 w-8 rounded-md border-2 border-white text-white lg:hidden" />
            </div>
          </div>
        </div>
        {/* Main Header ends here */}

        {/* Navbar */}
        <nav className="relative z-10 hidden bg-neutral-500 py-2 text-sm font-semibold text-neutral-300 shadow-lg lg:block lg:text-base">
          <div className="mx-20 flex items-center space-x-10 py-1 xl:space-x-20">
            <Link to="/">Home</Link>
            {/* <div className="dropdown">
              <button className="dropbtn">Women</button>
              <div className="dropdown-content">
               
              </div>
            </div> */}
            <Dropdown
              trigger={<Link to="">Women</Link>} // Use the Link component as the trigger
              options={["Option 1", "Option 2", "Option 3"]} // Options for the dropdown menu
            />

            <div className="dropdown">
              <button className="dropbtn">Men</button>
              <div className="dropdown-content">
                {/* <Link to="">Category 4</Link>
                <Link to="">Category 5</Link>
                <Link to="">Category 6</Link> */}
              </div>
            </div>
            <div className="dropdown">
              <button className="dropbtn">Kids</button>
              <div className="dropdown-content">
                {/* <Link to="">Category 1</Link>
                <Link to="">Category 2</Link>
                <Link to="">Category 3</Link> */}
              </div>
            </div>
            <Link to="">New-In</Link>
            <Link to="">Deals</Link>
            <Link to="">Competitions</Link>
            <button className="rounded-sm px-3 py-2 text-primary-700 outline outline-primary-300 transition duration-300 ease-in-out hover:bg-primary-300 hover:text-white">
              AI-Fashion Recommender
            </button>
          </div>
        </nav>
      </div>
      {/* Navbar ends here */}

      {/* Top Navbar Mobile View */}
      <nav
        className={`fixed left-0 top-0 h-screen w-full bg-primary-700 text-white lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-50 overflow-hidden transition-transform duration-300 ease-in-out`}
      >
        <div className="h-full overflow-auto">
          <div className="sticky top-0 z-40">
            <div className="flex items-center justify-between space-x-6 px-6 pt-3">
              <div>
                <span className="text-xl font-bold capitalize tracking-widest">menu</span>
              </div>
              <div className="cursor-pointer" onClick={toggleNavMenu}>
                <XMarkIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="my-3 h-px border-none bg-neutral-500 opacity-25" />
          </div>

          <div className="mx-8 mb-10 flex flex-col md:mx-10">
            {headerLinks.map((link, index) => (
              <div key={index}>
                <div className="mt-6 flex items-center justify-between text-sm font-medium capitalize tracking-widest">
                  <Link
                    to={link.navigation}
                    className="flex items-center space-x-3"
                    onClick={() => toggleSubMenu(link)}
                  >
                    <span>{link.title}</span>
                  </Link>
                  {link.subLinks && (
                    <div
                      className={`h-[5px] transform duration-300 ${openSubMenu === link ? "rotate-0" : "rotate-180"}`}
                      onClick={() => toggleSubMenu(link)}
                    >
                      <ChevronUpIcon className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                {link.subLinks && (
                  <div
                    className={`ml-4 border-l-2 border-neutral-500 border-opacity-25 ${
                      openSubMenu === link ? "" : "hidden"
                    }`}
                  >
                    {link.subLinks.map((subLink, subIndex) => (
                      <div
                        key={subIndex}
                        className="flex items-center justify-between py-3 text-sm capitalize tracking-wide"
                      >
                        <div className="flex items-center">
                          <span className="inline-block h-0.5 w-8 bg-neutral-500 opacity-25"></span>
                          <span className="inline-block h-1.5 w-1.5 bg-neutral-500 opacity-25"></span>
                          <Link to={subLink.navigation} className="pl-2">
                            {subLink.title}
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="text-primary-white mt-10 rounded-sm bg-primary-100 px-1 py-2 text-sm font-medium capitalize tracking-widest">
              AI-Fashion Recommender
            </button>
          </div>
        </div>
      </nav>
      {/* Top Navbar Mobile View ends here */}

      {/* Bottom Navbar Mobile View */}
      <div className=" fixed bottom-0 flex h-16 w-full bg-primary-300 py-2 lg:hidden">
        <div className="flex w-full items-center justify-between text-white sm-max:px-3 md:px-24">
          <Link to={""} className="mx-2">
            <MagnifyingGlassCircleIcon className="h-6 w-6" />
          </Link>
          <Link to={""}>
            <SolidUserIcon className="h-6 w-6" />
          </Link>
          <div className="mb-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-primary-300 p-7">
            <Link to={""}>
              <HomeIcon className="h-6 w-6" />
            </Link>
          </div>

          <button className="mx-2 border-none bg-transparent">
            {/* <div className="relative inline-block"> */}
            <SolidShoppingCartIcon className="h-6 w-6" />
            {/* <span className="cart-badge absolute right-0 top-0 rounded-full bg-red-500 px-1 text-white">5</span> */}
            {/* </div> */}
          </button>
          <Link to={""} className="mx-2">
            <SolidHeartIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
      {/* Bottom Navbar Mobile View ends here */}
    </>
  );
};

export default Header;
