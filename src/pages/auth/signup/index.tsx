import { useState, useEffect, useRef } from "react";
import Drawer from "@mui/material/Drawer";
import { Close } from "@mui/icons-material";
import Lottie from "react-lottie";
import * as theme from "../../../theme";
import * as styles from "../styles";
import signupAnimation from "../../../assests/auth/signup.json";
import AxiosInstance from "../../../config/axiosInstance";
import { ThemedToggleButton } from "../../../components/atoms/ToggleSwitch";
// import UserLogin from "../login";

interface ErrorState {
  fullName?: string;
  confirmPassword?: string;
  [key: string]: string | undefined;
}

const UserSignup = ({ openSignup, onClose }: { openSignup: boolean; onClose: () => void }) => {
  const [isSignupDrawerOpen, setIsSignupDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [isDateInput, setIsDateInput] = useState(false);
  const [errors, setErrors] = useState<ErrorState>({});
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoginOpen, setIsLoginOpen] = useState(false);

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
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setDob("");
      setGender("");
      setErrors({});
      setIsLoading(false);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSignupDrawerOpen, onClose]);

  const handleGenderChange = (newGender: string | null) => {
    if (newGender !== null) {
      setGender(newGender);
    }
  };

  const validateSignupForm = () => {
    let isValid = true;
    const newErrors: ErrorState = {};
    const dobDate = new Date(dob);
    const cutoffDate = new Date("2014-01-01");
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !phone.trim() ||
      !dob.trim() ||
      !gender.trim()
    ) {
      newErrors["formValidation"] = "Please fill all fields";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors["passwordValidation"] = "Passwords do not match!";
      isValid = false;
    } else if (phone.length !== 10) {
      newErrors["phoneValidation"] = "Phone number is invalid";
      isValid = false;
    } else if (dobDate >= cutoffDate) {
      newErrors["dobValidation"] = "Hey, time traveler! provide your actual birth date";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateSignupForm()) {
      return;
    }

    setIsLoading(true);

    const userData = {
      fullName,
      email,
      password,
      phone,
      dob: dob.toString().split("T")[0],
      gender,
      isAdmin: "false",
      activeState: true,
    };

    try {
      const response = await AxiosInstance.post("/users/register", userData);
      if (response.status === 201) {
        alert("Congratualations, Your Account is setup successfuly!");
      }
    } catch (error) {
      alert(`Registration Failed, Try Again!`);
    } finally {
      setIsLoading(false);
      onClose();
      // setIsLoginOpen(true);
    }
  };

  // const handleCloseLogin = () => {
  //   setIsLoginOpen(false);
  // };

  return (
    <>
      <div className={`${theme.drawer.backgroundBlur} ${isSignupDrawerOpen ? "backdrop-blur-lg" : ""} `}></div>
      <Drawer anchor="right" open={openSignup} onClose={() => setIsSignupDrawerOpen(false)}>
        <div
          id="handleSignupOffcanvas"
          aria-labelledby="handleSignupLabel"
          className={theme.drawer.container}
          ref={drawerRef}
        >
          <div className={theme.drawer.menuSection}>
            <h5 id="handleSignupLabel" className={theme.drawer.menuTopic}>
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
                <p className={styles.form.topic}>Hello Fashionista!</p>
                <p className={styles.form.text}>
                  Sign up to unlock exclusive styles. Start your stylish journey with us today!
                </p>
                <form className="mt-4" onSubmit={handleSignup}>
                  <input
                    id="fullName"
                    type="text"
                    className={`${theme.form.input} ${styles.form.input}`}
                    placeholder="Full Name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                  <input
                    id="email"
                    type="email"
                    className={`${theme.form.input} ${styles.form.input} mt-4`}
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                  <input
                    id="password"
                    type="password"
                    className={`${theme.form.input} ${styles.form.input} mt-4`}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`${theme.form.input} ${styles.form.input} mt-4`}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                  />
                  {errors.passwordValidation && (
                    <div className={styles.form.validation}>{errors.passwordValidation}</div>
                  )}
                  <ThemedToggleButton gender={gender} onChange={handleGenderChange} />
                  <input
                    id="phone"
                    type="text"
                    className={`${theme.form.input} ${styles.form.input} mt-4`}
                    placeholder="Phone"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                  {errors.phoneValidation && <div className={styles.form.validation}>{errors.phoneValidation}</div>}
                  {isDateInput ? (
                    <input
                      type="date"
                      className={`${theme.form.input} ${styles.form.input} mt-4`}
                      value={dob.toString().split("T")[0]}
                      onChange={e => setDob(e.target.value)}
                      onBlur={() => setIsDateInput(false)}
                    />
                  ) : (
                    <input
                      id="dob"
                      type="text"
                      placeholder="Date of Birth"
                      className={`${theme.form.input} ${styles.form.input} mt-4`}
                      onFocus={() => setIsDateInput(true)}
                    />
                  )}
                  {errors.dobValidation && <div className={styles.form.validation}>{errors.dobValidation}</div>}
                  {errors.formValidation && <div className={styles.form.validation}>{errors.formValidation}</div>}
                  <button type="submit" disabled={isLoading} className={`${theme.form.button} ${styles.form.button}`}>
                    {isLoading ? "Creating Account..." : "Create New Account"}
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
