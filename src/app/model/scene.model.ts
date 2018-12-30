import {Tag} from "./tags.model";

export interface Scene{
  "producer": string;
  "series": string;
  "title": string;
  "altTitles": string[];
  "playtime": string;
  "partners": string[];
  "links": string[];
  "tags": Tag[]
}
