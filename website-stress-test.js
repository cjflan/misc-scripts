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

var url = "http://www.connorjf.io/"

export const options = {
    // Key configurations for Stress in this section
    stages: [
      { duration: '5s', target: 10 }, // ramp-up
      { duration: '10s', target: 10 }, // plateau
      { duration: '5s', target: 0 }, // ramp-down 
    ],
  };

export default function () {
    let res = http.get(url);
    check(res, { "status is 200": (r) => r.status === 200 });
}