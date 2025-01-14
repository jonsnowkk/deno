// deno-fmt-ignore-file
// deno-lint-ignore-file

// Copyright Joyent and Node contributors. All rights reserved. MIT license.
// Taken from Node 20.11.1
// This file is automatically generated by `tests/node_compat/runner/setup.ts`. Do not modify this file manually.

'use strict';
const common = require('../common');
const net = require('net');
const assert = require('assert');

const c = net.createConnection(common.PORT);

c.on('connect', common.mustNotCall());

c.on('error', common.mustCall(function(error) {
  // Family autoselection might be skipped if only a single address is returned by DNS.
  const failedAttempt = Array.isArray(error.errors) ? error.errors[0] : error;

  assert.strictEqual(failedAttempt.code, 'ECONNREFUSED');
  assert.strictEqual(failedAttempt.port, common.PORT);
  assert.match(failedAttempt.address, /^(127\.0\.0\.1|::1)$/);
}));
