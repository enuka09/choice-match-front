/* header */
export const topHeader = {
  container:
    "relative z-10 flex flex-col items-center justify-center space-y-1 bg-primary-300 p-3 py-2 text-center text-xs font-normal tracking-widest text-white sm:text-xs md:flex-row md:space-x-1 md:space-y-0 lg:text-sm",
};

export const mainHeader = {
  headerNavbarContainer: "sticky left-0 top-0 z-10 shadow-lg lg:shadow-none",
  container:
    "header relative z-10 flex h-16 w-full items-center justify-between space-x-6 bg-primary-700 sm-max:px-3 md:px-8 lg:h-90 lg:px-20",
  logoContainer: "flex items-center space-x-3",
  logo: "h-auto xs:max-w-44 lg:max-w-60",
  searchOuter: "hidden items-center lg:flex",
  searchInner: "menu_container relative",
  searchInput: "flex items-center",
  searchInputField:
    "h-10 rounded-bl-sm rounded-tl-sm border px-4 py-2 font-medium focus:outline-none lg:w-64 cs-1300:w-96",
  searchButton:
    "h-10 rounded-br-sm rounded-tr-sm bg-primary-100 px-5 py-2 font-bold text-white transition duration-300 ease-in-out hover:bg-primary-300",
  iconsContainer: "flex items-center text-sm font-semibold capitalize tracking-wide lg:space-x-4 cs-1300:space-x-8",
  icon: "hidden cursor-pointer lg:block text-white",
  trackOrderBtn: "hidden rounded-sm bg-white text-primary-700 md:px-2 md:py-1 md:text-sm lg:block",
  mobileMenuIconContainer: "flex flex-col items-center justify-center lg:hidden",
  mobileMenuIcon: "block rounded-md border-2 border-white text-white lg:hidden",
};

export const navbar = {
  outer: "relative hidden bg-neutral-500 py-2 text-sm font-semibold text-neutral-300 shadow-lg lg:block lg:text-base",
  inner: "mx-20 flex items-center space-x-10 py-1 capitalize xl:space-x-20",
  recommendationBtn:
    "rounded-sm px-3 py-2 text-primary-700 outline outline-primary-300 transition duration-300 ease-in-out hover:bg-primary-300 hover:text-white",
};

export const topNavbarMobile = {
  container: "h-full overflow-auto",
  navHeader: "sticky top-0 z-40",
  menuIconContainer: "flex items-center justify-between space-x-6 px-6 pt-3",
  menuText: "text-xl font-bold capitalize tracking-widest",
  closeBtn: "cursor-pointer text-white",
  subMenuContainer: "my-3 h-px border-none bg-neutral-500 opacity-25",
  navLinksContainer: "mx-8 mb-10 flex flex-col md:mx-10",
  linkContainer: "mt-6 flex items-center justify-between text-sm font-medium capitalize tracking-widest",
  link: "flex items-center space-x-3",
  subLinkContainer: "flex items-center justify-between py-3 text-sm capitalize tracking-wide",
  subLink: "flex items-center",
  subLinkDot: "inline-block h-0.5 w-8 bg-neutral-500 opacity-25",
  subLinkLine: "inline-block h-1.5 w-1.5 bg-neutral-500 opacity-25",
  recommendationButton:
    "text-primary-white mt-10 rounded-sm bg-primary-100 px-3 py-2 text-sm font-medium capitalize tracking-widest",
};

export const bottomNavbarMobile = {
  outer: "fixed bottom-0 flex h-16 w-full bg-primary-300 py-2 lg:hidden z-40",
  inner: "flex w-full items-center justify-between text-white sm-max:px-3 md:px-24",
  homeBtnContainer: "mb-10 flex h-9 w-9 items-center justify-center rounded-full border-2 bg-primary-300 p-7",
  cartBtn: "mx-2 border-none bg-transparent",
};

/* footer */
export const footer = {
  outer: "bg-primary-700 text-white",
  inner:
    "mx-auto flex flex-col space-y-10 py-10 sm-max:px-3 md:px-8 lg:flex-row lg:justify-between lg:space-y-0 lg:px-20",
  logo: "h-auto md-max:max-w-56 lg:max-w-60",
  paragraph: "mb-2 mt-4 text-sm font-normal leading-7 sm:w-full md:max-w-lg lg:max-w-xs",
  title: "mb-5 text-base font-semibold uppercase",
  text: "mb-2 text-sm font-normal",
  linkContainer: "flex flex-col space-y-4",
  link: "hover:underline",
  iconContainer: "flex items-center space-x-4 pt-2",
  copyrightContainer: "flex items-center justify-center border-t p-3 text-sm",
  copyrightText: "text-center",
};
