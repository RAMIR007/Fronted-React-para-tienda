import React from "react";

function Carrito({ carrito, setCarrito }) {
  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const removerDelCarrito = (producto) => {
    const existente = carrito.find((item) => item.id === producto.id);
    if (existente.cantidad === 1) {
      setCarrito(carrito.filter((item) => item.id !== producto.id));
    } else {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
      );
    }
  };

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <div>
      <h2>Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              {item.nombre} - Cantidad: {item.cantidad} - Precio: $
              {(item.precio * item.cantidad).toFixed(2)}
              <button onClick={() => agregarAlCarrito(item)}>+</button>
              <button onClick={() => removerDelCarrito(item)}>-</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}

export default Carrito;
