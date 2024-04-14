import React, { useState, useEffect, useRef } from "react";
import * as theme from "../../theme";
import * as styles from "./styles";
import Drawer from "@mui/material/Drawer";
import { Close } from "@mui/icons-material";
import Lottie from "react-lottie";
import emptyCartAnimation from "../../assests/other/empty_cart.json";
import { CartCard, useCart } from "../../components";
import { CheckoutButton, DetailedCartButton } from "./actions";
import { formatPrice } from "../../utils/priceFormat";

const CartDrawer = ({ openCart, onCartClose }: { openCart: boolean; onCartClose: () => void }) => {
  const { cartItems, subtotal } = useCart();
  const [drawerWidth, setDrawerWidth] = useState("100%");
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const cartDrawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 1440) {
        setDrawerWidth("33.33%");
      } else if (screenWidth >= 768 && screenWidth < 1440) {
        setDrawerWidth("50%");
      } else {
        setDrawerWidth("100%");
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useEffect(() => {
    setIsCartDrawerOpen(openCart);
  }, [openCart]);

  useEffect(() => {
    const handleClickOutsideCart = (event: MouseEvent) => {
      if (cartDrawerRef.current && !cartDrawerRef.current.contains(event.target as Node)) {
        onCartClose();
      }
    };

    if (isCartDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutsideCart);
    } else {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCart);
    };
  }, [isCartDrawerOpen, onCartClose]);

  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <div className={`${theme.drawer.backgroundBlur} ${isCartDrawerOpen ? "backdrop-blur-lg" : ""}`}></div>
      <Drawer
        anchor="right"
        open={openCart}
        onClose={onCartClose}
        PaperProps={{
          style: { width: drawerWidth },
        }}
      >
        <div id="cartOffCanvas" aria-labelledby="cartLabel" className={theme.drawer.container} ref={cartDrawerRef}>
          <div className={theme.drawer.menuSection}>
            <h5 id="cartLabel" className={theme.drawer.menuTopic}>
              Shopping Cart
            </h5>
            <button type="button" className={theme.drawer.menuButton} onClick={onCartClose}>
              <Close />
            </button>
          </div>
          <div className="flex flex-grow flex-col overflow-auto">
            {isCartEmpty ? (
              <div className={theme.drawer.inner}>
                <div className={styles.drawer.animationContainer}>
                  <Lottie
                    options={{
                      animationData: emptyCartAnimation,
                      loop: true,
                      autoplay: true,
                    }}
                    height={250}
                    width={250}
                  />
                </div>
                <div>
                  <p className={styles.drawer.emptyText}>Uh-oh! Your fashion cart feels a bit lonely.</p>
                </div>
                <button className={`${theme.form.button} ${styles.drawer.emptyBtn}`}>Let's fill it up</button>
              </div>
            ) : (
              <CartCard cartItems={cartItems} />
            )}
          </div>
          {!isCartEmpty && (
            <div className="sticky bottom-0 w-full border-t bg-white p-4">
              <div className="text-md mb-4 flex justify-between font-semibold">
                <p>Sub Total :</p>
                <p>{formatPrice(subtotal)}</p>
              </div>
              <div className="flex justify-between">
                <CheckoutButton onCartClose={onCartClose} />
                <DetailedCartButton onCartClose={onCartClose} />
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default CartDrawer;
