import React, { Component } from "react";
// import Category from "./category";
import axios from "axios";
import { IEntity, baseURL } from "../types";
interface MenusState {
  categories: String[];
  products: IEntity.IProduct[];
}
interface MenusProps {
  onFilter: (title: string) => void;
  onSearch: (value: string) => void;
}
export default class Menus extends Component<MenusProps, MenusState> {
  state = {
    categories: [],
    products: [],
  };
  getCategories = async () => {
    const { data } = await axios.get(`${baseURL}/products/categories`);
    this.setState({ categories: data });
  };
  getProducts = async () => {
    const { data } = await axios.get(`${baseURL}/products`);
    this.setState({ products: data.products });
  };
  filteredCategories = () => {
    const { categories, products } = this.state;
    let arr: string[] = [];

    categories.forEach((category) => {
      const categoryProducts = products.filter(
        (product: IEntity.IProduct) => product.category === category
      );
      if (categoryProducts.length > 0) {
        arr.push(category);
      }
    });

    return arr;
  };

  componentDidMount(): void {
    this.getCategories();
    this.getProducts();
  }
  render() {
    const { onFilter, onSearch } = this.props;
    const arr = this.filteredCategories();
    return (
      <div className="menus">
        <input
          type="search"
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search"
          className="search"
        />
        <div className="category">
          <div className="title">Category</div>
          <ul>
            <li className="menu" onClick={() => onFilter("all")}>
              All
            </li>
            {arr.map((title) => (
              <li key={title} className="menu" onClick={() => onFilter(title)}>
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div className="price-part">
          <div className="title">Price</div>
          <div className="price-number">$123.00</div>
          <input type="range" />
        </div>
      </div>
    );
  }
}
