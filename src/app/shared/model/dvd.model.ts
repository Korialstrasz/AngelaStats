import {SceneReference} from './scene-reference.model';

export interface Dvd {
  producer: string;
  series: string;
  title: string;
  link: string;
  scene: SceneReference[];
  partners: string[];
}
