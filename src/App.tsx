import React, { Component } from "react";
import axios from "axios";
import { Menus, Products } from "./components";
import { NotFound, Page } from "./pages";
import { IEntity, baseURL } from "./types";

interface AppState {
  products: IEntity.IProduct[];
  category: string;
  pathname: string;
}
export default class App extends Component<{}, AppState> {
  state = {
    products: [],
    category: "all",
    pathname: window.location.pathname,
  };
  getProducts = async () => {
    const { data } = await axios.get(`${baseURL}/products`);
    this.setState({ products: data.products });
    localStorage.setItem("products", JSON.stringify(data.products));
  };
  getProduct = async (title: string) => {
    const { data } = await axios.get(`${baseURL}/products/category/${title}`);
    this.setState({ products: data.products });
  };
  componentDidMount(): void {
    this.getProducts();
  }
  handleFilter = (title: string) => {
    this.setState({ category: title });
  };
  handleNavigate = (id: string) => {
    this.setState({ pathname: id });
  };

  getPage = (filteredProducts: IEntity.IProduct[]) => {
    const products = JSON.parse(localStorage.getItem("products")!) || [];
    const { pathname } = this.state;
    const productIds = products.map((product: IEntity.IProduct) => product.id);

    if (pathname === "/") {
      return (
        <div className="app-container">
          <Menus onFilter={this.handleFilter} />
          <Products
            products={filteredProducts}
            onNavigate={this.handleNavigate}
          />
        </div>
      );
    } else if (productIds.includes(parseInt(pathname.substring(1)))) {
      return <Page onNavigate={this.handleNavigate} />;
    } else if (
      isNaN(parseInt(pathname.substring(1))) ||
      isNaN(parseInt(pathname))
    ) {
      return <NotFound onNavigate={this.handleNavigate} />;
    } else {
      return <NotFound onNavigate={this.handleNavigate} />;
    }
  };

  render() {
    const { category, products } = this.state;
    const { handleFilter } = this;
    const filteredProducts =
      category === "all"
        ? products
        : products.filter((p: IEntity.IProduct) => p.category == category);
    return <>{this.getPage(filteredProducts)}</>;
    // return (
    //   <>
    //     {aboutPage ? (
    //       <Page />
    //     ) : (
    //       <div className="app-container">
    //         <Menus onFilter={this.handleFilter} />
    //         <Products
    //           products={filteredProducts}
    //           onNavigate={this.handleNavigate}
    //         />
    //       </div>
    //     )}
    //   </>
    // );
  }
}
