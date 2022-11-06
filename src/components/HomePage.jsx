import React, { useEffect } from "react";
import "./HomePage.css";
import Location from "./Location";
import { useSelector, useDispatch } from "react-redux";
import {
  setRestaurantsData,
  setSuggestions,
  setRestaurant,
} from "../Redux/Reducer";

export default function HomePage() {
  const dispatch = useDispatch();
  const { restaurantsData, suggestions, restaurant, bookmark } = useSelector(
    (state) => state.reduxStore
  );

  const autocomplete = (name) => {
    if (name.length > 2) {
      const suggestions = restaurantsData.filter((restaurant) =>
        restaurant.fields.Name.toLowerCase().includes(name.toLowerCase())
      );
      dispatch(setSuggestions(suggestions));
    } else dispatch(setSuggestions([]));
  };
  useEffect(() => {
    fetch("https://api.airtable.com/v0/appjWdL7YgpxIxCKA/restaurants", {
      method: "get",
      headers: {
        Authorization: "Bearer keyfXgn8PL6pB3x32",
      },
    })
      .then((resp) => resp.json())
      .then((data) => dispatch(setRestaurantsData(data.records)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (restaurant)
      localStorage.setItem("restaurant", JSON.stringify(restaurant));
    if (bookmark) localStorage.setItem("bookmark", JSON.stringify(bookmark));
    console.log(localStorage.getItem("bookmark"));
    console.log(bookmark);
  }, [restaurant, bookmark]);
  return (
    <div className="App">
      <div className="box">
        <input
          id="search"
          placeholder="Search"
          onChange={(e) => autocomplete(e.target.value)}
        />
        <ul
          className="drop"
          style={{ height: suggestions.length ? "120px" : "" }}
          onClick={(e) => {
            if (e.target.innerText && !restaurant.includes(e.target.innerText))
              dispatch(setRestaurant([...restaurant, e.target.innerText]));
          }}
        >
          {suggestions.map((e) => (
            <li className="match" key={e.id}>
              {e.fields.Name}
            </li>
          ))}
        </ul>
        {restaurant?.map((e) => (
          <Location restaurantName={e} key={e} />
        ))}
      </div>
    </div>
  );
}
