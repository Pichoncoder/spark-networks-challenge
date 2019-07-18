import {default as rageFilter} from './index';

const data = [{
  "display_name": "Caroline",
  "age": 41,
  "job_title": "Corporate Lawyer",
  "height_in_cm": 153,
  "city": {
    "name": "Leeds",
    "lat": 53.801277,
    "lon": -1.548567
  },
  "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
  "compatibility_score": 0.76,
  "contacts_exchanged": 2,
  "favourite": true,
  "religion": "Atheist"
},
{
  "display_name": "Sharon",
  "age": 47,
  "job_title": "Doctor",
  "height_in_cm": 161,
  "city": {
    "name": "Solihull",
    "lat": 52.412811,
    "lon": -1.778197
  },
  "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
  "compatibility_score": 0.97,
  "contacts_exchanged": 0,
  "favourite": false,
  "religion": "Islam"
},
{
  "display_name": "Natalia",
  "age": 38,
  "job_title": "Project Manager",
  "height_in_cm": 144,
  "city": {
    "name": "Cardiff",
    "lat": 51.481583,
    "lon": -3.179090
  },
  "main_photo": "http://thecatapi.com/api/images/get?format=src&type=gif",
  "compatibility_score": 0.47,
  "contacts_exchanged": 5,
  "favourite": false,
  "religion": "Christian"
}]    

test('Filters: Range compatibility_score', () => {
    const filtered = data.filter(el => rageFilter(el.compatibility_score, [0.55, 0.90]));

    expect(filtered.length).toBe(1);
  });

  test('Filters: Range age', () => {
    const filtered = data.filter(el => rageFilter(el.age, [38, 41]));

    expect(filtered.length).toBe(2);
  });

  test('Filters: Range height_in_cm', () => {
    const filtered = data.filter(el => rageFilter(el.height_in_cm, [150, 170]));

    expect(filtered.length).toBe(2);
  });