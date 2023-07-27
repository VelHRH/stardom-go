package routes

import (
	"github.com/VelHRH/stardom-go/back/controller"
	"github.com/VelHRH/stardom-go/back/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)
	app.Use(middleware.CheckAuth)
	app.Post("/api/match", controller.CreateMatch)
}
