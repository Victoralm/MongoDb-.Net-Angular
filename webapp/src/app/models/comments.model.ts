export interface Comments {
  id: string;
  name: string;
  email: string;
  movieId: string;
  text: string;
  date: Date;
  edit: boolean;
}


export interface CommentsApi {
  id: string;
  name: string;
  email: string;
  movieId: string;
  text: string;
  date: Date;
}
