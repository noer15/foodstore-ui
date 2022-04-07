import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEMS, SET_ITEMS } from "./constanta";

export function addItems(item) {
  return {
    type: ADD_ITEM,
    item: {
      ...item,
      product: item.product || item,
    },
  };
}

export function removeItem(item) {
  return {
    type: REMOVE_ITEM,
    item,
  };
}

export function clearItems() {
  return {
    type: CLEAR_ITEMS,
  };
}

export function setItems(items) {
  return {
    type: SET_ITEMS,
    items,
  };
}
