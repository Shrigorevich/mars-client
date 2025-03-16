import { BadgedProperty } from "./BadgedProperty";

export const ticketPriority: {
    [key: number]: BadgedProperty;
} = {
    1: {
        title: "Low",
        color: "sky",
    },
    2: {
        title: "Medium",
        color: "yellow",
    },
    3: {
        title: "High",
        color: "orange",
    },
    4: {
        title: "Priority",
        color: "red",
    },
    5: {
        title: "None",
        color: "zinc",
    },
};
