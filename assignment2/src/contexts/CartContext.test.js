import React from "react";
import toast from "react-hot-toast";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, CartContext } from "./CartContext";

jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  custom: jest.fn(),
}));

beforeEach(() => {
  localStorage.clear();
});
const renderCartHook = () =>
  renderHook(() => React.useContext(CartContext), { wrapper: CartProvider });

describe("CartContext", () => {
  const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;
  describe("localStorage integration", () => {
    it("initializes cart from localStorage", () => {
      localStorage.setItem(
        "cart",
        JSON.stringify([{ id: 2, title: "Saved", price: 20, quantity: 1 }])
      );
      const { result } = renderCartHook();
      expect(result.current.cartItems).toEqual([
        { id: 2, title: "Saved", price: 20, quantity: 1 },
      ]);
    });

    it("persists items to localStorage when adding", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart(
          { id: 1, title: "Test Product", price: 10 },
          2
        );
      });
      expect(localStorage.getItem("cart")).toContain("Test Product");
    });

    it("persists updated quantities", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 3, title: "QtyTest", price: 5 }, 2);
        result.current.updateQuantity(3, 5);
      });
      const stored = JSON.parse(localStorage.getItem("cart"));
      expect(stored[0].quantity).toBe(5);
    });

    it("persists cleared cart", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 4, title: "ClearTest", price: 12 }, 1);
        result.current.clearCart();
      });
      expect(localStorage.getItem("cart")).toBe("[]");
    });
  });

  describe("cart operations", () => {
    it("adds item to cart", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 1, title: "Product 1", price: 10 }, 2);
      });
      expect(result.current.cartItems).toEqual([
        { id: 1, title: "Product 1", price: 10, quantity: 2 },
      ]);
    });

    it("increments quantity if same product is added again", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 2, title: "Product 2", price: 5 }, 4);
        result.current.addToCart({ id: 2, title: "Product 2", price: 5 }, 1);
      });
      expect(result.current.cartItems).toEqual([
        { id: 2, title: "Product 2", price: 5, quantity: 5 },
      ]);
    });

    it("removes item from cart", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 3, title: "Product 3", price: 7 }, 3);
        result.current.removeFromCart(3);
      });
      expect(result.current.cartItems).toEqual([]);
    });

    it("does nothing when removing non-existent item", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.removeFromCart(999);
      });

      expect(result.current.cartItems).toEqual([]);
    });

    it("updates quantity", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 4, title: "Product 4", price: 8 }, 5);
        result.current.updateQuantity(4, 10);
      });
      expect(result.current.cartItems).toEqual([
        { id: 4, title: "Product 4", price: 8, quantity: 10 },
      ]);
      expect(JSON.parse(localStorage.getItem("cart"))[0].quantity).toBe(10);
    });

    it("does nothing if updating non-existent item", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.updateQuantity(999, 5);
      });
      expect(result.current.cartItems).toEqual([]);
    });

    it("clears cart", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 5, title: "Product 5", price: 12 }, 1);
        result.current.clearCart();
      });
      expect(result.current.cartItems).toEqual([]);
      expect(localStorage.getItem("cart")).toBe("[]");
    });

    it("defaults to quantity 1 if not provided", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 6, title: "DefaultQty", price: 5 });
      });
      expect(result.current.cartItems[0].quantity).toBe(1);
    });
  });

  describe("toasts", () => {
    it("shows success toast when item is added", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 9, title: "Product 9", price: 11 }, 3);
      });
      expect(toast.success).toHaveBeenCalledWith("3 × Product 9 added to cart");
    });

    it("shows custom toast when clearing cart", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 5, title: "Clearable", price: 25 }, 1);
        result.current.clearCart();
      });
      expect(toast.custom).toHaveBeenCalled();
    });

    it("shows custom toast when removing from cart", () => {
      const { result } = renderCartHook();
      act(() => {
        result.current.addToCart({ id: 4, title: "To Remove", price: 15 }, 1);
      });
      act(() => {
        result.current.removeFromCart(4);
      });
      expect(toast.custom).toHaveBeenCalled();
    });
  });
});
