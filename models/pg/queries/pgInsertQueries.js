module.exports = {
  Q_INSERT_TP_MASTER: {
    DEF_QUERY:
      "INSERT INTO job_test_project_mapping \
      (id, job_name, ci_job_name, team_name)  \
      VALUES (%L) \
      ON DUPLICATE KEY \
      UPDATE id=id;",
  },
  Q_INSERT_TP_MASTER_EXECUTION: {
    DEF_QUERY:
      "INSERT INTO job_test_project_execution \
      ( \
        id, job_name, ci_job_name, \
        build_result, build_timestamp, tc_pass_rate, \
        tc_passed_count, tc_failed_count, tc_skipped_count, \
        test_count, tenant_name, report_url \
      )  \
      VALUES (%L) \
      ON DUPLICATE KEY \
      UPDATE id=id;",
  },
  Q_INSERT_TP_SCRIPT_MASTER: {
    DEF_QUERY:
      "INSERT INTO test_project_script_mapping \
      ( \
        id, script_name, job_name, ci_job_name  \
      )  \
      VALUES %L \
      ON DUPLICATE KEY \
      UPDATE id=id;",
  },
  Q_INSERT_TP_SCRIPT_MASTER_EXEC: {
    DEF_QUERY:
      "INSERT INTO test_project_script_execution \
    ( \
      id, script_name, job_name, build_result,  \
      build_timestamp,duration,target_count,tenant_name \
    )  \
    VALUES %L \
    ON DUPLICATE KEY \
    UPDATE id=id;",
  },
  Q_INSERT_TP_SCRIPT_FAILURES: {
    DEF_QUERY:
      "INSERT INTO test_project_failed_steps \
    ( \
       step,script_name, \
       job_name,ci_job_name,  \
      target_Name ,build_timestamp \
    )  \
    VALUES %L \
    ON DUPLICATE KEY \
    UPDATE id=id;",
  },
};
