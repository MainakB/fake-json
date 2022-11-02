const getDate = (day, month, year) => {
  day = 1 + (day < 27 ? day : 0);
  month = day === 27 ? month + 1 : month;
  year = month > 12 ? year + 1 : year;
  month = month > 12 ? 1 : month;

  return [day, month, year];
};

const getAllJobsMock = () => {
  let result = [];

  for (let i = 0; i < Number(process.env.MOCK_JOBS_COUNT); i++) {
    let temp = {
      job_name: `http://38.242.152.179:8080/job/test-ui${i || ""}/`,
      is_pipeline: i % 8 ? "NO" : "YES",
      team_name: `team1${i}`,
      job_owner: i % 9 ? "N/A" : "admin",
      last_build_result: i % 7 ? "FAILURE" : "SUCCESS",
      last_build_url: `http://38.242.152.179:8080/job/test-ui/${i}/`,
      embeddable_url: `http://38.242.152.179:8080/buildStatus/icon?job=test-ui/&t=1658325599758`,
      last_build_timestamp: 1658324556129 + i,
    };
    result.push(temp);
  }
  return result;
};

const getTenantsummarymock = (job) => {
  let result = [];

  let tenants = process.env.MOCK_TENANTS.split(",");

  let totalrun = 93;
  //   let totalSuccess = 77;
  //   let totalFail = totalrun - totalSuccess;

  for (let i = 0; i < tenants.length; i++) {
    let temp = {
      tenant_name: tenants[i],
      success_rate: Math.ceil(Math.random() * (100 - 30) + 30),
      count: totalrun + 2 * i,
    };
    result.push(temp);
  }
  return result;
};

const getTrendsMock = (job) => {
  let result = [];

  let day = 14;
  let month = 7;
  let year = 2022;

  for (let i = 0; i < 7; i++) {
    let dates = getDate(day, month, year);
    day = dates[0];
    month = dates[1];
    year = dates[2];

    result.push({
      job_name: job,
      created_date: new Date(`${year}-${month}-${day}`),
      success_rate: Math.ceil(Math.random() * (100 - 30) + 30),
    });
  }
  return result;
};

const getJobsummaryMock = () => {
  let result = [];
  let tenantsList = process.env.MOCK_TENANTS.split(",");

  //   let tenantsList = Array(5)
  //     .fill(0)
  //     .map((val, idx) => `demoenv${[idx]}`);

  for (let j = 0; j < tenantsList.length; j++) {
    let day = 0;
    let month = 1;
    let year = 2022;
    let oldVal = 0;

    for (let i = 0; i < 5; i++) {
      day = 1 + (day < 27 ? day : 0);
      month = day === 27 ? month + 1 : month;
      year = month > 12 ? year + 1 : year;
      month = month > 12 ? 1 : month;

      result.push({
        tenant_name: tenantsList[j],
        created_timestamp: `${year}-${month}-${day}`,
        success_rate: Math.ceil(Math.random() * (100 - 9) + 9),
        count: Math.ceil(Math.random() * (40 - 9) + 9),
      });
    }
  }
  return result;
};

const getTeamSummaryMock = (team) => {
  return {
    avg_duration: 139,
    category_count: { pipeline_count: 5, non_pipeline_count: 0 },
    sub_category_count: { ui_jobs: 5, api_jobs: 0 },
    growth: [
      {
        weekday: "2022-1-1",
        success_rate: 45,
        Change: 45,
        "@last_entry := success_rate": 45,
        pow: 1,
      },
      {
        weekday: "2022-1-2",
        success_rate: 99,
        Change: -54,
        "@last_entry := success_rate": 99,
        pow: -1,
      },
      {
        weekday: "2022-1-3",
        success_rate: 82,
        Change: -17,
        "@last_entry := success_rate": 82,
        pow: 1,
      },
      {
        weekday: "2022-1-4",
        success_rate: 35,
        Change: 47,
        "@last_entry := success_rate": 35,
        pow: -1,
      },
      {
        weekday: "2022-1-5",
        success_rate: 20,
        Change: -15,
        "@last_entry := success_rate": 20,
        pow: 1,
      },
      {
        weekday: "2022-1-6",
        success_rate: 80,
        Change: -60,
        "@last_entry := success_rate": 80,
        pow: -1,
      },
      {
        weekday: "2022-1-7",
        success_rate: 93,
        Change: 13,
        "@last_entry := success_rate": 93,
        pow: 1,
      },
      {
        weekday: "2022-1-8",
        success_rate: 73,
        Change: 20,
        "@last_entry := success_rate": 73,
        pow: -1,
      },
      {
        weekday: "2022-1-9",
        success_rate: 95,
        Change: 22,
        "@last_entry := success_rate": 95,
        pow: 1,
      },
      {
        weekday: "2022-1-10",
        success_rate: 56,
        Change: 39,
        "@last_entry := success_rate": 56,
        pow: -1,
      },
      {
        weekday: "2022-1-11",
        success_rate: 94,
        Change: 38,
        "@last_entry := success_rate": 94,
        pow: 1,
      },
      {
        weekday: "2022-1-12",
        success_rate: 18,
        Change: 76,
        "@last_entry := success_rate": 18,
        pow: -1,
      },
      {
        weekday: "2022-1-13",
        success_rate: 17,
        Change: -1,
        "@last_entry := success_rate": 17,
        pow: 1,
      },
      {
        weekday: "2022-1-14",
        success_rate: 11,
        Change: 6,
        "@last_entry := success_rate": 11,
        pow: -1,
      },
      {
        weekday: "2022-1-15",
        success_rate: 67,
        Change: 56,
        "@last_entry := success_rate": 67,
        pow: 1,
      },
      {
        weekday: "2022-1-16",
        success_rate: 87,
        Change: -20,
        "@last_entry := success_rate": 87,
        pow: -1,
      },
      {
        weekday: "2022-1-17",
        success_rate: 86,
        Change: -1,
        "@last_entry := success_rate": 86,
        pow: 1,
      },
      {
        weekday: "2022-1-18",
        success_rate: 13,
        Change: 73,
        "@last_entry := success_rate": 13,
        pow: -1,
      },
      {
        weekday: "2022-1-19",
        success_rate: 65,
        Change: 52,
        "@last_entry := success_rate": 65,
        pow: 1,
      },
      {
        weekday: "2022-1-20",
        success_rate: 54,
        Change: 11,
        "@last_entry := success_rate": 54,
        pow: -1,
      },
      {
        weekday: "2022-1-21",
        success_rate: 89,
        Change: 35,
        "@last_entry := success_rate": 89,
        pow: 1,
      },
      {
        weekday: "2022-1-22",
        success_rate: 21,
        Change: 68,
        "@last_entry := success_rate": 21,
        pow: -1,
      },
      {
        weekday: "2022-1-23",
        success_rate: 60,
        Change: 39,
        "@last_entry := success_rate": 60,
        pow: 1,
      },
      {
        weekday: "2022-1-24",
        success_rate: 99,
        Change: -39,
        "@last_entry := success_rate": 99,
        pow: -1,
      },
      {
        weekday: "2022-1-25",
        success_rate: 30,
        Change: -69,
        "@last_entry := success_rate": 30,
        pow: 1,
      },
      {
        weekday: "2022-1-26",
        success_rate: 53,
        Change: -23,
        "@last_entry := success_rate": 53,
        pow: -1,
      },
      {
        weekday: "2022-2-27",
        success_rate: 19,
        Change: -34,
        "@last_entry := success_rate": 19,
        pow: 1,
      },
      {
        weekday: "2022-2-1",
        success_rate: 71,
        Change: -52,
        "@last_entry := success_rate": 71,
        pow: -1,
      },
      {
        weekday: "2022-2-2",
        success_rate: 39,
        Change: -32,
        "@last_entry := success_rate": 39,
        pow: 1,
      },
      {
        weekday: "2022-2-3",
        success_rate: 69,
        Change: -30,
        "@last_entry := success_rate": 69,
        pow: -1,
      },
      {
        weekday: "2022-2-4",
        success_rate: 18,
        Change: -51,
        "@last_entry := success_rate": 18,
        pow: 1,
      },
      {
        weekday: "2022-2-5",
        success_rate: 77,
        Change: -59,
        "@last_entry := success_rate": 77,
        pow: -1,
      },
      {
        weekday: "2022-2-6",
        success_rate: 62,
        Change: -15,
        "@last_entry := success_rate": 62,
        pow: 1,
      },
      {
        weekday: "2022-2-7",
        success_rate: 81,
        Change: -19,
        "@last_entry := success_rate": 81,
        pow: -1,
      },
      {
        weekday: "2022-2-8",
        success_rate: 100,
        Change: 19,
        "@last_entry := success_rate": 100,
        pow: 1,
      },
      {
        weekday: "2022-2-9",
        success_rate: 90,
        Change: 10,
        "@last_entry := success_rate": 90,
        pow: -1,
      },
      {
        weekday: "2022-2-10",
        success_rate: 20,
        Change: -70,
        "@last_entry := success_rate": 20,
        pow: 1,
      },
      {
        weekday: "2022-2-11",
        success_rate: 57,
        Change: -37,
        "@last_entry := success_rate": 57,
        pow: -1,
      },
      {
        weekday: "2022-2-12",
        success_rate: 81,
        Change: 24,
        "@last_entry := success_rate": 81,
        pow: 1,
      },
      {
        weekday: "2022-2-13",
        success_rate: 61,
        Change: 20,
        "@last_entry := success_rate": 61,
        pow: -1,
      },
      {
        weekday: "2022-2-14",
        success_rate: 65,
        Change: 4,
        "@last_entry := success_rate": 65,
        pow: 1,
      },
      {
        weekday: "2022-2-15",
        success_rate: 24,
        Change: 41,
        "@last_entry := success_rate": 24,
        pow: -1,
      },
      {
        weekday: "2022-2-16",
        success_rate: 37,
        Change: 13,
        "@last_entry := success_rate": 37,
        pow: 1,
      },
      {
        weekday: "2022-2-17",
        success_rate: 55,
        Change: -18,
        "@last_entry := success_rate": 55,
        pow: -1,
      },
      {
        weekday: "2022-2-18",
        success_rate: 96,
        Change: 41,
        "@last_entry := success_rate": 96,
        pow: 1,
      },
      {
        weekday: "2022-2-19",
        success_rate: 97,
        Change: -1,
        "@last_entry := success_rate": 97,
        pow: -1,
      },
      {
        weekday: "2022-2-20",
        success_rate: 77,
        Change: -20,
        "@last_entry := success_rate": 77,
        pow: 1,
      },
      {
        weekday: "2022-2-21",
        success_rate: 61,
        Change: 16,
        "@last_entry := success_rate": 61,
        pow: -1,
      },
      {
        weekday: "2022-2-22",
        success_rate: 76,
        Change: 15,
        "@last_entry := success_rate": 76,
        pow: 1,
      },
      {
        weekday: "2022-2-23",
        success_rate: 100,
        Change: -24,
        "@last_entry := success_rate": 100,
        pow: -1,
      },
      {
        weekday: "2022-2-24",
        success_rate: 85,
        Change: -15,
        "@last_entry := success_rate": 85,
        pow: 1,
      },
      {
        weekday: "2022-2-25",
        success_rate: 37,
        Change: 48,
        "@last_entry := success_rate": 37,
        pow: -1,
      },
      {
        weekday: "2022-2-26",
        success_rate: 67,
        Change: 30,
        "@last_entry := success_rate": 67,
        pow: 1,
      },
      {
        weekday: "2022-3-27",
        success_rate: 81,
        Change: -14,
        "@last_entry := success_rate": 81,
        pow: -1,
      },
      {
        weekday: "2022-3-1",
        success_rate: 33,
        Change: -48,
        "@last_entry := success_rate": 33,
        pow: 1,
      },
      {
        weekday: "2022-3-2",
        success_rate: 88,
        Change: -55,
        "@last_entry := success_rate": 88,
        pow: -1,
      },
      {
        weekday: "2022-3-3",
        success_rate: 71,
        Change: -17,
        "@last_entry := success_rate": 71,
        pow: 1,
      },
      {
        weekday: "2022-3-4",
        success_rate: 63,
        Change: 8,
        "@last_entry := success_rate": 63,
        pow: -1,
      },
      {
        weekday: "2022-3-5",
        success_rate: 77,
        Change: 14,
        "@last_entry := success_rate": 77,
        pow: 1,
      },
      {
        weekday: "2022-3-6",
        success_rate: 75,
        Change: 2,
        "@last_entry := success_rate": 75,
        pow: -1,
      },
      {
        weekday: "2022-3-7",
        success_rate: 59,
        Change: -16,
        "@last_entry := success_rate": 59,
        pow: 1,
      },
      {
        weekday: "2022-3-8",
        success_rate: 40,
        Change: 19,
        "@last_entry := success_rate": 40,
        pow: -1,
      },
      {
        weekday: "2022-3-9",
        success_rate: 96,
        Change: 56,
        "@last_entry := success_rate": 96,
        pow: 1,
      },
      {
        weekday: "2022-3-10",
        success_rate: 80,
        Change: 16,
        "@last_entry := success_rate": 80,
        pow: -1,
      },
      {
        weekday: "2022-3-11",
        success_rate: 97,
        Change: 17,
        "@last_entry := success_rate": 97,
        pow: 1,
      },
      {
        weekday: "2022-3-12",
        success_rate: 57,
        Change: 40,
        "@last_entry := success_rate": 57,
        pow: -1,
      },
      {
        weekday: "2022-3-13",
        success_rate: 35,
        Change: -22,
        "@last_entry := success_rate": 35,
        pow: 1,
      },
      {
        weekday: "2022-3-14",
        success_rate: 20,
        Change: 15,
        "@last_entry := success_rate": 20,
        pow: -1,
      },
      {
        weekday: "2022-3-15",
        success_rate: 91,
        Change: 71,
        "@last_entry := success_rate": 91,
        pow: 1,
      },
      {
        weekday: "2022-3-16",
        success_rate: 72,
        Change: 19,
        "@last_entry := success_rate": 72,
        pow: -1,
      },
      {
        weekday: "2022-3-17",
        success_rate: 77,
        Change: 5,
        "@last_entry := success_rate": 77,
        pow: 1,
      },
      {
        weekday: "2022-3-18",
        success_rate: 53,
        Change: 24,
        "@last_entry := success_rate": 53,
        pow: -1,
      },
      {
        weekday: "2022-3-19",
        success_rate: 35,
        Change: -18,
        "@last_entry := success_rate": 35,
        pow: 1,
      },
      {
        weekday: "2022-3-20",
        success_rate: 45,
        Change: -10,
        "@last_entry := success_rate": 45,
        pow: -1,
      },
      {
        weekday: "2022-3-21",
        success_rate: 31,
        Change: -14,
        "@last_entry := success_rate": 31,
        pow: 1,
      },
      {
        weekday: "2022-3-22",
        success_rate: 17,
        Change: 14,
        "@last_entry := success_rate": 17,
        pow: -1,
      },
      {
        weekday: "2022-3-23",
        success_rate: 65,
        Change: 48,
        "@last_entry := success_rate": 65,
        pow: 1,
      },
      {
        weekday: "2022-3-24",
        success_rate: 88,
        Change: -23,
        "@last_entry := success_rate": 88,
        pow: -1,
      },
      {
        weekday: "2022-3-25",
        success_rate: 17,
        Change: -71,
        "@last_entry := success_rate": 17,
        pow: 1,
      },
      {
        weekday: "2022-3-26",
        success_rate: 98,
        Change: -81,
        "@last_entry := success_rate": 98,
        pow: -1,
      },
      {
        weekday: "2022-4-27",
        success_rate: 53,
        Change: -45,
        "@last_entry := success_rate": 53,
        pow: 1,
      },
      {
        weekday: "2022-4-1",
        success_rate: 11,
        Change: 42,
        "@last_entry := success_rate": 11,
        pow: -1,
      },
      {
        weekday: "2022-4-2",
        success_rate: 49,
        Change: 38,
        "@last_entry := success_rate": 49,
        pow: 1,
      },
      {
        weekday: "2022-4-3",
        success_rate: 73,
        Change: -24,
        "@last_entry := success_rate": 73,
        pow: -1,
      },
      {
        weekday: "2022-4-4",
        success_rate: 78,
        Change: 5,
        "@last_entry := success_rate": 78,
        pow: 1,
      },
      {
        weekday: "2022-4-5",
        success_rate: 93,
        Change: -15,
        "@last_entry := success_rate": 93,
        pow: -1,
      },
      {
        weekday: "2022-4-6",
        success_rate: 51,
        Change: -42,
        "@last_entry := success_rate": 51,
        pow: 1,
      },
      {
        weekday: "2022-4-7",
        success_rate: 13,
        Change: 38,
        "@last_entry := success_rate": 13,
        pow: -1,
      },
      {
        weekday: "2022-4-8",
        success_rate: 78,
        Change: 65,
        "@last_entry := success_rate": 78,
        pow: 1,
      },
      {
        weekday: "2022-4-9",
        success_rate: 84,
        Change: -6,
        "@last_entry := success_rate": 84,
        pow: -1,
      },
      {
        weekday: "2022-4-10",
        success_rate: 72,
        Change: -12,
        "@last_entry := success_rate": 72,
        pow: 1,
      },
      {
        weekday: "2022-4-11",
        success_rate: 96,
        Change: -24,
        "@last_entry := success_rate": 96,
        pow: -1,
      },
      {
        weekday: "2022-4-12",
        success_rate: 99,
        Change: 3,
        "@last_entry := success_rate": 99,
        pow: 1,
      },
      {
        weekday: "2022-4-13",
        success_rate: 57,
        Change: 42,
        "@last_entry := success_rate": 57,
        pow: -1,
      },
      {
        weekday: "2022-4-14",
        success_rate: 25,
        Change: -32,
        "@last_entry := success_rate": 25,
        pow: 1,
      },
      {
        weekday: "2022-4-15",
        success_rate: 90,
        Change: -65,
        "@last_entry := success_rate": 90,
        pow: -1,
      },
      {
        weekday: "2022-4-16",
        success_rate: 71,
        Change: -19,
        "@last_entry := success_rate": 71,
        pow: 1,
      },
      {
        weekday: "2022-4-17",
        success_rate: 68,
        Change: 3,
        "@last_entry := success_rate": 68,
        pow: -1,
      },
      {
        weekday: "2022-4-18",
        success_rate: 77,
        Change: 9,
        "@last_entry := success_rate": 77,
        pow: 1,
      },
      {
        weekday: "2022-4-19",
        success_rate: 74,
        Change: 3,
        "@last_entry := success_rate": 74,
        pow: -1,
      },
    ],
    team_jobs: [
      {
        job_name: "http://38.242.152.179:8080/job/test-ui/",
        is_pipeline: "YES",
        build_result: "SUCCESS",
        tenant_name: "qa",
        team_name: team,
        build_duration: 123647,
        branch_name: "main",
        build_timestamp: 1658325196402,
      },
      {
        job_name: "http://38.242.152.179:8080/job/test-ui2/",
        is_pipeline: "YES",
        build_result: "FAILURE",
        tenant_name: "dev",
        team_name: team,
        build_duration: 123647,
        branch_name: "main",
        build_timestamp: 1658325196102,
      },
      {
        job_name: "http://38.242.152.179:8080/job/test-ui3/",
        is_pipeline: "YES",
        build_result: "FAILURE",
        tenant_name: "dev",
        team_name: team,
        build_duration: 123647,
        branch_name: "main",
        build_timestamp: 1658325196162,
      },
    ],
    current_fail_count: 0,
  };
};

const getTotalTestMock = (job_name) => {
  let result = {
    count: 180,
    "Test Project": 70,
    Postman: 110,
  };
};

const getFetchAggrStatusByTenantMock = () => {
  return {
    dev: {
      team0: {
        "https://odplabs.jenkins.com/payments": {
          "payments-plan": {
            success_rate: "30%",
            success_count: 0,
            total_count: 4,
          },
        },
        "https://odplabs.jenkins.com/sales_tax": {
          "mp-sales-tax": {
            success_rate: "100%",
            success_count: 4,
            total_count: 4,
          },
          "mp-service-tax": {
            success_rate: "100%",
            success_count: 8,
            total_count: 8,
          },
          "mp-service-tax3": {
            success_rate: "100%",
            success_count: 5,
            total_count: 5,
          },
        },
      },
      team3: {
        "https://odplabs.jenkins.com/payments3": {
          "payments-plan3": {
            success_rate: "0%",
            success_count: 0,
            total_count: 4,
          },
        },
        "https://odplabs.jenkins.com/sales_tax3": {
          "mp-sales-tax3": {
            success_rate: "0%",
            success_count: 0,
            total_count: 8,
          },
        },
      },
    },
    qa: {
      team2: {
        "https://odplabs.jenkins.com/shipping": {
          "shipping-cost": {
            success_rate: "0%",
            success_count: 0,
            total_count: 8,
          },
          "shipping-dates": {
            success_rate: "0%",
            success_count: 0,
            total_count: 8,
          },
        },
      },
    },
  };
};

module.exports = {
  getAllJobsMock,
  getTenantsummarymock,
  getTrendsMock,
  getJobsummaryMock,
  getTeamSummaryMock,
  getFetchAggrStatusByTenantMock,
};
