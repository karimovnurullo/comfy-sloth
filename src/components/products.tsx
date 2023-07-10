import React, { Component } from "react";
import { Puff } from "react-loader-spinner";
import "../assets/css/main.scss";
import Product from "./product";
import { IEntity } from "../types";

interface ProductsProps {
  products: IEntity.IProduct[];
  onNavigate: (id: string) => void;
  onSort: (value: string) => void;
}

interface ProductsState {
  sortBy: string;
  options: { value: string; title: string }[];
}

export default class Products extends Component<ProductsProps, ProductsState> {
  state: ProductsState = {
    sortBy: "lowest",
    options: [
      { value: "lowest", title: "Price (Lowest)" },
      { value: "highest", title: "Price (Highest)" },
      { value: "a-z", title: "Name (A-Z)" },
      { value: "z-a", title: "Name (Z-A)" },
    ],
  };

  handleSort = (value: string) => {
    this.setState({ sortBy: value });
    this.props.onSort(value);
  };

  render() {
    const { products, onNavigate } = this.props;
    const { sortBy, options } = this.state;

    if (!products) {
      return (
        <div className="w-full h-[100vh] bg-rd-600 flex justify-center items-center">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#000"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          {/* asds */}
        </div>
      );
    }
    return (
      <div className="products">
        <div className="nav">
          <div className="icons">
            <i className="fa-solid fa-border-all grid-icon"></i>
            <i className="fa-solid fa-grip-lines grid-icon"></i>
          </div>
          <div>{products.length} Products Found</div>
          <hr className="line" />
          <div>Sort By</div>
          <select
            className="form-control"
            value={sortBy}
            onChange={(e) => this.handleSort(e.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
        <div className="main">
          {products.length !== 0 ? (
            products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onNavigate={onNavigate}
              />
            ))
          ) : (
            <h1>Product not Found</h1>
          )}
        </div>
      </div>
    );
  }
}
