module.exports = {
  Q_DELETE_TP_SCRIPTS: {
    DEF_QUERY:
      "DELETE FROM test_project_failed_steps \
      WHERE job_name=%L  \
      AND ci_job_name=%L;",
  },
};
