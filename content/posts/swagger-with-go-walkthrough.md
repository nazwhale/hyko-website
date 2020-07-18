---
date: 2020-07-17T16:29:21.054Z
title: Swagger with Go walkthrough
description: How to auto-generate API docs from Golang code with Swagger
tags:
  - engineering
---
## Why Swagger?

When writing API docs, there are two approaches you can take:

1. Write them in a markdown file, update that everytime something changes (see [Monzo's API docs](https://github.com/monzo/docs/tree/master/source/includes)).
2. Auto-generate them directly from your code.

We're going to take a look at one way of achieving option 2. Auto-generating docs enforces thorough documentation in the code itself, while making your API docs super maintainable by removing the risk of our docs getting out-of-sync with our backend. 

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

```bash
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

First, we're going to create files needed for a super-simple Go server:

```
.
├── api
│   └── api.go
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

// Dog contains the properties of a dog.
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

// CreateDog handles incoming dog creation requests
func CreateDog(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application-json")
	var newDog Dog
	json.NewDecoder(r.Body).Decode(&newDog)
	fmt.Println("New dog!", newDog)
}
```

You should now be able to run `go run main/main.go` to start your server without any errors. 

Great! Now we're ready to start generating our docs.

### Doggies API: Swagger setup

First, let's create a `docs` package to store the comments and structs required by Swagger.

```
.
├── api
│   └── api.go
├── docs
│   └── docs.go
└── main
    └── main.go
```

We'll also have to import it in `main.go`, so that the `docs` package is built by Go (without that import, there'd be no entry point for our `docs` package).

```go
import (
   "log"
   "net/http"

   "github.com/DoggyAPI/api"
   _ "github.com/DoggyAPI/docs"
   "github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/dog", api.CreateDog).Methods("POST")
	log.Fatal(http.ListenAndServe(":5000", router))
}
```

Now let's fill in our `docs` package.

We're going to add the following to `docs.go`:

```go
// Package classification Doggy.
//
// Documentation of our Doggy API.
//
//     Schemes: http
//     BasePath: /
//     Version: 1.0.0
//     Host: pawsome.com
//
//     Consumes:
//     - application/json
//
//     Produces:
//     - application/json
//
//     Security:
//     - basic
//
//    SecurityDefinitions:
//    basic:
//      type: basic
//
// swagger:meta
package docs
```

Notice how it's all comments except for the package name on the last line. This is intentional. Swagger will interpret these comments as metadata for our API. You can read more about it [in Swagger's own docs](https://goswagger.io/use/spec/meta.html).

The main thing we've defined here is the name of our service, after `Package classification`, and then a description of our service right after that.

Now, we'll document our `dogs` endpoint by adding a new file in our `docs` package, `dogs.go`. 

```bash
.
├── api
│   └── api.go
├── docs
│   └── docs.go
|   └── dogs.go
└── main
    └── main.go
```

Here's how we'll do it:

```go
package docs

import "github.com/DoggyAPI/api"

// swagger:route POST /dog dog-tag idDog
// Dog creates a new dog.
// responses:
//   200: dogSuccessResponse

// swagger:parameters idDog
type dogParamsWrapper struct {
	// Dog creates a new dog.
	// in:body
	Body api.DogRequest
}

// Successful dog created response.
// swagger:response dogSuccessResponse
type dogResponseWrapper struct {
	// in:body
	Body api.DogResponse
}
```

There's a few things to note here:

- The part following `swagger:route` defines the properties of our endpoint. It's a `POST` request at `/dog`. It has a `dog-tag`, which is used to group similar endpoints together in our docs. And it has an `idDog`, which corresponds to the id above `dogParamsWrapper` a few lines below. 
- We then have a description "Dog creates a new dog.", and a list of `responses`, each with an id, in this case only `dogSuccessResponse`, which corresponds to the id above `dogResponseWrapper`.
- The `// Dog creates a new dog.` text will appear as the description of our request body
- In the two types below, we use `// in:body` to point to the structs in our `api` package that make up the request and response parameters.

We're set! Let's generate those docs ✨

## Generate our docs

First, we'll have to download the `swagger` command, which let's us generate and play with our new docs:

`go get -u github.com/go-swagger/go-swagger/cmd/swagger`

### Generate and serve our yaml file

Run the first command to generate the `swagger.yaml` file that will be the source of truth for our docs and the second command serve our docs locally💥

```bash
swagger generate spec -o ./swagger.yaml --scan-models
swagger serve -F=swagger swagger.yaml
```

You'll never need to touch the `swagger.yaml` file. Instead, you can regenerate it by updating the comments in `docs.go` and the comments around your API endpoints before running `swagger generate` once more.

You should have something that looks like this:

![Doggy docs](https://i.imgur.com/j4hhTYN.png)

## Conclusion

We're done! Enjoy your shiny new API docs 👋

