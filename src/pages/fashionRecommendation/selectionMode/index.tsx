import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToggleButton, ToggleButtonGroup, SelectChangeEvent } from "@mui/material";
import { SwapHoriz, EmojiEmotions, LightMode, DarkMode } from "@mui/icons-material";
import * as theme from "../../../theme";
import axios from "../../../configs";
import { ThemedModal, ThemedToggleSwitch, CustomSelect } from "../../../components";
import { FormData, PredictionPair } from "../types";
import { ageOptions, skinColorOptions, eventOptions, sizeOptions, climateOptions, colors, budegtOptions } from "./data";
import Lottie from "react-lottie";
import loader from "../../../assests/other/fashion_loader.json";
import main from "../../../assests/fashion/main_animation.json";

async function getDressPrediction(data: FormData): Promise<PredictionPair[]> {
  const response = await axios.post<PredictionPair[]>("/predict", data);
  // console.log(response);
  return response.data;
}

const SelectionBasedRecommendations: React.FC = () => {
  const navigate = useNavigate();
  const storedGender = localStorage.getItem("Gender") || "Unspecified";
  const [showModal, setShowModal] = useState(true);
  const [gender] = useState(storedGender);
  const [toggleGender, setToggleGender] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    Age: "",
    "Skin color": "",
    FashionType: "",
    Event: "",
    Size: "",
    Climate: "",
    ColorMode: "",
    Gender: gender,
    Color: "",
    BudgetRange: "",
  });
  const [dressImages, setDressImages] = useState<{ top: string; bottom: string; key: string }[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [minLoadingTimeMet, setMinLoadingTimeMet] = useState(false);

  // function handleInputChange(event: ChangeEvent<HTMLSelectElement>) {
  //   const { name, value } = event.target;
  //   let adjustedName =
  //     name.charAt(0).toUpperCase() +
  //     name
  //       .slice(1)
  //       .replace(/([A-Z])/g, " $1")
  //       .trim();
  //   setFormData(prevState => ({ ...prevState, [adjustedName]: value }));
  // }

  const handleInputChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  function handleButtonClick() {
    setButtonClicked(true);
    setIsLoading(true);
    setMinLoadingTimeMet(false);
    setTimeout(() => setMinLoadingTimeMet(true), 3000);
    console.log("Final form data being sent to backend:", formData);
    getDressPrediction(formData)
      .then(prediction => {
        const images = prediction.map(pair => ({
          top: `http://127.0.0.1:5000/images/Top_Dress/${pair.top_id}.jpg?${new Date().getTime()}`,
          bottom: `http://127.0.0.1:5000/images/Bottom_Dress/${pair.bottom_id}.jpg?${new Date().getTime()}`,
          key: `${pair.top_id}-${pair.bottom_id}`,
        }));
        setDressImages(images);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error.message);
        setIsLoading(false);
      });
  }

  const handleForMe = () => {
    setFormData(prev => ({ ...prev, Gender: storedGender }));
    setShowModal(false);
  };

  const handleNotForMe = () => {
    const oppositeGender = storedGender === "Male" ? "Female" : "Male";
    setFormData(prev => ({ ...prev, Gender: oppositeGender }));
    setShowModal(false);
  };

  useEffect(() => {
    const oppositeGender = storedGender === "Male" ? "Female" : "Male";
    setFormData(prev => ({ ...prev, Gender: toggleGender ? oppositeGender : storedGender }));
  }, [toggleGender, storedGender]);

  useEffect(() => {
    setFormData(prev => ({ ...prev, Color: selectedColor }));
  }, [selectedColor]);

  const handleFreestyleMode = () => {
    navigate("/fashion-recommender/freestyle-mode", { state: { gender } });
  };

  const handleFashionTypeChange = (event: React.MouseEvent<HTMLElement>, newFashionType: string | null): void => {
    if (newFashionType !== null) {
      setFormData(prevFormData => ({ ...prevFormData, FashionType: newFashionType }));
    }
  };

  const handleColorModeChange = (event: React.MouseEvent<HTMLElement>, newMode: string | null) => {
    if (newMode !== null) {
      setFormData(prevFormData => ({ ...prevFormData, ColorMode: newMode }));
    }
  };

  const handleColorChange = (event: React.MouseEvent<HTMLElement>, newColor: string) => {
    if (newColor !== null) {
      setSelectedColor(newColor);
    }
  };

  if (showModal) {
    return (
      <>
        <ThemedModal
          open={showModal}
          title="Pick Your Style Adventure !"
          description="Seeking styles for yourself? Hit 'FOR MYSELF'. Exploring styles for the opposite gender? Choose 'FOR OPPOSITE SEX' and see what we find."
          actions={[
            {
              label: "For Myself",
              onClick: handleForMe,
              icon: <EmojiEmotions sx={{ fontSize: "50px" }} />,
              color: "#0099A6",
              sx: {
                flex: 1,
                bgcolor: "#183548",
                "&:hover": {
                  bgcolor: "#0099A6",
                },
              },
            },
            {
              label: "For Opposite Sex",
              onClick: handleNotForMe,
              icon: <SwapHoriz sx={{ fontSize: "50px" }} />,
              sx: {
                border: "1px solid white",
                flex: 1,
                bgcolor: "inherit",
                "&:hover": {
                  bgcolor: "#0099A6",
                  border: "none",
                },
              },
            },
          ]}
        />
      </>
    );
  }
  return (
    <>
      <div>
        <img
          src="https://3dlook.ai/wp-content/uploads/2023/06/artificial-intelligence-in-fashion.jpg"
          alt="AI-Banner"
        />
      </div>

      <div className="sm-max:px-4 sm-max:py-10 md:px-8 md:py-10 lg:px-20 lg:py-12">
        <div>
          <h1 className="font-serif text-[2.5rem] font-medium sm-max:text-2xl">Welcome to Choice Match</h1>
          <h1 className="mb-6 font-mono text-[3.5rem] font-extrabold uppercase text-primary-700 sm-max:text-2xl">
            personalized fashion recommender
          </h1>
          <p className="mb-14 font-mono text-xl font-medium">
            Dive into a world where style meets precision. Our AI-driven fashion assistant is dedicated to enhancing
            your wardrobe with selections that resonate deeply with your personal style. Engage with Choice Match and
            experience the ease of finding outfits that not only meet your tastes but also elevate your fashion game.
            Tell us a little about your fashion taste, and let Choice Match work its magic to recommend outfits that
            you'll love.
          </p>
          <div className="mb-6 grid grid-cols-2 rounded-lg bg-white shadow-lg sm-max:grid-cols-1">
            <div className="flex-1">
              <Lottie
                options={{
                  animationData: main,
                  loop: true,
                  autoplay: true,
                }}
                height={450}
              />
            </div>
            <div className="flex flex-1 flex-col justify-center bg-neutral-500 px-8 py-6">
              <h1 className="mb-8 font-mono text-4xl font-extrabold text-primary-300 sm-max:text-2xl">
                How to get started !
              </h1>
              <div className="font-serif text-lg">
                <p className="mb-4">
                  <span className="font-semibold">1. Choose Your Preferences : </span>Select your style preferences and
                  typical fashion choices from various options that define your needs.
                </p>
                <p className="mb-4">
                  <span className="font-semibold">2. Receive Personalized Recommendations : </span>Based on your
                  selections, our AI will recommend outfits that match your style and requirements. You can trust us to
                  find the perfect match for any occasion!
                </p>
                <p>
                  <span className="font-semibold">3. Explore and Experiment : </span>Feel free to refine your choices or
                  explore different styles. Every selection helps our system learn more about your tastes for even
                  better future recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section
        className={`lg:${theme.pageSectionPadding.lg} md:${theme.pageSectionPadding.md} bg-neutral-500 sm-max:pb-14 sm-max:pt-8`}
      >
        <h1 className="mb-6 font-serif text-[4rem] font-bold uppercase sm-max:text-2xl">Let's Go ...</h1>
        <div className="mb-10 flex items-center justify-between font-semibold text-primary-700">
          <div className="ml-0 flex flex-col items-start space-x-0 pl-0">
            <span>Toggle if you want to change the Gender</span>
            <div className="ml-0 pl-0">
              <ThemedToggleSwitch
                checked={toggleGender}
                onChange={() => setToggleGender(t => !t)}
                name="genderToggle"
                label={toggleGender ? "For Opposite Sex" : "For Myself"}
                labelPlacement={"bottom"}
                textColor="#0099A6"
              />
            </div>
          </div>
          <div>
            <button onClick={handleFreestyleMode} className={`${theme.form.button} h-full`}>
              Try Freestyle Mode
            </button>
          </div>
        </div>

        <div className="mb-8">
          <CustomSelect
            label="How old are you?"
            value={formData.Age}
            onChange={handleInputChange}
            options={ageOptions}
            name="Age"
          />
        </div>
        <div className="mb-8">
          <CustomSelect
            label="What is your Skin Color?"
            value={formData["Skin color"]}
            onChange={handleInputChange}
            options={skinColorOptions}
            name="Skin color"
          />
        </div>
        <div className="mb-8">
          <div className="mb-2 font-semibold">What type of an outfit you are looking for?</div>
          <ToggleButtonGroup
            value={formData.FashionType}
            exclusive
            onChange={handleFashionTypeChange}
            aria-label="Fashion type"
          >
            <ToggleButton value="Simple cloth" aria-label="Simple Outfit">
              Simple Outfit
            </ToggleButton>
            <ToggleButton value="Formal cloth" aria-label="Formal Outfit">
              Formal Outfit
            </ToggleButton>
            <ToggleButton value="Professional cloth" aria-label="Professional Outfit">
              Professional Outfit
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div className="mb-8">
          <div className="mb-2 font-semibold">For which type of Occasion or Event are you looking?</div>
          <div className="grid grid-cols-5 gap-6">
            {eventOptions.map(event => (
              <div
                key={event.value}
                className={`flex max-w-sm cursor-pointer overflow-visible rounded-lg transition duration-300 ease-in-out 
                  ${
                    formData.Event === event.value
                      ? "scale-105 border-4 border-primary-700 bg-primary-700 text-white shadow-lg"
                      : "bg-white shadow-lg hover:bg-gray-100  hover:shadow-xl"
                  }`}
                onClick={() => {
                  if (formData.Event === event.value) {
                    setFormData({ ...formData, Event: "" });
                  } else {
                    setFormData({ ...formData, Event: event.value });
                  }
                }}
              >
                <img src={event.image} alt={event.label} className="h-auto w-32 rounded-l-lg object-cover" />
                <div className="flex w-full items-center pl-4 text-xl font-bold uppercase">{event.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-8">
          <CustomSelect
            label="What is your prefered Size?"
            value={formData.Size}
            onChange={handleInputChange}
            options={sizeOptions}
            name="Size"
          />
        </div>
        <div className="mb-8">
          <CustomSelect
            label="What's the weather/climate like where you'll be wearing this?"
            value={formData.Climate}
            onChange={handleInputChange}
            options={climateOptions}
            name="Climate"
          />
        </div>
        <div className="fashion-input">
          <div className="mb-2 font-semibold">Do you prefer Darker or Lighter shades?</div>
          <div className="mb-8">
            <ToggleButtonGroup
              color="primary"
              value={formData.ColorMode}
              exclusive
              onChange={handleColorModeChange}
              aria-label="Color mode"
            >
              <ToggleButton value="Dark">
                <DarkMode sx={{ mr: 2 }} />
                Dark
              </ToggleButton>
              <ToggleButton value="Light">
                <LightMode sx={{ mr: 2 }} />
                Light
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div className="mb-8">
          <div className="fashion-label mb-2 font-semibold">What primary color are you interested in?</div>
          <ToggleButtonGroup
            value={selectedColor}
            exclusive
            onChange={handleColorChange}
            aria-label="Color selection"
            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
          >
            {colors.map(color => (
              <ToggleButton
                key={color.value}
                value={color.value}
                sx={{
                  color: "white",
                  backgroundColor: selectedColor === color.value ? color.value.toLowerCase() : "#666",
                  "&:hover": {
                    backgroundColor: color.value.toLowerCase(),
                  },
                  width: "100px",
                }}
              >
                {color.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </div>
        <div className="mb-8">
          <CustomSelect
            label="What's your budget range?"
            value={formData.BudgetRange}
            onChange={handleInputChange}
            options={budegtOptions}
            name="BudgetRange"
          />
        </div>
        <div>
          <button onClick={handleButtonClick} disabled={isLoading} className={`${theme.form.button} py-4`}>
            {buttonClicked && (isLoading || !minLoadingTimeMet) ? "Processing ..." : "Make me Fabulous !"}
          </button>
        </div>
        {buttonClicked && (isLoading || !minLoadingTimeMet) ? (
          <div className="mt-10 flex items-center justify-center">
            <div className="loading-container relative flex h-[24rem] w-[24rem] overflow-hidden rounded-xl bg-primary-700 text-center shadow-xl">
              <Lottie
                options={{
                  animationData: loader,
                  loop: true,
                  autoplay: true,
                }}
                style={{ width: "100%", height: "100%" }}
              />
              <p className="absolute bottom-16 left-1 right-1 font-semibold text-primary-100">Magic in Progress ...</p>
            </div>
          </div>
        ) : (
          dressImages.length > 0 && (
            <div className="mt-10 shadow-md">
              <p className="mb-10 text-center text-3xl font-bold">-- Tailored Recommendations Just for You --</p>
              <div className="fashion-image grid grid-cols-3 gap-14 px-20 pb-20">
                {dressImages.map((dress, idx) => (
                  <div key={idx} className="fashion-pair overflow-hidden bg-white shadow-md">
                    <div className="bg-[#dfe0e1] p-2 text-center">
                      <p className="font-mono text-2xl font-bold uppercase text-primary-700">Choice {idx + 1}</p>
                    </div>

                    <div className="border-grey-100 grid grid-cols-4 items-center border-b-2 bg-white p-2">
                      <p className="text-center text-xl font-semibold">Top</p>
                      <img
                        src={dress.top}
                        className="col-span-3 h-auto w-full"
                        alt="Top Dress"
                        onError={e => {
                          e.currentTarget.src = "path_to_placeholder_image";
                          console.error("Error loading top image:", dress.top);
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-4 items-center bg-white p-2">
                      <p className="text-center text-xl font-semibold">Bottom</p>
                      <img
                        src={dress.bottom}
                        className="col-span-3 h-auto w-full"
                        alt="Bottom Dress"
                        onError={e => {
                          e.currentTarget.src = "path_to_placeholder_image";
                          console.error("Error loading bottom image:", dress.bottom);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </section>
    </>
  );
};

export default SelectionBasedRecommendations;
