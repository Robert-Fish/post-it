# Post It

A simple application to view users profiles and their posts along with the associated comments.

## Notes

All diagrams can be found in the docs folder. Additional thoughts are located in the notes.md

## Running Locally

```bash
$ git clone https://github.com/robert-fish/post-it.git
```

Set Dummy Api App Id for Api Client by adding the following field to `.env` file.

```
NEXT_PUBLIC_DUMMY_APP_ID=
```

```
$ yarn
$ yarn dev
```

The follow commands are built in to allow you to develop more easily

```
$ yarn test - Just runs tests on all test files
$ yarn test:coverage - Same as above but produces coverage report
```

#### Please Note: this project does use git hooks with husky and will run yarn test on every commit

## Built Using

- [Next.js](https://nextjs.org/)
- [Chakra UI](https://chakra-ui.com/)
- [Prettier](https://prettier.io/)
