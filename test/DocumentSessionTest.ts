/// <reference path="../node_modules/@types/mocha/index.d.ts" />
/// <reference path="../node_modules/@types/chai/index.d.ts" />

import {expect} from 'chai';
import {Document} from '../src/Documents/Document';
import {IDocument} from '../src/Documents/IDocument';
import {DocumentStore} from '../src/Documents/DocumentStore';
import {IDocumentSession} from '../src/Documents/Session/IDocumentSession';
import {DocumentQuery} from '../src/Documents/Session/DocumentQuery';

describe('DocumentSession', () => {
  let subject : IDocumentSession;
  let json : Object;

  beforeEach(() => {
    subject = DocumentStore.create('localhost:8080', 'Northwind').openSession()
    json = {
      stringProp: "string",
      numberProp: 2,
      numberFloatProp: 2.5,
      booleanProp: true,
      nullProp: null,
      objectProp: {
        stringProp: "string",
        numberProp: 2,
        numberFloatProp: 2.5,
        booleanProp: true,
        nullProp: null,
        arrayProp: [1, 2, 3]
      },
      arrayProp: [1, 2, 3],
      deepObjectProp: {
        someProp: "someValue",
        someObject: {
          someProp: "someValue"
        }
      },
      deepArrayProp: [
        1, 2, [3, 4]
      ],
      deepArrayObjectProp: [
        1, 2, {
          someProp: "someValue",
          someArray: [3, 4]
        }, [5, 6], [7, 8, {
          someProp: "someValue",
        }]
      ]
    };
  });
  
  describe('create()', () => {
    it('should return Document instance', () => {
      const document: IDocument = subject.create(json);

      expect(document).to.be.an.instanceof(Document);
    });

    it('should parse scalars', () => {
      const document: IDocument = subject.create(json);

      expect(document.stringProp).to.be.a('string');
      expect(document.stringProp).to.equals('string');
      expect(document.numberProp).to.be.a('number');
      expect(document.numberProp).to.equals(2);
      expect(document.numberFloatProp).to.be.a('number');
      expect(document.numberFloatProp).to.equals(2.5);
      expect(document.booleanProp).to.be.a('boolean');
      expect(document.booleanProp).to.equals(true);
      expect(document.nullProp).to.be.null;
    });

    it('should parse arrays', () => {
      const document: IDocument = subject.create(json);

      expect(document.arrayProp).to.be.a('array');
      expect(document.arrayProp).to.have.length(3);
      expect(document.arrayProp).to.deep.equal([1, 2, 3]);
    });

    it('should parse deep arrays', () => {
      const document: IDocument = subject.create(json);
      const deep: number[] = document.deepArrayProp[2];

      expect(document.deepArrayProp).to.be.a('array');
      expect(document.deepArrayProp).to.have.length(3);
      expect(document.deepArrayProp).to.deep.equal([1, 2, [3, 4]]);

      expect(deep).to.be.a('array');
      expect(deep).to.have.length(2);
      expect(deep).to.deep.equal([3, 4]);
    });

    it('should parse objects', () => {
      const document: IDocument = subject.create(json);
      
      expect(document.objectProp).to.be.a('object');
      expect(document.objectProp).to.be.an.instanceOf(Document);
      expect(document.objectProp).to.have.property('stringProp');
      expect(document.objectProp).to.have.property('numberProp');
      expect(document.objectProp).to.have.property('numberFloatProp');
      expect(document.objectProp).to.have.property('booleanProp');
      expect(document.objectProp).to.have.property('nullProp');
      expect(document.objectProp).to.have.property('arrayProp');

      expect(document.objectProp.stringProp).to.be.a('string');
      expect(document.objectProp.stringProp).to.equals('string');
      expect(document.objectProp.numberProp).to.be.a('number');
      expect(document.objectProp.numberProp).to.equals(2);
      expect(document.objectProp.numberFloatProp).to.be.a('number');
      expect(document.objectProp.numberFloatProp).to.equals(2.5);
      expect(document.objectProp.booleanProp).to.be.a('boolean');
      expect(document.objectProp.booleanProp).to.equals(true);
      expect(document.objectProp.nullProp).to.be.null;

      expect(document.objectProp.arrayProp).to.be.a('array');
      expect(document.objectProp.arrayProp).to.have.length(3);
      expect(document.objectProp.arrayProp).to.deep.equal([1, 2, 3]);
    });

    it('should parse deep objects', () => {
      const document: IDocument = subject.create(json);
      const deep: IDocument = document.deepObjectProp.someObject;
      
      expect(document.deepObjectProp).to.be.a('object');
      expect(document.deepObjectProp).to.be.an.instanceOf(Document);
      expect(document.deepObjectProp).to.have.property('someProp', 'someValue');

      expect(deep).to.be.a('object');
      expect(deep).to.be.an.instanceOf(Document);
      expect(deep).to.have.property('someProp', 'someValue');
    });

    it('should parse mixed deep arrays/objects', () => {
      const document: IDocument = subject.create(json);
      const deepObject: IDocument = document.deepArrayObjectProp[2];
      const deepArrayInObject: IDocument = deepObject.someArray;
      const deepArray: any[] = document.deepArrayObjectProp[4];
      const deepObjectinArray: IDocument = deepArray[2];
      
      expect(deepObject).to.be.a('object');
      expect(deepObject).to.be.an.instanceOf(Document);
      expect(deepObject).to.have.property('someProp', 'someValue');    

      expect(deepArrayInObject).to.be.a('array');
      expect(deepArrayInObject).to.have.length(2);
      expect(deepArrayInObject).to.deep.equal([3, 4]);

      expect(deepArray).to.be.a('array');
      expect(deepArray).to.have.length(3);
      expect(deepArray[0]).to.equal(7);      
      expect(deepArray[1]).to.equal(8);      

      expect(deepObjectinArray).to.be.a('object');
      expect(deepObjectinArray).to.be.an.instanceOf(Document);
      expect(deepObjectinArray).to.have.property('someProp', 'someValue');  
    });
  });

  describe('query()', () => {
    it('should return DocumentQuery instance', () => {
      const query = subject.query();

      expect(query).to.be.an.instanceof(DocumentQuery);
    });
  });
});

