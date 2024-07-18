/*
    Prerequists: Ensure that k6 is installed locally

    Usage: Run `k6 run website-stress-test.js`

    Options: 
    - The website to be tested needs to be set by the `url` variable
    - The number of virtual users as well as the length of the test can be 
      configured in the `stages` const

*/

import http from 'k6/http';
import { check } from "k6";

var url = "http://www.riverwest24.com/leaderboard/"

export const options = {
    thresholds: {
        http_req_duration: ["p(95) < 3000"],
    },
    stages: [
        { duration: '15m', target: 300 }, // ramp-up
        { duration: '30m', target: 300 }, // plateau
        { duration: '15m', target: 0 }, // ramp-down 
    ],
};

export default function () {
    let res = http.get(url);
    check(res, { "status is 200": (r) => r.status === 200 });
}
