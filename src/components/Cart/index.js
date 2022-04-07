import { arrayOf, number, oneOfType, shape, string, func } from "prop-types";
import React from "react";
import FaArrowRight from "@meronex/icons/fa/FaArrowRight";
import FaCartPlus from "@meronex/icons/fa/FaCartPlus";
import { Button, CardItem } from "upkit";
import { config } from "../../config";
import { sumPrice } from "../../utils/sumPrice";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router";

export default function Cart({ items, onItemInc, onItemDec, onCheckout }) {
  let total = sumPrice(items);
  let navigate = useNavigate();
  return (
    <div className="p-2">
      <div className="text-3xl mb-5 flex items-center text-red-700">
        <FaCartPlus />
        <div className="ml-2">Keranjang</div>
      </div>
      {!items.length ? (
        <div className="text-center text-sm text-red-900">Cart is empty</div>
      ) : null}
      {items.map((item, index) => {
        return (
          <div key={index} className="mb-4">
            <CardItem
              imgUrl={`${config.api_host}/upload/${item.image_url}`}
              name={item.name}
              qty={item.qty}
              color="orange"
              onInc={() => onItemInc(item)}
              onDec={() => onItemDec(item)}
            />
          </div>
        );
      })}
      <div className="px-2 border-b mt-5 pb-5">
        <div className="flex justify-between text-lg font-semibold text-red-500 my-2">
          <div className="">Total :</div>
          <div>{formatPrice(total)}</div>
        </div>
        <Button
          text="Checkout"
          fitContainer
          iconAfter={<FaArrowRight />}
          disabled={!items.length}
          onClick={() => navigate("/checkout")}
        />
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: arrayOf(
    shape({
      _id: string.isRequired,
      name: string.isRequired,
      qty: oneOfType([string, number]).isRequired,
    })
  ),
  onItemInc: func,
  onItemDec: func,
  onCheckout: func,
};
