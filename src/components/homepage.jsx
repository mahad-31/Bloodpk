import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onSnapshot, collection, query, where } from "firebase/firestore";
import axios from "axios";

const Homepage = () => {
  const [cities, setCities] = useState([]);
  const [BloodGroup, setBloodGroup] = useState("");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");

  const Handlesave = (e) => {
    e.preventDefault();

    if (city) {
      const q = query(
        collection(db, "users"),
        where("address", "==", city),
        where("BloodGroup", "==", BloodGroup)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setData(users);
      });

      return () => unsubscribe();
    }

    navigate("/Data");
  };

  useEffect(() => {
    const apiUrl =
      "https://gist.githubusercontent.com/immujahidkhan/014fb1629ddc931e6f6d4a3a4d31abaa/raw/8f5cc4f88b9dc4efc5058c5354b9f955e4bda16f/cities.json";

    axios
      .get(apiUrl)
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="selection">
          <form onSubmit={Handlesave}>
            <select
              className="form-select mb-3"
              aria-label="Default select example"
              onChange={(e) => setBloodGroup(e.target.value)}
              value={BloodGroup}
            >
              <option value="" disabled>
                Blood Group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>

            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleCityChange}
              value={city}
            >
              <option value="" disabled>
                Cities of Pakistan
              </option>
              {cities.map((city, index) => (
                <option key={index} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <button className="Submit" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      {data.map((user) => (
        <table className="table mt-5" key={user.id}>
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Blood Group</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row"></th>
              <td>{user.email}</td>
              <td>{user.fullName}</td>
              <td>{user.BloodGroup}</td>
              <td>{user.phone}</td>
            </tr>
          </tbody>
        </table>
      ))}
    </>
  );
};

export default Homepage;
