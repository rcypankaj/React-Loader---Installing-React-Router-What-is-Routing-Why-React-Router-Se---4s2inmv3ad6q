import React, { useEffect } from "react";
import "../styles/App.css";
import Loader from "./Loader";

const LoadingStatus = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  SUCCESS: "SUCCESS",
};

const BASE_URL = "https://content.newtonschool.co/v1/pr/main/users";
const App = () => {
  const [userId, setUserId] = React.useState(1);
  const [isLoading, setIsLoading] = React.useState(LoadingStatus.NOT_STARTED);
  const [userData, setUserData] = React.useState({
    id: "",
    email: "",
    name: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(isLoading);
      setIsLoading(LoadingStatus.IN_PROGRESS);
      const response = await fetch(`${BASE_URL}/${userData.id}`);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setTimeout(() => {
        console.log("Hello");
        setIsLoading(LoadingStatus.SUCCESS);
      }, 2000);
      setUserData({
        id: userId,
        email: data.email,
        name: data.name,
        phone: data.phone,
        website: data.website,
      });
      console.log(data);
    };

    if (userData.id !== "") {
      try {
        fetchData();
      } catch (error) {
        console.log(error.message);
      }
    }
  }, [userData.id]);

  const handleOnClick = () => {
    setUserData({
      id: userId,
      email: "",
      name: "",
      phone: "",
      website: "",
    });
  };

  const onChangeHandler = (event) => {
    setUserId(event.target.value);
  };

  return (
    <div id="main">
      <label htmlFor="number">Enter an id for the user between 1 to 100</label>

      <input
        type="number"
        value={userId}
        onChange={onChangeHandler}
        id="input"
        min={1}
        max={10}
      />
      <button id="btn" onClick={handleOnClick}>
        Get User
      </button>

      {isLoading === "NOT_STARTED" && (
        <h1>Click on the button to get the user</h1>
      )}
      {isLoading === "IN_PROGRESS" && <Loader />}
      {isLoading === "SUCCESS" && (
        <div id="data">
          <h4 id="id">{userData.id}</h4>
          <h4 id="email">{userData.email}</h4>
          <h4 id="name">{userData.name}</h4>
          <h4 id="phone">{userData.phone}</h4>
          <h4 id="website">{userData.website}</h4>
        </div>
      )}
    </div>
  );
};

export default App;
