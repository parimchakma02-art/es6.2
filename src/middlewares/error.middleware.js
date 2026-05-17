
export const notFoundHandler = (req, res, next ) => {
    res.status(404).json({ message: "Route Not Found"});

}

export const errorHandler = (err, req, res, next ) => {
    console.error(err);

    // if (err.type === "entity.parse.failed") {
    //     return res.status(400).json({ error: "Invalid JSON body" });
    // }

    const status = err.statusCode || 400;
    res.status(status).json({ error: err.message || "Something went wrong", stack: err.stack });

}


