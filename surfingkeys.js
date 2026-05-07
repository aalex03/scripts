api.mapkey('<Ctrl-h>', 'Hover element under caret (no caret mode)', function() {
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const node = range.startContainer.parentElement;
    if (!node) return;
    node.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    api.Front.showPopup('Hovered element under caret');
});

api.mapkey('gf', 'Hint and click any clickable element', function() {
    api.Hints.create("a, button, [role='button'], [onclick], [tabindex], .btn, .clickable, .menu-item", function(el) {
        let target = el;
        // climb DOM to find something truly clickable
        for (let i = 0; i < 5 && target; i++) {
            if (
                target.onclick ||
                target.tagName === "A" ||
                target.getAttribute("role") === "button" ||
                target.classList.contains("clickable")
            ) {
                target.click();
                return;
            }
            target = target.parentElement;
        }
        // fallback: simulate a mouse click
        el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
});
