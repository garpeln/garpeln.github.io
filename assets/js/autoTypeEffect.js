// autoTypeEffect.js

function autoTypeEffect(textToType, elementId, typeSpeed, waitTime) {
  const autoTypeTextElement = document.getElementById(elementId);
  let i = 0;

  function typeText() {
    if (i < textToType.length) {
      autoTypeTextElement.innerHTML += textToType.charAt(i);
      i++;
      setTimeout(typeText, typeSpeed);
    } else {
      setTimeout(deleteText, waitTime);
    }
  }

  function deleteText() {
    const currentText = autoTypeTextElement.innerHTML;
    if (currentText.length > 0) {
      autoTypeTextElement.innerHTML = currentText.slice(0, -1);
      setTimeout(deleteText, typeSpeed);
    } else {
      i = 0;
      setTimeout(typeText, typeSpeed);
    }
  }

  typeText();
}
