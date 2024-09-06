import {create} from 'zustand'
import {CartItemType} from '../interfaces'

type CartType = {
    cart: CartItemType[]
    addItem: (item: CartItemType) => void
    removeItem: (id: number) => void
    itemExist: (id: number) => boolean
    updateQuantity: (id: number, value: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartType>((set, get) => ({
    cart: [],
    addItem: (item: CartItemType) => {
        set((state: CartType) => {
            return {cart: [...state.cart, item]}
        })
    },
    removeItem: (id: number) => {
        set((state: CartType) => {
            return {cart: state.cart.filter((item: CartItemType) => item.id !== id)}
        })
    },
    itemExist: (id: number) => {
        return get().cart.some((item: CartItemType) => item.id === id)
    },
    updateQuantity: (id: number, value: number) => {
        set((state: CartType) => {
            const updatedCart = state.cart.map((item: CartItemType) => {
                if (item.id === id) {
                    return {...item, quantity: value}
                }
                return item
            })
            return {cart: updatedCart}
        })
    },
    clearCart: () => {
        set({cart: []})
    },
}))
