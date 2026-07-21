# agentic-stlc-capstone

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo using the Page Object Model.

## Playwright Test
The framework uses `@playwright/test` for scalable browser automation and assertions.

## TypeScript
All tests, page objects, fixtures, and utilities are implemented in TypeScript.

## Page Object Model
Reusable page objects are stored under `pages/` to keep locators and actions maintainable.

## Folder Structure
- `pages/` - Page Object classes
- `tests/` - Playwright test specs
- `fixtures/` - Custom Playwright fixtures
- `utils/` - Helper methods and test data
- `test-data/` - External test data assets if needed
- `.github/workflows/` - GitHub Actions workflows

## Environment Variables
Copy `.env.example` to `.env` and configure values such as:
- `BASE_URL`

## Execution Steps
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install --with-deps`
3. Run tests: `npm test`

## GitHub Actions Execution
The workflow at `.github/workflows/playwright.yml` installs dependencies, installs Playwright browsers, and executes the test suite on push, pull request, and manual dispatch.
