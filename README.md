# SauceDemo Playwright Automation Framework

## Framework Overview
This repository contains a production-ready Playwright automation framework for SauceDemo built with TypeScript and the Page Object Model.

## Playwright Test
- Uses `@playwright/test`
- Supports stable, reusable tests
- Includes fixture-based Page Object injection

## TypeScript
- Strict TypeScript configuration
- Shared types and reusable utilities
- Compiler validation with `npx tsc --noEmit`

## Page Object Model
- Page objects are stored in `pages/`
- Common behavior is centralized in `pages/BasePage.ts`
- Tests interact with application screens through reusable page classes

## Folder Structure
- `pages/` - Page Object classes
- `tests/` - Playwright test specs
- `fixtures/` - Custom Playwright fixtures
- `utils/` - Environment helpers and shared utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - CI workflow files

## Environment Variables
Copy `.env.example` to a local `.env` file and populate values as needed.

Available variables:
- `BASE_URL`
- `VALID_USERNAME`
- `VALID_PASSWORD`
- `INVALID_USERNAME`
- `INVALID_PASSWORD`
- `FIRST_NAME`
- `LAST_NAME`
- `POSTAL_CODE`

## Execution Steps
1. Install dependencies with `npm install`
2. Install browsers with `npx playwright install --with-deps`
3. Run type checks with `npx tsc --noEmit`
4. Run tests with `npx playwright test`
5. List tests with `npx playwright test --list`

## GitHub Actions Execution
The GitHub Actions workflow installs dependencies with `npm install`, installs Playwright browsers with `npx playwright install --with-deps`, and runs the Playwright test suite on Ubuntu.
