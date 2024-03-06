package config

import (
	"github.com/spf13/viper"
	"log"
)

var Config Configuration

type Configuration struct {
	Mock bool
	API  map[string]struct {
		Mock bool
	}
}

func LoadConfig() {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")

	if err := viper.ReadInConfig(); err != nil {
		log.Fatalf("Failed to read config file: %s", err)
	}
	err := viper.Unmarshal(&Config)
	if err != nil {
		log.Fatalf("Failed to unmarshal config: %v", err)
	}
}

func ShouldMock(apiName string) bool {
	globalMock := Config.Mock
	apiMockPath := "api." + apiName + ".mock"
	// apiMock := fmt.Sprintf("api.%s.mock", apiName)
	if viper.IsSet(apiMockPath) {
		// return viper.GetBool(apiMock)
		return Config.API[apiName].Mock
	} else {
		return globalMock
	}
}
