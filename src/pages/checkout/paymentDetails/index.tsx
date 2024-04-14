import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { ExpandMore, OpenInNew, TaskAlt } from "@mui/icons-material";
import * as styles from "../../../_layouts/styles";
import { checkout } from "../styles";
import logo from "../../../assests/logo/main_logo.png";
import { CheckoutProducts, CustomTextField } from "../../../components";
import { Routes } from "../../../routing/routes";
import { IProduct, IOrder } from "../../../models";
import { loadStripe } from "@stripe/stripe-js";
import { formatPrice } from "../../../utils";
const baseURL = process.env.REACT_APP_BASE_URL;

const CheckoutBilling: React.FC = () => {
  const { state } = useLocation();
  const { orderId, cartItems, shippingDetails, subtotal, deliveryCharge, discount, total } = state;
  console.log(cartItems, shippingDetails);
  const netTotal = formatPrice(total);

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [billingOption, setBillingOption] = useState("same");
  const [billingDetails, setBillingDetails] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postal: "",
    country: "Sri Lanka",
    phoneNumber: "",
  });

  useEffect(() => {
    if (billingOption === "same") {
      setBillingDetails(shippingDetails);
    } else {
      setBillingDetails({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postal: "",
        country: "Sri Lanka",
        phoneNumber: "",
      });
    }
  }, [billingOption, shippingDetails]);

  const handlePaymentMethodChange = (paymentType: string, event: React.SyntheticEvent, isExpanded: boolean) => {
    if (isExpanded) {
      setPaymentMethod(paymentType);
    }
  };

  const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const makePayment = async (orderDetails: IOrder) => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

    try {
      const response = await axios.post(
        `${baseURL}/orders/create-payment`,
        {
          products: orderDetails.cartItems,
          orderId: orderDetails.orderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const session = response.data;
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Payment error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleCompleteOrder = async () => {
    if (paymentMethod === "card") {
      const orderDetails: IOrder = {
        orderId,
        cartItems,
        shippingDetails,
        billingDetails,
        paymentMethod,
        subtotal,
        deliveryCharge,
        discount,
        total,
        status: "Pending",
      };

      localStorage.setItem(
        "orderSuccessMessage",
        JSON.stringify({
          title: "Payment Successful!",
          message: `Your payment of ${netTotal} has been successfully processed. Thank you for your purchase`,
        }),
      );

      await makePayment(orderDetails);
    } else {
      localStorage.setItem(
        "orderSuccessMessage",
        JSON.stringify({
          title: "Order Confirmed!",
          message: `Thank you for your order! Total amount is ${netTotal}. Payment will be collected upon delivery.`,
        }),
      );
      navigate(`${Routes.MESSAGE}/${orderId}`);

      const orderData = {
        orderId,
        items: cartItems.map((item: IProduct) => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.unitPrice,
        })),
        shippingDetails,
        billingDetails,
        paymentMethod,
        subtotal,
        deliveryCharge,
        discount,
        total,
        status: "Pending",
      };

      try {
        const response = await axios.post(`${baseURL}/orders/create`, orderData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Order Saved successfully", response.data);
      } catch (error) {
        console.error("Error saving order");
      }
    }
    console.log("Order details:", { ...billingDetails, paymentMethod, cartItems, shippingDetails, orderId });
  };

  return (
    <>
      <div className={styles.topHeader.container}>
        <p>
          Shop, Smile, Repeat. Discover your style with AI-Powered Fashion! Enjoy free delivery on orders over LKR
          7500/-
        </p>
      </div>
      <div className={checkout.container}>
        <div className={checkout.leftSection}>
          <img src={logo} alt="logo" className={checkout.logo} />
          <div className={checkout.leftTopContent}>
            <h2 className={checkout.topic}>Payment Details</h2>
            <p className={checkout.subTopic}>
              Rest assured, your payment details undergo strict encryption for optimal security
            </p>
            <RadioGroup name="paymentMethod">
              <Accordion
                expanded={paymentMethod === "card"}
                onChange={(event, isExpanded) => handlePaymentMethodChange("card", event, isExpanded)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "white" }} />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{ border: "1px solid white", backgroundColor: "#00375C", color: "white" }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    <FormControlLabel
                      value="card"
                      control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "#00BBDB" } }} />}
                      label=""
                    />
                    Credit / Debit Card
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#00375C",
                    border: "1px solid white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    color: "#F8F9FA",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  <OpenInNew style={{ fontSize: "80px", color: "#F8F9FA" }} />
                  <p className="xl:px-28">
                    After clicking "Complete Order", you will be redirected to Stripe to complete your order securely.
                  </p>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={paymentMethod === "cash"}
                onChange={(event, isExpanded) => handlePaymentMethodChange("cash", event, isExpanded)}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "white" }} />}
                  aria-controls="panel2bh-content"
                  id="panel2bh-header"
                  sx={{ border: "1px solid white", backgroundColor: "#00375C", color: "white" }}
                >
                  <Typography sx={{ fontWeight: 600 }}>
                    <FormControlLabel
                      value="cash"
                      control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "#00BBDB" } }} />}
                      label=""
                    />
                    Cash on Delivery (COD)
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    backgroundColor: "#00375C",
                    border: "1px solid white",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "8px",
                    color: "#F8F9FA",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  <TaskAlt style={{ fontSize: "80px" }} />
                  <p className="xl:px-28">After clicking "Complete Order", your order will be placed successfully.</p>
                </AccordionDetails>
              </Accordion>
            </RadioGroup>
          </div>
          <h2 className={checkout.topic}>Billing Details</h2>
          <p className={checkout.subTopic}>Provide billing details for the recipient of the order</p>
          <FormControl component="fieldset">
            <RadioGroup name="billingOption" value={billingOption} onChange={e => setBillingOption(e.target.value)}>
              <FormControlLabel
                value="same"
                control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />}
                label="Same as Shipping Address"
              />
              <p className="mb-8 ml-8 mt-1 text-xs font-normal text-primary-100">
                Your order will be billed using the same details provided for shipping.
              </p>

              <FormControlLabel
                value="different"
                control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />}
                label="Use Different Billing Address"
              />
              <p className="mb-8 ml-8 mt-1 text-xs font-normal text-primary-100">
                Please provide billing details below for accurate invoicing
              </p>
            </RadioGroup>
          </FormControl>
          {billingOption === "different" && (
            <div className={checkout.leftBottomContent}>
              <CustomTextField
                name="country"
                value={billingDetails.country}
                type="text"
                onChange={handleOrderChange}
                label="Country"
              />
              <div className={checkout.input}>
                <CustomTextField
                  name="firstName"
                  value={billingDetails.firstName}
                  type="text"
                  onChange={handleOrderChange}
                  label="First Name"
                />
                <CustomTextField
                  name="lastName"
                  value={billingDetails.lastName}
                  type="text"
                  onChange={handleOrderChange}
                  label="Last Name"
                />
              </div>
              <CustomTextField
                multiline
                rows={2}
                name="address"
                value={billingDetails.address}
                type="text"
                onChange={handleOrderChange}
                label="Address"
              />
              <div className={checkout.input}>
                <CustomTextField
                  name="city"
                  value={billingDetails.city}
                  type="text"
                  onChange={handleOrderChange}
                  label="City"
                />
                <CustomTextField
                  name="postal"
                  value={billingDetails.postal}
                  type="text"
                  onChange={handleOrderChange}
                  label="Postal"
                />
              </div>
              <CustomTextField
                name="phoneNumber"
                value={billingDetails.phoneNumber}
                type="text"
                onChange={handleOrderChange}
                label="Phone Number"
              />
            </div>
          )}
          <div className={checkout.buttonContainer}>
            <Link
              className="flex items-center font-bold text-primary-100"
              to={`${Routes.CHECKOUT_SHIPPING}/${orderId}`}
            >
              Back to Shipping
            </Link>
            <button onClick={handleCompleteOrder} className={checkout.rightButton}>
              Complete Order
            </button>
          </div>
        </div>
        <CheckoutProducts cartItems={cartItems} />
      </div>
    </>
  );
};

export default CheckoutBilling;

// import React, { ChangeEvent, useEffect, useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
// } from "@mui/material";
// import { ExpandMore, OpenInNew, TaskAlt } from "@mui/icons-material";
// import * as styles from "../../../_layouts/styles";
// import { checkout } from "../styles";
// import logo from "../../../assests/logo/main_logo.png";
// import { CheckoutProducts, CustomTextField } from "../../../components";
// import { Routes } from "../../../routing/routes";
// import { IProduct, IOrder } from "../../../models";
// import { loadStripe } from "@stripe/stripe-js";
// import { formatPrice } from "../../../utils";
// const baseURL = process.env.REACT_APP_BASE_URL;

// const CheckoutBilling: React.FC = () => {
//   const { state } = useLocation();
//   const { orderId, cartItems, shippingDetails, subtotal, deliveryCharge, discount, total } = state;
//   console.log(cartItems, shippingDetails);
//   const netTotal = formatPrice(total);

//   const navigate = useNavigate();
//   const [paymentMethod, setPaymentMethod] = useState<string>("");
//   const [billingOption, setBillingOption] = useState("same");
//   const [billingDetails, setBillingDetails] = useState({
//     firstName: "",
//     lastName: "",
//     address: "",
//     city: "",
//     postal: "",
//     country: "Sri Lanka",
//     phoneNumber: "",
//   });

//   useEffect(() => {
//     if (billingOption === "same") {
//       setBillingDetails(shippingDetails);
//     } else {
//       setBillingDetails({
//         firstName: "",
//         lastName: "",
//         address: "",
//         city: "",
//         postal: "",
//         country: "Sri Lanka",
//         phoneNumber: "",
//       });
//     }
//   }, [billingOption, shippingDetails]);

//   const handlePaymentMethodChange = (paymentType: string, event: React.SyntheticEvent, isExpanded: boolean) => {
//     if (isExpanded) {
//       setPaymentMethod(paymentType);
//     }
//   };

//   const handleOrderChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
//   };

//   const makePayment = async (orderDetails: IOrder) => {
//     const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY!);

//     try {
//       const response = await axios.post(
//         `${baseURL}/orders/create-payment`,
//         {
//           products: orderDetails.cartItems,
//           orderId: orderDetails.orderId,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       const session = response.data;
//       const stripe = await stripePromise;
//       await stripe?.redirectToCheckout({ sessionId: session.id });
//     } catch (error: unknown) {
//       if (axios.isAxiosError(error)) {
//         console.error("Payment error:", error.response?.data || error.message);
//       } else {
//         console.error("Unexpected error:", error);
//       }
//     }
//   };

//   const handleCompleteOrder = async () => {
//     if (paymentMethod === "card") {
//       const orderDetails: IOrder = {
//         orderId,
//         cartItems: cartItems.map((item: IProduct) => ({
//           productId: item._id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.unitPrice,
//         })),
//         shippingDetails,
//         billingDetails,
//         paymentMethod,
//         subtotal,
//         deliveryCharge,
//         discount,
//         total,
//         status: "Pending",
//       };

//       localStorage.setItem(
//         "orderSuccessMessage",
//         JSON.stringify({
//           title: "Payment Successful!",
//           message: `Your payment of ${netTotal} has been successfully processed. Thank you for your purchase`,
//         }),
//       );

//       await makePayment(orderDetails);
//     } else {
//       const orderDetails: IOrder = {
//         orderId,
//         cartItems: cartItems.map((item: IProduct) => ({
//           productId: item._id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.unitPrice,
//         })),
//         shippingDetails,
//         billingDetails,
//         paymentMethod,
//         subtotal,
//         deliveryCharge,
//         discount,
//         total,
//         status: "Pending",
//       };

//       try {
//         const response = await axios.post(`${baseURL}/orders/create`, orderDetails, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("Order Saved successfully", response.data);
//       } catch (error) {
//         console.error("Error saving order");
//       }
//       localStorage.setItem(
//         "orderSuccessMessage",
//         JSON.stringify({
//           title: "Order Confirmed!",
//           message: `Thank you for your order! Total amount is ${netTotal}. Payment will be collected upon delivery.`,
//         }),
//       );
//       navigate(`${Routes.MESSAGE}/${orderId}`);
//     }
//     console.log("Order details:", { ...billingDetails, paymentMethod, cartItems, shippingDetails, orderId });
//   };

//   return (
//     <>
//       <div className={styles.topHeader.container}>
//         <p>
//           Shop, Smile, Repeat. Discover your style with AI-Powered Fashion! Enjoy free delivery on orders over LKR
//           7500/-
//         </p>
//       </div>
//       <div className={checkout.container}>
//         <div className={checkout.leftSection}>
//           <img src={logo} alt="logo" className={checkout.logo} />
//           <div className={checkout.leftTopContent}>
//             <h2 className={checkout.topic}>Payment Details</h2>
//             <p className={checkout.subTopic}>
//               Rest assured, your payment details undergo strict encryption for optimal security
//             </p>
//             <RadioGroup name="paymentMethod">
//               <Accordion
//                 expanded={paymentMethod === "card"}
//                 onChange={(event, isExpanded) => handlePaymentMethodChange("card", event, isExpanded)}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMore sx={{ color: "white" }} />}
//                   aria-controls="panel1bh-content"
//                   id="panel1bh-header"
//                   sx={{ border: "1px solid white", backgroundColor: "#00375C", color: "white" }}
//                 >
//                   <Typography sx={{ fontWeight: 600 }}>
//                     <FormControlLabel
//                       value="card"
//                       control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "#00BBDB" } }} />}
//                       label=""
//                     />
//                     Credit / Debit Card
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails
//                   sx={{
//                     backgroundColor: "#00375C",
//                     border: "1px solid white",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: "8px",
//                     color: "#F8F9FA",
//                     textAlign: "center",
//                     fontSize: "14px",
//                     fontWeight: 400,
//                   }}
//                 >
//                   <OpenInNew style={{ fontSize: "80px", color: "#F8F9FA" }} />
//                   <p className="xl:px-28">
//                     After clicking "Complete Order", you will be redirected to Stripe to complete your order securely.
//                   </p>
//                 </AccordionDetails>
//               </Accordion>
//               <Accordion
//                 expanded={paymentMethod === "cash"}
//                 onChange={(event, isExpanded) => handlePaymentMethodChange("cash", event, isExpanded)}
//               >
//                 <AccordionSummary
//                   expandIcon={<ExpandMore sx={{ color: "white" }} />}
//                   aria-controls="panel2bh-content"
//                   id="panel2bh-header"
//                   sx={{ border: "1px solid white", backgroundColor: "#00375C", color: "white" }}
//                 >
//                   <Typography sx={{ fontWeight: 600 }}>
//                     <FormControlLabel
//                       value="cash"
//                       control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "#00BBDB" } }} />}
//                       label=""
//                     />
//                     Cash on Delivery (COD)
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails
//                   sx={{
//                     backgroundColor: "#00375C",
//                     border: "1px solid white",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: "8px",
//                     color: "#F8F9FA",
//                     textAlign: "center",
//                     fontSize: "14px",
//                     fontWeight: 400,
//                   }}
//                 >
//                   <TaskAlt style={{ fontSize: "80px" }} />
//                   <p className="xl:px-28">After clicking "Complete Order", your order will be placed successfully.</p>
//                 </AccordionDetails>
//               </Accordion>
//             </RadioGroup>
//           </div>
//           <h2 className={checkout.topic}>Billing Details</h2>
//           <p className={checkout.subTopic}>Provide billing details for the recipient of the order</p>
//           <FormControl component="fieldset">
//             <RadioGroup name="billingOption" value={billingOption} onChange={e => setBillingOption(e.target.value)}>
//               <FormControlLabel
//                 value="same"
//                 control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />}
//                 label="Same as Shipping Address"
//               />
//               <p className="mb-8 ml-8 mt-1 text-xs font-normal text-primary-100">
//                 Your order will be billed using the same details provided for shipping.
//               </p>

//               <FormControlLabel
//                 value="different"
//                 control={<Radio sx={{ color: "white", "&.Mui-checked": { color: "white" } }} />}
//                 label="Use Different Billing Address"
//               />
//               <p className="mb-8 ml-8 mt-1 text-xs font-normal text-primary-100">
//                 Please provide billing details below for accurate invoicing
//               </p>
//             </RadioGroup>
//           </FormControl>
//           {billingOption === "different" && (
//             <div className={checkout.leftBottomContent}>
//               <CustomTextField
//                 name="country"
//                 value={billingDetails.country}
//                 type="text"
//                 onChange={handleOrderChange}
//                 label="Country"
//               />
//               <div className={checkout.input}>
//                 <CustomTextField
//                   name="firstName"
//                   value={billingDetails.firstName}
//                   type="text"
//                   onChange={handleOrderChange}
//                   label="First Name"
//                 />
//                 <CustomTextField
//                   name="lastName"
//                   value={billingDetails.lastName}
//                   type="text"
//                   onChange={handleOrderChange}
//                   label="Last Name"
//                 />
//               </div>
//               <CustomTextField
//                 multiline
//                 rows={2}
//                 name="address"
//                 value={billingDetails.address}
//                 type="text"
//                 onChange={handleOrderChange}
//                 label="Address"
//               />
//               <div className={checkout.input}>
//                 <CustomTextField
//                   name="city"
//                   value={billingDetails.city}
//                   type="text"
//                   onChange={handleOrderChange}
//                   label="City"
//                 />
//                 <CustomTextField
//                   name="postal"
//                   value={billingDetails.postal}
//                   type="text"
//                   onChange={handleOrderChange}
//                   label="Postal"
//                 />
//               </div>
//               <CustomTextField
//                 name="phoneNumber"
//                 value={billingDetails.phoneNumber}
//                 type="text"
//                 onChange={handleOrderChange}
//                 label="Phone Number"
//               />
//             </div>
//           )}
//           <div className={checkout.buttonContainer}>
//             <Link
//               className="flex items-center font-bold text-primary-100"
//               to={`${Routes.CHECKOUT_SHIPPING}/${orderId}`}
//             >
//               Back to Shipping
//             </Link>
//             <button onClick={handleCompleteOrder} className={checkout.rightButton}>
//               Complete Order
//             </button>
//           </div>
//         </div>
//         <CheckoutProducts cartItems={cartItems} />
//       </div>
//     </>
//   );
// };

// export default CheckoutBilling;
