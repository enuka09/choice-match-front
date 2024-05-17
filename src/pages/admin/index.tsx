import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import * as theme from "../../theme";
import AxiosInstance from "../../config/axiosInstance";

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [subCategoryCount, setSubCategoryCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);

  useEffect(() => {
    findAllCount();
  }, []);

  const findAllCount = async () => {
    const responses = await Promise.all([
      AxiosInstance.get("/users/find-all-count"),
      AxiosInstance.get("/orders/find-all-count"),
      AxiosInstance.get("/products/find-all-count"),
      AxiosInstance.get("/main-categories/find-all-count"),
      AxiosInstance.get("/sub-categories/find-all-count"),
      AxiosInstance.get("/brands/find-all-count"),
    ]);
    setUserCount(responses[0].data);
    setOrderCount(responses[1].data);
    setProductCount(responses[2].data);
    setCategoryCount(responses[3].data);
    setSubCategoryCount(responses[4].data);
    setBrandCount(responses[5].data);
  };

  const stats = [
    { label: "Users", count: userCount },
    { label: "Orders", count: orderCount },
    { label: "Products", count: productCount },
    { label: "Main Categories", count: categoryCount },
    { label: "Sub Categories", count: subCategoryCount },
    { label: "Brands", count: brandCount },
  ];

  const cardColors = [
    { backgroundColor: "#4C6373" },
    { backgroundColor: "#667987" },
    { backgroundColor: "#4C6373" },
    { backgroundColor: "#667987" },
    { backgroundColor: "#4C6373" },
    { backgroundColor: "#667987" },
  ];

  const cards = stats.map((stat, index) => (
    <Grid item xs={12} sm={4} key={index}>
      <Card
        sx={{
          ...cardColors[index % cardColors.length],
          color: "#ffffff",
          fontFamily: "Roboto, sans-serif",
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            {stat.label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, fontSize: "3rem" }}>
            {stat.count}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  ));

  return (
    <>
      <div className={theme.adminFunction.pagePaddings}>
        <Grid container spacing={2}>
          {cards}
        </Grid>
      </div>
    </>
  );
};

export default AdminDashboard;
