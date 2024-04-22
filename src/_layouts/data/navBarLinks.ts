import { IMainMenu } from "../types";

export const headerLinks: IMainMenu[] = [
  {
    title: "Home",
    navigation: "/",
  },
  {
    title: "Women",
    navigation: "/women",
    subLinks: [
      {
        title: "Casual Wear",
        navigation: "/women/casual-wear",
      },
      {
        title: "Formal Wear",
        navigation: "/women/formal-wear",
      },
      {
        title: "Ethnic Wear",
        navigation: "/women/ethnic-wear",
      },
    ],
  },
  {
    title: "Men",
    navigation: "/men",
    subLinks: [
      {
        title: "Casual Wear",
        navigation: "/men/casual-wear",
      },
      {
        title: "Formal Wear",
        navigation: "/men/formal-wear",
      },
      {
        title: "Footwear",
        navigation: "/men/footwear",
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
