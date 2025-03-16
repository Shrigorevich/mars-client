import { BadgedProperty } from "./BadgedProperty";

export const ticketStatus: {
    [key: number]: BadgedProperty;
} = {
    1: {
        title: "new",
        color: "zinc",
    },
    2: {
        title: "open",
        color: "yellow",
    },
    3: {
        title: "AR - User",
        color: "sky",
    },
    4: {
        title: "AR - Development",
        color: "sky",
    },
    5: {
        title: "AR - Vendor",
        color: "sky",
    },
    6: {
        title: "closed",
        color: "green",
    },
};
