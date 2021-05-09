---
date: 2021-05-09T10:54:41.079Z
title: May update
description: NEST and Telleroo integrations go live, automating all the things
tags:
  - updates
---
April has been jam packed with building, shipping, and talking to current and potential customers. We're confident that we're building features that add real value to our customers. It's a nice time. 

Here's an overview of what we've built and what's next.

## NEST integration

Just in time for April's payruns we shipped our NEST integration. This means that our customers no longer have to login to their NEST portal and update contribution amount for each employee after every payrun (or forward figures for their accountant to update).

Now, when payroll is run Hyko updates NEST automatically with the correct figures. No customer involvement needed. 

Additionally, we've shipped automation of enrolment of new employees with NEST, so that our customers no longer need to re-enter all of the details for new employees in their NEST portal. Instead, when you add a new employee in Hyko and select to enrol them in NEST, Hyko will automatically update NEST with their new information.

These were some of the top requested features by our customers. Feels good to be adding real value.

## Emailing payslips

Pre-April, for every payrun we were running a script to generate payslips for employers in HTML and CSS, then opening the ouput in Chrome and saving as a pdf, then writing an email to each customer with their payslips for the month. 

Now, we press a button in our internal tool after each payrun and pdf's are instantly sent out to each employee's email address. 

We're using [SendGrid](https://sendgrid.com/) to send out emails and the [ChromeDP](https://github.com/chromedp/chromedp) Go library to automate the HTML/CSS to pdf conversion. We assumed generating pdf's was going to be a massive faff and we were half-right.

The most difficult part was debugging some behaviour around importing a Google font via a link. The library doesn't deal too well with failure, so when a network request to grab a font from Google didn't succeed the payslip stopped generating mid-render. This resulted in non-deterministic output, which confused the heck out of us for half a day.


## Automating our own processes

Running payroll has moved from running things from test files and scripts to running things from buttons in our internal tool ("flight deck"). 

Here's how it goes:

1. On or before payday, the customer reviews the amounts to be paid and clicks a button to confirm
2. This results in a tick next to their name in our internal tool, so that we can keep track of who's confirmed payroll details for the month
3. Using a button in our internal tool, we preview the data we're about to send to HMRC, check everything looks ok, then submit
4. We do the same for posting NEST contributions and Xero journals 
5. We hit a button to email out payslips to employees
6. Payments are scheduled in Telleroo (if connected)

![Imgur](https://i.imgur.com/ey9mugn.png)

The next piece of work is to turn all those buttons in our internal tool into one "Run payroll" button. This will run everything previously mentioned in sequence. 

We're taking care to ensure that we handle errors correctly and that steps are idempotent (so that we don't mistakenly run any step twice if the process fails and is repeated).

To build this, we're using [Redis](https://redis.io/) for a message queue. We wrote a little Go library around it and made it open-source for anyone to use or contribute to. It's called [Sequences](https://github.com/HykoAPI/sequences).

There's still a little bit of work to be done on that flow, but we're confident that May's payruns will be one click.

Once we're confident in our "Run payroll" button, we'll trigger the above sequence when the customer confirms amounts for payroll once a month (instead of us manually pressing the button). At that point, we'll no longer have any manual work involved with a payrun 🎉


## What's next

This month is all about streamlining the processes around payroll. That means adding new starters, leavers, and running payroll itself. 

We have a principle that data should enter the system from the source. That means that if an employee can update their own information, they should. 

Too often in payroll convoluted systems arise. For example: employee tells their manager that they want to update their pension contribution. Manager tells the HR team, who tell the finance team, who email a spreadsheet to their accountant, who send a spreadsheet to their outsourced payroll provider, who (finally) enter the information in the software. 

With this many links in the chain changes take a long time to propagate. Mistakes happen, and when they do they take forever to diagnose and rectify. What I'm describing is payroll hell 👹

One common symptom of this type of process is a "payroll cut-off" where changes have to be in half a month before payday (in Hyko changes can be submitted up to and including payday itself).

![https://www.reddit.com/r/Payroll/comments/ftdwe7/payroll_flowchart_theres_an_issue_with_my_paycheck/](https://preview.redd.it/8p0ap1bzcbq41.jpg?width=640&crop=smart&auto=webp&s=630ec417b3817cc7cc19df2ab77cd3bfb111e97e)

For both new starters and leavers, we're designing super streamlined flows where the employee enters as much of their own information as possible. No more spreadsheets full of employee data flying around over email.

For small businesses this is a win for the CEO, no longer has to collect information from employees and pass it on to their accountant for payroll.

This month we'll also be exploring the ability to book and keep track of time-off in Hyko. Stay tuned for an update on that in the coming weeks 🤞


## What we shipped in April

- NEST integration: post contributions after a payrun

- NEST integration: enrol new employees

- Automate pdf generation and emailing of payslips

- Created v1 of our permissions model. This provides the groundwork to allow employees to login and view / update their own details. 

- Automated claiming of the employer allowance via an ["Employer Payment Summary"](https://www.gov.uk/running-payroll/reporting-to-hmrc-eps)

- Made our income tax calculation logic super defensive to unexpected inputs

- Build the backend for more flexible Xero mappings

- Many flight deck improvements to automate our internal processes (so we have more bandwidth to add to this list next month!)

- Implemented pro-rata logic for new joiners and leavers

- Fixed a bug where Chrome would wipe cookies after a few days of inactivity, logging out users

- Updated all our calculation logic to 2021/22 rates (income tax, national insurance, student loans, pensions)

- P60s (the form each employee gets at the end of a tax year)

- Built a flow for importing employees from Xero (for slick onboarding of customers leaving Xero payroll for Hyko)

- An integration with [Telleroo](https://www.telleroo.com/) to enable bulk payments in a click (for customers with Telleroo accounts)


## New friends

We're delighted to have onboarded [Comma](https://usecomma.com/) in April. 

They're offering open-banking powered bulk payments functionality with a deep Xero integration, so that business owners can pay all their bills in a click. You can request access to their product [here](https://usecomma.com/request-access).


## Try Hyko for your business

We're working super closely with our early customers to build the best possible product. 

While spaces for new customers in May are full, we still have room for more in June. If you're interested in being the next (or simply want to learn more), feel free to [book a chat with us](https://calendly.com/naz-hyko/30min?back=1&month=2021-05). 
