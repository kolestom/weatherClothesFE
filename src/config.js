const url = "https://accounts.google.com/o/oauth2/v2/auth";
const client_id ="388240814662-pb3ojkq4ivh8djpqhp79i93fcnfvefvi.apps.googleusercontent.com";
const redirect_URI = "http://localhost:5173/callback";
const scope = "profile%20email%20openid";
const response_type = "code";
export const fullUrl = `${url}?client_id=${client_id}&redirect_uri=${redirect_URI}&scope=${scope}&response_type=${response_type}&prompt=consent%20select_account`;