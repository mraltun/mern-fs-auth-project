import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Dashboard = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState();
  const [tempQuote, setTempQuote] = useState();

  const populateQuote = async () => {
    const req = await fetch("http://localhost:8000/api/v1/quote", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(data.quote);
    } else {
      console.log(data.error);
    }
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
    // eslint-disable-next-line
  }, []);

  const updateQuote = async (e) => {
    e.preventDefault();
    const req = await fetch("http://localhost:8000/api/v1/quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await req.json();
    if (data.status === "ok") {
      setQuote(tempQuote);
      setTempQuote("");
    } else {
      console.log(data.error);
    }
  };

  return (
    <div>
      <h1>Your quote: {quote || "No quote found!"}</h1>
      <form onSubmit={updateQuote}>
        <input
          type='text'
          placeholder='Quote'
          value={tempQuote}
          onChange={(e) => {
            setTempQuote(e.target.value);
          }}
        />
        <button type='submit'>Update Quote</button>
      </form>
    </div>
  );
};

export default Dashboard;
