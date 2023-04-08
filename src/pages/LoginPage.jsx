import axios from "axios";

const LoginPage = () => {
  const options = {
    method: "GET",
    url: "https://weather1395.p.rapidapi.com/temperature",
    params: { url: "Casablanca" },
    headers: {
      "X-RapidAPI-Key": "51b62225f3msha711ffda4551c64p193932jsn89f02785fb25",
      "X-RapidAPI-Host": "weather1395.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const client_id =
    "388240814662-pb3ojkq4ivh8djpqhp79i93fcnfvefvi.apps.googleusercontent.com";
  const redirect_URI = "http://localhost:5173/callback";
  const scope = "profile%20email%20openid";
  const response_type = "code";
  const fullUrl = `${url}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&prompt=consent%20select_account`;
  return (
    <>
      <h2>Login Page</h2>
      <a href={fullUrl}>Login with Google</a>
    </>
  );
};

export default LoginPage;
