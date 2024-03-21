import { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import Lottie from "react-lottie";
import * as theme from "../../../theme";
import * as styles from "../styles";
import signupAnimation from "../../../assests/auth/signup.json";
import { Close } from "@mui/icons-material";
// import UserLogin from "../login";

const UserSignup = ({ openSignup, onClose }: { openSignup: boolean; onClose: () => void }) => {
  const [isSignupDrawerOpen, setIsSignupDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsSignupDrawerOpen(openSignup);
  }, [openSignup]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isSignupDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSignupDrawerOpen, onClose]);

  return (
    <>
      <div className={`${theme.drawer.backgroundBlur} ${isSignupDrawerOpen ? "backdrop-blur-lg" : ""} `}></div>
      <Drawer anchor="right" open={openSignup} onClose={() => setIsSignupDrawerOpen(false)}>
        <div
          id="userSignupOffcanvas"
          aria-labelledby="userSignupLabel"
          className={theme.drawer.container}
          ref={drawerRef}
        >
          <div className={theme.drawer.menuSection}>
            <h5 id="userSignupLabel" className={theme.drawer.menuTopic}>
              Signup
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
                    animationData: signupAnimation,
                    loop: true,
                    autoplay: true,
                  }}
                  height={220}
                  width={220}
                />
              </div>
              <div className={styles.form.container}>
                <p className={styles.form.topic}>Hello Stranger!</p>
                <p className={styles.form.text}>
                  Glad to see you joining with us. Please fill up the fields to set your account up.
                </p>
                <form className="mt-4">
                  <input
                    type="text"
                    className={`${theme.form.input} ${styles.form.input} mb-4`}
                    placeholder="Full Name"
                  />
                  <input type="email" className={`${theme.form.input} ${styles.form.input} mb-4`} placeholder="Email" />
                  <input
                    type="password"
                    className={`${theme.form.input} ${styles.form.input} mb-4`}
                    placeholder="Password"
                  />
                  <input
                    type="password"
                    className={`${theme.form.input} ${styles.form.input} mb-4`}
                    placeholder="Confirm Password"
                  />
                  <input type="text" className={`${theme.form.input} ${styles.form.input} mb-4`} placeholder="Phone" />
                  <input
                    type="date"
                    className={`${theme.form.input} ${styles.form.input}`}
                    placeholder="Date of Birth"
                  />
                  <button type="submit" className={`${theme.form.button} ${styles.form.button}`}>
                    Create New Account
                  </button>
                  <div className={`${styles.form.linkSection} mb-4`}>
                    <p>Already have an Account?</p>
                    <a
                      href="/"
                      className={styles.form.link}
                      onClick={e => {
                        e.preventDefault();
                        // handleLoginClick();
                        onClose();
                      }}
                    >
                      Login
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      {/* <UserLogin open={isLoginOpen} onClose={handleCloseLogin} /> */}
    </>
  );
};

export default UserSignup;
