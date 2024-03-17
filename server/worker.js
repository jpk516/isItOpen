// this file is used to start the worker process
// eg: node worker.js or JOB_TYPES=email,places node worker.js
// for specific job types per process
require('./jobs/agenda.js');