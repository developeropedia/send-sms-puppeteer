const puppeteer = require('puppeteer');

// Sleep Function
function sleep(milliseconds) {
    const time = Date.now();
    let currentTime = null;
    do {
        currentTime = Date.now();
    } while (currentTime - time < milliseconds);
}

(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] });

    // Login
    const login = await browser.newPage();
    await login.goto('https://developer.syniverse.com/login/signin', {waitUntil: 'networkidle0', timeout: 0});

    await login.waitForSelector('div.login__actions > button');

    await login.type('#username', 'leocenteno');
    await login.type('#password', 'Super!eo1978+');
    await login.click('div.login__actions > button');

    sleep(1000);

    // Application Page
    const app = await browser.newPage();
    await app.goto('https://developer.syniverse.com/sdc-ui/applications');

    // Wait and Click Voice & Messaging Console
    await app.waitForSelector('body > div.ng-scope > div.navbar.navbar-inverse.navbar-fixed-top.ng-scope > div > div.collapse.navbar-collapse > div:nth-child(2) > div > div > ul > li:nth-child(3) > a');
    await app.click('body > div.ng-scope > div.navbar.navbar-inverse.navbar-fixed-top.ng-scope > div > div.collapse.navbar-collapse > div:nth-child(2) > div > div > ul > li:nth-child(3) > a');

    // Wait and Select Account
    await app.waitForSelector('select[name="applicationId"]');
    await app.select('select[name="applicationId"]', 'object:100');

    sleep(3000);

    // Click on Select
    await app.waitForSelector('body > div.modal.fade.ng-isolate-scope.account-select-modal-window.in > div > div > div.login.col-sm-10.col-sm-offset-1.ng-scope > form > div.form-actions > a');
    await app.click('body > div.modal.fade.ng-isolate-scope.account-select-modal-window.in > div > div > div.login.col-sm-10.col-sm-offset-1.ng-scope > form > div.form-actions > a');

    sleep(2000);

    // Wait and Click Messaging Dropdown
    await app.waitForSelector('#main > div.main-container > div.navbar-content > div > ul > li:nth-child(2)');
    await app.click('#main > div.main-container > div.navbar-content > div > ul > li:nth-child(2)');

    sleep(4000);

    // Click Send Message
    await app.waitForSelector('#main > div.main-container > div.navbar-content > div > ul > li:nth-child(2) > ul > li:nth-child(4)');
    await app.click('#main > div.main-container > div.navbar-content > div > ul > li:nth-child(2) > ul > li:nth-child(4)');

    sleep(2000);

    let phone = '+33779279015';
    let msg = 'Message One';

    for(let i=0; i<2; i++) {

        // Click Use Channel
        await app.waitForSelector('#msg_send_sms_tab > form > div:nth-child(5) > div.col-sm-4 > a.btn.btn-primary.ng-binding');
        await app.click('#msg_send_sms_tab > form > div:nth-child(5) > div.col-sm-4 > a.btn.btn-primary.ng-binding');

        sleep(2000);

        // Type Channel ID of France
        await app.waitForSelector('div.ng-scope.sortable > div:nth-child(3) > div > div > input')
        await app.type('div.ng-scope.sortable > div:nth-child(3) > div > div > input', 'RUHDTglIodfuVx2vBg7qg3');

        sleep(3000);

        // Check Channel
        await app.waitForSelector('div.ui-grid-viewport.ng-isolate-scope > div > div > div > div > p > a');
        await app.click('div.ui-grid-viewport.ng-isolate-scope > div > div > div > div > p > a');

        sleep(2000);

        // Click OK
        await app.click('body > div.modal.fade.ng-isolate-scope.in > div > div > div.modal-footer.ng-scope > button:nth-child(1)');

        sleep(1000);

        // Insert Phone Number
        await app.type('#msg_send_sms_tab > form > div:nth-child(9) > div.col-sm-5 > tags-input > div > div > input', phone);

        // Remove Focus From Number Field
        await app.$eval('#msg_send_sms_tab > form > div:nth-child(9) > div.col-sm-5 > tags-input > div > div > input', e => e.blur());

        // Enter Message
        await app.type('#smsMessage', msg);

        // Click Send
        await app.click('#msg_send_sms_tab > form > div:nth-child(19) > div > a.btn.btn-blue');

        phone = '+33644626269';
        msg = 'Message Two';

        sleep(4000);
    }

    // await browser.close();
})();