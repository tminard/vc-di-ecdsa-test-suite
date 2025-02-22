<!--
Copyright 2023 Digital Bazaar, Inc.

SPDX-License-Identifier: BSD-3-Clause
-->

# w3c/vc-di-ecdsa-test-suite  ChangeLog

## 3.0.0 -

### Changed
- **BREAKING**: Verify test suites generate data locally.
- **BREAKING**: `issuerName` no longer used in test suites.
- **BREAKING**: Env variables related to `issuerName` no longer used.

### Added
- **BREAKING**: interop tests are now skipped by default; `LOCAL_ONLY` environment variable set to `false` reenables them.
- Support for issuing test data locally using VC 2.0 context.

## 2.3.0 - 2024-02-25

### Added
- A new `credentials` section in `runner.json` that allows configuring static test vectors.
- A new script that clones the `vc-di-ecdsa` repo and `TestVectors` into the project.
- A new `mocks` dir that contains static test vectors and respective pointers.
- A new `issuerName` config property for configuring the issuer used to create test data.
- A new `holderName` config property for configuring the holder used to create sd test data.

### Changed
- The env variables for specifying the issuer for the RDFC & SD tests are now separate.
- The env variable for specifying the holder for the SD tests is now `SD_HOLDER_NAME`.
- Data Integrity tests are now in their own file and can be run separately.

## 2.2.1 -

### Fixed
- Interop tests throw if the issuer fails to issue a VC.

## 2.2.0 - 2024-01-03

### Changed
- Get VC issuer and holder from test config for use in test data generation.
  This will allow testers to specify the VC issuer and/or holder for
  generating the test data. The default values have been set to
  `Digital Bazaar`.

## 2.1.0 - 2023-11-29

### Added
- Adds tests for `ecdsa-sd-2023` cryptosuite.

## 2.0.0 - 2023-11-27

### Added
- Adds test to check whether `proof.proofPurpose` field matches the verification
  relationship expressed by the verification method controller.

### Changed
- **BREAKING**: The tests require the cryptosuite type value to be either
  `ecdsa-rdfc-2019`, `ecdsa-jcs-2019`, or `ecdsa-sd-2023`.
- **BREAKING**: The tags required for the test suite have been updated, shifting
  from `ecdsa-2019` to `ecdsa-rdfc-2019`, `ecdsa-jcs-2019`, and/or
  `ecdsa-sd-2023`.

### Removed
- Removed unnecessary `verificationMethod.controller` test. The normative
  statement for that no longer exists in the spec.

## 1.0.0 - 2023-11-10

### Added
- Add a new reporter option that generates the JSON used to create the report.

### Changed
- Use `@digitalbazaar/mocha-w3c-interop-reporter@1.5.0`.

## Before 1.0.0

- See git history for changes.
