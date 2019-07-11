export interface Match {
  display_name: string;
  age: number;
  job_title: string;
  height_in_cm: number;
  city: City;
  main_photo?: string;
  compatibility_score: number;
  contacts_exchanged: number;
  favourite: boolean;
  religion: string;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}

export interface Matches extends Array<Match> {}

export interface Data {
  matches: Matches;
}