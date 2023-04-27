export const Favorite = ({city, getWeather}) => {
    return (
        <>
          <div onClick={()=>getWeather(`${city.city}, ${city.country}`)}>{city.city}, {city.country}</div>
        </>
      );
}