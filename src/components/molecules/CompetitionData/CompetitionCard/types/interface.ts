export interface ICompetitionCard {
  imageUrl: string;
  title: string;
  description: string;
  additionalDetails: JSX.Element;
  competitionId: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void; // Accepts event parameter
}
