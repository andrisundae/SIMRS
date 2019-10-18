export const findNextElement = (classForm, classElement, elementName) => {
    let inputs = document.forms[classForm].getElementsByClassName(classElement);
    let length = inputs.length;
    let currentIndex = '';
    for (let i = 0; i < length; i++) {
        if (inputs[i].name === elementName) {
            currentIndex = i;
            break;
        }
    }
    let nextIndex = currentIndex + 1;
    let nextInput = null;

    for (let i = 0; i < length; i++) {
        if (i === nextIndex) {
            if (!inputs[i].disabled && !inputs[i].hidden && !inputs[i].readonly) {
                nextInput = inputs[i].name;
                break;
            } else {
                nextInput = this._getNextElement(inputs[i].name)
            }
        }
    }

    return !nextInput ? 'save' : nextInput;
}
