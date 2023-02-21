// This is the JSON format for the tags returned from the Tasty API's
// tags/list endpoint. These tags could be used to allow users to filter the search
// results based on different filters including cuisine type, time to make, etc.
// To see a breakdown of the different result types, checkout the file at ./interfaces/Tags

interface RootObject {
    count: number;
    results: Result[];
    prev?: any;
    next: string;
  }
  
  interface Result {
    id: number;
    type: string;
    name: string;
    display_name: string;
  }