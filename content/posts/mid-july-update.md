---
date: 2020-07-18T10:18:18.367Z
title: "Mid-July Update "
description: Hyko is officially a limited company!
tags:
  - updates
---
## Setting up a business

Hyko is now a limited company! 🎉

![setting up a company](https://i.imgur.com/XJEk5QU.png)

It was suprisingly easy to do. We were approved within 24 hours and it cost us £12. 

And look, we've got shares, two of them!

![shares](https://i.imgur.com/GbQMIqG.png)

Ten minutes later, we had a business account set up (shout out to [Monzo Business](https://monzo.com/i/business)) and nabbed the [@HykoAPI](https://twitter.com/hykoapi) twitter handle. Not sure why you'd want to, but you can [follow us on companies house](https://beta.companieshouse.gov.uk/company/12747365) if you like. We're feeling tremendously serious and important. 

## Website spruce-up

I've been giving the site a bit of a spruce, so we have something to show off. Soon we'll have a page for API documentation that we can work on and use to show off. 

I'm currently looking through a few tools for our docs. Options are:

- [Slate](https://github.com/slatedocs/slate), which looks neat and uses markdown files. It's free and [Monzo use it](https://docs.monzo.com/).
- [GitBook](https://www.gitbook.com/), which is more like a knowledge management platform. It looks super slick but it's a bit pricy. I'm planning to chat to them to see if we can get it cheap / free if we're only using it for one user.
- [Swagger](https://swagger.io/), which auto-generates API docs from your code (big plus), but [looks a bit meh](https://swagger.io/tools/swagger-ui/). There are some tools out there to convert Swagger files to Slate docs, but at this point I think I'd rather focus on other things than faff around with that. But if you're reading this I'd be keen to hear your suggestions! It might also be true that our API won't change that often, so perhaps auto-generation isn't such a big plus after all 🤷‍♂️

After having a play around with Swagger and being a little dissapointed by the output, I'm thinking about throwing up something on Slate for now while I'm waiting for GitBook to get back to me. 

If you want to have a go at auto-generating API docs with Swagger from Go code, I wrote a little how-to [here](https://hyko.uk/blog/swagger-with-go-walkthrough/).

## API design

Our API should comply with the [SCIM](http://www.simplecloud.info/) specification to make it easier for our clients to work with. 

It's essentailly a standard for managing user identities to make integrations a little less painful.

Charlie's been heroically reading through some of [the](https://tools.ietf.org/html/rfc7643) [SCIM](https://tools.ietf.org/html/rfc7644) [RFCs](https://tools.ietf.org/html/rfc7642) so we can make sure our API is on point.

We've also been reading up on [OAuth 2.0](https://oauth.net/2/), which we plan to use for authorization.


## Security

We've been thinking more and more about security. If we intend on holding data on employees, we need to seriously assess the risks of that data being compromised and implement appropriate controls.

We'd love to get penetration tested from a [CREST-approved provider](crest-approved.org) as soon as we're ready to onboard some customers. They're pretty pricy (around £1k per day 😱), but worth it for the confidence they'll give in our clients and feedback we'll get to patch any vulnerabilities.

Also looking into the government recommended [Cyber Essentials](https://www.ncsc.gov.uk/cyberessentials/overview) certification, though it's £300 and I'm not sure it'll provide insights half as useful as we'd get from a penetration test. 

