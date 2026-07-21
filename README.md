# SauceDemo Playwright Automation Framework

## Framework Overview

This repository contains a production-ready Playwright TypeScript automation framework for SauceDemo.

It is structured for maintainability, reuse, and scalability using the Page Object Model, reusable fixtures, and externalized test data.

## Playwright Test

- Built with `@playwright/test`
- Stable locators using `data-test` attributes and Playwright role-based selectors
- One automated `test()` per approved test case
- Parallel-friendly and CI-ready

## TypeScript

- Strongly typed page objects and utilities
- Strict compiler settings
- Modular architecture for reusable code

## Page Object Model

Page objects are organized under `pages/` and encapsulate application interactions for:

- Login
- Inventory
- Cart
- Checkout Information
- Checkout Overview
- Checkout Complete

## Folder Structure

- `pages/` - Page objects
- `tests/` - Playwright specs
- `fixtures/` - Reusable fixtures
- `utils/` - Shared helpers and utilities
- `test-data/` - Externalized test data
- `.github/workflows/` - CI workflow

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `BASE_URL`
- `USERNAME`
- `PASSWORD`

## Execution Steps

Install dependencies:

```bash
npm install
```

Run tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

## GitHub Actions Execution

The workflow installs dependencies with `npm install`, installs Playwright browsers with `npx playwright install --with-deps`, and runs the full test suite on GitHub Actions.
