[![CircleCI](https://circleci.com/gh/conorburke/seker_mobile.svg?style=svg)](https://circleci.com/gh/conorburke/seker_mobile)

#Seker

Named after the Eqyptian god of craftsmen, Seker is a mobile app that enables users to easily find, rent, or loan tools in their area.

## Table of Contents

- [Description](#description)
- [Status and Future](#status-and-future)
- [Technologies Used](#technologies-used)
- [CI](#ci)

## Description

Exclusively used as a mobile app, Seker allows users to rent and loan tools. For many people, the tools they have do nothing but sit in a shed or on a workbench for >99% of the time. Seker turns what is essentially unused inventory into a revenue generator with minimal effort. On the flip side, it helps people find a specific tool they need to complete a project.

## Status and Future

Seker is in active development (June 2018) and will be made available on the Apple App Store and Google Play once the baseline product requirements are met.

## Technologies Used

Seker employs or communitcates with the following technologies:

1.  React-Native

- React-Native-Navigation
- React-Native-Vector-Icons
- React-Native-Elements
-

2.  Redux

- Redux-Thunk
-

3.  Twilio (Text Notifications)
4.  Firebase (Account Creation)
5.  Golang (RESTful API)
6.  PostgreSQL (Database Layer)

## CI

Seker uses Circle-CI 2.0 for CI, with Jest and Enzyme used for testing purposes. Prettier is used for code consistency.
