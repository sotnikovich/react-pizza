import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="300" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="258" rx="10" ry="10" width="280" height="27" />
    <rect x="15" y="405" rx="10" ry="10" width="90" height="31" />
    <rect x="125" y="398" rx="25" ry="25" width="152" height="45" />
    <circle cx="136" cy="123" r="120" />
  </ContentLoader>
);

export default Skeleton;
