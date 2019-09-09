import React from "react";

export default class RolledDiceResult extends React.Component {
    constructor(props) {
        super();
        this.state = { props };
    }

    render() {

        let lable1 = "Total Rolled";
        let lable2 = "Total Rolled"; 
        let hideSubTotal = false;

        if (this.props.SecondRolledTotal === 0) {
            hideSubTotal = true;
        }

        if (this.props.SelectedRollType === "HSNormal") {
            lable1 = "Total Stun";
            lable2 = "Total Body"; 
        }

        if (this.props.SelectedRollType === "HSKilling") {
            lable1 = "Total Body";
            lable2 = "Total Stun";
        }

        return <>
            <h3>{lable1} = {this.props.RolledTotal}</h3>
            <h3 hidden={hideSubTotal}>{lable2} = {this.props.SecondRolledTotal}</h3>
            <h5>(Dice Results: {this.props.RolledDiceString})</h5>
        </>

    }
}