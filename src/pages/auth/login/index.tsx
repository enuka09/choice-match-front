import React, { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import { Close } from "@mui/icons-material";
import Lottie from "react-lottie";
import * as theme from "../../../theme";
import * as styles from "../styles";
import loginAnimation from "../../../assests/auth/login.json";
import UserSignup from "../signup";
import PasswordReset from "../passwordReset";
import { Routes } from "../../../routing/routes";
import AxiosInstance from "../../../config/axiosInstance";

interface ErrorState {
  email?: string;
  password?: string;
  [key: string]: string | undefined;
}

const UserLogin = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});

  useEffect(() => {
    setIsDrawerOpen(open);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      setEmail("");
      setPassword("");
      setErrors({});
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDrawerOpen, onClose]);

  const handleSignupClick = () => {
    setTimeout(() => {
      setIsSignupOpen(true);
    }, 300);
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
  };

  const handleResetClick = () => {
    setTimeout(() => {
      setIsResetOpen(true);
    }, 300);
  };

  const handleCloseReset = () => {
    setIsResetOpen(false);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: ErrorState = {};
    if (!email.trim() || !password.trim()) {
      newErrors["formValidation"] = "Please fill all fields";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await AxiosInstance.post("/users/login", { email, password });
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 2);

      const cookieValue =
        encodeURIComponent("token") +
        "=" +
        encodeURIComponent(response.data.token) +
        "; expires=" +
        expirationDate.toUTCString() +
        "; path=/";

      document.cookie = cookieValue;
      console.log("Login Successful", response.data);

      setEmail("");
      setPassword("");
      if (response.data.isAdmin === "true") {
        window.location.href = Routes.VIEW_PRODUCTS;
      } else {
        window.location.href = Routes.ROOT;
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed");
    }
  };

  return (
    <>
      <div className={`${theme.drawer.backgroundBlur} ${isDrawerOpen ? "backdrop-blur-lg" : ""} `}></div>
      <Drawer anchor="right" open={open} onClose={() => setIsDrawerOpen(false)}>
        <div
          id="userLoginOffcanvas"
          aria-labelledby="userLoginLabel"
          className={theme.drawer.container}
          ref={drawerRef}
        >
          <div className={theme.drawer.menuSection}>
            <h5 id="userLoginLabel" className={theme.drawer.menuTopic}>
              Login
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
                    animationData: loginAnimation,
                    loop: true,
                    autoplay: true,
                  }}
                  height={220}
                  width={220}
                />
              </div>
              <div className={styles.form.container}>
                <p className={styles.form.topic}>Good to see you Again!</p>
                <p className={styles.form.text}>
                  Let's get you connected and explore what's new. Please Enter your login data.
                </p>
                <form className="mt-4" onSubmit={handleLogin}>
                  <input
                    type="email"
                    className={`${theme.form.input} ${styles.form.input} mb-4`}
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    className={`${theme.form.input} ${styles.form.input} mb-1`}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  {errors.formValidation && <div className={styles.form.validation}>{errors.formValidation}</div>}
                  <div className="text-right">
                    <button
                      className={styles.form.link}
                      onClick={e => {
                        e.preventDefault();
                        handleResetClick();
                        onClose();
                      }}
                    >
                      Forget Password?
                    </button>
                  </div>
                  <button type="submit" className={`${theme.form.button} ${styles.form.button}`}>
                    Login
                  </button>
                  <div className={styles.form.linkSection}>
                    <p>Don't have an Account?</p>
                    <button
                      className={styles.form.link}
                      onClick={e => {
                        e.preventDefault();
                        handleSignupClick();
                        onClose();
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <UserSignup openSignup={isSignupOpen} onClose={handleCloseSignup} />
      <PasswordReset openReset={isResetOpen} onClose={handleCloseReset} />
    </>
  );
};

export default UserLogin;
