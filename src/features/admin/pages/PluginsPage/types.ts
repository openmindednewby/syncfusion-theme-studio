/** Shape of a single plugin entry. */
export interface PluginDto {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  enabled: boolean;
  icon: string;
}
