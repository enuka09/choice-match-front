import { useState, useEffect } from "react";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

const useFetchData = () => {
  const [data, setData] = useState({ mainCategories: [], subCategories: [], brands: [] });

  useEffect(() => {
    const fetchData = async () => {
      const mainCategoriesResponse = await axios.get(`${baseURL}/main-categories/find-all`);
      const subCategoriesResponse = await axios.get(`${baseURL}/sub-categories/find-all`);
      const brandsResponse = await axios.get(`${baseURL}/brands/find-all`);

      setData({
        mainCategories: mainCategoriesResponse.data,
        subCategories: subCategoriesResponse.data,
        brands: brandsResponse.data,
      });
    };

    fetchData();
  }, []);

  return data;
};

export default useFetchData;
