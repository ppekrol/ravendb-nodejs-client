/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import {Document} from '../src/Documents/Document';
import {DocumentStore} from '../src/Documents/DocumentStore';
import {DocumentSession} from '../src/Documents/Session/DocumentSession';
import {IDocumentSession} from '../src/Documents/Session/IDocumentSession';
import * as Promise from 'bluebird'

describe('DocumentSession', () => {
  let subject : IDocumentSession;

  beforeEach(() => subject = DocumentStore.create('localhost:8080', 'Northwind').openSession());

  describe('Count()', () => {
    it('should return promise', () => {
      const query = subject.query<Document>();
      const promise: Promise<number> = query.count();

      expect(promise).to.be.instanceof(Promise);
    });

    it('should return records count', (next) => {
      const query = subject.query<Document>();
      const promise: Promise<number> = query.count();

      promise.then(count => {
        expect(count).to.equals(1);
        next();
      })
    });
  });
});

