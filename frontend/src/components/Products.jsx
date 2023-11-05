import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"



export const Products = () => {
  
  const navigate = useNavigate()
  const [productData, setProductData] = useState([]);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);

  async function getDatos() {
    try {
      const response = await fetch('http://localhost:4000/api/products');

      if (!response.ok) {
        throw new Error('Not found Products');
      }

      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    getDatos();
  }, []);

  const handleRowMouseEnter = (index) => {
    setHoveredRowIndex(index);
  };

  const handleRowMouseLeave = () => {
    setHoveredRowIndex(null);
  };

 

  const handleAgregarProductoClick = () => {
    // Lógica para el evento de "Agregar Producto"
    console.log('Botón "Agregar Producto" clickeado');
    navigate('/new-product')
    
  };

  const handleEliminarProductoClick = () => {
    console.log("Eliminar producto")
  }

  const handleModificarProductoClick = () => {
    console.log("Modificar producto")
  }

  const handleBuscarProductoClick = () => {
    console.log("Buscar producto")
  }

  return (
    <div>
      <div>
      <h1>Productos</h1>
      <table className="table table-hover">
        <thead>
          <tr className="table-dark">
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Price</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col">Code</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product, index) => {
            let rowColor = index % 2 === 0 ? "table-active" : "table-light";
            if (hoveredRowIndex === index) {
              rowColor = "table-info";
            }
            return (
              <tr
                key={index}
                className={rowColor}
                onMouseEnter={() => handleRowMouseEnter(index)}
                onMouseLeave={handleRowMouseLeave}
              >
                <th scope="row">{product.title}</th>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.status === true ? "Activo" : "Desactivo"}</td>
                <td>{product.code}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>

      <div className="d-flex justify-content-center text-center">
        <button type="button" className="btn btn-dark mx-2" onClick={handleAgregarProductoClick}>Agregar Producto</button>
        <button type="button" className="btn btn-dark  mx-2" onClick={handleEliminarProductoClick}>Eliminar Producto</button>
        <button type="button" className="btn btn-dark  mx-2" onClick={handleModificarProductoClick}>Modificar Producto</button>
        <button type="button" className="btn btn-dark  mx-2" onClick={handleBuscarProductoClick}>Buscar Producto</button>
      </div>
      
    </div>

    
  );
};