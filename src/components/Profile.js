import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Profile = ({
  first_name,
  last_name,
  age,
  interest,
  image,
  createdAt,
  onDelete,
  id
}) => {
  return (
    <div className="col s8 m4">
      <div className="card">
        <div className="card-image">
          <img className="image-size" src={image} />
        </div>
        <div className="card-content">
          <h4>
            {first_name}-{last_name}
          </h4>
          <p className="profile-p">
            <i>Age:</i>
          </p>
          <p>{age}</p>
          <p className="profile-p">
            <i>Interest:</i>
          </p>
          <p>{interest}</p>
          <p className="profile-p">
            <i>Created:</i>
          </p>
          <p>{moment(createdAt).fromNow()}</p>
        </div>
        <div className="card-action">
          <Link className="waves-effect waves-light btn" to={`/profile/${id}`}>
            Edit
          </Link>
          <button
            className="waves-effect waves-light btn red right"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
