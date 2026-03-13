const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const AGENT_NAME = 'test01';
const UPLOADS_DIR = path.resolve(__dirname, 'uploads');
const PROCESSED_DIR = path.resolve(__dirname, 'processed');

// Sales Persona Instructions
const SALES_PROMPT = `
You are test01, the official Sales Agent for Amsa Bijouriel.
Your tone is luxurious, friendly, and persuasive.
You specialize in fine jewelry.
When answering messages:
1. Greet the customer warmly.
2. Highlight a key feature of the item (e.g., craftsmanship, material).
3. Encourage them to take the next step (ask for size, offer a discount code "WELCOME01", or guide to link in bio).
4. Always sign off with "- test01 | Sales Specialist".
`;

async function runTest01(credentials) {
    console.log(`[${AGENT_NAME}] Initializing Sales Agent...`);

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext({
        ...devices['iPhone 13'],
        locale: 'en-US',
    });
    const page = await context.newPage();

    try {
        await login(page, credentials);

        // 1. Process New Media
        await processNewMedia(page);

        // 2. Handle Messages
        await answerMessages(page);

    } catch (error) {
        console.error(`[${AGENT_NAME}] Fatal Error:`, error);
    } finally {
        console.log(`[${AGENT_NAME}] Task complete. Standing by.`);
        await new Promise(r => setTimeout(r, 10000));
        await browser.close();
    }
}

async function login(page, { username, password }) {
    console.log(`[${AGENT_NAME}] Logging in to Instagram...`);
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle' });

    // Skip popups
    const notNow = await page.$('text="Not Now"');
    if (notNow) await notNow.click();
}

async function processNewMedia(page) {
    console.log(`[${AGENT_NAME}] Checking for new media in ${UPLOADS_DIR}...`);
    const files = fs.readdirSync(UPLOADS_DIR).filter(f => /\.(jpg|jpeg|png|mp4)$/i.test(f));

    if (files.length === 0) {
        console.log(`[${AGENT_NAME}] No new media found.`);
        return;
    }

    for (const file of files) {
        const filePath = path.join(UPLOADS_DIR, file);
        console.log(`[${AGENT_NAME}] Posting ${file}...`);

        // Create Post Logic
        await page.click('[aria-label="New Post"]');

        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.click('text="Select from computer"'),
        ]);
        await fileChooser.setFiles(filePath);

        await page.waitForSelector('text="Next"');
        await page.click('text="Next"');
        await page.click('text="Next"');

        // Generate Sales Caption (Simplified for now)
        const caption = `✨ Discover the elegance of Amsa Bijouriel. ✨\n\nPure craftsmanship meets timeless design. Perfect for any occasion. \n\nDM us to order or use code WELCOME01 for a special surprise!\n\n#AmsaBijouriel #FineJewelry #Elegance - ${AGENT_NAME}`;

        await page.fill('div[aria-label="Write a caption..."]', caption);
        await page.click('text="Share"');

        await page.waitForSelector('text="Your post has been shared"');
        console.log(`[${AGENT_NAME}] Successfully posted ${file}`);

        // Move to processed
        fs.renameSync(filePath, path.join(PROCESSED_DIR, file));
    }
}

async function answerMessages(page) {
    console.log(`[${AGENT_NAME}] Checking for unread messages...`);
    await page.goto('https://www.instagram.com/direct/inbox/');

    // This part is complex due to IG's dynamic UI. 
    // We would look for unread badges and respond.
    // For the demo, we'll log that we are checking.
    const unreadCount = await page.locator('.x10l6tqk.x13vifvy').count(); // Example selector for unread indicators
    console.log(`[${AGENT_NAME}] Found ${unreadCount} potential interactions.`);
}

module.exports = { runTest01 };
