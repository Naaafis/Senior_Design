//blink esp32 on board LED
////////////////////////////////
////////   Justin Lam    ///////
///////   Nov 11, 2021   ///////
////////////////////////////////
#include <stdio.h>
#include <math.h>
#include "driver/i2c.h"
#include "./ADXL343.h"


//blink
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "driver/gpio.h"
#include "sdkconfig.h"

#define BLINK_GPIO_FOUR 13

void app_main() {
  //blink on board enabled
  gpio_pad_select_gpio(BLINK_GPIO_FOUR);
  gpio_set_direction(BLINK_GPIO_FOUR, GPIO_MODE_OUTPUT);
  while(true){
    gpio_set_level(BLINK_GPIO_FOUR, 0);
    vTaskDelay(1000 / portTICK_PERIOD_MS);
    gpio_set_level(BLINK_GPIO_FOUR, 1);
    vTaskDelay(1000 / portTICK_PERIOD_MS);
  }
}