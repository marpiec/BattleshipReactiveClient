/// <reference path="../libs.d/jquery/jquery.d.ts"/>

module pointer {


    $.fn.dragHandler = function(mouseDrag: MouseDrag<any>) {
        mouseDrag.init(this);
        return this;
    };


    export abstract class MouseDrag<M> {

        private model: M;
        private node: JQuery;

        private initialDragPositionWithInitialMouse: XY = null;

        constructor(model: M) {
            this.model = model;
        }

        init(node: JQuery) {
           this.node = node;
           this.initialDragPositionWithInitialMouse = null;

           this.node.mousedown((eventObject: JQueryMouseEventObject) => {
               console.log("eventObject", eventObject);
               if(eventObject.which === 1) { //this means left button, which is standarized by jquery acros browsers
                   const initialMousePosition = new XY(eventObject.pageX, eventObject.pageY);
                   const initialPosition = this.dragInit(this.node, this.model);
                   this.initialDragPositionWithInitialMouse = initialPosition.minus(initialMousePosition);
                   this.dragStarted(initialPosition, this.node, this.model);
               }
            });

           $(window).mousemove((eventObject: JQueryMouseEventObject) => {
               if(this.initialDragPositionWithInitialMouse !== null) {
                   const currentMousePosition = new XY(eventObject.pageX, eventObject.pageY);
                   this.dragged(this.initialDragPositionWithInitialMouse.plus(currentMousePosition), this.node, this.model);
               }
            });

            $(window).mouseup((eventObject: JQueryMouseEventObject) => {
                if(this.initialDragPositionWithInitialMouse !== null) {
                    const currentMousePosition = new XY(eventObject.pageX, eventObject.pageY);
                    this.dragEnded(this.initialDragPositionWithInitialMouse.plus(currentMousePosition), this.node, this.model);
                    this.initialDragPositionWithInitialMouse = null;
                }
            });
        }


        abstract dragInit(node: JQuery, model: M): XY;

        abstract dragStarted(eventPosition: XY, node: JQuery, model: M): void;

        abstract dragged(eventPosition: XY, node: JQuery, model: M): void;

        abstract dragEnded(eventPosition: XY, node: JQuery, model: M): void;


    }

}