import { default as comparasionFilter } from './index';

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
    "contacts_exchanged": 0,
    "favourite": true,
    "religion": "Atheist"
},
{
    "display_name": "Sharon",
    "age": 47,
    "job_title": "Doctor",
    "height_in_cm": 161,
    "city": {
        "name": "Leeds",
        "lat": 52.412811,
        "lon": -1.778197
    },
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

test('Filter: by Location', () => {
    const filtered = data.filter(el => comparasionFilter(el.city.name, 'Leeds'));

    expect(filtered.length).toBe(2);
});

