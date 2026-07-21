# SauceDemo Playwright Automation Framework

## Framework Overview
This repository contains a production-ready Playwright automation framework for SauceDemo using TypeScript and the Page Object Model.

## Playwright Test
The framework uses `@playwright/test` for execution, assertions, reporting, and built-in browser automation capabilities.

## TypeScript
All framework code is written in TypeScript to improve maintainability, type safety, and scalability.

## Page Object Model
Reusable page objects are implemented for SauceDemo pages and components to keep tests readable and maintainable.

## Folder Structure
- `pages/` - Page objects and reusable UI abstractions
- `tests/` - Playwright test specifications
- `fixtures/` - Reusable Playwright fixtures
- `utils/` - Helper functions and shared framework utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - GitHub Actions workflow configuration

## Environment Variables
Copy `.env.example` to `.env` and provide values as needed.

- `APP_BASE_URL` - Application base URL
- `APP_USERNAME` - Valid application username
- `APP_PASSWORD` - Valid application password

## Execution Steps
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install --with-deps`
3. Run tests: `npx playwright test`
4. Run headed mode: `npm run test:headed`
5. View report: `npm run test:report`

## GitHub Actions Execution
The workflow at `.github/workflows/playwright.yml` installs dependencies with `npm install`, installs Playwright browsers with `npx playwright install --with-deps`, and runs the full test suite on pushes, pull requests, and manual dispatch.
