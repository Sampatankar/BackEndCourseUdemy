const mongoose = require('mongoose');
const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicated value: ${value}. This value already exists, please use another value.`;
  return new AppError(message, 404);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
}


const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  })
}

const sendErrorProd = (err, res) => {
  //These are operational errors so we send info to client:
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    //These are for errors that aren't normal - reduced info:
    console.error('This is the error: ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something has gone wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = {
      ...err
    };
    //CastError:
    if (err instanceof mongoose.Error.CastError) {
      error = handleCastErrorDB(error);
    }
    //DuplicatedFields:
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    //Validation errors:
    if (error.errors.name.name === 'ValidatorError') {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, res);
  }
}