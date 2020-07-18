---
date: 2020-07-15T14:36:19.557Z
title: First steps
description: In which Charlie and Naz start building a payroll provider
tags:
  - updates
---
Hello. 

## Progress so far

✅Income tax calculations (All tax codes, passing gov test data)

✅National insurance calculations (All codes, passing gov test data)

✅Student loan calculations (Both plans + postgraduate loans, passing gov test data)

✅Successfully pinged the governments XML PAYE API

✅Successfully turned nice Go structs into crufty XML blobs and pinged them at the government

✅Got test data from the government to become a recognized provider

All the test data from the government can be found [here](https://www.gov.uk/government/collections/paye-online-support-for-software-developers#payroll).


## Next few weeks

While there are a few more calculations that need building (eg. statutory pay, pensions), the next step is getting certified by the government. 

We've been in contact with their developer team pretty regularly, and they've sent us the test scenarios that our code needs to pass 💪

Passing them will ensure that given a blob of employee data, we can generate all the correct data needed to produce a payslip for that employee (without actually doing the payslip generation).

Once we can prove our software is generating the correct outputs for their test scenarios we'll be officially recognized by the government as a payroll provider and make it onto this [list of legends](https://www.gov.uk/payroll-software/paid-for-software) 🏅

We've heard the government can turn this around in 1-2 weeks once submitted, so hopefully shouldn't hold us up 🤞


## Later

In the meantime, we've been thinking a lot about Security and API design.

More on that in another post...

🚀
