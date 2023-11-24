import { Sex } from "../enum/sex";
import { language } from "../enum/language";

export interface UserConfiguration {
    language: language;
    sex: Sex;
    country: string;
}
