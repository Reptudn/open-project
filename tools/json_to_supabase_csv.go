package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"strings"
)

func main() {
	if len(os.Args) < 3 {
		fmt.Println("Usage: go run json_to_supabase.go <input.json> <output.csv>")
		return
	}

	inputFile := os.Args[1]
	outputFile := os.Args[2]

	data, err := os.ReadFile(inputFile)
	if err != nil {
		panic(err)
	}

	var records []map[string]interface{}
	if err := json.Unmarshal(data, &records); err != nil {
		panic(err)
	}

	if len(records) == 0 {
		fmt.Println("⚠️ No records found in JSON")
		return
	}

	// 🧱 Define the desired column order (manual control)
	headers := []string{
		"exerciseId",
		"name",
		"gifUrl",
		"targetMuscles",
		"bodyParts",
		"equipments",
		"secondaryMuscles",
		"instructions",
	}

	outFile, err := os.Create(outputFile)
	if err != nil {
		panic(err)
	}
	defer outFile.Close()

	writer := csv.NewWriter(outFile)
	defer writer.Flush()

	// ✍️ Write header row
	if err := writer.Write(headers); err != nil {
		panic(err)
	}

	// 🧠 Convert each record into a CSV row
	for _, rec := range records {
		row := []string{}
		for _, h := range headers {
			v, ok := rec[h]
			if !ok || v == nil {
				row = append(row, "")
				continue
			}
			switch val := v.(type) {
			case string:
				row = append(row, val)
			case []interface{}:
				// Convert arrays → {a,b,c}
				strs := []string{}
				for _, x := range val {
					// Escape commas in values just in case
					item := strings.ReplaceAll(fmt.Sprintf("%v", x), ",", "")
					strs = append(strs, item)
				}
				row = append(row, fmt.Sprintf("{%s}", strings.Join(strs, ",")))
			default:
				js, _ := json.Marshal(val)
				row = append(row, string(js))
			}
		}
		if err := writer.Write(row); err != nil {
			panic(err)
		}
	}

	fmt.Printf("✅ Converted %d records → %s (Supabase-ready)\n", len(records), outputFile)
}
