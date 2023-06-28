import React from "react";

export const FavoriteHeart = (props) => {
  const { isFavorite } = props;

  return (
    <>
      <div onClick={() => console.log("hello")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          data-name="Layer 2"
          viewBox="1.5 2 29 28"
          className={isFavorite ? "heart-svg is-favorite" : "heart-svg"}
        >
          <path d="M27.76,5.52h0c-1.48-1.63-3.45-2.52-5.54-2.52h0c-2.1,0-4.07,.89-5.55,2.52l-.65,.75-.68-.75c-1.48-1.62-3.45-2.51-5.54-2.51s-4.08,.89-5.55,2.52c-2.98,3.3-2.98,8.66,0,11.95l9.56,10.55c.57,.62,1.37,.98,2.2,.98h0c.83,0,1.63-.36,2.2-.98l9.56-10.55c1.44-1.59,2.24-3.71,2.24-5.97s-.8-4.39-2.24-5.98Z" />
        </svg>
      </div>
    </>
  );
};
