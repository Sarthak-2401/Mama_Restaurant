const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { chromium } = require(process.argv[2] || "playwright");

(async () => {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch {
    browser = await chromium.launch({ headless: true, channel: "msedge" });
  }
  try {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("http://127.0.0.1:5173/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);

    assert.equal(await page.locator(".signature-dish").count(), 1);
    assert.equal(await page.locator(".dish-card").count(), 6);
    assert.equal(await page.locator(".delivery-areas li").count(), 8);
    assert.equal(
      await page.locator("img").count(),
      0,
      "Website must not render photography",
    );
    assert.match(await page.locator("h1").innerText(), /Dahi Jalebi/);
    assert.equal(
      (await page.locator('a[href="tel:+919456333444"]').count()) > 0,
      true,
    );
    assert.equal(
      (await page.locator('a[href="tel:+917248888388"]').count()) > 0,
      true,
    );

    const cards = page.locator(".dish-card");
    const names = await cards.locator("h3").allInnerTexts();
    assert.deepEqual(names, [
      "Rajma Chawal",
      "Kadhi Chawal",
      "Chole Chawal",
      "Chola Samosa",
      "Plain Samosa",
      "Sweet Lassi",
    ]);
    assert.match(await page.locator(".signature-order-row").innerText(), /₹50/);
    assert.match(
      await cards.filter({ hasText: "Chola Samosa" }).innerText(),
      /₹50/,
    );
    assert.match(
      await cards.filter({ hasText: "Plain Samosa" }).innerText(),
      /₹15/,
    );
    assert.match(
      await cards.filter({ hasText: "Sweet Lassi" }).innerText(),
      /₹50/,
    );

    fs.mkdirSync(path.resolve("artifacts"), { recursive: true });
    await page.screenshot({ path: "artifacts/desktop.png", fullPage: true });
    await page.screenshot({ path: "artifacts/desktop-hero.png" });

    const signatureButton = page.getByRole("button", {
      name: "Order Dahi Jalebi",
    });
    await signatureButton.click();
    let dialog = page.getByRole("dialog");
    assert.equal(await dialog.isVisible(), true);
    assert.equal(
      await dialog.locator(".order-total > strong").innerText(),
      "₹50",
    );
    await dialog.getByRole("button", { name: "Add one plate" }).click();
    assert.equal(
      await dialog.locator(".order-total > strong").innerText(),
      "₹100",
    );
    await dialog.getByLabel("Your delivery area").selectOption("Sattal");
    assert.equal(
      await dialog.locator(".order-total small").innerText(),
      "Free delivery to Sattal",
    );
    await page.screenshot({ path: "artifacts/order-dialog.png" });
    await page.keyboard.press("Escape");
    assert.equal(await page.getByRole("dialog").count(), 0);
    assert.equal(
      await signatureButton.evaluate(
        (button) => button === document.activeElement,
      ),
      true,
    );

    const rajma = cards.filter({ hasText: "Rajma Chawal" });
    await rajma.getByRole("button", { name: "Half plate" }).click();
    await rajma.getByRole("button", { name: "Order Rajma Chawal" }).click();
    dialog = page.getByRole("dialog");
    assert.equal(
      await dialog.locator(".order-total > strong").innerText(),
      "₹50",
    );
    await dialog.getByRole("button", { name: "Full plate" }).click();
    assert.equal(
      await dialog.locator(".order-total > strong").innerText(),
      "₹100",
    );
    await dialog.getByRole("button", { name: "Close order" }).click();

    for (const width of [1440, 1024, 768, 640, 390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
        true,
        `Horizontal overflow at ${width}px`,
      );
      if (width === 390) {
        await page.screenshot({ path: "artifacts/mobile.png", fullPage: true });
        await page.getByRole("button", { name: "Open menu" }).click();
        await page
          .getByRole("navigation")
          .getByRole("link", { name: "Our menu" })
          .click();
        assert.equal(new URL(page.url()).hash, "#menu");
        const lassi = page
          .locator(".dish-card")
          .filter({ hasText: "Sweet Lassi" });
        await lassi.getByRole("button", { name: "Order Sweet Lassi" }).click();
        assert.equal(
          await page
            .getByRole("dialog")
            .locator(".order-total > strong")
            .innerText(),
          "₹50",
        );
        await page.getByRole("button", { name: "Close order" }).click();
      }
    }
    assert.deepEqual(errors, [], "Browser runtime errors");
    console.log(
      "PASS: Signature Dahi Jalebi, 7-item menu, supplied prices, photo-free artwork, order totals, dialogs, mobile navigation, and responsive layouts verified.",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
