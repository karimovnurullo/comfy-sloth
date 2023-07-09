import React, { Component } from "react";
import { Menus, Products } from "../components";
import { IEntity } from "../types";
interface HomeProps {
  onFilter: (title: string) => void;
  products: IEntity.IProduct[];
  onNavigate: (pathname: string) => void;
}

export default class Home extends Component<HomeProps> {
  render() {
    //  return (
    //    <div className="w-full h-[100vh] flex justify-center items-center">
    //      <Puff
    //        height="80"
    //        width="80"
    //        radius={1}
    //        color="#000"
    //        ariaLabel="puff-loading"
    //        wrapperStyle={{}}
    //        wrapperClass=""
    //        visible={true}
    //      />
    //    </div>
    //  );
    const { onFilter, products, onNavigate } = this.props;
    return (
      <div className="app-container">
        <Menus onFilter={onFilter} />
        <Products products={products} onNavigate={onNavigate} />
      </div>
    );
  }
}
