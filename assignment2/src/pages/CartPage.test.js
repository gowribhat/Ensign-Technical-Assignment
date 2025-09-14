import { render, screen, fireEvent, within } from "@testing-library/react";
import { CartContext } from "../contexts/CartContext";
import CartPage from "./CartPage";

describe("CartPage", () => {
  const renderWithCart = (cartItems, actions = {}) => {
    const defaultActions = {
      removeFromCart: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    };

    return render(
      <CartContext.Provider
        value={{ cartItems, ...defaultActions, ...actions }}
      >
        <CartPage />
      </CartContext.Provider>
    );
  };

  it("renders empty cart message when no items", () => {
    renderWithCart([]);

    expect(
      screen.getByText("Your cart is empty", { exact: false })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Looks like you haven't made your choice yet!", {
        exact: false,
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/Start Shopping/i)).toHaveAttribute("href", "/");
  });

  it("renders cart items", () => {
    const cartItems = [
      { id: 1, title: "Product 1", price: 10, quantity: 2, image: "img1.png" },
      { id: 2, title: "Product 2", price: 5, quantity: 1, image: "img2.png" },
    ];

    renderWithCart(cartItems);

    // Product titles
    expect(screen.getAllByText("Product 1")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Product 2")[0]).toBeInTheDocument();

    // Check totals
    const productTotals = screen.getAllByTestId("product-subtotal");
    expect(productTotals[0]).toHaveTextContent("$20.00");
    expect(productTotals[1]).toHaveTextContent("$5.00");
  });

  it("renders order summary with delivery fee", () => {
    const cartItems = [
      {
        id: 1,
        title: "Product 1",
        price: 10.65,
        quantity: 2,
        image: "img1.png",
      },
      {
        id: 2,
        title: "Product 2",
        price: 5.32,
        quantity: 1,
        image: "img2.png",
      },
    ];

    renderWithCart(cartItems);

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.09;
    const deliveryFee = 5.99;
    const total = subtotal + tax + deliveryFee;

    // Check values
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

    // Check labels
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("GST (9%)")).toBeInTheDocument();
    expect(screen.getByText("Delivery Fee")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Proceed to Checkout/i })
    ).toBeInTheDocument();
  });

  it("renders order summary with free delivery", () => {
    const cartItems = [
      {
        id: 1,
        title: "Product 1",
        price: 70.76,
        quantity: 2,
        image: "img1.png",
      },
    ];

    renderWithCart(cartItems);

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const tax = subtotal * 0.09;
    const total = subtotal + tax;

    // Check values
    expect(screen.getByTestId("subtotal")).toHaveTextContent(
      `$${subtotal.toFixed(2)}`
    );
    expect(screen.getByTestId("tax")).toHaveTextContent(`$${tax.toFixed(2)}`);
    expect(screen.getByTestId("delivery-fee")).toHaveTextContent(/FREE/i);
    expect(screen.getByTestId("total")).toHaveTextContent(
      `$${total.toFixed(2)}`
    );

    // Check labels
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(screen.getByText("GST (9%)")).toBeInTheDocument();
    expect(screen.getByText("Delivery Fee")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();

    // Checkout button
    expect(
      screen.getByRole("button", { name: /Proceed to Checkout/i })
    ).toBeInTheDocument();
  });

  it("calls updateQuantity when input quantity is changed", () => {
    const cartItems = [
      { id: 1, title: "Product 1", price: 10, quantity: 2, image: "img1.png" },
    ];
    const updateQuantity = jest.fn();

    renderWithCart(cartItems, { updateQuantity });

    const quantityInput = screen.getByTestId("input-1");
    fireEvent.change(quantityInput, { target: { value: "5" } });

    expect(updateQuantity).toHaveBeenCalledWith(1, 5);
  });

  it("calls updateQuantity when increment/decrement buttons are clicked", () => {
    const cartItems = [
      { id: 1, title: "Product 1", price: 10, quantity: 2, image: "img1.png" },
    ];
    const updateQuantity = jest.fn();
    renderWithCart(cartItems, { updateQuantity });

    const incrementButton = screen.getByTestId("increment-1");
    const decrementButton = screen.getByTestId("decrement-1");

    fireEvent.click(incrementButton);
    expect(updateQuantity).toHaveBeenCalledWith(1, 3);

    fireEvent.click(decrementButton);
    expect(updateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("calls removeFromCart when remove button is clicked", () => {
    const items = [
      { id: 1, title: "Product 1", price: 10, quantity: 2, image: "img1.png" },
    ];
    const removeFromCart = jest.fn();

    renderWithCart(items, { removeFromCart });

    fireEvent.click(screen.getAllByTitle("Remove from cart")[0]);
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it("calls clearCart when Clear Cart button is clicked", () => {
    const items = [
      { id: 1, title: "Product 1", price: 10, quantity: 2, image: "img1.png" },
    ];
    const clearCart = jest.fn();

    renderWithCart(items, { clearCart });

    fireEvent.click(screen.getByRole("button", { name: /Clear Cart/i }));
    expect(clearCart).toHaveBeenCalled();
  });
});
