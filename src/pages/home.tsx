import { Component } from "react";
import { Menus, Products } from "../components";
import { IEntity } from "../types";
interface HomeProps {
  onFilter: (title: string) => void;
  products: IEntity.IProduct[];
  onNavigate: (pathname: string) => void;
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
}

export default class Home extends Component<HomeProps> {
  render() {
    const { onFilter, products, onNavigate, onSort } = this.props;
    return (
      <div className="app-container">
        <Menus onSearch={this.props.onSearch} onFilter={onFilter} />
        <Products onSort={onSort} products={products} onNavigate={onNavigate} />
      </div>
    );
  }
}
