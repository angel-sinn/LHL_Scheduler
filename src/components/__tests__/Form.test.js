import React from "react";

import { render, cleanup, fireEvent, prettyDOM } from "@testing-library/react";

import Form from "components/Appointment/Form";

afterEach(cleanup);

describe("Form", () => {
  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
  ];

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Angel Sinn" />
    );
    expect(getByTestId("student-name-input")).toHaveValue("Angel Sinn");
  });

  it("validates that the student name is not blank", () => {
    const onSave = jest.fn();

    const { getByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );

    fireEvent.click(getByText("Save"));
    expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit a student name", () => {
    const onSave = jest.fn();
    const {
      getByText,
      getByPlaceholderText,
      getByAltText,
      queryByText,
    } = render(<Form interviewers={interviewers} onSave={onSave} />);

    fireEvent.click(getByText("Save"));

    expect(getByText(/Student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Angel Sinn" },
    });

    fireEvent.click(getByAltText("Sylvia Palmer"));

    fireEvent.click(getByText("Save"));

    expect(queryByText(/Student name cannot be blank/i)).toBeNull();

    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Angel Sinn", 1);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Angel Sinn"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );

    fireEvent.click(getByText("Save"));

    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Angel Sinn" },
    });

    fireEvent.click(getByText("Cancel"));

    expect(queryByText(/Student name cannot be blank/i)).toBeNull();

    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");

    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
