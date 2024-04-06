import { Delete } from "@mui/icons-material";
import { IProduct } from "../../../models";
import { formatPrice } from "../../../utils/priceFormat";
import { useCart } from "../../../components";

const CartContent = ({ cartItems }: { cartItems: IProduct[] }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="px-6">
      {cartItems.map((item, _index) => (
        <div className="flex border-b-[1px] border-neutral-400 py-4" key={item._id}>
          <div className="w-1/4">
            <img src={item.image} alt={item.name} className="w-full rounded-md" />
          </div>
          <div className="mx-6 flex flex-1 flex-col justify-center">
            <div>
              <p className="mb-1 text-sm text-neutral-300">{item.mainCategory}</p>
              <h6 className="text-md mb-1 font-medium">{item.name}</h6>
              <p className="text-sm font-bold text-primary-100">
                {item.quantity} * {formatPrice(item.unitPrice)}
              </p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => removeFromCart(item._id)}>
                <Delete className="text-red-600" fontSize="medium" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
