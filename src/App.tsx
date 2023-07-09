import { Component } from "react";
import axios from "axios";
import { Home, NotFound, Page } from "./pages";
import { IEntity, baseURL } from "./types";

interface AppState {
  products: IEntity.IProduct[];
  category: string;
  pathname: string;
  filteredProducts: IEntity.IProduct[];
  sortBy: string;
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    products: [],
    category: "all",
    pathname: window.location.pathname,
    filteredProducts: [],
    sortBy: "lowest",
  };

  getProducts = async () => {
    const { data } = await axios.get(`${baseURL}/products`);
    this.setState({
      products: data.products,
      filteredProducts: data.products,
    });
    localStorage.setItem("products", JSON.stringify(data.products));
  };

  componentDidMount(): void {
    this.getProducts();
  }

  handleFilter = (title: string) => {
    const products = JSON.parse(localStorage.getItem("products")!) || [];
    const filteredProducts =
      title === "all"
        ? products
        : products.filter(
            (product: IEntity.IProduct) => product.category === title
          );
    this.setState({ category: title, filteredProducts });
  };

  handleNavigate = (id: string) => {
    this.setState({ pathname: id });
  };

  handleSearch = (value: string) => {
    const products = JSON.parse(localStorage.getItem("products")!) || [];
    const filteredProducts = products.filter((product: IEntity.IProduct) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    this.setState({
      filteredProducts: filteredProducts,
    });
  };

  handleSort = (value: string) => {
    this.setState({ sortBy: value });
  };

  sortProducts = () => {
    const { filteredProducts, sortBy } = this.state;
    let sortedProducts = [...filteredProducts];

    switch (sortBy) {
      case "lowest":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "highest":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "a-z":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }

    return sortedProducts;
  };

  getPage = () => {
    const { pathname, category, products } = this.state;
    const { handleNavigate } = this;
    const sortedProducts = this.sortProducts();
    const productIds = products.map((product: IEntity.IProduct) => product.id);

    if (pathname === "/") {
      return (
        <Home
          onSearch={this.handleSearch}
          onFilter={this.handleFilter}
          onSort={this.handleSort}
          products={sortedProducts}
          onNavigate={handleNavigate}
        />
      );
    } else if (productIds.includes(parseInt(pathname.substring(1)))) {
      return <Page onNavigate={handleNavigate} />;
    } else {
      return <NotFound onNavigate={handleNavigate} />;
    }
  };

  render() {
    return <>{this.getPage()}</>;
  }
}
