export async function setDefaultTimeOut(page, time) {
  await page.setDefaultNavigationTimeout(time);
}

export async function fillInput(page, selector, value) {
  try {
    const input = await page.waitForSelector(selector);
    if (input) {
      await input.type(value, { delay: 25 });
    } else {
      console.error(`input element is null, selector = ${selector}`);
    }
  } catch (e) {
    console.error(`${e.message}, selector = ${selector}`, e.stack);
  }
}

export async function buttonClick(page, selector) {
  try {
    const button = await page.waitForSelector(selector);
    if (button) {
      await button.click();
    } else {
      console.error(`button is null, selector = ${selector}`);
    }
  } catch (e) {
    console.error(`${e.message}, selector = ${selector}`, e.stack);
    throw e;
  }
}

export async function waitForTime(page, time) {
  await page.waitForTimeout(time);
}

export async function keyPress(page, char) {
  await page.keyboard.press(char);
}

export async function getElementTextContent(page, selector) {
  const element = await page.waitForSelector(selector);
  await waitForTime(page, 250);
  const elementTextContent = await page.evaluate(
    (el) => el.textContent,
    element
  );
  return elementTextContent;
}

export async function getFieldValue(page, selector) {
  const field = await page.waitForSelector(selector);
  await waitForTime(page, 250);
  const fieldValue = await page.evaluate((el) => el.value, field);
  return fieldValue;
}
