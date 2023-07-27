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
	fmt.Println("Success")
	return c.JSON(fiber.Map{"match": match, "message": "Match created successfuly."})
}
