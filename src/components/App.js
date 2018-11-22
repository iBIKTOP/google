import React, { Component } from 'react';
import './style.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {lat: '---', lng: '---'}

    this.getLocation = this.getLocation.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentWillMount(){
    this.getLocation();
  }
  getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.setState({lat: position.coords.latitude, lng: position.coords.longitude});
          console.log(this.state);
        });
      } else {
        console.info("navigator.geolocation error");
      }
  }

  onSearch() {
    if (this.state.lat!=='---'){
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          // document.getElementById("response").innerHTML = this.responseText;
          console.log(this.responseText);
        }
        else{
          console.log("error");
        }
      };
      xhttp.open("POST", "http://localhost:3333/search", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.setRequestHeader("Access-Control-Allow-Origin", true);
      xhttp.send(`lat=${this.state.lat}&lng=${this.state.lng}`); 
    }
  }
  render() {    
    return (
      <div className="container">
        <div className="card text-center">
            <div className="card-header">
              <p>Ваше местоположение определено:</p>
              <p>{this.state.lat}, {this.state.lng}</p>

              <form>

                <div className="form-group">
                  {/* <div className="row">
                    <div className="col">
                      <input name="lat" type="text" className="form-control" placeholder="Широта" defaultValue={this.state.lat}></input>
                    </div>
                    <div className="col">
                      <input name="lng" type="text" className="form-control" placeholder="Долгота" defaultValue={this.state.lng}></input>
                    </div>
                  </div> */}
                  <button name="button" type="button" className="btn btn-outline-info" onClick={this.onSearch} >Поиск подходящих мест</button>
                </div>

              </form>

            </div> 

            <div className="card-body">
                <h5 className="card-title">Ответ с Google API</h5>
                <p className="card-text" id="response">text</p>
            </div>

            <div className="card-footer text-muted">
              https://developers.google.com/places/web-service/search
            </div>
        </div> 

      </div>
    );
  }
}

export default App;
