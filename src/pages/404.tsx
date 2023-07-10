import React, { Component } from "react";

interface NotFoundProps {
  onNavigate: (id: string) => void;
}

interface NotFoundState {
  counter: number;
  intervalId: NodeJS.Timeout | null;
}

export default class NotFound extends Component<NotFoundProps, NotFoundState> {
  state: NotFoundState = {
    counter: 5,
    intervalId: null,
  };

  componentDidMount() {
    // this.leavePage();
    // const intervalId = this.startCountdown();
    // this.setState({ intervalId });
  }

  componentWillUnmount() {
    const { intervalId } = this.state;
    if (intervalId) {
      clearInterval(intervalId);
    }
  }

  leavePage = () => {
    // setTimeout(() => {
    window.history.pushState({}, "", "/");
    this.props.onNavigate("/");
    // }, 5000);
  };

  // startCountdown = () => {
  //   return setInterval(() => {
  //     this.setState((prevState) => ({
  //       counter: prevState.counter - 1,
  //     }));
  //   }, 1000) as NodeJS.Timeout;
  // };

  render() {
    const { counter } = this.state;
    return (
      <div className="h-[100vh] flex justify-center items-center flex-col gap-10">
        <h1 className="font-chillax sm:text-[40px] text-[20px] ">
          404 page not found
        </h1>
        <button
          onClick={this.leavePage}
          className="py-[10px] px-[20px] bg-black text-white rounded-[10px] text-[20px]"
        >
          Back to home
        </button>
      </div>
    );
  }
}
