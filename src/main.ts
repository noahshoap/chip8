function changeDisplayColor(color: string = "black")
{
  let display = document.querySelector("canvas");
  if (display === null)
    return;

  let context = display.getContext("2d");
  if (context === null)
    return;

  context.fillStyle = color;
  context.fillRect(0, 0, display.width, display.height);
}

changeDisplayColor();