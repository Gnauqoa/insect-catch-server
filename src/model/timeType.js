import { isHour, isMinute } from "../services/validator.js";

const createTimeType = (hour, min) => {
  return {
    hour: {
      type: Number,
      default: hour,
      validate: {
        validator: (value) => isHour(value),
        message: "Hour but be between 0 and 24",
      },
    },
    min: {
      type: Number,
      default: min,
      validate: {
        validator: (value) => isMinute(value),
        message: "Minute but be between 0 and 60",
      },
    },
  };
};

export default createTimeType;
