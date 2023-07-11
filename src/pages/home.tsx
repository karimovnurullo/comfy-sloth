import { Component } from "react";
import { Menus, Products } from "../components";
import { IEntity } from "../types";
interface HomeProps {
  onFilter: (title: string) => void;
  products: IEntity.IProduct[];
  onNavigate: (pathname: string) => void;
  onSearch: (value: string) => void;
  onSort: (value: string) => void;
  onPrice: (value: number) => void;
  onSortView: (value: string) => void;
  sortView: string;
}

export default class Home extends Component<HomeProps> {
  render() {
    const { ...args } = this.props;
    return (
      <div className="app-container">
        <Menus {...args} />
        <Products {...args} />
      </div>
    );
  }
}
