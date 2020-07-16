import React, { Component } from "react";
import "./styles.css";
import {
  calculateWithoutPlan,
  calculateWithPlan,
} from "../../services/calculateCall";

class FaleMaisCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: "",
      minutes: 0,
      origin: 11,
      destiny: 16,
      withoutPlan: "",
      withPlan: "",
    };
  }

  setPlan({ plan }) {
    this.setState(
      {
        plan: plan,
      },
      () => this.handleValuesCalc()
    );
  }

  handleChange = (e) => {
    let value = parseFloat(e.target.value);
    if (value !== 0 && !isNaN(value)) {
      this.setState(
        {
          [e.target.name]: value,
        },
        () => this.handleValuesCalc()
      );
    }
  };

  handleValuesCalc = () => {
    let { plan, minutes, destiny, origin } = this.state;

    let originEqualsDestiny = this.state.origin === this.state.destiny;
    let invalidCombination =
      this.state.origin !== 11 && this.state.destiny !== 11;

    if (originEqualsDestiny || invalidCombination) {
      this.setState({
        withPlan: "",
        withoutPlan: "",
      });

      return;
    }

    let withPlan = calculateWithPlan({ origin, destiny, minutes, plan });
    let withoutPlan = calculateWithoutPlan({ origin, destiny, minutes });

    this.setState({
      withPlan,
      withoutPlan,
    });
  };

  formatMoney = (value) => {
    return value.replace(".", ",");
  };

  render() {
    return (
      <div className="container">
        <h1>Fale Mais!</h1>
        <p>
          Com o nosso novo produto FaleMais, você paga somente os minutos
          excedentes!
        </p>
        <p>Utilize a calculadora abaixo para conferir as vantagens.</p>

        <div className="form-container">
          <div className="plans-container">
            <span>Plano</span>
            <div>
              <button
                type="button"
                onClick={() => this.setPlan({ plan: "falemais30" })}
                className={
                  this.state.plan === "falemais30" ? "active" : undefined
                }
              >
                Fale Mais 30
              </button>
              <button
                onClick={() => this.setPlan({ plan: "falemais60" })}
                type="button"
                className={
                  this.state.plan === "falemais60" ? "active" : undefined
                }
              >
                Fale Mais 60
              </button>
              <button
                onClick={() => this.setPlan({ plan: "falemais120" })}
                type="button"
                className={
                  this.state.plan === "falemais120" ? "active" : undefined
                }
              >
                Fale Mais 120
              </button>
            </div>
          </div>

          <div className="selects">
            <span>Origem</span>
            <select
              id="select-origin"
              name="origin"
              onChange={this.handleChange}
            >
              <option value="11">011</option>
              <option value="16">016</option>
              <option value="17">017</option>
              <option value="18">018</option>
            </select>

            <span>Destino</span>
            <select
              id="select-destiny"
              name="destiny"
              defaultValue="16"
              onChange={this.handleChange}
            >
              <option value="11">011</option>
              <option value="16">016</option>
              <option value="17">017</option>
              <option value="18">018</option>
            </select>
          </div>

          <div className="minutes-container">
            <span htmlFor="">Minutos</span>
            <input
              type="number"
              name="minutes"
              min={0}
              onChange={this.handleChange}
            />
          </div>

          <table className="calc-table">
            <thead>
              <tr>
                <th>
                  Com <br />
                  Fale Mais
                </th>
                <th>
                  Sem <br />
                  Fale Mais
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {this.state.withPlan
                    ? `R$ ${this.formatMoney(this.state.withPlan)}`
                    : this.state.plan
                    ? " - "
                    : "Selecione um plano"}
                </td>
                <td>
                  {this.formatMoney(this.state.withoutPlan)
                    ? `R$ ${this.formatMoney(this.state.withoutPlan)}`
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default FaleMaisCalculator;
