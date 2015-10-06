# Contributing

First of all, thank you! It's great that you want to contribute to this repository. In order to make the entire process faster and a pleasant experience, we kindly ask you to read this document.

## Reporting a bug
As most of GitHub open source projects, we're using the integrated issue trackers with some custom rules, basically dictated with labels usages.

We do not have any particular strict rule about title and text. Of course, more details you'll write, more easy will be for us to fix the thing or answer your question.

Actually, the best bug report would be issuing a pull request with a failing test. However, for **this** particular repository, the broken _MSON_ snippet will be enough.

### Labels Usage

We have actually different labels grouped into 3 categories:

1. Status (provides information about PR/Bug status)
2. Team (internal label used to make sure the bug is being tracked by Apiary internal systems)
3. Type (provides a description of the bug type)

Status        | Description
------------- | -------------
Accepted      | The **PR** has been reviewed; it is ready to be merged.
In Progress   | The **PR** is not complete yet and needs further work.

Team             | Description
-----------------| ------------
Core Application | Sets the issue/pr ownership to the *CAT* Apiary Team

Note that the **Team: Core Application** is mandatory in all the PRs in order to track it into internal Apiary systems.

As noted above, those labels **MUST** be applied on all Pull requests.

Type          | Description
------------- | -------------
Bug           | Bug in the codebase.
Enhancement   | Enhancement request (better support, edge cases).
Feature       | New feature request.
Performance   | Performance problems.
Refactoring   | Refactoring request.
Research      | Means we have no idea how to do that (yet).

Those kind of labels should be applied on All Issues. If it makes sense, multiple labels can be applied to the same issue.

Once the bug/feature will be implemented/shipped, all the material provided in the issue (such as MSON code) will be evaluated to be inserted into the tests suites. In particular, the MSON code will be (probably) be integrated into [mson-zoo](https://github.com/apiaryio/mson-zoo) repository.

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
