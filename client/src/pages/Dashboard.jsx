import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();

  const populateQuote = async () => {
    const request = await fetch("http://localhost:8000/api/v1/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = request.json();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        populateQuote();
      }
    }
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
