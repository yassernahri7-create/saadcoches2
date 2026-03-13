const { chromium, devices } = require('playwright');
const path = require('path');

async function postToInstagram({ username, password, imagePath, caption }) {
    console.log('🚀 Starting Instagram Agent...');

    const browser = await chromium.launch({ headless: false }); // Show browser for visibility
    const context = await browser.newContext({
        ...devices['iPhone 13'],
        locale: 'en-US',
    });

    const page = await context.newPage();

    try {
        // 1. Navigate to Instagram
        console.log('🔗 Navigating to Instagram...');
        await page.goto('https://www.instagram.com/accounts/login/');

        // 2. Login
        console.log('🔐 Logging in...');
        await page.fill('input[name="username"]', username);
        await page.fill('input[name="password"]', password);
        await page.click('button[type="submit"]');

        // Wait for login to complete
        await page.waitForNavigation({ waitUntil: 'networkidle' });

        // Check for "Save info" or other popups
        const saveInfoBtn = await page.$('text="Save Info"');
        if (saveInfoBtn) await saveInfoBtn.click();

        // 3. Click Create button (plus icon)
        console.log('📸 Initiating post creation...');
        await page.waitForSelector('[aria-label="New Post"]');
        await page.click('[aria-label="New Post"]');

        // 4. Upload Image
        console.log('⬆️ Uploading media...');
        const [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.click('text="Select from computer"'), // Note: In mobile view this might differ
        ]);
        await fileChooser.setFiles(imagePath);

        // 5. Navigate through "Edit" screens
        console.log('✍️ Handling filters and captions...');
        await page.click('text="Next"'); // From Crop to Filter
        await page.click('text="Next"'); // From Filter to Caption

        // 6. Enter Caption
        await page.fill('div[aria-label="Write a caption..."]', caption);

        // 7. Share
        console.log('✅ Sharing post...');
        await page.click('text="Share"');

        // Wait for success
        await page.waitForSelector('text="Your post has been shared"');
        console.log('🎉 Post shared successfully!');

    } catch (error) {
        console.error('❌ Error during posting:', error);
    } finally {
        await new Promise(r => setTimeout(r, 5000)); // Keep open for a bit
        await browser.close();
    }
}

// Example usage (uncomment and fill to run standalone):
/*
postToInstagram({
  username: 'YOUR_USERNAME',
  password: 'YOUR_PASSWORD',
  imagePath: path.resolve(__dirname, 'your-image.jpg'),
  caption: 'Hello from my AI Agent! 🤖 #AI #Automation'
});
*/

module.exports = { postToInstagram };
