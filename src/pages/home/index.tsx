import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { AutoFixHigh, CreditCard, EmojiEvents, WatchLater } from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as theme from "../../theme/index";
import * as styles from "./styles";
import AxiosInstance from "../../config/axiosInstance";
import firebase from "../../config/firebase";
import { IProduct } from "../../models";
import { ServiceCard, MainCategoryCard, ProductCard, Button, FeedbackCard, BrandCard } from "../../components";
import aiBanner from "../../assests/banners/ai_banner.png";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const isMediumScreen = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");

  const fontSize = isSmallScreen ? "32px" : isMediumScreen ? "38px" : "48px";

  const [bannerUrls, setBannerUrls] = useState<string[]>([]);
  const [categoryImages, setCategoryImages] = useState<string[]>([]);
  const [brandUrls, setBrandUrls] = useState<string[]>([]);
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);

  // Fetch Banner images from Firebase Storage
  useEffect(() => {
    const fetchBannerImages = async () => {
      try {
        const storageRef = firebase.storage().ref();
        const mainSlidersRef = storageRef.child("Banners/MainSliders");
        const result = await mainSlidersRef.listAll();
        const urls: string[] = [];
        await Promise.all(
          result.items.map(async imageRef => {
            const url = await imageRef.getDownloadURL();
            urls.push(url);
          }),
        );
        setBannerUrls(urls);
      } catch (error) {
        console.error("Error fetching banners from Firebase Storage:", error);
      }
    };

    fetchBannerImages();
  }, []);

  const bannerSettings = {
    autoplay: true,
    autoplaySpeed: 4000,
  };

  // Fetch main-category images from Firebase
  useEffect(() => {
    const fetchCategoryImages = async () => {
      try {
        const womenImageUrl = await firebase.storage().ref("Categories/Main/women.png").getDownloadURL();
        const menImageUrl = await firebase.storage().ref("Categories/Main/men.png").getDownloadURL();
        const kidsImageUrl = await firebase.storage().ref("Categories/Main/kids.png").getDownloadURL();
        setCategoryImages([womenImageUrl, menImageUrl, kidsImageUrl]);
      } catch (error) {
        console.error("Error fetching category images from Firebase Storage:", error);
      }
    };
    fetchCategoryImages();
  }, []);
  const categoryTitles = ["Women Collection", "Men Collection", "Kids Collection"];

  // Fetch Featured Products
  useEffect(() => {
    findAllProducts();
  }, []);

  const findAllProducts = async () => {
    const response = await AxiosInstance.get("/products/find-all-featured");
    setProducts(response.data);
  };

  // Fetch Brand Images from Firebase Storage
  useEffect(() => {
    const fetchBrandImages = async () => {
      try {
        const storageRef = firebase.storage().ref();
        const result = await storageRef.child("Brands").listAll();
        const urls: string[] = [];
        await Promise.all(
          result.items.map(async imageRef => {
            const url = await imageRef.getDownloadURL();
            urls.push(url);
          }),
        );
        setBrandUrls(urls);
      } catch (error) {
        console.error("Error fetching brands from Firebase Storage:", error);
      }
    };

    fetchBrandImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandIndex(prevIndex => (prevIndex === brandUrls.length - 1 ? 0 : prevIndex + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [brandUrls]);

  return (
    <>
      {/* Main Banner */}
      <section className="overflow-hidden">
        <div>
          <Slider {...bannerSettings}>
            {bannerUrls.map((url, index) => (
              <div key={index} className="main-banner">
                <img src={url} alt={`Banner ${index + 1}`} className="w-full" />
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/* Main Banner ends Here */}

      {/* Services Section */}
      <section
        className={`lg:${theme.pageSectionPadding.lg} md:${theme.pageSectionPadding.md} sm-max:pb-14 sm-max:pt-8`}
      >
        <h2 className={`${theme.section.title} text-center`}>we offer...</h2>
        <div className="services-outer">
          <div className={styles.serviceSection.inner}>
            <ServiceCard
              icon={<AutoFixHigh className="icons" style={{ fontSize: fontSize }} />}
              title="AI-Powered Styling"
            />
            <ServiceCard
              icon={<CreditCard className="icons" style={{ fontSize: fontSize }} />}
              title="Secure Payment Methods"
            />
            <ServiceCard
              icon={<EmojiEvents className="icons" style={{ fontSize: fontSize }} />}
              title="Competitions & Rewards"
            />
            <ServiceCard icon={<WatchLater className="icons" style={{ fontSize: fontSize }} />} title="Support 24/7" />
          </div>
        </div>
      </section>
      {/* Services Section ends here */}

      {/* Main Category Section */}
      <section
        className={`lg:${theme.pageSectionPadding.lg} md:${theme.pageSectionPadding.md} bg-neutral-600 sm-max:px-4 sm-max:pb-14 sm-max:pt-8`}
      >
        <div className="main-categories-section">
          <div className="main-categories-inner">
            <h2 className={theme.section.title}>our collections</h2>
            <div className={styles.mainCategorySection.cardContainer}>
              {categoryImages.map((url, index) => (
                <MainCategoryCard key={index} imageUrl={url} index={index} title={categoryTitles[index]} />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Main Category Section ends here */}

      {/* Featured Items Section */}
      <section
        className={`lg:${theme.pageSectionPadding.lg} md:${theme.pageSectionPadding.md} sm-max:px-4 sm-max:pb-14 sm-max:pt-8`}
      >
        <div className="new-arrival-section">
          <div className="new-arrival-inner">
            <h2 className={theme.section.title}>top trends</h2>
            <Button>View All</Button>
            <div className={theme.productTheme.container}>
              {products.map((product, index) => (
                <ProductCard
                  _id={product._id}
                  name={product.name}
                  image={product.image}
                  description={product.description}
                  unitPrice={product.unitPrice}
                  mainCategory={product.mainCategory}
                  subCategory={product.subCategory}
                  brand={product.brand}
                  color={product.color}
                  size={product.size}
                  qtyOnHand={product.qtyOnHand}
                  isFeatured={product.isFeatured}
                  dateCreated={product.dateCreated}
                  key={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Featured Items Section ends here */}

      {/* AI Banner Section */}
      <section className={styles.aiBannerSection.container}>
        <div className={styles.aiBannerSection.left}>
          <img src={aiBanner} alt="AI Banner" className="w-full" />
        </div>
        <div className={styles.aiBannerSection.right}>
          <h1 className={styles.aiBannerSection.text1}>unsure about your outfit?</h1>
          <p className={styles.aiBannerSection.text2}>Elevate your style with our</p>
          <p className={styles.aiBannerSection.text3}>AI-powered</p>
          <p className={styles.aiBannerSection.text4}>Fashion Recommender</p>

          <p className={styles.aiBannerSection.text5}>Discover your perfect look Today!</p>
          <button className={styles.aiBannerSection.button}>Try Now</button>
        </div>
      </section>
      {/* AI Banner Section ends here */}

      {/* Customer Feedback Section */}
      <section
        className={`lg:${theme.pageSectionPadding.lg} md:${theme.pageSectionPadding.md} sm-max:px-4 sm-max:pb-14 sm-max:pt-8`}
      >
        <div className="feedback-section">
          <div className="feedback-inner">
            <h2 className={theme.section.title}>customer feedbacks</h2>
            <div className={theme.productTheme.container}>
              <FeedbackCard
                feedback="Every purchase feels tailor-made thanks to Choice Match Fashion Recommender💃 Its is like having a personal stylist at my fingertips👗✨"
                customerName="Kaushali Wijesighe"
              />
              <FeedbackCard
                feedback="Every outfit I've purchased here has become a favorite❤️ Love the quality and style!😍❤️ Thank you Choice Match!!"
                customerName="Roshel Fernando"
              />
              <FeedbackCard
                feedback="From browsing to buying, the experience is seamless. Love the variety and quality of the outfits! 🛍️✨ Simply brilliant❤"
                customerName="Piyumi Fonseka"
              />
              <FeedbackCard
                feedback="The outfits here are not just clothes; they're confidence boosters❤️❤️ Plus, the AI recommendations are always on point"
                customerName="Malshi Perea"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Customer Feedback Section ends here */}

      {/* Brands Section */}
      <section
        className={`lg:${theme.pageSectionPadding.lg} md:${theme.pageSectionPadding.md} bg-neutral-600 sm-max:px-4 sm-max:pb-14 sm-max:pt-8`}
      >
        <div className="brand-section-inner">
          <h2 className={`${theme.section.title} text-center`}>our brands</h2>
          <div className={styles.brandSection.container}>
            {brandUrls.map((url, index) => (
              <BrandCard key={index} imageUrl={url} isActive={index === currentBrandIndex} />
            ))}
          </div>
        </div>
      </section>
      {/* Brands Section ends here */}
    </>
  );
};

export default Home;
