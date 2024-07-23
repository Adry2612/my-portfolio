export interface TechnologyType {
  id: string;
  name: string;
  category: Array<string>;
  icon: string;
}

export interface ProyectType {
  _id: string;
  name: string;
  img: string;
  deploy_url: string;
  labels: string;
  repo_url: string;
}

export interface JobType {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  tecnologies: string[];
  icon: string;
  url: string;
  endDate: string;
  thingsDone: string[];
}
