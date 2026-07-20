# SauceDemo Playwright Automation Framework

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo. It uses the Page Object Model, reusable fixtures, environment-based configuration, and externalized test data.

## Playwright Test
- Built with `@playwright/test`
- One automated `test()` for each approved test case
- Reusable page objects and fixtures
- Stable locators prioritized by accessibility-first selector strategy

## TypeScript
- Strict TypeScript configuration
- Shared utilities and type-safe page objects
- Modular code organization for maintainability

## Page Object Model
Page interactions are encapsulated in reusable page objects under `pages/`.

## Folder Structure
- `pages/` - Page Object classes
- `tests/` - Playwright spec files
- `fixtures/` - Reusable test fixtures
- `utils/` - Shared helpers and environment utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - GitHub Actions CI workflow

## Environment Variables
Create a local `.env` file from `.env.example`.

Supported variables:
- `BASE_URL` - Application base URL

## Execution Steps
1. Install dependencies
   - `npm install`
2. Install browsers
   - `npx playwright install --with-deps`
3. Run tests
   - `npm test`
4. Run headed mode
   - `npm run test:headed`
5. Debug tests
   - `npm run test:debug`

## GitHub Actions Execution
The workflow in `.github/workflows/playwright.yml` installs dependencies with `npm install`, installs Playwright browsers with `npx playwright install --with-deps`, and runs the Playwright test suite on pushes, pull requests, and manual dispatch.
