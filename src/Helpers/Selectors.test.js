import { getAppointments, getInterview, getInterviewers } from "Helpers/Selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [1]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [1, 2]
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    }
  }
};

test("getAppointments returns an array", () => {
  const result = getAppointments(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getAppointments returns an array with a length matching the number of appointments for that day", () => {
  const result = getAppointments(state, "Monday");
  expect(result.length).toEqual(3);
});

test("getAppointments returns an array containing the correct appointment objects", () => {
  const [first, second] = getAppointments(state, "Tuesday");
  expect(first).toEqual(state.appointments["4"]);
  expect(second).toEqual(state.appointments["5"]);
});

test("getAppointments returns an empty array when the days data is empty", () => {
  const result = getAppointments({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getAppointments returns an empty array when the day is not found", () => {
  const result = getAppointments(state, "Wednesday");
  expect(result.length).toEqual(0);
});


test("getInterviewers returns an array", () => {
  const result = getInterviewers(state, "Monday");
  expect(Array.isArray(result)).toBe(true);
});

test("getInterviewers returns an array with a length matching the number of interviewers for that day", () => {
  const result = getInterviewers(state, "Monday");
  expect(result.length).toEqual(1);
});

test("getInterviewers returns an array containing the correct interviewer objects", () => {
  const [first, second] = getInterviewers(state, "Tuesday");
  expect(first).toEqual(state.interviewers["1"]);
  expect(second).toEqual(state.interviewers["2"]);
});

test("getInterviewers returns an empty array when the days data is empty", () => {
  const result = getInterviewers({ days: [] }, "Monday");
  expect(result.length).toEqual(0);
});

test("getInterviewers returns an empty array when the day is not found", () => {
  const result = getInterviewers(state, "Wednesday");
  expect(result.length).toEqual(0);
});


test("getInterview returns an object with the interviewer data", () => {
  const result = getInterview(state, state.appointments["3"].interview);
  expect(result).toEqual(
    expect.objectContaining({
      student: expect.any(String),
      interviewer: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        avatar: expect.any(String)
      })
    })
  );
});

test("getInterview returns null if no interview is booked", () => {
  const result = getInterview(state, state.appointments["2"].interview);
  expect(result).toBeNull();
});