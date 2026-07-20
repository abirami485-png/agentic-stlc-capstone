# SauceDemo Playwright Automation Framework

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo using the Page Object Model, reusable fixtures, and externalized test data.

## Playwright Test
Tests are implemented with `@playwright/test` and organized so each approved test case maps to exactly one `test()`.

## TypeScript
The framework uses strict TypeScript settings for maintainability, type safety, and scalable test development.

## Page Object Model
UI interactions are encapsulated in reusable page objects for the login, inventory, cart, and checkout flows.

## Folder Structure
- `pages/` - Page objects
- `tests/` - Playwright test specifications
- `fixtures/` - Reusable fixtures and authentication helpers
- `utils/` - Shared helper methods and data utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - GitHub Actions workflow

## Environment Variables
Copy `.env.example` to `.env` and configure values as needed.

Required variables:
- `BASE_URL`
- `STANDARD_USER`
- `LOCKED_OUT_USER`
- `SECRET_SAUCE_PASSWORD`
- `DEFAULT_FIRST_NAME`
- `DEFAULT_LAST_NAME`
- `DEFAULT_POSTAL_CODE`

## Execution Steps
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install --with-deps`
3. Run tests: `npm test`
4. Run headed tests: `npm run test:headed`
5. Open the report: `npm run test:report`

## GitHub Actions Execution
The workflow in `.github/workflows/playwright.yml` installs dependencies, installs Playwright browsers with `npx playwright install --with-deps`, and runs the Playwright test suite on GitHub Actions.
