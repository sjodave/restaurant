import React from "react";
import { useSelector } from "react-redux";
import Location from "./Location";

export default function Bookmark() {
  const { bookmark } = useSelector((state) => state.reduxStore);
  if (!bookmark)
    return (
      <>
        <h2>No Bookmarks</h2>
      </>
    );
  return (
    <div className="box">
      <h2>BookMarks</h2>
      {bookmark?.map((e) => (
        <Location restaurantName={e} isBookmark={true} key={e} />
      ))}
    </div>
  );
}
