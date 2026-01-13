import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    // console.log("child constructor !");
    this.state = {
      userInfo: {
        name: "fashion4khan",
        location: "default",
      },
    };
  }

  async componentDidMount() {
    const data = await fetch("https://api.github.com/users/fashion4khan");
    const json = await data.json();
    console.log(json);

    this.setState({
      userInfo: json,
    });
  }
  render() {
    // console.log("child render !");
    // const { name, location } = this.state.userInfo;
    return (
      <div className="user-card">
        {/* <img src={this.state.userInfo.avatar_url}></img> */}
        <h2> Name : {this.state.userInfo.login} </h2>
        <h3> location : {this.state.userInfo.location} </h3>
        <h4> contact : FashionJust4Food@8000 </h4>
      </div>
    );
  }
}

export default UserClass;
