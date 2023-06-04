package handlers

import (
	"net/http"
	"strconv"
	dto "week2/dto/result"
	transactiondto "week2/dto/transaction"
	"week2/models"
	"week2/repositories"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTransaction struct {
	TransactionRepository repositories.TransactionRepository
}

func HandlerTransaction(TransactionRepository repositories.TransactionRepository) *handlerTransaction {
	return &handlerTransaction{TransactionRepository}
}
func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transactions, err := h.TransactionRepository.FindTransactions()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// for i, p := range transactions {
	// 	transactions[i].Attachment = path_file + p.Attachment
	// }

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: transactions})
}
func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}
	// transaction.Attachment = path_file + transaction.Attachment

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: transaction})
}

func (h *handlerTransaction) GetTransactionByID(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransactionByID(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: transaction})
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	request := new(transactiondto.CreateTransactionRequest)
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	transaction := models.Transaction{
		Counterqty: request.Counterqty,
		Total:      request.Total,
		Status:     request.Status,
		TripID:     request.TripID,
		UserID:     int(userId),
	}

	data, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: data})
}

// func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
// 	userLogin := c.Get("userLogin")
// 	userId := userLogin.(jwt.MapClaims)["id"].(float64)

// 	tripid, _ := strconv.Atoi(c.FormValue("tripid"))
// 	counterqty, _ := strconv.Atoi(c.FormValue("counterqty"))
// 	total, _ := strconv.Atoi(c.FormValue("total"))

// 	request := transactiondto.CreateTransactionRequest{
// 		Counterqty: counterqty,
// 		Total:      total,
// 		Status:     c.FormValue("status"),
// 		TripID:     tripid,
// 		UserID:     int(userId),
// 	}
// 	fmt.Println(userId)

// 	validation := validator.New()
// 	err := validation.Struct(request)
// 	if err != nil {
// 		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
// 	}

// 	transaction := models.Transaction{
// 		Counterqty: request.Counterqty,
// 		Total:      request.Total,
// 		Status:     request.Status,
// 		TripID:     request.TripID,
// 		UserID:     request.UserID,
// 	}

// 	data, err := h.TransactionRepository.CreateTransaction(transaction)
// 	if err != nil {
// 		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
// 	}
// 	transaction, _ = h.TransactionRepository.GetTransaction(transaction.ID)

// 	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: data})
// }

func (h *handlerTransaction) UpdateTransaction(c echo.Context) error {

	tripid, _ := strconv.Atoi(c.FormValue("tripid"))
	counterqty, _ := strconv.Atoi(c.FormValue("counterqty"))
	total, _ := strconv.Atoi(c.FormValue("total"))
	userid, _ := strconv.Atoi(c.FormValue("userid"))

	request := transactiondto.CreateTransactionRequest{
		Counterqty: counterqty,
		Total:      total,
		Status:     c.FormValue("status"),
		TripID:     tripid,
		UserID:     userid,
	}

	id, _ := strconv.Atoi(c.Param("id"))

	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dto.ErrorResult{Code: http.StatusBadRequest, Message: err.Error()})
	}

	if request.Counterqty != 0 {
		transaction.Counterqty = request.Counterqty
	}
	if request.Total != 0 {
		transaction.Total = request.Total
	}
	if request.Status != "" {
		transaction.Status = request.Status
	}

	if request.TripID != 0 {
		transaction.TripID = request.TripID
	}

	data, err := h.TransactionRepository.UpdateTransaction(transaction, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dto.ErrorResult{Code: http.StatusInternalServerError, Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dto.SuccesResult{Code: http.StatusOK, Data: data})
}
