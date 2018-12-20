This is a simple example of Stripe Payment on React with firebase cloud functions.

To run client:
npm start

To run cloud function locally:
$ cd cloudfunctions
$ firebase serve --only functions

To deploy cloud function to firebase:
You must have enabled billing at fireabe.
$ cd cloudfunctions
$ firebase deploy --only functions