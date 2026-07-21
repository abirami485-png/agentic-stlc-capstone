# SauceDemo Playwright Automation Framework

## Framework Overview
This repository contains a production-ready Playwright TypeScript automation framework for the SauceDemo application. It follows the Page Object Model, uses reusable fixtures and helpers, and externalizes configuration and test data.

## Playwright Test
- Built with `@playwright/test`
- Supports reliable browser automation and assertions
- Includes structured tests mapped one-to-one with approved test cases

## TypeScript
- Framework source is implemented in TypeScript
- Strict type checking is enabled
- Shared utilities and page objects are strongly typed

## Page Object Model
- Page objects encapsulate locators and page actions
- Tests remain readable and maintainable
- Common flows are reused through page methods

## Folder Structure
- `pages/` - Page objects
- `tests/` - Playwright tests
- `fixtures/` - Custom fixtures
- `utils/` - Helper and utility functions
- `test-data/` - Externalized test data
- `.github/workflows/` - CI workflow

## Environment Variables
Copy `.env.example` to `.env` and configure values as needed.

Supported variables:
- `BASE_URL`

## Execution Steps
1. Install dependencies: `npm install`
2. Install browsers: `npx playwright install --with-deps`
3. Run type check: `npx tsc --noEmit`
4. Run tests: `npx playwright test`
5. Run headed mode: `npx playwright test --headed`

## GitHub Actions Execution
The workflow in `.github/workflows/playwright.yml` installs dependencies, installs Playwright browsers, validates TypeScript, and runs the test suite on GitHub Actions.
