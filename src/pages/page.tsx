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
        <div className="w-full h-fit flex gap-10 mt-[50px]">
          <div className="w-[550px] ">
            <img
              src={mainImage}
              alt="Product image"
              className="w-full h-[450px] border-[1px] border-[#ab7a5f] object-cover  rounded-[10px]"
            />
            <div className="w-full h-fit py-[10px] flex gap-[10px] overflow-x-auto">
              {product.images.map((img) => (
                <img
                  key={img}
                  src={img}
                  alt="Product image"
                  onClick={() => handleImage(img)}
                  className={`${
                    mainImage === img
                      ? "border-[3px] border-[#000]"
                      : "border-[1px] border-[#ab7a5f]"
                  } h-[75px]  object-cover w-[102px] rounded-[6px] cursor-pointer active:scale-[0.96]`}
                />
              ))}
            </div>
          </div>
          <div className="w-1/2 ">
            <h2 className="text-[40px] font-outfit_bold text-[#102a42]">
              {product.title}
            </h2>
            <p className="text-[30px] mt-[20px] font-outfit_bold text-[#ab7a5f] font-bold">
              ${product.price}
            </p>
            <div className="text-[18px] flex gap-[50px] mt-[20px] text-[#102a42]">
              <div className="w-[80px] font-outfit_bold">Rayting: </div>
              <div className="text-[#324d67]">{product.rating}</div>
            </div>
            <div className="text-[18px] flex gap-[50px] mt-[20px] text-[#102a42]">
              <div className="w-[80px] font-outfit_bold">Stock: </div>
              <div className="text-[#324d67]">{product.stock}</div>
            </div>
            <div className="text-[18px] flex gap-[50px] mt-[20px] text-[#102a42]">
              <div className="w-[80px] font-outfit_bold">Brand: </div>
              <div className="text-[#324d67]">{product.brand}</div>
            </div>
            <p className="text-[18px] leading-8 mt-[20px] font-poppins text-[#324d67]">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
}
