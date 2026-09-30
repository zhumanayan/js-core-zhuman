# Lab 4 — JavaScript Core

**Repository:** js-core-zhuman

## How to run tests
1. Install dependencies: `npm install`
2. Run tests: `npm test`

## Closures in my code
In my code, I implemented closures in the `memoize` and `counter` functions. A closure is a function that remembers its outer variables even after the outer function has finished executing. In `memoize(fn)`, the inner function closes over the `cache` Map, allowing it to remember previously calculated results. In `counter()`, the returned methods `inc`, `dec`, and `value` share access to the private `count` variable. This provides data encapsulation because external code cannot directly modify `count`.

## Test Results
![Tests Screenshot](./tests-screenshot.png)

## AI Tools
- ChatGPT / Claude for writing tests and structure.