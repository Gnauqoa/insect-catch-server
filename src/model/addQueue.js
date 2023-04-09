import { Schema, model } from "mongoose";
import {} from "dotenv/config";

const addQueueSchema = new Schema(
  {
    device_id: { type: Schema.Types.ObjectId, required: true },
    device_code: { type: String, required: true },
    expires_in: { type: Date, required: true },
  },
  {
    collection: "AddQueue",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const AddQueueModel = model("Queue", addQueueSchema);
export default AddQueueModel;
