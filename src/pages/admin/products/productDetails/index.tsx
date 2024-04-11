import { IProduct } from "../../../../models";
import { ThemedTextFieldDisabled, ThemedTextAreaDisabled } from "../../../../components";
import { formatPrice } from "../../../../utils/priceFormat";

const ProductContent = (product: IProduct) => (
  <>
    <div className="mb-4 mt-2 flex gap-4">
      <div className="w-1/4">
        <img src={product.image} alt={product.name} className="h-auto max-w-full" />
      </div>
      <div className="w-full flex-1">
        <div className="flex flex-col gap-4">
          <ThemedTextFieldDisabled disabled name="name" value={product.name} label="Product Name" />
          <ThemedTextAreaDisabled disabled name="description" value={product.description || ""} label="Description" />
        </div>
      </div>
    </div>
    <div className="flex flex-col gap-4">
      <ThemedTextFieldDisabled disabled name="unitPrice" value={formatPrice(product.unitPrice)} label="Price" />
      <div className="flex gap-4">
        <ThemedTextFieldDisabled disabled name="mainCategory" value={product.mainCategory} label="Main Category" />
        <ThemedTextFieldDisabled disabled name="subCategory" value={product.subCategory} label="Sub Category" />
        <ThemedTextFieldDisabled disabled name="brand" value={product.brand} label="Brand" />
      </div>
      <div className="flex gap-4">
        <ThemedTextFieldDisabled disabled name="color" value={product.color.join(", ")} label="Colors" />
        <ThemedTextFieldDisabled disabled name="size" value={product.size.join(", ")} label="Sizes" />
      </div>
      <div className="flex gap-4">
        <ThemedTextFieldDisabled
          disabled
          name="qtyOnHand"
          value={product.qtyOnHand.toString()}
          label="Quantity on Hand"
        />
        <ThemedTextFieldDisabled
          disabled
          name="isFeatured"
          value={product.isFeatured ? "Yes" : "No"}
          label="Featured Item"
        />
      </div>
      <ThemedTextFieldDisabled disabled name="dateCreated" value={product.dateCreated || ""} label="Date Created" />
    </div>
  </>
);

export default ProductContent;
