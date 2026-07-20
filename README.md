# SauceDemo Playwright Automation Framework

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo. It follows the Page Object Model, externalizes test data and environment variables, and uses reusable fixtures and utilities for maintainable end-to-end automation.

## Playwright Test
- Uses `@playwright/test`
- Runs browser automation for SauceDemo user flows
- Supports headed and headless execution
- Includes HTML reporting and trace/screenshot/video capture on failure

## TypeScript
- Strict TypeScript configuration
- Modular page objects, fixtures, and utilities
- Ready for scalable test maintenance

## Page Object Model
Page interactions are encapsulated in reusable page classes under the `pages/` directory.

## Folder Structure
- `pages/` - Page Objects
- `tests/` - Playwright test specs
- `fixtures/` - Shared fixtures
- `utils/` - Environment and test-data helpers
- `test-data/` - Externalized test data
- `.github/workflows/` - GitHub Actions pipeline

## Environment Variables
Copy `.env.example` to `.env` and set values as needed:
- `BASE_URL`
- `USERNAME`
- `PASSWORD`

## Execution Steps
1. Install dependencies
   - `npm install`
2. Install Playwright browsers
   - `npx playwright install --with-deps`
3. Run tests
   - `npm test`
4. Run tests in headed mode
   - `npm run test:headed`
5. View report
   - `npm run test:report`

## GitHub Actions Execution
The repository includes a GitHub Actions workflow that installs dependencies, installs Playwright browsers with `npx playwright install --with-deps`, executes the test suite, and uploads the Playwright HTML report as an artifact.
