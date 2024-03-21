import React from "react";
import { useNavigate } from "react-router-dom";
import { competition } from "../styles";
import banner from "../../../assests/banners/competition_banner.png";
import theme_halloween from "../../../assests/competition/theme_halloween.jpg";
import theme_christmas from "../../../assests/competition/theme_christmas.jpg";
import theme_street from "../../../assests/competition/theme_street.jpg";
import { CompetitionCard } from "../../../components";

const Competitions: React.FC = () => {
  const navigate = useNavigate();

  const handleParticipateClick = (imageUrl: string, title: string, description: string) => {
    navigate("/outfit-competition/submission", {
      state: { imageUrl, title, description },
    });
  };

  const halloweenTitle = "Spooky Halloweens";
  const halloweenDescription =
    "Join our Halloween theme competition and showcase your most hauntingly stylish outfits. Whether it's a classic ghostly appearance or a modern monstrous look, we're excited to see your creativity!";
  const christmasTitle = "Christmas Cheers";
  const christmasDescription =
    "Dive into the spirit of the holiday season with our Christmas Cheer theme. Whether you're attending a family gathering or a festive party, let your outfit reflect the joy and warmth of Christmas.";
  const streetTitle = "Street Wear Fusion";
  const streetDescription =
    "Unleash your inner city vibe with our Streetwear Fusion theme. Blend the raw energy of street style with a touch of sophistication, and make a statement wherever you go.";

  return (
    <div>
      <img src={banner} alt="Outfit Competition Banner" className={competition.mainBanner} />
      <div className={competition.topContainer}>
        <div>
          <h1 className={competition.topMainTopic}>Unleash your Creativity!</h1>
          <p className={competition.topDescription}>
            Dive into our competitions, a celebration of style and imagination. It's not just about fashion; it's about
            the joy of expression and the thrill of creativity.
          </p>
          <h1 className={competition.topSubTopic}>This Month's Themes</h1>
          <p className={competition.topSubDescription}>
            Explore our curated themes for the month and take on a challenge that speaks to you. Remember, it's not just
            about winning, but the journey of creation. And for those who rise to the top? A special treat awaits: our{" "}
            <b>top 3 winners</b> will enjoy a <b className="text-red-500">50% discount</b> on their next purchase.
          </p>
        </div>
      </div>
      <div className={competition.bottomContainerOuter}>
        <div className={competition.bottomContainerInner}>
          <CompetitionCard
            imageUrl={theme_halloween}
            title={halloweenTitle}
            description={halloweenDescription}
            additionalDetails={
              <div>
                <p className={competition.description}>
                  <b>Suggested outfits:</b> Costumes of witches, ghosts, monsters, popular horror movie characters, and
                  more.
                </p>
                <p>
                  <b>Accessories:</b> Masks, fake blood, broomsticks, and themed jewelry.
                </p>
              </div>
            }
            competitionId="halloween"
            onClick={() => handleParticipateClick(theme_halloween, halloweenTitle, halloweenDescription)}
          />
          <CompetitionCard
            imageUrl={theme_christmas}
            title={christmasTitle}
            description={christmasDescription}
            additionalDetails={
              <div>
                <p className={competition.description}>
                  <b>Suggested outfits:</b> Classic red and green dresses or sweaters, Santa Claus, elf, or reindeer
                  costumes, Velvet dresses with gold or silver accents, Ugly Christmas sweaters for a fun twist.
                </p>
                <p>
                  <b>Accessories:</b> Santa hats or reindeer antlers, Mistletoe or holly brooches, Christmas-themed
                  jewelry like snowflake earrings or candy cane necklaces, Festive scarves and socks.
                </p>
              </div>
            }
            competitionId="christmas"
            onClick={() => handleParticipateClick(theme_christmas, christmasTitle, christmasDescription)}
          />
          <CompetitionCard
            imageUrl={theme_street}
            title={streetTitle}
            description={streetDescription}
            additionalDetails={
              <div>
                <p className={competition.description}>
                  <b>Suggested outfits:</b> Oversized hoodies paired with skinny jeans or cargo pants, Graphic tees
                  layered under blazers or denim jackets, High-waist joggers with crop tops, Retro sneakers paired with
                  modern dresses.
                </p>
                <p>
                  <b>Accessories:</b> Chunky sneakers or combat boots, Baseball caps or bucket hats, Layered chain
                  necklaces or bold statement earrings, Crossbody bags or fanny packs.
                </p>
              </div>
            }
            competitionId="street"
            onClick={() => handleParticipateClick(theme_street, streetTitle, streetDescription)}
          />
        </div>
      </div>
    </div>
  );
};

export default Competitions;
