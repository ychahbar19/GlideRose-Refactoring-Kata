# Gilded Rose Refactoring Kata

this is my own version of my refactoring, i grouped all my code into the same file for it to be easily accessible but in a real development case i would have split it into different files and folders using the appropriate synthax.

## Getting started

Install dependencies

```sh
npm install
```

## Run the unit tests from the Command-Line for the old version

the old version was not handling the new rules for the Conjured Items, by running Vitest test suite you should be able to see that the Conjured items test is failing (because it was considered by the old snapshot as a normal item decreasing quality by 1)

```sh
npm run test:vitest
```

## Run the unit tests from the Command-Line for the new refactored version

On Jest suite test you can see that the tests are passing handling the new Conjured item business case

```sh
npm run test:jest
```
