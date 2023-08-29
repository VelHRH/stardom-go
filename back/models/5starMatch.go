package models

type StarMatch struct {
	Wrestler1 string  `json:"wrestler1"`
	Wrestler2 string  `json:"wrestler2"`
	Year      int     `json:"year"`
	Rating    float32 `json:"rating"`
}

func (StarMatch) TableName() string {
	return "5stargp"
}
