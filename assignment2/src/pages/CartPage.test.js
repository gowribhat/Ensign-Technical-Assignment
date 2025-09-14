import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext } from "../contexts/CartContext";
import CartPage from "./CartPage";

const createCartItem = (id, title, price, quantity = 1) => ({
  id,
  title,
  price,
  quantity,
  image: `img${id}.png`,
});

const calculateTotals = (cartItems) => {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.09;
  const deliveryFee = subtotal > 100 ? 0 : 5.99;
  const total = subtotal + tax + deliveryFee;
  return { subtotal, tax, deliveryFee, total };
};

const renderWithCart = (cartItems, actions = {}) => {
  const defaultActions = {
    removeFromCart: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
  };

  return render(
    <CartContext.Provider value={{ cartItems, ...defaultActions, ...actions }}>
      <CartPage />
    </CartContext.Provider>
  );
};

describe("CartPage", () => {
  describe("Empty Cart UI", () => {
    it("renders empty cart message when no items", () => {
      renderWithCart([]);

      expect(screen.getByText(/Your cart is empty/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Looks like you haven't made your choice yet!/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Start Shopping/i)).toHaveAttribute("href", "/");
    });
  });

  describe("Cart Items Rendering", () => {
    it("renders cart items with correct totals", () => {
      const cartItems = [
        createCartItem(1, "Product 1", 10, 2),
        createCartItem(2, "Product 2", 5, 1),
      ];

      renderWithCart(cartItems);

      // Product titles
      expect(screen.getAllByText("Product 1")[0]).toBeInTheDocument();
      expect(screen.getAllByText("Product 2")[0]).toBeInTheDocument();

      const productTotals = screen.getAllByTestId("product-subtotal");
      expect(productTotals.length).toBe(cartItems.length);

      // Check subtotal values
      expect(productTotals[0]).toHaveTextContent("$20.00");
      expect(productTotals[1]).toHaveTextContent("$5.00");
    });
  });

  describe("Order Summary", () => {
    it("renders order summary with delivery fee", () => {
      const cartItems = [
        createCartItem(1, "Product 1", 10.65, 2),
        createCartItem(2, "Product 2", 5.32, 1),
      ];

      renderWithCart(cartItems);

      const { subtotal, tax, deliveryFee, total } = calculateTotals(cartItems);

      expect(screen.getByTestId("subtotal")).toHaveTextContent(
        `$${subtotal.toFixed(2)}`
      );
      expect(screen.getByTestId("tax")).toHaveTextContent(`$${tax.toFixed(2)}`);
      expect(screen.getByTestId("delivery-fee")).toHaveTextContent(
        `$${deliveryFee.toFixed(2)}`
      );
      expect(screen.getByTestId("total")).toHaveTextContent(
        `$${total.toFixed(2)}`
      );

      // Labels
      ["Subtotal", "GST (9%)", "Delivery Fee", "Total"].forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });

      // Checkout button
      expect(
        screen.getByRole("button", { name: /Proceed to Checkout/i })
      ).toBeInTheDocument();
    });

    it("renders order summary with free delivery", () => {
      const cartItems = [createCartItem(1, "Product 1", 70.76, 2)];

      renderWithCart(cartItems);

      const { subtotal, tax, total } = calculateTotals(cartItems);

      expect(screen.getByTestId("subtotal")).toHaveTextContent(
        `$${subtotal.toFixed(2)}`
      );
      expect(screen.getByTestId("tax")).toHaveTextContent(`$${tax.toFixed(2)}`);
      expect(screen.getByTestId("delivery-fee")).toHaveTextContent(/FREE/i);
      expect(screen.getByTestId("total")).toHaveTextContent(
        `$${total.toFixed(2)}`
      );

      ["Subtotal", "GST (9%)", "Delivery Fee", "Total"].forEach((label) => {
        expect(screen.getByText(label)).toBeInTheDocument();
      });

      expect(
        screen.getByRole("button", { name: /Proceed to Checkout/i })
      ).toBeInTheDocument();
    });
  });

  describe("Quantity Changes", () => {
    it("calls updateQuantity when input quantity is changed", () => {
      const cartItems = [createCartItem(1, "Product 1", 10, 2)];
      const updateQuantity = jest.fn();

      renderWithCart(cartItems, { updateQuantity });

      // Verify input exists
      const quantityInput = screen.getByTestId("input-1");
      expect(quantityInput).toBeInTheDocument();

      fireEvent.change(quantityInput, { target: { value: "5" } });
      expect(updateQuantity).toHaveBeenCalledWith(1, 5);
    });

    it("calls updateQuantity when increment/decrement buttons are clicked", () => {
      const cartItems = [createCartItem(1, "Product 1", 10, 2)];
      const updateQuantity = jest.fn();

      renderWithCart(cartItems, { updateQuantity });

      const incrementButton = screen.getByTestId("increment-1");
      const decrementButton = screen.getByTestId("decrement-1");

      expect(incrementButton).toBeInTheDocument();
      expect(decrementButton).toBeInTheDocument();

      fireEvent.click(incrementButton);
      expect(updateQuantity).toHaveBeenCalledWith(1, 3);

      fireEvent.click(decrementButton);
      expect(updateQuantity).toHaveBeenCalledWith(1, 1);
    });
  });

  describe("Remove & Clear Cart Actions", () => {
    it("calls removeFromCart when remove button is clicked", () => {
      const cartItems = [createCartItem(1, "Product 1", 10, 2)];
      const removeFromCart = jest.fn();

      renderWithCart(cartItems, { removeFromCart });

      const removeButton = screen.getAllByTitle("Remove from cart")[0];
      expect(removeButton).toBeInTheDocument();

      fireEvent.click(removeButton);
      expect(removeFromCart).toHaveBeenCalledWith(1);
    });

    it("calls clearCart when Clear Cart button is clicked", () => {
      const cartItems = [createCartItem(1, "Product 1", 10, 2)];
      const clearCart = jest.fn();

      renderWithCart(cartItems, { clearCart });

      const clearCartButton = screen.getByRole("button", {
        name: /Clear Cart/i,
      });
      expect(clearCartButton).toBeInTheDocument();

      fireEvent.click(clearCartButton);
      expect(clearCart).toHaveBeenCalled();
    });
  });
});
