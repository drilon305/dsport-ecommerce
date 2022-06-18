import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CLEAR_CART,
  CHANGE_FREQUENCY,
  TOGGLE_SUBSCRIPTIONS,
} from "./action-types"

export const addToCart = (variant, qty, name, stock, subscription) => ({
  type: ADD_TO_CART,
  payload: { variant, qty, name, stock, subscription },
})

export const removeFromCart = (variant, qty) => ({
  type: REMOVE_FROM_CART,
  payload: { variant, qty },
})

export const clearCart = () => ({
  type: CLEAR_CART,
})

export const changeFrequency = (variant, frequency) => ({
  type: CHANGE_FREQUENCY,
  payload: { variant, frequency },
})

export const toggleSubscriptions = (variant, frequency) => ({
    type: TOGGLE_SUBSCRIPTIONS,
    payload: { variant, frequency }
})