export interface TeamMember {
  name: string;
  title: string;
  quote: string;
  image: string;
  role: 'owner' | 'supervisor' | 'agent';
}