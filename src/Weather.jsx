import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Error from './Error';

const style = {
  form: {
    width: 300,
  },
};

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: '',
      zip: '',
      units: 'imperial',
      temp: { current: '', max: '', min: '' },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleZipChange = this.handleZipChange.bind(this);
    this.handleAPIChange = this.handleAPIChange.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  getWeather() {
    return fetch(
      `http://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip}&appid=${this.state.api}&units=${this.state.units}`,
    ).then((res) => {
      if (res.status !== 200) {
        this.setState({ open: true, error: `${res.status} - ${res.statusText}` });
      }
      return res.json();
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getWeather()
      .then((data) => {
        if (data.message) {
          this.setState({ open: true, error: `${data.cod} - ${data.message}` });
        }
        return this.setState({
          temp: {
            current: data.main.temp,
            max: data.main.temp_max,
            min: data.main.temp_min,
          },
        });
      })
      .catch(() => this.setState({
        open: true,
        error: 'An error has occurred. Please check your API Key and Zip Code',
      }));
  }

  handleAPIChange(event) {
    this.setState({ api: event.target.value });
  }

  handleZipChange(event) {
    this.setState({ zip: event.target.value });
  }

  handleToggle(_event, isChecked) {
    return isChecked ? this.setState({ units: 'metric' }) : this.setState({ units: 'imperial' });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} style={style.form}>
          <TextField
            name="api"
            onChange={this.handleAPIChange}
            type="text"
            value={this.state.api}
            hintText="OpenWeatherMap API Key"
            style={style.form}
            autoFocus
          />
          <TextField
            name="zip"
            onChange={this.handleZipChange}
            type="text"
            value={this.state.zip}
            style={style.form}
            hintText="Zip Code"
          />
          <Toggle label={`Units: ${this.state.units}`} onToggle={this.handleToggle} />
          <RaisedButton label="Submit" secondary onTouchTap={this.handleSubmit} />
        </form>
        <div>
          <h2>{"Today's Weather"}</h2>
          <p>Current: {this.state.temp.current}</p>

          <p>High: {this.state.temp.max}</p>
          <p>Low: {this.state.temp.min}</p>
        </div>
        <Error open={this.state.open} error={this.state.error} />
      </div>
    );
  }
}

export default Weather;
