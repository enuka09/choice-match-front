import { useState, useEffect } from "react";
import AxiosInstance from "../config/axiosInstance";

const useFetchData = () => {
  const [data, setData] = useState({ mainCategories: [], subCategories: [], brands: [] });

  useEffect(() => {
    const fetchData = async () => {
      const mainCategoriesResponse = await AxiosInstance.get("/main-categories/find-all");
      const subCategoriesResponse = await AxiosInstance.get("/sub-categories/find-all");
      const brandsResponse = await AxiosInstance.get("/brands/find-all");

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
