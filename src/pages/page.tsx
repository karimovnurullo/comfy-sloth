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
}

export default class Page extends Component<PageProps, PageState> {
  state: PageState = {
    product: null,
    notFound: false,
  };

  getProduct = async () => {
    try {
      const id = window.location.pathname.substring(1);
      const { data } = await axios.get(`${baseURL}/products/${id}`);
      this.setState({ product: data });
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

  render() {
    const pathname = window.location.pathname;
    const { notFound } = this.state;
    const product = JSON.parse(localStorage.getItem("product")!);

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
      <div className="w-full h-[100vh] p-[30px]">
        <button className="uppercase text-[#eaded7] bg-[#ab7a5f] p-[10px] text-[20px] rounded-[10px]">
          Back to products
        </button>
        <div className="h-full bg-red-500 mt-[50px]"></div>
      </div>
    );
  }
}
