/*!
 * Copyright 2023 Digital Bazaar, Inc.
 * SPDX-License-Identifier: BSD-3-Clause
 */
import {
  multibaseMultikeyHeaderP256, multibaseMultikeyHeaderP384,
} from './helpers.js';
import chai from 'chai';
import {decode} from 'base58-universal';
import varint from 'varint';

const should = chai.should();

// RegExp with bs58 characters in it
const bs58 =
  /^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]+$/;
// assert something is entirely bs58 encoded
export const shouldBeBs58 = s => bs58.test(s);

export const shouldBeMulticodecEncoded = async s => {
  // check if it is multi codec encoded
  if(s.startsWith(multibaseMultikeyHeaderP256)) {
    // example of a P-256 publicKeyMultibase -
    // zDnaepHgv4AU1btQ8dp6EYbvgJ6M1ovzKnSpXJUPU2hshXLvp
    const bytes = await decode(s.slice(1));
    bytes.length.should.equal(35);
    // bytes example => Uint8Array(35) [
    //   128,  36,   3,  98, 121, 153, 205, 199,
    //    39, 148, 212,  49, 157,  57, 152, 184,
    //    97,  14, 217, 198,  76,  50,  46, 169,
    //    58, 124, 244, 202, 141, 161,  92,  55,
    //   122, 233, 205
    // ]
    // get the two-byte prefix
    const prefix = Array.from(bytes.slice(0, 2));
    // the multicodec encoding of a P-256 public key is the two-byte
    // prefix 0x1200 followed by the 33-byte compressed public key data.
    const expectedP256Prefix = await varint.encode(0x1200);
    return JSON.stringify(prefix) === JSON.stringify(expectedP256Prefix);
  }

  if(s.startsWith(multibaseMultikeyHeaderP384)) {
    const bytes = await decode(s.slice(1));
    bytes.length.should.equal(51);
    // get the two-byte prefix
    const prefix = Array.from(bytes.slice(0, 2));
    // the multicodec encoding of a P-384 public key is the two-byte prefix
    // 0x1201 followed by the 49-byte compressed public key data.
    const expectedP384Prefix = await varint.encode(0x1201);
    return JSON.stringify(prefix) === JSON.stringify(expectedP384Prefix);
  }
  // Unsupported key type, return false
  return false;
};

export const verificationFail = async ({credential, verifier}) => {
  const body = {
    verifiableCredential: credential,
    options: {
      checks: ['proof']
    }
  };
  const {result, error} = await verifier.post({json: body});
  should.not.exist(result, 'Expected no result from verifier.');
  should.exist(error, 'Expected verifier to error.');
  should.exist(error.status, 'Expected verifier to return an HTTP Status code');
  error.status.should.equal(
    400,
    'Expected HTTP Status code 400 invalid input!'
  );
};

export const verificationSuccess = async ({credential, verifier}) => {
  const body = {
    verifiableCredential: credential,
    options: {
      checks: ['proof']
    }
  };
  const {result, error} = await verifier.post({json: body});
  should.not.exist(error, 'Expected verifier to not error.');
  should.exist(result, 'Expected a result from verifier.');
  should.exist(result.status,
    'Expected verifier to return an HTTP Status code');
  result.status.should.equal(
    200,
    'Expected HTTP Status code 200.'
  );
};
