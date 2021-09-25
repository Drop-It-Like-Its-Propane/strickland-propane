import React from "react";

class Cart extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.getCart(userIdSomehow);
    }

    render(){
        return (
            <div id='cart'>
                <h2>Your Cart</h2>
            </div>
        )
    }
}