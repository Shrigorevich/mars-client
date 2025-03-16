import { BadgedProperty } from "./BadgedProperty";

export const ticketType: {
    [key: number]: BadgedProperty;
} = {
    1: {
        title: "Question",
        color: "sky",
    },
    2: {
        title: "Issue",
        color: "orange",
    },
    3: {
        title: "Suggestion",
        color: "purple",
    },
    4: {
        title: "Feedback",
        color: "green",
    },
};
