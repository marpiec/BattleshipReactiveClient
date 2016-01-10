namespace nodes {

    export function getElementPosition(element: JQuery): XY {
        const rect = element.get(0).getBoundingClientRect();
        return new XY(rect.left, rect.top).plus(getWindowScroll());
    }

    export function getElementSize(element: JQuery): Size {
        const rect = element.get(0).getBoundingClientRect();
        return new Size(rect.right - rect.left, rect.bottom - rect.top);
    }

    export function getElementPositionAndSize(element: JQuery): Rect {
        const rect = element.get(0).getBoundingClientRect();
        return new Rect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top);
    }

    export function getWindowScroll(): XY {
        const doc = document.documentElement;
        const windowLeftScroll = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        const windowTopScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);
        return new XY(windowLeftScroll, windowTopScroll);
    }


}