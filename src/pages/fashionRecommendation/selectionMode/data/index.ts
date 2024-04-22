import indoorPartyImage from "../../../../assests/fashion/indoor_party.jpg";
import outdoorPartyImage from "../../../../assests/fashion/outdoor_party.jpg";
import weddingImage from "../../../../assests/fashion/wedding.jpg";
import funeralImage from "../../../../assests/fashion/funeral.jpg";
import generalImage from "../../../../assests/fashion/general.jpg";

// Age Data
export const ageOptions = [
  { label: "Below 21", value: "A" },
  { label: "21-30", value: "B" },
  { label: "31-40", value: "C" },
  { label: "Above 40", value: "D" },
];

// Skin Color Data
export const skinColorOptions = [
  { label: "Brown", value: "brown" },
  { label: "Dark", value: "dark" },
  { label: "White", value: "white" },
  { label: "Others", value: "others" },
];

// Occassion Data
export const eventOptions = [
  { label: "Indoor Party", value: "Indoor party", image: indoorPartyImage },
  { label: "Outdoor Party", value: "Outdoor party", image: outdoorPartyImage },
  { label: "Wedding", value: "wedding", image: weddingImage },
  { label: "Funeral", value: "Funeral", image: funeralImage },
  { label: "General", value: "General", image: generalImage },
];

// Size Data
export const sizeOptions = [
  { label: "Small", value: "small" },
  { label: "Medium", value: "medium" },
  { label: "Large", value: "Large" },
  { label: "XL", value: "XL" },
  { label: "2XL", value: "2XL" },
];

// Climate Data
export const climateOptions = [
  { label: "Normal", value: "Normal" },
  { label: "Sunny", value: "Sunny" },
  { label: "Rainy", value: "Rainy" },
];

// Color Data
export const colors = [
  { label: "Black", value: "Black" },
  { label: "Blue", value: "Blue" },
  { label: "White", value: "White" },
  { label: "Red", value: "Red" },
  { label: "Green", value: "Green" },
  { label: "Pink", value: "Pink" },
  { label: "Purple", value: "Purple" },
  { label: "Yellow", value: "Yellow" },
  { label: "Grey", value: "Grey" },
  { label: "Others", value: "Others" },
];

// Budget Range Data
export const budegtOptions = [
  { label: "Less than 2,000 LKR", value: "A" },
  { label: "2,000 LKR - 5,000 LKR", value: "B" },
  { label: "More than 5,000 LKR", value: "C" },
];
