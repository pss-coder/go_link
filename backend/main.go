package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

type shorten struct {
	short_link_id string
	original_link string
}

// id to shorten struct
// uint -> 0-255
var linkMap = make(map[int]shorten)
var start = 11157 // something like our pointer

var shortIdmap = make(map[string]int)

func main() {
	port := 8085

	// handle index.html
	// fileserver := http.FileServer(http.Dir("./static"))
	// http.Handle("/", fileserver)

	// handle link shortener
	http.HandleFunc("/shorten", shortenLinkHandler)

	http.HandleFunc("/{id}", shortLinkHandler)

	// run server
	fmt.Printf("port running on %d\n", port)
	if err := http.ListenAndServe(fmt.Sprintf(":%d", port), nil); err != nil {
		log.Fatal(err) // just crash with error
	}
}

// Post Method
func shortenLinkHandler(w http.ResponseWriter, r *http.Request) {
	//1. must be a Post request
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	//2. retrieve the url from body
	// define body
	var requestBody struct {
		Link string `json:"link"`
	}
	// decode request body to our defined struct
	if err := json.NewDecoder(r.Body).Decode(&requestBody); err != nil {
		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}
	link := requestBody.Link
	fmt.Printf("Submitted Link: %s \n", link)

	// 3. TODO: our process for mapping to shorten link :)

	// convert start to base 62
	const charset = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	var result string

	base := 62 // our base to convert to
	num := start

	for num > 0 {
		quotient := num / base
		remainder := num % base

		// convert remainder to base 62
		res := string(charset[remainder])
		result = res + result

		//fmt.Printf("numb %d \n", num)
		// fmt.Printf("quotient: %d, remainder: %d ", quotient, remainder)
		num = quotient
	}
	fmt.Println(result)

	linkMap[start] = shorten{
		short_link_id: result,
		original_link: link,
	}

	shortIdmap[result] = start

	start++ // increment pointer

	// 4. Return Shorten Link
	jsonBody := fmt.Sprintf(`{"shorten_link":"%s"}`, result)
	fmt.Fprintf(w, "%s", jsonBody)
}

// Get Method
func shortLinkHandler(w http.ResponseWriter, r *http.Request) {
	// 1. Must be a Get Request
	// Param - ID
	if r.Method != http.MethodGet {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// id := r.URL.Query().Get("short_link")
	id := r.PathValue("id")
	if id == "" {
		fmt.Fprintf(w, "No ID")
	}

	// we get the id pointer from the shorten id
	ref, isPresent := shortIdmap[id]
	if !isPresent {
		// display error
		fmt.Fprintf(w, "Not available to redirect")
		return
	}
	data, isLinksAvailable := linkMap[ref]

	if !isLinksAvailable {
		fmt.Fprintf(w, "Not available to redirect")
		return
	}

	original_link := data.original_link
	fmt.Printf("Redirecting %s to %s \n", id, original_link)
	// 3. if found, we redirect, else handle error
	//localhost:8085/redirect?short_link=2TX
	http.Redirect(w, r, original_link, http.StatusTemporaryRedirect) // TODO: set to permatnely move for future

}
