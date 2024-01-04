import { useState, useEffect } from "react";
import axios from "axios";

function TravelList() {
  const [travelList, setTravelList] = useState([]);
  const [keyword, setKeyword] = useState();

  useEffect(() => {
    Search();
  }, [keyword]);

  const Search = async () => {
    const result = await axios.get(
      `http://localhost:4001/trips?keywords=${keyword}`
    );
    console.log(result.data.data);
    setTravelList(result.data.data);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <h1>เที่ยวไหนดี</h1>
      <input type="text" value={keyword} onChange={handleKeywordChange}></input>
      <div className="TravelList">
        {travelList.map((item) => {
          return (
            <div>
              <a className="Title" href={item.url} target="_blank">
                {item.title}
              </a>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TravelList;
