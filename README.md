# Agentic STLC Capstone

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo. It follows the Page Object Model, externalizes test data, and uses reusable fixtures and helpers.

## Playwright Test
The framework uses `@playwright/test` to execute automated browser tests with stable locators and clean assertions.

## TypeScript
All automation code is written in TypeScript with strict compiler settings for maintainability and type safety.

## Page Object Model
UI interactions are encapsulated in reusable page objects under the `pages/` directory.

## Folder Structure
- `pages/` - Page objects
- `tests/` - Playwright test specs
- `fixtures/` - Custom fixtures
- `utils/` - Environment and helper utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - CI workflow

## Environment Variables
Copy `.env.example` to `.env` and configure:
- `BASE_URL`
- `VALID_USERNAME`
- `VALID_PASSWORD`
- `INVALID_USERNAME`
- `INVALID_PASSWORD`
- `FIRST_NAME`
- `LAST_NAME`
- `POSTAL_CODE`

## Execution Steps
1. Install dependencies: `npm ci`
2. Install browsers: `npx playwright install --with-deps chromium`
3. Run tests: `npm test`
4. Run headed: `npm run test:headed`
5. View report: `npm run test:report`

## GitHub Actions Execution
The workflow at `.github/workflows/playwright.yml` runs on pushes, pull requests, and manual dispatch against `main`.
