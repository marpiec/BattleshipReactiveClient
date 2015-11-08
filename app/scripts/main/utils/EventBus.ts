interface EventBusInterface {
    on(call: (...params: any[]) => void, callback: (...params: any[]) => void): number;
    unsubscribe(subscription: number): void;
}

class EventBus implements EventBusInterface {

    private callbacks: any[][] = [];
    private callbackQueue: any[][] = []; // callback, arguments
    private originals: any[] = [];
    private subscriptionsCounter = 0;
    private subscriptions: [number, number][] = [];

    constructor() {

        var methods: string[] = this.event_bus_priv_getMethods(this);

        for (var i = 0; i < methods.length; i++) {
            if (methods[i] !== "event_bus_priv_getMethods" && methods[i] !== "on" && methods[i] !== "unsubscribe" && methods[i] !== "event_bus_priv_Wrapper") {
                var wrapper: any;
               // console.log(methods[i]+" "+this.originals.length);
                eval(`wrapper = function() { this.event_bus_priv_Wrapper(${this.originals.length}, arguments); }`);
                (<any>this)[methods[i]] = wrapper;
                this.callbacks[i] = [];
                this.originals.push(wrapper);

            }
        }

    }

    private event_bus_priv_Wrapper(index: number, methodArguments: any) {
        //console.log("Called " + index+",  callbacks length " + this.callbacks[index].length+" arguments: "+JSON.stringify(methodArguments));
        for (var p = 0; p < this.callbacks[index].length; p++)
            if (this.callbacks[index][p] !== undefined)
                this.callbackQueue.push([this.callbacks[index][p], methodArguments]);
        while (this.callbackQueue.length > 0) {
            var callback = this.callbackQueue.shift();
            callback[0].apply(this, callback[1]);
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

        var index = this.originals.indexOf(<any>call);
        this.callbacks[index].push(callback);

        var subscription = this.subscriptionsCounter;
        this.subscriptionsCounter++;

        this.subscriptions[subscription] = [index, this.callbacks[index].length - 1];
        return subscription;
    }

    unsubscribe(subscription: number): void {
        this.callbacks[this.subscriptions[subscription][0]][this.subscriptions[subscription][1]] = undefined;
    }

}


namespace test {
    class TestEventBus extends EventBus {
        eventHappened(value: number) {
        }
    }


    describe("A suite", function () {
        it("contains spec with an expectation", function () {

            const testEventBus = new TestEventBus();

            let callbacks = 0;

            const subscriptionA = testEventBus.on(testEventBus.eventHappened, (value: number) => {
                callbacks += value;
            });

            const subscriptionB = testEventBus.on(testEventBus.eventHappened, (value: number) => {
                callbacks += value + 1;
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