import React from "react";
import axios from "axios";

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      age: "",
      interest: "",
      ssn: "",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAMFBMVEXk5ueutLfp6uu1u72rsbTZ3N3Bxsi8wcTIzM7S1de4vcDW2dvd4OHg4+TLz9Gxt7ogL5EiAAACkUlEQVRoge2awZKDIAxAISAoAv7/365ax267ColN7OwM77LHt5FAIKlSjUaj0Wg0Go1GYwYA7lfGoXfee5fHdJ8dRqftjNbrH5Nvcg/T6nxite/E1TCaV+tDbZ20uD/QrupplAw6hRPvou7lvHE61S5mJxVzKmklzRWvlBkK67ubM78ZzvL51RzZxRHj1TpwhwwB5dV2YBZ3uIC1nni92IDZQ0au8EJgFaNSeguZNbGLZ+WbuGdMbMKXZv3WkClinfjEnuK1HZtYoTfTKuY7sJMhiflqVK0Qv+H5xKTcYhSTdhNnhfpaxN9bY8KJOcN48/rWPiaeXCOXF3nR28V8ZzX+4rNg+LyIu/yvgFlv9Y4gZixOpG/Ne80E9E62mVWsBnTIvF4FXwpYqREXsmV/LoJHvRZZU3oDkV+sd+qdru7lfb7s1JbZsh6WvynvKWsYq8MbY8nrxbRquYucBS3ZX1uYS/OR2uoo3UYF5f6o7TTc0TgGlcPTba31ov3TV9LgfDDGBN/z3bBQwGMgAffNJWZPiuOQ15GEd67PQ5eSktbHwYXJ2m0isa2xtVPwuVNCdojZ68O9tP0DOvT8tQmiex+BHMqXDOeLG1IuhPpH7pjOEug82rqpA8PGJmsfbvOhGuIV7UP90QxsXttL2lXtrpZniIgpRMmsr5UOYh/xOOgrXtR1tma+8JD6YHVf1MQciyzW1UxaaD4vzczppZiJba062KL12fY9YEIdJbTeEgprMB+b1FrCmhGvSOzTn2iuDqMEPvRK/WPLeKutAqmA6217KW9tlfHtLDLlEklqTBMpigW9xfSSODx2ceEQkcvphUIvijZ7oFJqCh39VouNwqwieSPIVNjJIMq5t9FoNP4FP3hIHLjEHp1bAAAAAElFTkSuQmCC",
      imageSucess: ""
    };
  }

  onSubmit = e => {
    const { first_name, last_name, age, interest, ssn, image } = this.state;
    this.setState({
      first_name: "",
      last_name: "",
      age: "",
      interest: "",
      ssn: "",
      image: null,
      imageSucess: ""
    });
    const profileData = {
      profile: {
        first_name,
        last_name,
        age,
        interest,
        ssn
      }
    };
    e.preventDefault();

    this.props.submitHandler(profileData, image);
  };

  imageUploadedHandler = e => {
    this.setState({
      image: e.target.files[0]
    });
  };
  onInputChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div className="container">
        <h1>Create a Profile!</h1>

        <div className="row">
          <form
            className="col s12"
            onSubmit={this.onSubmit}
            encType="mulipart/form-data"
          >
            <div className="row">
              <div className="input-field col s6">
                <input
                  className="validate"
                  type="text"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className="input-field col s6">
                <input
                  placeholder="Last Name"
                  className="validate"
                  type="text"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s1">
                <input
                  placeholder="Age"
                  type="number"
                  name="age"
                  value={this.state.age}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  className="validate"
                  type="text"
                  name="interest"
                  placeholder="Interest"
                  value={this.state.interest}
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input
                  type="password"
                  name="ssn"
                  value={this.state.ssn}
                  placeholder="Social Security Number"
                  onChange={this.onInputChange}
                />
              </div>
            </div>
            <label htmlFor="image" className="image-label">
              Profile Image
            </label>

            <div className="row">
              <div className="input-field col s12">
                <input
                  type="file"
                  onChange={this.imageUploadedHandler}
                  className="validate"
                />
              </div>
            </div>

            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Create!
            </button>
          </form>
          <p>{this.state.imageSucess}</p>
        </div>
      </div>
    );
  }
}
export default ProfileForm;
