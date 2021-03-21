import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

//check for available slots in a day
const availableSlots = (day, appointments) => {
  let count = 0;
  for (const id of day.appointments) {
    const appointment = appointments[id];
    if (!appointment.interview) {
      count++;
    }
  }
  return count;
};

// function to check for available slots and updates info
const updateSpots = function (dayName, days, appointments) {
  const day = days.find((item) => item.name === dayName);
  const slots = availableSlots(day, appointments);

  const newDaysArr = days.map((item) => {
    if (item.name === dayName) {
      return { ...item, spots: slots };
    }
    return item;
  });
  return newDaysArr;
};

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW:
      const { id, interview } = action;

      // replace current value of interview key with new value
      const appointment = {
        ...state.appointments[id],
        interview,
      };

      // replace existing record with matching id
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };

      const days = updateSpots(state.day, state.days, appointments);

      return { ...state, appointments, days };

    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // getting scheduler data from api with axios
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      dispatch({
        type: SET_APPLICATION_DATA,
        days,
        appointments,
        interviewers,
      });
    });
  }, []);

  // setting up websocket
  useEffect(() => {
    const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    socket.onopen = () => {
      socket.send("ping");
    };

    socket.onmessage = (event) => {
      // console.log("message received: " + event.data);

      const data = JSON.parse(event.data);
      // console.log(event.data);
      if (typeof data === "object" && data.type === "SET_INTERVIEW") {
        dispatch(data);
      }
    };

    // cleanup function
    return () => socket.close();

    // add dispatch as dependency!
  }, [dispatch]);

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    // make request to API to update appointment with new interview info with axios
    return axios.put(`/api/appointments/${id}`, { interview }).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview,
      });
    });
  };

  const cancelInterview = (id) => {
    // make request to API to update/delete appointment with new interview info with axios
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        id,
        interview: null,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
