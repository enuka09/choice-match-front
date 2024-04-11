import React, { useState } from "react";
import * as styles from "./styles";
import {
  SearchRounded,
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  PersonOutlineOutlined,
  Menu,
  Close,
  ExpandLess,
  HomeRounded,
  ShoppingCart,
  Favorite,
  PersonRounded,
} from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import Logo from "../assests/logo/main_logo.png";
import { Link } from "react-router-dom";
import { headerLinks } from "./data/navBarLinks";
import { IMainMenu } from "./types";
import { Dropdown, useCart } from "../components";
import Home from "../pages/home";
import UserLogin from "../pages/auth/login";
import CartDrawer from "../pages/shoppingCart";

const generatePath = (title: string): string => {
  const link = headerLinks.find(item => item.title === title);
  return link ? link.navigation : "/";
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState<IMainMenu | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleNavMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = (subMenu: IMainMenu) => {
    setOpenSubMenu(openSubMenu === subMenu ? null : subMenu);
  };

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Top Header */}
      <div className={styles.topHeader.container}>
        <p>
          Shop, Smile, Repeat. Discover your style with AI-Powered Fashion! Enjoy free delivery on orders over LKR
          7500/-
        </p>
      </div>
      {/* Top Header ends here ... */}

      {/* Main Header */}
      <div className={styles.mainHeader.headerNavbarContainer}>
        <div className={styles.mainHeader.container}>
          <div className={styles.mainHeader.logoContainer}>
            <Link to="/">
              <img src={Logo} alt="Logo" className={styles.mainHeader.logo} />
            </Link>
          </div>
          <nav className={styles.mainHeader.searchOuter}>
            <div className={styles.mainHeader.searchInner}>
              <div className={styles.mainHeader.searchInput}>
                <input
                  type="text"
                  placeholder="Search for the perfect outfit here..."
                  className={styles.mainHeader.searchInputField}
                />
                <button className={styles.mainHeader.searchButton}>
                  <SearchRounded />
                </button>
              </div>
            </div>
          </nav>
          <div className={styles.mainHeader.iconsContainer}>
            {cartItems.length > 0 ? (
              <Badge badgeContent={cartItems.length} color="primary">
                <button className={styles.mainHeader.icon} title="Cart" onClick={handleCartClick}>
                  <ShoppingCartOutlined />
                </button>
              </Badge>
            ) : (
              <button className={styles.mainHeader.icon} title="Cart" onClick={handleCartClick}>
                <ShoppingCartOutlined />
              </button>
            )}
            <button className={styles.mainHeader.icon} title="Wishlist">
              <FavoriteBorderOutlined />
            </button>
            <button className={styles.mainHeader.icon} title="Profile" onClick={handleLoginClick}>
              <PersonOutlineOutlined />
            </button>
            <button className={styles.mainHeader.trackOrderBtn}>Track My Order</button>
            <div className={styles.mainHeader.mobileMenuIconContainer} title="menu" onClick={toggleNavMenu}>
              <Menu fontSize="large" className={styles.mainHeader.mobileMenuIcon} />
            </div>
          </div>
        </div>
        {/* Main Header ends here */}

        {/* Navbar */}
        <nav className={styles.navbar.outer}>
          <div className={styles.navbar.inner}>
            {headerLinks.map((link, index) => (
              <React.Fragment key={index}>
                {link.subLinks ? (
                  <Dropdown
                    trigger={<Link to={generatePath(link.title)}>{link.title}</Link>}
                    options={link.subLinks.map(subLink => subLink.title)}
                  />
                ) : (
                  <Link
                    to={generatePath(link.title)}
                    className={link.isRecommendationButton ? styles.navbar.recommendationBtn : ""}
                  >
                    {link.title}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
      {/* Navbar ends here */}

      {/* Top Navbar - Mobile View */}
      <nav
        className={`fixed left-0 top-0 h-screen w-full bg-primary-700 text-white lg:hidden ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} z-50 overflow-hidden transition-transform duration-300 ease-in-out`}
      >
        <div className={styles.topNavbarMobile.container}>
          <div className={styles.topNavbarMobile.navHeader}>
            <div className={styles.topNavbarMobile.menuIconContainer}>
              <div>
                <span className={styles.topNavbarMobile.menuText}>menu</span>
              </div>
              <div className={styles.topNavbarMobile.closeBtn} onClick={toggleNavMenu}>
                <Close />
              </div>
            </div>
            <div className={styles.topNavbarMobile.subMenuContainer} />
          </div>
          <div className={styles.topNavbarMobile.navLinksContainer}>
            {headerLinks.map((link, index) => (
              <div key={index}>
                <div className={styles.topNavbarMobile.linkContainer}>
                  <Link
                    to={link.navigation}
                    className={styles.topNavbarMobile.link}
                    onClick={() => {
                      toggleNavMenu();
                      toggleSubMenu(link);
                    }}
                  >
                    <span>{link.title}</span>
                  </Link>
                  {link.subLinks && (
                    <div
                      className={`h-[5px] transform duration-300 ${openSubMenu === link ? "rotate-0" : "rotate-180"}`}
                      onClick={() => toggleSubMenu(link)}
                    >
                      <ExpandLess fontSize="small" className="text-white" />
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
                      <div key={subIndex} className={styles.topNavbarMobile.subLinkContainer}>
                        <div className={styles.topNavbarMobile.subLink}>
                          <span className={styles.topNavbarMobile.subLinkDot}></span>
                          <span className={styles.topNavbarMobile.subLinkLine}></span>
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
            {headerLinks[0]?.isRecommendationButton && (
              <Link to={headerLinks[0].navigation}>
                <button className={styles.topNavbarMobile.recommendationButton}>AI-Fashion Recommender</button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      {/* Top Navbar - Mobile View ends here */}

      {/* Bottom Navbar - Mobile View */}
      <div className={styles.bottomNavbarMobile.outer}>
        <div className={styles.bottomNavbarMobile.inner}>
          <button className="mx-2">
            <SearchRounded />
          </button>
          <button onClick={handleLoginClick}>
            <PersonRounded />
          </button>
          <button className={styles.bottomNavbarMobile.homeBtnContainer} onClick={Home}>
            <HomeRounded style={{ fontSize: "30px" }} />
          </button>
          {cartItems.length > 0 ? (
            <Badge badgeContent={cartItems.length} color="primary">
              <button className={styles.bottomNavbarMobile.cartBtn} onClick={handleCartClick}>
                <ShoppingCart />
              </button>
            </Badge>
          ) : (
            <button className={styles.bottomNavbarMobile.cartBtn} onClick={handleCartClick}>
              <ShoppingCart />
            </button>
          )}
          <button className="mx-2">
            <Favorite />
          </button>
        </div>
      </div>
      {/* Bottom Navbar Mobile View ends here */}

      {/* Drawer Toggles */}
      <UserLogin open={isLoginOpen} onClose={handleCloseLogin} />
      <CartDrawer openCart={isCartOpen} onCartClose={handleCartClose} />
    </>
  );
};

export default Header;
