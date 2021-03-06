/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs defined', () => {
            for(feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            }
        });
        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have names defined', () => {
            for(feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            }
        });
    });

    /* Write a new test suite named "The menu" */
    describe('The menu', () => {
        /* Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        const body = $('body');
        const menuIcon = $('.menu-icon-link');

        // If 'body' contains the 'menu-hidden' class - the menu is hidden
        it('is hidden by default', () => {
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
         /* Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes its visibility when the menu icon is clicked', () => {
            // Trigger a click - show the menu
            menuIcon.click();
            // If 'body' does not contain the 'menu-hidden' class - the menu is displayed
            expect(body.hasClass('menu-hidden')).toBe(false);

            // Trigger a click - hide the menu
            menuIcon.click();
            // If 'body' contains the 'menu-hidden' class - the menu is hidden
            expect(body.hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Write a new test suite named "Initial Entries" */
    describe('Initial Entries', () => {
        /* Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        beforeEach((done) => {
            // Fetch the feed
            loadFeed(0, () => {
                done();
            });
        });

        it('have at least a single entry', (done) => {
            // Get the number of entries = feed's length
            const entriesNum = $('.feed .entry').length;

            // Ensure there is more than 0 entries
            expect(entriesNum).toBeGreaterThan(0);

            done();
        });
    });

    /* Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', () => {
        /* Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

        // Instantiate feeds to compare
        let initialFeed,
            newFeed;

        beforeEach((done) => {
            // Initial feed fetch
            loadFeed(0, () => {
                // Store initial feed content
                initialFeed = $('.feed').html();

                // Fetch new feed
                loadFeed(1, () => {
                    // Store new feed content
                    newFeed = $('.feed').html();
                    
                    done();
                });
            });
        });

        // Ensure the newer feed has different content than the initial one
        it('has been displayed', () => {
            expect(initialFeed).not.toBe(newFeed);
        });
    });
}());
