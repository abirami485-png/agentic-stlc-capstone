# Agentic STLC Capstone Automation Framework

## Framework Overview
This repository contains a production-ready Playwright automation framework for SauceDemo using TypeScript and the Page Object Model.

## Playwright Test
Tests are implemented with `@playwright/test` and organized to map one automated test to each approved test case.

## TypeScript
The framework uses TypeScript for type safety, maintainability, and clear structure across pages, fixtures, utilities, and tests.

## Page Object Model
Reusable page objects encapsulate UI actions and locators to keep tests concise and stable.

## Folder Structure
- `pages/` - Page Objects
- `tests/` - Playwright test specifications
- `fixtures/` - Reusable fixtures
- `utils/` - Helper and configuration utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - GitHub Actions workflow

## Environment Variables
Copy `.env.example` to `.env` and provide values for:
- `BASE_URL`
- `VALID_USERNAME`
- `VALID_PASSWORD`
- `INVALID_USERNAME`
- `INVALID_PASSWORD`

## Execution Steps
1. Install dependencies: `npm ci`
2. Install browsers: `npx playwright install --with-deps`
3. Run tests: `npm test`
4. Open report: `npm run test:report`

## GitHub Actions Execution
The workflow in `.github/workflows/playwright.yml` installs dependencies with `npm ci`, installs Playwright browsers with `npx playwright install --with-deps`, and runs the test suite on pushes, pull requests, and manual dispatch.
