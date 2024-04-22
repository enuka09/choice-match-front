import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../configs";
import * as theme from "../../../theme";
import { FormData, PredictionPair } from "../types";
import { Gender, toggleGender } from "../service";
import Lottie from "react-lottie";
import main from "../../../assests/fashion/main_animation2.json";
import loader from "../../../assests/other/fashion_loader.json";

interface Entity {
  label: string;
  text: string;
}

interface ImagePair {
  top: string;
  bottom: string;
  key: string;
}

const EntityInputForm: React.FC = () => {
  const location = useLocation();
  const [sentence, setSentence] = useState("");
  const [gender, setGender] = useState<Gender>(location.state?.gender || "Unspecified");
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [minLoadingTimeMet, setMinLoadingTimeMet] = useState(false);
  const [dressImages, setDressImages] = useState<ImagePair[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSentence(event.target.value);
  };

  const handleToggleGender = () => {
    const newGender = toggleGender(gender);
    setGender(newGender);
    // localStorage.setItem("Gender", newGender);
  };

  const handleFormSubmit = async () => {
    setButtonClicked(true);
    setIsLoading(true);
    setMinLoadingTimeMet(false);
    setTimeout(() => setMinLoadingTimeMet(true), 3000);
    try {
      const entityResponse = await axios.post("/extract-entities", { text: sentence, gender });
      const entities = entityResponse.data.entities;
      const formData = mapEntitiesToFormData(entities);
      console.log("Entities received:", entities);
      console.log("Mapped form data:", formData);
      console.log("Final form data being sent to backend:", formData);

      const response = await axios.post<PredictionPair[]>("/predict", formData);
      const images = response.data.map(pair => ({
        top: `http://127.0.0.1:5000/images/Top_Dress/${pair.top_id}.jpg?${new Date().getTime()}`,
        bottom: `http://127.0.0.1:5000/images/Bottom_Dress/${pair.bottom_id}.jpg?${new Date().getTime()}`,
        key: `${pair.top_id}-${pair.bottom_id}`,
      }));

      setDressImages(images);
      setIsLoading(false);
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error.message);
      setIsLoading(false);
    }
  };

  const mapEntitiesToFormData = (entities: Entity[]): FormData => {
    const formData: FormData = {
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
    };

    entities.forEach(entity => {
      const key = Object.keys(formData).find(
        k => k.toLowerCase().replace(/\s/g, "") === entity.label.toLowerCase().replace(/\s/g, ""),
      ) as keyof FormData | undefined;

      if (key) {
        formData[key] = entity.text;
      } else {
        console.log(`No key found for label ${entity.label}`);
      }
    });

    return formData;
  };

  return (
    <div className="entity-input-form bg-gray-50">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10 pt-10 text-center">
          <h1 className="mb-6 text-[2.5rem] font-bold text-gray-800">Fashion Recommender - Freestyle Mode</h1>
          <p className="text-xl font-semibold text-gray-600">
            Choice Match Freestyle Mode offers you the opportunity to delve deeper into your style preferences, allowing
            you to describe exactly what you're looking for and receive tailored outfit recommendations
          </p>
          <Lottie
            options={{
              animationData: main,
              loop: true,
              autoplay: true,
            }}
            height={450}
          />
        </div>
        <div className="mb-6 rounded-lg bg-white p-8 shadow-xl">
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-4">
              <label className="block text-lg font-semibold text-primary-100">Current Gender:</label>
              <span className="text-xl text-primary-300">{gender}</span>
            </div>
            <button
              onClick={handleToggleGender}
              className="focus:shadow-outline rounded bg-primary-700 px-4 py-2 font-bold text-white hover:bg-primary-300 focus:outline-none"
            >
              Toggle Gender
            </button>
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-lg font-semibold text-gray-700">Describe your fashion choice:</label>
            <textarea
              rows={4}
              value={sentence}
              onChange={handleInputChange}
              placeholder="Enter a prompt describing your preferences to get recommendtaions"
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
            />
          </div>
          <div className="flex justify-center">
            <button onClick={handleFormSubmit} disabled={isLoading} className={`${theme.form.button} py-4`}>
              {buttonClicked && (isLoading || !minLoadingTimeMet) ? "Processing ..." : "Make me Fabulous !"}
            </button>
          </div>
        </div>
      </div>
      {buttonClicked && (isLoading || !minLoadingTimeMet) ? (
        <div className="mb-16 mt-20 flex items-center justify-center">
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
          <div className="mx-20 my-20 shadow-md">
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
    </div>
  );
};

export default EntityInputForm;
