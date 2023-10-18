export interface ILocationDetailsDTO{
  address_components: [
    {
      long_name: string;
      short_name: string;
      types: string[];
    }
  ],
  adr_address: string;
  business_status: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    }
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      }
      southwest: {
        lat: number;
        lng: number;
      }
    }
  }
  icon: string;
  international_phone_number: string;
  name: string;
  opening_hours: {
    open_now: boolean;
    periods: [
      {
        close: {
          day: number;
          time: string;
          hours: number;
          minutes: number;
          nextDate: Date;
        }
        open: {
          day: number;
          time: string;
          hours: number;
          minutes: number;
          nextDate: Date;
        }
      }
    ],
    weekday_text: string[];
  }
  photos: [
    {
      height: number;
      html_attributions: string[];
      photo_reference: string;
      width: number;
    }
  ],
  place_id: string;
  plus_code: {
    compound_code: string;
    global_code: string;
  }
  rating: number;
  reference: string;
  reviews: [
    {
      author_name: string;
      author_url: string;
      business_status: string;
      language: string;
      profile_photo_url: string;
      rating: number;
      relative_time_description: string;
      text: string;
      time: number;
    }
  ],
  types: string[];
  url: string;
  user_ratings_total: number;
  utc_offset: number;
  vicinity: string;
  website: string;
}