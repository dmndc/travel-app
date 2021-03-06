import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {PersistGate} from 'redux-persist/es/integration/react';
import "./App.css";

import axios from "axios";

// Import components
import { getLocation } from "./ducks/user_reducer.js";
import NavBar from "./components/Nav/NavBar/NavBar";
import Header from "./components/Nav/Header/Header";
import Footer from "./components/Nav/Footer/Footer";
import router from "./router";
import store from "./store";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 32.777575399999996,
      longitude: -96.7957301,
      airport: {
                 PlaceId: "DFWA-sky",
                 PlaceName: "Dallas",
                 CountryId: "US-sky",
                 CityId: "DFWA-sky",
                 CountryName: "United States"
      }
    }
  }

  componentDidMount() {
    
      this.props.getLocation(this.state);

    // if ("geolocation" in navigator) {
    //   //geolocation is available
    //   navigator.geolocation.getCurrentPosition(position => {
    //     //Call getAirport endpoint on server
    //     axios
    //       .get(
    //         `/api/getAirport?lat=${position.coords.latitude}&long=${
    //           position.coords.longitude
    //         }`
    //       )
    //       .then(response => {
    //         this.setState({
    //           latitude: position.coords.latitude,
    //           longitude: position.coords.longitude,
    //           airport: response.data
    //         });
    //       })
    //       .then(() => {
    //         this.props.getLocation(this.state);
    //       });
    //   });
    // }

  }

  render() {
    return (
      <div className="App animated fadeIn">        
        {router}
        {/*<Footer />*/}
      </div>
      
    );
  }
}

const mapStateToProps = state => state;
export default withRouter(connect(mapStateToProps, { getLocation })(App));
