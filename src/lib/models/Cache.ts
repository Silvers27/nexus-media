import mongoose from "mongoose";

export interface ICache extends mongoose.Document {
  key: string;
  data: any;
  expiresAt: Date;
}

const CacheSchema = new mongoose.Schema<ICache>({
  key: { type: String, required: true, unique: true, index: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  expiresAt: { type: Date, required: true, index: { expires: 0 } },
}, { timestamps: true });

export default mongoose.models.Cache || mongoose.model<ICache>("Cache", CacheSchema);
