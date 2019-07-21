import request from 'supertest';
import app from '../../../app';
import { Data } from "../../../../../common/interfaces/index";
import { default as matches } from "../../../../../common/data/matches.json";

describe('Test GET /api/v1/matches ', () => {

    it('Response should be 200 and equal to matches', async () => {
        const result = await request(app).get('/api/v1/matches');

        const data: Data = result.body;

        expect(result.status).toEqual(200);
        expect(data).toEqual(matches);
      });
})