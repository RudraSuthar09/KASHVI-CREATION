import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";
import { emptyCart } from "@/store/shop/cart-slice"; // Uncommented this line

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const img="https://res.cloudinary.com/doytxxdrl/image/upload/v1739934597/Screenshot_2025-02-19_083638_y6f8ht.png"

  const totalCartAmount = cartItems?.items?.reduce(
    (sum, currentItem) =>
      sum +
        currentItem?.quantity,
    0
  ) || 0;

  function handleGenerateInvoice() {
    if (!cartItems?.items?.length) {
      toast({ title: "Your cart is empty. Please add items to proceed", variant: "destructive" });
      return;
    }
    if (!currentSelectedAddress) {
      toast({ title: "Please select one address to proceed.", variant: "destructive" });
      return;
    }

    const orderData = {
      userId: user?._id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(({ productId, title, image, quantity }) => ({
        productId,
        title,
        image,
        quantity,
      })),
      addressInfo: {
        name: currentSelectedAddress?.name,
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      orderDate: new Date(),
      orderUpdateDate: new Date(),
    };

    dispatch(createNewOrder(orderData))
      .then((data) => {
        if (data?.payload?.success) {
          toast({ title: "Order placed successfully." });
          dispatch(emptyCart()); // Dispatch emptyCart to remove items from the cart
          navigate("/shop/checkout/invoice", {
            state: { user, currentSelectedAddress, cartItems, orderId: data.payload.orderId },
          });
        } else {
          toast({ title: "Failed to place order. Try again.", variant: "destructive" });
        }
      })
      .catch((error) => {
        console.error("Order creation error:", error);
        toast({ title: "An error occurred while placing the order.", variant: "destructive" });
      });
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" alt="Checkout" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.map((item) => (
            <UserCartItemsContent cartItem={item} key={item.productId} />
          ))}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total Quantity</span>
              <span className="font-bold">{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full flex flex-col gap-3">
            <Button onClick={handleGenerateInvoice} className="w-full bg-green-500 hover:bg-green-600">
              Generate Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;