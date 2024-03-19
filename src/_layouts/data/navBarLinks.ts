import { IMainMenu } from "../types";

export const headerLinks: IMainMenu[] = [
  {
    title: "Home",
    navigation: "/",
  },
  {
    title: "Women",
    navigation: "/",
    subLinks: [
      {
        title: "Casual Wear",
        navigation: "/",
      },
      {
        title: "Formal Wear",
        navigation: "/",
      },
      {
        title: "Ethnic Wear",
        navigation: "/",
      },
    ],
  },
  {
    title: "Men",
    navigation: "/",
    subLinks: [
      {
        title: "Casual Wear",
        navigation: "/",
      },
      {
        title: "Formal Wear",
        navigation: "/",
      },
      {
        title: "Footwear",
        navigation: "/",
      },
    ],
  },
  {
    title: "New-In",
    navigation: "/",
  },
  {
    title: "Deals",
    navigation: "/",
  },
  {
    title: "Competitions",
    navigation: "/",
  },
];
