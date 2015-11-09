interface EventBusInterface {
    on(call: (...params: any[]) => void, callback: (...params: any[]) => void): number;
    unsubscribe(subscription: number): void;
}

class Handler {
    methodName: string;
    handler: () => void; //function

    constructor(methodName: string, handler: () => void) {
        this.methodName = methodName;
        this.handler = handler;
    }
}

class Subscription {
    subscriptionId: number;
    methodName: string;


    constructor(subscriptionId: number, methodName: string) {
        this.subscriptionId = subscriptionId;
        this.methodName = methodName;
    }
}

class Callback {
    subscriptionId: number;
    callback: () => void; //function

    constructor(subscriptionId: number, callback: () => void) {
        this.subscriptionId = subscriptionId;
        this.callback = callback;
    }
}

class CallbackExecution {
    callback: () => void;
    callbackArguments: any[];


    constructor(callback: () => void, callbackArguments: any[]) {
        this.callback = callback;
        this.callbackArguments = callbackArguments;
    }
}

class EventBus implements EventBusInterface {

    private callbacks: {[methodName: string]: Callback[]} = {};
    private handlers: Handler[] = [];

    private subscriptionsCounter = 0;
    private subscriptions: string[] = []; //subscriptionId => methodName

    private callbackQueue: CallbackExecution[] = []; // callback, arguments

    constructor() {

        var methods: string[] = this.event_bus_priv_getMethods(this);

        for (var i = 0; i < methods.length; i++) {
            const methodName = methods[i];
            if (methodName !== "event_bus_priv_getMethods" && methodName !== "on" &&
                methodName !== "unsubscribe" && methodName !== "event_bus_priv_Handler" &&
                methodName !== "subscribe" && methodName !== "constructor") {
                var handler: any;
                eval(`handler = function() { this.event_bus_priv_Handler("${methodName}", arguments); }`);
                (<any>this)[methodName] = handler;
                this.callbacks[methodName] = [];
                this.handlers.push(new Handler(methodName, handler));

            }
        }

    }

    // It uses queue to preserve order of function calls
    private event_bus_priv_Handler(methodName: string, methodArguments: any[]) {
        //console.log("Called " + index+",  callbacks length " + this.callbacks[index].length+" arguments: "+JSON.stringify(methodArguments));
        const callbacksList = this.callbacks[methodName];
        for (var p = 0; p < callbacksList.length; p++) {
            this.callbackQueue.push(new CallbackExecution(callbacksList[p].callback, methodArguments));
        }
        while (this.callbackQueue.length > 0) {
            var callback = this.callbackQueue.shift();
            (callback.callback).apply(this, callback.callbackArguments);
        }

    }

    private event_bus_priv_getMethods(obj: any) {
        var res: any[] = [];
        for (var m in obj) {
            if (typeof obj[m] == "function") {
                res.push(m)
            }
        }
        return res;
    }

    on(call: (...params: any[]) => void, callback: (...params: any[]) => void): number {

        var subscriptionId = this.subscriptionsCounter;

        let handler:Handler = undefined;
        for(let p=0;p<this.handlers.length;p++) {
            if(this.handlers[p].handler === call) {
                handler = this.handlers[p];
                break;
            }
        }

        this.callbacks[handler.methodName].push(new Callback(subscriptionId, callback));

        this.subscriptionsCounter++;

        this.subscriptions[subscriptionId] = handler.methodName;
        return subscriptionId;
    }

    subscribe(callbacks: any): void {
        console.log(callbacks);
        console.log(2222222);
        var methods: string[] = this.event_bus_priv_getMethods(callbacks);

        console.log(methods);

        for(let p=0;p<methods.length;p++) {
            const methodName = methods[p];
            if (methodName !== "event_bus_priv_getMethods" && methodName !== "on" &&
                methodName !== "unsubscribe" && methodName !== "event_bus_priv_Handler" &&
                methodName !== "subscribe" && methodName !== "constructor") {

                console.log("Subscribing for " + methodName+" "+(<any>callbacks)[methodName]);
                this.on((<any>this)[methodName], (<any>callbacks)[methodName]);
            }


        }


    }

    unsubscribe(subscriptionId: number): void {
        const methodName = this.subscriptions[subscriptionId];
        const methodCallbacks = this.callbacks[methodName];

        let callbackIndex:number = -1;
        for(let p=0;p<methodCallbacks.length;p++) {
            if(methodCallbacks[p].subscriptionId === subscriptionId) {
                callbackIndex = p;
                break;
            }
        }

        methodCallbacks.splice(callbackIndex, 1);

    }

}


namespace test {

    class TestEventBus extends EventBus {
        eventHappened(value: number) {
        }


    }

    class TestEventBus1 {
        eventHappened(value: number) {
        }


    }


    describe("A suite", function () {
        it("contains spec with an expectation", function () {

            const testEventBus = new TestEventBus();

            let callbacks = 0;

            console.log("1111");

            try {
                console.log("333");
                class TestEventBusCallbacks extends TestEventBus1 {
                    eventHappened(value: number) {
                        callbacks += value;
                        console.log("It happened");
                    }
                }
                console.log("333333");
                const callbacks1 = new TestEventBusCallbacks();

                console.log("444");
                console.log("555" + callbacks1);
                testEventBus.subscribe(callbacks1);

            } catch(e) {
                console.log("e" + e)
            } finally {
                console.log("finally")
            }



            const subscriptionA = testEventBus.on(testEventBus.eventHappened, (value: number) => {
                //callbacks += value;
            });

            const subscriptionB = testEventBus.on(testEventBus.eventHappened, (value: number) => {
                //callbacks += value + 1;
            });

            testEventBus.eventHappened(5);
            expect(callbacks).toBe(11);
            testEventBus.eventHappened(5);
            expect(callbacks).toBe(22);

            testEventBus.unsubscribe(subscriptionA);
            testEventBus.eventHappened(5);
            expect(callbacks).toBe(28);

            testEventBus.unsubscribe(subscriptionB);

            testEventBus.eventHappened(5);
            expect(callbacks).toBe(28);

        });
    });
}