import React from "react";

export default class DiceSelector extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        return <button
            className="btn number-btn"
            onClick={() => this.props.onClick(this.props.dicetype)}
        >
            <img src={require(`../images/${this.props.imagename}`)} alt={this.props.imagename} />
        </button>
    }
}
