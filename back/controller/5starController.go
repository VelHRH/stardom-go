package controller

import (
	"log"
	"sort"

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

func GetByRatings(c *fiber.Ctx) error {
	var matches []models.StarMatch

	type RatingCount struct {
		Rating float32 `json:"rating"`
		Count  int     `json:"count"`
	}

	if err := database.DB.Find(&matches).Error; err != nil {
		log.Println("Unable to get matches")
	}

	ratingCounts := make(map[float32]int)

	for _, match := range matches {
		ratingCounts[match.Rating]++
	}
	var ratingList []RatingCount
	for rating, count := range ratingCounts {
		ratingList = append(ratingList, RatingCount{Rating: rating, Count: count})
	}
	sort.Slice(ratingList, func(i, j int) bool {
		return ratingList[i].Rating > ratingList[j].Rating
	})
	c.Status(200)
	return c.JSON(ratingList)
}

func GetByWrestler(c *fiber.Ctx) error {
	var matches []models.StarMatch

	type WrestlerRating struct {
		WrestlerName string  `json:"wrestlerName"`
		AvgRating    float32 `json:"avgRating"`
	}

	if err := database.DB.Find(&matches).Error; err != nil {
		log.Println("Unable to get matches")
	}

	wrestlerRatings := make(map[string]struct {
		TotalRating float32
		MatchCount  int
	})

	for _, match := range matches {
		data, ok := wrestlerRatings[match.Wrestler1]
		if !ok {
			data = struct {
				TotalRating float32
				MatchCount  int
			}{}
		}
		data.TotalRating += match.Rating
		data.MatchCount++
		wrestlerRatings[match.Wrestler1] = data

		data, ok = wrestlerRatings[match.Wrestler2]
		if !ok {
			data = struct {
				TotalRating float32
				MatchCount  int
			}{}
		}
		data.TotalRating += match.Rating
		data.MatchCount++
		wrestlerRatings[match.Wrestler2] = data
	}

	var wrestlerRatingList []WrestlerRating
	for wrestlerName, data := range wrestlerRatings {
		avgRating := float32(0)
		if data.MatchCount > 0 {
			avgRating = data.TotalRating / float32(data.MatchCount)
		}
		wrestlerRatingList = append(wrestlerRatingList, WrestlerRating{WrestlerName: wrestlerName, AvgRating: avgRating})
	}

	sort.Slice(wrestlerRatingList, func(i, j int) bool {
		return wrestlerRatingList[i].AvgRating > wrestlerRatingList[j].AvgRating
	})

	c.Status(200)
	return c.JSON(wrestlerRatingList)
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

	result := database.DB.Model(&models.StarMatch{}).Where("`Wrestler1` = ? AND `Wrestler2` = ? AND `Year` = ? AND `Rating` = ?", match.Wrestler1, match.Wrestler2, match.Year, match.Rating).Updates(updatedMatch)

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
