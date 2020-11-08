---
date: 2020-11-08T11:09:14.703Z
title: Early November Update
description: XML wrangling, getting back momentum
tags:
  - engineering
---
We lost a bit of momentum, day jobs, covid. But we're back and have carved out a little time each week to keep the pace up.

Here's what we've been up to:

### Government XML API fun

In testing we were subitting data to the government's "Third Party Validation Service (TPVS)", which validates the body of XML submissions. 

The government also advises to use their "Local Test Service (LTS)", which we assumed would help us verify if the results being produced by our code were correct. But it was only available on Windows and we've got Macs. So we ended up running it in a Docker container only to find out that it did pretty much the same as the TVPS. Hey ho. 

So now we're submitting data to the "External test Service (ETS)", which according to the government's docs "mimics, as far as possible, full end to end testing.". Wonderful. To get that to work we have to hit the ETS, which then sends us back this Correlation ID field that we parse out of the XML and send to another endpoint that polls for the outcome of the initial XML that we sent. Which didn't work at first until we added a 1 second delay before polling and then it worked. Still following?



### Inching towards nice code

We've been building this thing from the middle out: Fiddling around with sending raw XML to the government till we got  success responses, then starting to generate that XML from nice Go structs, then generating those nice Go structs from nicely defined objects in our code (`Employee`, `Employer`, `Payment`).

We've now got to the point where we're only touching the XML for the random weird stuff, like the fact that you an employee can have between 0 and 2 entries in the forename field, things like if the employee is in their first job for the tax year is represented by the letter "A" instead of a useful string, and the fact that the government likes to use a "Yes Type" 🤯, which we wrote this little function to make sure we never have to think about it ever again:

```go
func boolToYesType(isTrue bool) string {
	if isTrue {
		return "yes"
	}
	return ""
}
```

We're unmarshalling XML errors into proper objects to fail nicely with well formatted context and taking extra care to give things meaningful names and document the code well. There's so many random fields that this could easily get out of hand, and putting in the effort up front is already paying dividends. 



### Can we send test data yet?

The next step is to (finally) get round to submitting our results to the government's test cases. However, after looking into them it turns out they're a tad more fiddly than we first thought. 

Here's what we need to do to get us to the point of submitting results:

1. Factor in benefits in kind to our income tax calculations
2. New starter stuff
3. Figure out calculations for the final month's salary for leavers
4. Check if there's anything we need to change to account for off-payroll workers
5. Sanity check our outputs. Perhaps figure out the results we expect by hand and write tests in our code to validate that
6. Refactor to work for people paid on time periods that aren't weekly or monthly

Then we can get this thing sent off!

I've got no idea what the reply will be if our submission is incorrect. Will they tell us why it's wrong, will we just get an email saying FAILED? 

Find out how we do next time! 👋