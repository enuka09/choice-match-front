import { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import { Close } from "@mui/icons-material";
import Lottie from "react-lottie";
import emptyCartAnimation from "../../assests/other/empty_cart.json";
import { CartContent } from "../../components";
import * as theme from "../../theme";
import * as styles from "./styles";

const CartDrawer = ({
  openCart,
  onCartClose,
  cartItems,
}: {
  openCart: boolean;
  onCartClose: () => void;
  cartItems: any[];
}) => {
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const cartDrawerRef = useRef<HTMLDivElement>(null);
  //   const [isAnimationVisible, setIsAnimationVisible] = useState(false);

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

  // Determine if the cart is empty
  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <div className={`${theme.drawer.backgroundBlur} ${isCartDrawerOpen ? "backdrop-blur-lg" : ""} `}></div>
      <Drawer anchor="right" open={openCart} onClose={() => setIsCartDrawerOpen(false)}>
        <div id="cartOffCanvas" aria-labelledby="cartLabel" className={theme.drawer.container} ref={cartDrawerRef}>
          <div className={theme.drawer.menuSection}>
            <h5 id="cartLabel" className={theme.drawer.menuTopic}>
              Shopping Cart
            </h5>
            <button type="button" className={theme.drawer.menuButton} onClick={onCartClose}>
              <Close />
            </button>
          </div>
          <div className={styles.drawer.contentContainer}>
            {isCartEmpty ? ( // Render animation if cart is empty
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
              // Render product details if cart is not empty
              <CartContent cartItems={cartItems} />
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CartDrawer;
