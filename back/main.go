package main

import (
	"log"
	"os"

	"github.com/VelHRH/stardom-go/back/database"
	"github.com/VelHRH/stardom-go/back/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
)

func main() {
	database.Connect()
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error load .env file")
	}
	port := os.Getenv("PORT")
	app := fiber.New()
	routes.Setup(app)
	app.Listen(":" + port)
}
