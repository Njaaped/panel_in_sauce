import * as common from '/pages/src/common.mjs';

function initResizer() {
    const handle = document.querySelector('.resize-handle');
    if (!handle) return;

    handle.addEventListener('mousedown', function(e) {
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = window.innerWidth;
        const startHeight = window.innerHeight;

        function doDrag(e) {
            const newWidth = startWidth + e.clientX - startX;
            const newHeight = startHeight + e.clientY - startY;
            // Use the Sauce RPC to resize the window
            common.rpc.resizeWindow(Math.round(newWidth), Math.round(newHeight));
        }

        function stopDrag() {
            window.removeEventListener('mousemove', doDrag);
            window.removeEventListener('mouseup', stopDrag);
        }

        window.addEventListener('mousemove', doDrag);
        window.addEventListener('mouseup', stopDrag);
    });
}

// Ensure the DOM is loaded before trying to find the handle
function initWindowControls() {
    const closeButton = document.querySelector('.window-control-close');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            common.rpc.closeWindow()
        });
    }
}

// Ensure the DOM is loaded before trying to find the handle
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initResizer();
        initWindowControls();
    });
} else {
    initResizer();
    initWindowControls();
}
