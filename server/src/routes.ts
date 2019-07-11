import { AsyncRouter } from "express-async-router";
import v1 from "./controllers/v1";

const routes = () => {
    const router = AsyncRouter();

    router.use("/v1", v1(router));

    return router;
};

export default routes;
