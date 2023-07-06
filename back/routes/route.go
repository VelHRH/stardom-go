package routes

import (
	"github.com/VelHRH/stardom-go/back/controller"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
}
