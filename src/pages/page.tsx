import axios from "axios";
import React, { Component } from "react";
import { Puff } from "react-loader-spinner";
import { IEntity, baseURL } from "../types";
import NotFound from "./404";
import "../assets/css/main.scss";

interface PageProps {
  onNavigate: (id: string) => void;
}
interface PageState {
  product: IEntity.IProduct | null;
  notFound: boolean;
  mainImage: string;
}

export default class Page extends Component<PageProps, PageState> {
  state: PageState = {
    product: null,
    notFound: false,
    mainImage: "",
  };

  getProduct = async () => {
    try {
      const id = window.location.pathname.substring(1);
      const res = await axios.get(`${baseURL}/products/${id}`);
      let data: IEntity.IProduct = res.data;
      this.setState({ product: data, mainImage: data.thumbnail });
      localStorage.setItem("product", JSON.stringify(data));
    } catch (error: any) {
      console.log("Error fetching product");
      if (error.response && error.response.status === 404) {
        this.setState({ notFound: true });
      }
    }
  };

  componentDidMount(): void {
    this.getProduct();
  }

  handleNavigate = (pathname: string) => {
    window.history.pushState({}, "", pathname);
    this.props.onNavigate(pathname);
  };
  handleImage = (img: string) => {
    this.setState({ mainImage: img });
  };

  render() {
    const { notFound, mainImage } = this.state;
    const { handleNavigate, handleImage } = this;
    const product: IEntity.IProduct = JSON.parse(
      localStorage.getItem("product")!
    );
    const images = product.images;

    if (notFound) {
      return <NotFound onNavigate={this.props.onNavigate} />;
    }

    if (!product) {
      return (
        <div className="w-full h-[100vh] flex justify-center items-center">
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
        </div>
      );
    }

    return (
      <div className="w-full p-[50px] ">
        <button
          onClick={() => handleNavigate("/")}
          className="uppercase text-[#eaded7] bg-[#ab7a5f] p-[10px] text-[20px] rounded-[10px]"
        >
          Back to products
        </button>
        <div className="w-full h-full flex gap-10 bg-red-500 mt-[50px]">
          <div className="w-[550px] h-[530px]">
            <img
              src={mainImage}
              alt="Product image"
              className="w-full h-[450px] object-cover  rounded-[10px]"
            />
            <div className="w-full h-[95px] py-[10px] flex gap-[10px] overflow-x-auto overflow-y-hidden">
              {images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt="Product image"
                  onClick={() => handleImage(img)}
                  className="h-[75px] object-cover w-full rounded-[6px] cursor-pointer active:scale-[0.96]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
