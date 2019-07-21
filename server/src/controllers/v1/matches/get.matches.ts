import { Response, Request } from "express";
import { default as matches } from "../../../../../common/data/matches.json";
import { Data } from "../../../../../common/interfaces/index";

export default async (req: Request, res: Response) => {
    const data: Data = matches;

    try {
        res.json(data).status(200);

    } catch (error) {

        res.json(error);
    }
};