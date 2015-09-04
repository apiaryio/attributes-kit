import launcher from 'browser-launcher2';


launcher.detect( (available) => {
  launcher((launcherErr, launch) => {
    launch('http://localhost:9090', {
      detached: true,
      browser: available[0].name,
    }, (launchErr, instance) => {
      if (launchErr) {
        return console.error(launchErr);
      }

      instance.process.unref();
      instance.process.stdin.unref();
      instance.process.stdout.unref();
      instance.process.stderr.unref();
    });
  });
});

