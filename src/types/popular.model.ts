export type PopulargModel = {
page:number;
results:PopularMovie[];
total_pages:number;
total_results:number;
}
export type PopularMovie = {
adult:boolean;
gender:number;
id:number;
known_for:known_for_Model[];
known_for_department:string;
name:string;
popularity:number;
profile_path:string;
}
export type known_for_Model={
adult:boolean;
backdrop_path:string;
genre_ids:number[];
id:number;
media_type:string;
original_language:string;
original_title:string;
overview:string;
poster_path:string;
release_date:string;
title:string;
video:boolean;
vote_average:number;
vote_count:number;
}


export type popularCardProps = {
  movie: PopularMovie;
};
