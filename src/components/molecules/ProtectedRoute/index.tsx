import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Box, Modal, Typography, Button } from "@mui/material";
import logo from "../../../assests/logo/main_logo.png";
import UserLogin from "../../../pages/auth/login";
import UserSignup from "../../../pages/auth/signup";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    setOpen(false);
    setIsLoginOpen(true);
  };

  const handleSignupClick = () => {
    setOpen(false);
    setIsSignupOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
    navigate("/fashion-recommender");
  };

  const handleCloseSignup = () => {
    setIsSignupOpen(false);
    navigate("/fashion-recommender");
  };

  useEffect(() => {
    if (!cookies.token) {
      setOpen(true);
      const path = location.pathname.includes("/auth") ? location.pathname : `${location.pathname}/auth`;
      navigate(path, { replace: true });
    } else {
      const path = location.pathname.replace("/auth", "");
      navigate(path, { replace: true });
    }
  }, [cookies.token, navigate, location.pathname]);

  const handleClose = () => {
    setOpen(false);
    const path = location.pathname.replace("/auth", "/");
    navigate(path);
  };

  if (!cookies.token) {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          BackdropProps={{
            style: {
              backdropFilter: "blur(20px)",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#00375C",
              boxShadow: 24,
              px: 8,
              py: 6,
              outline: 0,
              borderRadius: "5px",
              color: "white",
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="h-auto xs:max-w-44 lg:max-w-80"
              style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
            />
            <Typography
              id="modal-modal-title"
              sx={{ fontSize: "40px", fontWeight: "700", mt: "34px", textAlign: "center" }}
            >
              Unlock the Closet of Tomorrow
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2, mb: 6, textAlign: "center", fontWeight: 500 }}>
              Wanna dive into the world of AI-driven fashion? You gotta be part of the club first! Join us on this
              stylish journey by logging in or signing up. It's your ticket to the future of fashion. Don't miss out!
            </Typography>
            <div className="flex justify-between">
              <Button
                onClick={handleLoginClick}
                variant="contained"
                sx={{
                  py: 2,
                  bgcolor: "inherit",
                  border: "1px solid white",
                  "&:hover": {
                    bgcolor: "#0099A6",
                    border: "none",
                  },
                  flex: 1,
                  mr: 4,
                }}
              >
                Have an Account
              </Button>
              <Button
                onClick={handleSignupClick}
                variant="contained"
                sx={{
                  py: 2,
                  bgcolor: "#00BBDB",
                  "&:hover": {
                    bgcolor: "#0099A6",
                  },
                  flex: 1,
                }}
              >
                Register Now
              </Button>
            </div>
          </Box>
        </Modal>
        <UserLogin open={isLoginOpen} onClose={handleCloseLogin} />
        <UserSignup openSignup={isSignupOpen} onClose={handleCloseSignup} />
      </>
    );
  }

  return children;
};

export default ProtectedRoute;
