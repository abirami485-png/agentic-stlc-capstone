# agentic-stlc-capstone

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo.
It follows the Page Object Model, externalizes configuration and test data, and is structured for maintainability and reuse.

## Playwright Test
The framework uses `@playwright/test` to execute automated end-to-end tests.

## TypeScript
All automation code is written in TypeScript with strict type checking enabled.

## Page Object Model
Reusable page objects are implemented for application flows such as login, inventory, cart, checkout, and navigation.

## Folder Structure
- `pages/` - Page Object classes
- `tests/` - Playwright test specifications
- `fixtures/` - shared test fixtures and base test setup
- `utils/` - helper and utility methods
- `test-data/` - externalized test data
- `.github/workflows/` - GitHub Actions workflow

## Environment Variables
Copy `.env.example` to `.env` and set the required values.

Key variables:
- `BASE_URL`
- `STANDARD_USER`
- `LOCKED_OUT_USER`
- `PROBLEM_USER`
- `PERFORMANCE_GLITCH_USER`
- `ERROR_USER`
- `VISUAL_USER`
- `DEFAULT_PASSWORD`

## Execution Steps
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install --with-deps`
3. Run tests: `npx playwright test`
4. View report: `npx playwright show-report`

## GitHub Actions Execution
The repository includes a GitHub Actions workflow that installs dependencies, installs Playwright browsers, and executes the Playwright test suite on push and pull request events.
