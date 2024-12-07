import fetch from 'node-fetch';
import { CronJob } from 'cron';
import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(10000, () => {
  console.log(`Server running at PORT: 10000/`);
});


// Function to call a POST API
const callApi = async (path) => {
  try {
    console.log(`Started calling API: ${path}`);
    const response = await fetch(`https://energy-dashboard-api-o69l.onrender.com${path}`, { method: 'POST' });
    console.log(`API called successfully: ${path}, Status: ${response.status}`);
  } catch (error) {
    console.error(`Error calling API: ${path}`, error);
  }
};

// Schedule 1: Every hour
new CronJob('0 * * * *', () => { // Runs at the start of every hour
  callApi('/trigger_hourly_job');
}, null, true, 'America/New_York');

// Schedule 2: Every day at 2am EST
new CronJob('0 2 * * *', () => {
  callApi('/trigger_2am_job');
}, null, true, 'America/New_York');

// Schedule 3: Every day at 3am EST
new CronJob('0 3 * * *', () => {
  callApi('/trigger_3am_job');
}, null, true, 'America/New_York');

// Schedule 4: Fake traffic every 14 min to stop Render from sleeping
new CronJob('*/14 * * * *', () => {
    callApi('/dummy_endpoint');
  }, null, true, 'America/New_York');

console.log("Schedulers are running...");