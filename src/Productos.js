import React, { useEffect, useState } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/productos/")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <h1>Catálogo de Productos</h1>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
            <p>Stock: {producto.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Productos;
