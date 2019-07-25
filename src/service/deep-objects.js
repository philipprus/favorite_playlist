export const isLoading = (req) =>
    !!(req && req.status === "loading");

export const isIdle = (req) =>
    !!(req && req.status === "idle");

export const isFailed = (req) =>
    !!(req && req.status === "failed");