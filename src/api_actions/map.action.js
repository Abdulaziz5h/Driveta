import axios from "axios";
import { $_themeConfig } from "@themeConfig";

export const getAllDistanceMatrix = (origins, destinations) => {
  var config = {
    method: "get",
    url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origins.lat}%2${origins.long}&destinations=${destinations.lat}%2${destinations.long}&key=${$_themeConfig.apiKey}`,
    headers: {
      "Access-Control-Allow-Origin": '*'
    },
  };
  return axios(config)
};
