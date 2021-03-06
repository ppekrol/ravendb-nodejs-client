import {IDocumentSession} from "./IDocumentSession";
import {IDocumentQuery} from "./IDocumentQuery";
import {DocumentQuery} from "./DocumentQuery";
import {IDocument} from '../IDocument';
import {IDocumentStore} from '../IDocumentStore';
import {RequestExecutor} from '../../Http/RequestExecutor';
import {DocumentConventions} from '../Conventions/DocumentConventions';
import {DocumentCallback} from '../Callbacks';
import * as Promise from 'bluebird'

export class DocumentSession implements IDocumentSession {
  protected database: string;
  protected documentStore: IDocumentStore;
  private _numberOfRequestsInSession: number;

  public get numberOfRequestsInSession(): number {
    return this._numberOfRequestsInSession;
  }

  public get conventions(): DocumentConventions {
    return this.documentStore.conventions;
  }       

  constructor (database: string, documentStore: IDocumentStore, requestsExecutor: RequestExecutor, sessionId: string, forceReadFromMaster: boolean) {
      
  }

  public load<T extends IDocument>(keyOrKeys: string | string[], callback?: DocumentCallback<T>): Promise<T> {
    return new Promise<T>(()=>{});
  }

  public delete<T extends IDocument>(keyOrEntity: string | IDocument, callback?: DocumentCallback<T>): Promise<T> {
    return new Promise<T>(()=>{});
  }

  public store<T extends IDocument>(entity: IDocument, key?: string, etag?: string, forceConcurrencyCheck: boolean = false, callback?: DocumentCallback<T>): Promise<T> {
    return new Promise<T>(()=>{});
  }

  public query<T extends IDocument>(): IDocumentQuery<T> {
    return new DocumentQuery<T>();
  }

  public incrementRequestsCount(): void {

  }
}