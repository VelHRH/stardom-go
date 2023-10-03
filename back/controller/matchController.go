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
	return c.JSON(fiber.Map{"match": match, "message": "Success"})
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

func DeleteMatch(c *fiber.Ctx) error {
	var match models.Match

	if err := c.BodyParser(&match); err != nil {
		fmt.Println("Unable to parse body")
	}

	result := database.DB.Delete(&models.Match{}, "`Match` = ? AND `Show` = ? AND `Year` = ? AND `Rating` = ?", match.Match, match.Show, match.Year, match.Rating)

	if result.Error != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Failed to delete the match",
		})
	}
	if result.RowsAffected == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Match not found",
		})
	}
	c.Status(200)
	return c.JSON(fiber.Map{"message": "Success"})
}

func EditMatch(c *fiber.Ctx) error {
	var match models.Match

	if err := c.BodyParser(&match); err != nil {
		fmt.Println("Unable to parse body")
	}

	var updatedMatch struct {
		Match  string  `json:"newMatch"`
		Show   string  `json:"newShow"`
		Year   int     `json:"newYear"`
		Rating float32 `json:"newRating"`
	}

	if err := c.BodyParser(&updatedMatch); err != nil {
		fmt.Println("Unable to parse body")
	}

	result := database.DB.Model(&models.Match{}).Where("`Match` = ? AND `Show` = ? AND `Year` = ? AND `Rating` = ?", match.Match, match.Show, match.Year, match.Rating).Updates(updatedMatch)

	if result.Error != nil {
		c.Status(500)
		return c.JSON(fiber.Map{
			"message": "Failed to edit the match",
		})
	}
	if result.RowsAffected == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Match not found",
		})
	}
	c.Status(200)
	return c.JSON(fiber.Map{"message": "Success", "match": match})
}
