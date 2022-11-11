import Pagination from "./Pagination/Pagination";
import react, { useState } from "react";

export default function App() {
  const [state, setState] = useState(1);
  const [search, setSearch] = useState("");
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context(
      "./Asserts/all animated icons",
      false,
      /\.(png|jpe?g|svg|gif)$/
    )
  );
  let data = Object.entries(images).map((item) => {
    return item;
  });
  const handlePagination = (current) => {
    setState(current);
  };

  return (
    <>
      <input type="text" onChange={(e) => setSearch(e.target.value)} />
      <div>
        {data
          .filter(
            (data1, index) => index >= (state - 1) * 20 && index <= state * 20
          )
          ?.map((item) => {
            return (
              <a href={item[1]} download>
                <img
                  style={{ width: "200px", height: "200px" }}
                  src={item[1]}
                />
              </a>
            );
          })}
        <Pagination
          total={(Math.round(Object.values(images).length / 20) * 20) / 20}
          current={state}
          pagination={(crPage) => handlePagination(crPage)}
        />
      </div>
    </>
  );
}
