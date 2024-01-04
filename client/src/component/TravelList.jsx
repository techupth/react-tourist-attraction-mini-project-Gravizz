import { useState, useEffect } from "react";
import axios from "axios";

function TravelList() {
  const [travelList, setTravelList] = useState([]);
  const [keyword, setKeyword] = useState("");

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

  const handleTagClick = (tag, event) => {
    event.preventDefault();
    const newKeyword = `${tag} ${keyword}`;
    setKeyword(newKeyword);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  return (
    <>
      <h2>ค้นหาที่เที่ยว</h2>
      <input
        type="text"
        value={keyword}
        onChange={handleKeywordChange}
        placeholder="หาที่เที่ยวกัน"
      ></input>
      <div className="TravelList">
        {travelList.map((item, index) => {
          return (
            <div className="TravelItem" key={index}>
              <section className="ImageSection">
                <img className="MainPic" src={item.photos[0]}></img>
              </section>
              <section className="InfoSection">
                <a className="Title" href={item.url} target="_blank">
                  {item.title}
                </a>
                <p>
                  {item.description.slice(0, 100) + "..."}
                  <a href={item.url} target="_blank">
                    อ่านต่อ
                  </a>
                </p>
                <div className="Tags">
                  Tags:{" "}
                  {item.tags.map((tags, tagIndex) => {
                    return (
                      <a
                        className="Tag"
                        key={tagIndex}
                        onClick={(event) => {
                          handleTagClick(tags, event);
                        }}
                      >
                        {tags}
                      </a>
                    );
                  })}
                </div>
                <div className="PictureList">
                  {item.photos.map((photo, photoIndex) => {
                    return photoIndex !== 0 ? (
                      <img className="InfoPic" src={photo}></img>
                    ) : undefined;
                  })}
                </div>
                {/* <img className="LinkIcon" src="./link-icon.png"></img> */}
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default TravelList;
