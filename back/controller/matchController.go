package controller

import (
	"fmt"

	"github.com/VelHRH/stardom-go/back/database"
	"github.com/VelHRH/stardom-go/back/models"
	"github.com/gofiber/fiber/v2"
)

func CreateMatch(c *fiber.Ctx) error {
	var match models.Match

	if err := c.BodyParser(&match); err != nil {
		fmt.Println("Unable to parse body")
	}

	if err := database.DB.Create(&match).Error; err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Invalid payload",
		})
	}
	c.Status(200)
	return c.JSON(fiber.Map{"match": match, "message": "Match created successfuly."})
}

func GetAllMatches(c *fiber.Ctx) error {
	var matches []models.Match

	if err := database.DB.Find(&matches).Error; err != nil {
		fmt.Println("Unable to get matches")
	}
	c.Status(200)
	return c.JSON(matches)
}

func GetMatchesByRating(c *fiber.Ctx) error {
	rating := c.Params("Rating")
	var matches []models.Match

	if err := database.DB.Where("Rating = ?", rating).Find(&matches).Error; err != nil {
		fmt.Println("Unable to get matches")
	}
	c.Status(200)
	return c.JSON(matches)
}
