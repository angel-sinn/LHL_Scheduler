import { useEffect, useReducer } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

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
      return { ...state, appointments: action.appointments, days: action.days };
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

  const setDay = (day) => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    // replace current value of interview key with new value
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // replace existing record with matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.day, state.days, appointments);

    // make request to API to update appointment with new interview info with axios
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      dispatch({ type: SET_INTERVIEW, appointments, days });
    });
  };

  const cancelInterview = (id) => {
    // set current value of interview key to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    // replace existing record with matching id
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = updateSpots(state.day, state.days, appointments);

    // make request to API to update/delete appointment with new interview info with axios
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        days,
      });
    });
  };

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

  return { state, setDay, bookInterview, cancelInterview };
}
