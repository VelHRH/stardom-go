package models

type Match struct {
	Match  string  `json:"match"`
	Show   string  `json:"show"`
	Year   int     `json:"year"`
	Rating float32 `json:"rating"`
}

func (Match) TableName() string {
	return "stardom"
}
