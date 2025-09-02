package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

func main() {
	port := 8085

	// handle index.html
	fileserver := http.FileServer(http.Dir("./static"))
	http.Handle("/", fileserver)

	// handle link shortener
	http.HandleFunc("/shorten", shortenLinkHandler)

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

	// 4. Return Shorten Link
	jsonBody := fmt.Sprintf(`{"shorten_link":"%s"}`, link)
	fmt.Fprintf(w, "%s", jsonBody)
}

// Get Method
// func retrieveLink() {}
