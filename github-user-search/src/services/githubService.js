import axios from "axios";

function fetchUserData() {
  axios
    .get("https://api.github.com/users/{username}")
    .then((response) => "Loading...")
    .catch((error) => "Looks like we cant find the user");
}
