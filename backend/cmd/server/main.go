package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/chauuun/cvwo-assignment/backend/internal/database"
	"github.com/chauuun/cvwo-assignment/backend/internal/router"
	"github.com/joho/godotenv"
)

func init() {
	if err := godotenv.Load(); err != nil {
		log.Println("No environment files found")
	}

	if err := database.GetDB(); err != nil {
		log.Fatal("Error connecting to database")
	}
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
		log.Printf("defaulting to port %s", port)
	}

	r := router.Setup()

	fmt.Printf("Listening on port %s", port)

	log.Fatalln(http.ListenAndServe(fmt.Sprintf(":%s", port), r))
}
