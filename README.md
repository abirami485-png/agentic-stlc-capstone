# SauceDemo Playwright Automation Framework

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo. It follows the Page Object Model, externalizes configuration and test data, and is structured for reuse and maintainability.

## Playwright Test
The framework uses `@playwright/test` for browser automation, assertions, fixtures, and execution control.

## TypeScript
All framework code is written in TypeScript with strict compiler settings.

## Page Object Model
Reusable page objects are implemented for login, inventory, cart, checkout information, checkout overview, and checkout completion screens.

## Folder Structure
- `pages/` - Page Object classes
- `tests/` - Playwright specs
- `fixtures/` - Reusable fixtures
- `utils/` - Shared utilities and environment handling
- `test-data/` - Externalized test data
- `.github/workflows/` - GitHub Actions workflow

## Environment Variables
Copy `.env.example` to `.env` and configure:
- `APP_URL` - Application base URL
- `HEADLESS` - Browser headless mode flag
- `TIMEOUT` - Global timeout in milliseconds

## Execution Steps
1. Install dependencies: `npm install`
2. Install browsers: `npm run install:browsers`
3. Run tests: `npm test`
4. Run headed: `npm run test:headed`
5. View report: `npm run test:report`

## GitHub Actions Execution
The workflow at `.github/workflows/playwright.yml` runs Playwright tests on push, pull requests, and manual dispatch using GitHub Actions.
