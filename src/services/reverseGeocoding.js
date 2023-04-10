import axios from "axios";
import {} from "dotenv/config";

const reverseGeocoding = async (coordinates) => {
  await axios.get("https://us1.locationiq.com/v1/reverse", {
      params: {
        key: process.env.locationIqKey,
        lat: coordinates.latitude,
        lon: coordinates.longitude,
        format: "json",
      },
    });
};

export default reverseGeocoding;
