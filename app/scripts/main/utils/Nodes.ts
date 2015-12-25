namespace nodes {

    export function getElementPosition(element: Element): XY {
        const rect = element.getBoundingClientRect();
        const doc = document.documentElement;
        const windowLeftScroll = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
        const windowTopScroll = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0);

        return new XY(rect.left + windowLeftScroll, rect.top + windowTopScroll);
    }


    export function getElementSize(element: Element): Size {
        const rect = element.getBoundingClientRect();
        return new Size(rect.right - rect.left, rect.bottom - rect.top);
    }


}