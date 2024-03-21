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
    navigation: "/new-arrivals",
  },
  {
    title: "Deals",
    navigation: "/deals",
  },
  {
    title: "Competitions",
    navigation: "/outfit-competition",
  },
  {
    title: "AI-Fashion Recommender",
    navigation: "/fashion-recommender",
    isRecommendationButton: true,
  },
];
