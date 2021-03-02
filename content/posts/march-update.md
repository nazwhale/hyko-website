---
date: 2021-03-02T15:47:36.434Z
title: March update
description: Here's a selection of things we're currently thinking about. It's a
  snapshot of Hyko's March roadmap, crimped from an email we sent to our
  customers earlier today.
tags:
  - Updates
---
Here's a selection of things we're currently thinking about. It's a snapshot of Hyko's March roadmap, crimped from an email we sent to our customers earlier today.\
\
**HMRC recognition 💥** 

![](assets/screenshot-2021-03-02-at-16.02.08.png)

A couple of months ago we became a UK recognised payroll provider, which means we're now on the [big list](https://www.gov.uk/payroll-software/paid-for-software). 

That one was around 7 months in the making. Feels good. 

Will get round to slamming an "HMRC recognised" badge on the website at some point.

**New tax year 🍾** 

The new tax year starts next month on 6th April, and for Hyko that means building a bunch of end of year bits:

• P60s (a summary of all the tax you've paid for the tax year)

• Updating our monthly "RTI" submissions to HMRC to include a few new end of year specific fields

• Shifting our calculation logic to the new tax / NI rates for 2021-22

We've also got to the normal end of year responsibilities that go with being a business. I'm spending this morning figuring out how to submit our end of year accounts and confirmation statement to companies house. Probably another product in there somewhere...

**Xero integration 0️⃣**

![](https://i.imgur.com/69rrE0I.png)

Our Xero integration getting there! The connection flow is hooked up in the frontend. We're hoping to test submitting a journal this week, but currently debugging some annoying 1p discrepancies here and there. Likely a result of the peculiar rounding logic that HMRC impose on us. 

Hope to have this will be rolling from March's payroll onwards. 

**Payments 💸**

We're still investigating how to make payments instant. We spent Jan/Feb talking to Modulr, Railsbank, Truelayer and Plaid about the possibility of setting up eMoney accounts for our customers to transfer money into via Open Banking payment initiation, and then out via eMoney bulk payments. 

However, recently we've stumbled upon a poorly documented Open Banking bulk payments API. It's literally been left out of the main API docs and the Open Banking folk at Monzo didn't know about it till last week. But it works, and we're talking to one of the few companies who've integrated with it as an agent of the FCA. 

If that all checks out, we'll be able to provide you bulk payment functionality without the eMoney account in the middle, which cuts out loads of faff. Fingers crossed!

Still a little scoping to be done until we can provide an ETA on this one, but we're hopeful we'll be able to get something working. 

**Nest 🐣**

Nest have (finally) granted us access to their test site, which means we can start building functionality to auto-enrol new employees and post updates. 

We don't plan to start work on this for now, just because there's things we absolutely have to do sooner (end of year stuff) and features we'll be prioritising over Nest (instant payments). Still, good to have this one unblocked. 

**Chill pill 🧘**

We're going to take a few days off on 15th-17th March. It's been pretty non-stop since December. We're both fatigued and need some time to recharge 💪 

**Hi 👋**

We're currently working super closely with our first few customers, getting our product purring before scaling up.

If you'd like to be our next customer, we'd love to chat. [Drop in a meeting here](https://calendly.com/naz-hyko/30min?back=1&month=2021-03) and we can see if it's a good fit.