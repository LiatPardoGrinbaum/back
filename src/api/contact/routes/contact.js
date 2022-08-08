"use strict";
const axios = require("axios");

/**
 * contact router.
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::contact.contact", {
  config: {
    create: {
      middlewares: [
        // point to a registered middleware
        // "contact-middleware", //! why is it not working? also added in confog/middlewarwes.js -> api::contact.contact-middleware

        // point to a registered middleware with some custom configuration
        // { name: 'middleware-name', config: {} },

        // pass a middleware implementation directly
        //*Only GET request?!
        async (ctx, next) => {
          console.log(ctx.request);
          console.log(ctx.request.method);
          console.log(ctx.request.body);
          const body = ctx.request.body.data;

          const url = "https://slack.com/api/chat.postMessage";
          try {
            const res = await axios.post(
              url,
              {
                channel: "#test",
                text: `new contact ${body.name} was created!\n
               `,
              },
              {
                headers: { authorization: `Bearer ${process.env.SLACK_TOKEN}` },
              }
            );

            console.log("Done", res.data);
          } catch (err) {
            console.log(err);
          }
          await next();
        },
      ],
    },
  },
});
