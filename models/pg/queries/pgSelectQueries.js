module.exports = {
  Q_FETCH_JOB_BY_NAME: {
    DEF_QUERY:
      "SELECT job_id \
        FROM job_details \
        WHERE job_name=%L \
        AND ci_name=%L \
        AND team_name=%L;",
  },

  Q_FETCH_UPSTREAM_JOB_BY_NAME: {
    DEF_QUERY:
      "SELECT upstream_job_id \
        FROM  upstream_job_details \
        WHERE upstream_job_name=%L \
        AND ci_workspace_id= %L \
        AND ci_name=%L \
        AND client_name=%L;",
  },

  Q_FETCH_DOWNSTREAM_JOB_HISTORY_BY_QUEUEID_DETAILS: {
    DEF_QUERY:
      "SELECT downstream_job_id \
        FROM  build_history_downstream \
        WHERE downstream_job_id=%L \
        AND build_url=%L \
        AND build_number = %L \
        AND workspace_name= %L \
        AND ci_type=%L \
        AND client_name=%L;",
  },
  Q_FETCH_UPSTREAM_JOB_HISTORY_BY_QUEUEID_DETAILS: {
    DEF_QUERY:
      "SELECT upstream_job_id \
        FROM  build_history_upstream \
        WHERE upstream_job_id=%L \
        AND build_url=%L \
        AND build_number = %L \
        AND workspace_name= %L \
        AND ci_type=%L \
        AND client_name=%L;",
  },

  Q_FETCH_BUILD_TIMESTAMP_UPSTREAM: {
    DEF_QUERY:
      "SELECT build_history_id, build_timestamp,created_timestamp \
          FROM build_history_upstream \
          WHERE build_url=%L \
          AND workspace_name= %L \
          AND client_name=%L;",
  },

  Q_FETCH_BUILD_TIMESTAMP_DOWNSTREAM: {
    DEF_QUERY:
      "SELECT build_history_id, build_timestamp,created_timestamp \
          FROM build_history_downstream \
          WHERE build_url=%L \
          AND workspace_name= %L \
          AND client_name=%L;",
  },
  Q_FETCH_CI_BY_NAME: {
    DEF_QUERY:
      "SELECT ci_tool_name FROM ci_type \
        WHERE ci_tool_name= %L;",
  },
  Q_FETCH_TEAM_BY_NAME: {
    DEF_QUERY:
      "SELECT ci_team_name FROM ci_team \
        WHERE ci_team_name = %L;",
  },
  Q_FETCH_TENANT_BY_NAME: {
    DEF_QUERY:
      "SELECT tenant_name, tenant_key \
          FROM tenant_names \
          WHERE tenant_key=%L;",
  },
  Q_FETCH_BUILD_AVERAGES: {
    DEF_QUERY:
      "SELECT  bh.tenant_name,bh.browser_name,jd.team_name,\
      CEIL(AVG( (bh.build_result = 'SUCCESS') + (bh.build_result = 'UNSTABLE')) * 100) AS passed_records,\
      FLOOR(AVG( (bh.build_result = 'FAILURE') ) * 100) AS failed_records, \
      CEIL(AVG(bh.build_duration)/1000) as avg_duration \
      FROM skapa_jobs.job_build_history  bh  \
      JOIN skapa_jobs.job_details jd \
      ON bh.job_id=jd.job_name \
      WHERE bh.tenant_name IN (%L) \
      AND bh.build_result IN ( 'SUCCESS', 'FAILURE', 'UNSTABLE') \
    GROUP BY bh.tenant_name,jd.team_name,bh.browser_name",
  },
  Q_FETCH_AVG_DURATION_BY_TEAM: {
    DEF_QUERY:
      "SELECT \
      CEIL(AVG(bhd.build_duration)/1000) AS build_duration \
      FROM skapa_jobs.job_build_history bhd \
      JOIN skapa_jobs.job_details ds \
      ON bhd.job_id=ds.job_name \
      WHERE ds.team_name=%L",
  },
  Q_FETCH_TOTAL_JOB_CATEGORY_COUNT_BY_TEAM: {
    DEF_QUERY:
      "SELECT \
      SUM( CASE WHEN ds.isInPipeline=true THEN 1 ELSE 0 END)  AS pipeline_count,    \
      SUM( CASE WHEN ds.isInPipeline=false THEN 1 ELSE 0 END) AS non_pipeline_count \
      FROM skapa_jobs.job_build_history bhd     \
      JOIN skapa_jobs.job_details ds ON bhd.job_id=ds.job_name  \
      WHERE ds.team_name=%L",
  },
  Q_FETCH_TOTAL_JOB_SUB_CATEGORY_COUNT_BY_TEAM: {
    DEF_QUERY:
      "SELECT \
      SUM( CASE WHEN ds.job_type='UI' THEN 1 ELSE 0 END)  AS ui_jobs,   \
      SUM( CASE WHEN ds.isInPipeline='API' THEN 1 ELSE 0 END) AS api_jobs   \
      FROM skapa_jobs.job_build_history bhd \
      JOIN skapa_jobs.job_details ds ON bhd.job_id=ds.job_name  \
      WHERE ds.team_name=%L",
  },
  Q_FETCH_TOTAL_DAILY_SUCCES_CHANGE_BY_TEAM: {
    DEF_QUERY:
      "SELECT DATE(weekday) AS weekday, success_rate, \
      IF(@last_entry = 0, 0, round(((success_rate - @last_entry) / @last_entry) * 100,2)) \"Change\",  \
      @last_entry := success_rate   \
      FROM  \
      (SELECT @last_entry := 0) x,  \
      (SELECT weekday, sum(success_rate) success_rate   \
      FROM   (  \
        SELECT DATE(bhd.created_timestamp) as weekday,   \
        CEIL(AVG( (bhd.build_result = 'SUCCESS') + (bhd.build_result = 'UNSTABLE')) * 100) AS success_rate  \
        FROM skapa_jobs.job_build_history bhd \
        JOIN skapa_jobs.job_details ds ON bhd.job_id=ds.job_name    \
        WHERE ds.team_name=%L  \
        GROUP BY DATE(bhd.created_timestamp) \
    ) daily_run \
    GROUP BY weekday    \
    ORDER BY weekday    \
    ) y;",
  },
  Q_FETCH_FAILING_COUNT_BY_TEAM: {
    DEF_QUERY:
      'SELECT COUNT(*) AS failing_count \
      FROM (\
        SELECT ds.team_name, bhd.build_result, MAX(bhd.build_timestamp) \
        FROM skapa_jobs.job_build_history bhd \
        JOIN skapa_jobs.job_details ds ON bhd.job_id=ds.job_name  \
        WHERE bhd.build_result="FAILURE"  \
        AND ds.team_name=%L  \
        GROUP BY ds.team_name, bhd.build_result \
      ) t',
  },
  Q_FETCH_ALL_JOBS_BY_TEAM: {
    DEF_QUERY:
      "SELECT  ds.job_name, \
      CASE WHEN ds.isInPipeline=true THEN 'YES' ELSE 'NO' END AS is_pipeline, \
      ds.last_build_result AS build_result, \
      ds.last_build_tenant AS tenant_name, \
      ds.team_name, \
      b.build_duration, \
      b.branch_name,  \
      b.build_timestamp \
      FROM skapa_jobs.job_details ds  \
        INNER JOIN  \
        ( \
          SELECT build_duration, branch_name,job_id,build_timestamp \
          FROM skapa_jobs.job_build_history \
          WHERE build_timestamp>=%s  \
          AND build_timestamp<=%s  \
        ) b ON ds.job_name = b.job_id   \
      WHERE ds.team_name =%L  \
      ORDER BY b.build_timestamp DESC \
      LIMIT 1;",
  },
  Q_FETCH_ALL_JOBS: {
    DEF_QUERY:
      "SELECT \
      ds.job_name,\
      CASE WHEN ds.isInPipeline=true THEN 'YES' ELSE 'NO' END AS is_pipeline, \
      ds.team_name, \
      COALESCE(ds.job_owner, 'N/A') AS  job_owner,  \
      ds.last_build_result, \
      ds.last_build_url,  \
      ds.embeddable_url,  \
      ds.last_build_timestamp \
      FROM skapa_jobs.job_details ds;",
  },
  Q_FETCH_JOBS_PASS_TREND: {
    DEF_QUERY:
      "SELECT \
    bhd.job_id AS job_name,\
    DATE(bhd.created_timestamp) AS created_date,\
    CEIL(AVG( (bhd.build_result = 'SUCCESS') + (bhd.build_result = 'UNSTABLE')) * 100) AS success_rate\
    FROM skapa_jobs.job_build_history bhd \
    WHERE bhd.job_id=%L\
    GROUP BY  bhd.job_id,created_date\
    ORDER BY created_date DESC",
  },

  Q_FETCH_JOBS_PASS_BY_TENANT: {
    DEF_QUERY:
      "SELECT bhd.tenant_name,\
      CEIL(AVG( (bhd.build_result = 'SUCCESS') + (bhd.build_result = 'UNSTABLE')) * 100) AS success_rate,\
      SUM( (CASE WHEN ds.isInPipeline=true THEN 1 ELSE 0 END)+( CASE WHEN ds.isInPipeline=false THEN 1 ELSE 0 END))  AS count\
      FROM skapa_jobs.job_build_history bhd \
      JOIN skapa_jobs.job_details ds ON bhd.job_id=ds.job_name\
      WHERE ds.job_name=%L\
      GROUP BY bhd.tenant_name\
      ORDER BY success_rate ASC\
      LIMIT 10",
  },

  Q_FETCH_JOB_TREND_BY_TENANT: {
    DEF_QUERY:
      "SELECT bhd.tenant_name,  \
    DATE(bhd.created_timestamp) AS created_timestamp, \
    CEIL(AVG( (bhd.build_result = 'SUCCESS') + (bhd.build_result = 'UNSTABLE')) * 100) AS success_rate, \
    SUM( (CASE WHEN ds.isInPipeline=true THEN 1 ELSE 0 END)+( CASE WHEN ds.isInPipeline=false THEN 1 ELSE 0 END))  AS count \
    FROM skapa_jobs.job_build_history bhd \
    JOIN skapa_jobs.job_details ds ON bhd.job_id=ds.job_name  \
    WHERE ds.job_name=%L  \
    AND bhd.build_timestamp>=%s  \
    AND bhd.build_timestamp<=%s  \
    GROUP BY bhd.tenant_name, created_timestamp \
    ORDER BY created_timestamp ASC",
  },
  Q_FETCH_BY_TENANT_DATE_STATUS: {
    DEF_QUERY:
      "SELECT \
      tem.build_timestamp,tpm.job_name, \
      tpm.ci_job_name,tpm.team_name,tem.build_result, \
      tem.tenant_name, tem.tc_pass_rate , tem.tc_passed_count, \
      tem.tc_failed_count, tem.tc_skipped_count, tsm.script_name, \
      tse.build_result AS script_build_result, \
      tse.duration, tse.target_count  \
    FROM skapa_jobs.job_test_project_mapping tpm  \
    JOIN skapa_jobs.job_test_project_execution tem ON tpm.job_name=tem.job_name \
    AND tpm.ci_job_name=tem.ci_job_name \
    JOIN skapa_jobs.test_project_script_mapping tsm ON tpm.job_name=tsm.job_name  \
    AND tpm.ci_job_name=tsm.ci_job_name \
    JOIN skapa_jobs.test_project_script_execution tse ON tsm.script_name=tse.script_name  \
    AND tsm.job_name=tse.job_name \
    AND tse.build_timestamp=tem.build_timestamp \
    AND TIMESTAMP(tem.build_timestamp) >=TIMESTAMP(%L)  \
    AND TIMESTAMP(tem.build_timestamp) <=TIMESTAMP(%L)  \
    ORDER BY tem.build_timestamp",
  },
  Q_FETCH_BY_TENANT_TEAM_DATE_STATUS: {
    DEF_QUERY:
      "SELECT \
    tem.tenant_name,  \
    tpm.team_name,  \
    tpm.ci_job_name,  \
    tpm.job_name,   \
    CEIL(AVG( (tem.build_result = 'Passed')) * 100) AS passed_records, \
    SUM(CASE WHEN tem.build_result='Passed' THEN 1 ELSE 0 END)  AS passed_count,  \
    SUM(( CASE WHEN tem.build_result='Passed' THEN 1 ELSE 0 END)+CASE WHEN tem.build_result='Failed' THEN 1 ELSE 0 END)  AS total_count \
    FROM skapa_jobs.job_test_project_mapping tpm  \
    JOIN skapa_jobs.job_test_project_execution tem ON tpm.job_name=tem.job_name \
    AND tpm.ci_job_name=tem.ci_job_name \
    AND TIMESTAMP(tem.build_timestamp) >=TIMESTAMP(%L)  \
    AND TIMESTAMP(tem.build_timestamp) <=TIMESTAMP(%L)  \
    GROUP BY tem.tenant_name, \
    tpm.team_name,  \
    tpm.job_name, \
    tpm.ci_job_name",
  },
  Q_FETCH_BY_TENANT_TEAM_DATE_SCRIPT_STATUS: {
    DEF_QUERY:
      "SELECT DATE(tse.build_timestamp) AS date_run,  \
      tse.tenant_name,  \
      tsm.ci_job_name,  \
      tsm.job_name,   \
      tsm.script_name,  \
      tse.target_count, \
      CEIL(AVG( (tse.build_result = 'Passed')) * 100) AS passed_records \
      FROM skapa_jobs.test_project_script_mapping tsm   \
      JOIN skapa_jobs.test_project_script_execution tse ON tsm.script_name=tse.script_name  \
      AND tsm.job_name=tse.job_name \
      AND TIMESTAMP(tse.build_timestamp) >=TIMESTAMP(%L)  \
      AND TIMESTAMP(tse.build_timestamp) <=TIMESTAMP(%L)  \
      GROUP BY date_run,  \
      tse.tenant_name,  \
      tsm.ci_job_name,  \
      tsm.job_name, \
      tsm.script_name,  \
      tse.target_count",
  },
};
