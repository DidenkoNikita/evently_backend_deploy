export interface Event {
  id: number;
  name: string;
  date: string;
  brand_id: number;
  link_photo: string;
}

export interface UpdateEvent {
  id: number;
  name: string;
  date: string;
  brand_id: number;
  link_photo: string;
  address: string;
  phone: string;
  name_site: string;
  site_link: string;
}