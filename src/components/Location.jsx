import React from "react";
import { setBookmark, setRestaurant } from "../Redux/Reducer";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "react-bootstrap";
export default function Location({ restaurantName, isBookmark }) {
  const dispatch = useDispatch();
  const color = { backgroundColor: "rebeccapurple", color: "white" };
  const { restaurant, bookmark } = useSelector((state) => state.reduxStore);
  const remove = () => {
    const list = restaurant.filter((name) => restaurantName !== name);
    dispatch(setRestaurant(list));
  };
  const bookmarkHandler = () => {
    const item = restaurant.filter((name) => restaurantName === name);
    dispatch(setBookmark([...bookmark, item]));
    remove();
  };
  const removeBookmark = () => {
    const item = bookmark.filter((name) => restaurantName !== name);
    dispatch(setBookmark(item));
  };
  if (!restaurant) return;
  return (
    <Card className="p-2 mb-3">
      <div className="p-2" style={color}>
        {restaurantName}
      </div>
      <iframe
        title="map"
        width="600"
        height="450"
        src={`https://datastudio.google.com/embed/reporting/430242fa-4162-4950-a984-824b3b355b3c/page/dQMwC?params={"ds2.name2":"${restaurantName}"}`}
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
      {!isBookmark ? (
        <div className="d-flex justify-content-around">
          <Button style={color} onClick={bookmarkHandler}>
            BookMark
          </Button>
          <Button style={color} onClick={remove}>
            Remove
          </Button>
        </div>
      ) : (
        <Button style={color} onClick={removeBookmark}>
          Remove
        </Button>
      )}
    </Card>
  );
}
