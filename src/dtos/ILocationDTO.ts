export interface ILocationDTO{
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
    northeast: {
      lat: number;
      lng: number;
    }
    southwest: {
      lat: number;
      lng: number;
    }
  }
    icon: string;

    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: { open_now: boolean };
    photos: [
      {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
      }
    ],
    place_id: string;
    rating: number;
    vicinity: string;
    user_ratings_total: number;
}