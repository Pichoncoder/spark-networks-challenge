import { Router } from "express-async-router";
import getMatches from "./matches/get.matches";
import { Response, Request } from "express";

export default (router: Router) => {
    router.get("/matches", getMatches);

    return router;
};
