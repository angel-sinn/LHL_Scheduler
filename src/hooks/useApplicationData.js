import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // getting scheduler data from api with axios
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

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

    // make request to API to update appointment with new interview info with axios
    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
      });
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

    // make request to API to update/delete appointment with new interview info with axios
    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
      });
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
}
