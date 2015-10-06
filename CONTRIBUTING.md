# Contributing

## Add new fixtures
`attributes-kit` uses a series of **MSON** fixtures to test its rendered output and displaying the showcase page as well. Those fixture are actually imported from an external package, [mson-zoo](https://www.npmjs.com/package/mson-zoo), manteined by [Apiary](https://apiary.io).

The reason behind this choice is simply the thing that those examples are used in different packages related to MSON (such as parser, renderer, payload generators and so on). For this reason, adding a new fixture to the repo is something that everyone can benefit.

Therefore, adding a new fixture to the repo should be done in this way:

### Fixture creator side:
1. Clone the [mson-zoo](https://github.com/apiaryio/mson-zoo) repository
2. Add your fixture into the `samples` directory. **samples** directory, only **samples** directory, nothing else than **samples** directory.
3. Push your changes into your branch and issue a pull-request to the repository

### Reviewer side
1. Review the submitted pull request; in particular, please make sure that the fixtures are in the **samples** directory and they actually make sense (they should be just MSON object and nothing [ApiBlueprint](https://apiblueprint.org) related).
2. Merge the pull request into the master branch
3. Create a new patch revision for npm. This means, basically, modifyig the `package.json` file and write down a new version into the `version` field, commit the thing and push it into the master. As alternative, you can use the `npm version patch`, that will do both commands for you.
4. Publish the new package version using `npm publish` command.
5. Go back to `attributes-kit` repository, update `mson-zoo` package, run all the tests again, then issue a pull request with the updated version.
6. Congrats, you can now use the new fixture around the application.
