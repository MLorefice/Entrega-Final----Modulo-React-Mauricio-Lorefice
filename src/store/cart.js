// src/store/cart.js
import { persist } from "zustand/middleware";
import { create } from "zustand";

export const manejarCarrito = create(
  persist(
    (set) => ({
      carrito: [],

      agregar: (producto) =>
        set((state) => {
          const itemExistente = state.carrito.find((item) => item.id === producto.id);
          if (itemExistente) {

            return {
              carrito: state.carrito.map((item) =>
                item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
              ),
            };
          } else {

            return {
              carrito: [...state.carrito, { ...producto, cantidad: 1 }],
            };
          }
        }),

      quitarUno: (id) =>
        set((state) => {
          const itemExistente = state.carrito.find((item) => item.id === id);
          if (itemExistente && itemExistente.cantidad > 1) {

            return {
              carrito: state.carrito.map((item) =>
                item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
              ),
            };
          } else {

            return {
              carrito: state.carrito.filter((p) => p.id !== id),
            };
          }
        }),


      eliminar: (id) =>
        set((state) => ({
          carrito: state.carrito.filter((p) => p.id !== id),
        })),
    }),
    {
      name: "carrito",
    }
  )
);