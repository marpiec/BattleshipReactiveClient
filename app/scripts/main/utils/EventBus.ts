
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

        var methods: string[] = this.getMethods(this);

        for(var i = 0; i<methods.length;i++) {
            if(methods[i] !== "getMethods" && methods[i] !== "on" && methods[i] !== "init" && methods[i] !== "unsubscribe") {
                var wrapper:any;
                eval(`
        wrapper = function() {
          for(var p=0;p<this.callbacks[${this.originals.length}].length;p++)
            if(this.callbacks[${this.originals.length}][p]!==undefined)
              this.callbackQueue.push([this.callbacks[${this.originals.length}][p], arguments]);
          while(this.callbackQueue.length > 0) {
            var callback = this.callbackQueue.shift();
            callback[0].apply(this, callback[1]);
          }
        }`);
                (<any>this)[methods[i]] = wrapper;
                this.callbacks[i] = [];
                this.originals.push(wrapper);
            }
        }

    }


    private getMethods(obj: any)
    {
        var res: any[] = [];
        for(var m in obj) {
            if(typeof obj[m] == "function") {
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
        eventHappened(value: number) {}
    }



    describe("A suite", function() {
        it("contains spec with an expectation", function() {

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