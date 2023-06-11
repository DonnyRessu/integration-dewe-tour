package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"
	dto "week2/dto/result"
	tripdto "week2/dto/trip"
	"week2/models"
	"week2/repositories"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/go-playground/validator/v10"
	"github.com/labstack/echo/v4"
)

type handlerTrip struct {
	TripRepository repositories.TripRepository
}

func HandlerTrip(TripRepository repositories.TripRepository) *handlerTrip {
	return &handlerTrip{TripRepository}
}

// var path_file = "http://localhost:5000/uploads/"

func (h *handlerTrip) FindTrip(c echo.Context) error {
	trip, err := h.TripRepository.FindTrip()

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// for i, t := range trip {
	// 	trip[i].Image = path_file + t.Image
	// }

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: trip})
}

func (h *handlerTrip) GetTrip(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	// trip.Image = path_file + trip.Image

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: trip})
}

func (h *handlerTrip) CreateTrip(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	countryID, _ := strconv.Atoi(c.FormValue("country_id"))
	day, _ := strconv.Atoi(c.FormValue("day"))
	night, _ := strconv.Atoi(c.FormValue("night"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	quota, _ := strconv.Atoi(c.FormValue("quota"))

	request := tripdto.CreateTripRequest{
		Title:          c.FormValue("title"),
		CountryID:      countryID,
		Accomodation:   c.FormValue("accomodation"),
		Transportation: c.FormValue("transportation"),
		Eat:            c.FormValue("eat"),
		Day:            day,
		Night:          night,
		Datetrip:       c.FormValue("datetrip"),
		Price:          price,
		Currentquota:   quota,
		Quota:          quota,
		Description:    c.FormValue("description"),
		Image:          dataFile,
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	var ctx = context.Background()
	var CLOUD_NAME = os.Getenv("CLOUD_NAME")
	var API_KEY = os.Getenv("API_KEY")
	var API_SECRET = os.Getenv("API_SECRET")

	// Add your Cloudinary credentials ...
	cld, _ := cloudinary.NewFromParams(CLOUD_NAME, API_KEY, API_SECRET)

	// Upload file to Cloudinary ...
	resp, err := cld.Upload.Upload(ctx, dataFile, uploader.UploadParams{Folder: "dewe tour"})

	if err != nil {
		fmt.Println(err.Error())
	}

	trip := models.Trip{
		Title:          request.Title,
		CountryID:      request.CountryID,
		Accomodation:   request.Accomodation,
		Transportation: request.Transportation,
		Eat:            request.Eat,
		Day:            request.Day,
		Night:          request.Night,
		DateTrip:       request.Datetrip,
		Price:          request.Price,
		CurrentQuota:   request.Currentquota,
		Quota:          request.Quota,
		Description:    request.Description,
		Image:          resp.SecureURL,
	}

	data, err := h.TripRepository.CreateTrip(trip)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: convertResponseTrip(data)})
}

func (h *handlerTrip) UpdateTrip(c echo.Context) error {
	dataFile := c.Get("dataFile").(string)
	fmt.Println("this is data file", dataFile)

	countryID, _ := strconv.Atoi(c.FormValue("country_id"))
	day, _ := strconv.Atoi(c.FormValue("day"))
	night, _ := strconv.Atoi(c.FormValue("night"))
	price, _ := strconv.Atoi(c.FormValue("price"))
	quota, _ := strconv.Atoi(c.FormValue("quota"))

	request := tripdto.UpdateTripRequest{
		Title:          c.FormValue("title"),
		CountryID:      countryID,
		Accomodation:   c.FormValue("accomodation"),
		Transportation: c.FormValue("transportation"),
		Eat:            c.FormValue("eat"),
		Day:            day,
		Night:          night,
		Datetrip:       c.FormValue("datetrip"),
		Price:          price,
		Quota:          quota,
		Description:    c.FormValue("description"),
		Image:          dataFile,
	}

	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Title != "" {
		trip.Title = request.Title
	}

	if request.CountryID != 0 {
		trip.CountryID = request.CountryID
	}

	if request.Accomodation != "" {
		trip.Accomodation = request.Accomodation
	}

	if request.Transportation != "" {
		trip.Transportation = request.Transportation
	}

	if request.Eat != "" {
		trip.Eat = request.Eat
	}

	if request.Day != 0 {
		trip.Day = request.Day
	}

	if request.Night != 0 {
		trip.Night = request.Night
	}

	if request.Datetrip != "" {
		trip.DateTrip = request.Datetrip
	}

	if request.Price != 0 {
		trip.Price = request.Price
	}

	if request.Quota != 0 {
		trip.Quota = request.Quota
	}

	if request.Description != "" {
		trip.Description = request.Description
	}

	if request.Image != "" {
		trip.Image = request.Image
	}

	data, err := h.TripRepository.UpdateTrip(trip)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: convertResponseTrip(data)})
}

func (h *handlerTrip) DeleteTrip(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	trip, err := h.TripRepository.GetTrip(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	data, err := h.TripRepository.DeleteTrip(trip, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: convertResponseTrip(data)})
}

func convertResponseTrip(u models.Trip) models.TripResponse {
	return models.TripResponse{
		ID:             u.ID,
		Title:          u.Title,
		Country:        u.Country,
		Accomodation:   u.Accomodation,
		Transportation: u.Transportation,
		Eat:            u.Eat,
		Day:            u.Day,
		Night:          u.Night,
		DateTrip:       u.DateTrip,
		Price:          u.Price,
		Quota:          u.Quota,
		Description:    u.Description,
		Image:          u.Image,
	}
}
