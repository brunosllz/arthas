export type UserProfile = {
  id: string
  name: string
  aboutMe: string | null
  seniority: string
  role: string
  avatarUrl: string
  state: string
  city: string
  country: string
  overallRate: string
  slugProfile: string
  linkedinLink: string
  githubLink: string
  title: string
  skills: Array<string>
  updatedAt: string
  involvedProjects: Array<{
    id: string
    imageUrl: string
    name: string
    status: 'inProgress' | 'recruiting' | 'closed'
    members: Array<{
      id: string
      name: string
    }>
  }>
  projectRealized: Array<{ id: string }>
}
