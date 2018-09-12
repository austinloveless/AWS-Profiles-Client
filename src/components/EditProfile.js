import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class EditProfile extends Component {
  state = {
    loadingProfile: true,
    profile: null
  };
  componentDidMount() {
    if (this.props.match.params.id) {
      this.getProfile(this.props.match.params.id);
    }
  }

  updateProfile = async id => {
    const response = await fetch("/api/profile/" + id, {
      method: "put",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify(this.state.profile)
    });
  };

  getProfile = async id => {
    try {
      const response = await fetch("/api/profile/" + id, {
        method: "get"
      });
      const profile = await response.json();
      this.setState({ profile });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ loadingProfile: false });
    }
  };
  onInputChange = e =>
    this.setState({
      profile: { ...this.state.profile, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    this.updateProfile(this.props.match.params.id);
  };

  render() {
    return this.state.loadingProfile ? (
      <p>Loading profile</p>
    ) : (
      <div className="container">
        <h1>Edit {this.state.profile.first_name}</h1>

        <div className="row">
          <form
            className="col s12"
            onSubmit={this.onSubmit}
            encType="mulipart/form-data"
          >
            <div className="row">
              <div class="input-field col s6">
                <input
                  className="validate"
                  type="text"
                  name="first_name"
                  value={this.state.profile.first_name}
                  onChange={this.onInputChange}
                  placeholder="First Name"
                />
              </div>
              <div class="input-field col s6">
                <input
                  placeholder="Last Name"
                  class="validate"
                  type="text"
                  name="last_name"
                  value={this.state.profile.last_name}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s1">
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  value={this.state.profile.age}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input
                  class="validate"
                  type="text"
                  name="interest"
                  placeholder="Interest"
                  value={this.state.profile.interest}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="input-field col s6">
                <input
                  type="password"
                  name="ssn"
                  value={this.state.profile.ssn}
                  placeholder="Social Security Number"
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <label htmlFor="image" className="image-label">
              Profile Image
            </label>

            <div class="row">
              <div class="input-field col s12">
                <input type="file" class="validate" />
              </div>
            </div>
            <button
              class="btn waves-effect waves-light red"
              type="submit"
              name="action"
            >
              Edit!
            </button>
          </form>
          <button>
            <Link className="btn waves-effect waves-light" to="/">
              Go Back!
            </Link>
          </button>
        </div>
      </div>
    );
  }
}
