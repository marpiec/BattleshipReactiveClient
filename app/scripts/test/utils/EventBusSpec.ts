namespace EventBusSpec {

    class TestEventBus extends EventBus {
        eventHappened(value: number) {
        }


    }

    describe("Event Bus specification", function () {
        it("can handle event bus requirements", function () {

            class A {

                callbacks = 0;

                constructor() {

                    const outer = this;


                    const testEventBus = new TestEventBus().init<TestEventBus>();


                    class TestEventBusCallbacks extends TestEventBus {
                        eventHappened(value: number) {
                            outer.callbacks += value;
                        }
                    }
                    const subscriptionA = testEventBus.subscribe(new TestEventBusCallbacks());

                    class SubscriptionA extends TestEventBus {
                        eventHappened(value: number) {
                            outer.callbacks += value + 1;
                        }
                    }
                    const subscriptionB = testEventBus.subscribe(new SubscriptionA());


                    //const subscriptionA = testEventBus.on(testEventBus.eventHappened, (value: number) => {
                    //    //callbacks += value;
                    //});
                    //
                    //const subscriptionB = testEventBus.on(testEventBus.eventHappened, (value: number) => {
                    //    //callbacks += value + 1;
                    //});

                    testEventBus.eventHappened(5);
                    expect(this.callbacks).toBe(11);
                    testEventBus.eventHappened(5);
                    expect(this.callbacks).toBe(22);

                    testEventBus.unsubscribe(subscriptionA);
                    testEventBus.eventHappened(5);
                    expect(this.callbacks).toBe(28);

                    testEventBus.unsubscribe(subscriptionB);

                    testEventBus.eventHappened(5);
                    expect(this.callbacks).toBe(28);
                }

            }


            new A();

        });
    });
}