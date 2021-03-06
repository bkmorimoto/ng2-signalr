import { Observable } from 'rxjs/Observable';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { SignalRConfiguration } from '../signalr.configuration';
import { BroadcastEventListener } from '../eventing/broadcast.event.listener';
import { Subject } from 'rxjs/Subject';
import { ConnectionStatus } from '../connection/connection.status';
import { SignalRConnectionBase } from '../connection/signalr.connection.base';

export interface ListenerCollection {
    [name: string]: BroadcastEventListener<any>;
}

export class SignalRConnectionMock extends SignalRConnectionBase {
    constructor(
        private _mockErrors$: Subject<any>, 
        private _mockStatus$: Subject<ConnectionStatus>,
        private _listeners: ListenerCollection) {
         super();
    }

    get errors(): Observable<any> {
        return this._mockErrors$;
    }

    get status(): Observable<ConnectionStatus> {
        return this._mockStatus$;
    }

    public stop(): void {
    }

   public start(): Promise<any> {
        return Promise.resolve(null); // TODO: implement
    }

    public invoke(method: string, ...parameters: any[]): Promise<any> {
        return Promise.resolve(null);
    }

    public listen<T>(listener: BroadcastEventListener<T>): void {
        this._listeners[listener.event] = listener;
    }
}


