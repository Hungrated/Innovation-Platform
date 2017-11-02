const express = require('express');
const router = express.Router();

const db = require('../models/db_global');
const statusLib = require('../libs/status');

const Plan = db.Plan;

router.post('/submit', function (req, res) { // a student create a plan
  const {
    student_id,
    content,
    start_time,
    deadline
  } = req.body;

  Plan.create({
    content: content,
    start_time: start_time,
    deadline: deadline,
    student_id: student_id
  })
    .then(function () {
      res.json(statusLib.PLAN_SUBMIT_SUCCEEDED);
      console.log('plan submit succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.PLAN_SUBMIT_FAILED);
      console.log('plan submit failed');
    });

});

router.post('/rate', function (req, res) { // a teacher rates a plan
  const {
    plan_id,
    rate,
    remark
  } = req.body;

  const modData = {
    rate: rate,
    remark: remark
  };

  Plan.update(modData, {
    where: {
      id: plan_id
    }
  })
    .then(function () {
      res.json(statusLib.PLAN_RATE_SUCCEEDED);
      console.log('plan rate succeeded');
    })
    .catch(function (e) {
      console.error(e);
      res.json(statusLib.PLAN_RATE_FAILED);
      console.log('plan rate failed');
    });

});

module.exports = router;