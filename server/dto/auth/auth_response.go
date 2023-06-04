package authdto

type RegisterResponse struct {
	Email string `json:"email"`
	Token string `json:"token"`
}

type LoginResponse struct {
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Token    string `json:"token"`
	Phone    string `json:"phone"`
	Address  string `json:"address"`
	Role     string `json:"role"`
}
