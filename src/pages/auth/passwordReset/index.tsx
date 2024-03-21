import { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import { Close } from "@mui/icons-material";
import Lottie from "react-lottie";
import passwordResetAnimation from "../../../assests/auth/password_reset.json";
import * as theme from "../../../theme";
import * as styles from "../styles";

const PasswordReset = ({ openReset, onClose }: { openReset: boolean; onClose: () => void }) => {
  const [isRestDrawerOpen, setIsRestDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsRestDrawerOpen(openReset);
  }, [openReset]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isRestDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRestDrawerOpen, onClose]);

  return (
    <>
      <div className={`${theme.drawer.backgroundBlur} ${isRestDrawerOpen ? "backdrop-blur-lg" : ""} `}></div>
      <Drawer anchor="right" open={openReset} onClose={() => setIsRestDrawerOpen(false)}>
        <div
          id="passwordResetOffCanvas"
          aria-labelledby="passwordResetLabel"
          className={theme.drawer.container}
          ref={drawerRef}
        >
          <div className={theme.drawer.menuSection}>
            <h5 id="passwordResetLabel" className={theme.drawer.menuTopic}>
              Reset Password
            </h5>
            <button type="button" className={theme.drawer.menuButton} onClick={onClose}>
              <Close />
            </button>
          </div>
          <div className={theme.drawer.contentContainer}>
            <div className={theme.drawer.inner}>
              <div className={styles.animation.container}>
                <Lottie
                  options={{
                    animationData: passwordResetAnimation,
                    loop: true,
                    autoplay: true,
                  }}
                  height={220}
                  width={220}
                />
              </div>
              <div className={styles.form.container}>
                <p className={styles.form.topic}>Forgotten your Password?</p>
                <p className={styles.form.text}>
                  No worries. Let's create a new one. Enter below data to re-new the password.
                </p>
                <form className="mt-4">
                  <input type="text" className={`${theme.form.input} ${styles.form.input} mb-4`} placeholder="Phone" />
                  <input
                    type="password"
                    className={`${theme.form.input} ${styles.form.input} mb-4`}
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    className={`${theme.form.input} ${styles.form.input}`}
                    placeholder="Confirm Password"
                  />
                  <button type="submit" className={`${theme.form.button} ${styles.form.button} mb-4`}>
                    Reset
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default PasswordReset;
