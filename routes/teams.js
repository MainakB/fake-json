var express = require("express");
var router = express.Router();
var mocks = require("../utils/mocks");
var { PG_QUERY_EXECUTORS } = require("../models/pg/pgDbService");
var teamMockJson = require("../data/fake-teams-data.json");
var teamTrendsMockJson = require("../data/team_line.json");

/* GET users listing. */
router.get("/overview", function (req, res, next) {
  // let { start_time, end_time } = req.body;
  console.log(req.body);
  let jsonValue = [];
  for (let i = 0; i < 213; i++) {
    jsonValue.push({
      team_name: `team${i}`,
      total_jobs_count: `${Math.ceil(Math.random() * (300 - 20) + 20)}`,
      pipeline_jobs_count: `${Math.ceil(Math.random() * (200 - 20) + 20)}`,
      non_pipeline_jobs_count: `${Math.ceil(Math.random() * (90 - 20) + 20)}`,
      pipeline_success_rate: `${Math.ceil(Math.random() * (100 - 20) + 20)}`,
      non_pipeline_success_rate: "0",
      tenants_run: "4",
      avg_duration: "400",
      pipeline_avg_duration: "300",
      nonpipeline_avg_duration: "0",
    });
  }
  res.json(jsonValue);
});

router.post("/trends", function (req, res, next) {
  let jsonValue = [];
  console.log(req.body);
  for (let i = 0; i < 213; i++) {
    jsonValue.push({
      team_name: req.body.team,
      created_date: `2022-07-${Math.ceil(Math.random() * (1 - 30) + 30)}`,
      pipeline_success_rate: `${Math.ceil(Math.random() * (100 - 30) + 30)}`,
      non_pipeline_success_rate: `${Math.ceil(
        Math.random() * (100 - 45) + 45
      )}`,
      pipeline_failure_rate: `${Math.ceil(Math.random() * (100 - 82) + 82)}`,
      non_pipeline_failure_rate: `${Math.ceil(Math.random() * (100 - 8) + 8)}`,
    });
  }
  res.json(jsonValue);
  // res.json(teamTrendsMockJson);
});

router.post("/tenantsummary", function (req, res, next) {
  let jsonValue = [];
  console.log(req.body);
  let tenants = ["qa", "dev", "staging", "preprod", "prod", "canary"];
  for (let i = 0; i < tenants.length; i++) {
    jsonValue.push({
      team_name: req.body.team,
      tenant_name: tenants[i],
      pipeline_success_rate: 10 * 2 + i,
      non_pipeline_success_rate: Math.ceil(Math.random() * (100 - 45) + 45),
      pipeline_count: Math.ceil(Math.random() * (100 - 82) + 82),
      non_pipeline_count: Math.ceil(Math.random() * (100 - 8) + 8),
    });
  }
  res.json(jsonValue);
  // res.json(teamTrendsMockJson);
});

router.post("/teamsummary", async function (req, res, next) {
  let jsonValue = [];
  console.log(req.body);
  // let fetchAvgBuildDurationQry = PG_QUERY_EXECUTORS.fetchAvgBuildDuration(
  //   req.body.team
  // );
  // let fetchTotalJobCategoryCountByTeamQry =
  //   PG_QUERY_EXECUTORS.fetchTotalJobCategoryCountByTeam(req.body.team);
  // let fetchTotalJobSubCategoryCountByTeamQry =
  //   PG_QUERY_EXECUTORS.fetchTotalJobSubCategoryCountByTeam(req.body.team);

  // let fetchDailySuccessRateChangeByTeamQry =
  //   PG_QUERY_EXECUTORS.fetchDailySuccessRateChangeByTeam(req.body.team);

  // let fetchCurrentFailingByTeamQry =
  //   PG_QUERY_EXECUTORS.fetchCurrentFailingByTeam(req.body.team);

  // let fetchAllJobsByTeamQry = PG_QUERY_EXECUTORS.fetchAllJobsByTeam(
  //   req.body.team,
  //   1558198865346,
  //   1658325648704
  // );

  // const [
  //   fetchAvgBuildDuration,
  //   fetchTotalJobCategoryCountByTeam,
  //   fetchTotalJobSubCategoryCountByTeam,
  //   fetchDailySuccessRateChangeByTeam,
  //   fetchCurrentFailingByTeam,
  //   fetchAllJobsByTeam,
  // ] = await Promise.all([
  //   fetchAvgBuildDurationQry,
  //   fetchTotalJobCategoryCountByTeamQry,
  //   fetchTotalJobSubCategoryCountByTeamQry,
  //   fetchDailySuccessRateChangeByTeamQry,
  //   fetchCurrentFailingByTeamQry,
  //   fetchAllJobsByTeamQry,
  // ]);

  // let day = 0;
  // let month = 1;
  // let year = 2022;
  // let oldVal = 0;

  // let fakeGrowth = Array(100)
  //   .fill(0)
  //   .reduce((acc, value, idx) => {
  //     day = 1 + (day < 27 ? day : 0);
  //     month = day === 27 ? month + 1 : month;
  //     year = month > 12 ? year + 1 : year;
  //     month = month > 12 ? 1 : month;
  //     let val = Math.ceil(Math.random() * (100 - 9) + 9);
  //     let pow = Math.pow(-1, idx);
  //     let temp = {
  //       weekday: `${year}-${month}-${day}`,
  //       success_rate: val,
  //       Change: (val - oldVal) * pow,
  //       "@last_entry := success_rate": val,
  //       pow,
  //     };
  //     oldVal = val;
  //     acc.push(temp);
  //     return acc;
  //   }, []);

  // let result = {
  //   avg_duration: fetchAvgBuildDuration[0].build_duration,
  //   category_count: fetchTotalJobCategoryCountByTeam[0],
  //   sub_category_count: fetchTotalJobSubCategoryCountByTeam[0],
  //   growth: fakeGrowth,
  //   // fetchDailySuccessRateChangeByTeam,
  //   team_jobs: fetchAllJobsByTeam,
  //   current_fail_count:
  //     fetchCurrentFailingByTeamQry[0] &&
  //     fetchCurrentFailingByTeamQry[0].failing_count
  //       ? fetchCurrentFailingByTeamQry[0].failing_count
  //       : 0,
  // };
  const dataMock = mocks.getTeamSummaryMock(req.body.team);
  res.json(dataMock);
});

module.exports = router;
