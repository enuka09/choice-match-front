export interface ISubMenu {
  title: string;
  navigation: string;
}

export interface IMainMenu {
  title: string;
  navigation: string;
  subLinks?: ISubMenu[];
}
