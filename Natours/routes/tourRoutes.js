const express = require('express');
const tourController = require('./../controllers/tourController');

//Routing:
const router = express.Router();

//Top 5 Cheapest route - aliasing:
router.route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);


//Aggregation Pipeline Routes:
router.route('/tour-stats')
  .get(tourController.getTourStats);
router.route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);

router.route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router.route('/:id')
  .get(tourController.getATour)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTour);

//Export module:
module.exports = router;