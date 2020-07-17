---
date: 2020-07-17T16:29:21.054Z
title: Swagger with Go walkthrough
description: How we auto-generate API docs with Swagger
tags:
  - engineering
---
## Why Swagger?

Here at Hyko, we want to make our API docs great. 

When writing API docs, there are two approaches you can take:

1. Write them in a markdown file, update that everytime something changes (see [Monzo's API docs](https://github.com/monzo/docs/tree/master/source/includes)).
2. Auto-generate them directly from your code.

We like option 2, as it enforces thorough documentation in the code itself, while making our API docs super maintainable by removing the risk of our docs getting out-of-sync with our backend. 

Being an API-first product, out of date docs are a big no-no!

[Swagger](https://swagger.io/) is the most widely used open-source tool that let's you do 2. After Swagger handles the auto-generation of API docs, you can pass that output to another tool to lay on some HTML and CSS to make it beautiful (tools include [Swagger UI](https://swagger.io/docs/open-source-tools/swagger-ui/usage/installation/), [Slate](https://github.com/slatedocs/slate))

## Choosing a library

There are two libraries available for using Swagger with Go: 

- [`swaggo/swag`](https://github.com/swaggo/swag)
- [`go-swagger`](https://github.com/go-swagger/go-swagger)

Long story short, `swag` is simpler and `go-swagger` is more powerful and more widely used. You can read-up on some more discussion of what's best [here](https://towardsdatascience.com/setting-up-swagger-docs-for-golang-api-8d0442263641), [here](https://medium.com/@pedram.esmaeeli/generate-swagger-specification-from-go-source-code-648615f7b9d9), and [here](https://github.com/go-swagger/go-swagger/issues/1794).

We went for `go-swagger`, as we'd like as much flexibility with the API docs as possible and value the increased engagement with the project.

## Let's generate some docs for our new doggies API...

We're going to walk through making a super-simple API and generating some docs with Swagger 💪 

Our project is going to look like this:

```
.
├── api
│   └── api.go
├── docs
│   ├── docs.go
│   └── dog.go
├── go.mod
├── go.sum
├── main
│   └── main.go
└── swagger.yaml
```

### Doggies API: Setup the project

First, create the following files:

```
.
├── api
│   └── api.go
├── docs
│   ├── docs.go
│   └── dog.go
└── main
    └── main.go
```

We'll be using the external library [`gorilla/mux`](https://github.com/gorilla/mux) to serve our API, so go ahead and install that with `go get -u github.com/gorilla/mux`. Then make sure we've initialised our go modules with `go mod init`. 

New, we need an endpoint so we have something to generate. 

### Doggies API: Create an endpoint

Add the following to `main.go` and `api.go` respectively. 

``` go
package main

import (
	"log"
	"net/http"

	"github.com/DoggyAPI/api"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/dog", api.CreateDog).Methods("POST")
	log.Fatal(http.ListenAndServe(":5000", router))
}
```

```go
package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Dog contains the fields for a dog.
type Dog struct {
	Name         string `json:"name"`
	Age          int    `json:"age"`
	HasWaggyTail bool   `json:"has_waggy_tail"`
}

// DogRequest contains the body of a Dog request.
type DogRequest struct {
	Name         string `json:"name"`
	Age          int    `json:"age"`
	HasWaggyTail bool   `json:"has_waggy_tail"`
}

// DogResponse returns a Dog object.
type DogResponse struct {
	Dog Dog `json:"dog"`
}

// DogHandler handles incoming dog requests
func CreateDog(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application-json")
	var newDog Dog
	json.NewDecoder(r.Body).Decode(&newDog)
	fmt.Println("New dog!", newDog)
}
```

Great! Now we're ready to start generating our docs.

### Doggies API: Swagger setup

// to do!


## Generate our docs

First, we'll have to download the `swagger` command, which let's us generate and play with our new docs:

`go get -u github.com/go-swagger/go-swagger/cmd/swagger`

### Generate and serve our yaml file

Run the following commands to generate the `yaml` file that will be the source of truth for our docs and serve our docs to view 💥

```bash
swagger generate spec -o ./swagger.yaml --scan-models
swagger serve -F=swagger swagger.yaml
```

You'll never need to touch the `swagger.yaml` file. 

Instead, interact with it by updating the comments in `docs.go` and the comments around your API endpoints before running `swagger generate` once more.

