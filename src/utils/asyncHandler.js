// when you have promises used.
// const asyncHandlerr = (requestHandler) => {
//   (err, req, res, next) => {
//     Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
//   };
// };
// export { asyncHandlerr };

//  when try catch is used.
const asyncHandler = (func) => async (err, req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    res.status(err.code || 500).json({
      success: false,
      message: err.message,
    });
  }
};
export { asyncHandler };
