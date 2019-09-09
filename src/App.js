import React, { Component } from 'react';

import './App.scss';
import utils from "./shared/math-utils";

import DiceSelector from "./components/DiceSelector";
import RolledDiceResult from "./components/RolledDiceResult";
import ListOfDiceTypes from "./shared/list-available-dice";
import ListOfRollTypes from "./shared/list-roll-types";

import soundfile from  "./sounds/DiceRoll.wav";

const DiceToRollList = [];
const SelectedRollType = "";
const offset1 = 100;
const offset2 = 500;

let RolledTotal = 0;
let SecondRolledTotal = 0;
let AdderValue = 0;
let RolledDiceString = "";
let HideDiceBoxes = true;
let HideRolledResults = true;

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { DiceToRollList }
    }

    render() {
      return (
          <div className="App">
              <header className="App-header">
                  <div className="Dice-Box">
                      <h2>Select Dice to Roll</h2>
                      {ListOfDiceTypes.map((dice, index) => (
                          <DiceSelector
                              key={ListOfDiceTypes.length + offset1 + index}
                              dicetype={dice.dicetype}
                              imagename={dice.imageName}
                              maxvalue={dice.maxvalue}
                              onClick={this.AddDieClick}
                          />
                      ))}
                  </div>
                  <div className="Dice-Box" hidden={HideDiceBoxes }>
                      <h3>Selected Dice</h3>
                      {this.state.DiceToRollList.map((dice, index) => (
                          <DiceSelector
                              key={this.state.DiceToRollList.length + offset2 + index} 
                              dicetype={dice.dicetype}
                              imagename={dice.imageName}
                              maxvalue={dice.maxvalue}
                              onClick={this.RemoveDieClick}
                          />
                      ))}
                  </div>
                  <div className="Dice-Box" hidden={HideDiceBoxes}>
                        <h5>Select a Roll Type</h5>
                      <select className="form-control inputstl" onChange={this.handleSelectChange}>
                            {ListOfRollTypes.map((rolls) => (
                                <option
                                    key={rolls.rollType} 
                                    value={rolls.value}
                                >{rolls.rollType}</option>
                            ))}
                      </select>
                      <select className="form-control inputstl" onChange={this.handleAdderCharnge}>
                          <option value={0}>Get Total As It Was Rolled</option>
                          <option value={1}>Add 1 To The Total Rolled</option>
                          <option value={-1}>Subtract 1 Rrom The Total Rolled</option>
                      </select>
                      <button type="button" class="btn btn-primary btn-block" onClick={this.RollDiceClick}>Roll Them Bones!</button>
                  </div>
                  <div className="Dice-Box" hidden={HideRolledResults}>
                      <RolledDiceResult RolledTotal={RolledTotal} SecondRolledTotal={SecondRolledTotal} RolledDiceString={RolledDiceString} SelectedRollType={this.SelectedRollType} /> 
                  </div>

              </header>
        </div>
      );
    }

    // Click Functions 

    AddDieClick = (diceType) => {

        let RowToAdd = ListOfDiceTypes.findIndex(obj => {
            return obj.dicetype === diceType
        });

        DiceToRollList.push(ListOfDiceTypes[RowToAdd]);
        this.setHideDiceBoxesState();
        this.reSetState();
    };

    RemoveDieClick = (diceType) => {

        let DieToAdd = DiceToRollList.findIndex(obj => {
            return obj.dicetype === diceType
        });

        DiceToRollList.splice(DiceToRollList[DieToAdd], 1);
        this.setHideDiceBoxesState();
        this.reSetState();

    };

    handleSelectChange = (e) => {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var option = optionElement.getAttribute('value');
        this.SelectedRollType = option;
    }

    handleAdderCharnge = (e) => {
        var index = e.target.selectedIndex;
        var optionElement = e.target.childNodes[index]
        var option = optionElement.getAttribute('value');
        this.AdderValue = option;
        console.log(this.AdderValue);
    }

    RollDiceClick = () => {

        this.diceRoll()

        let ArrayOfRolledDice = []; 
        RolledDiceString = "";

        DiceToRollList.forEach(function (element) {
            let RolledDie = utils.randomRoll(element.minvalue, element.maxvalue);

            ArrayOfRolledDice.push(RolledDie);

            if (RolledDiceString === "") {
                RolledDiceString = RolledDie;
            } else {
                RolledDiceString = RolledDiceString + ", " + RolledDie;
            }

        });

        if (this.SelectedRollType === "Avgaverage") {
            RolledTotal = utils.average(ArrayOfRolledDice);
            RolledTotal = RolledTotal + Number(this.AdderValue);
        } else if (this.SelectedRollType === "HighRoll") {
            RolledTotal = utils.highRoll(ArrayOfRolledDice);
            RolledTotal = RolledTotal + Number(this.AdderValue);
        } else if (this.SelectedRollType === "LowRoll") {
            RolledTotal = utils.lowRoll(ArrayOfRolledDice);
            RolledTotal = RolledTotal + Number(this.AdderValue);
        } else if (this.SelectedRollType === "HSNormal") {
            RolledTotal = utils.sum(ArrayOfRolledDice);
            RolledTotal = RolledTotal + Number(this.AdderValue);
            SecondRolledTotal = utils.bodyFromStun(ArrayOfRolledDice);
        } else if (this.SelectedRollType === "HSKilling") {
            RolledTotal = utils.sum(ArrayOfRolledDice);
            RolledTotal = RolledTotal + Number(this.AdderValue);
            SecondRolledTotal = utils.stunFromBody(RolledTotal, utils.randomRoll(1, 3));
        } else {  //default to Sum
            RolledTotal = utils.sum(ArrayOfRolledDice);
            RolledTotal = RolledTotal + Number(this.AdderValue);
        }

        if (RolledTotal !== 0) {
            HideRolledResults = false;
        }

        this.reSetState();
    }

    // State Functions

    reSetState = () => {
        this.setState({ DiceToRollList });
    };

    setHideDiceBoxesState = () => {
        if (DiceToRollList.length === 0) {
            HideDiceBoxes = true;
            HideRolledResults = true;
            RolledTotal = 0;
            SecondRolledTotal = 0;
        } else {
            HideDiceBoxes = false;
        }
    }

    diceRoll = () => {
        console.log(soundfile);
        this.myRef = React.createRef();
        return (
            <audio ref={this.myRef} src={soundfile} autoPlay />
        )
    }

}
