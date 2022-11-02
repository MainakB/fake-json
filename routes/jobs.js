var express = require("express");
var router = express.Router();
var mocks = require("../utils/mocks");

var { PG_QUERY_EXECUTORS } = require("../models/pg/pgDbService");
var {
  insertToTpMapping,
  fetchAggrStatusByTenant,
} = require("../utils/jobWorker");

router.get("/joblistoverview", async function (req, res, next) {
  // let fetchAllJobsQry = PG_QUERY_EXECUTORS.fetchAllJobs();
  // const [fetchAllJobs] = await Promise.all([fetchAllJobsQry]);

  let mockResult = mocks.getAllJobsMock();
  res.json({
    // jobsList: fetchAllJobs,
    jobsList: mockResult,
  });
});

router.post("/trends", async function (req, res, next) {
  // let result = await PG_QUERY_EXECUTORS.fetchSuccesTrendsByJob(
  //   req.body.job_name
  // );

  let jsonValue = mocks.getTrendsMock(req.body.job_name);
  res.json(jsonValue);
  // res.json(result);
});

router.post("/tenantsummary", async function (req, res, next) {
  // let result = await PG_QUERY_EXECUTORS.fetchTenantsTrendsByJob(
  //   req.body.job_name
  // );

  const getTenantsummarymock = mocks.getTenantsummarymock(req.body.job_name);
  res.json(getTenantsummarymock);

  // res.json(result);
});

router.post("/jobsummary", async function (req, res, next) {
  let jsonValue = [];

  // let result = await PG_QUERY_EXECUTORS.fetchJobTrendByTenantLine(
  //   req.body.job_name,
  //   1558198865346,
  //   1658325648704
  // );

  let resultMock = mocks.getJobsummaryMock();

  res.json({ job_tenant_trend: resultMock });
});

router.post("/updateTpMaster", async function (req, res, next) {
  let { payload, job_name, team_name, tenant_name } = req.body;

  await insertToTpMapping(payload, job_name, team_name, tenant_name);
  res.json("status: 'created");
});

router.post("/fetchaggregateReport", async function (req, res, next) {
  let { start_time, end_time } = req.body;
  console.log("date", start_time, end_time);
  // start_time = start_time || "2022-07-01T03:13:44.707Z";
  // end_time = end_time || "2022-07-24T03:12:44.707Z";

  // let result = await fetchAggrStatusByTenant(start_time, end_time);
  let resultMock = mocks.getFetchAggrStatusByTenantMock();
  res.json(resultMock);
});

module.exports = router;
