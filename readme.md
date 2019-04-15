![](https://i.imgur.com/BtdQigB.png)

# Authful

![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)
[![npm version](https://badge.fury.io/js/authful.svg)](https://badge.fury.io/js/authful)
![dependencies](https://david-dm.org/o8e/authful.svg)

A lightweight authentication library for Node

## Summary

I find myself continously going through the process of implementing authentication for my projects and they only require a basic system to get started. This is a slightly higher level library that wraps [jsonwebtoken](https://npmjs.com/package/jsonwebtoken) and [bcrypt](https://npmjs.com/package/bcrypt) and provides common methods.

:sparkles: **1.3kB** minified + gzip

## Installation

```
npm install authful -s
```

```js
import * as Authful from 'authful'

const authful = new Authful({
  secret: 'ffj3493$R#J@$f#$Jo3ofk',
  expiresIn: '1h' // default: 24hr
})
```

## Usage

![docs in progress](https://img.shields.io/badge/docs-in%20progress-orange.svg)

:hash: Hash a password

```js
const hash = await authful.pwd.hash({ plaintext })
```

:white_check_mark: Check a password

```js
const match = await authful.pwd.check({ hash, plaintext })
```

:lock: Create a token

```js
const token = await authful.token.create(payload)
```

:closed_lock_with_key: Decode a token

```js
const payload = await authful.token.decode(token)
```

:arrows_counterclockwise: Refresh a token

```js
const token2 = await authful.token.refresh(token)
```
