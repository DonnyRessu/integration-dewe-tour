package transactiondto

import "week2/models"

type CreateTransactionRequest struct {
	Counterqty int         `json:"counterqty" form:"counterqty"`
	Total      int         `json:"total" form:"total"`
	Status     string      `json:"status" form:"status" gorm:"type: varchar(255)"`
	TripID     int         `json:"tripid" form:"tripid"`
	Trip       models.Trip `json:"trip" `
	UserID     int         `json:"userid"`
	User       models.User `json:"user"`
}

type UpdateTransactionRequest struct {
	Counterqty int         `json:"counterqty" form:"counterqty"`
	Total      int         `json:"total" form:"total"`
	Status     string      `json:"status" form:"status" gorm:"type: varchar(255)"`
	TripID     int         `json:"tripid" form:"tripid"`
	Trip       models.Trip `json:"trip" form:"trip" validate:"required"`
	UserID     int         `json:"user_id"`
	User       models.User `json:"user"`
}
