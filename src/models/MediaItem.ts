import mongoose, { Schema, Document } from 'mongoose';

export interface IMediaItem extends Document {
  title: string;
  type: 'music' | 'movie' | 'social';
  metadata: Record<string, any>;
  thumbnail: string;
  sourceLinks: Array<{
    platform: string;
    url: string;
    isOfficial: boolean;
  }>;
  popularityScore: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['music', 'movie', 'social'], required: true },
  metadata: { type: Schema.Types.Mixed, default: {} },
  thumbnail: { type: String, required: true },
  sourceLinks: [{
    platform: { type: String, required: true },
    url: { type: String, required: true },
    isOfficial: { type: Boolean, default: true }
  }],
  popularityScore: { type: Number, default: 0, index: true },
  slug: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

MediaItemSchema.index({ title: 'text' });

export default mongoose.models?.MediaItem || mongoose.model<IMediaItem>('MediaItem', MediaItemSchema);
