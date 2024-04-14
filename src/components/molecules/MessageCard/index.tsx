import { Card, Button } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../components";
import { Routes } from "../../../routing/routes";

const MessageCard = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const orderSuccessMessageJson =
    localStorage.getItem("orderSuccessMessage") ?? '{"title": "Default Title", "message": "Default Message"}';
  const { title, message } = JSON.parse(orderSuccessMessageJson);

  const handleContinueShopping = () => {
    clearCart();
    localStorage.removeItem("orderSuccessMessage");
    navigate(Routes.ROOT);
  };

  return (
    <div className="flex h-screen items-center justify-center rounded-md bg-gray-100">
      <Card
        className="flex h-[22rem] w-[26rem] flex-col items-center justify-center bg-white px-10 py-6"
        style={{
          transition: "transform 0.3s ease-in-out",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <CheckCircle className="mb-4 h-40 w-40 text-green-500" style={{ fontSize: "80px" }} />
        <p className="mb-4 font-serif text-3xl font-semibold text-gray-800">{title}</p>
        <p className="mb-8 text-center text-sm font-medium text-neutral-300">{message}</p>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#22C55E",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#1eb154",
            },
            borderRadius: "3px",
            padding: "10px",
            fontWeight: 800,
          }}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </Button>
      </Card>
    </div>
  );
};

export default MessageCard;
