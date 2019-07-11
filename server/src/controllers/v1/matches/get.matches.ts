import { Response, Request } from "express";
import { default as matches } from "../../../data/matches.json";
import { Data } from "../../../../../common/interfaces/index";

export default async (req: Request, res: Response) => {
    const data: Data = matches;

    try {
        res.json(data);

    } catch (error) {

        res.json(error);
    }
};