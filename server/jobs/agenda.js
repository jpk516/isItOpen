const Agenda = require('agenda');
const agendaURI = process.env.AGENDA_MONGO_URI;
const agendaCollection = process.env.AGENDA_COLLECTION || 'agendaJobs';
const jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : ['hours'];

const conn = {
    db: {
        address: agendaURI,
        collection: agendaCollection
    }
};
const agenda = new Agenda(conn);

// load types based on the environment
// (support for multiple job processors)
// https://github.com/agenda/agenda?tab=readme-ov-file#example-project-structure
jobTypes.forEach(type => {
	require('./' + type)(agenda);
});
console.log('Agenda job types:', jobTypes);
if (jobTypes.length) {
    console.log('Agenda starting...');
    agenda.start();
    
    agenda.on('ready', () => {
        console.log('Agenda ready!');
        (async function() {
            //await agenda.every('30 minutes', 'hours');
            await agenda.every('5 minutes', 'achievements');

            // for (let jobType of jobTypes) {
            //     await agenda.every('1 minutes', jobType);
            // }
        })();
    });
}

module.exports = agenda;