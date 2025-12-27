const asyncHandler = (requestHandler) => async(req,res,next) => {
    try {
        return await requestHandler(req,res,next);
    } catch (err) {

         const statusCode =
        err.statusCode && err.statusCode >= 400 && err.statusCode < 600
        ? err.statusCode
        : 500;

        res.status(statusCode).json({
            success: false,
            message: err.message
        });
    }
}

export default asyncHandler;