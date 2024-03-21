import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import * as theme from "../../../theme";
import * as styles from "../styles";
import { CompetitionGuideline } from "../../../components";
import ImageIcon from "@mui/icons-material/Image";

const CompetitionSubmission: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const { imageUrl, title, description } = state;

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (files.length + selectedImages.length > 3) {
        alert("Maximum 3 images can be uploaded.");
      } else {
        setSelectedImages(prevImages => [...prevImages, ...Array.from(files)]);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      if (files.length + selectedImages.length > 3) {
        alert("Maximum 3 images can be uploaded.");
      } else {
        setSelectedImages(prevImages => [...prevImages, ...Array.from(files)]);
      }
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const renderImages = () => {
    return (
      <div className="uploaded-images flex">
        {selectedImages.map((file, index) => (
          <div key={index} className="uploaded-image">
            <button
              className="close-button absolute z-10 bg-red-500 px-4 py-3 text-white hover:bg-red-600"
              onClick={() => removeImage(index)}
            >
              X
            </button>
            <img
              src={URL.createObjectURL(file)}
              alt={`Uploaded Outfit ${index + 1}`}
              className="preview-image relative mr-10 h-60 w-auto"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className={styles.competitionSubmission.themeContainer}>
        <div className={styles.competitionSubmission.textContainer}>
          <p className={styles.competitionSubmission.themeTitle}>{title}</p>
          <p className={styles.competitionSubmission.description}>{description}</p>
        </div>
        <div className={styles.competitionSubmission.themeImageContainer}>
          <img src={imageUrl} alt={title} className={styles.competitionSubmission.themeImage} />
        </div>
      </div>

      <div className={styles.competitionSubmission.guidelineContainer}>
        <h1 className={styles.competitionSubmission.guidelineTopic}>Attention Participants!</h1>
        <p className={styles.competitionSubmission.guidelineNotice}>
          📜 Before diving into the competition, it's crucial to familiarize yourself with the rules. 👉👈 Please ensure
          you thoroughly read and understand the Competition Guidelines.
        </p>
        <CompetitionGuideline />
      </div>

      <div className={styles.competitionSubmission.uploadSection} onDragOver={handleDragOver} onDrop={handleDrop}>
        <p className={styles.competitionSubmission.uploadTopic}>Upload your Outfits Here</p>
        <p className={styles.competitionSubmission.uploadText}>Maximum Number of Outfit Images you can submit is 3</p>
        <div className={styles.competitionSubmission.uploadContainer} onClick={handleImageUpload}>
          <ImageIcon className={styles.competitionSubmission.uploadImage} style={{ fontSize: "80px" }} />
          <p className={styles.competitionSubmission.uploadImageText}>Click here or drag and drop your outfit image</p>
          <input
            type="file"
            id="outfit-upload"
            ref={fileInputRef}
            className="upload-input"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        {selectedImages.length > 0 && (
          <div className="uploaded-images-container mt-6 rounded-sm bg-neutral-100 px-10 py-8">{renderImages()}</div>
        )}
        <div className="submit-section">
          <button className={`${theme.form.button} ${styles.competitionSubmission.button}`}>Submit</button>
        </div>
      </div>
    </>
  );
};

export default CompetitionSubmission;
