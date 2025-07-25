import React from "react";
import ProductList from "../components/ProductList";

const ProductsPage = () => {
  return (
    <section className="py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-6">All Products</h2>
      <ProductList />
    </section>
  );
};

export default ProductsPage;
