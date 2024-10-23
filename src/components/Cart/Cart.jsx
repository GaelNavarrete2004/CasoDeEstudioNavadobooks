import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./Cart.css"; // Importamos el archivo CSS
import { useGlobalContext } from "../../context"; // Importamos el contexto

const ShoppingCart = () => {
  const { cart } = useGlobalContext(); // Obtenemos el carrito del contexto
  const [shippingCompany, setShippingCompany] = useState("");
  const [shippingCost, setShippingCost] = useState(0); // Costo de envío dinámico
  const [totalAmount, setTotalAmount] = useState(0); // Total dinámico
  const [shipmentTracking, setShipmentTracking] = useState(""); // Para simular el seguimiento

  // Costos de envío por empresa
  const shippingCosts = {
    dhl: 10.0,
    fedex: 15.0,
    ups: 12.5,
  };

  useEffect(() => {
    const total = cart.reduce((acc, book) => acc + 200, 0); // Todos los libros valen $200
    setTotalAmount(total + shippingCost);
  }, [cart, shippingCost]);

  // Actualizamos el costo de envío cuando se selecciona una empresa
  const handleShippingChange = (event) => {
    const selectedCompany = event.target.value;
    setShippingCompany(selectedCompany);
    setShippingCost(shippingCosts[selectedCompany] || 0); // Asignar costo basado en la empresa seleccionada
  };

  // Simular seguimiento del embarque
  const handleTrackShipment = () => {
    if (shippingCompany) {
      setShipmentTracking(
        `Tu pedido está en camino con ${shippingCompany.toUpperCase()}.`
      );
    } else {
      setShipmentTracking(
        "Por favor selecciona una empresa de envío para hacer seguimiento."
      );
    }
  };

  const handleApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      alert(`Transaction completed by ${details.payer.name.given_name}`);
    });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>

      <div className="cart-grid">
        {/* Columna de productos */}
        <div className="cart-products">
          <h3 className="section-title">Productos en el carrito</h3>
          <ul className="product-list">
            {cart.map((item, index) => (
              <li key={index} className="product-item">
                <img
                  src={item.cover_img}
                  alt={item.title}
                  className="product-image"
                />
                <span>{item.title}</span>
                <span>${item.price ? item.price : 200}</span>{" "}
                {/* Si no hay precio, muestra 200 */}
              </li>
            ))}
          </ul>
          <div className="total-amount">
            <h4>Subtotal: ${totalAmount - shippingCost}</h4>
            <h4>Costo de Envío: ${shippingCost}</h4>
            <h4>Total a pagar: ${totalAmount}</h4>
          </div>
        </div>

        {/* Columna de envío y pago */}
        <div className="cart-checkout">
          <div className="shipping-options">
            <h3 className="section-title">Opciones de Envío</h3>
            <select
              className="shipping-select"
              value={shippingCompany}
              onChange={handleShippingChange}
            >
              <option value="">Seleccionar empresa de envío</option>
              <option value="dhl">DHL - $10</option>
              <option value="fedex">FedEx - $15</option>
              <option value="ups">UPS - $12.5</option>
            </select>
          </div>

          {/* Seguimiento del embarque */}
          <div className="tracking-section">
            <h3 className="section-title">Seguimiento del Embarque</h3>
            <button
              className="btn-track-shipment"
              onClick={handleTrackShipment}
            >
              Seguir pedido
            </button>
            {shipmentTracking && <p>{shipmentTracking}</p>}
          </div>

          {/* Botón de PayPal */}
          <div className="paypal-section">
            <h3 className="section-title">Pagar con PayPal</h3>
            <PayPalScriptProvider
              options={{
                "client-id":
                  "AaGAaJhi021SzIFkEaK-mYC5Ymx1ISSveDpNe1Axtq5fSEsrpCFGX67fEh-p_D6apnMOhICxMktr2maq",
              }}
            >
              {totalAmount > 0 && (
                <PayPalButtons
                  style={{ layout: "vertical", color: "blue" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalAmount.toFixed(2), // Asegúrate de usar un string con 2 decimales
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={handleApprove}
                />
              )}
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
