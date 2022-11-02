var { v4: uuidv4 } = require("uuid");
var { PG_QUERY_EXECUTORS } = require("../models/pg/pgDbService");

// 1. Insert to job_test_project_mapping
// 2. Insert to job_test_project_execution
// 3. Insert to test_project_script_mapping
// 4. Insert to test_project_script_execution

const getTpScriptMasterDetails = (
  testResults,
  job_name,
  ci_job_name,
  executionEnd,
  tenant_name
) => {
  return testResults.reduce(
    (acc, val) => {
      acc.master.push([uuidv4(), val.name, job_name, ci_job_name]);
      acc.exec.push([
        uuidv4(),
        val.name,
        job_name,
        val.result,
        executionEnd,
        val.duration,
        val.targets.length,
        tenant_name,
      ]);
      return acc;
    },
    { master: [], exec: [] }
  );
};

const getTpScriptFailures = async (
  testResults,
  job_name,
  executionEnd,
  root_job
) => {
  let failedResults = [];

  await PG_QUERY_EXECUTORS.deleteTpFailedScripts(job_name, root_job);

  for (let i = 0; i < testResults.length; i++) {
    let resultObj = testResults[i];

    if (resultObj.result !== "Failed") continue;

    for (let j = 0; j < resultObj.targets.length; j++) {
      let targetObj = resultObj.targets[j];
      if (targetObj.result !== "Failed") continue;

      let failedResultsList = targetObj.failedSteps.reduce((acc, val) => {
        acc.push([
          val.message,
          resultObj.name,
          job_name,
          root_job,
          targetObj.targetName,
          executionEnd,
        ]);
        return acc;
      }, []);
      console.log("is push new 2ew", failedResultsList, targetObj.result);
      failedResults.push(failedResultsList);
    }
  }
  return failedResults;
};

const insertToTpMapping = async (payload, root_job, team_name, tenant_name) => {
  let {
    jobName,
    resultType,
    passRatio,
    passedTests,
    failedTests,
    skippedTests,
    testResults,
    reportUrl,
    executionEnd,
  } = payload;

  const masterTableQry = PG_QUERY_EXECUTORS.insertIntoTpMaster([
    uuidv4(),
    jobName,
    root_job,
    team_name,
  ]);

  const masterExecQry = PG_QUERY_EXECUTORS.insertIntoTpMasterExecution([
    uuidv4(),
    jobName,
    root_job,
    resultType,
    executionEnd,
    passRatio,
    passedTests,
    failedTests,
    skippedTests,
    testResults.length,
    tenant_name,
    reportUrl,
  ]);

  const tpScriptMasterData = getTpScriptMasterDetails(
    testResults,
    jobName,
    root_job,
    executionEnd,
    tenant_name
  );

  const tpScriptMasterQry = PG_QUERY_EXECUTORS.insertIntoTpScriptMaster(
    tpScriptMasterData.master
  );

  const tpScriptMasterExecQry = PG_QUERY_EXECUTORS.insertIntoTpScriptMasterExec(
    tpScriptMasterData.exec
  );

  const tpScriptFailures = await getTpScriptFailures(
    testResults,
    jobName,
    executionEnd,
    root_job
  );

  const queries = [
    {
      query: masterTableQry,
    },
    {
      query: masterExecQry,
    },
    {
      query: tpScriptMasterQry,
    },
    {
      query: tpScriptMasterExecQry,
    },
    // {
    //   query: tpScriptFailuresQry,
    // },
  ];
  console.log("test values is ", tpScriptFailures);
  if (tpScriptFailures.length) {
    const tpScriptFailuresQry =
      PG_QUERY_EXECUTORS.insertIntoTpScriptFailures(tpScriptFailures);
    queries.push({
      query: tpScriptFailuresQry,
    });
  }

  await PG_QUERY_EXECUTORS.populateTpTables(queries);
};

// const fetchAggrStatusByTenant = async (start_time, end_time) => {
//   const fetchByTenantDateStatusResult =
//     await PG_QUERY_EXECUTORS.fetchByTenantDateStatus(start_time, end_time);
//   let result = {};

//   for (let i = 0; i < fetchByTenantDateStatusResult.length; i++) {
//     let {
//       tenant_name,
//       team_name,
//       ci_job_name,
//       job_name,
//       build_result,
//       tc_pass_rate,
//       tc_passed_count,
//       tc_failed_count,
//       tc_skipped_count,
//       script_name,
//       script_build_result,
//       duration,
//       target_count,
//     } = fetchByTenantDateStatusResult[i];

//     result = {
//       [tenant_name]: {
//         ...(result[tenant_name] ? result[tenant_name] : {}),
//         ...{
//           [team_name]: {
//             ...(result[tenant_name] && result[tenant_name][team_name]
//               ? result[tenant_name][team_name]
//               : {}),
//             ...{
//               [ci_job_name]: {
//                 ...(result[tenant_name] &&
//                 result[tenant_name][team_name] &&
//                 result[tenant_name][team_name][ci_job_name]
//                   ? result[tenant_name][team_name][ci_job_name]
//                   : {}),
//                 ...{
//                   [job_name]: {
//                     ...(result[tenant_name] &&
//                     result[tenant_name][team_name] &&
//                     result[tenant_name][team_name][ci_job_name] &&
//                     result[tenant_name][team_name][ci_job_name][job_name]
//                       ? result[tenant_name][team_name][ci_job_name][job_name]
//                       : {
//                           status: build_result,
//                           duration,
//                           pass_rate: tc_pass_rate,
//                           passed_count: tc_passed_count,
//                           failed_count: tc_failed_count,
//                           sipped_count: tc_skipped_count,
//                         }),
//                     ...{
//                       scripts: [
//                         ...(result[tenant_name] &&
//                         result[tenant_name][team_name] &&
//                         result[tenant_name][team_name][ci_job_name] &&
//                         result[tenant_name][team_name][ci_job_name][job_name] &&
//                         result[tenant_name][team_name][ci_job_name][job_name]
//                           .scripts
//                           ? result[tenant_name][team_name][ci_job_name][
//                               job_name
//                             ].scripts
//                           : []),
//                         {
//                           script_name,
//                           status: script_build_result,
//                           target_count,
//                         },
//                       ],
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     };
//   }
//   console.log("test", result);
//   return result;
// };

const fetchScriptExecAggregate = async (payload) => {
  let result = {};
  for (let i = 0; i < payload.length; i++) {
    const { tenant_name, team_name, ci_job_name, job_name, passed_records } =
      payload[i];

    result = {
      ...result,
      [tenant_name]: {
        ...(result[tenant_name] ? result[tenant_name] : {}),
        ...{
          [team_name]: {
            ...(result[tenant_name] && result[tenant_name][team_name]
              ? result[tenant_name] && result[tenant_name][team_name]
              : {}),
            ...{
              [ci_job_name]: {
                ...(result[tenant_name] &&
                result[tenant_name][team_name] &&
                result[tenant_name][team_name][ci_job_name]
                  ? result[tenant_name][team_name][ci_job_name]
                  : {}),
                ...{
                  [job_name]: {
                    success_rate: `${passed_records}%`,
                  },
                },
              },
            },
          },
        },
      },
    };
  }
  return result;
};

const fetchAggrStatusByTenant = async (start_time, end_time) => {
  const qryResults = await Promise.all([
    PG_QUERY_EXECUTORS.fetchByTenantTeamDateSatatus(start_time, end_time),
    PG_QUERY_EXECUTORS.fetchByTenantTeamDateScriptStatus(start_time, end_time),
  ]);

  const [fetchByTenantDateStatusResult, fetchByTenantDateStatusResultScripts] =
    qryResults;

  let scriptExecAggr = fetchScriptExecAggregate(
    fetchByTenantDateStatusResultScripts
  );
  let result = {};
  for (let i = 0; i < fetchByTenantDateStatusResult.length; i++) {
    const {
      tenant_name,
      team_name,
      ci_job_name,
      job_name,
      passed_records,
      passed_count,
      total_count,
    } = fetchByTenantDateStatusResult[i];

    result = {
      ...result,
      [tenant_name]: {
        ...(result[tenant_name] ? result[tenant_name] : {}),
        ...{
          [team_name]: {
            ...(result[tenant_name] && result[tenant_name][team_name]
              ? result[tenant_name] && result[tenant_name][team_name]
              : {}),
            ...{
              [ci_job_name]: {
                ...(result[tenant_name] &&
                result[tenant_name][team_name] &&
                result[tenant_name][team_name][ci_job_name]
                  ? result[tenant_name][team_name][ci_job_name]
                  : {}),
                ...{
                  [job_name]: {
                    success_rate: `${passed_records}%`,

                    success_count: passed_count,
                    total_count: total_count,
                  },
                },
              },
            },
          },
        },
      },
    };
  }
  return result;
};

module.exports = {
  insertToTpMapping,
  fetchAggrStatusByTenant,
};
