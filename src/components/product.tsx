import React, { Component } from "react";
import "../assets/css/main.scss";
import { IEntity } from "../types";

interface ProductProps {
  product: IEntity.IProduct;
  onNavigate: (id: string) => void;
  sortView: string;
}

interface ProductState {}

export default class Product extends Component<ProductProps, ProductState> {
  state: ProductState = {};

  handleNavigate = (id: number) => {
    window.history.pushState({}, "", `/${id}`);
    this.props.onNavigate(`/${id}`);
  };

  render() {
    const { product, sortView } = this.props;
    const { thumbnail, title, price, id, description } = product;

    if (sortView === "grid") {
      return (
        <div className="product grid" onClick={() => this.handleNavigate(id)}>
          <div className="img-box">
            <img src={thumbnail} alt="Product image" />
          </div>
          <div className="content">
            <p className="title w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </p>
            <p className="price">${price}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="product-col ">
          <div className="img-box">
            <img src={thumbnail} alt="Product image" />
          </div>
          <div className="content">
            <p className="title w-full overflow-hidden whitespace-nowrap text-ellipsis">
              {title}
            </p>
            <p className="price">${price}</p>
            <p className="description w-full h-[80px] overflow-hidden whitespace-normal text-ellipsis">
              ${description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio
              aliquid architecto sequi temporibus asperiores nostrum voluptas
              laboriosam ducimus consequatur illum doloribus cum recusandae
              minus quos voluptatibus vero obcaecati, dicta, eius fuga esse
              assumenda? Aut quisquam earum temporibus aperiam veritatis
              blanditiis?
            </p>
            <button className="details" onClick={() => this.handleNavigate(id)}>
              Details
            </button>
          </div>
        </div>
      );
    }
  }
}
