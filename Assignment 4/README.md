# My Portfolio

## Assignment 4
Implemented deployment and testing updates:

- Fetched the compiled `dist` from the build server and included it in the repo/CI pipeline so the deployment step serves the exact build output (examples: `scp user@host:/path/to/dist ./dist` or download CI artifact and extract to `./dist`).
- Deployment: serve or upload the `./dist` folder to the hosting target (static host, CDN, or web server) as part of the release job.
- Added unit testing with Jest:
    - Install: `npm install --save-dev jest`
    - Add tests under `__tests__` and a `jest.config.js`.
    - package.json script: `"test:unit": "jest --coverage"`
- Added end-to-end testing with Cypress:
    - Install: `npm install --save-dev cypress`
    - Add E2E tests under `cypress/e2e` and configure `cypress.config.js` with `baseUrl`.
    - package.json scripts: `"test:e2e": "cypress run"` and `"test:e2e:open": "cypress open"`
- CI notes:
    - Run `npm run test:unit` before deploying.
    - Run `npm run test:e2e` in headless mode against the deployed `dist` (or start a test server serving `./dist` during the E2E job).
    - Optionally combine: `"test": "npm run test:unit && npm run test:e2e"`
- Results: reliable deployments using the built `dist` plus automated unit and E2E coverage via Jest and Cypress.
