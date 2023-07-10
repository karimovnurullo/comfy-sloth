import React, { Component } from "react";
import axios from "axios";
import { IEntity, baseURL } from "../types";

interface MenusState {
  categories: string[];
  products: IEntity.IProduct[];
  priceRange: number;
}

interface MenusProps {
  onFilter: (title: string, priceRange: number) => void;
  onSearch: (value: string) => void;
  onPrice: (value: number) => void;
}

export default class Menus extends Component<MenusProps, MenusState> {
  state: MenusState = {
    categories: [],
    products: [],
    priceRange: 3000,
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

  handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const priceRange = parseInt(e.target.value);
    this.setState({ priceRange });
    this.props.onPrice(priceRange);
  };

  componentDidMount(): void {
    this.getCategories();
    this.getProducts();
    this.filteredCategories();
  }

  render() {
    const { onFilter, onSearch } = this.props;
    const categories = this.filteredCategories();
    const { priceRange } = this.state;

    const formattedPrice = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(priceRange);

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
            <li className="menu" onClick={() => onFilter("all", priceRange)}>
              All
            </li>
            {categories.map((title) => (
              <li
                key={title}
                className="menu"
                onClick={() => onFilter(title, priceRange)}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
        <div className="price-part">
          <div className="title">Price</div>
          <div className="price-number">{formattedPrice}</div>
          <input
            type="range"
            min="1"
            max="3000"
            step="1"
            value={priceRange}
            onChange={this.handlePriceChange}
          />
        </div>
      </div>
    );
  }
}
