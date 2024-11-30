import React from "react";
import axios from 'axios';

const People = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center mt-4">
      <div className="card w-50 ">
      <div className="card-header">Featured</div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">
          With supporting text below as a natural lead-in to additional content.
        </p>
        <a href="#" className="btn btn-primary">
          Go somewhere
        </a>
      </div>
    </div>
    </div>
  );
};

export default People;
