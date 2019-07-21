import { Router } from "express-async-router";
import getMatches from "./matches/get.matches";

export default (router: Router) => {
    router.get("/matches", getMatches);

    return router;
};
