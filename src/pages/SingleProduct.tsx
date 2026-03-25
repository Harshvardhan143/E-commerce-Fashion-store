import {
  Button,
  Dropdown,
  ProductItem,
  QuantityInput,
  StandardSelectInput,
} from "../components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import WithSelectInputWrapper from "../utils/withSelectInputWrapper";
import WithNumberInputWrapper from "../utils/withNumberInputWrapper";
import { formatCategoryName } from "../utils/formatCategoryName";
import toast from "react-hot-toast";
import customFetch from "../axios/custom";

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | any>(null);
  // defining default values for input fields
  const [size, setSize] = useState<string>("xs");
  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  // defining HOC instances
  const SelectInputUpgrade = WithSelectInputWrapper(StandardSelectInput);
  const QuantityInputUpgrade = WithNumberInputWrapper(QuantityInput);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await customFetch(`/products/${params.id}`);
        setSingleProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await customFetch("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleAddToCart = () => {
    if (singleProduct) {
      dispatch(
        addProductToTheCart({
          id: singleProduct.id + size + color,
          image: singleProduct.image,
          title: singleProduct.title,
          category: singleProduct.category,
          price: singleProduct.price,
          quantity,
          size,
          color,
          popularity: singleProduct.popularity,
          stock: singleProduct.stock,
        })
      );
      toast.success("Product added to the cart");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5 max-[400px]:px-3">
      <div className="grid grid-cols-3 gap-x-8 max-lg:grid-cols-1">
        <div className="lg:col-span-2">
          <img
            src={`/assets/${singleProduct?.image}`}
            alt={singleProduct?.title}
          />
        </div>
        <div className="w-full flex flex-col gap-6 mt-9">
          <div className="flex flex-col gap-2">
            <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold">
              {formatCategoryName(singleProduct?.category || "")}
            </span>
            <h1 className="text-3xl md:text-4xl font-serif text-primaryDeep leading-tight">{singleProduct?.title}</h1>
            <p className="text-xl font-medium text-primaryDeep mt-1">₹{singleProduct?.price}</p>
          </div>
          <div className="flex flex-col gap-2">
            <SelectInputUpgrade
              selectList={[
                { id: "xs", value: "XS" },
                { id: "sm", value: "SM" },
                { id: "m", value: "M" },
                { id: "lg", value: "LG" },
                { id: "xl", value: "XL" },
                { id: "2xl", value: "2XL" },
              ]}
              value={size}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSize(() => e.target.value)
              }
            />
            <SelectInputUpgrade
              selectList={[
                { id: "black", value: "BLACK" },
                { id: "red", value: "RED" },
                { id: "blue", value: "BLUE" },
                { id: "white", value: "WHITE" },
                { id: "rose", value: "ROSE" },
                { id: "green", value: "GREEN" },
              ]}
              value={color}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setColor(() => e.target.value)
              }
            />

            <QuantityInputUpgrade
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuantity(() => parseInt(e.target.value))
              }
            />
          </div>
          <div className="flex flex-col gap-3">
            <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />
            <p className="text-secondaryBrown text-sm text-right">
              Delivery estimated on the Friday, July 26
            </p>
          </div>
            <Dropdown dropdownTitle="Composition & Care">
              {singleProduct?.description || "Crafted from a premium blend of natural fibers and high-performance textiles. Hand wash cold or professional dry clean only. Iron on low heat if necessary."}
            </Dropdown>

            <Dropdown dropdownTitle="Product Details">
              Designed with a contemporary silhouette, this piece features refined stitching, reinforced seams for durability, and a signature luxury finish unique to our collection. Each item undergoes rigorous quality inspections.
            </Dropdown>

            <Dropdown dropdownTitle="Delivery & Returns">
              Complimentary carbon-neutral shipping on all orders. Expected delivery within 3-5 business days. We offer hassle-free returns within 30 days of purchase for all unworn and unaltered items.
            </Dropdown>
        </div>
      </div>

      {/* similar products */}
      <div className="mt-24 mb-24">
        <div className="flex flex-col items-center justify-center mb-12 gap-2">
          <span className="text-secondaryBrown uppercase tracking-[0.3em] text-xs font-semibold">Explore More</span>
          <h2 className="text-primaryDeep text-3xl md:text-4xl font-serif text-center">
            Similar Products
          </h2>
          <div className="w-12 h-[1px] bg-secondaryBrown/40 mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {products
            .filter((p: Product) => p.id !== singleProduct?.id)
            .sort((a: Product, b: Product) => {
              const aIsSimilar = a.category === singleProduct?.category ? 1 : 0;
              const bIsSimilar = b.category === singleProduct?.category ? 1 : 0;
              return bIsSimilar - aIsSimilar; // Rank similar categories first
            })
            .slice(0, 4)
            .map((product: Product) => (
              <ProductItem
                key={product?.id}
                id={product?.id}
                image={product?.image}
                title={product?.title}
                category={product?.category}
                price={product?.price}
                popularity={product?.popularity}
                stock={product?.stock}
              />
            ))}
        </div>
      </div>
    </div>
  );
};
export default SingleProduct;
