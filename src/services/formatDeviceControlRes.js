const formatDeviceControlRes = (controlData) => {
  return{
    brightness: controlData.brightness,
    time_end: controlData.time_end,
    time_start: controlData.time_start,
    time_send: controlData.time_send,
    led_color: controlData.led_color
  }
}

export default formatDeviceControlRes