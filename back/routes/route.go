package routes

import (
	"github.com/VelHRH/stardom-go/back/controller"
	"github.com/VelHRH/stardom-go/back/middleware"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	app.Post("/api/register", controller.Register)
	app.Post("/api/login", controller.Login)
	app.Get("/api/5Star/byWrestler", controller.GetByWrestler)
	app.Use(middleware.CheckAuth)
	app.Get("/api/match", controller.GetAllMatches)
	app.Post("/api/logout", controller.Logout)
	app.Post("/api/match", controller.CreateMatch)
	app.Get("/api/match/:Rating", controller.GetMatchesByRating)
	app.Delete("/api/match", controller.DeleteMatch)
	app.Put("/api/match", controller.EditMatch)
	app.Get("/api/5Star", controller.GetAll5StarGP)
	app.Post("/api/5Star", controller.Create5StarGP)
	app.Put("/api/5Star", controller.Edit5StarGP)
	app.Delete("/api/5Star", controller.Delete5StarGP)
	app.Get("/api/5Star/byRating", controller.GetByRatings)

}
