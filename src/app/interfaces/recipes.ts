// This is the JSON format for the objects returned from the Tasty API's
// recipe/list endpoint.


export class RootObject {
    count: number;
    results: Result[];
  }
  
  export class Result {
    credits: Credit[];
    servings_noun_plural: string;
    is_shoppable: boolean;
    language: string;
    buzz_id?: any;
    draft_status: string;
    total_time_minutes: number;
    approved_at: number;
    cook_time_minutes: number;
    brand?: any;
    tags: Tag[];
    compilations: Compilation[];
    thumbnail_alt_text: string;
    original_video_url?: string;
    servings_noun_singular: string;
    prep_time_minutes: number;
    name: string;
    show: Show;
    keywords: string;
    facebook_posts: any[];
    id: number;
    description: string;
    aspect_ratio: string;
    updated_at: number;
    renditions: Rendition[];
    beauty_url?: any;
    instructions: Instruction[];
    price: Price;
    nutrition: Nutrition;
    tips_and_ratings_enabled: boolean;
    video_id?: number;
    yields: string;
    canonical_id: string;
    promotion: string;
    user_ratings: Userratings;
    inspired_by_url?: any;
    topics: Topic[];
    total_time_tier: Totaltimetier;
    sections: Section[];
    num_servings: number;
    video_ad_content?: string;
    seo_title: string;
    nutrition_visibility: string;
    country: string;
    slug: string;
    show_id: number;
    is_one_top: boolean;
    brand_id?: any;
    created_at: number;
    thumbnail_url: string;
    video_url?: string;
  }
  
  export class Section {
    components: Components[];
    name?: any;
    position: number;
  }
  
  export class Components {
    position: number;
    measurements: Measurement[];
    raw_text: string;
    extra_comment: string;
    ingredient: Ingredient;
    id: number;
  }
  
  export class Ingredient {
    updated_at: number;
    name: string;
    created_at: number;
    display_plural: string;
    id: number;
    display_singular: string;
  }
  
  export class Measurement {
    id: number;
    unit: Unit;
    quantity: string;
  }
  
  export class Unit {
    display_plural: string;
    display_singular: string;
    abbreviation: string;
    system: string;
    name: string;
  }
  
  export class Totaltimetier {
    tier: string;
    display_tier: string;
  }
  
  export class Topic {
    name: string;
    slug: string;
  }
  
  export class Userratings {
    count_positive: number;
    score: number;
    count_negative: number;
  }
  
  export class Nutrition {
    protein: number;
    fat: number;
    calories: number;
    sugar: number;
    carbohydrates: number;
    fiber: number;
    updated_at: string;
  }
  
  export class Price {
    total: number;
    updated_at: string;
    portion: number;
    consumption_total: number;
    consumption_portion: number;
  }
  
  export class Instruction {
    start_time: number;
    appliance?: any;
    end_time: number;
    temperature?: any;
    id: number;
    position: number;
    display_text: string;
  }
  
  export class Rendition {
    file_size?: number;
    bit_rate?: number;
    content_type: string;
    aspect: string;
    width: number;
    minimum_bit_rate?: number;
    container: string;
    poster_url: string;
    url: string;
    duration: number;
    name: string;
    maximum_bit_rate?: number;
    height: number;
  }
  
  export class Compilation {
    aspect_ratio: string;
    country: string;
    language: string;
    approved_at: number;
    name: string;
    id: number;
    slug: string;
    promotion: string;
    facebook_posts: any[];
    created_at: number;
    draft_status: string;
    beauty_url?: any;
    buzz_id?: any;
    show: Show[];
    description?: any;
    thumbnail_url: string;
    thumbnail_alt_text: string;
    video_url: string;
    canonical_id: string;
    video_id: number;
    is_shoppable: boolean;
    keywords?: any;
  }
  
  export class Show {
    name: string;
    id: number;
  }
  
  export class Tag {
    name: string;
    id: number;
    display_name: string;
    type: string;
  }
  
  export class Credit {
    name: string;
    type: string;
  }