import launcher from 'browser-launcher2';


launcher.detect( (available) => {
  launcher((err, launch) => {
    launch('http://www.microsoft.com', {
      detached: true,
      browser: available[0].name,
    }, (err, instance) => {
      if (err) {
        return console.error(err);
      }

      instance.process.unref();
      instance.process.stdin.unref();
      instance.process.stdout.unref();
      instance.process.stderr.unref();

    });
  });
});

