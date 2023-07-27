package controller

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"

	"github.com/VelHRH/stardom-go/back/database"
	"github.com/VelHRH/stardom-go/back/models"
	"github.com/VelHRH/stardom-go/back/util"
	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
)

func ValidateEmail(email string) bool {
	Re := regexp.MustCompile(`[a-z0-9._%+\-]+@[a-z0-9._%+\-]+.[a-z0-9._%+\-]`)
	return Re.MatchString(email)
}

func Register(context *fiber.Ctx) error {
	var data map[string]interface{}

	if err := context.BodyParser(&data); err != nil {
		fmt.Println("Unable to parse body.")
	}
	if len(data["password"].(string)) <= 6 {
		context.Status(400)
		return context.JSON(fiber.Map{"message": "Password should be longer than 6 characters."})
	}

	if !ValidateEmail(strings.TrimSpace(data["email"].(string))) {
		context.Status(400)
		return context.JSON(fiber.Map{"message": "Invalid email format."})
	}

	var userData models.User
	database.DB.Where("email=?", strings.TrimSpace(data["email"].(string))).First(&userData)
	if userData.Id != 0 {
		context.Status(400)
		return context.JSON(fiber.Map{"message": "Email already exists."})
	}
	user := models.User{
		FullName: data["full_name"].(string),
		Email:    data["email"].(string),
	}

	user.SetPassword(data["password"].(string))
	err := database.DB.Create(&user)
	if err != nil {
		fmt.Println(err)
	}

	context.Status(200)
	return context.JSON(fiber.Map{"user": user, "message": "Account created successfuly."})
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		fmt.Println("Unable to parse body")
	}

	var user models.User
	database.DB.Where("email=?", data["email"]).First(&user)
	if user.Id == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"message": "Incorrect login or password",
		})
	}

	if err := user.ComparePassword(data["password"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"message": "Incorrect login or password",
		})
	}

	token, err := util.GenerateJwt(strconv.Itoa(int(user.Id)))
	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return nil
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "Success",
		"user":    user,
	})
}

type Claims struct {
	jwt.StandardClaims
}
