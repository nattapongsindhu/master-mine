import { expect, test, type Page } from "@playwright/test";

const TOTAL_PROGRAMS = 12;
const FAVORITES_KEY = "masterpath-favorites";

async function readSummary(page: Page) {
  const summary = page.locator("p").filter({ hasText: "Showing" }).first();
  const text = await summary.innerText();
  const match = text.match(/Showing\s+(\d+)\s+of\s+(\d+)\s+programs/);
  if (!match) throw new Error(`Unexpected summary text: ${text}`);
  return { shown: Number(match[1]), total: Number(match[2]) };
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("article")).toHaveCount(TOTAL_PROGRAMS);
});

test("discipline filter narrows the program list", async ({ page }) => {
  await page.getByRole("checkbox", { name: "Cybersecurity", exact: true }).check();

  await expect(page.locator("article")).toHaveCount(5);
  await expect(
    page.locator("article").filter({ hasText: "California State University" }),
  ).toHaveCount(0);
  await expect(
    page.locator("article").filter({ hasText: "Policy Track" }),
  ).toHaveCount(1);

  const summary = await readSummary(page);
  expect(summary).toEqual({ shown: 5, total: TOTAL_PROGRAMS });
});

test("budget quick filter keeps every program under $25,000", async ({ page }) => {
  await page.getByRole("button", { name: /Budget Friendly/ }).click();

  await expect(page.locator("article")).toHaveCount(7);

  const summary = await readSummary(page);
  expect(summary).toEqual({ shown: 7, total: TOTAL_PROGRAMS });
});

test("compare opens a modal with two columns and restores focus on Escape", async ({ page }) => {
  const analytics = page.locator("article").filter({ hasText: "OMS Analytics" });
  const csula = page
    .locator("article")
    .filter({ hasText: "California State University, Los Angeles" });

  await analytics.getByRole("checkbox").check();
  await csula.getByRole("checkbox").check();

  await expect(page.getByText("2/3", { exact: true })).toBeVisible();

  const compareButton = page.getByRole("button", { name: "Compare now" });
  await expect(compareButton).toBeEnabled();
  await compareButton.click();

  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Your shortlisted programs" }),
  ).toBeVisible();
  await expect(dialog.getByText("Georgia Institute of Technology", { exact: true })).toBeVisible();
  await expect(
    dialog.getByText("California State University, Los Angeles", { exact: true }),
  ).toBeVisible();
  await expect(dialog.getByText("Not ranked nationally", { exact: true })).toBeVisible();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(compareButton).toBeFocused();
});

test("favorite persists across reload", async ({ page }) => {
  const card = page.locator("article").filter({ hasText: "OMS Analytics" });

  await card.getByRole("button", { name: "Save program" }).click();
  await expect(card.getByRole("button", { name: "Remove from favorites" })).toBeVisible();

  const stored = await page.evaluate((key) => window.localStorage.getItem(key), FAVORITES_KEY);
  expect(stored).toContain("gatech-oms-analytics");

  await page.reload();
  await page.waitForLoadState("networkidle");

  const reloadedCard = page.locator("article").filter({ hasText: "OMS Analytics" });
  await expect(
    reloadedCard.getByRole("button", { name: "Remove from favorites" })
  ).toBeVisible();
});

test.describe("mobile layout", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("filter panel opens, applies a filter, and closes", async ({ page }) => {
    await page.getByRole("button", { name: "Filters" }).click();

    const doneButton = page.getByRole("button", { name: "Done" });
    await expect(doneButton).toBeVisible();

    await page.getByRole("checkbox", { name: "Cybersecurity", exact: true }).check();
    await doneButton.click();

    await expect(doneButton).toBeHidden();
    await expect(page.locator("article")).toHaveCount(5);
    await expect(page.getByRole("button", { name: "Filters" })).toBeVisible();
  });
});
