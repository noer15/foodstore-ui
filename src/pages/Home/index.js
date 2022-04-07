import React, { useEffect } from "react";
import {
  SideNav,
  LayoutSidebar,
  Responsive,
  CardProduct,
  Pagination,
  InputText,
  Pill,
} from "upkit";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config";
import {
  fetchProducts,
  setPage,
  goToNextPage,
  goToPrevPage,
  setKeyword,
  setCategory,
  toggleTag,
} from "../../features/Products/actions";
import { addItems, removeItem } from "../../features/Cart/action";
import Cart from "../../components/Cart";
import TopBar from "../../components/TopBar";
import menus from "./menus";
import { tags } from "./tags";

export default function Home() {
  let dispatch = useDispatch();
  // (3) baca state `products` dari Redux store
  let products = useSelector((state) => state.products);
  let cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [
    dispatch,
    products.currentPage,
    products.keyword,
    products.category,
    products.tags,
  ]);

  return (
    <div>
      <LayoutSidebar
        sidebar={
          <SideNav
            items={menus}
            verticalAlign="top"
            onChange={(category) => dispatch(setCategory(category))}
          />
        }
        content={
          <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
            <div className="w-full md:w-3/4 pl-5 pb-10">
              <TopBar />
              <div className="my-4 mx-3">
                <InputText
                  fullRound
                  value={products.keyword}
                  placeholder="cari makanan favoritmu..."
                  fitContainer
                  onChange={(e) => dispatch(setKeyword(e.target.value))}
                />
                <div className="my-5 pl-2 flex w-3/3 overflow-auto pb-5">
                  {tags[products.category].map((tag, index) => {
                    return (
                      <div key={index}>
                        <Pill
                          text={tag}
                          icon={tag.slice(0, 1).toUpperCase()}
                          isActive={products.tags.includes(tag)}
                          onClick={(_) => dispatch(toggleTag(tag))}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4">
                <Responsive desktop={3} items="stretch">
                  {products.data?.map((product, index) => {
                    return (
                      <div key={index} className="p-2">
                        <CardProduct
                          title={product.name}
                          imgUrl={`${config.api_host}/upload/${product.image_url}`}
                          price={product.price}
                          onAddToCart={(_) => dispatch(addItems(product))}
                        />
                      </div>
                    );
                  })}
                </Responsive>
              </div>
              <div className="text-center my-10">
                <Pagination
                  totalItems={products.totalItems}
                  page={products.currentPage}
                  perPage={products.perPage}
                  onChange={(page) => dispatch(setPage(page))}
                  onNext={(_) => dispatch(goToNextPage())}
                  onPrev={(_) => dispatch(goToPrevPage())}
                />
              </div>
            </div>
            <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
              <Cart
                items={cart}
                onItemInc={(item) => dispatch(addItems(item))}
                onItemDec={(item) => dispatch(removeItem(item))}
              />
            </div>
          </div>
        }
        sidebarSize={80}
      />
    </div>
  );
}
