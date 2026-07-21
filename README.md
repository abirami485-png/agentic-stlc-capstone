# agentic-stlc-capstone

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo using the Page Object Model, reusable fixtures, utilities, and externalized test data.

## Playwright Test
Tests are implemented with `@playwright/test` and use stable locators, async/await, and modular page objects.

## TypeScript
The framework is written in TypeScript with strict compiler settings enabled through `tsconfig.json`.

## Page Object Model
Reusable page objects are stored under `pages/` and encapsulate application interactions for login, inventory, cart, checkout, and header actions.

## Folder Structure
- `pages/` - Page objects
- `tests/` - Playwright tests
- `fixtures/` - Shared test fixtures
- `utils/` - Helper functions and environment config
- `test-data/` - Externalized test data

## Environment Variables
Copy `.env.example` to `.env` and set values as needed.
- `BASE_URL`
- `SAUCE_USERNAME`
- `SAUCE_PASSWORD`
- `SAUCE_INVALID_USERNAME`
- `SAUCE_INVALID_PASSWORD`
- `SAUCE_FIRST_NAME`
- `SAUCE_LAST_NAME`
- `SAUCE_POSTAL_CODE`

## Execution Steps
1. Install dependencies with `npm install`
2. Install browsers with `npx playwright install --with-deps`
3. Run tests with `npx playwright test`
4. List tests with `npx playwright test --list`
5. Type-check with `npx tsc --noEmit`

## GitHub Actions Execution
The workflow installs dependencies with `npm install`, installs Playwright browsers with `npx playwright install --with-deps`, and runs the Playwright test suite in CI.
