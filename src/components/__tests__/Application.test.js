import React from "react";
import axios from "axios";

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  prettyDOM,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  waitForElementToBeRemoved,
  queryByText,
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// Using async/await for practice instead of promises
describe("Application", () => {
  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
    await waitForElement(() => getByText("Monday"));
    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    // 1. render application
    const { container, debug } = render(<Application />);

    // 2. wait until text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    // 3. click "Add" button on first empty appt
    fireEvent.click(getByAltText(appointment, "Add"));

    // 4. Enter name "Lydia Miller-Jones" into input with placeholder "Enter Student Name"
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" },
    });

    // 5. Click first interviewer in list
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // 6. Click "save" button on same appointment
    fireEvent.click(getByText(appointment, "Save"));

    // 7. Check element with the text "saving" is displayed
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // 8. Wait until element with text "Lydia Miller-Jones" is displayed
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    // 9. Check that DayListItem with the text "Monday" also has the text "no spots remaining"
    const day = getAllByTestId(container, "day").find((day) =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "No spots remaining")).toBeInTheDocument();
    // console.log(prettyDOM(appointment));
  });
});
