import { Picture } from "./picture";

export interface AudiusUser {
  albumCount: number;
  artistPickTrackId?: string;
  bio?: string;
  coverPhoto?: {
    _2000?: string;
    _640?: string;
  };
  doesFollowCurrentUser?: boolean;
  ercWallet?: string;
  followeeCount?: number;
  followerCount?: number;
  handle?: string;
  id?: string;
  isAvailable?: boolean;
  isDeactivated?: boolean;
  isVerified?: boolean;
  location?: string;
  name?: string;
  playlistCount?: number;
  profilePicture?: Picture;
  repostCount?: number;
  splWallet?: string;
  supporterCount?: number;
  supportingCount?: number;
  totalAudioBalance?: number;
  trackCount?: number;
}
