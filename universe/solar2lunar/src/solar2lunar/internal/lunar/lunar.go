package main

import (
	"flag"
	"fmt"
	"log"
	"math"
	"os"
	"time"
)

const shortForm = "2006-Jan-02"
const myLogFile = "solar.log"

func isValidSolarDate(date string) bool {
	t, err := time.Parse(shortForm, date)
	if err != nil {
		return false
	}
	log.Println("Solar Date:", t)
	return true
}

func getNumberOfDays(date string) float64 {
	t, _ := time.Parse(shortForm, date)
	diff := time.Since(t)
	log.Println("Number of Hours:", diff.Hours())
	// Return in days
	return diff.Hours() / 24
}

func getAgeinLunar(days float64) (yy, mm, dd int) {
	// A lunar calendar has only 360 days
	yy = int((days / 360))
	remDays := math.Mod(days, 360)
	mm = int(remDays / 30)
	dd = int(math.Mod(remDays, 30))
	return yy, mm, dd
}

func main() {
	f, err := os.OpenFile(myLogFile, os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("Error opening file: %v", err)
	}
	defer f.Close()

	log.SetOutput(f)

	var solarDate string
	flag.StringVar(&solarDate, "solarDate", "2017-Oct-14", "Enter date as per solar calendar in the format: yyyy-mon-dd")
	flag.Parse()

	fmt.Println("Solar Date:", solarDate)
	if !(isValidSolarDate(solarDate)) {
		fmt.Println("Not a valid date as per solar calendar", solarDate)
		return
	}
	days := getNumberOfDays(solarDate)
	fmt.Println("Number of Days:", int(days))

	yy, mm, dd := getAgeinLunar(days)
	fmt.Printf("Age as Lunar calendar: %d years %d months %d days\n", yy, mm, dd)
}
