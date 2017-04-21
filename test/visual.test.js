import Promise from 'bluebird';
import test from 'tape';
import msonZoo from 'mson-zoo';
import webdriverio from 'webdriverio';
import webdrivercss from 'webdrivercss';

// Setup webdriver tests
// We are using older webdrivercss, because wdio regression tests seems not ready yet
const client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome' } });

webdrivercss.init(client, {
  screenshotRoot: 'visual-regressions',
  failedComparisonsRoot: 'visual-regressions/failed',
  misMatchTolerance: 0.05, // To prevent failures from font-rendering issues and small deviations
  updateBaseline: false, // You can update baseline tests here
});

// TODO
// - additional browsers
// - allow filtering/reshotting of a single test
// - test light and dark theme
// - test rendering with or without sourceMaps from Drafter.js

/**
 * Checks one story from Storybook
 * We have to construct such Leviathan because Storybook is not making clicking easy
 * @param  {number} i which story to select from the panel
 * @param  {object} t tape test object
 * @return {Promise}
 */
function checkStory(sample, i, t) {
  return new Promise((resolve) => {
    t.test(`Example #${i} - ${sample.dataStructureName}`, (st) => {
      client
        .click(`li:nth-child(${i + 2}) > a[title]`) // Storybook doesn't give us any classes, so here we are…
        .keys(['Command', 'F', 'Command']) // Switch to fullscreen. Second CMD "de-presses" the mod key
        .frame(0) // Enter Storybook iframe
        .waitForVisible('#root .attributesKit')
        .webdrivercss(sample.fileName, [
          {
            name: sample.fileName,
            elem: '#root',  // take whole element, because Selenium might miss overflowing elements etc.
          },
        ], (err, res) => {
          if (!res[sample.fileName][0].isWithinMisMatchTolerance) {
            st.comment(JSON.stringify(res[sample.fileName][0])); // Print the error message
          }
          st.true(res[sample.fileName][0].isWithinMisMatchTolerance, 'matches the baseline screenshot');
        })
        .frameParent() // Go to the top frame
        .keys(['Command', 'F', 'Command']) // Turn off fullscreen, so we can click
        .waitForVisible('.Pane1')
        .then(() => {
          st.end();
          resolve();
        });
    });
  });
}

/*
  We are using Tape, because its simplistic nature plays well with async way of webdriverio
  Mocha/Karma were trying to be too smart
 */
test('Attributes kit visual regression test', { timeout: 900000 }, (t) => {
  t.plan(msonZoo.samples.length);

  client
    .init()
    .setViewportSize({ width: 900, height: 650 })
    .url('http://localhost:6006')
    .then(() => {
      const links = [];
      msonZoo.samples.forEach((sample, index) => {
        links.push(checkStory(sample, index, t));
      });
      Promise.all(links).then(() => {
        client.end(); // End Selenium run
        t.end(); // End Tape
      });
    });
});
