/// <reference path="../libs.d/jquery/jquery.d.ts"/>
/// <reference path="UniqueId.ts"/>

module pointer {


    $.fn.handlerDrag = function (mouseDrag: MouseDrag<any>) {
        mouseDrag.init(this);
        return this;
    };

    export abstract class MouseDrag<M> {

        private uniqueIdentifier: number;
        private model: M;
        private node: JQuery;

        private initialDragPositionWithInitialMouse: XY = null;

        constructor(model: M) {
            this.uniqueIdentifier = UniqueId.next();
            this.model = model;
        }

        init(node: JQuery) {
            this.node = node;
            this.initialDragPositionWithInitialMouse = null;

            this.initElementListening();
        }

        private initElementListening() {
            this.node.on("mousedown.MouseDrag" + this.uniqueIdentifier, (eventObject: JQueryMouseEventObject) => {
                this.mouseDown(eventObject);
                return false;
            });
        }

        private stopElementListening() {
            this.node.off("mousedown.MouseDrag" + this.uniqueIdentifier);
        }

        private initWindowListening() {
            $(window).on("mousemove.MouseDrag" + this.uniqueIdentifier, (eventObject: JQueryMouseEventObject) => {
                this.mouseMove(eventObject);
                return false;
            });

            $(window).on("mouseup.MouseDrag" + this.uniqueIdentifier, (eventObject: JQueryMouseEventObject) => {
                this.mouseUp(eventObject);
                return false;
            });
        }

        private mouseDown(eventObject: JQueryMouseEventObject) {
            if (this.nodeRemoved()) {
                this.stop();
            }
            if (MouseDrag.leftButtonIsPressed(eventObject)) {
                const initialMousePosition = new XY(eventObject.pageX, eventObject.pageY);
                const initialPosition = this.dragInit(this.node, this.model);
                this.initialDragPositionWithInitialMouse = initialPosition.minus(initialMousePosition);
                this.dragStarted(initialPosition, this.node, this.model);
                this.initWindowListening();
            }
        };

        private static leftButtonIsPressed(eventObject: JQueryMouseEventObject) {
            //this means left button, which is standardized by jquery across browsers
            return eventObject.which === 1;
        };

        private mouseUp(eventObject: JQueryMouseEventObject) {
            if (this.nodeRemoved()) {
                this.stop();
            }
            if (this.initialDragPositionWithInitialMouse !== null) {
                const currentMousePosition = new XY(eventObject.pageX, eventObject.pageY);
                this.dragEnded(this.initialDragPositionWithInitialMouse.plus(currentMousePosition), this.node, this.model);
                this.initialDragPositionWithInitialMouse = null;
                this.stopWindowListening();
            }
        };

        private mouseMove(eventObject: JQueryMouseEventObject) {
            if (this.nodeRemoved()) {
                this.stop();
            } else if (!MouseDrag.leftButtonIsPressed(eventObject)) {
                // if for some reason mouse up event was not registered
                this.mouseUp(eventObject);
            } else if (this.initialDragPositionWithInitialMouse !== null) {
                const currentMousePosition = new XY(eventObject.pageX, eventObject.pageY);
                this.dragged(this.initialDragPositionWithInitialMouse.plus(currentMousePosition), this.node, this.model);
            }
        };

        private stopWindowListening() {
            $(window).off("mousemove.MouseDrag" + this.uniqueIdentifier);
            $(window).off("mouseup.MouseDrag" + this.uniqueIdentifier);
        }

        private nodeRemoved(): boolean {
            return this.node.get(0).parentNode === null;
        };

        private stop(): void {
            this.stopElementListening();
            this.stopWindowListening();
        }


        abstract dragInit(node: JQuery, model: M): XY;

        abstract dragStarted(eventPosition: XY, draggedNode: JQuery, model: M): void;

        abstract dragged(eventPosition: XY, draggedNode: JQuery, model: M): void;

        abstract dragEnded(eventPosition: XY, draggedNode: JQuery, model: M): void;


    }

}