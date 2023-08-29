package controller

import (
	"log"

	"github.com/VelHRH/stardom-go/back/database"
	"github.com/VelHRH/stardom-go/back/models"
	"github.com/gofiber/fiber/v2"
)

func GetAll5StarGP(c *fiber.Ctx) error {
	var matches []models.StarMatch

	if err := database.DB.Find(&matches).Error; err != nil {
		log.Println("Unable to get matches")
	}
	c.Status(200)
	return c.JSON(matches)
}

func Create5StarGP(c *fiber.Ctx) error {
	var match models.StarMatch

	if err := c.BodyParser(&match); err != nil {
		log.Println(err)
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

func Delete5StarGP(c *fiber.Ctx) error {
	var match models.StarMatch

	if err := c.BodyParser(&match); err != nil {
		log.Println("Unable to parse body")
	}

	result := database.DB.Delete(&models.StarMatch{}, "`Wrestler1` = ? AND `Wrestler2` = ? AND `Year` = ? AND `Rating` = ?", match.Wrestler1, match.Wrestler2, match.Year, match.Rating)

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

func Edit5StarGP(c *fiber.Ctx) error {
	var match models.StarMatch

	if err := c.BodyParser(&match); err != nil {
		log.Println("Unable to parse body")
	}

	var updatedMatch struct {
		Wrestler1 string  `json:"newWrestler1"`
		Wrestler2 string  `json:"newWrestler2"`
		Year      int     `json:"newYear"`
		Rating    float32 `json:"newRating"`
	}

	if err := c.BodyParser(&updatedMatch); err != nil {
		log.Println("Unable to parse body")
	}

	result := database.DB.Model(&models.Match{}).Where("`Wrestler1` = ? AND `Wrestler2` = ? AND `Year` = ? AND `Rating` = ?", match.Wrestler1, match.Wrestler2, match.Year, match.Rating).Updates(updatedMatch)

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
	return c.JSON(fiber.Map{"message": "Success", "match": match})
}
