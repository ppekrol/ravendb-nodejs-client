import {IHiloKeyGenerator, IHiloKeyGeneratorsCollection} from './IHiloKeyGenerator';
import {IDocumentStore} from '../Documents/IDocumentStore';
import {DocumentConventions} from '../Documents/Conventions/DocumentConventions';
import {DocumentID, IDocument} from '../Documents/IDocument';
import {IDCallback} from '../Utility/Callbacks';
import * as Promise from 'bluebird';

export abstract class AbstractHiloKeyGenerator implements IHiloKeyGenerator {
  protected generators: IHiloKeyGeneratorsCollection = {};
  protected store: IDocumentStore;
  protected conventions: DocumentConventions<IDocument>;
  protected dbName: string;
  protected tag: string;

  constructor(store: IDocumentStore, dbName?: string, tag?: string) {
    this.tag = tag;
    this.store = store;
    this.conventions = store.conventions;
    this.dbName = dbName;
  }

  public abstract generateDocumentKey(...args: (IDocument | IDCallback | string)[]): Promise<DocumentID>;

  public returnUnusedRange() {
    for (let key in this.generators) {
      this.generators[key].returnUnusedRange();
    }
  };
}
