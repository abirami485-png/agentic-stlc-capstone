# agentic-stlc-capstone

## Framework Overview

This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo.

## Playwright Test

The framework uses Playwright Test for end-to-end browser automation and verification.

## TypeScript

All automation code is implemented in TypeScript for type safety and maintainability.

## Page Object Model

Reusable Page Objects and components are organized to keep selectors and actions centralized.

## Folder Structure

- `pages/` - Page Objects and reusable UI components
- `tests/` - Playwright test specifications
- `fixtures/` - Custom fixtures and test setup
- `utils/` - Helper methods and shared utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - GitHub Actions workflow

## Environment Variables

- `BASE_URL` - Application base URL
- `HEADLESS` - Controls headless browser execution
- `TIMEOUT_MS` - Global test timeout in milliseconds

Copy `.env.example` to `.env` and update values as needed.

## Execution Steps

1. Install dependencies: `npm install`
2. Run tests: `npm test`
3. Run headed tests: `npm run test:headed`
4. View report: `npm run test:report`

## GitHub Actions Execution

The workflow located at `.github/workflows/playwright.yml` installs dependencies, installs Chromium browsers, and executes the Playwright suite on push, pull request, and manual dispatch.
