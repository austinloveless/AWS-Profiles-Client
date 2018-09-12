import React, { Component } from "react";
import Profile from "./Profile";
import ProfileForm from "./ProfileForm";
import { Link } from "react-router-dom";

const APIURL = "/api/profile/";

class ProfileList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
      message: ""
    };
    this.addProfile = this.addProfile.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  componentWillMount() {
    this.loadProfiles();
  }

  loadProfiles() {
    fetch(APIURL)
      .then(resp => {
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = { errorMessage: data.message };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Please try again later, server is not responding"
            };
            throw err;
          }
        }
        return resp.json();
      })
      .then(({ profiles }) => {
        this.setState({ profiles });
      });
  }

  submitHandler = async (profileData, image) => {
    let location = "";
    if (image) {
      const uploadedImage = await this.addImage(image);
      if (uploadedImage && uploadedImage.hasOwnProperty("location")) {
        location = uploadedImage.location;
      }
    }
    this.addProfile({
      profile: {
        ...profileData.profile,
        image: location
      }
    });
  };

  addImage(file) {
    const formData = new FormData();
    formData.append("image", file, file.name);
    return fetch(APIURL + "profileImage", {
      method: "post",
      body: formData
    }).then(res =>
      res
        .json()
        .then(response => {
          return response;
        })
        .catch(error => {
          this.setState({
            message: `There was an error: ${error.message}`
          });
        })
    );
  }

  async addProfile(payload) {
    const response = await fetch(APIURL, {
      method: "post",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      }),
      body: JSON.stringify({ profiles: payload })
    });
    const profile = await response.json();

    console.log("profile received", profile);
    this.setState({
      profiles: [...this.state.profiles, profile]
    });
    console.log("state", this.state);
  }

  deleteProfile(id) {
    const deleteURL = APIURL + id;
    fetch(deleteURL, {
      method: "delete"
    })
      .then(resp => {
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = { errorMessage: data.message };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Please try again later, server is not responding"
            };
            throw err;
          }
        }
      })
      .then(() => {
        const profiles = this.state.profiles.filter(
          profile => profile.id !== id
        );
        this.setState({ profiles: profiles });
      });
  }

  updateProfile(id) {
    const updateURL = APIURL + id;
    fetch(updateURL, {
      method: "put"
    })
      .then(resp => {
        if (!resp.ok) {
          if (resp.status >= 400 && resp.status < 500) {
            return resp.json().then(data => {
              let err = { errorMessage: data.message };
              throw err;
            });
          } else {
            let err = {
              errorMessage: "Please try again later, server is not responding"
            };
            throw err;
          }
        }
      })
      .then(() => {
        const profiles = this.state.profiles.filter(
          profile => profile.id !== id
        );
        this.setState({ profiles: profiles });
      });
  }

  render() {
    const profiles = this.state.profiles
      ? this.state.profiles.map(p => {
          return (
            <Profile
              key={p.id}
              {...p}
              onDelete={this.deleteProfile.bind(this, p.id)}
            />
          );
        })
      : "Loading profiles";

    return (
      <div>
        <h1>{this.state.message}</h1>
        <ProfileForm
          submitHandler={this.submitHandler}
          addImage={this.addImage}
          addProfile={this.addProfile}
        />
        <div className="container2">{profiles}</div>
      </div>
    );
  }
}

export default ProfileList;
