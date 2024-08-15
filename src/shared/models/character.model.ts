export type ResponseModel = {
  info: Info;
  results: Character[];
};

export type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export interface Character {
  id?: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
}
