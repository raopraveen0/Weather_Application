import axios from "axios";

const allApi = {
    weatherApi: async (city) => {
        try {
            debugger;
            const API_WEATHER_KEY = import.meta.env.VITE_API_WEATHER_KEY
            const Response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_WEATHER_KEY}&units=metric`);
            return Response.data;
        } catch (error) {
            console.log(error);
        }
    }

}

export default allApi;