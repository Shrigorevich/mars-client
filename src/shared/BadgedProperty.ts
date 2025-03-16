import { BadgeColor } from "./BadgeColor";

export interface BadgedProperty {
    title: string;
    color: keyof typeof BadgeColor;
}
